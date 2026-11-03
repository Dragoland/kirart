import { SERVICES } from '@/lib/site';

function Strip({ outline, reverse }: { outline?: boolean; reverse?: boolean }) {
  return (
    <div aria-hidden className={`flex shrink-0 min-w-full items-center justify-around gap-10 pr-10 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
      {SERVICES.map((s) => (
        <span key={s} className="flex items-center gap-10 whitespace-nowrap">
          <span className={`font-gothic text-5xl md:text-7xl leading-none ${outline ? 'text-outline' : 'text-foreground'}`}>{s}</span>
          <span className="text-blood text-2xl">✦</span>
        </span>
      ))}
    </div>
  );
}

// Línea animada horizontal con todo lo que hace Kirart (dos filas en sentidos opuestos)
export function ServicesMarquee() {
  const mask = '[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]';
  return (
    <section aria-label={`Servicios: ${SERVICES.join(', ')}`} className="relative py-10 border-y border-border/70 bg-primary/10 space-y-5 overflow-hidden">
      <div className={`marquee flex overflow-hidden ${mask}`}><Strip /><Strip /></div>
      <div className={`marquee flex overflow-hidden ${mask}`}><Strip outline reverse /><Strip outline reverse /></div>
    </section>
  );
}
