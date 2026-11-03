import { ReactNode } from 'react';

export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 text-blood ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-blood" />
      <span className="text-sm">✦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-blood" />
    </div>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <div className="text-center mb-14">
      <h2 className="section-title mb-5">{title}</h2>
      <Ornament />
      {subtitle && <p className="text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
