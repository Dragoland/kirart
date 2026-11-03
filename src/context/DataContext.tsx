import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { Artwork, BlogPost, Settings } from '@/types';
import { api } from '@/lib/api';
import { artworks as seedArtworks } from '@/data/artworks';
import { posts as seedPosts } from '@/data/posts';

interface DataContextType {
  artworks: Artwork[];
  posts: BlogPost[];
  settings: Settings;
  loading: boolean;
  reload: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);
const defaultSettings: Settings = { commissions_open: true, slots: 3 };

export function DataProvider({ children }: { children: ReactNode }) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const [a, p, s] = await Promise.all([
        api<Artwork[]>('/artworks'),
        api<BlogPost[]>('/posts'),
        api<Settings>('/settings'),
      ]);
      if (!Array.isArray(a) || !Array.isArray(p)) throw new Error('Respuesta inválida');
      setArtworks(a);
      setPosts(p);
      setSettings({ ...defaultSettings, ...s });
    } catch {
      // Con `npm run dev` no hay backend: se muestran datos de ejemplo.
      if (import.meta.env.DEV) {
        setArtworks(seedArtworks);
        setPosts(seedPosts);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  return <DataContext.Provider value={{ artworks, posts, settings, loading, reload }}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
