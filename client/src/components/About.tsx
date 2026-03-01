import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const highlights = [
    'Automação de testes com Cypress e Selenium',
    'Infraestrutura DevOps com Docker e Kubernetes',
    'Testes de APIs e integração contínua',
    'Metodologias BDD e TDD',
    'Análise de sistemas e requisitos',
    'Ambientes ágeis e metodologia Scrum',
  ];

  return (
    <section id="sobre" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Sobre Mim
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Right Column - Image */}
          <div className="order-2 md:order-2 rounded-xl overflow-hidden border border-border/50 shadow-2xl">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028681954/jbgjfHWhxhUsAcZnqy37sH/automation-illustration-SrfE8F8q9q3nXQVkdcWdwy.webp"
              alt="Automação de Testes com Cypress"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Left Column - Text */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sou um profissional apaixonado por qualidade de software e automação.
              Com mais de 5 anos de experiência, tenho trabalhado em projetos desafiadores
              que exigem rigor técnico e atenção aos detalhes.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Atualmente, estou cursando Tecnologia em DevOps pela UNOPAR e possuo
              formação profissional em Engenharia de Qualidade e QA Tester pela EBAC.
              Também possuo formação técnica em Administração pelo SENAC - RS.
              Minha trajetória profissional inclui experiências em automação de testes
              e análise de sistemas em empresas de tecnologia de ponta.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Sou um defensor de práticas ágeis, testes automatizados e infraestrutura
              como código. Acredito que a qualidade não é um departamento, mas uma
              responsabilidade compartilhada por toda a equipe.
            </p>
          </div>

          {/* Right Column - Highlights */}
          <div className="space-y-4 order-3 md:order-3">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 group"
              >
                <CheckCircle2 size={24} className="text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-foreground font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
