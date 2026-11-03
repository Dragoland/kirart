import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle, X } from 'lucide-react';
import { waLink } from '@/lib/site';

export function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, clearCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, setIsOpen]);

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => `• ${i.title} (x${i.qty}) - $${i.price * i.qty}`).join('\n');
    const msg = `¡Hola Kirart! 👋\n\nQuiero hacer un pedido:\n\n${lines}\n\nTotal: $${total.toFixed(2)}\n\nMis datos:\n[Nombre]\n[Dirección]\n[Método de pago]`;
    window.open(waLink(msg), '_blank');
  };

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
      <aside
        role="dialog" aria-label="Carrito"
        className={`absolute right-0 top-0 h-full w-full sm:max-w-md glass-strong border-l border-border flex flex-col p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="flex items-center gap-2 text-3xl font-display font-semibold">
            <ShoppingBag size={22} className="text-blood" /> Tu carrito
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-sm hover:bg-secondary" aria-label="Cerrar carrito"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag size={40} className="text-muted-foreground mb-4" />
              <p className="font-medium">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground mt-1">Explora la tienda y añade obras.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-sm bg-card/60 border border-border">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">${item.price} c/u</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-sm bg-secondary hover:bg-primary flex items-center justify-center" aria-label="Quitar uno"><Minus size={14} /></button>
                    <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-sm bg-secondary hover:bg-primary flex items-center justify-center" aria-label="Añadir uno"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="p-1.5 hover:text-destructive" aria-label={`Eliminar ${item.title}`}><Trash2 size={16} /></button>
                  <p className="text-blood font-bold text-sm">${item.price * item.qty}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex justify-between items-end">
              <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive underline">Vaciar carrito</button>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="text-3xl font-display font-bold">${total.toFixed(2)}</div>
              </div>
            </div>
            <button onClick={checkout} className="btn-primary w-full py-4"><MessageCircle size={18} /> Pedir por WhatsApp</button>
          </div>
        )}
      </aside>
    </div>
  );
}
