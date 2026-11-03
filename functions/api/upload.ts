import { Env, json, requireAdmin } from '../_lib/http';

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' };
const MAX_BYTES = 10 * 1024 * 1024;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) return json({ error: 'Falta el archivo' }, 400);
  const ext = TYPES[file.type];
  if (!ext) return json({ error: 'Formato no permitido (usa JPG, PNG, WebP, GIF o AVIF)' }, 400);
  if (file.size > MAX_BYTES) return json({ error: 'La imagen supera 10 MB' }, 400);
  const key = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  await env.IMAGES.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
  return json({ url: `/api/images/${key}` }, 201);
};
