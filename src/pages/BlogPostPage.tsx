import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// FIX: Usar ruta relativa para que Vite resuelva correctamente los MD
const modules = import.meta.glob('../../content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<{ title: string; date: string; excerpt: string; content: string; tags?: string[] } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    // Buscar el archivo que coincida con el slug
    const matchingKey = Object.keys(modules).find(key => key.includes(`/${slug}.md`));
    const raw = matchingKey ? (modules[matchingKey] as string) : undefined;

    if (raw) {
      const parsed = matter(raw);
      setPost({
        title: parsed.data.title,
        date: parsed.data.date,
        excerpt: parsed.data.excerpt || '',
        content: parsed.content,
        tags: parsed.data.tags || [],
      });
      setNotFound(false);
    } else {
      setNotFound(true);
    }
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
              {Math.ceil(post.content.split(' ').length / 200)} min de lectura
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary/30 pl-4 italic">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
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
