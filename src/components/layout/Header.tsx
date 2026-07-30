import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu, Sparkles } from 'lucide-react';
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
    <header className="fixed top-0 w-full z-50 glass-strong border-b border-border/50 transition-colors">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-gradient flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          Kirart
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-glow" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="p-2.5 rounded-full border border-border/60 bg-card/50 hover:bg-secondary transition-all hover:scale-105">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsOpen(true)} className="relative p-2.5 rounded-full border border-border/60 bg-card/50 hover:bg-secondary transition-all hover:scale-105">
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2.5 rounded-full border border-border/60 bg-card/50 hover:bg-secondary transition">
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 glass-strong px-6 py-4 space-y-1">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
