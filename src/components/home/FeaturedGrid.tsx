import { artworks } from '@/data/artworks';
import { ArtCard } from '@/components/gallery/ArtCard';
import { useState } from 'react';
import { Lightbox } from '@/components/gallery/Lightbox';
import { Artwork } from '@/types';

export function FeaturedGrid() {
  const featured = artworks.filter(a => a.featured);
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map(art => (
          <ArtCard key={art.id} art={art} onOpen={setSelected} />
        ))}
      </div>
      {selected && <Lightbox art={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
