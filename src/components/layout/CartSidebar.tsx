import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, total } = useCart();

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items.map(i => `• ${i.title} (x${i.qty}) - $${i.price * i.qty}`).join('%0A');
    const msg = `¡Hola KiraLizt! 👋%0A%0AQuiero hacer un pedido:%0A%0A${lines}%0A%0ATotal: $${total.toFixed(2)}%0A%0AMis datos:%0A[Nombre]%0A[Dirección]%0A[Método de pago]`;
    window.open(`https://wa.me/5356870519?text=${msg}`, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">El carrito está vacío</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">Cantidad: {item.qty}</p>
                  <p className="text-primary font-bold">${item.price * item.qty}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="self-start p-2 hover:bg-destructive/10 rounded">
                  <Trash2 size={16} className="text-destructive" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border pt-4 space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button onClick={checkout} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Pedir por WhatsApp
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
