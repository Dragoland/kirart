import { Env } from '../../_lib/http';

// GET /api/images/<clave>  -> sirve la imagen guardada en R2 (pública, con caché larga)
export const onRequestGet: PagesFunction<Env> = async ({ params, env, request }) => {
  const key = String(params.key);
  if (!/^[\w.-]+$/.test(key)) return new Response('No encontrada', { status: 404 });
  const obj = await env.IMAGES.get(key);
  if (!obj) return new Response('No encontrada', { status: 404 });
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('etag', obj.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  if (request.headers.get('If-None-Match') === obj.httpEtag) return new Response(null, { status: 304, headers });
  return new Response(obj.body, { headers });
};
