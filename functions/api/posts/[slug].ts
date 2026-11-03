import { Env, json, requireAdmin, parsePost } from '../../_lib/http';

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  try {
    const p = parsePost((await request.json()) as Record<string, unknown>);
    const res = await env.DB
      .prepare('UPDATE posts SET title=?, excerpt=?, content=?, tags=?, date=? WHERE slug=?')
      .bind(p.title, p.excerpt, p.content, p.tags, p.date, String(params.slug))
      .run();
    return res.meta.changes ? json({ ok: true }) : json({ error: 'No existe' }, 404);
  } catch (e) {
    return json({ error: (e as Error).message }, 400);
  }
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  await env.DB.prepare('DELETE FROM posts WHERE slug = ?').bind(String(params.slug)).run();
  return json({ ok: true });
};
