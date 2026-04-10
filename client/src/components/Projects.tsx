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
      title: 'Portfólio com Roteamento Dinâmico de IA',
      description: 'Prova de conceito viva de Engenharia de Qualidade, DevOps e IA, construída com base em TypeScript e gerida via pnpm. A esteira de CI/CD no GitHub Actions conta com Quality Gates avançados, executando E2E Testing com Playwright (Headless) e interceção de rede (Mocking) antes de qualquer release. Como grande diferencial arquitetural, a aplicação integra um Agente de IA Serverless na borda da rede (Edge Computing) com roteamento multi-modelo dinâmico. O sistema permite alternar entre LLMs Premium (Grok 4.1 Fast, Qwen Plus) e Gratuitos para analisar código HTML e gerar scripts de automação. Para garantir a segurança e a sustentabilidade financeira (FinOps), foi desenvolvido um Rate Limiter duplo via Cloudflare KV, que gere quotas independentes por nível de acesso, previne abusos e aplica Graceful Degradation.',
      technologies: ['GitHub Actions', 'Playwright', 'E2E Testing', 'Cloudflare', 'CI/CD', 'TypeScript', 'pnpm'],
      links: {
        github: 'https://github.com/wkaroleski/wagner-portfolio', // Atualizei o link para o repositório principal
        demo: '#',
      },
      status: 'Em Produção',
    },
    {
      title: 'Observabilidade & FinOps (Zero-Trust)',
      description: 'Arquitetura de monitorização avançada construída para acompanhar a performance e os custos de API do portfólio. O sistema recolhe métricas de uso e consumo de tokens da IA de forma assíncrona (via Cloudflare Workers) e envia os dados, através de um Cloudflare Tunnel seguro (Zero-Trust), para uma instância VPS da Oracle Cloud. O backend de armazenamento assenta numa base de dados InfluxDB, isolada de acessos públicos através de uma rede mesh VPN privada (Tailscale), alimentando um dashboard dinâmico no Grafana. Esta solução permite monitorizar em tempo real a resiliência do sistema e otimizar os custos computacionais da infraestrutura.',
      technologies: ['Grafana', 'InfluxDB', 'Tailscale', 'Cloudflare Tunnels', 'Docker', 'Oracle Cloud VPS', 'FinOps'],
      links: {
        github: '#', // Como a infraestrutura é privada, não há um repositório público óbvio, a menos que tenhas os manifests Docker.
        demo: '#', // Apenas para ti.
      },
      status: 'Em Produção',
    }
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
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto items-start">
          {/* Image Column - Ajustado para ser mais flexível em diferentes ecrãs */}
          <div className="lg:w-1/3 rounded-xl overflow-hidden border border-border/50 shadow-2xl h-fit lg:sticky lg:top-24 hidden lg:block">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028681954/jbgjfHWhxhUsAcZnqy37sH/code-quality-metrics-NPRf2NY2t4xM5uJAELsjqn.webp"
              alt="Métricas de Qualidade"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Projects Grid - Adaptado para três cartões */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 overflow-hidden h-full flex flex-col ${index === 2 ? 'md:col-span-2' : ''}`} // O terceiro projeto ocupa duas colunas em ecrãs médios para destaque
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
            href="https://github.com/wkaroleski"
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