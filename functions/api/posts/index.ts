import { Env, json, requireAdmin, rowToPost, parsePost } from '../../_lib/http';

const slugify = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT * FROM posts ORDER BY date DESC').all();
  return json(results.map(rowToPost));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const p = parsePost(body);
    const slug = slugify(String(body.slug || p.title));
    if (!slug) throw new Error('Título inválido');
    const exists = await env.DB.prepare('SELECT 1 FROM posts WHERE slug = ?').bind(slug).first();
    if (exists) throw new Error('Ya existe un post con ese título');
    await env.DB
      .prepare('INSERT INTO posts (slug, title, excerpt, content, tags, date) VALUES (?,?,?,?,?,?)')
      .bind(slug, p.title, p.excerpt, p.content, p.tags, p.date)
      .run();
    return json({ slug }, 201);
  } catch (e) {
    return json({ error: (e as Error).message }, 400);
  }
};
