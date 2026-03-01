import { BookOpen, ExternalLink } from 'lucide-react';

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header (Alinhado à esquerda como as outras seções) */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Blog</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
          <p className="text-muted-foreground mt-4">
            Artigos sobre automação de testes, DevOps, carreira e boas práticas em QA.
          </p>
        </div>

        {/* Em Breve State (Card alinhado à esquerda) */}
        <div className="max-w-3xl p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
          <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 text-accent">
            <BookOpen size={28} />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Conteúdo em construção
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl leading-relaxed">
            Em breve começarei a compartilhar artigos e tutoriais no Medium sobre a minha jornada e aprendizados na área de QA e DevOps. Fique de olho!
          </p>
          <a
            href="https://wagnerkaroleski.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-300 font-medium"
          >
            <ExternalLink size={20} />
            Acompanhar no Medium
          </a>
        </div>
      </div>
    </section>
  );
}