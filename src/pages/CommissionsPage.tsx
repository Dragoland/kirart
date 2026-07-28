import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { showToast } from '@/components/shared/Toast';

const prices = [
  { type: 'Sketch', desc: 'Boceto a lápiz/digital limpio', price: '$15' },
  { type: 'Lineart', desc: 'Tintado limpio sin color', price: '$25' },
  { type: 'Flat Color', desc: 'Color plano + sombras básicas', price: '$40' },
  { type: 'Full Render', desc: 'Ilustración completa con fondo simple', price: '$80' },
  { type: 'Escena Compleja', desc: 'Personaje + fondo detallado', price: '$150+' },
];

export function CommissionsPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const entries = Array.from(data.entries());

    const msg = `¡Hola KiraLizt! 👋%0A%0AQuiero solicitar una comisión.%0A%0A*Nombre:* ${entries[0][1]}%0A*Email:* ${entries[1][1]}%0A*Tipo:* ${entries[2][1]}%0A*Uso:* ${entries[3][1]}%0A*Referencia:* ${entries[4][1] || 'Ninguna'}%0A%0A*Descripción:*%0A${entries[5][1]}`;

    window.open(`https://wa.me/5356870519?text=${msg}`, '_blank');
    showToast('Redirigiendo a WhatsApp...');
    form.reset();
  };

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Comisiones</h2>
          <p className="text-muted-foreground">¿Tienes una idea en mente? Hagámosla realidad</p>
        </div>

        <div className="text-center mb-10">
          <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/20 text-sm px-4 py-1">COMISIONES ABIERTAS</Badge>
          <p className="mt-4 text-muted-foreground">
            Actualmente tengo <strong className="text-foreground">3 slots disponibles</strong>. Los tiempos de entrega varían según complejidad.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-center font-display text-xl font-semibold mb-6">Tabla de Precios (USD)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground text-xs uppercase tracking-wider font-medium">Tipo</th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-xs uppercase tracking-wider font-medium">Descripción</th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-xs uppercase tracking-wider font-medium">Precio base</th>
                </tr>
              </thead>
              <tbody>
                {prices.map(p => (
                  <tr key={p.type} className="border-b border-border hover:bg-secondary/30 transition">
                    <td className="py-4 px-4 font-semibold">{p.type}</td>
                    <td className="py-4 px-4 text-muted-foreground">{p.desc}</td>
                    <td className="py-4 px-4 text-primary font-bold">{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">* Precios pueden variar según complejidad, uso comercial y extras.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h3 className="font-display text-xl font-semibold mb-6">Solicitud de Comisión</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Nombre / Alias</Label>
                <Input required placeholder="Cómo te gusta que te llamen" name="name" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" required placeholder="tu@email.com" name="email" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Tipo de comisión</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sketch">Sketch</SelectItem>
                    <SelectItem value="Lineart">Lineart</SelectItem>
                    <SelectItem value="Flat Color">Flat Color</SelectItem>
                    <SelectItem value="Full Render">Full Render</SelectItem>
                    <SelectItem value="Escena Compleja">Escena Compleja</SelectItem>
                    <SelectItem value="Otro">Otro / No estoy seguro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Uso previsto</Label>
                <Select name="usage" defaultValue="Personal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Regalo">Regalo</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Referencia visual (URL)</Label>
              <Input type="url" placeholder="https://... (opcional)" name="ref" />
            </div>
            <div className="space-y-2">
              <Label>Descripción detallada</Label>
              <Textarea rows={5} required placeholder="Describe tu personaje, pose, expresión, paleta de colores, fondo... ¡cuanto más detalle, mejor!" name="desc" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Enviar Solicitud
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
