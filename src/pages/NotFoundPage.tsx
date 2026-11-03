import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="pt-40 pb-20 px-6 text-center min-h-[70vh] flex flex-col items-center">
      <p className="font-gothic text-[8rem] leading-none text-gradient">404</p>
      <h1 className="font-display text-3xl mt-4 mb-2">Esta puerta no lleva a ninguna parte</h1>
      <p className="text-muted-foreground mb-8">La página que buscas no existe o cambió de lugar.</p>
      <Link to="/" className="btn-primary">Volver al inicio</Link>
    </div>
  );
}
