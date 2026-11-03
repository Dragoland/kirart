import { Env, json, requireAdmin, rowToArtwork, parseArtwork } from '../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT * FROM artworks ORDER BY id DESC').all();
  return json(results.map(rowToArtwork));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  try {
    const a = parseArtwork((await request.json()) as Record<string, unknown>);
    const res = await env.DB
      .prepare('INSERT INTO artworks (title, category, description, price, image, link, tags, featured) VALUES (?,?,?,?,?,?,?,?)')
      .bind(a.title, a.category, a.description, a.price, a.image, a.link, a.tags, a.featured)
      .run();
    return json({ id: res.meta.last_row_id }, 201);
  } catch (e) {
    return json({ error: (e as Error).message }, 400);
  }
};
