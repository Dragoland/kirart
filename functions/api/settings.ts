import { Env, json, requireAdmin } from '../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT key, value FROM settings').all<{ key: string; value: string }>();
  const m = Object.fromEntries(results.map((r) => [r.key, r.value]));
  return json({ commissions_open: m.commissions_open !== 'false', slots: Number(m.slots) || 0 });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  const b = (await request.json().catch(() => ({}))) as { commissions_open?: boolean; slots?: number };
  const upsert = env.DB.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
  await env.DB.batch([
    upsert.bind('commissions_open', b.commissions_open ? 'true' : 'false'),
    upsert.bind('slots', String(Math.max(0, Math.min(99, Math.floor(Number(b.slots) || 0))))),
  ]);
  return json({ ok: true });
};
