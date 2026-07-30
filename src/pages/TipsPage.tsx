import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FileText, Palette, Clock, MessageSquare, Lightbulb, AlertTriangle } from 'lucide-react';

const tips = [
  {
    icon: FileText,
    title: 'Cómo describir tu personaje',
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
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
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
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
    color: 'from-emerald-500 to-teal-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
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
    color: 'from-amber-500 to-orange-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    content: [
      '<strong>Sketch inicial:</strong> aquí se ajusta pose, composición y proporciones. <em>Cambios gratis.</em>',
      '<strong>Lineart:</strong> se confirman detalles de ropa y expresión. <em>Cambios menores gratis.</em>',
      '<strong>Color base:</strong> se valida paleta y luces. <em>Un ajuste gratis.</em>',
      '<strong>Render final:</strong> solo retoques menores. <em>Cambios mayores = costo extra.</em>',
    ],
    highlight: '⚠️ Cambios drásticos en etapas avanzadas pueden costar extra.',
  },
];

export function TipsPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Lightbulb size={14} />
            Guía para clientes
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Tips para Clientes</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Cómo pedir una comisión y sacarle el máximo provecho</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, i) => (
            <div 
              key={i}
              className={`bg-card border ${tip.borderColor} rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white text-xl mb-6 shadow-lg`}>
                <tip.icon size={28} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">{tip.title}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                {tip.content.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} className="flex items-start gap-2">
                  </li>
                ))}
              </ul>
              {tip.quote && (
                <p className="mt-5 pl-4 border-l-2 border-primary/40 italic text-muted-foreground text-sm">
                  {tip.quote}
                </p>
              )}
              {tip.highlight && (
                <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 ${tip.bgColor} rounded-xl text-xs font-semibold border ${tip.borderColor}`}>
                  <AlertTriangle size={14} />
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
