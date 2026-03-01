import { Calendar, Clock, User, Share2, ArrowLeft } from 'lucide-react';
import { BlogMetadata } from '@/lib/blog.types';
import { formatDate } from '@/lib/blog.utils';
import { Streamdown } from 'streamdown';

interface BlogPostProps {
  post: BlogMetadata;
  content: string;
  onBack: () => void;
}

export default function BlogPost({ post, content, onBack }: BlogPostProps) {
  const handleShare = async () => {
    const url = `${window.location.origin}#blog/${post.slug}`;
    const text = `${post.title} - ${post.excerpt}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback: copiar para clipboard
      await navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <article className="min-h-screen bg-background text-foreground py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-card transition-colors mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={18} />
          Voltar ao Blog
        </button>

        {/* Header */}
        <header className="mb-12 pb-8 border-b border-border">
          {/* Category & Featured */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md bg-accent/20 text-accent text-xs font-semibold">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 rounded-md bg-secondary/20 text-secondary text-xs font-semibold">
                ⭐ Destaque
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {post.updatedDate && (
              <div className="flex items-center gap-2">
                <span>Atualizado em {formatDate(post.updatedDate)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readingTime} min de leitura</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-background border border-border text-foreground text-xs font-medium hover:border-accent transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Share Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-medium"
          >
            <Share2 size={18} />
            Compartilhar
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <Streamdown>{content}</Streamdown>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-border">
          <div className="bg-card/50 p-6 rounded-lg">
            <h3 className="font-bold text-foreground mb-2">Sobre o autor</h3>
            <p className="text-muted-foreground text-sm">
              {post.author} é um QA Engineer e Analista de Sistemas especializado em automação
              de testes e infraestrutura DevOps. Apaixonado por qualidade de software e boas
              práticas.
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
}
