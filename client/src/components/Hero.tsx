import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663028681954/jbgjfHWhxhUsAcZnqy37sH/hero-background-KJrNU3x4JfVRXUfv5iJpEJ.webp)',
        }}
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-background/40 -z-10" />



      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Wagner</span>
            <span className="block bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              Karoleski
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            QA Engineer & Analista de Sistemas
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Especialista em automação de testes, infraestrutura DevOps e qualidade de software.
            Com experiência em Cypress, Docker, SQL e metodologias ágeis (BDD/TDD).
            Apaixonado por criar soluções robustas e escaláveis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#projetos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 group"
            >
              Ver Projetos
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground font-semibold hover:bg-card transition-colors duration-300"
            >
              Entrar em Contato
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/wkaroleski"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
              title="GitHub"
            >
              <Github size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/karoleski"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
              title="LinkedIn"
            >
              <Linkedin size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="mailto:contato@wmk.dev.br"
              className="p-3 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
              title="Email"
            >
              <Mail size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
