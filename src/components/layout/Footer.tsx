import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, MessageCircle } from 'lucide-react';
import { SITE, waLink } from '@/lib/site';
import { Ornament } from '@/components/shared/SectionHeader';

export function Footer() {
  const social = [
    { icon: Instagram, label: 'Instagram', href: SITE.instagram },
    { icon: Youtube, label: 'YouTube', href: SITE.youtube },
    { icon: MessageCircle, label: 'WhatsApp', href: waLink() },
    { icon: Mail, label: 'Correo', href: `mailto:${SITE.email}` },
  ];
  return (
    <footer className="border-t border-border mt-10 py-14 px-6 text-center">
      <p className="font-gothic text-4xl mb-4">Kirart</p>
      <Ornament className="mb-8" />
      <div className="flex justify-center gap-3 mb-8">
        {social.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} aria-label={s.label}
            className="w-12 h-12 rounded-full border border-border bg-card/60 flex items-center justify-center hover:bg-primary hover:border-cotton/30 transition-colors">
            <s.icon size={20} />
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Kirart · Hecho en Cuba
        {/* Acceso discreto al panel */}
        <Link to="/admin" className="ml-3 opacity-30 hover:opacity-100 hover:text-blood" aria-label="Acceso administradora">†</Link>
      </p>
    </footer>
  );
}
