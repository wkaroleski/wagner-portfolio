import { BlogMetadata } from './blog.types';

/**
 * Calcula tempo de leitura baseado no número de palavras
 * Assume 200 palavras por minuto como velocidade média
 */
export function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return Math.max(1, readingTime);
}

/**
 * Extrai metadados do frontmatter de um arquivo Markdown
 * Formato esperado:
 * ---
 * title: Título do Post
 * date: 2026-02-27
 * tags: tag1, tag2
 * category: Tecnologia
 * ---
 * Conteúdo aqui...
 */
export function parseFrontmatter(content: string): {
  metadata: Partial<BlogMetadata>;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const [, frontmatterStr, markdownContent] = match;
  const metadata: Partial<BlogMetadata> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    if (key.trim() === 'title') metadata.title = value;
    if (key.trim() === 'date') metadata.date = value;
    if (key.trim() === 'updatedDate') metadata.updatedDate = value;
    if (key.trim() === 'excerpt') metadata.excerpt = value;
    if (key.trim() === 'author') metadata.author = value;
    if (key.trim() === 'tags') {
      metadata.tags = value.split(',').map((t) => t.trim());
    }
    if (key.trim() === 'category') metadata.category = value;
    if (key.trim() === 'featured') metadata.featured = value === 'true';
    if (key.trim() === 'image') metadata.image = value;
  });

  return { metadata, content: markdownContent };
}

/**
 * Gera slug a partir do título
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Formata data para formato legível
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Extrai primeiras linhas para preview
 */
export function getExcerpt(content: string, wordCount: number = 50): string {
  const text = content
    .replace(/^#+\s/gm, '')
    .replace(/[*_`[\]()]/g, '')
    .trim();
  const words = text.split(/\s+/);
  return words.slice(0, wordCount).join(' ') + '...';
}

/**
 * Ordena posts por data (mais recentes primeiro)
 */
export function sortPostsByDate(posts: BlogMetadata[]): BlogMetadata[] {
  return [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Filtra posts por tag
 */
export function filterPostsByTag(posts: BlogMetadata[], tag: string): BlogMetadata[] {
  return posts.filter((post) => post.tags?.includes(tag));
}

/**
 * Filtra posts por categoria
 */
export function filterPostsByCategory(
  posts: BlogMetadata[],
  category: string
): BlogMetadata[] {
  return posts.filter((post) => post.category === category);
}

/**
 * Busca posts por título ou conteúdo
 */
export function searchPosts(
  posts: BlogMetadata[],
  query: string
): BlogMetadata[] {
  const lowerQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(lowerQuery) ||
      post.excerpt?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Obtém todas as tags únicas dos posts
 */
export function getAllTags(posts: BlogMetadata[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Obtém todas as categorias únicas dos posts
 */
export function getAllCategories(posts: BlogMetadata[]): string[] {
  const categoriesSet = new Set<string>();
  posts.forEach((post) => {
    if (post.category) categoriesSet.add(post.category);
  });
  return Array.from(categoriesSet).sort();
}
