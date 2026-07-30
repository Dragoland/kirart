import { artworks } from '@/data/artworks';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Tag, Sparkles } from 'lucide-react';
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Tag size={14} />
            Tienda oficial
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Tienda</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Dibujos originales y prints disponibles para compra inmediata. Añade al carrito y pide por WhatsApp.</p>
        </div>

        <div className="space-y-6">
          {forSale.map((art, i) => (
            <div 
              key={art.id} 
              className="group flex flex-col sm:flex-row gap-6 bg-card border border-border/50 rounded-2xl p-5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl shrink-0">
                <img src={art.image} alt={art.title} className="w-full sm:w-36 h-36 object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">{art.category}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-1">{art.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{art.tags.join(' · ')}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gradient">${art.price}</span>
                  <span className="text-muted-foreground text-sm">USD</span>
                </div>
              </div>
              <div className="flex items-center sm:justify-end">
                <Button 
                  onClick={() => handleAdd(art)} 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold px-6 py-5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                  <ShoppingCart size={18} className="mr-2" /> Añadir
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={18} className="text-primary" />
            <span className="font-semibold text-foreground">¿Buscas algo personalizado?</span>
          </div>
          <p className="text-sm text-muted-foreground">Visita la sección de Comisiones para encargar una obra a tu medida.</p>
        </div>
      </div>
    </div>
  );
}
