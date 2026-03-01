import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import BlogCard from './BlogCard';
import { BlogMetadata } from '@/lib/blog.types';
import {
  sortPostsByDate,
  filterPostsByTag,
  filterPostsByCategory,
  searchPosts,
  getAllTags,
  getAllCategories,
} from '@/lib/blog.utils';

// Dados de exemplo - em produção, estes viriam de arquivos Markdown
const BLOG_POSTS: BlogMetadata[] = [
  {
    id: '1',
    title: 'Automação de Testes com Cypress: Guia Completo',
    slug: 'automacao-testes-cypress-guia-completo',
    excerpt:
      'Aprenda como configurar e usar Cypress para automação de testes end-to-end. Neste guia completo, cobrimos desde a instalação até padrões avançados.',
    author: 'Wagner Karoleski',
    date: '2026-02-20',
    tags: ['Cypress', 'Automação', 'Testes', 'JavaScript'],
    category: 'Tecnologia',
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'Docker para QA Engineers: Primeiros Passos',
    slug: 'docker-qa-engineers-primeiros-passos',
    excerpt:
      'Entenda como Docker revoluciona o ambiente de testes. Aprenda containers, imagens e como usar Docker Compose para ambientes de teste.',
    author: 'Wagner Karoleski',
    date: '2026-02-15',
    tags: ['Docker', 'DevOps', 'QA', 'Infraestrutura'],
    category: 'DevOps',
    readingTime: 10,
    featured: true,
  },
  {
    id: '3',
    title: 'BDD com Cucumber: Testes que Comunicam',
    slug: 'bdd-cucumber-testes-comunicam',
    excerpt:
      'Descubra como BDD (Behavior Driven Development) melhora a comunicação entre QA, desenvolvedores e stakeholders usando Cucumber.',
    author: 'Wagner Karoleski',
    date: '2026-02-10',
    tags: ['BDD', 'Cucumber', 'Testes', 'Metodologia'],
    category: 'Metodologia',
    readingTime: 7,
  },
  {
    id: '4',
    title: 'CI/CD Pipeline: Automatizando Deploys com GitHub Actions',
    slug: 'cicd-pipeline-github-actions',
    excerpt:
      'Configure um pipeline CI/CD robusto usando GitHub Actions. Automatize testes, builds e deploys com confiança e velocidade.',
    author: 'Wagner Karoleski',
    date: '2026-02-05',
    tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Automação'],
    category: 'DevOps',
    readingTime: 12,
  },
  {
    id: '5',
    title: 'Carreira em QA: Roadmap 2026',
    slug: 'carreira-qa-roadmap-2026',
    excerpt:
      'Um roadmap completo para QA Engineers em 2026. Descubra as skills essenciais, tendências e oportunidades na área de qualidade.',
    author: 'Wagner Karoleski',
    date: '2026-01-30',
    tags: ['Carreira', 'QA', 'Desenvolvimento Profissional'],
    category: 'Carreira',
    readingTime: 9,
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState(false);

  // Calcular tags e categorias únicas
  const allTags = useMemo(() => getAllTags(BLOG_POSTS), []);
  const allCategories = useMemo(() => getAllCategories(BLOG_POSTS), []);

  // Filtrar e ordenar posts
  const filteredPosts = useMemo(() => {
    let posts = [...BLOG_POSTS];

    // Aplicar busca
    if (searchQuery) {
      posts = searchPosts(posts, searchQuery);
    }

    // Aplicar filtro de tag
    if (selectedTag) {
      posts = filterPostsByTag(posts, selectedTag);
    }

    // Aplicar filtro de categoria
    if (selectedCategory) {
      posts = filterPostsByCategory(posts, selectedCategory);
    }

    // Ordenar por data
    return sortPostsByDate(posts);
  }, [searchQuery, selectedTag, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedTag || selectedCategory;

  return (
    <section id="blog" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Blog</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
          <p className="text-muted-foreground mt-4">
            Artigos sobre automação de testes, DevOps, carreira e boas práticas em QA.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Filter Toggle */}
          <button
            onClick={() => setActiveFilters(!activeFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
          >
            <Filter size={18} />
            Filtros
          </button>

          {/* Filter Options */}
          {activeFilters && (
            <div className="space-y-4 p-4 rounded-lg border border-border bg-card/50">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Categorias</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? null : category
                        )
                      }
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-background border border-border hover:border-accent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => (setSelectedTag(selectedTag === tag ? null : tag))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedTag === tag
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-background border border-border hover:border-secondary'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Info */}
        {hasActiveFilters && (
          <p className="text-sm text-muted-foreground mb-6">
            {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''} encontrado
            {hasActiveFilters ? 's' : ''}
          </p>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onRead={(slug) => {
                  // Implementar navegação para artigo completo
                  console.log('Ler artigo:', slug);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Nenhum artigo encontrado.</p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:border-accent transition-colors"
            >
              <X size={16} />
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
