import { Mail, Linkedin, Github, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Faz a requisição real para o seu Formspree
      const response = await fetch('https://formspree.io/f/xwvnjzbb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData) // Envia os dados do seu state formatados
      });

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso! Responderei em breve.');
        setFormData({ name: '', email: '', message: '' }); // Limpa o formulário
      } else {
        toast.error('Ops! Ocorreu um erro ao enviar a mensagem. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmitting(false); // Libera o botão novamente, dando sucesso ou erro
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@wmk.dev.br',
      href: 'mailto:contato@wmk.dev.br',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/karoleski',
      href: 'https://linkedin.com/in/karoleski',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@wkaroleski',
      href: 'https://github.com/wkaroleski',
    },
  ];

  return (
    <section id="contato" className="py-20 md:py-32 relative bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Entre em Contato
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
          <p className="text-muted-foreground mt-4">
            Sempre aberto para novas oportunidades e conversas sobre qualidade de software.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          {/* Contact Form */}
          <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  placeholder="seu.email@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Sua mensagem aqui..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>

              {/* Aviso LGPD adicionado aqui */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                Ao enviar esta mensagem, você concorda que seus dados sejam utilizados exclusivamente para fins de contato profissional, em conformidade com a LGPD.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Links */}
            {contactLinks.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IconComponent size={24} className="text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{contact.label}</h3>
                    <p className="text-muted-foreground text-sm">{contact.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Additional Info */}
            <div className="p-6 rounded-lg border border-border bg-card/50">
              <h3 className="font-semibold text-foreground mb-3">Disponibilidade</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Respondo mensagens geralmente em até 24 horas.
                Estou aberto para discussões sobre projetos, consultoria e oportunidades de trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
