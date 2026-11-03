import { useEffect, useRef } from 'react';

// Fondo vivo: brasas y pétalos de rosa que suben despacio, niebla granate y viñeta.
// Respeta "reducir movimiento" y se pausa cuando la pestaña no está visible.
export function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, mx = 0.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; ph: number; petal: boolean };
    const make = (initial: boolean): P => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      r: Math.random() * 2.2 + 0.6,
      vy: -(Math.random() * 0.35 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.6 + 0.25,
      ph: Math.random() * 6.283,
      petal: Math.random() < 0.14,
    });
    const count = Math.max(24, Math.min(70, Math.floor((w * h) / 22000)));
    const ps = Array.from({ length: count }, () => make(true));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx + Math.sin(t / 1800 + p.ph) * 0.25 + (mx - 0.5) * 0.15;
        p.y += p.vy;
        if (p.y < -20) Object.assign(p, make(false));
        const flick = 0.6 + 0.4 * Math.sin(t / 400 + p.ph);
        if (p.petal) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(t / 1500 + p.ph);
          ctx.fillStyle = `rgba(129,1,0,${p.a * flick})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 2.8, p.r * 1.5, 0, 0, 6.283);
          ctx.fill();
          ctx.restore();
        } else {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, `rgba(237,235,221,${p.a * flick * 0.55})`);
          g.addColorStop(0.4, `rgba(190,25,10,${p.a * flick * 0.4})`);
          g.addColorStop(1, 'rgba(99,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, 6.283);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => { mx = e.clientX / w; };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };

    if (reduce) draw(0); else raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="animate-fog absolute -inset-x-[10%] top-[10%] h-[60%] opacity-40"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, hsl(var(--accent) / .7), transparent 60%)', filter: 'blur(60px)' }} />
      <div className="animate-fog absolute -inset-x-[10%] bottom-0 h-[50%] opacity-30"
        style={{ background: 'radial-gradient(ellipse at 70% 60%, hsl(var(--primary) / .6), transparent 60%)', filter: 'blur(80px)', animationDelay: '-12s' }} />
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, hsl(var(--background)) 100%)' }} />
    </div>
  );
}
