import { Phone, Mail, MapPin, Clock, Instagram, Youtube } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader, Ornament } from '@/components/shared/SectionHeader';
import { SITE, waLink } from '@/lib/site';

const contactItems = [
  { icon: Phone, label: 'WhatsApp', value: SITE.whatsappDisplay, href: waLink() },
  { icon: Mail, label: 'Correo', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Instagram, label: 'Instagram', value: '@kiraliz.xo', href: SITE.instagram },
  { icon: Youtube, label: 'YouTube', value: '@kiralizxo', href: SITE.youtube },
  { icon: MapPin, label: 'Ubicación', value: 'Cuba · Trabajo remoto' },
  { icon: Clock, label: 'Tiempo de respuesta', value: '24–48 horas (GMT-4)' },
];

export function ContactPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div className="pt-28 pb-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Contacto" subtitle="Abierta a colaboraciones, comisiones y proyectos freelance." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="panel p-8">
            <h3 className="font-gothic text-4xl mb-6">Sobre Kirart</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Soy Kirart, ilustradora nacida en Cuba. Dibujo desde que tengo memoria y lo que empezó como un hobby es hoy mi forma de vida y de expresión.</p>
              <p>
                Trabajo en <strong className="text-foreground">diseño de personajes</strong>, <strong className="text-foreground">ilustración</strong>,{' '}
                <strong className="text-foreground">animación</strong>, <strong className="text-foreground">storyboard</strong>, adoptables,
                ilustración editorial y cómics. Me inspiran los videojuegos, el anime, la música y los colores de mi isla.
              </p>
              <p>Trabajo de forma independiente: acepto comisiones personalizadas y vendo prints y adoptables.</p>
            </div>
          </div>

          <div className="space-y-3">
            {contactItems.map((item) => {
              const inner = (
                <>
                  <div className="w-11 h-11 rounded-sm bg-primary border border-cotton/25 flex items-center justify-center text-primary-foreground shrink-0"><item.icon size={20} /></div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                    <div className="font-semibold truncate">{item.value}</div>
                  </div>
                </>
              );
              const cls = 'flex items-center gap-4 p-4 panel hover:border-blood/60 transition-colors';
              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={item.label} className={cls}>{inner}</div>
              );
            })}
            <div className="panel p-8 text-center">
              <Ornament className="mb-4" />
              <h3 className="font-display text-2xl font-semibold mb-2">¿Trabajamos juntos?</h3>
              <p className="text-muted-foreground mb-6 text-sm">Cuéntame tu idea y vemos cómo hacerla realidad.</p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full py-4">Escríbeme por WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
