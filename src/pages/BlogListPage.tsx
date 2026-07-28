import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar } from 'lucide-react';

const posts = [
  {
    slug: 'mi-proceso-creativo',
    title: 'Mi Proceso Creativo: Del Boceto al Color',
    date: '2026-07-15',
    excerpt: 'Cómo paso de una idea vaga a una ilustración terminada. Mi workflow paso a paso.',
  },
  {
    slug: 'herramientas-2026',
    title: 'Mis Herramientas en 2026',
    date: '2026-06-28',
    excerpt: 'Hardware y software que uso diariamente para crear mis ilustraciones.',
  },
  {
    slug: 'inspiracion-cubana',
    title: 'Inspiración Cubana en mi Arte',
    date: '2026-05-10',
    excerpt: 'Cómo los colores, la gente y la música de mi isla se filtran en cada trazo.',
  },
];

export function BlogListPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Blog</h2>
          <p className="text-muted-foreground">Proceso creativo, tutoriales y pensamientos de una ilustradora cubana</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link 
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-3">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary transition">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
