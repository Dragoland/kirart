import type { CategoryKey } from '@/lib/categories';

export type { CategoryKey };

export interface Artwork {
  id: number;
  title: string;
  category: CategoryKey;
  description: string;
  price: number;
  image: string;
  link: string; // opcional: video de YouTube u otra URL
  tags: string[];
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface CartItem extends Artwork {
  qty: number;
}

export interface Tool {
  abbr: string;
  name: string;
  desc: string;
  tag: string;
  tagColor: 'digital' | 'trad' | '3d' | 'system' | 'hardware';
}

export interface Settings {
  commissions_open: boolean;
  slots: number;
}
