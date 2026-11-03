import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function BlogListPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { posts, loading } = useData();
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="pt-28 pb-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Blog" subtitle="Proceso creativo, tutoriales y notas desde el estudio." />

        {!loading && sorted.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Aún no hay publicaciones.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group panel p-6 flex flex-col hover:border-blood/60 hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-4 text-muted-foreground text-xs mb-4">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={13} className="text-blood" />
                    {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-blood" />
                    {Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min</span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-blood transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{t}</span>)}
                  </div>
                )}
                <span className="mt-auto flex items-center gap-1 text-blood text-sm font-semibold group-hover:gap-2 transition-all">Leer más <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
