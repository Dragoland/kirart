import { tools } from '@/data/tools';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Terminal } from 'lucide-react';

const tagStyles: Record<string, string> = {
  digital: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  trad: 'bg-primary/15 text-primary border-primary/20',
  '3d': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  system: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  hardware: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
};

export function ToolsPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Terminal size={14} />
            Estudio digital
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Herramientas</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Software y materiales que uso para crear cada ilustración</p>
        </div>

        <div className="font-mono text-sm text-muted-foreground mb-10 p-5 bg-card rounded-2xl border border-border/50 border-l-4 border-l-primary shadow-lg shadow-primary/5">
          <span className="text-muted-foreground italic">// HERRAMIENTAS_DIGITALES</span><br />
          <span className="text-accent font-semibold">kiralizt@kirart</span>:<span className="text-primary">~/estudio</span>$ ls -la software/<br />
          <span className="text-muted-foreground">total {tools.length} herramientas activas</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <div 
              key={tool.abbr}
              className="group bg-card border border-border/50 rounded-2xl p-6 text-center hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-3 tracking-tight group-hover:scale-110 transition-transform">
                {tool.abbr}
              </div>
              <div className="font-semibold text-sm mb-1">{tool.name}</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-4">{tool.desc}</div>
              <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wider border ${tagStyles[tool.tagColor]}`}>
                {tool.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
