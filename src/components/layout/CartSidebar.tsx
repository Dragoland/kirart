import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react';

export function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, clearCart } = useCart();

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items.map(i => `• ${i.title} (x${i.qty}) - $${i.price * i.qty}`).join('%0A');
    const msg = `¡Hola KiraLizt! 👋%0A%0AQuiero hacer un pedido:%0A%0A${lines}%0A%0ATotal: $${total.toFixed(2)}%0A%0AMis datos:%0A[Nombre]%0A[Dirección]%0A[Método de pago]`;
    window.open(`https://wa.me/5356870519?text=${msg}`, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col glass-strong border-l border-border/50">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl font-display">
            <ShoppingBag size={22} className="text-primary" />
            Tu Carrito
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Tu carrito está vacío</p>
              <p className="text-xs text-muted-foreground mt-1">Explora la tienda y añade obras</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">${item.price} c/u</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-lg bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-lg bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors group">
                    <Trash2 size={16} className="text-muted-foreground group-hover:text-destructive transition-colors" />
                  </button>
                  <p className="text-primary font-bold text-sm">${item.price * item.qty}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive transition-colors underline">
                Vaciar carrito
              </button>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="text-2xl font-bold text-gradient">${total.toFixed(2)}</div>
              </div>
            </div>
            <Button onClick={checkout} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
              <MessageCircle size={18} className="mr-2" />
              Pedir por WhatsApp
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
