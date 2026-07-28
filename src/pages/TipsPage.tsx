import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FileText, Palette, Clock, MessageSquare } from 'lucide-react';

const tips = [
  {
    icon: FileText,
    title: 'Cómo describir tu personaje',
    content: [
      '<strong>Apariencia física:</strong> edad, tono de piel, cabello, ojos, altura.',
      '<strong>Ropa / armadura:</strong> estilo, colores dominantes, accesorios clave.',
      '<strong>Expresión / pose:</strong> ¿sonríe, pelea, medita? ¿de frente o de perfil?',
      '<strong>Personalidad:</strong> 3 adjetivos (ej: "tímido, leal, melancólico").',
      '<strong>Referencias:</strong> imágenes de Pinterest, screenshots, otros dibujos.',
    ],
    quote: '"Entre más clara sea la referencia, más fiel será el resultado."',
  },
  {
    icon: Palette,
    title: 'Qué referencias enviar',
    content: [
      '<strong>Referencia del personaje:</strong> dibujos anteriores, descripciones de texto, fotos de actores.',
      '<strong>Referencia de pose:</strong> una foto o maniquí digital en la pose deseada.',
      '<strong>Paleta de colores:</strong> hex codes o una imagen con los tonos.',
      '<strong>Estilo deseado:</strong> ¿mi estilo habitual o algo más anime/realista/chibi?',
    ],
    highlight: '💡 Tip: Un collage en Canva o Pinterest board funciona perfecto.',
  },
  {
    icon: Clock,
    title: 'Tiempos de entrega reales',
    content: [
      '<strong>Sketch:</strong> 2–4 días hábiles.',
      '<strong>Lineart:</strong> 4–7 días hábiles.',
      '<strong>Flat Color:</strong> 1–2 semanas.',
      '<strong>Full Render:</strong> 2–4 semanas.',
      '<strong>Escena Compleja:</strong> 1–2 meses.',
    ],
    quote: '"Los tiempos pueden variar si hay lista de espera. Siempre aviso antes de confirmar."',
  },
  {
    icon: MessageSquare,
    title: 'El proceso de revisiones',
    content: [
      '<strong>Sketch inicial:</strong> aquí se ajusta pose, composición y proporciones. <em>Cambios gratis.</em>',
      '<strong>Lineart:</strong> se confirman detalles de ropa y expresión. <em>Cambios menores gratis.</em>',
      '<strong>Color base:</strong> se valida paleta y luces. <em>Un ajuste gratis.</em>',
      '<strong>Render final:</strong> solo retoques menores. <em>Cambios mayores = costo extra.</em>',
    ],
    highlight: '⚠️ Importante: Cambios drásticos en etapas avanzadas pueden costar extra.',
  },
];

export function TipsPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Tips para Clientes</h2>
          <p className="text-muted-foreground">Cómo pedir una comisión y sacarle el máximo provecho</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, i) => (
            <div 
              key={i}
              className="bg-card border border-border rounded-2xl p-8 hover:-translate-y-1 hover:border-accent transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl mb-5">
                <tip.icon size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">{tip.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                {tip.content.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
              {tip.quote && (
                <p className="mt-4 pl-4 border-l-2 border-primary italic text-muted-foreground text-sm">
                  {tip.quote}
                </p>
              )}
              {tip.highlight && (
                <div className="mt-4 inline-block px-4 py-2 bg-secondary rounded-lg text-xs text-primary font-semibold border border-border">
                  {tip.highlight}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
