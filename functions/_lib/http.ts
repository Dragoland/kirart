import { CATEGORY_KEYS } from '../../src/lib/categories';

export interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}

export const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

/* ---------- Sesión de administradora (cookie firmada con HMAC) ---------- */
const COOKIE = 'kirart_session';
const SESSION_DAYS = 7;
const enc = new TextEncoder();

async function hmac(data: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
  let s = '';
  sig.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function passwordMatches(input: string, env: Env) {
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) return false;
  return safeEqual(await hmac(input, env.SESSION_SECRET), await hmac(env.ADMIN_PASSWORD, env.SESSION_SECRET));
}

export async function sessionCookie(env: Env) {
  const exp = String(Date.now() + SESSION_DAYS * 86_400_000);
  const value = `${exp}.${await hmac(exp, env.SESSION_SECRET)}`;
  return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86_400}`;
}

export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export async function isAdmin(request: Request, env: Env) {
  if (!env.SESSION_SECRET) return false;
  const m = request.headers.get('Cookie')?.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return false;
  const [exp, sig] = m[1].split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(exp, env.SESSION_SECRET));
}

/** Devuelve una respuesta 401 si NO es la administradora; null si todo bien. */
export async function requireAdmin(request: Request, env: Env) {
  return (await isAdmin(request, env)) ? null : json({ error: 'No autorizado' }, 401);
}

/* ---------- Validación y mapeo ---------- */
const parseTags = (raw: unknown): string[] => {
  try {
    const v = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
};

export const rowToArtwork = (r: Record<string, unknown>) => ({
  id: Number(r.id),
  title: String(r.title),
  category: String(r.category),
  description: String(r.description ?? ''),
  price: Number(r.price) || 0,
  image: String(r.image),
  link: String(r.link ?? ''),
  tags: parseTags(r.tags),
  featured: !!r.featured,
});

export function parseArtwork(b: Record<string, unknown>) {
  const title = String(b.title ?? '').trim().slice(0, 120);
  if (!title) throw new Error('Falta el título');
  const category = String(b.category ?? '');
  if (!CATEGORY_KEYS.includes(category)) throw new Error('Categoría inválida');
  const image = String(b.image ?? '').trim();
  if (!image) throw new Error('Falta la imagen');
  if (!/^(\/[^/]|https:\/\/)/.test(image)) throw new Error('La imagen debe ser una ruta del sitio o una URL https');
  const link = String(b.link ?? '').trim();
  if (link && !/^https:\/\//.test(link)) throw new Error('El enlace debe empezar por https://');
  const tags = (Array.isArray(b.tags) ? b.tags : []).map((t) => String(t).trim().slice(0, 30)).filter(Boolean).slice(0, 8);
  return {
    title,
    category,
    description: String(b.description ?? '').trim().slice(0, 2000),
    price: Math.max(0, Number(b.price) || 0),
    image,
    link,
    tags: JSON.stringify(tags),
    featured: b.featured ? 1 : 0,
  };
}

export const isR2Url = (u: string) => u.startsWith('/api/images/');
export const r2Key = (u: string) => u.replace('/api/images/', '');

export const rowToPost = (r: Record<string, unknown>) => ({
  slug: String(r.slug),
  title: String(r.title),
  excerpt: String(r.excerpt ?? ''),
  content: String(r.content ?? ''),
  tags: parseTags(r.tags),
  date: String(r.date),
});

export function parsePost(b: Record<string, unknown>) {
  const title = String(b.title ?? '').trim().slice(0, 160);
  if (!title) throw new Error('Falta el título');
  const tags = (Array.isArray(b.tags) ? b.tags : []).map((t) => String(t).trim().slice(0, 30)).filter(Boolean).slice(0, 8);
  const date = String(b.date ?? '').slice(0, 10) || new Date().toISOString().slice(0, 10);
  return {
    title,
    excerpt: String(b.excerpt ?? '').trim().slice(0, 400),
    content: String(b.content ?? '').slice(0, 60_000),
    tags: JSON.stringify(tags),
    date,
  };
}
