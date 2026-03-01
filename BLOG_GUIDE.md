# Guia de Blog - Portfólio Wagner Karoleski

Este guia explica como adicionar novos artigos ao blog do seu portfólio.

## Estrutura do Blog

O blog é totalmente estático e baseado em dados JavaScript. Os artigos são armazenados como objetos no arquivo `client/src/components/Blog.tsx`.

## Como Adicionar um Novo Artigo

### Passo 1: Preparar os Dados do Artigo

Abra o arquivo `client/src/components/Blog.tsx` e localize o array `BLOG_POSTS`:

```typescript
const BLOG_POSTS: BlogMetadata[] = [
  {
    id: '1',
    title: 'Seu Título',
    slug: 'seu-titulo',
    excerpt: 'Resumo do artigo...',
    author: 'Wagner Karoleski',
    date: '2026-02-27',
    tags: ['Tag1', 'Tag2'],
    category: 'Tecnologia',
    readingTime: 8,
    featured: false,
  },
  // ... mais artigos
];
```

### Passo 2: Preencher os Campos

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `id` | ID único do artigo | `'6'` |
| `title` | Título do artigo | `'Meu Novo Artigo'` |
| `slug` | URL-friendly identifier | `'meu-novo-artigo'` |
| `excerpt` | Resumo (máx 150 caracteres) | `'Um resumo interessante...'` |
| `author` | Autor do artigo | `'Wagner Karoleski'` |
| `date` | Data de publicação (ISO) | `'2026-02-27'` |
| `tags` | Array de tags | `['Cypress', 'Testes']` |
| `category` | Categoria do artigo | `'Tecnologia'` |
| `readingTime` | Tempo de leitura em minutos | `8` |
| `featured` | Destaque na listagem? | `true` ou `false` |
| `image` | (Opcional) URL da imagem | `'https://...'` |
| `updatedDate` | (Opcional) Data de atualização | `'2026-02-28'` |

### Passo 3: Adicionar o Artigo

Adicione um novo objeto ao final do array `BLOG_POSTS`:

```typescript
const BLOG_POSTS: BlogMetadata[] = [
  // ... artigos existentes
  {
    id: '6',
    title: 'Meu Novo Artigo sobre QA',
    slug: 'novo-artigo-qa',
    excerpt: 'Neste artigo, exploraremos as melhores práticas de QA em 2026...',
    author: 'Wagner Karoleski',
    date: '2026-02-27',
    tags: ['QA', 'Boas Práticas', 'Testes'],
    category: 'Tecnologia',
    readingTime: 10,
    featured: true,
  },
];
```

## Funcionalidades do Blog

### Busca

Os usuários podem buscar artigos por:
- Título do artigo
- Conteúdo do excerpt
- Tags

### Filtros

Disponíveis dois tipos de filtro:
- **Por Categoria**: Tecnologia, DevOps, Metodologia, Carreira
- **Por Tags**: Qualquer tag adicionada aos artigos

### Informações do Artigo

Cada artigo exibe:
- ✅ Título e excerpt
- ✅ Autor e data de publicação
- ✅ Tempo estimado de leitura (calculado automaticamente)
- ✅ Categoria e tags
- ✅ Badge de "Destaque" (se featured: true)
- ✅ Botão "Ler artigo"

## Boas Práticas

### Títulos
- Seja claro e descritivo
- Use entre 50-70 caracteres
- Inclua palavra-chave principal

**Exemplos:**
- ✅ "Automação de Testes com Cypress: Guia Completo"
- ❌ "Cypress"

### Excerpts
- Resuma o artigo em 1-2 frases
- Máximo 150 caracteres
- Inclua o valor principal do artigo

**Exemplo:**
```
"Aprenda como configurar e usar Cypress para automação de testes 
end-to-end. Neste guia completo, cobrimos desde a instalação até 
padrões avançados."
```

### Tags
- Use 3-5 tags por artigo
- Seja consistente (use as mesmas tags em artigos relacionados)
- Use PascalCase: `Docker`, `GitHub Actions`, `API Testing`

**Tags Recomendadas:**
- Tecnologia: `Cypress`, `Docker`, `Selenium`, `JavaScript`, `Python`, `SQL`, `API Testing`
- DevOps: `Docker`, `Kubernetes`, `CI/CD`, `GitHub Actions`, `Jenkins`, `AWS`
- Metodologia: `BDD`, `TDD`, `Agile`, `Scrum`, `Kanban`
- Carreira: `Desenvolvimento Profissional`, `Entrevistas`, `Networking`

### Categorias
Use uma das categorias existentes:
- `Tecnologia` - Artigos técnicos sobre ferramentas e frameworks
- `DevOps` - Infraestrutura, CI/CD, containerização
- `Metodologia` - Processos, práticas e abordagens
- `Carreira` - Desenvolvimento profissional e oportunidades

### Data
- Use formato ISO: `YYYY-MM-DD`
- Sempre use a data de publicação

### Tempo de Leitura
- Calcule baseado em ~200 palavras por minuto
- Arredonde para o número inteiro mais próximo
- Mínimo: 1 minuto

## Exemplo Completo

```typescript
{
  id: '6',
  title: 'Testes de Performance com Lighthouse: Otimizando Web Apps',
  slug: 'testes-performance-lighthouse',
  excerpt: 'Descubra como usar Lighthouse para medir e otimizar a performance de suas aplicações web. Aprenda a identificar gargalos e implementar melhorias.',
  author: 'Wagner Karoleski',
  date: '2026-02-27',
  updatedDate: '2026-02-28',
  tags: ['Performance', 'Lighthouse', 'Web Performance', 'Testes'],
  category: 'Tecnologia',
  readingTime: 9,
  featured: true,
  image: 'https://example.com/lighthouse.jpg',
}
```

## Próximos Passos

Após adicionar um artigo:

1. **Teste localmente**: Execute `npm run dev` e verifique se o artigo aparece
2. **Verifique os filtros**: Teste busca, tags e categorias
3. **Faça commit**: `git commit -m "Add blog post: Seu Título"`
4. **Deploy**: Push para GitHub (deploy automático no Cloudflare Pages)

## Futuras Melhorias

Possibilidades para evoluir o blog:

- [ ] Suporte a Markdown files (`.md`) com parser automático
- [ ] Comentários nos artigos (Disqus ou similar)
- [ ] Newsletter/Subscribe
- [ ] Recomendações de artigos relacionados
- [ ] Analytics de leitura
- [ ] Modo dark/light para código (syntax highlighting)
- [ ] Estimativa de tempo de leitura mais precisa

---

**Última atualização**: Fevereiro 2026  
**Versão**: 1.0
