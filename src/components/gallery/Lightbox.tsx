import { Artwork } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, MessageCircle, Tag } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  art: Artwork;
  onClose: () => void;
}

export function Lightbox({ art, onClose }: Props) {
  const { addItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:rotate-90 hover:scale-110 z-10"
      >
        <X size={24} />
      </button>

      <div 
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row gap-8 items-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center">
          <img 
            src={art.image} 
            alt={art.title} 
            className="max-h-[70vh] md:max-h-[80vh] object-contain rounded-2xl shadow-2xl shadow-primary/20" 
          />
        </div>

        <div className="md:w-80 flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag size={14} className="text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{art.category}</span>
            </div>
            <h3 className="font-display text-3xl font-bold text-white mb-3">{art.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {art.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 bg-white/10 text-white/80 rounded-full backdrop-blur-sm border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {art.price > 0 ? (
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-white/60 text-sm">Precio</span>
                <span className="text-white text-3xl font-bold">${art.price}</span>
                <span className="text-white/40 text-sm">USD</span>
              </div>
            ) : (
              <p className="text-white/50 italic">No disponible para venta</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {art.price > 0 && (
              <Button 
                onClick={() => { addItem(art); onClose(); }}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all"
              >
                <ShoppingCart size={18} className="mr-2" /> Añadir al carrito
              </Button>
            )}
            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10 py-6 rounded-xl transition-all" 
              asChild
            >
              <a href={`https://wa.me/5356870519?text=Hola KiraLizt! Me interesa la obra "${art.title}"`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} className="mr-2" /> Consultar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
