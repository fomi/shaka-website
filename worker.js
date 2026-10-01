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
  'Surf rental', 'Bodyboard / Skimboard rental', 'Skate rental', 'Altro'
];

// ---- GET /admin/api/me , /rental/api/me ------------------------------------
function handleMe(request) {
  const u = getUser(request);
  if (!u.role) return json({ error: 'forbidden' }, 403);
  return json({ ok: true, email: u.email, role: u.role });
}

// ---- POST /api/checkin (PUBLIC) --------------------------------------------
async function handleCheckin(request, env) {
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

  const item = RENTAL_ITEMS.indexOf(d.item) >= 0 ? d.item : 'Altro';
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
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    const m = request.method;
    try {
      // Public
      if (p === '/api/checkin') {
        if (m !== 'POST') return json({ error: 'method_not_allowed' }, 405);
        return await handleCheckin(request, env);
      }

      // Admin (behind Access app "Shaka Admin")
      if (p === '/admin/api/me') {
        if (m !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return handleMe(request);
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
  }
};
