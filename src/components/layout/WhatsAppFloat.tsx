import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5356870519"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-[#25d366] to-[#128C7E] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25d366]/40 hover:scale-110 hover:shadow-[#25d366]/60 transition-all duration-300 animate-float"
      title="Escríbeme por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
