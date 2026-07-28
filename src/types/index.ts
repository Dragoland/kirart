export interface Artwork {
  id: number;
  title: string;
  category: 'fanart' | 'original' | 'retrato' | 'concept';
  price: number;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
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
