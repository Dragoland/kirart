# Kirart Web

Portafolio gótico de Kirart: galería por secciones, tienda, comisiones, blog y **panel de administración** para publicar obras e imágenes desde la propia web.

**Stack:** React 19 · Vite 6 · TypeScript · Tailwind 3 · GSAP · React Router 7 · Cloudflare Pages + Pages Functions · D1 (base de datos) · R2 (imágenes).

## Paleta

| Nombre | HEX | Uso |
|---|---|---|
| Noir Black | `#1B1717` | Fondo (tema oscuro) y texto (tema claro) |
| Cotton | `#EDEBDD` | Texto (tema oscuro) y fondo (tema claro) |
| Cherry Red | `#810100` | Botones, acentos, arco del hero |
| Maroon | `#630000` | Niebla, hover, superficies |

Tipografías: **UnifrakturCook** (títulos grandes) · **Grenze Gotisch** (títulos medianos) · **Inter** (texto).

## Rutas

`/` · `/gallery` · `/gallery/:sección` (personajes, ilustracion, animacion, storyboard, adoptables, editorial, comics) · `/shop` · `/commissions` · `/tools` · `/tips` · `/blog` · `/blog/:slug` · `/contact` · `/admin`

Para añadir una sección nueva, agrega una línea en `src/lib/categories.ts`. El sitio, el panel y el servidor la reconocen.

## Probar en tu PC

```bash
npm install
npm run dev          # sitio con datos de ejemplo (sin backend)
```

Para probar también el panel y la base de datos en local:

```bash
cp .dev.vars.example .dev.vars    # y pon tu contraseña dentro
npm run db:local
npm run cf:dev                    # http://localhost:8788
```

## Publicar en Cloudflare Pages (paso a paso)

1. **Entra a Cloudflare desde la terminal:** `npx wrangler login`
2. **Crea la base de datos:** `npx wrangler d1 create kirart-db`. Copia el `database_id` que aparece y pégalo en `wrangler.toml`.
3. **Crea el almacén de imágenes:** `npx wrangler r2 bucket create kirart-images`
4. **Crea las tablas:** `npm run db:remote`
5. **Sube el código a GitHub** (el proyecto `kirart` de Pages ya conectado a tu repo se redespliega solo). Configuración de build: comando `npm run build`, carpeta de salida `dist`.
6. **Pon tus claves secretas:** Cloudflare → Workers & Pages → kirart → Settings → Variables and Secrets → añade, como *Secret*:
   - `ADMIN_PASSWORD`: la contraseña con la que entras al panel.
   - `SESSION_SECRET`: una frase larga y aleatoria (32+ caracteres).
7. **Vuelve a desplegar** (Deployments → Retry deployment) para que tome las claves.

Los enlaces `D1` y `R2` (`DB` e `IMAGES`) ya vienen en `wrangler.toml`; no hace falta crearlos a mano en el panel.

## Subir obras y publicaciones (sin tocar el código)

1. Entra a `https://kirart.pages.dev/admin` (o pulsa la **†** discreta del pie de página).
2. Escribe tu contraseña.
3. Pestaña **Obras → Publicar una obra nueva**:
   - Pulsa **Subir imagen**. La foto se reduce sola a un tamaño web ligero antes de subirse.
   - Elige la **sección**, escribe el título y, si la vendes, el precio (0 = no se vende).
   - Opcional: descripción, etiquetas y un enlace de video (útil en Animación).
   - Marca “Mostrar en Obras destacadas” si quieres que salga en la portada.
   - Pulsa **Publicar obra**. Aparece al instante en su sección, en la portada y en la tienda.
4. Para cambiar o borrar una obra, usa **Editar** o el icono de papelera en la lista de abajo.
5. Pestaña **Blog**: escribe en Markdown (`## Título`, `**negrita**`, `- lista`) y publica.
6. Pestaña **Comisiones**: abre o cierra comisiones y cambia el número de cupos que se muestra.

## Seguridad

- El panel usa una cookie firmada, `HttpOnly` y `SameSite=Strict`, que dura 7 días. Todas las rutas que modifican datos revisan esa cookie en el servidor.
- La contraseña nunca va en el código: vive solo en los Secrets de Cloudflare.
- Si quieres una capa extra, puedes proteger `/admin` y `/api` con Cloudflare Access (gratis hasta 50 usuarios).

## Estructura

```
functions/            # Backend (Pages Functions)
  _lib/http.ts        # sesión, validación y utilidades
  api/session.ts      # login / logout
  api/artworks/       # CRUD de obras
  api/posts/          # CRUD del blog
  api/settings.ts     # estado de comisiones
  api/upload.ts       # subida de imágenes a R2
  api/images/[key].ts # sirve las imágenes
schema.sql            # tablas de D1
wrangler.toml         # enlaces a D1 y R2
src/                  # Sitio React (misma estructura que antes)
```

## Cambios respecto a la versión anterior

- Se eliminó `gray-matter` y los `.md` del blog: ahora los posts viven en D1. `src/content/` y `public/_redirects` ya no se usan (Pages hace el fallback de SPA automáticamente).
- `vite.config.ts` usa `base: '/'`; con `'./'` las rutas anidadas como `/gallery/comics` rompían los assets.
- `useScrollReveal` ya no mata los ScrollTrigger de otras páginas al desmontarse.
- Los formularios, el carrito y el panel usan elementos nativos con clases propias (`.btn-primary`, `.input`, `.panel` en `index.css`), así que la carpeta `components/ui/` ya no se importa. Puedes dejarla o borrarla.
