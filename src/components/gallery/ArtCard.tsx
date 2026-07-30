import { Artwork } from '@/types';

interface Props {
  art: Artwork;
  onOpen: (art: Artwork) => void;
}

export function ArtCard({ art, onOpen }: Props) {
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40"
      onClick={() => onOpen(art)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={art.image} 
          alt={art.title} 
          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy" 
        />
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" 
          style={{ transition: 'transform 0.8s ease, opacity 0.3s' }} />
      </div>

      {art.price > 0 && (
        <span className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full shadow-lg shadow-primary/30 backdrop-blur-sm">
          ${art.price}
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
        <h3 className="text-white font-display font-semibold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{art.title}</h3>
        <div className="flex flex-wrap gap-2 mt-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {art.tags.map(tag => (
            <span key={tag} className="text-[11px] px-3 py-1 bg-white/15 text-white rounded-full backdrop-blur-sm border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
