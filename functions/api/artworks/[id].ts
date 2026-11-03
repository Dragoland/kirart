import { Env, json, requireAdmin, parseArtwork, isR2Url, r2Key } from '../../_lib/http';

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  const id = Number(params.id);
  try {
    const a = parseArtwork((await request.json()) as Record<string, unknown>);
    const old = await env.DB.prepare('SELECT image FROM artworks WHERE id = ?').bind(id).first<{ image: string }>();
    if (!old) return json({ error: 'No existe' }, 404);
    await env.DB
      .prepare('UPDATE artworks SET title=?, category=?, description=?, price=?, image=?, link=?, tags=?, featured=? WHERE id=?')
      .bind(a.title, a.category, a.description, a.price, a.image, a.link, a.tags, a.featured, id)
      .run();
    if (old.image !== a.image && isR2Url(old.image)) await env.IMAGES.delete(r2Key(old.image));
    return json({ ok: true });
  } catch (e) {
    return json({ error: (e as Error).message }, 400);
  }
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  const id = Number(params.id);
  const old = await env.DB.prepare('SELECT image FROM artworks WHERE id = ?').bind(id).first<{ image: string }>();
  await env.DB.prepare('DELETE FROM artworks WHERE id = ?').bind(id).run();
  if (old && isR2Url(old.image)) await env.IMAGES.delete(r2Key(old.image));
  return json({ ok: true });
};
