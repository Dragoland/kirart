import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, MapPin, Clock, Instagram, Twitter, Music, Brush } from 'lucide-react';
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
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Contacto</h2>
          <p className="text-muted-foreground">Conecta conmigo. Trabajemos juntos.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
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
                <div key={item.label} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:translate-x-1 hover:border-l-2 hover:border-l-primary transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition">
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-semibold">{item.value}</div>
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
                  className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-1 transition-all"
                  title={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
              <a 
                href="https://wa.me/5356870519"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:-translate-y-1 transition-all"
                title="WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl relative overflow-hidden">
              <span className="relative z-10">🎨</span>
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop')] bg-cover bg-center" />
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-display text-lg font-semibold mb-3">¿Trabajamos juntos?</h3>
              <p className="text-muted-foreground mb-6">
                Estoy abierta a colaboraciones, proyectos freelance, 
                comisiones personalizadas y licencias de mis obras.
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" asChild>
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
