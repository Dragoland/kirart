import { Env, json, isAdmin, passwordMatches, sessionCookie, clearCookie } from '../_lib/http';

// GET /api/session  -> ¿hay sesión de administradora?
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) =>
  json({ admin: await isAdmin(request, env) });

// POST /api/session  { password }  -> iniciar sesión
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
    return json({ error: 'Falta configurar ADMIN_PASSWORD y SESSION_SECRET en Cloudflare' }, 500);
  }
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  if (!(await passwordMatches(String(body.password ?? ''), env))) {
    await new Promise((r) => setTimeout(r, 700)); // frena intentos por fuerza bruta
    return json({ error: 'Contraseña incorrecta' }, 401);
  }
  return json({ admin: true }, 200, { 'Set-Cookie': await sessionCookie(env) });
};

// DELETE /api/session  -> cerrar sesión
export const onRequestDelete: PagesFunction<Env> = async () =>
  json({ admin: false }, 200, { 'Set-Cookie': clearCookie() });
