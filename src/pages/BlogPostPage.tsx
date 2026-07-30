import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Ruta absoluta para Vite
const modules = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

// Fallback de contenido por si el glob falla
const fallbackContent: Record<string, { title: string; date: string; excerpt: string; content: string; tags: string[] }> = {
  'mi-proceso-creativo': {
    title: 'Mi Proceso Creativo: Del Boceto al Color',
    date: '2026-07-15',
    excerpt: 'Cómo paso de una idea vaga a una ilustración terminada.',
    tags: ['proceso', 'tutorial'],
    content: `## La chispa inicial

Todo empieza con una idea. Puede ser una frase que escuché, una canción, o simplemente un color que me gustó ese día. Lo anoto en mi cuaderno de bocetos o en una nota rápida en el celular.

## El boceto

Uso papel Canson y lápices Prismacolor para los bocetos iniciales. No me preocupo por la perfección, solo busco capturar la **esencia** de la idea. La pose, la expresión, la composición general.

## Digitalización

Paso el boceto a Krita usando mi tableta XP-Pen. Aquí empiezo a definir líneas limpias y a pensar en la paleta de colores. Me gusta experimentar con combinaciones inesperadas.

## Color y luz

Este es mi paso favorito. Juego con capas de multiply, overlay y add para crear profundidad. La luz define el ambiente de la pieza.

## Detalles finales

El último 10% del trabajo que toma el 90% del tiempo. Texturas, ajustes de color, pequeños detalles que hacen que la ilustración cobre vida.

---

*¿Te gustaría ver un timelapse de este proceso? Avísame por WhatsApp.*`,
  },
  'herramientas-2026': {
    title: 'Mis Herramientas en 2026',
    date: '2026-06-28',
    excerpt: 'Hardware y software que uso diariamente.',
    tags: ['herramientas', 'setup'],
    content: `## Software

- **Krita**: Mi principal herramienta de pintura digital. Libre, potente y con una comunidad increíble.
- **GIMP**: Para retoques y manipulación de imágenes.
- **Inkscape**: Cuando necesito vectores limpios.
- **Blender**: Para crear referencias 3D de poses complejas.

## Hardware

- **XP-Pen Artist 15.6 Pro**: Mi tableta gráfica con pantalla.
- **PC con Linux Mint**: Rápido, estable y sin distracciones.

## Tradicionales

- **Papel Canson**: Para bocetos y estudios.
- **Prismacolor**: Los mejores lápices de colores que he probado.

---

*Todo el software que uso es libre o de código abierto. ¡El arte no necesita licencias caras!*`,
  },
  'inspiracion-cubana': {
    title: 'Inspiración Cubana en mi Arte',
    date: '2026-05-10',
    excerpt: 'Cómo mi isla se filtra en cada trazo.',
    tags: ['cuba', 'inspiración'],
    content: `## Los colores de Cuba

El amarillo de los taxis almendrones, el azul del mar del Este, el verde intenso de la caña... Mi paleta siempre tiene un poco de Cuba.

## La gente

Los rostros de mi familia, los vecinos, la gente en la calle. Cada rostro cuenta una historia que quiero capturar.

## La música

El son, el reguetón, la trova... Dibujo escuchando música. Cada pieza tiene su soundtrack.

---

*Cuba es mi musa eterna.*`,
  },
};

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<{ title: string; date: string; excerpt: string; content: string; tags: string[] } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      return;
    }

    // Buscar en los módulos cargados por Vite
    const matchingKey = Object.keys(modules).find(key => key.includes(`/${slug}.md`));
    const raw = matchingKey ? (modules[matchingKey] as string) : undefined;

    if (raw) {
      try {
        const parsed = matter(raw);
        setPost({
          title: parsed.data.title || 'Sin título',
          date: parsed.data.date || new Date().toISOString(),
          excerpt: parsed.data.excerpt || '',
          content: parsed.content || '',
          tags: parsed.data.tags || [],
        });
        setNotFound(false);
        return;
      } catch (err) {
        console.warn('Error parseando MD:', err);
      }
    }

    // Fallback: buscar en contenido hardcodeado
    const fallback = fallbackContent[slug];
    if (fallback) {
      setPost(fallback);
      setNotFound(false);
      return;
    }

    setNotFound(true);
  }, [slug]);

  if (notFound) {
    return (
      <div className="pt-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Tag size={32} className="text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-lg font-medium">Post no encontrado</p>
        <p className="text-sm text-muted-foreground mt-1 mb-6">El artículo que buscas no existe o fue movido</p>
        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition shadow-lg">
          <ArrowLeft size={18} /> Volver al blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 text-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Cargando artículo...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:underline transition-all hover:gap-3">
          <ArrowLeft size={18} /> Volver al blog
        </Link>

        <article className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar size={16} className="text-primary" />
              {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock size={16} className="text-primary" />
              {Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min de lectura
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          
          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary/30 pl-4 italic">
              {post.excerpt}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
