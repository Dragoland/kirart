import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function BlogPostPage() {
  const { slug } = useParams();
  const { posts, loading } = useData();
  const ref = useScrollReveal<HTMLDivElement>();
  const post = posts.find((p) => p.slug === slug);

  if (loading) return <div className="pt-40 text-center text-muted-foreground min-h-[60vh]">Cargando…</div>;

  if (!post) {
    return (
      <div className="pt-40 text-center min-h-[60vh] flex flex-col items-center">
        <h1 className="font-gothic text-5xl mb-3">Publicación no encontrada</h1>
        <p className="text-muted-foreground mb-8">El artículo no existe o fue movido.</p>
        <Link to="/blog" className="btn-primary"><ArrowLeft size={18} /> Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <Link to="/blog" className="inline-flex items-center gap-2 text-blood font-medium mb-8 hover:gap-3 transition-all"><ArrowLeft size={18} /> Volver al blog</Link>
        <article className="panel p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-5 mb-6 text-muted-foreground text-sm">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-blood" />
              {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-blood" />
              {Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min de lectura</span>
          </div>
          <h1 className="font-gothic text-5xl md:text-6xl mb-6 leading-tight">{post.title}</h1>
          {post.excerpt && <p className="text-lg text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4 italic">{post.excerpt}</p>}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          )}
          <div className="prose max-w-none"><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown></div>
        </article>
      </div>
    </div>
  );
}
