import { ChangeEvent, FormEvent, useState } from 'react';
import { Pencil, Trash2, Upload, Star } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { api, uploadImage } from '@/lib/api';
import { CATEGORIES, categoryLabel } from '@/lib/categories';
import { Artwork } from '@/types';
import { showToast } from '@/components/shared/Toast';

const empty = { id: 0, title: '', category: CATEGORIES[0].key as string, description: '', price: '0', image: '', link: '', tags: '', featured: false };

export function ArtworkManager() {
  const { artworks, reload } = useData();
  const [f, setF] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof typeof empty>(k: K, v: (typeof empty)[K]) => setF((p) => ({ ...p, [k]: v }));

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setError('');
    try { set('image', await uploadImage(file)); } catch (x) { setError((x as Error).message); } finally { setBusy(false); e.target.value = ''; }
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!f.image) { setError('Sube una imagen primero'); return; }
    setBusy(true); setError('');
    try {
      const body = JSON.stringify({ ...f, price: Number(f.price) || 0, tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean) });
      await api(f.id ? `/artworks/${f.id}` : '/artworks', { method: f.id ? 'PUT' : 'POST', body });
      await reload();
      showToast(f.id ? 'Obra actualizada' : 'Obra publicada');
      setF(empty);
    } catch (x) { setError((x as Error).message); } finally { setBusy(false); }
  };

  const edit = (a: Artwork) => {
    setF({ id: a.id, title: a.title, category: a.category, description: a.description, price: String(a.price), image: a.image, link: a.link, tags: a.tags.join(', '), featured: a.featured });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const del = async (a: Artwork) => {
    if (!confirm(`¿Eliminar "${a.title}"? No se puede deshacer.`)) return;
    try { await api(`/artworks/${a.id}`, { method: 'DELETE' }); await reload(); showToast('Obra eliminada'); } catch (x) { setError((x as Error).message); }
  };

  return (
    <div className="space-y-10">
      <form onSubmit={save} className="panel p-6 md:p-8 space-y-5">
        <h2 className="font-display text-3xl font-semibold">{f.id ? 'Editar obra' : 'Publicar una obra nueva'}</h2>

        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <div>
            <div className="aspect-[4/5] rounded-sm border border-dashed border-border bg-secondary/50 overflow-hidden flex items-center justify-center">
              {f.image ? <img src={f.image} alt="Vista previa" className="w-full h-full object-cover" /> : <span className="text-sm text-muted-foreground px-4 text-center">Sin imagen</span>}
            </div>
            <label className="btn-ghost btn-sm w-full mt-3 cursor-pointer">
              <Upload size={14} /> {busy ? 'Subiendo…' : 'Subir imagen'}
              <input type="file" accept="image/*" className="sr-only" onChange={onFile} disabled={busy} />
            </label>
          </div>

          <div className="space-y-4">
            <div><label className="label" htmlFor="a-title">Título</label><input id="a-title" required className="input" value={f.title} onChange={(e) => set('title', e.target.value)} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="a-cat">Sección</label>
                <select id="a-cat" className="input" value={f.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>
              <div><label className="label" htmlFor="a-price">Precio USD (0 = no se vende)</label><input id="a-price" type="number" min="0" step="1" className="input" value={f.price} onChange={(e) => set('price', e.target.value)} /></div>
            </div>
            <div><label className="label" htmlFor="a-desc">Descripción (opcional)</label><textarea id="a-desc" rows={3} className="input resize-none" value={f.description} onChange={(e) => set('description', e.target.value)} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="label" htmlFor="a-tags">Etiquetas (separadas por coma)</label><input id="a-tags" className="input" value={f.tags} onChange={(e) => set('tags', e.target.value)} placeholder="Fantasía, Digital" /></div>
              <div><label className="label" htmlFor="a-link">Enlace a video (opcional)</label><input id="a-link" type="url" className="input" value={f.link} onChange={(e) => set('link', e.target.value)} placeholder="https://youtube.com/…" /></div>
            </div>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-[#810100]" checked={f.featured} onChange={(e) => set('featured', e.target.checked)} />
              Mostrar en “Obras destacadas” de la portada
            </label>
          </div>
        </div>

        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-3">
          <button className="btn-primary" disabled={busy}>{f.id ? 'Guardar cambios' : 'Publicar obra'}</button>
          {f.id !== 0 && <button type="button" className="btn-ghost" onClick={() => { setF(empty); setError(''); }}>Cancelar edición</button>}
        </div>
      </form>

      <div>
        <h2 className="font-display text-3xl font-semibold mb-4">Obras publicadas ({artworks.length})</h2>
        <div className="space-y-3">
          {artworks.map((a) => (
            <div key={a.id} className="panel p-3 flex items-center gap-4">
              <img src={a.image} alt="" className="w-16 h-16 object-cover rounded-sm shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-display text-xl font-semibold truncate flex items-center gap-2">{a.title}{a.featured && <Star size={14} className="text-blood shrink-0" aria-label="Destacada" />}</p>
                <p className="text-xs text-muted-foreground">{categoryLabel(a.category)} · {a.price > 0 ? `$${a.price}` : 'No se vende'}</p>
              </div>
              <button className="btn-ghost btn-sm" onClick={() => edit(a)} aria-label={`Editar ${a.title}`}><Pencil size={14} /> Editar</button>
              <button className="btn-ghost btn-sm hover:text-destructive" onClick={() => del(a)} aria-label={`Eliminar ${a.title}`}><Trash2 size={14} /></button>
            </div>
          ))}
          {artworks.length === 0 && <p className="text-muted-foreground text-sm">Todavía no has publicado ninguna obra. Usa el formulario de arriba.</p>}
        </div>
      </div>
    </div>
  );
}
