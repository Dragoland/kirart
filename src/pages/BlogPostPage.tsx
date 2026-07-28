import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const modules = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<{ title: string; date: string; content: string } | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const path = `/src/content/blog/${slug}.md`;
    const raw = modules[path] as string | undefined;
    if (raw) {
      const parsed = matter(raw);
      setPost({
        title: parsed.data.title,
        date: parsed.data.date,
        content: parsed.content,
      });
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <p className="text-muted-foreground">Post no encontrado</p>
        <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:underline">
          <ArrowLeft size={18} /> Volver al blog
        </Link>

        <article className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8">
            <Calendar size={16} />
            {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
