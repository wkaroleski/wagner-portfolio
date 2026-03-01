import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { BlogMetadata } from '@/lib/blog.types';
import { formatDate } from '@/lib/blog.utils';

interface BlogCardProps {
  post: BlogMetadata;
  onRead: (slug: string) => void;
}

export default function BlogCard({ post, onRead }: BlogCardProps) {
  return (
    <article
      onClick={() => onRead(post.slug)}
      className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Featured Badge */}
      {post.featured && (
        <div className="mb-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold w-fit">
          ⭐ Destaque
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
        {post.title}
      </h3>

      {/* Category & Date */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
        <span className="px-2 py-1 rounded-md bg-background/50 text-foreground text-xs font-medium">
          {post.category}
        </span>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>

      {/* Excerpt */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Meta Info */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock size={14} />
          <span>{post.readingTime} min de leitura</span>
        </div>
        <span className="text-xs text-muted-foreground">Por {post.author}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background/50 text-foreground text-xs font-medium border border-border/50"
          >
            <Tag size={12} />
            {tag}
          </span>
        ))}
        {post.tags && post.tags.length > 3 && (
          <span className="text-xs text-muted-foreground">+{post.tags.length - 3}</span>
        )}
      </div>

      {/* Read More Button */}
      <button className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
        Ler artigo
        <ArrowRight size={16} />
      </button>
    </article>
  );
}
