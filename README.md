# 🎨 Kirart — Ilustración & Comisiones

Portfolio web modular para KiraLizt, ilustradora cubana. Galería interactiva, tienda con carrito, sistema de comisiones vía WhatsApp, blog con Markdown y diseño responsive con tema oscuro/claro.

**URL de producción:** [https://kirart.pages.dev](https://kirart.pages.dev) *(próximamente)*

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Framework** | React 19 + TypeScript |
| **Bundler** | Vite 6 |
| **Routing** | React Router DOM v7 (SPA) |
| **Estilos** | Tailwind CSS 3.4 + shadcn/ui |
| **Animaciones** | GSAP + ScrollTrigger |
| **Blog** | react-markdown + remark-gfm + gray-matter |
| **Iconos** | Lucide React |
| **Deploy** | Cloudflare Pages |

---

## 📁 Estructura del Proyecto

```
kirart-web/
├── public/                  # Assets estáticos + imágenes de obras
│   ├── images/              # /images/art-{1..8}.jpg
│   └── _redirects           # SPA fallback para Cloudflare
├── src/
│   ├── App.tsx              # Router principal (9 rutas)
│   ├── main.tsx             # Entry point
│   ├── index.css            # Variables CSS + Tailwind directives
│   ├── lib/
│   │   └── utils.ts         # cn() helper (clsx + tailwind-merge)
│   ├── types/
│   │   └── index.ts         # Interfaces: Artwork, CartItem, Tool, BlogPost
│   ├── data/
│   │   ├── artworks.ts      # Catálogo de obras
│   │   └── tools.ts         # Stack de herramientas (estilo BitCriollo)
│   ├── context/
│   │   └── CartContext.tsx  # Estado global del carrito (React Context)
│   ├── hooks/
│   │   ├── useTheme.ts      # Persistencia tema dark/light
│   │   └── useScrollReveal.ts # Wrapper GSAP ScrollTrigger
│   ├── components/
│   │   ├── ui/              # 40 componentes shadcn/ui (Radix-based)
│   │   ├── layout/
│   │   │   ├── Header.tsx   # Navegación desktop/mobile + tema + carrito
│   │   │   ├── CartSidebar.tsx # Sheet lateral con checkout WhatsApp
│   │   │   └── WhatsAppFloat.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx     # Animación GSAP de entrada
│   │   │   └── FeaturedGrid.tsx
│   │   ├── gallery/
│   │   │   ├── ArtCard.tsx  # Tarjeta con hover overlay
│   │   │   └── Lightbox.tsx # Modal ampliado con acciones
│   │   └── shared/
│   │       └── Toast.tsx    # Notificaciones globales
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GalleryPage.tsx      # Filtros por categoría
│   │   ├── ShopPage.tsx         # Listado + add-to-cart
│   │   ├── CommissionsPage.tsx  # Precios + formulario → WhatsApp
│   │   ├── ToolsPage.tsx        # Grid estilo terminal
│   │   ├── TipsPage.tsx         # Grid 2x2 para clientes
│   │   ├── BlogListPage.tsx
│   │   ├── BlogPostPage.tsx     # gray-matter + react-markdown
│   │   └── ContactPage.tsx
│   └── content/blog/        # Posts en Markdown con frontmatter
│       ├── mi-proceso-creativo.md
│       ├── herramientas-2026.md
│       └── inspiracion-cubana.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

---

## ⚡ Instalación Rápida

```bash
# 1. Clonar
git clone https://github.com/tu-usuario/kirart-web.git
cd kirart-web

# 2. Instalar dependencias
npm install

# 3. Modo desarrollo
npm run dev

# 4. Build de producción
npm run build
```

> **Nota:** El proyecto usa `import.meta.glob` de Vite para cargar archivos `.md` del blog. Asegúrate de que los posts estén en `src/content/blog/`.

---

## 🔧 Configuración antes del deploy

### 1. Reemplazar imágenes placeholder
Las obras usan rutas en `/public/images/art-{id}.jpg`. Sustitúyelas por las ilustraciones reales de KiraLizt.

### 2. Ajustar datos de contacto
Edita estos archivos con la información real:

- `src/data/artworks.ts` — precios, títulos, tags
- `src/pages/ContactPage.tsx` — email, redes sociales, teléfono
- `src/context/CartContext.tsx` y páginas con checkout — número de WhatsApp (`5356870519`)

### 3. Variables de tema
El tema se alterna entre `dark` y `light` vía clase en `<html>`. Las variables CSS están definidas en `src/index.css`. La paleta principal usa:
- **Primary:** `#e63946` (rojo coral)
- **Accent:** `#3b82f6` (azul)

---

## 🌐 Deploy en Cloudflare Pages

### Opción A: Git integration (recomendado)
1. Sube el repo a GitHub/GitLab.
2. En Cloudflare Dashboard → **Pages** → **Create a project**.
3. Conecta tu repo.
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. El archivo `public/_redirects` ya está configurado para SPA routing:
   ```
   /*    /index.html   200
   ```

### Opción B: Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=kirart
```

---

## 🧩 Arquitectura y Convenciones

### Estado global
- **Carrito:** React Context (`CartContext`) con `useState` + `useCallback`. Persistencia no es necesaria (checkout va directo a WhatsApp).

### Routing
- React Router v7 con `BrowserRouter`.
- Rutas dinámicas para blog: `/blog/:slug`.
- `ScrollToTop` implícito en cada cambio de página vía `window.scrollTo(0, 0)` en los layouts.

### shadcn/ui
Los 40 componentes en `src/components/ui/` usan la convención `data-slot` y dependen de:
- Radix UI primitives
- `cn()` para merging de clases
- Tokens de Tailwind (`bg-card`, `text-primary`, etc.)

### Blog (Markdown)
Los posts usan **frontmatter** procesado con `gray-matter`:

```markdown
---
title: "Título del post"
date: "2026-07-28"
excerpt: "Descripción corta"
---

Contenido en Markdown...
```

Se cargan en build-time con `import.meta.glob`, por lo que no requieren backend.

### WhatsApp Integration
Todas las acciones de compra/comisión generan un mensaje pre-formateado que se abre en WhatsApp Web/App:

```
https://wa.me/5356870519?text=...
```

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción (TypeScript + Vite) |
| `npm run preview` | Previsualizar build local |

---

## 🎨 Personalización visual

### Fuentes
Google Fonts se cargan en `index.html`:
- **Space Grotesk** — títulos y display
- **Inter** — cuerpo de texto
- **JetBrains Mono** — terminal/tools

### Gradientes principales
```css
bg-gradient-to-r from-primary to-accent   /* Rojo → Azul */
bg-gradient-to-br from-primary to-accent  /* Variante hero */
```

### Breakpoints responsive
- Mobile: `< 768px` (menú hamburguesa, grids 1 columna)
- Desktop: `≥ 768px` (navegación horizontal, grids multi-columna)

---

## 📝 To-Do / Próximos pasos

- [ ] Reemplazar imágenes placeholder por obras reales
- [ ] Conectar dominio personalizado en Cloudflare
- [ ] Añadir metatags OG/Twitter para SEO
- [ ] Implementar sitemap.xml
- [ ] Lazy loading de imágenes con blur placeholder
- [ ] Añadir más posts al blog

---

## 👤 Autor

**KiraLizt** — Ilustradora cubana  
📱 [WhatsApp](https://wa.me/5356870519) · 🎨 [Portfolio](https://kirart.pages.dev)

---

## 📄 Licencia

Este proyecto es privado. El código fuente y las ilustraciones son propiedad de KiraLizt.
