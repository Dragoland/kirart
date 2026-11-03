import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { ArtCard } from '@/components/gallery/ArtCard';
import { Lightbox } from '@/components/gallery/Lightbox';
import { Artwork } from '@/types';

export function FeaturedGrid() {
  const { artworks, loading } = useData();
  const featured = artworks.filter((a) => a.featured).slice(0, 8);
  const [selected, setSelected] = useState<Artwork | null>(null);

  if (!loading && featured.length === 0) {
    return <p className="text-center text-muted-foreground py-10">Pronto habrá obras destacadas aquí.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((art, i) => (
          <div key={art.id} className="animate-fade-in" style={{ animationDelay: `${i * 90}ms` }}>
            <ArtCard art={art} onOpen={setSelected} />
          </div>
        ))}
      </div>
      {selected && <Lightbox art={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
