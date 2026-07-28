# 🎨 Kirart Web

Portafolio web modular para **KiraLizt** — ilustradora cubana. Galería, tienda, comisiones, blog y contacto en una SPA moderna, rápida y desplegable en Cloudflare Pages.

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | [React 19](https://react.dev/) |
| Bundler | [Vite 6](https://vitejs.dev/) |
| Lenguaje | [TypeScript 5.6](https://www.typescriptlang.org/) |
| Estilos | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Componentes UI | [shadcn/ui](https://ui.shadcn.com/) (40 componentes Radix) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Animaciones | [GSAP 3.12](https://gsap.com/) + ScrollTrigger |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| Frontmatter | [gray-matter](https://github.com/jonschlinkert/gray-matter) |
| Íconos | [Lucide React](https://lucide.dev/) |
| Formularios | [react-hook-form](https://react-hook-form.com/) (preparado) |

---

## 📁 Estructura del Proyecto

```
kirart-web/
├── public/                    # Assets estáticos + _redirects
│   ├── images/               # Obras de arte (reemplazar placeholders)
│   └── _redirects            # SPA fallback para Cloudflare Pages
├── src/
│   ├── main.tsx              # Punto de entrada
│   ├── App.tsx               # Router principal
│   ├── index.css             # Tailwind + variables CSS dark/light
│   ├── lib/
│   │   └── utils.ts          # cn() — utilidad de clases
│   ├── types/
│   │   └── index.ts          # Tipos globales (Artwork, CartItem, etc.)
│   ├── data/
│   │   ├── artworks.ts       # Catálogo de obras
│   │   └── tools.ts          # Herramientas del estudio
│   ├── context/
│   │   └── CartContext.tsx   # Estado global del carrito
│   ├── hooks/
│   │   ├── useTheme.ts       # Tema oscuro/claro con localStorage
│   │   └── useScrollReveal.ts # Wrapper GSAP ScrollTrigger
│   ├── components/
│   │   ├── ui/               # 40 componentes shadcn/ui
│   │   ├── layout/           # Header, CartSidebar, WhatsAppFloat
│   │   ├── home/             # Hero, FeaturedGrid
│   │   ├── gallery/          # ArtCard, Lightbox
│   │   ├── shared/           # Toast
│   │   └── ... (páginas)
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── CommissionsPage.tsx
│   │   ├── ToolsPage.tsx
│   │   ├── TipsPage.tsx
│   │   ├── BlogListPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   └── ContactPage.tsx
│   └── content/blog/         # Posts en Markdown con frontmatter
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
# 1. Clonar o descomprimir el proyecto
cd kirart-web

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción (`dist/`) |
| `npm run preview` | Previsualizar build localmente |

---

## 🎨 Personalización

### Paleta de colores
Edita las variables CSS en `src/index.css`:

```css
:root {
  --primary: 355 70% 55%;      /* Rojo Kirart */
  --accent: 217 91% 60%;       /* Azul complementario */
  /* ... */
}
```

### Obras de arte
Reemplaza las imágenes en `public/images/` y actualiza `src/data/artworks.ts`.

### Posts del blog
Añade archivos `.md` en `src/content/blog/` con frontmatter:

```markdown
---
title: "Título del post"
date: "2026-07-28"
excerpt: "Breve descripción"
---

Contenido en **Markdown**...
```

### Datos de contacto
Actualiza el número de WhatsApp y email en:
- `src/components/layout/WhatsAppFloat.tsx`
- `src/pages/ContactPage.tsx`
- `src/components/layout/CartSidebar.tsx`

---

## 📦 Despliegue en Cloudflare Pages

### Opción A: Git Integration (recomendado)

1. Sube el repo a **GitHub**
2. Ve a [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
3. Crea un nuevo proyecto → **Connect to Git**
4. Selecciona tu repo
5. Configura el build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Guarda y despliega 🚀

### Opción B: Upload Manual

```bash
npm run build
# Sube la carpeta dist/ manualmente desde el dashboard
```

### ⚠️ SPA Routing
El archivo `public/_redirects` ya incluye:

```
/*    /index.html   200
```

Esto asegura que rutas como `/blog/mi-post` funcionen correctamente.

---

## 🧩 Componentes shadcn/ui Incluidos

Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Empty, Field, Form, HoverCard, Input, InputGroup, InputOTP, Item, Kbd, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Textarea.

---

## 📄 Licencia

Proyecto privado — KiraLizt © 2026

---

<p align="center">
  Hecho con ❤️ en Cuba · Desplegado en Cloudflare Pages
</p>
