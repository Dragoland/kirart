import { artworks } from '@/data/artworks';
import { ArtCard } from '@/components/gallery/ArtCard';
import { useState } from 'react';
import { Lightbox } from '@/components/gallery/Lightbox';
import { Artwork } from '@/types';
import { Sparkles } from 'lucide-react';

export function FeaturedGrid() {
  const featured = artworks.filter(a => a.featured);
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-10">
        <Sparkles size={20} className="text-primary" />
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Selección curada</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((art, i) => (
          <div key={art.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <ArtCard art={art} onOpen={setSelected} />
          </div>
        ))}
      </div>
      {selected && <Lightbox art={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
