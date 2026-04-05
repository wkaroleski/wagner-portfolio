import { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // O estado inicial já contém a mensagem de boas-vindas (Onboarding)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Olá! Sou o assistente virtual de QA do Wagner. 🤖\n\nEstou aqui para te ajudar a explorar este portfólio. Você pode:\n1️⃣ Perguntar sobre a experiência e as ferramentas que o Wagner domina.\n2️⃣ Colar um trecho de HTML para eu gerar um script de teste E2E em Playwright.\n\nComo posso ajudar?'
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

            // O Gemma retorna a resposta dentro do array "choices[0].message.content"
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
            {/* Botão Flutuante */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full bg-accent text-accent-foreground shadow-lg hover:scale-110 transition-transform duration-300 z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare size={24} />
            </button>

            {/* Janela do Chat */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
                    {/* Cabeçalho */}
                    <div className="bg-accent/10 p-4 flex justify-between items-center border-b border-border">
                        <div className="flex items-center gap-2">
                            <Bot className="text-accent" size={20} />
                            <h3 className="font-bold text-foreground">Wag-Bot (QA Sênior)</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Área de Mensagens */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-accent text-accent-foreground rounded-tr-none'
                                        : 'bg-background border border-border text-foreground rounded-tl-none'
                                    }`}>
                                    {msg.content}
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

                    {/* Input de Texto */}
                    <form onSubmit={sendMessage} className="p-3 bg-background border-t border-border flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Digite sua pergunta ou cole o HTML..."
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