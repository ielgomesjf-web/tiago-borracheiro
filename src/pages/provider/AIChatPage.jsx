import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import TopBar from '../../components/shared/TopBar';
import BottomNav from '../../components/shared/BottomNav';

const INITIAL_MESSAGE = {
  id: 0,
  role: 'assistant',
  text: 'Ola! Sou o assistente IA do Tiago Borracheiro. Posso te ajudar com duvidas sobre servicos, precos, dicas de manutencao de pneus, ou qualquer outra questao. Como posso te ajudar?',
};

const AI_RESPONSES = [
  {
    keywords: ['preco', 'preço', 'valor', 'custo', 'quanto'],
    response:
      'Os precos variam por tipo de veiculo:\n\n- **Moto**: Troca de pneu R$40, Vulcanizacao R$25\n- **Carro**: Troca com step R$60, Pneu novo R$80\n- **Van**: Troca R$100, Vulcanizacao R$60\n\nTodos os precos sao fixos e sem surpresas!',
  },
  {
    keywords: ['calibr', 'pressao', 'pressão'],
    response:
      'A calibragem ideal depende do veiculo:\n\n- **Carros**: Geralmente entre 28-35 PSI\n- **Motos**: 28-32 PSI (frente), 32-42 PSI (tras)\n- **Vans**: 35-55 PSI\n\nDica: Calibre sempre com o pneu frio, de preferencia pela manha!',
  },
  {
    keywords: ['troca', 'trocar', 'furou', 'furo', 'furado'],
    response:
      'Se seu pneu furou, nao se preocupe! Aqui vai o passo a passo:\n\n1. Estacione em local seguro\n2. Ligue o pisca-alerta\n3. Solicite um borracheiro pelo app\n4. Aguarde no local - chegamos em minutos!\n\nVoce pode solicitar pelo botao "Sou Cliente" na tela inicial.',
  },
  {
    keywords: ['vulcaniz'],
    response:
      'A vulcanizacao e um reparo que sela o furo no pneu usando calor e borracha. E ideal para furos pequenos (ate 6mm). Custa a partir de R$25 para motos e R$40 para carros. E mais barato que trocar o pneu inteiro!',
  },
  {
    keywords: ['horario', 'hora', 'funciona', 'aberto', 'disponivel'],
    response:
      'Nosso servico funciona 24 horas, 7 dias por semana! Estamos sempre disponiveis para te ajudar com qualquer emergencia na estrada. Basta solicitar pelo app.',
  },
  {
    keywords: ['pagamento', 'pagar', 'pix', 'cartao', 'cartão', 'dinheiro'],
    response:
      'Aceitamos 3 formas de pagamento:\n\n- **Pix** - Pagamento instantaneo\n- **Cartao** - Credito ou debito\n- **Dinheiro** - Pagamento em especie\n\nVoce escolhe na hora de confirmar o servico!',
  },
  {
    keywords: ['dica', 'manutencao', 'manutenção', 'cuidado', 'conserv'],
    response:
      'Dicas para seus pneus durarem mais:\n\n1. Calibre a cada 15 dias\n2. Faca rodizio a cada 10.000 km\n3. Verifique o desgaste regularmente\n4. Evite buracos e meios-fios\n5. Nao sobrecarregue o veiculo\n\nPneus bem cuidados duram ate 50% mais!',
  },
];

function getAIResponse(input) {
  const lower = input.toLowerCase();
  for (const entry of AI_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return 'Entendi sua pergunta! Para um atendimento mais completo, recomendo:\n\n- Verificar os servicos disponiveis na area "Sou Cliente"\n- Consultar os precos na selecao de servicos\n- Entrar em contato direto com um borracheiro pelo app\n\nPosso te ajudar com algo mais especifico sobre pneus, precos ou servicos?';
}

export default function AIChatPage() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: reply },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'Quanto custa trocar pneu?',
    'Qual a pressao ideal?',
    'Dicas de manutencao',
    'Formas de pagamento',
  ];

  return (
    <div className="min-h-screen bg-bg pb-20 flex flex-col">
      <TopBar title="Assistente IA" />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 pt-16 pb-36">
        {/* Header */}
        <div className="text-center py-6 animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-provider/15 flex items-center justify-center mx-auto mb-3">
            <Sparkles size={26} className="text-provider" />
          </div>
          <h2 className="text-text-primary font-bold text-lg">
            Assistente Inteligente
          </h2>
          <p className="text-text-secondary text-xs mt-1">
            Tire duvidas sobre servicos e pneus
          </p>
        </div>

        {/* Quick questions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6 animate-fade-in">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => {
                    const userMsg = { id: Date.now(), role: 'user', text: q };
                    setMessages((prev) => [...prev, userMsg]);
                    setIsTyping(true);
                    setTimeout(() => {
                      const reply = getAIResponse(q);
                      setMessages((prev) => [
                        ...prev,
                        { id: Date.now() + 1, role: 'assistant', text: reply },
                      ]);
                      setIsTyping(false);
                    }, 800 + Math.random() * 1200);
                  }, 50);
                  setInput('');
                }}
                className="px-3 py-2 rounded-full bg-surface border border-surface-lighter/30 text-text-secondary text-xs hover:border-provider/50 hover:text-provider transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant'
                    ? 'bg-provider/15'
                    : 'bg-primary/15'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <Bot size={16} className="text-provider" />
                ) : (
                  <User size={16} className="text-primary" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-surface border border-surface-lighter/20 text-text-primary'
                    : 'bg-provider text-white'
                }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1' : ''}>
                    {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                      part.startsWith('**') && part.endsWith('**') ? (
                        <strong key={j}>{part.slice(2, -2)}</strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-provider/15 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-provider" />
              </div>
              <div className="bg-surface border border-surface-lighter/20 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 size={16} className="text-provider animate-spin" />
                <span className="text-text-secondary text-sm">Digitando...</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input area - fixed above bottom nav */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-bg/90 backdrop-blur-xl border-t border-surface-lighter/20 p-3"
        style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-surface border border-surface-lighter/30 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-provider/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-provider to-purple-800 flex items-center justify-center text-white disabled:opacity-40 active:scale-95 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <BottomNav role="provider" />
    </div>
  );
}
