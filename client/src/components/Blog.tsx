import BlogCard from './BlogCard';
import { BlogMetadata } from '@/lib/blog.types';

const POSTS: BlogMetadata[] = [
  {
    id: '1',
    title: 'De Portfólio a Laboratório de Qualidade: Construindo uma Esteira CI/CD',
    slug: 'https://medium.com/p/689eacd73776',
    excerpt: 'Como transformei meu portfólio num laboratório de QA e DevOps, larguei o Cypress e implementei testes E2E com Playwright, Mock de rede e Cache.',
    author: 'Wagner Karoleski',
    date: '2026-03-02',
    category: 'QA & DevOps',
    tags: ['QA', 'DevOps', 'Playwright', 'CI/CD'],
    readingTime: 5,
    featured: true, // Isso vai fazer o selinho "⭐ Destaque" brilhar no card!
  }
];

export default function Blog() {
  // Esta função recebe a URL (slug) e abre o Medium numa nova aba
  const handleRead = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="blog" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Blog</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
          <p className="text-muted-foreground mt-4">
            Artigos sobre automação de testes, DevOps, carreira e boas práticas em QA.
          </p>
        </div>

        {/* Grelha de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onRead={handleRead}
            />
          ))}
        </div>
      </div>
    </section>
  );
}