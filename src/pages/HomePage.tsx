import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ServicesMarquee } from '@/components/shared/ServicesMarquee';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function HomePage() {
  const catRef = useScrollReveal<HTMLDivElement>();
  const featRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      <Hero />
      <ServicesMarquee />

      <div ref={catRef} className="max-w-7xl mx-auto px-6 py-24">
        <SectionHeader title="Lo que hago" subtitle="Siete puertas, un mismo universo. Entra por la que necesites." />
        <CategoryGrid />
      </div>

      <div ref={featRef} className="max-w-7xl mx-auto px-6 pb-24">
        <SectionHeader title="Obras destacadas" subtitle="Una selección de piezas recientes y favoritas." />
        <FeaturedGrid />
      </div>

      <div ref={ctaRef} className="max-w-5xl mx-auto px-6 pb-12">
        <div className="panel p-10 md:p-16 text-center">
          <h2 className="font-gothic text-4xl md:text-5xl mb-4">¿Tienes una idea en mente?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg leading-relaxed">
            Desde personajes de fantasía hasta storyboards y portadas. Cada trazo cuenta una historia única.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/commissions" className="btn-primary px-8 py-4">Encargar un dibujo <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-ghost px-8 py-4"><Heart size={18} className="text-blood" /> Contactar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
