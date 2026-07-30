import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, MapPin, Clock, Instagram, Twitter, Music, Brush, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactItems = [
  { icon: Phone, label: 'WhatsApp', value: '+53 56870519', href: 'https://wa.me/5356870519' },
  { icon: Mail, label: 'Email', value: 'contacto@kirart.cu', href: 'mailto:contacto@kirart.cu' },
  { icon: MapPin, label: 'Ubicación', value: 'Cuba · Disponible para trabajo remoto' },
  { icon: Clock, label: 'Horario de respuesta', value: '24-48 horas (GMT-4)' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter/X', href: '#' },
  { icon: Music, label: 'TikTok', href: '#' },
  { icon: Brush, label: 'DeviantArt', href: '#' },
];

export function ContactPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-24 pb-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Send size={14} />
            Conecta conmigo
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Contacto</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Trabajemos juntos. Estoy abierta a colaboraciones, comisiones y proyectos freelance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-primary/5">
            <h3 className="font-display text-2xl font-bold text-gradient mb-6">
              Sobre KiraLizt
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                ¡Hola! Soy KiraLizt, ilustradora nacida en Cuba. Dibujo desde que tengo memoria, 
                y lo que empezó como un hobby se convirtió en mi forma de vida y de expresión.
              </p>
              <p>
                Mi trabajo se centra en <strong className="text-foreground">ilustración de personajes</strong>, 
                <strong className="text-foreground">concept art</strong> y <strong className="text-foreground">retratos digitales</strong>. 
                Me inspiran los videojuegos, el anime, la música y los colores vibrantes de mi isla.
              </p>
              <p>
                Actualmente trabajo de forma independiente, aceptando comisiones personalizadas 
                y vendiendo prints de mis obras.
              </p>
            </div>

            <div className="space-y-3">
              {contactItems.map(item => (
                <div key={item.label} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/60 hover:translate-x-1 transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                    <item.icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-semibold truncate">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              {socialLinks.map(link => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="w-12 h-12 rounded-full bg-secondary border border-border/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                  title={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
              <a 
                href="https://wa.me/5356870519"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#25d366] to-[#128C7E] text-white flex items-center justify-center hover:-translate-y-1 transition-all shadow-lg shadow-[#25d366]/30"
                title="WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl relative overflow-hidden shadow-xl shadow-primary/20">
              <span className="relative z-10 text-6xl">🎨</span>
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop')] bg-cover bg-center" />
            </div>

            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-primary/5">
              <h3 className="font-display text-xl font-semibold mb-3">¿Trabajamos juntos?</h3>
              <p className="text-muted-foreground mb-6">
                Estoy abierta a colaboraciones, proyectos freelance, 
                comisiones personalizadas y licencias de mis obras.
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all" asChild>
                <a href="https://wa.me/5356870519" target="_blank" rel="noopener noreferrer">
                  Escríbeme por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
