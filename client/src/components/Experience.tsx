import { Briefcase, ArrowRight } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'Analista de Sistemas de Automação & QA Tester',
      company: 'SKA Automação de Engenharias',
      period: '2024 - Presente',
      description: 'Desenvolvimento de testes funcionais e de regressão, análise de requisitos, automação de processos de QA.',
      achievements: [
        'Criação de framework de automação customizado',
        'Documentação técnica de processos QA',
        'Implementação de BDD em projetos',
      ],
      technologies: ['Selenium', 'BDD', 'TDD', 'SQL', 'Python'],
    },
    {
      role: 'Software Quality Assurance Engineer',
      company: 'Atlas Technologies',
      period: '2022 - 2023',
      description: 'Atuação em squads ágeis, desenvolvimento de testes automatizados para APIs financeiras, trabalho com ambientes Docker e CI/CD.',
      achievements: [
        'Implementação de testes de regressão automatizados',
        'Redução de bugs em produção em 40%',
        'Mentoria de novos QAs da equipe',
      ],
      technologies: ['Cypress', 'Docker', 'API Testing', 'CI/CD', 'Agile'],
    },
    {
      role: 'Sócio Proprietário',
      company: 'Multimak Usinagem LTDA',
      period: '2019 - 2022',
      description: 'Usinagem para peças especiais, manutenção preditiva e preventiva.',
      achievements: [
        'Manutenção preditiva e preventiva',
        'Usinagem para peças especiais',
      ],
      technologies: ['Usinagem mecânica', 'Manutenção preditiva', 'Manutenção preventiva', 'Usinagem para peças especiais'],
    },
    {
      role: 'Estagiário de administração e QA tester',
      company: 'Indeorum',
      period: '2018 - 2019',
      description: 'Admnistração de projetos, financeiro e QA tester.',
      achievements: [
        'Administração de projetos',
        'Administração financeira',
        'QA tester',
      ],
      technologies: ['Testes manuais', 'QA tester', 'Administração de projetos', 'Administração financeira'],
    },
  ];

  return (
    <section id="experiencia" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Experiência Profissional
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
        </div>

        {/* Timeline */}
        <div className="max-w-4xl space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-accent to-transparent" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-16 h-16 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center border-4 border-background">
                  <Briefcase size={24} className="text-background" />
                </div>
              </div>

              {/* Content Card */}
              <div className="ml-32 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-accent font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">{exp.period}</span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Principais conquistas:</h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight size={16} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
