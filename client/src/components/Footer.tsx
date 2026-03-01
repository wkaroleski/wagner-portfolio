import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center">
                <span className="text-background font-bold text-lg">WK</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Wagner Karoleski</h3>
                <p className="text-xs text-muted-foreground">QA Engineer & DevOps</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Especialista em automação de testes e infraestrutura DevOps,
              comprometido com excelência em qualidade de software.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { label: 'Sobre', href: '#sobre' },
                { label: 'Experiência', href: '#experiencia' },
                { label: 'Stack', href: '#stack' },
                { label: 'Projetos', href: '#projetos' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/wkaroleski"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all"
                title="GitHub"
              >
                <Github size={20} className="text-muted-foreground hover:text-accent" />
              </a>
              <a
                href="https://linkedin.com/in/wagner-karoleski"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all"
                title="LinkedIn"
              >
                <Linkedin size={20} className="text-muted-foreground hover:text-accent" />
              </a>
              <a
                href="mailto:contato@wmk.dev.br"
                className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all"
                title="Email"
              >
                <Mail size={20} className="text-muted-foreground hover:text-accent" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Wagner Karoleski. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Feito com
            <Heart size={16} className="text-accent fill-accent" />
            usando React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
