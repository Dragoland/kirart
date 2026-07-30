import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Pencil, Paintbrush } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' });
      gsap.from('.hero-sub', { opacity: 0, y: 40, duration: 1, delay: 0.3, ease: 'power3.out' });
      gsap.from('.hero-btns', { opacity: 0, y: 30, duration: 1, delay: 0.5, ease: 'power3.out' });
      gsap.from('.hero-orb', { opacity: 0, scale: 0.8, duration: 2, delay: 0.2, ease: 'power2.out', stagger: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Orbes decorativos animados */}
      <div className="hero-orb absolute top-1/4 left-[10%] w-72 h-72 rounded-full opacity-20 animate-pulse-glow" 
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="hero-orb absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full opacity-15 animate-pulse-glow" 
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)', filter: 'blur(80px)', animationDelay: '2s' }} />
      <div className="hero-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 animate-pulse-glow" 
        style={{ background: 'radial-gradient(circle, hsl(var(--accent-warm)) 0%, transparent 70%)', filter: 'blur(100px)', animationDelay: '4s' }} />

      <div className="relative z-10 text-center max-w-3xl px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8 animate-float">
          <Paintbrush size={14} />
          Ilustración cubana independiente
        </div>

        <h1 className="hero-title font-display text-6xl md:text-8xl font-bold leading-none tracking-tight">
          <span className="text-gradient">Kirart</span>
        </h1>

        <p className="hero-sub mt-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Dando color a ideas, personajes y mundos que solo existen en la imaginación...{' '}
          <span className="text-foreground font-medium">hasta ahora.</span>
        </p>

        <div className="hero-btns mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/gallery" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105">
            Ver Galería 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/commissions" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border/60 bg-card/50 hover:bg-secondary/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-semibold">
            <Pencil size={18} className="text-primary" /> 
            Encargar Dibujo
          </Link>
        </div>
      </div>
    </section>
  );
}
