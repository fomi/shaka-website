// Cloudflare Worker entry for the "shaka-website" project.
//
// Routing is asset-first: any request that matches a static file (index.html,
// checkin-school.html -> /checkin-school, admin.html -> /admin, ...) is served
// directly and NEVER runs this Worker.
//
// This Worker handles only these paths:
//   POST /api/checkin                 PUBLIC (beach/shop check-in form)
//   GET  /admin/api/me                identity + role
//   GET  /admin/api/clients           check-ins list      owner, rental, instructor
//   GET  /admin/api/rentals           rentals overview     owner, rental
//   POST /admin/api/client-update     edit check-in        owner
//   POST /admin/api/client-delete     delete check-in      owner
//   GET  /rental/api/me               identity + role
//   GET  /rental/api/clients          shop check-ins       owner, rental
//   GET  /rental/api/rentals          rentals list         owner, rental
//   POST /rental/api/rental           add/edit rental      owner, rental
//   POST /rental/api/rental-delete    delete rental        owner, rental
//
// /admin/* and /rental/* are behind Cloudflare Access (two applications), so any
// request reaching these handlers has already been authenticated by Access,
// which injects the Cf-Access-Authenticated-User-Email header. We map that email
// to a role and enforce per-role permissions here as a second layer of defense.
//
// Bindings/secrets (wrangler.jsonc + project secrets):
//   ASSETS            -> static assets binding
//   DB                -> D1 database binding -> shaka-clients
//   TURNSTILE_SECRET  -> secret (Turnstile secret key, used by /api/checkin)

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

// ---- Roles --------------------------------------------------------------
// Email (from Cloudflare Access) -> role. Lowercase keys.
const ROLES = {
  'fomigiorgix@gmail.com': 'owner',      // Giorgio: full access
  'info@shaka-fuerte.com': 'rental',     // Matteo: rental full + check-ins read only
  'shaka.center@gmail.com': 'instructor' // Instructors: check-ins read only
};

function getUser(request) {
  const email = (request.headers.get('Cf-Access-Authenticated-User-Email') || '').trim().toLowerCase();
  return { email: email, role: ROLES[email] || null };
}

// Permissions per role.
//   checkins_read  : view the check-ins table
//   rentals_read   : view rentals (admin overview + /rental page)
//   rentals_write  : add / edit / delete rentals
//   checkins_write : edit / delete a check-in record
function can(role, action) {
  if (role === 'owner') return true;
  if (role === 'rental') return action === 'checkins_read' || action === 'rentals_read' || action === 'rentals_write';
  if (role === 'instructor') return action === 'checkins_read';
  return false;
}

// Union of school + shop activities (canonical English values stored in DB).
const ALLOWED_ACTIVITIES = [
  'Windsurf lesson', 'Wingfoil lesson', 'Windsurf rental', 'Wingfoil rental', 'SUP / Kayak rental',
  'Kite rental', 'Kite lesson', 'Surf rental', 'Bodyboard / Skimboard rental', 'Skate rental'
];
const ALLOWED_POINTS = ['school', 'shop'];

const RENTAL_ITEMS = [
  'Windsurf rental', 'Kite rental', 'Kite lesson', 'Wingfoil rental',
  'Surf rental', 'Bodyboard / Skimboard rental', 'Skate rental', 'Other'
];

// ===== Email (Brevo transactional) ==========================================
// Welcome email on check-in (to everyone) and a Google-review request sent
// ~2 days later to marketing opt-ins only, driven by a Cron Trigger. Everything
// here runs only when BREVO_API_KEY is set and never blocks or breaks check-in.
const EMAIL = {
  from_name: 'Shaka Fuerte',
  from_email: 'hello@shaka-fuerte.com',
  reply_to: 'info@shaka-fuerte.com',
  logo: 'https://shaka-fuerte.com/images/logo-shaka-web.png',
  site: 'https://shaka-fuerte.com'
};
const REVIEW_LINKS = {
  school: 'https://g.page/r/CWE8qk9jJ7UhEBM/review',
  shop: 'https://g.page/r/CaZqaZ7KgNcKEBM/review'
};
const REVIEW_DELAY_HOURS = 48;   // send the review request 2 days after check-in
const REVIEW_HOUR_FROM = 9;      // only send between 09:00 and 20:00 Canary time
const REVIEW_HOUR_TO = 20;
const REVIEW_BATCH = 40;         // max review emails per cron run

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}
function normLang(l) {
  const x = String(l || 'en').slice(0, 2).toLowerCase();
  return (x === 'es' || x === 'it' || x === 'de') ? x : 'en';
}

const LEGAL = {
  en: { terms: '/terms.html', privacy: '/privacy.html', tL: 'Terms & Conditions', pL: 'Privacy Policy' },
  es: { terms: '/es/terms.html', privacy: '/es/privacy.html', tL: 'Términos y Condiciones', pL: 'Política de Privacidad' },
  it: { terms: '/it/terms.html', privacy: '/it/privacy.html', tL: 'Termini e Condizioni', pL: 'Privacy Policy' },
  de: { terms: '/de/terms.html', privacy: '/de/privacy.html', tL: 'AGB', pL: 'Datenschutz' }
};
const COPY = {
  en: {
    hi: 'Hi',
    w_sub: 'Welcome to Shaka, {name}!',
    w_body: "Thanks for checking in with Shaka Fuerte. We're stoked to have you on the water with us. If you need anything during your stay, just ask our team on the spot or reply to this email.",
    w_sign: 'See you out there, the Shaka Fuerte team',
    r_sub: 'How was your session, {name}?',
    r_body: 'We hope you had a great time with Shaka Fuerte. If you have a minute, a quick Google review would mean a lot and helps other people find us.',
    r_btn: 'Leave a review',
    r_sign: 'Thank you and see you soon, the Shaka Fuerte team',
    unsub: 'Unsubscribe'
  },
  es: {
    hi: 'Hola',
    w_sub: '¡Bienvenido a Shaka, {name}!',
    w_body: 'Gracias por registrarte en Shaka Fuerte. Nos alegra tenerte con nosotros en el agua. Si necesitas cualquier cosa durante tu estancia, pregunta a nuestro equipo en el centro o responde a este correo.',
    w_sign: 'Nos vemos en el agua, el equipo de Shaka Fuerte',
    r_sub: '¿Qué tal tu sesión, {name}?',
    r_body: 'Esperamos que lo hayas pasado genial con Shaka Fuerte. Si tienes un minuto, una breve reseña en Google significaría mucho y ayuda a que otros nos encuentren.',
    r_btn: 'Dejar una reseña',
    r_sign: 'Gracias y hasta pronto, el equipo de Shaka Fuerte',
    unsub: 'Darse de baja'
  },
  it: {
    hi: 'Ciao',
    w_sub: 'Benvenuto a Shaka, {name}!',
    w_body: 'Grazie per aver fatto il check-in da Shaka Fuerte. Siamo felici di averti con noi in acqua. Se ti serve qualcosa durante il soggiorno, chiedi al nostro team sul posto o rispondi a questa email.',
    w_sign: 'Ci vediamo in acqua, il team di Shaka Fuerte',
    r_sub: "Com'è andata la tua sessione, {name}?",
    r_body: 'Speriamo tu ti sia divertito con Shaka Fuerte. Se hai un minuto, una breve recensione su Google per noi significa molto e aiuta altri a trovarci.',
    r_btn: 'Lascia una recensione',
    r_sign: 'Grazie e a presto, il team di Shaka Fuerte',
    unsub: 'Annulla iscrizione'
  },
  de: {
    hi: 'Hallo',
    w_sub: 'Willkommen bei Shaka, {name}!',
    w_body: 'danke für deinen Check-in bei Shaka Fuerte. Schön, dass du mit uns aufs Wasser gehst. Wenn du während deines Aufenthalts etwas brauchst, frag einfach unser Team vor Ort oder antworte auf diese E-Mail.',
    w_sign: 'Wir sehen uns auf dem Wasser, dein Team von Shaka Fuerte',
    r_sub: 'Wie war deine Session, {name}?',
    r_body: 'wir hoffen, du hattest eine tolle Zeit bei Shaka Fuerte. Wenn du eine Minute hast, würde uns eine kurze Bewertung auf Google sehr helfen und andere finden uns leichter.',
    r_btn: 'Bewertung abgeben',
    r_sign: 'Danke und bis bald, dein Team von Shaka Fuerte',
    unsub: 'Abmelden'
  }
};
const UNSUB_MSG = {
  en: { t: 'Unsubscribed', b: "You won't receive review request emails from us anymore.", inv: 'This unsubscribe link is not valid.' },
  es: { t: 'Baja confirmada', b: 'Ya no recibirás correos de solicitud de reseña por nuestra parte.', inv: 'Este enlace de baja no es válido.' },
  it: { t: 'Iscrizione annullata', b: 'Non riceverai più email di richiesta recensione da parte nostra.', inv: 'Questo link di disiscrizione non è valido.' },
  de: { t: 'Abgemeldet', b: 'Du erhältst von uns keine E-Mails mit Bewertungsanfragen mehr.', inv: 'Dieser Abmeldelink ist ungültig.' }
};

async function unsubToken(env, id) {
  const secret = env.TURNSTILE_SECRET || 'shaka-unsub';
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('unsub:' + id));
  return Array.from(new Uint8Array(sig)).slice(0, 12).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
}

function emailShell(lang, bodyHtml) {
  const L = LEGAL[lang] || LEGAL.en;
  return '<!doctype html><html><body style="margin:0;background:#dbe3ea;font-family:Arial,Helvetica,sans-serif;color:#0d141c">' +
    '<div style="max-width:560px;margin:0 auto;padding:22px 14px">' +
      '<div style="text-align:center;margin-bottom:16px"><img src="' + EMAIL.logo + '" alt="Shaka Fuerte" width="120" style="width:120px;max-width:120px;height:auto"></div>' +
      '<div style="background:#ffffff;border-radius:16px;padding:24px 22px;font-size:16px;line-height:1.5">' + bodyHtml + '</div>' +
      '<div style="text-align:center;color:#465767;font-size:12px;margin-top:16px;line-height:1.7">' +
        'Shaka Fuerte SL · Costa Calma, Fuerteventura<br>' +
        '<a href="' + EMAIL.site + L.terms + '" style="color:#465767">' + L.tL + '</a> · ' +
        '<a href="' + EMAIL.site + L.privacy + '" style="color:#465767">' + L.pL + '</a>' +
      '</div>' +
    '</div></body></html>';
}

function welcomeEmail(client) {
  const lang = normLang(client.lang);
  const t = COPY[lang];
  const name = escapeHtml(client.first_name || '');
  const body = '<p style="margin:0 0 14px">' + t.hi + ' ' + name + ',</p>' +
    '<p style="margin:0 0 14px">' + t.w_body + '</p>' +
    '<p style="margin:0">' + t.w_sign + '</p>';
  return { subject: t.w_sub.replace('{name}', name), html: emailShell(lang, body) };
}

async function reviewEmail(env, client) {
  const lang = normLang(client.lang);
  const t = COPY[lang];
  const name = escapeHtml(client.first_name || '');
  const link = REVIEW_LINKS[client.point] || REVIEW_LINKS.shop;
  const token = await unsubToken(env, client.id);
  const unsubUrl = EMAIL.site + '/unsubscribe?id=' + client.id + '&t=' + token + '&l=' + lang;
  const btn = '<div style="text-align:center;margin:22px 0"><a href="' + link + '" style="display:inline-block;background:#0a6a72;color:#ffffff;text-decoration:none;font-weight:bold;padding:13px 26px;border-radius:10px">' + t.r_btn + '</a></div>';
  const body = '<p style="margin:0 0 14px">' + t.hi + ' ' + name + ',</p>' +
    '<p style="margin:0 0 4px">' + t.r_body + '</p>' + btn +
    '<p style="margin:0">' + t.r_sign + '</p>';
  const unsubLine = '<div style="text-align:center;margin-top:10px"><a href="' + unsubUrl + '" style="color:#8a99a8;font-size:11px">' + t.unsub + '</a></div>';
  const shell = emailShell(lang, body).replace('</div></body></html>', unsubLine + '</div></body></html>');
  return { subject: t.r_sub.replace('{name}', name), html: shell };
}

async function sendBrevo(env, toEmail, toName, subject, html) {
  if (!env.BREVO_API_KEY) return { skipped: true };
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', 'accept': 'application/json' },
    body: JSON.stringify({
      sender: { name: EMAIL.from_name, email: EMAIL.from_email },
      to: [{ email: toEmail, name: toName || undefined }],
      replyTo: { email: EMAIL.reply_to, name: EMAIL.from_name },
      subject: subject,
      htmlContent: html
    })
  });
  return { ok: res.ok, status: res.status };
}

async function sendWelcome(env, client) {
  const mail = welcomeEmail(client);
  return sendBrevo(env, client.email, client.first_name, mail.subject, mail.html);
}

// Cron: review request to eligible check-ins (2 days old, marketing opt-in,
// not yet sent), only within the Canary daytime window.
async function sendReviewBatch(env) {
  if (!env.BREVO_API_KEY) return;
  const now = new Date();
  let hour;
  try {
    hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Atlantic/Canary', hour: '2-digit', hour12: false }).format(now));
  } catch (e) { hour = now.getUTCHours(); }
  if (hour < REVIEW_HOUR_FROM || hour >= REVIEW_HOUR_TO) return;
  const cutoff = new Date(now.getTime() - REVIEW_DELAY_HOURS * 3600 * 1000).toISOString();
  const sel = await env.DB.prepare(
    `SELECT id, first_name, email, point, lang FROM clients
      WHERE review_sent = 0 AND marketing_consent = 1 AND email IS NOT NULL AND email <> ''
        AND created_at <= ?
      ORDER BY created_at ASC LIMIT ?`
  ).bind(cutoff, REVIEW_BATCH).all();
  const rows = (sel && sel.results) || [];
  for (const c of rows) {
    try {
      const mail = await reviewEmail(env, c);
      const r = await sendBrevo(env, c.email, c.first_name, mail.subject, mail.html);
      if (r && r.ok) {
        await env.DB.prepare('UPDATE clients SET review_sent = 1 WHERE id = ?').bind(c.id).run();
      }
    } catch (e) { /* leave review_sent = 0 so it retries next run */ }
  }
}

// GET /unsubscribe?id=..&t=..&l=.. — one-click opt-out of review emails.
async function handleUnsub(request, env) {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get('id'), 10);
  const t = url.searchParams.get('t') || '';
  const lang = normLang(url.searchParams.get('l'));
  const m = UNSUB_MSG[lang] || UNSUB_MSG.en;
  let ok = false;
  if (id && t) {
    try { ok = (t === await unsubToken(env, id)); } catch (e) { ok = false; }
    if (ok) { try { await env.DB.prepare('UPDATE clients SET marketing_consent = 0 WHERE id = ?').bind(id).run(); } catch (e) {} }
  }
  const title = ok ? m.t : 'Shaka Fuerte';
  const bodyTxt = ok ? m.b : m.inv;
  const page = '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + title + '</title></head>' +
    '<body style="margin:0;background:#dbe3ea;font-family:Arial,Helvetica,sans-serif;color:#0d141c">' +
    '<div style="max-width:460px;margin:60px auto;padding:0 20px;text-align:center">' +
    '<img src="' + EMAIL.logo + '" alt="Shaka Fuerte" width="110" style="width:110px;height:auto;margin-bottom:18px">' +
    '<h2 style="margin:0 0 10px">' + title + '</h2>' +
    '<p style="color:#465767;font-size:16px">' + bodyTxt + '</p></div></body></html>';
  return new Response(page, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

// GET /admin/api/test-emails?to=..&point=school|shop&lang=it&name=.. — TEMPORARY
// (owner only, behind Access). Sends welcome + review to ONE address on demand,
// so you can preview both without waiting for the cron. Safe to remove after.
async function handleTestEmails(request, env) {
  const u = getUser(request);
  if (u.role !== 'owner') return json({ error: 'forbidden' }, 403);
  if (!env.BREVO_API_KEY) return json({ hasKey: false, note: 'BREVO_API_KEY is not set' });
  const q = new URL(request.url).searchParams;
  const to = (q.get('to') || EMAIL.reply_to).trim();
  const point = (q.get('point') === 'shop') ? 'shop' : 'school';
  const lang = normLang(q.get('lang'));
  const name = (q.get('name') || 'Test').slice(0, 40);
  const client = { id: 0, first_name: name, email: to, point: point, lang: lang };
  const out = {};
  try { const w = welcomeEmail(client); out.welcome = await sendBrevo(env, to, name, w.subject, w.html); }
  catch (e) { out.welcome = { error: String(e) }; }
  try { const r = await reviewEmail(env, client); out.review = await sendBrevo(env, to, name, r.subject, r.html); }
  catch (e) { out.review = { error: String(e) }; }
  return json({ to: to, point: point, lang: lang, result: out });
}

// ---- GET /admin/api/me , /rental/api/me ------------------------------------
function handleMe(request) {
  const u = getUser(request);
  if (!u.role) return json({ error: 'forbidden' }, 403);
  return json({ ok: true, email: u.email, role: u.role });
}

// ---- POST /api/checkin (PUBLIC) --------------------------------------------
async function handleCheckin(request, env, ctx) {
  let data;
  try { data = await request.json(); }
  catch (e) { return json({ error: 'bad_request' }, 400); }

  const ip = request.headers.get('CF-Connecting-IP') || '';

  // 1) Verify Turnstile
  try {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: data.turnstileToken || '', remoteip: ip })
    });
    const outcome = await verify.json();
    if (!outcome.success) return json({ error: 'captcha' }, 400);
  } catch (e) {
    return json({ error: 'captcha' }, 400);
  }

  // 2) Validate
  const fields = ['first_name', 'last_name', 'email', 'phone', 'activity'];
  for (const f of fields) {
    if (!data[f] || !String(data[f]).trim()) return json({ error: 'missing_' + f }, 400);
  }
  const email = String(data.email).trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'email' }, 400);
  if (!data.waiver_consent || !data.privacy_consent) return json({ error: 'consent' }, 400);
  const activity = ALLOWED_ACTIVITIES.indexOf(data.activity) >= 0 ? data.activity : 'Other';
  const point = ALLOWED_POINTS.indexOf(data.point) >= 0 ? data.point : null;
  const participants = data.participants ? String(data.participants).trim().slice(0, 500) : null;

  // 3) Insert
  await env.DB.prepare(
    `INSERT INTO clients
       (first_name, last_name, email, phone, activity, point, participants,
        marketing_consent, waiver_consent, privacy_consent, review_sent,
        lang, ip, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)`
  ).bind(
    String(data.first_name).trim().slice(0, 80),
    String(data.last_name).trim().slice(0, 80),
    email.slice(0, 120),
    String(data.phone).trim().slice(0, 40),
    activity,
    point,
    participants,
    data.marketing_consent ? 1 : 0,
    1, 1,
    (data.lang || 'en').slice(0, 5),
    ip,
    new Date().toISOString()
  ).run();

  // Welcome email, non-blocking: it never delays or breaks the check-in.
  if (ctx && env.BREVO_API_KEY) {
    ctx.waitUntil(sendWelcome(env, {
      first_name: String(data.first_name).trim().slice(0, 80),
      email: email.slice(0, 120),
      point: point,
      lang: data.lang || 'en'
    }).catch(function () {}));
  }

  return json({ ok: true });
}

// ---- GET clients (check-ins) -----------------------------------------------
async function handleClients(request, env) {
  const u = getUser(request);
  if (!can(u.role, 'checkins_read')) return json({ error: 'forbidden' }, 403);

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim();

  const cols = `id, first_name, last_name, email, phone, activity, point, participants,
                marketing_consent, review_sent, lang, created_at`;
  let stmt;
  if (q) {
    const like = '%' + q + '%';
    stmt = env.DB.prepare(
      `SELECT ${cols} FROM clients
        WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR participants LIKE ?
        ORDER BY created_at DESC LIMIT 2000`
    ).bind(like, like, like, like);
  } else {
    stmt = env.DB.prepare(`SELECT ${cols} FROM clients ORDER BY created_at DESC LIMIT 2000`);
  }
  const { results } = await stmt.all();
  return json({ ok: true, count: results.length, clients: results });
}

// ---- GET rentals -----------------------------------------------------------
async function handleRentalsGet(request, env) {
  const u = getUser(request);
  if (!can(u.role, 'rentals_read')) return json({ error: 'forbidden' }, 403);
  const { results } = await env.DB.prepare(
    `SELECT id, client_id, item, extras, start_at, days, price, paid, notes, returned, returned_at, created_at
       FROM rentals ORDER BY created_at DESC LIMIT 5000`
  ).all();
  return json({ ok: true, rentals: results });
}

// ---- POST rental (insert/update) -------------------------------------------
async function handleRentalSave(request, env) {
  const u = getUser(request);
  if (!can(u.role, 'rentals_write')) return json({ error: 'forbidden' }, 403);
  let d;
  try { d = await request.json(); } catch (e) { return json({ error: 'bad_request' }, 400); }

  const item = RENTAL_ITEMS.indexOf(d.item) >= 0 ? d.item : 'Other';
  const extras = Array.isArray(d.extras) ? d.extras.join(', ') : (d.extras ? String(d.extras) : null);
  const days = Math.min(30, Math.max(1, parseInt(d.days, 10) || 1));
  const price = Math.max(0, parseFloat(d.price) || 0);
  const paid = Math.max(0, parseFloat(d.paid) || 0);
  const notes = d.notes ? String(d.notes).trim().slice(0, 500) : null;
  const returned = d.returned ? 1 : 0;
  const now = new Date().toISOString();
  const start_at = d.start_at ? String(d.start_at) : now;
  const returned_at = returned ? (d.returned_at || now) : null;

  try {
    if (d.id) {
      await env.DB.prepare(
        `UPDATE rentals SET item=?, extras=?, start_at=?, days=?, price=?, paid=?, notes=?, returned=?, returned_at=?
           WHERE id=?`
      ).bind(item, extras, start_at, days, price, paid, notes, returned, returned_at, parseInt(d.id, 10)).run();
      return json({ ok: true, id: parseInt(d.id, 10) });
    } else {
      const client_id = parseInt(d.client_id, 10);
      if (!client_id) return json({ error: 'missing_client' }, 400);
      const res = await env.DB.prepare(
        `INSERT INTO rentals (client_id, item, extras, start_at, days, price, paid, notes, returned, returned_at, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(client_id, item, extras, start_at, days, price, paid, notes, returned, returned_at, now).run();
      return json({ ok: true, id: res.meta && res.meta.last_row_id });
    }
  } catch (e) {
    return json({ error: 'server' }, 500);
  }
}

// ---- POST rental-delete ----------------------------------------------------
async function handleRentalDelete(request, env) {
  const u = getUser(request);
  if (!can(u.role, 'rentals_write')) return json({ error: 'forbidden' }, 403);
  let d;
  try { d = await request.json(); } catch (e) { return json({ error: 'bad_request' }, 400); }
  const id = parseInt(d.id, 10);
  if (!id) return json({ error: 'missing_id' }, 400);
  try {
    await env.DB.prepare('DELETE FROM rentals WHERE id=?').bind(id).run();
    return json({ ok: true });
  } catch (e) { return json({ error: 'server' }, 500); }
}

// ---- POST client-update ----------------------------------------------------
async function handleClientUpdate(request, env) {
  const u = getUser(request);
  if (!can(u.role, 'checkins_write')) return json({ error: 'forbidden' }, 403);
  let d;
  try { d = await request.json(); } catch (e) { return json({ error: 'bad_request' }, 400); }
  const id = parseInt(d.id, 10);
  if (!id) return json({ error: 'missing_id' }, 400);
  const point = (d.point === 'school' || d.point === 'shop') ? d.point : null;
  const activity = String(d.activity || '').trim().slice(0, 60);
  if (!activity) return json({ error: 'missing_activity' }, 400);
  const participants = d.participants ? String(d.participants).trim().slice(0, 500) : null;
  try {
    await env.DB.prepare('UPDATE clients SET point=?, activity=?, participants=? WHERE id=?')
      .bind(point, activity, participants, id).run();
    return json({ ok: true });
  } catch (e) { return json({ error: 'server' }, 500); }
}

// ---- POST client-delete (cascade rentals) ----------------------------------
async function handleClientDelete(request, env) {
  const u = getUser(request);
  if (!can(u.role, 'checkins_write')) return json({ error: 'forbidden' }, 403);
  let d;
  try { d = await request.json(); } catch (e) { return json({ error: 'bad_request' }, 400); }
  const id = parseInt(d.id, 10);
  if (!id) return json({ error: 'missing_id' }, 400);
  try {
    await env.DB.prepare('DELETE FROM rentals WHERE client_id=?').bind(id).run();
    await env.DB.prepare('DELETE FROM clients WHERE id=?').bind(id).run();
    return json({ ok: true });
  } catch (e) { return json({ error: 'server' }, 500); }
}

// ---- Entry -----------------------------------------------------------------
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const p = url.pathname;
    const m = request.method;
    try {
      // Public
      if (p === '/api/checkin') {
        if (m !== 'POST') return json({ error: 'method_not_allowed' }, 405);
        return await handleCheckin(request, env, ctx);
      }
      if (p === '/unsubscribe') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return await handleUnsub(request, env);
      }

      // Admin (behind Access app "Shaka Admin")
      if (p === '/admin/api/me') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return handleMe(request);
      }
      if (p === '/admin/api/test-emails') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return await handleTestEmails(request, env);
      }
      if (p === '/admin/api/clients') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return await handleClients(request, env);
      }
      if (p === '/admin/api/rentals') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return await handleRentalsGet(request, env);
      }
      if (p === '/admin/api/client-update') {
        if (m !== 'POST') return json({ error: 'method_not_allowed' }, 405);
        return await handleClientUpdate(request, env);
      }
      if (p === '/admin/api/client-delete') {
        if (m !== 'POST') return json({ error: 'method_not_allowed' }, 405);
        return await handleClientDelete(request, env);
      }

      // Rental (behind Access app "Shaka Rental")
      if (p === '/rental/api/me') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return handleMe(request);
      }
      if (p === '/rental/api/clients') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return await handleClients(request, env);
      }
      if (p === '/rental/api/rentals') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return await handleRentalsGet(request, env);
      }
      if (p === '/rental/api/rental') {
        if (m !== 'POST') return json({ error: 'method_not_allowed' }, 405);
        return await handleRentalSave(request, env);
      }
      if (p === '/rental/api/rental-delete') {
        if (m !== 'POST') return json({ error: 'method_not_allowed' }, 405);
        return await handleRentalDelete(request, env);
      }
    } catch (e) {
      return json({ error: 'server' }, 500);
    }
    return env.ASSETS.fetch(request);
  },

  // Cron Trigger (see wrangler.jsonc): delayed Google-review emails.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendReviewBatch(env));
  }
};
