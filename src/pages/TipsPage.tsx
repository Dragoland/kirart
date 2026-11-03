import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FileText, Palette, Clock, MessageSquare, LucideIcon } from 'lucide-react';

interface Tip { icon: LucideIcon; title: string; items: string[]; note?: string }

const tips: Tip[] = [
  {
    icon: FileText,
    title: 'Cómo describir tu personaje',
    items: [
      '**Apariencia física:** edad, tono de piel, cabello, ojos, altura.',
      '**Ropa o armadura:** estilo, colores dominantes, accesorios clave.',
      '**Expresión y pose:** ¿sonríe, pelea, medita? ¿de frente o de perfil?',
      '**Personalidad:** tres adjetivos (por ejemplo: tímido, leal, melancólico).',
      '**Referencias:** imágenes de Pinterest, capturas, otros dibujos.',
    ],
    note: 'Cuanto más clara la referencia, más fiel el resultado.',
  },
  {
    icon: Palette,
    title: 'Qué referencias enviar',
    items: [
      '**Del personaje:** dibujos anteriores, descripciones o fotos de actores.',
      '**De la pose:** una foto o un maniquí digital en la pose deseada.',
      '**Paleta:** códigos hex o una imagen con los tonos.',
      '**Estilo:** ¿mi estilo habitual o algo más anime, realista o chibi?',
    ],
    note: 'Un tablero de Pinterest o un collage funciona perfecto.',
  },
  {
    icon: Clock,
    title: 'Tiempos de entrega reales',
    items: [
      '**Sketch:** 2–4 días hábiles.',
      '**Lineart:** 4–7 días hábiles.',
      '**Flat color:** 1–2 semanas.',
      '**Full render:** 2–4 semanas.',
      '**Escena compleja:** 1–2 meses.',
    ],
    note: 'Con lista de espera los tiempos pueden cambiar. Siempre aviso antes de confirmar.',
  },
  {
    icon: MessageSquare,
    title: 'El proceso de revisiones',
    items: [
      '**Sketch inicial:** se ajustan pose, composición y proporciones. Cambios gratis.',
      '**Lineart:** se confirman ropa y expresión. Cambios menores gratis.',
      '**Color base:** se valida paleta y luces. Un ajuste gratis.',
      '**Render final:** solo retoques menores. Cambios mayores tienen costo extra.',
    ],
    note: 'Los cambios drásticos en etapas avanzadas pueden costar extra.',
  },
];

// **negrita** sin usar HTML crudo
const Rich = ({ text }: { text: string }) => {
  const [head, ...rest] = text.split('**').filter(Boolean);
  return text.startsWith('**') ? <><strong className="text-foreground">{head}</strong>{rest.join('')}</> : <>{text}</>;
};

export function TipsPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div className="pt-28 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Tips para clientes" subtitle="Cómo pedir una comisión y sacarle el máximo provecho." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <div key={tip.title} className="panel p-8 hover:border-blood/60 transition-colors">
              <div className="w-12 h-12 rounded-sm bg-primary border border-cotton/25 flex items-center justify-center mb-5 text-primary-foreground">
                <tip.icon size={24} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">{tip.title}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                {tip.items.map((it) => <li key={it}><Rich text={it} /></li>)}
              </ul>
              {tip.note && <p className="mt-5 pl-4 border-l-2 border-blood/60 italic text-muted-foreground text-sm">{tip.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
