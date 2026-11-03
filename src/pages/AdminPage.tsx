import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, FileText, Settings2, LogOut, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ArtworkManager } from '@/components/admin/ArtworkManager';
import { PostManager } from '@/components/admin/PostManager';
import { SettingsManager } from '@/components/admin/SettingsManager';

function Login() {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try { await login(password); } catch (x) { setError((x as Error).message); } finally { setBusy(false); }
  };

  return (
    <div className="pt-36 pb-20 px-6 min-h-[80vh] flex items-start justify-center">
      <form onSubmit={submit} className="panel p-8 w-full max-w-sm space-y-5">
        <h1 className="font-gothic text-4xl text-center flex items-center justify-center gap-3"><Lock size={22} className="text-blood" /> Panel</h1>
        <p className="text-sm text-muted-foreground text-center">Acceso solo para Kirart.</p>
        <div>
          <label className="label" htmlFor="pw">Contraseña</label>
          <input id="pw" type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} className="input" autoComplete="current-password" />
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button className="btn-primary w-full py-3" disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-blood">Volver al sitio</Link>
      </form>
    </div>
  );
}

const tabs = [
  { key: 'obras', label: 'Obras', icon: ImageIcon },
  { key: 'blog', label: 'Blog', icon: FileText },
  { key: 'ajustes', label: 'Comisiones', icon: Settings2 },
] as const;

export function AdminPage() {
  const { isAdmin, checking, logout } = useAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]['key']>('obras');

  if (checking) return <div className="pt-40 text-center text-muted-foreground min-h-[60vh]">Comprobando sesión…</div>;
  if (!isAdmin) return <Login />;

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-gothic text-5xl">Panel de Kirart</h1>
          <button onClick={logout} className="btn-ghost btn-sm"><LogOut size={14} /> Cerrar sesión</button>
        </div>
        <div className="flex gap-2 mb-8 border-b border-border" role="tablist">
          {tabs.map((t) => (
            <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.key ? 'border-blood text-blood' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
        {tab === 'obras' && <ArtworkManager />}
        {tab === 'blog' && <PostManager />}
        {tab === 'ajustes' && <SettingsManager />}
      </div>
    </div>
  );
}
