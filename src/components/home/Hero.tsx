import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Pencil } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' });
      gsap.from('.hero-sub', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-btns', { opacity: 0, y: 20, duration: 1, delay: 0.4, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="hero-title font-display text-5xl md:text-7xl font-bold bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent leading-tight">
          Kirart
        </h1>
        <p className="hero-sub mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Ilustración cubana. Dando color a ideas, personajes y mundos que solo existen en la imaginación... hasta ahora.
        </p>
        <div className="hero-btns mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition shadow-lg shadow-primary/25">
            Ver Galería <ArrowRight size={18} />
          </Link>
          <Link to="/commissions" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:bg-secondary transition font-semibold">
            <Pencil size={18} /> Encargar Dibujo
          </Link>
        </div>
      </div>
    </section>
  );
}
