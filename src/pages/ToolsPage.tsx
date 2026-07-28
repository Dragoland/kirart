import { tools } from '@/data/tools';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const tagStyles: Record<string, string> = {
  digital: 'bg-blue-500/12 text-blue-500',
  trad: 'bg-primary/12 text-primary',
  '3d': 'bg-purple-500/12 text-purple-500',
  system: 'bg-green-500/12 text-green-500',
  hardware: 'bg-orange-500/12 text-orange-500',
};

export function ToolsPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Herramientas</h2>
          <p className="text-muted-foreground">Software y materiales que uso para crear</p>
        </div>

        <div className="font-mono text-sm text-muted-foreground mb-8 p-4 bg-card rounded-xl border border-border border-l-4 border-l-primary">
          <span className="text-muted-foreground italic">// HERRAMIENTAS_DIGITALES</span><br />
          <span className="text-accent font-semibold">kiralizt@kirart</span>:<span className="text-primary">~/estudio</span>$ ls -la software/<br />
          <span className="text-muted-foreground">total 8 herramientas activas</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tools.map(tool => (
            <div 
              key={tool.abbr}
              className="group bg-card border border-border rounded-2xl p-6 text-center hover:-translate-y-1 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-mono text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2 tracking-tight">
                {tool.abbr}
              </div>
              <div className="font-semibold text-sm mb-1">{tool.name}</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-3">{tool.desc}</div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${tagStyles[tool.tagColor]}`}>
                {tool.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
