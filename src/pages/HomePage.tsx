import { Hero } from '@/components/home/Hero';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function HomePage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      <Hero />
      <div ref={ref} className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Obras Destacadas</h2>
          <p className="text-muted-foreground">Una selección de piezas disponibles y trabajos recientes</p>
        </div>
        <FeaturedGrid />
      </div>
    </div>
  );
}
