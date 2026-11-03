import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { ArtCard } from '@/components/gallery/ArtCard';
import { Lightbox } from '@/components/gallery/Lightbox';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Artwork } from '@/types';
import { CATEGORIES } from '@/lib/categories';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// /gallery muestra todo; /gallery/:category muestra una sección concreta
export function GalleryPage() {
  const { category } = useParams();
  const { artworks, loading } = useData();
  const [selected, setSelected] = useState<Artwork | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();

  const current = CATEGORIES.find((c) => c.key === category);
  const filtered = current ? artworks.filter((a) => a.category === current.key) : artworks;

  const pill = (active: boolean) =>
    `px-5 py-2 rounded-full text-sm font-medium border transition-colors ${active ? 'bg-primary text-primary-foreground border-cotton/30' : 'bg-card/60 border-border text-muted-foreground hover:text-foreground hover:border-blood/60'}`;

  return (
    <div className="pt-28 pb-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={current ? current.label : 'Galería'}
          subtitle={current ? current.desc : 'Todas mis obras. Elige una sección o toca una pieza para verla en detalle.'}
        />

        <nav className="flex flex-wrap justify-center gap-3 mb-12" aria-label="Secciones de la galería">
          <Link to="/gallery" className={pill(!current)}>Todo</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.key} to={`/gallery/${c.key}`} className={pill(current?.key === c.key)}>{c.label}</Link>
          ))}
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((art) => <ArtCard key={art.id} art={art} onOpen={setSelected} />)}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">Todavía no hay obras en esta sección. Vuelve pronto.</p>
        )}
      </div>
      {selected && <Lightbox art={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
