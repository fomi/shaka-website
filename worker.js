// Cloudflare Worker entry for the "shaka-website" project.
//
// Routing is asset-first: any request that matches a static file (index.html,
// school.html, checkin.html -> /checkin, admin.html -> /admin, ...) is served
// directly by Cloudflare and NEVER runs this Worker. This Worker is invoked
// ONLY for requests with no matching file — here we handle the two API routes
// and let everything else fall through to the static assets.
//
// Bindings/secrets required (declared in wrangler.jsonc + project secrets):
//   ASSETS            -> static assets binding (wrangler.jsonc)
//   DB                -> D1 database binding    (wrangler.jsonc) -> shaka-clients
//   TURNSTILE_SECRET  -> secret (Turnstile secret key)
//   ADMIN_PASSWORD    -> secret (password for /admin)

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

const ALLOWED_ACTIVITIES = [
  'Windsurf lesson', 'Wingfoil lesson', 'Windsurf rental', 'Wing / Kite rental', 'SUP / Kayak'
];

// ---- POST /api/checkin ------------------------------------------------------
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

  // 3) Insert
  await env.DB.prepare(
    `INSERT INTO clients
       (first_name, last_name, email, phone, activity,
        marketing_consent, waiver_consent, privacy_consent, review_sent,
        lang, ip, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)`
  ).bind(
    String(data.first_name).trim().slice(0, 80),
    String(data.last_name).trim().slice(0, 80),
    email.slice(0, 120),
    String(data.phone).trim().slice(0, 40),
    activity,
    data.marketing_consent ? 1 : 0,
    1, 1,
    (data.lang || 'en').slice(0, 5),
    ip,
    new Date().toISOString()
  ).run();

  return json({ ok: true });
}

// ---- GET /api/clients (admin) ----------------------------------------------
async function handleClients(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const pw = auth.replace(/^Bearer\s+/i, '');
  if (!env.ADMIN_PASSWORD || pw !== env.ADMIN_PASSWORD) return json({ error: 'unauthorized' }, 401);

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim();

  let stmt;
  const cols = `id, first_name, last_name, email, phone, activity,
                marketing_consent, review_sent, lang, created_at`;
  if (q) {
    const like = '%' + q + '%';
    stmt = env.DB.prepare(
      `SELECT ${cols} FROM clients
        WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?
        ORDER BY created_at DESC LIMIT 2000`
    ).bind(like, like, like);
  } else {
    stmt = env.DB.prepare(`SELECT ${cols} FROM clients ORDER BY created_at DESC LIMIT 2000`);
  }
  const { results } = await stmt.all();
  return json({ ok: true, count: results.length, clients: results });
}

// ---- Entry ------------------------------------------------------------------
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;

    // API routes only. Any unexpected error here returns JSON and can never
    // affect static page delivery (static pages don't run this Worker).
    try {
      if (p === '/api/checkin') {
        if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
        return await handleCheckin(request, env);
      }
      if (p === '/api/clients') {
        if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405);
        return await handleClients(request, env);
      }
    } catch (e) {
      return json({ error: 'server' }, 500);
    }

    // Not an API route → hand back to static assets (404 handling included).
    return env.ASSETS.fetch(request);
  }
};
