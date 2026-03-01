import { GraduationCap, Calendar } from 'lucide-react';

export default function Education() {
  const education = [
    {
      degree: 'Tecnologia em DevOps',
      institution: 'UNOPAR',
      period: 'Em andamento',
      description: 'Formação especializada em infraestrutura, containerização e práticas DevOps modernas.',
      icon: '🚀',
    },
    {
      degree: 'Técnico em Administração',
      institution: 'SENAC - RS',
      period: 'Concluído',
      description: 'Formação técnica em gestão administrativa e processos empresariais.',
      icon: '📊',
    },
  ];

  return (
    <section id="formacao" className="py-20 md:py-32 relative bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Formação
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              {/* Icon */}
              <div className="text-4xl mb-4">{edu.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">{edu.degree}</h3>
              <p className="text-accent font-semibold mb-3">{edu.institution}</p>

              {/* Period */}
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar size={16} />
                <span className="text-sm">{edu.period}</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
