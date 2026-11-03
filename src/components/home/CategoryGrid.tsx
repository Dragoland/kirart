import { Link } from 'react-router-dom';
import { Users, PenTool, Film, Clapperboard, Ghost, Newspaper, BookOpen, LucideIcon } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { useData } from '@/context/DataContext';

const icons: Record<string, LucideIcon> = {
  personajes: Users,
  ilustracion: PenTool,
  animacion: Film,
  storyboard: Clapperboard,
  adoptables: Ghost,
  editorial: Newspaper,
  comics: BookOpen,
};

// Cada sección es una ventana con arco de catedral
export function CategoryGrid() {
  const { artworks } = useData();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CATEGORIES.map((c) => {
        const Icon = icons[c.key] ?? PenTool;
        const n = artworks.filter((a) => a.category === c.key).length;
        return (
          <Link key={c.key} to={`/gallery/${c.key}`}
            className="group relative flex flex-col items-center text-center px-6 pt-16 pb-8 border border-border bg-card/70 rounded-t-[120px] rounded-b-sm hover:border-blood/70 hover:bg-primary/15 transition-colors duration-500 last:lg:col-start-2">
            <Icon size={30} className="text-blood mb-5 group-hover:scale-110 transition-transform" aria-hidden />
            <h3 className="font-display text-2xl font-semibold mb-2">{c.label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.desc}</p>
            <span className="mt-auto text-xs text-blood">{n === 1 ? '1 obra' : `${n} obras`}</span>
          </Link>
        );
      })}
    </div>
  );
}
