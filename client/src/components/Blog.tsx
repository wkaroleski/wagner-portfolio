import { BookOpen } from 'lucide-react';

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl text-center mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Blog</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto" />
          <p className="text-muted-foreground mt-4">
            Artigos sobre automação de testes, DevOps, carreira e boas práticas em QA.
          </p>
        </div>

        {/* Em Breve State */}
        <div className="max-w-2xl mx-auto text-center py-12 px-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
            <BookOpen size={32} />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Conteúdo em construção
          </h3>
          <p className="text-muted-foreground text-lg mb-6">
            Em breve começarei a compartilhar artigos e tutoriais no Medium sobre a minha jornada e aprendizados na área de QA e DevOps. Fique de olho!
          </p>
          <a
            href="https://medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary/10 text-secondary font-semibold hover:bg-secondary/20 transition-colors"
          >
            Acompanhar no Medium
          </a>
        </div>
      </div>
    </section>
  );
}