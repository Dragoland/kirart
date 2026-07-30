import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import matter from 'gray-matter';
import { useMemo } from 'react';

// FIX: Cargar posts dinámicamente desde archivos MD
const modules = import.meta.glob('../../content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export function BlogListPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  const posts = useMemo(() => {
    const loaded: BlogMeta[] = [];
    for (const [path, raw] of Object.entries(modules)) {
      const slug = path.replace('../../content/blog/', '').replace('.md', '');
      const parsed = matter(raw as string);
      loaded.push({
        slug,
        title: parsed.data.title,
        date: parsed.data.date,
        excerpt: parsed.data.excerpt || '',
        tags: parsed.data.tags || [],
      });
    }
    // Ordenar por fecha descendente
    return loaded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <BookOpen size={14} />
            Blog de KiraLizt
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Blog</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Proceso creativo, tutoriales y pensamientos de una ilustradora cubana</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No hay posts disponibles todavía</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link 
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} className="text-primary" />
                      {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} className="text-primary" />
                      {Math.ceil(post.excerpt.split(' ').length / 40)} min
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    Leer más <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
