import { useEffect } from 'react';
import { X, ShoppingCart, MessageCircle, Play } from 'lucide-react';
import { Artwork } from '@/types';
import { useCart } from '@/context/CartContext';
import { categoryLabel } from '@/lib/categories';
import { waLink } from '@/lib/site';
import { showToast } from '@/components/shared/Toast';

interface Props {
  art: Artwork;
  onClose: () => void;
}

export function Lightbox({ art, onClose }: Props) {
  const { addItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={art.title}
      className="fixed inset-0 z-[2000] bg-noir/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto" onClick={onClose}>
      <button onClick={onClose} aria-label="Cerrar"
        className="fixed top-5 right-5 w-12 h-12 rounded-full bg-cotton/10 hover:bg-primary flex items-center justify-center text-cotton transition-colors z-10">
        <X size={24} />
      </button>

      <div className="relative max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center my-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex-1 flex items-center justify-center min-w-0">
          <img src={art.image} alt={art.title} className="max-h-[70vh] md:max-h-[82vh] max-w-full object-contain rounded-sm border border-border" />
        </div>

        <div className="md:w-80 w-full flex flex-col gap-5 text-cotton">
          <div>
            <p className="text-sm text-blood mb-2">{categoryLabel(art.category)}</p>
            <h3 className="font-gothic text-4xl mb-3 leading-tight">{art.title}</h3>
            {art.description && <p className="text-cotton/75 text-sm leading-relaxed mb-4 whitespace-pre-line">{art.description}</p>}
            <div className="flex flex-wrap gap-2">
              {art.tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1 bg-cotton/10 text-cotton/80 rounded-full border border-cotton/15">{t}</span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-sm bg-cotton/5 border border-cotton/15">
            {art.price > 0 ? (
              <div className="flex items-baseline gap-2">
                <span className="text-cotton/60 text-sm">Precio</span>
                <span className="text-3xl font-bold">${art.price}</span>
                <span className="text-cotton/40 text-sm">USD</span>
              </div>
            ) : (
              <p className="text-cotton/60 italic">No disponible para venta</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {art.price > 0 && (
              <button className="btn-primary py-4" onClick={() => { addItem(art); showToast(`"${art.title}" añadido al carrito`); onClose(); }}>
                <ShoppingCart size={18} /> Añadir al carrito
              </button>
            )}
            {art.link && (
              <a href={art.link} target="_blank" rel="noopener noreferrer" className="btn-ghost py-4 text-cotton border-cotton/30 hover:bg-cotton/10">
                <Play size={18} /> Ver video
              </a>
            )}
            <a href={waLink(`Hola Kirart! Me interesa la obra "${art.title}"`)} target="_blank" rel="noopener noreferrer"
              className="btn-ghost py-4 text-cotton border-cotton/30 hover:bg-cotton/10">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
