import { artworks } from '@/data/artworks';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { showToast } from '@/components/shared/Toast';

export function ShopPage() {
  const { addItem } = useCart();
  const forSale = artworks.filter(a => a.price > 0);
  const ref = useScrollReveal<HTMLDivElement>();

  const handleAdd = (art: typeof forSale[0]) => {
    addItem(art);
    showToast(`"${art.title}" añadido al carrito`);
  };

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Tienda</h2>
          <p className="text-muted-foreground">Dibujos originales y prints disponibles para compra inmediata</p>
        </div>

        <div className="space-y-6">
          {forSale.map(art => (
            <div key={art.id} className="flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-2xl p-6 hover:border-primary transition hover:translate-x-1">
              <img src={art.image} alt={art.title} className="w-full sm:w-32 h-32 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{art.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{art.tags.join(' · ')}</p>
                <p className="text-2xl font-bold text-primary">${art.price}.00 USD</p>
              </div>
              <div className="flex items-center">
                <Button onClick={() => handleAdd(art)} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <ShoppingCart size={18} /> Añadir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
