import { Artwork } from '@/types';

interface Props {
  art: Artwork;
  onOpen: (art: Artwork) => void;
}

export function ArtCard({ art, onOpen }: Props) {
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={() => onOpen(art)}
    >
      <img src={art.image} alt={art.title} className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />

      {art.price > 0 && (
        <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg">
          ${art.price}
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <h3 className="text-white font-semibold text-lg">{art.title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {art.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-1 bg-white/15 text-white rounded-full backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
