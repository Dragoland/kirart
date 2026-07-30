import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-15 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)', filter: 'blur(100px)', animationDelay: '2s' }}
      />
      <div 
        className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full opacity-10 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent-warm)) 0%, transparent 70%)', filter: 'blur(60px)', animationDelay: '4s' }}
      />
    </div>
  );
};
