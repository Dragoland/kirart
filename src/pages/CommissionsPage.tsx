import { FormEvent } from 'react';
import { CheckCircle2, Palette } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useData } from '@/context/DataContext';
import { showToast } from '@/components/shared/Toast';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { CATEGORIES } from '@/lib/categories';
import { waLink } from '@/lib/site';

const prices = [
  { type: 'Sketch', desc: 'Boceto a lápiz o digital limpio', price: '$15' },
  { type: 'Lineart', desc: 'Tintado limpio sin color', price: '$25' },
  { type: 'Flat color', desc: 'Color plano con sombras básicas', price: '$40' },
  { type: 'Full render', desc: 'Ilustración completa con fondo simple', price: '$80' },
  { type: 'Escena compleja', desc: 'Personaje con fondo detallado', price: '$150+' },
];

export function CommissionsPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { settings } = useData();
  const open = settings.commissions_open && settings.slots > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const g = (k: string) => String(d.get(k) ?? '').trim();
    const msg =
      `¡Hola Kirart! 👋\n\nQuiero solicitar una comisión.\n\n*Nombre:* ${g('name')}\n*Email:* ${g('email')}\n` +
      `*Servicio:* ${g('service')}\n*Nivel:* ${g('type')}\n*Uso:* ${g('usage')}\n*Referencia:* ${g('ref') || 'Ninguna'}\n\n*Descripción:*\n${g('desc')}`;
    window.open(waLink(msg), '_blank');
    showToast('Abriendo WhatsApp…');
    form.reset();
  };

  return (
    <div className="pt-28 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Comisiones" subtitle="¿Tienes una idea? Hagámosla real. Rellena el formulario y te contesto por WhatsApp." />

        <div className="text-center mb-14">
          {open ? (
            <p className="chip">Comisiones abiertas · {settings.slots} {settings.slots === 1 ? 'cupo disponible' : 'cupos disponibles'}</p>
          ) : (
            <p className="chip">Comisiones cerradas por ahora. Escríbeme para entrar en la lista de espera.</p>
          )}
          <p className="mt-4 text-muted-foreground">
            Los tiempos varían según la complejidad. En <strong className="text-foreground">Tips</strong> te explico cómo describir tu idea.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-center font-display text-3xl font-semibold mb-8 flex items-center justify-center gap-2">
            <Palette size={22} className="text-blood" /> Tabla de precios (USD)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prices.map((p) => (
              <div key={p.type} className="panel p-6 hover:border-blood/60 transition-colors">
                <div className="text-3xl font-display font-bold text-blood mb-1">{p.price}</div>
                <div className="font-semibold mb-1">{p.type}</div>
                <div className="text-sm text-muted-foreground">{p.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">* El precio puede variar según complejidad, uso comercial y extras.</p>
        </div>

        <div className="panel p-8 md:p-10">
          <h3 className="font-display text-3xl font-semibold mb-8 flex items-center gap-2">
            <CheckCircle2 size={22} className="text-blood" /> Solicitud de comisión
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="label" htmlFor="name">Nombre o alias</label><input id="name" name="name" required className="input" placeholder="Cómo te gusta que te llamen" /></div>
              <div><label className="label" htmlFor="email">Correo</label><input id="email" name="email" type="email" required className="input" placeholder="tu@correo.com" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="label" htmlFor="service">Servicio</label>
                <select id="service" name="service" required className="input" defaultValue="">
                  <option value="" disabled>Selecciona…</option>
                  {CATEGORIES.map((c) => <option key={c.key} value={c.label}>{c.label}</option>)}
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="type">Nivel de acabado</label>
                <select id="type" name="type" required className="input" defaultValue="">
                  <option value="" disabled>Selecciona…</option>
                  {prices.map((p) => <option key={p.type} value={p.type}>{p.type}</option>)}
                  <option value="No estoy seguro">No estoy seguro</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="usage">Uso previsto</label>
                <select id="usage" name="usage" className="input" defaultValue="Personal">
                  <option>Personal</option><option>Comercial</option><option>Regalo</option><option>Otro</option>
                </select>
              </div>
            </div>
            <div><label className="label" htmlFor="ref">Referencia visual (enlace, opcional)</label><input id="ref" name="ref" type="url" className="input" placeholder="https://…" /></div>
            <div><label className="label" htmlFor="desc">Descripción detallada</label><textarea id="desc" name="desc" rows={5} required className="input resize-none" placeholder="Personaje, pose, expresión, paleta, fondo… cuanto más detalle, mejor." /></div>
            <button type="submit" className="btn-primary w-full py-4">Enviar solicitud por WhatsApp</button>
          </form>
        </div>
      </div>
    </div>
  );
}
