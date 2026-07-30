import { useState } from 'react';
import { artworks } from '@/data/artworks';
import { ArtCard } from '@/components/gallery/ArtCard';
import { Lightbox } from '@/components/gallery/Lightbox';
import { Artwork } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Images } from 'lucide-react';

const categories = [
  { key: 'all', label: 'Todo' },
  { key: 'fanart', label: 'Fanart' },
  { key: 'original', label: 'Original' },
  { key: 'retrato', label: 'Retratos' },
  { key: 'concept', label: 'Concept Art' },
];

export function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Artwork | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();

  const filtered = filter === 'all' ? artworks : artworks.filter(a => a.category === filter);

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Images size={14} />
            Colección completa
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Galería</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Explora ilustraciones por categoría. Haz clic en cualquier obra para verla en detalle.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat.key 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:scale-105'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((art, i) => (
            <div key={art.id} style={{ animationDelay: `${i * 50}ms` }}>
              <ArtCard art={art} onOpen={setSelected} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No hay obras en esta categoría todavía</p>
          </div>
        )}
      </div>

      {selected && <Lightbox art={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
