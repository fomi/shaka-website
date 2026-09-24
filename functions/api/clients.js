// GET /api/clients — admin read of the client list. Password-protected.
// Cloudflare Pages Function. Requires:
//   DB              -> D1 binding (shaka-clients)
//   ADMIN_PASSWORD  -> secret (env variable) used by admin.html to authenticate
//
// admin.html sends:  Authorization: Bearer <ADMIN_PASSWORD>
// Query params:      ?q=<search>   (matches first/last name or email)
//
// NOTE: this is a simple shared-password gate over HTTPS — fine for a small
// internal tool. For stronger protection later, put the /admin path and this
// endpoint behind Cloudflare Access (free for small teams).

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;

  // Auth
  const auth = request.headers.get('Authorization') || '';
  const pw = auth.replace(/^Bearer\s+/i, '');
  if (!env.ADMIN_PASSWORD || pw !== env.ADMIN_PASSWORD) {
    return json({ error: 'unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim();

  let stmt;
  if (q) {
    const like = '%' + q + '%';
    stmt = env.DB.prepare(
      `SELECT id, first_name, last_name, email, phone, activity,
              marketing_consent, review_sent, lang, created_at
         FROM clients
        WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?
        ORDER BY created_at DESC
        LIMIT 2000`
    ).bind(like, like, like);
  } else {
    stmt = env.DB.prepare(
      `SELECT id, first_name, last_name, email, phone, activity,
              marketing_consent, review_sent, lang, created_at
         FROM clients
        ORDER BY created_at DESC
        LIMIT 2000`
    );
  }

  try {
    const { results } = await stmt.all();
    return json({ ok: true, count: results.length, clients: results });
  } catch (e) {
    return json({ error: 'server' }, 500);
  }
}
