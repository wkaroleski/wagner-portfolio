# Wagner Karoleski - Portfólio Online

Portfólio moderno e profissional para Wagner Karoleski, QA Engineer e Analista de Sistemas especializado em automação de testes e infraestrutura DevOps.

## 🎯 Características

- **Design Dark Tech Moderno**: Paleta de cores ciano e roxo com fundo escuro profundo
- **Responsivo**: Totalmente otimizado para mobile, tablet e desktop
- **Performance**: Otimizado para Cloudflare Pages com assets CDN
- **Acessível**: Segue padrões WCAG e boas práticas de acessibilidade
- **SEO-Friendly**: Meta tags, estrutura semântica e performance otimizada
- **Sem Backend**: Totalmente estático, pronto para deploy em qualquer CDN

## 📋 Seções

- **Hero**: Apresentação principal com call-to-actions
- **Sobre**: Informações profissionais e destaques
- **Formação**: Educação acadêmica (DevOps, Administração)
- **Experiência**: Timeline com histórico profissional
- **Stack Tecnológico**: Tecnologias e competências
- **Projetos**: Galeria de projetos desenvolvidos
- **Contato**: Formulário e links de contato

## 🛠️ Stack Tecnológico

| Categoria | Tecnologias |
|-----------|------------|
| Frontend | React 19, TypeScript, Tailwind CSS 4 |
| Build | Vite 7 |
| UI Components | shadcn/ui, Radix UI |
| Ícones | Lucide React |
| Roteamento | Wouter |
| Animações | Framer Motion |
| Notificações | Sonner |

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USERNAME/wagner-portfolio.git
cd wagner-portfolio

# Instale as dependências
npm install
# ou
pnpm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### Build para Produção

```bash
# Build otimizado
npm run build
# ou
pnpm build

# Preview do build
npm run preview
# ou
pnpm preview
```

## 📦 Deploy

Este projeto está configurado para deploy no **Cloudflare Pages**. Para instruções detalhadas, consulte [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md).

### Deploy Rápido

1. Faça push do código para GitHub
2. Conecte o repositório ao Cloudflare Pages
3. Configure o domínio `wmk.dev.br`
4. Deploy automático em cada push!

## 🎨 Design

### Paleta de Cores

| Elemento | Cor | Valor |
|----------|-----|-------|
| Fundo | Dark Navy | `#0A0E27` |
| Foreground | Branco | `#FFFFFF` |
| Accent Primário | Ciano | `#00D9FF` |
| Accent Secundário | Roxo | `#9D4EDD` |
| Card Background | Dark Purple | `#12152A` |

### Tipografia

- **Display**: Space Mono (bold, 3.5rem)
- **Heading**: Space Mono (semibold, 2rem)
- **Body**: Inter (regular, 1rem)
- **Mono**: Fira Code (regular, 0.875rem)

## 📱 Responsividade

O portfólio é totalmente responsivo com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Acessibilidade

- Contraste de cores WCAG AA compliant
- Navegação por teclado funcional
- ARIA labels apropriadas
- Estrutura semântica HTML

## 📊 Performance

- **Lighthouse Score**: 95+
- **Core Web Vitals**: Otimizados
- **Assets**: Comprimidos e servidos via CDN
- **Build Size**: ~150KB gzipped

## 🔧 Customização

### Atualizar Informações Pessoais

Edite os dados nos componentes:

- `client/src/components/Hero.tsx` - Apresentação
- `client/src/components/About.tsx` - Sobre
- `client/src/components/Education.tsx` - Formação
- `client/src/components/Experience.tsx` - Experiência
- `client/src/components/Stack.tsx` - Tecnologias
- `client/src/components/Projects.tsx` - Projetos
- `client/src/components/Contact.tsx` - Contato

### Adicionar Novos Projetos

Edite o array `projects` em `client/src/components/Projects.tsx`:

```typescript
const projects = [
  {
    title: 'Seu Projeto',
    description: 'Descrição do projeto',
    technologies: ['Tech1', 'Tech2'],
    links: {
      github: 'https://github.com/...',
      demo: 'https://...',
    },
    status: 'Concluído',
  },
  // ... mais projetos
];
```

### Mudar Cores

Edite as variáveis CSS em `client/src/index.css`:

```css
:root {
  --primary: oklch(0.65 0.22 262.3);
  --accent: oklch(0.7 0.25 200);
  /* ... mais cores */
}
```

## 📚 Estrutura do Projeto

```
wagner-portfolio/
├── client/
│   ├── public/              # Arquivos estáticos (favicon, etc)
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── contexts/        # Contextos React
│   │   ├── lib/             # Utilitários
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   └── index.html           # HTML template
├── server/                  # Placeholder (não usado)
├── shared/                  # Placeholder (não usado)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── DEPLOY_GUIDE.md          # Guia de deploy
└── README.md                # Este arquivo
```

## 🤝 Contribuições

Este é um projeto pessoal, mas sinta-se livre para usar como referência ou template para seu próprio portfólio.

## 📄 Licença

MIT License - veja LICENSE para detalhes

## 📞 Contato

- **Email**: wagner@example.com
- **LinkedIn**: [/in/wagnerkaroleski](https://linkedin.com/in/wagnerkaroleski)
- **GitHub**: [@wagnerkaroleski](https://github.com/wagnerkaroleski)

## 🙏 Agradecimentos

- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting
- [Vite](https://vitejs.dev/) - Build tool

---

**Última atualização**: Fevereiro 2026  
**Versão**: 1.0.0  
**Status**: ✅ Pronto para Deploy
