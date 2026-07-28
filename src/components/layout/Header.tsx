import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/gallery', label: 'Galería' },
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
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border transition-colors">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Kirart
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                className={`relative text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-full border border-border bg-card hover:bg-secondary transition">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsOpen(true)} className="relative p-2 rounded-full border border-border bg-card hover:bg-secondary transition">
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-full border border-border bg-card">
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 space-y-3">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
