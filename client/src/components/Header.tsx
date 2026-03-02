import { useLocation } from 'wouter';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Formação', href: '#formacao' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Stack', href: '#stack' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Branding */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center">
            <span className="text-foreground font-bold text-lg">WK</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">Wagner Karoleski</h1>
            <p className="text-xs text-muted-foreground">QA Engineer & DevOps</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Theme Toggle & CTA Button */}
        <div className="hidden sm:flex gap-2 items-center">
          <button
            data-testid="theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-card border border-border transition-colors"
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contato');
            }}
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-sm"
          >
            Entrar em contato
          </a>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            data-testid="theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-card border border-border transition-colors"
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-background/50 rounded-lg transition-colors duration-200 text-left"
              >
                {item.label}
              </button>
            ))}
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contato');
              }}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium text-sm text-center"
            >
              Entrar em contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
