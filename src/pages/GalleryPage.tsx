import { useState } from 'react';
import { artworks } from '@/data/artworks';
import { ArtCard } from '@/components/gallery/ArtCard';
import { Lightbox } from '@/components/gallery/Lightbox';
import { Artwork } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Galería</h2>
          <p className="text-muted-foreground">Explora ilustraciones por categoría</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.key 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(art => (
            <ArtCard key={art.id} art={art} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {selected && <Lightbox art={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
