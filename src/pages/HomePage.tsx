import { Hero } from '@/components/home/Hero';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Zap, Heart } from 'lucide-react';

export function HomePage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const aboutRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      <Hero />

      {/* Obras Destacadas */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Palette size={14} />
            Obras Destacadas
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Obras Destacadas</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Una selección curada de piezas disponibles y trabajos recientes</p>
        </div>
        <FeaturedGrid />
      </div>

      {/* Sección CTA */}
      <div ref={aboutRef} className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-primary/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Zap size={14} />
              Comisiones abiertas
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">¿Tienes una idea en mente?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
              Desde personajes de fantasía hasta retratos personalizados. 
              Cada trazo cuenta una historia única.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/commissions" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-all shadow-xl shadow-primary/30 hover:scale-105">
                Encargar Dibujo <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border/60 bg-card/50 hover:bg-secondary/80 backdrop-blur-sm transition-all hover:scale-105 font-semibold">
                <Heart size={18} className="text-primary" /> Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
