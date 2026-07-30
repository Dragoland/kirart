import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { showToast } from '@/components/shared/Toast';
import { Palette, CheckCircle2, Zap } from 'lucide-react';

const prices = [
  { type: 'Sketch', desc: 'Boceto a lápiz/digital limpio', price: '$15', color: 'from-blue-500/20 to-blue-600/10' },
  { type: 'Lineart', desc: 'Tintado limpio sin color', price: '$25', color: 'from-emerald-500/20 to-emerald-600/10' },
  { type: 'Flat Color', desc: 'Color plano + sombras básicas', price: '$40', color: 'from-amber-500/20 to-amber-600/10' },
  { type: 'Full Render', desc: 'Ilustración completa con fondo simple', price: '$80', color: 'from-primary/20 to-accent/10' },
  { type: 'Escena Compleja', desc: 'Personaje + fondo detallado', price: '$150+', color: 'from-purple-500/20 to-purple-600/10' },
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold mb-6">
            <Zap size={14} />
            Comisiones abiertas
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Comisiones</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">¿Tienes una idea en mente? Hagámosla realidad. Rellena el formulario y te contacto por WhatsApp.</p>
        </div>

        <div className="text-center mb-12">
          <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/20 text-sm px-4 py-1.5">3 SLOTS DISPONIBLES</Badge>
          <p className="mt-4 text-muted-foreground">
            Los tiempos de entrega varían según complejidad. Revisa la sección <strong className="text-foreground">Tips</strong> para saber cómo describir tu idea.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-center font-display text-xl font-semibold mb-8 flex items-center justify-center gap-2">
            <Palette size={20} className="text-primary" />
            Tabla de Precios (USD)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prices.map(p => (
              <div key={p.type} className={`p-6 rounded-2xl bg-gradient-to-br ${p.color} border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1`}>
                <div className="text-2xl font-bold text-gradient mb-1">{p.price}</div>
                <div className="font-semibold text-foreground mb-1">{p.type}</div>
                <div className="text-sm text-muted-foreground">{p.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">* Precios pueden variar según complejidad, uso comercial y extras.</p>
        </div>

        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 shadow-xl shadow-primary/5">
          <h3 className="font-display text-2xl font-semibold mb-8 flex items-center gap-2">
            <CheckCircle2 size={22} className="text-primary" />
            Solicitud de Comisión
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Nombre / Alias</Label>
                <Input required placeholder="Cómo te gusta que te llamen" name="name" className="bg-background/50 border-border/60 focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Email</Label>
                <Input type="email" required placeholder="tu@email.com" name="email" className="bg-background/50 border-border/60 focus:border-primary transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Tipo de comisión</Label>
                <Select name="type" required>
                  <SelectTrigger className="bg-background/50 border-border/60">
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
                <Label className="text-foreground font-medium">Uso previsto</Label>
                <Select name="usage" defaultValue="Personal">
                  <SelectTrigger className="bg-background/50 border-border/60">
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
              <Label className="text-foreground font-medium">Referencia visual (URL)</Label>
              <Input type="url" placeholder="https://... (opcional)" name="ref" className="bg-background/50 border-border/60 focus:border-primary transition-colors" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Descripción detallada</Label>
              <Textarea rows={5} required placeholder="Describe tu personaje, pose, expresión, paleta de colores, fondo... ¡cuanto más detalle, mejor!" name="desc" className="bg-background/50 border-border/60 focus:border-primary transition-colors resize-none" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              Enviar Solicitud
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
