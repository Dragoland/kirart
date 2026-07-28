import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5356870519"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25d366]/30 hover:scale-110 transition-transform"
      title="Escríbeme por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
