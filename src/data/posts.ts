import { BlogPost } from '@/types';

// Posts de ejemplo para `npm run dev`. En producción salen de la base de datos (panel /admin).
export const posts: BlogPost[] = [
  {
    slug: 'mi-proceso-creativo',
    title: 'Mi proceso creativo: del boceto al color',
    date: '2026-07-15',
    excerpt: 'Cómo paso de una idea vaga a una ilustración terminada, paso a paso.',
    tags: ['proceso', 'tutorial'],
    content: `## La chispa inicial

Todo empieza con una idea: una frase, una canción o un color que me gustó ese día. La anoto en mi cuaderno de bocetos.

## El boceto

Uso papel Canson y lápices Prismacolor. No busco la perfección, sino la **esencia**: la pose, la expresión y la composición.

## Digitalización

Paso el boceto a Krita con mi tableta XP-Pen, defino las líneas limpias y pienso la paleta.

## Color y luz

Mi paso favorito. Juego con capas de multiply, overlay y add para crear profundidad. La luz define el ambiente.

## Detalles finales

El último 10% del trabajo que toma el 90% del tiempo.`,
  },
  {
    slug: 'herramientas-2026',
    title: 'Mis herramientas en 2026',
    date: '2026-06-28',
    excerpt: 'Hardware y software que uso a diario para crear.',
    tags: ['herramientas', 'setup'],
    content: `## Software

- **Krita**: pintura digital principal.
- **GIMP**: retoques y ajustes.
- **Inkscape**: vectores limpios.
- **Blender**: referencias 3D de poses complejas.

## Hardware

- **XP-Pen Artist 15.6 Pro**: mi tableta con pantalla.
- **PC con Linux Mint**: rápido, estable y sin distracciones.`,
  },
];
