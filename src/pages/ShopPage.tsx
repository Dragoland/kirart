import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useCart } from '@/context/CartContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { showToast } from '@/components/shared/Toast';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { categoryLabel } from '@/lib/categories';
import { Artwork } from '@/types';

export function ShopPage() {
  const { addItem } = useCart();
  const { artworks, loading } = useData();
  const forSale = artworks.filter((a) => a.price > 0);
  const ref = useScrollReveal<HTMLDivElement>();

  const handleAdd = (art: Artwork) => {
    addItem(art);
    showToast(`"${art.title}" añadido al carrito`);
  };

  return (
    <div className="pt-28 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Tienda" subtitle="Obras originales, prints y adoptables disponibles. Añade al carrito y pide por WhatsApp." />

        <div className="space-y-5">
          {forSale.map((art) => (
            <div key={art.id} className="group flex flex-col sm:flex-row gap-6 panel p-5 hover:border-blood/60 transition-colors">
              <img src={art.image} alt={art.title} loading="lazy" className="w-full sm:w-36 h-48 sm:h-36 object-cover rounded-sm shrink-0" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs text-blood mb-1">{categoryLabel(art.category)}</span>
                <h3 className="font-display text-3xl font-semibold leading-tight mb-1">{art.title}</h3>
                {art.tags.length > 0 && <p className="text-sm text-muted-foreground mb-3">{art.tags.join(' · ')}</p>}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">${art.price}</span>
                  <span className="text-muted-foreground text-sm">USD</span>
                </div>
              </div>
              <div className="flex items-center sm:justify-end">
                <button onClick={() => handleAdd(art)} className="btn-primary"><ShoppingCart size={18} /> Añadir</button>
              </div>
            </div>
          ))}
        </div>

        {!loading && forSale.length === 0 && <p className="text-center text-muted-foreground py-16">No hay obras a la venta por ahora.</p>}

        <div className="mt-12 panel p-6 text-center">
          <p className="font-display text-2xl mb-1">¿Buscas algo personalizado?</p>
          <p className="text-sm text-muted-foreground">
            Mira la sección de <Link to="/commissions" className="text-blood underline underline-offset-4">comisiones</Link> para encargar una obra a tu medida.
          </p>
        </div>
      </div>
    </div>
  );
}
