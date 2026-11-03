import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu, X, Cross, ChevronDown, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CATEGORIES } from '@/lib/categories';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/gallery', label: 'Galería', menu: true },
  { to: '/shop', label: 'Tienda' },
  { to: '/commissions', label: 'Comisiones' },
  { to: '/tools', label: 'Herramientas' },
  { to: '/tips', label: 'Tips' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contacto' },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const { count, setIsOpen } = useCart();
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const active = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
  const iconBtn = 'p-2.5 rounded-full border border-border bg-card/60 hover:bg-secondary hover:border-blood/60 transition-colors';

  return (
    <header className="fixed top-0 w-full z-50 glass-strong border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Principal">
        <Link to="/" className="font-gothic text-3xl text-foreground flex items-center gap-2 hover:text-blood transition-colors">
          <Cross size={16} className="text-blood" aria-hidden />
          Kirart
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                className={`flex items-center gap-1 py-5 text-sm font-medium transition-colors hover:text-blood ${active(link.to) ? 'text-blood' : 'text-muted-foreground'}`}
              >
                {link.label}
                {link.menu && <ChevronDown size={14} aria-hidden />}
                {active(link.to) && <span className="absolute bottom-3 left-0 w-full h-px bg-blood" />}
              </Link>
              {link.menu && (
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all absolute left-1/2 -translate-x-1/2 top-full w-64 panel glass-strong p-2">
                  <Link to="/gallery" className="block px-4 py-2 text-sm rounded-sm hover:bg-primary/20">Todas las obras</Link>
                  {CATEGORIES.map((c) => (
                    <Link key={c.key} to={`/gallery/${c.key}`} className="block px-4 py-2 text-sm rounded-sm hover:bg-primary/20">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          {isAdmin && (
            <Link to="/admin" className={`${iconBtn} text-blood`} title="Panel de administración" aria-label="Panel de administración">
              <ShieldCheck size={18} />
            </Link>
          )}
          <button onClick={toggle} className={iconBtn} aria-label="Cambiar tema" title={theme === 'dark' ? 'Tema claro (Cotton)' : 'Tema oscuro (Noir)'}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsOpen(true)} className={`relative ${iconBtn}`} aria-label="Abrir carrito">
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border border-cotton/30">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden ${iconBtn}`} aria-label="Menú" aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border glass-strong px-6 py-4 max-h-[75vh] overflow-y-auto space-y-1">
          {navLinks.map((link) => (
            <div key={link.to}>
              <Link to={link.to} className={`block px-4 py-2.5 rounded-sm text-sm font-medium ${active(link.to) ? 'text-blood bg-primary/15' : 'text-muted-foreground hover:bg-secondary'}`}>
                {link.label}
              </Link>
              {link.menu && (
                <div className="ml-4 border-l border-border pl-2">
                  {CATEGORIES.map((c) => (
                    <Link key={c.key} to={`/gallery/${c.key}`} className="block px-4 py-2 text-sm text-muted-foreground hover:text-blood">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
