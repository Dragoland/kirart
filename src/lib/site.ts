export const SITE = {
  name: 'Kirart',
  email: 'kiralizt@gmail.com',
  whatsapp: '5356870519',
  whatsappDisplay: '+53 56870519',
  youtube: 'https://www.youtube.com/@kiralizxo',
  instagram: 'https://www.instagram.com/kiraliz.xo',
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// Lo que se muestra en la línea animada horizontal
export const SERVICES = [
  'Ilustración',
  'Animación',
  'Concept art',
  'Diseño de personajes',
  'Storyboard',
  'Adoptables',
  'Ilustración editorial',
  'Cómics',
  'Comisiones abiertas',
];
