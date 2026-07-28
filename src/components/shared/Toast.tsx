import { useEffect, useState } from 'react';

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
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[3000] px-6 py-3 rounded-full bg-card border border-border shadow-xl text-sm font-medium transition-all duration-400 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
      {message}
    </div>
  );
}
