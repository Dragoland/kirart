import { FormEvent, useEffect, useState } from 'react';
import { useData } from '@/context/DataContext';
import { api } from '@/lib/api';
import { showToast } from '@/components/shared/Toast';

export function SettingsManager() {
  const { settings, reload } = useData();
  const [open, setOpen] = useState(settings.commissions_open);
  const [slots, setSlots] = useState(String(settings.slots));
  const [error, setError] = useState('');

  useEffect(() => { setOpen(settings.commissions_open); setSlots(String(settings.slots)); }, [settings]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api('/settings', { method: 'PUT', body: JSON.stringify({ commissions_open: open, slots: Number(slots) || 0 }) });
      await reload();
      showToast('Ajustes guardados');
    } catch (x) { setError((x as Error).message); }
  };

  return (
    <form onSubmit={save} className="panel p-6 md:p-8 space-y-5 max-w-lg">
      <h2 className="font-display text-3xl font-semibold">Estado de las comisiones</h2>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 accent-[#810100]" checked={open} onChange={(e) => setOpen(e.target.checked)} />
        Comisiones abiertas
      </label>
      <div>
        <label className="label" htmlFor="slots">Cupos disponibles</label>
        <input id="slots" type="number" min="0" max="99" className="input" value={slots} onChange={(e) => setSlots(e.target.value)} />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button className="btn-primary">Guardar</button>
    </form>
  );
}
