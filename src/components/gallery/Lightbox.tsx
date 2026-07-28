import { Artwork } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, MessageCircle } from 'lucide-react';
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
      className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition hover:rotate-90"
      >
        <X size={24} />
      </button>

      <div 
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row gap-6"
        onClick={e => e.stopPropagation()}
      >
        <img src={art.image} alt={art.title} className="flex-1 max-h-[70vh] object-contain rounded-xl" />

        <div className="md:w-80 flex flex-col justify-end">
          <div className="bg-gradient-to-t from-black/90 to-transparent p-6 rounded-xl">
            <h3 className="text-white text-2xl font-bold mb-2">{art.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {art.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 bg-white/15 text-white rounded-full backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>

            {art.price > 0 ? (
              <p className="text-white text-2xl font-bold mb-4">${art.price}</p>
            ) : (
              <p className="text-white/60 italic mb-4">No disponible para venta</p>
            )}

            <div className="flex flex-wrap gap-3">
              {art.price > 0 && (
                <Button 
                  onClick={() => { addItem(art); onClose(); }}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <ShoppingCart size={18} /> Añadir al carrito
                </Button>
              )}
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href={`https://wa.me/5356870519?text=Hola KiraLizt! Me interesa la obra "${art.title}"`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} /> Consultar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
