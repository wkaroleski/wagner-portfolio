import { Code2, Database, Cloud, Zap } from 'lucide-react';

export default function Stack() {
  const stacks = [
    {
      category: 'Testing & QA',
      icon: Code2,
      technologies: ['Cypress', 'Selenium', 'BDD/Gherkin', 'TDD', 'Jest', 'API Testing'],
    },
    {
      category: 'Backend & Database',
      icon: Database,
      technologies: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Node.js', 'Python'],
    },
    {
      category: 'DevOps & Infrastructure',
      icon: Cloud,
      technologies: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Jenkins', 'AWS'],
    },
    {
      category: 'Tools & Methodologies',
      icon: Zap,
      technologies: ['Git', 'Agile/Scrum', 'Jira', 'Linux', 'Postman', 'Figma'],
    },
  ];

  return (
    <section id="stack" className="py-20 md:py-32 relative bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Stack Tecnológico
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
        </div>

        {/* Stack with Image */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl items-start">
          {/* Image Column */}
          <div className="md:col-span-1 rounded-xl overflow-hidden border border-border/50 shadow-2xl h-fit sticky top-24">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028681954/jbgjfHWhxhUsAcZnqy37sH/devops-infrastructure-UbyE2yaCfxzZS4sJcvWQBi.webp"
              alt="Infraestrutura DevOps"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Stack Grid */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
            {stacks.map((stack, index) => {
              const IconComponent = stack.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent size={24} className="text-background" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-4">{stack.category}</h3>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-background/50 text-foreground text-xs font-medium border border-border/50 hover:border-accent/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm max-w-5xl">
          <h3 className="text-xl font-bold text-foreground mb-4">Certificações & Aprendizado Contínuo</h3>
          <p className="text-muted-foreground leading-relaxed">
            Comprometido com o aprendizado contínuo e atualização tecnológica. 
            Participante ativo em comunidades de QA e DevOps, leitor de artigos técnicos 
            e explorador de novas ferramentas e metodologias que impulsionam a excelência 
            em qualidade de software.
          </p>
        </div>
      </div>
    </section>
  );
}
