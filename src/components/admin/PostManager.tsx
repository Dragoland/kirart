import { FormEvent, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { api } from '@/lib/api';
import { BlogPost } from '@/types';
import { showToast } from '@/components/shared/Toast';

const today = () => new Date().toISOString().slice(0, 10);
const empty = { slug: '', title: '', excerpt: '', content: '', tags: '', date: today() };

export function PostManager() {
  const { posts, reload } = useData();
  const [f, setF] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof typeof empty>(k: K, v: string) => setF((p) => ({ ...p, [k]: v }));

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const body = JSON.stringify({ ...f, tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean) });
      await api(f.slug ? `/posts/${f.slug}` : '/posts', { method: f.slug ? 'PUT' : 'POST', body });
      await reload();
      showToast(f.slug ? 'Publicación actualizada' : 'Publicación creada');
      setF({ ...empty, date: today() });
    } catch (x) { setError((x as Error).message); } finally { setBusy(false); }
  };

  const edit = (p: BlogPost) => {
    setF({ slug: p.slug, title: p.title, excerpt: p.excerpt, content: p.content, tags: p.tags.join(', '), date: p.date });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const del = async (p: BlogPost) => {
    if (!confirm(`¿Eliminar "${p.title}"?`)) return;
    try { await api(`/posts/${p.slug}`, { method: 'DELETE' }); await reload(); showToast('Publicación eliminada'); } catch (x) { setError((x as Error).message); }
  };

  return (
    <div className="space-y-10">
      <form onSubmit={save} className="panel p-6 md:p-8 space-y-4">
        <h2 className="font-display text-3xl font-semibold">{f.slug ? 'Editar publicación' : 'Nueva publicación'}</h2>
        <div className="grid sm:grid-cols-[1fr_180px] gap-4">
          <div><label className="label" htmlFor="p-title">Título</label><input id="p-title" required className="input" value={f.title} onChange={(e) => set('title', e.target.value)} /></div>
          <div><label className="label" htmlFor="p-date">Fecha</label><input id="p-date" type="date" required className="input" value={f.date} onChange={(e) => set('date', e.target.value)} /></div>
        </div>
        <div><label className="label" htmlFor="p-ex">Resumen corto</label><input id="p-ex" className="input" value={f.excerpt} onChange={(e) => set('excerpt', e.target.value)} /></div>
        <div>
          <label className="label" htmlFor="p-body">Contenido (admite Markdown: ## títulos, **negrita**, - listas)</label>
          <textarea id="p-body" rows={12} required className="input font-mono resize-y" value={f.content} onChange={(e) => set('content', e.target.value)} />
        </div>
        <div><label className="label" htmlFor="p-tags">Etiquetas (separadas por coma)</label><input id="p-tags" className="input" value={f.tags} onChange={(e) => set('tags', e.target.value)} /></div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-3">
          <button className="btn-primary" disabled={busy}>{f.slug ? 'Guardar cambios' : 'Publicar'}</button>
          {f.slug && <button type="button" className="btn-ghost" onClick={() => setF({ ...empty, date: today() })}>Cancelar edición</button>}
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="font-display text-3xl font-semibold">Publicaciones ({posts.length})</h2>
        {posts.map((p) => (
          <div key={p.slug} className="panel p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-display text-xl font-semibold truncate">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.date}</p>
            </div>
            <button className="btn-ghost btn-sm" onClick={() => edit(p)}><Pencil size={14} /> Editar</button>
            <button className="btn-ghost btn-sm hover:text-destructive" onClick={() => del(p)} aria-label={`Eliminar ${p.title}`}><Trash2 size={14} /></button>
          </div>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-sm">Aún no hay publicaciones.</p>}
      </div>
    </div>
  );
}
