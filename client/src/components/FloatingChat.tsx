import { useState } from 'react';
import { X, Send, Bot, Sparkles, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// ------------------------------------------------------------------
// COMPONENTE: Caixinha de Código Inteligente com Botão de Copiar
// ------------------------------------------------------------------
const CodeBlock = ({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        // Copia o código ignorando a última quebra de linha
        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
        setCopied(true);
        // Volta o ícone ao normal após 2 segundos
        setTimeout(() => setCopied(false), 2000);
    };

    // Se for um bloco de código grande (ex: ```typescript)
    if (!inline && match) {
        return (
            <div className="my-3 rounded-lg overflow-hidden border border-border bg-[#0d1117]">
                <div className="flex items-center justify-between px-3 py-1.5 bg-card/80 border-b border-border">
                    <span className="text-xs text-muted-foreground font-mono lowercase">{match[1]}</span>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 p-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        title="Copiar código"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        {copied ? 'Copiado' : 'Copiar'}
                    </button>
                </div>
                <div className="p-3 overflow-x-auto text-sm font-mono text-gray-300">
                    <code {...props}>{children}</code>
                </div>
            </div>
        );
    }

    // Se for código de uma linha só no meio do texto (ex: `npm install`)
    return (
        <code className="bg-accent/20 text-accent px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
        </code>
    );
};

// ------------------------------------------------------------------
// COMPONENTE PRINCIPAL: Floating Chat
// ------------------------------------------------------------------
export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Olá! Sou o assistente virtual de QA do Wagner. 🤖\n\nEstou aqui para te ajudar a explorar este portfólio. Você pode:\n1️⃣ Perguntar sobre a experiência do Wagner.\n2️⃣ Colar um trecho de HTML para eu gerar um script de teste E2E em Playwright.\n\nComo posso ajudar?'
        }
    ]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage }),
            });

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Ops! Ocorreu um erro na rede. Tente novamente.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Balão Teaser Animado */}
            {!isOpen && (
                <div
                    className="fixed bottom-8 right-24 bg-accent text-accent-foreground px-4 py-2 rounded-xl shadow-lg font-medium text-sm animate-bounce flex items-center gap-2 z-50 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    <Sparkles size={16} />
                    <span>Teste a minha IA!</span>
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[8px] border-l-accent"></div>
                </div>
            )}

            {/* Botão Flutuante */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full bg-accent text-accent-foreground shadow-lg hover:scale-110 transition-transform duration-300 z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <Sparkles size={24} />
            </button>

            {/* Janela do Chat */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
                    <div className="bg-accent/10 p-4 flex justify-between items-center border-b border-border">
                        <div className="flex items-center gap-2">
                            <Bot className="text-accent" size={20} />
                            <h3 className="font-bold text-foreground">Wag-Bot (QA Sênior)</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user'
                                        ? 'bg-accent text-accent-foreground rounded-tr-none whitespace-pre-wrap'
                                        : 'bg-background border border-border text-foreground rounded-tl-none'
                                    }`}>
                                    {/* Se for a IA respondendo, passamos pelo ReactMarkdown */}
                                    {msg.role === 'assistant' ? (
                                        <ReactMarkdown
                                            components={{ code: CodeBlock }}
                                            className="space-y-2 leading-relaxed"
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-background border border-border text-foreground p-3 rounded-xl rounded-tl-none text-sm animate-pulse">
                                    Analisando requisitos...
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={sendMessage} className="p-3 bg-background border-t border-border flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Digite a sua pergunta ou cole o HTML..."
                            className="flex-1 bg-card text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}