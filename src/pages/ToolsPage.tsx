import { tools } from '@/data/tools';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function ToolsPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-28 pb-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Herramientas" subtitle="El software y los materiales con los que nace cada pieza." />

        <div className="font-mono text-sm text-muted-foreground mb-10 p-5 panel border-l-4 border-l-primary">
          <span className="italic">// herramientas_digitales</span><br />
          <span className="text-blood font-medium">kirart@estudio</span>:<span className="text-foreground">~</span>$ ls -la software/<br />
          total {tools.length} herramientas activas
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <div key={tool.abbr} className="group panel p-6 text-center hover:border-blood/60 transition-colors">
              <div className="font-gothic text-5xl text-blood mb-3 group-hover:scale-110 transition-transform">{tool.abbr}</div>
              <div className="font-semibold text-sm mb-1">{tool.name}</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-4">{tool.desc}</div>
              <span className="inline-block px-2.5 py-1 rounded-sm text-[11px] font-mono border border-border text-muted-foreground">{tool.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
