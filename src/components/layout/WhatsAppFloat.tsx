import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/site';

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground border border-cotton/30 rounded-full flex items-center justify-center shadow-2xl hover:bg-accent hover:scale-110 transition-all duration-300 animate-float"
      style={{ boxShadow: '0 10px 40px -8px var(--glow)' }}
      title="Escríbeme por WhatsApp"
      aria-label="Escríbeme por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
