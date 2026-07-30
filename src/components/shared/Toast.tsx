import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

let toastCallback: ((msg: string) => void) | null = null;

export function showToast(message: string) {
  toastCallback?.(message);
}

export function Toast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    toastCallback = (msg: string) => {
      setMessage(msg);
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    };
    return () => { toastCallback = null; };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[3000] px-6 py-3.5 rounded-2xl glass-strong border border-primary/30 shadow-2xl shadow-primary/20 text-sm font-semibold flex items-center gap-3 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'}`}
    >
      <CheckCircle2 size={18} className="text-primary shrink-0" />
      <span className="text-foreground">{message}</span>
    </div>
  );
}
