// Backend gratis en Cloudflare Pages Functions + KV. Solo tú (con contraseña) puedes publicar/borrar.
const enc = new TextEncoder();
const json = (d, s = 200, h = {}) => new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json', ...h } });

async function sign(secret, data) {
  const k = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(data)));
  return btoa(String.fromCharCode(...sig)).replace(/[+/=]/g, '');
}
async function isAdmin(req, env) {
  const m = (req.headers.get('Cookie') || '').match(/kt=([^;]+)/);
  if (!m || !env.ADMIN_PASSWORD) return false;
  const [exp, sig] = m[1].split('.');
  if (!exp || Number(exp) < Date.now()) return false;
  return sig === (await sign(env.ADMIN_PASSWORD, exp));
}

export async function onRequest({ request, env, params }) {
  const path = (params.path || []).join('/');
  const method = request.method;
  const kv = env.KIRART;
  if (!kv) return json({ error: 'Falta el binding KV "KIRART"' }, 500);
  const list = async () => JSON.parse((await kv.get('works')) || '[]');

  if (path === 'works' && method === 'GET') return json(await list(), 200, { 'Cache-Control': 'no-store' });

  if (path.startsWith('img/') && method === 'GET') {
    const { value, metadata } = await kv.getWithMetadata('img:' + path.slice(4), 'arrayBuffer');
    if (!value) return new Response('No existe', { status: 404 });
    return new Response(value, { headers: { 'Content-Type': metadata?.type || 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' } });
  }

  if (path === 'me') return json({ admin: await isAdmin(request, env) });

  if (path === 'login' && method === 'POST') {
    const { password } = await request.json().catch(() => ({}));
    if (!password || !env.ADMIN_PASSWORD || (await sign('x', password)) !== (await sign('x', env.ADMIN_PASSWORD)))
      return json({ error: 'Contraseña incorrecta' }, 401);
    const exp = String(Date.now() + 7 * 864e5);
    const token = exp + '.' + (await sign(env.ADMIN_PASSWORD, exp));
    return json({ ok: true }, 200, { 'Set-Cookie': `kt=${token}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Strict` });
  }
  if (path === 'logout') return json({ ok: true }, 200, { 'Set-Cookie': 'kt=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict' });

  // --- Desde aquí: solo administradora ---
  if (!(await isAdmin(request, env))) return json({ error: 'No autorizada' }, 401);

  if (path === 'works' && method === 'POST') {
    const b = await request.json();
    const m = /^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/.exec(b.image || '');
    if (!m || !b.title || !b.cat) return json({ error: 'Datos incompletos' }, 400);
    const bin = Uint8Array.from(atob(m[2]), c => c.charCodeAt(0));
    if (bin.length > 8e6) return json({ error: 'Imagen muy pesada' }, 413);
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    await kv.put('img:' + id, bin, { metadata: { type: m[1] } });
    const works = await list();
    works.unshift({ id, title: String(b.title).slice(0, 120), cat: b.cat, desc: String(b.desc || '').slice(0, 800), price: String(b.price || '').slice(0, 30), img: '/api/img/' + id, date: new Date().toISOString() });
    await kv.put('works', JSON.stringify(works));
    return json({ ok: true, id });
  }

  if (path.startsWith('works/') && method === 'DELETE') {
    const id = path.slice(6);
    await kv.delete('img:' + id);
    await kv.put('works', JSON.stringify((await list()).filter(w => w.id !== id)));
    return json({ ok: true });
  }
  return json({ error: 'No encontrado' }, 404);
}
