import { useState } from 'react';
import { ImageOff, Play } from 'lucide-react';
import { Artwork } from '@/types';
import { categoryLabel } from '@/lib/categories';

interface Props {
  art: Artwork;
  onOpen: (art: Artwork) => void;
}

export function ArtCard({ art, onOpen }: Props) {
  const [broken, setBroken] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(art)}
      className="group relative block w-full text-left overflow-hidden rounded-sm border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-blood/70"
      aria-label={`Ver ${art.title}`}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-secondary">
        {broken ? (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageOff size={32} /></div>
        ) : (
          <img src={art.image} alt={art.title} loading="lazy" onError={() => setBroken(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
        {art.link && (
          <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-noir/70 border border-cotton/30 flex items-center justify-center text-cotton"><Play size={14} /></span>
        )}
        {art.price > 0 && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-sm border border-cotton/25">${art.price}</span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs text-cotton/70 mb-1">{categoryLabel(art.category)}</p>
          <h3 className="font-display text-2xl font-semibold leading-tight text-cotton">{art.title}</h3>
        </div>
      </div>
    </button>
  );
}
