import { Artwork } from '@/types';

export const artworks: Artwork[] = [
  { id: 1, title: "Cyberpunk Dreams", category: "concept", price: 45, image: "/images/art-1.jpg", tags: ["Sci-Fi", "Digital"], featured: true },
  { id: 2, title: "Retrato Étnico", category: "retrato", price: 60, image: "/images/art-2.jpg", tags: ["Retrato", "Color"], featured: true },
  { id: 3, title: "Magical Girl", category: "fanart", price: 35, image: "/images/art-3.jpg", tags: ["Anime", "Fanart"], featured: true },
  { id: 4, title: "Paisaje Cubano", category: "original", price: 50, image: "/images/art-4.jpg", tags: ["Original", "Naturaleza"], featured: false },
  { id: 5, title: "Mecha Warrior", category: "concept", price: 70, image: "/images/art-5.jpg", tags: ["Mecha", "Concept"], featured: false },
  { id: 6, title: "Bailarina", category: "original", price: 40, image: "/images/art-6.jpg", tags: ["Original", "Figura"], featured: true },
  { id: 7, title: "Personaje D&D", category: "fanart", price: 55, image: "/images/art-7.jpg", tags: ["Fantasía", "RPG"], featured: false },
  { id: 8, title: "Autorretrato", category: "retrato", price: 0, image: "/images/art-8.jpg", tags: ["Retrato", "Personal"], featured: false },
];
