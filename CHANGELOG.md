# Changelog - Portfólio Wagner Karoleski

## [2.0.0] - 2026-02-27

### ✨ Adicionado

#### Sistema de Tema Claro/Escuro
- Toggle de tema no header (ícones Sun/Moon)
- Paleta de cores otimizada para modo claro
- Modo escuro mantém a estética dark tech original
- Tema persiste no localStorage
- Suporte a preferência do sistema operacional

#### Seção de Blog Completa
- **Listagem de Artigos**: Grid responsivo com cards de preview
- **Busca em Tempo Real**: Busca por título, excerpt e tags
- **Filtros Avançados**: Por categoria e tags
- **Metadados de Artigo**: 
  - Tempo estimado de leitura (calculado automaticamente)
  - Data de publicação e atualização
  - Autor
  - Categorias e tags
  - Badge de "Destaque"
- **Visualização Completa**: Componente BlogPost com renderização de Markdown
- **Compartilhamento**: Botão de compartilhar com fallback para clipboard
- **5 Artigos de Exemplo**: Prontos para customização

#### Utilitários de Blog
- `blog.types.ts`: Tipos TypeScript para posts
- `blog.utils.ts`: Funções auxiliares:
  - `calculateReadingTime()`: Calcula tempo de leitura
  - `parseFrontmatter()`: Parser de metadados
  - `generateSlug()`: Gerador de URLs amigáveis
  - `formatDate()`: Formatação de datas
  - `searchPosts()`: Busca em posts
  - `filterPostsByTag()`: Filtro por tag
  - `filterPostsByCategory()`: Filtro por categoria
  - `getAllTags()`: Lista todas as tags
  - `getAllCategories()`: Lista todas as categorias

#### Componentes Novos
- `Blog.tsx`: Seção principal com listagem, busca e filtros
- `BlogCard.tsx`: Card individual de artigo
- `BlogPost.tsx`: Visualização completa do artigo

#### Documentação
- `BLOG_GUIDE.md`: Guia completo para adicionar artigos
- `CHANGELOG.md`: Este arquivo

### 🎨 Melhorias de Design

- Paleta de cores expandida com suporte a modo claro
- Transições suaves entre temas
- Melhor contraste em modo claro
- Cores accent (ciano/roxo) otimizadas para ambos os temas
- Navegação atualizada com link para blog

### 🔧 Técnico

- Tema switchable habilitado em `App.tsx`
- Cores CSS variables para `:root` (light mode)
- Cores CSS variables para `.dark` (dark mode)
- Tipagem completa com TypeScript
- Sem dependências externas para blog (apenas Streamdown para Markdown)

### 📱 Responsividade

- Blog totalmente responsivo
- Cards adaptáveis para mobile/tablet/desktop
- Filtros colapsáveis em mobile
- Busca otimizada para toque

### ♿ Acessibilidade

- Semântica HTML correta em todos os componentes
- ARIA labels em botões de interação
- Contraste WCAG AA em ambos os temas
- Navegação por teclado funcional

## [1.0.0] - 2026-02-27

### ✨ Adicionado (Versão Inicial)

- Portfólio estático com design dark tech
- Seções: Hero, Sobre, Formação, Experiência, Stack, Projetos, Contato
- Header com navegação fixa
- Footer com links sociais
- Assets visuais gerados (hero background, automação, DevOps, métricas)
- Totalmente responsivo
- Otimizado para Cloudflare Pages
- Deploy guide completo
- TypeScript com zero erros

---

## Como Usar

### Adicionar Novo Artigo
Veja `BLOG_GUIDE.md` para instruções detalhadas.

### Mudar Tema
Clique no ícone Sun/Moon no header para alternar entre temas claro e escuro.

### Customizar Cores
Edite as variáveis CSS em `client/src/index.css`:
- `:root` para modo claro
- `.dark` para modo escuro

---

## Roadmap Futuro

- [ ] Suporte a Markdown files (`.md`) com import automático
- [ ] Comentários nos artigos
- [ ] Newsletter/Subscribe
- [ ] Recomendações de artigos relacionados
- [ ] Analytics de leitura
- [ ] Syntax highlighting para código
- [ ] Modo de edição de artigos no CMS
- [ ] Integração com Ghost ou Strapi

---

**Última atualização**: Fevereiro 2026  
**Versão Atual**: 2.0.0  
**Status**: ✅ Pronto para Deploy
