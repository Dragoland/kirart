import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Pencil } from 'lucide-react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Una sola secuencia de entrada: el arco se dibuja y el título emerge de la niebla
      gsap.from('.hero-arch path', { strokeDashoffset: 1600, duration: 2.6, ease: 'power2.inOut', stagger: 0.25 });
      gsap.from('.hero-title', { opacity: 0, y: 40, filter: 'blur(14px)', duration: 1.6, ease: 'power3.out', delay: 0.3 });
      gsap.from('.hero-sub, .hero-btns', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', delay: 0.9, stagger: 0.15 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16 px-6">
      {/* Arco gótico apuntado */}
      <svg aria-hidden viewBox="0 0 400 600" preserveAspectRatio="xMidYMax meet"
        className="hero-arch absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto text-blood opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 600V250Q20 70 200 8Q380 70 380 250V600" strokeDasharray="1600" />
        <path d="M44 600V255Q44 100 200 44Q356 100 356 255V600" strokeDasharray="1600" opacity=".6" />
        <path d="M200 8V44" strokeDasharray="1600" opacity=".6" />
      </svg>

      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="hero-title font-gothic text-[6rem] sm:text-[9rem] md:text-[13rem] leading-[0.85] text-gradient"
          style={{ filter: 'drop-shadow(0 0 40px var(--glow))' }}>
          Kirart
        </h1>
        <p className="hero-sub mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Dando color a ideas, personajes y mundos que solo existen en la imaginación…{' '}
          <span className="text-foreground font-medium">hasta ahora.</span>
        </p>
        <div className="hero-btns mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/gallery" className="btn-primary px-8 py-4">Ver galería <ArrowRight size={18} /></Link>
          <Link to="/commissions" className="btn-ghost px-8 py-4"><Pencil size={18} className="text-blood" /> Encargar un dibujo</Link>
        </div>
      </div>
    </section>
  );
}
