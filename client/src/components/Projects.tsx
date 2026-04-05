import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Cosmic YTM',
      description: 'Client nativo do YouTube Music para desktop Linux. Desenvolvido com foco em performance e baixo consumo de recursos, suportando streaming assíncrono de áudio e interface gráfica fluida.',
      technologies: ['Rust', 'Iced (GUI)', 'Tokio', 'Rodio', 'Reqwest'],
      links: {
        github: 'https://github.com/wkaroleski/cosmic-ytm',
        demo: '#',
      },
      status: 'Em Produção',
    },
    {
      title: 'Pipeline CI/CD & Automação E2E (Este Portfólio)',
      description: 'Prova de conceito viva de Engenharia de Qualidade, DevOps e IA. A esteira no GitHub Actions conta com Quality Gates avançados, executando testes End-to-End (E2E) com Playwright (Headless) e interceptação de rede (Mocking) antes de qualquer release, além de testes de verificação do TypeScript e do build. A pipeline é otimizada com estratégias de cache para dependências e navegadores, culminando em Continuous Deployment (CD) no Cloudflare Pages. Como diferencial, a aplicação integra um Agente de IA Serverless (Google Gemma 4) a rodar diretamente na borda da rede (Edge), capaz de analisar código HTML para gerar scripts de automação E2E e responder a dúvidas sobre o currículo de forma interativa e com latência zero.',
      technologies: ['GitHub Actions', 'Playwright', 'E2E Testing', 'Cloudflare', 'CI/CD', 'TypeScript', 'pnpm'],
      links: {
        github: 'https://github.com/wkaroleski/wagner-portfolio/actions',
        demo: '#',
      },
      status: 'Em Produção',
    },
  ];

  return (
    <section id="projetos" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Projetos
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
          <p className="text-muted-foreground mt-4">
            Alguns dos projetos que desenvolvi e estou desenvolvendo. Clique para ver mais detalhes.
          </p>
        </div>

        {/* Projects with Image */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl items-start">
          {/* Image Column */}
          <div className="md:col-span-1 rounded-xl overflow-hidden border border-border/50 shadow-2xl h-fit sticky top-24">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028681954/jbgjfHWhxhUsAcZnqy37sH/code-quality-metrics-NPRf2NY2t4xM5uJAELsjqn.webp"
              alt="Métricas de Qualidade"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Projects Grid */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-4 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground flex-1">{project.title}</h3>
                      <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium whitespace-nowrap">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-background/50 text-foreground text-xs font-medium border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <a
                      href={project.links.github}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium flex-1 justify-center"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                    <a
                      href={project.links.demo}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium flex-1 justify-center"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Mais projetos em breve...</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-300"
          >
            <Github size={20} />
            Ver GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
