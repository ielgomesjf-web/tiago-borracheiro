import { useState, useRef, useEffect } from 'react';
import BottomNav from '../../components/shared/BottomNav';
import { aiResponses, defaultAiResponse } from '../../data/mockData';
import { Send, Bot, User } from 'lucide-react';

interface Message { id: number; text: string; isBot: boolean; }

const quickQuestions = [
  'Quanto custa trocar pneu?',
  'Qual a pressao ideal?',
  'Dicas de manutencao',
  'Formas de pagamento',
];

function getAiResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [pattern, response] of Object.entries(aiResponses)) {
    if (pattern.split('|').some(kw => lower.includes(kw))) return response;
  }
  return defaultAiResponse;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: 'Ola! Sou seu assistente IA. Posso te ajudar com duvidas sobre servicos, precos, dicas de manutencao de pneus, ou qualquer outra questao. Como posso te ajudar?', isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const showQuick = messages.length <= 1;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text: text.trim(), isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getAiResponse(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, isBot: true }]);
      setTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 bg-bg-surface border-b border-border">
        <h2 className="font-bold text-base text-text-primary">Assistente IA</h2>
        <p className="text-xs text-text-secondary">Tire duvidas sobre servicos e pneus</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {/* Quick questions */}
        {showQuick && (
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
            {quickQuestions.map((q) => (
              <button key={q} onClick={() => sendMessage(q)}
                className="px-3 py-2 bg-bg-surface-light border border-border rounded-full text-xs text-text-secondary hover:text-text-primary hover:border-primary transition-colors">
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 mb-4 animate-fade-in ${msg.isBot ? '' : 'flex-row-reverse'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.isBot ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
            }`}>
              {msg.isBot ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
              msg.isBot
                ? 'bg-bg-surface-light text-text-primary rounded-tl-sm'
                : 'bg-primary text-white rounded-tr-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-2 mb-4 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-bg-surface-light px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-text-muted animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-text-muted animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-text-muted animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-14 left-0 right-0 p-3 bg-bg-surface/90 backdrop-blur border-t border-border">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-bg-surface-light border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary transition-colors" />
          <button onClick={() => sendMessage(input)}
            className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>

      <BottomNav variant="provider" />
    </div>
  );
}
