// POST /api/checkin — receives the check-in form, verifies Turnstile, writes to D1.
// Cloudflare Pages Function. Bindings/secrets required (set in Pages project settings):
//   DB                -> D1 database binding (name: DB)  -> shaka-clients
//   TURNSTILE_SECRET  -> Cloudflare Turnstile secret key (env variable / secret)

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json({ error: 'bad_request' }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP') || '';

  // 1) Verify Turnstile
  try {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET,
        response: data.turnstileToken || '',
        remoteip: ip
      })
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

  const allowedActivities = [
    'Windsurf lesson', 'Wingfoil lesson', 'Windsurf rental', 'Wing / Kite rental', 'SUP / Kayak'
  ];
  const activity = allowedActivities.indexOf(data.activity) >= 0 ? data.activity : 'Other';

  // 3) Insert
  try {
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
      1,
      1,
      (data.lang || 'en').slice(0, 5),
      ip,
      new Date().toISOString()
    ).run();
  } catch (e) {
    return json({ error: 'server' }, 500);
  }

  return json({ ok: true });
}
// Any non-POST method to /api/checkin returns 405 automatically (only POST is handled).
