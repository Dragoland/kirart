import { Artwork } from '@/types';

// Datos de ejemplo: solo se usan en `npm run dev` cuando no hay backend.
// En producción las obras salen de la base de datos (panel /admin).
export const artworks: Artwork[] = [
  { id: 1, title: 'Cyberpunk Dreams', category: 'ilustracion', description: '', price: 45, image: '/images/art-1.jpg', link: '', tags: ['Sci-Fi', 'Digital'], featured: true },
  { id: 2, title: 'Retrato Étnico', category: 'personajes', description: '', price: 60, image: '/images/art-2.jpg', link: '', tags: ['Retrato', 'Color'], featured: true },
  { id: 3, title: 'Magical Girl', category: 'adoptables', description: '', price: 35, image: '/images/art-3.jpg', link: '', tags: ['Anime'], featured: true },
  { id: 4, title: 'Paisaje Cubano', category: 'editorial', description: '', price: 50, image: '/images/art-4.jpg', link: '', tags: ['Original', 'Naturaleza'], featured: false },
  { id: 5, title: 'Mecha Warrior', category: 'personajes', description: '', price: 70, image: '/images/art-5.jpg', link: '', tags: ['Mecha', 'Concept'], featured: false },
  { id: 6, title: 'Bailarina', category: 'ilustracion', description: '', price: 40, image: '/images/art-6.jpg', link: '', tags: ['Original', 'Figura'], featured: true },
  { id: 7, title: 'Personaje D&D', category: 'comics', description: '', price: 55, image: '/images/art-7.jpg', link: '', tags: ['Fantasía', 'RPG'], featured: false },
  { id: 8, title: 'Autorretrato', category: 'storyboard', description: '', price: 0, image: '/images/art-8.jpg', link: '', tags: ['Personal'], featured: false },
];
