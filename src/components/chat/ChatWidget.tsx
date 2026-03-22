import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, Calendar, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/utils/tracking';
import ReactMarkdown from 'react-markdown';
import chatIcon3d from '@/assets/chat-icon-3d.png';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const QUICK_REPLIES = [
  { label: '📋 Services', message: 'What services do you offer?' },
  { label: '💰 Pricing', message: 'What are your prices?' },
  { label: '📞 Book a Call', message: 'I want to book a free strategy call' },
  { label: '🌐 Website', message: 'I need a website for my business' },
];

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      onError(data.error || 'Something went wrong. Please try again.');
      return;
    }

    if (!resp.body) {
      onError('No response received.');
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIdx: number;
      while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
        let line = buffer.slice(0, newlineIdx);
        buffer = buffer.slice(newlineIdx + 1);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') break;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // partial JSON, wait for more
        }
      }
    }
    onDone();
  } catch {
    onError('Connection failed. Please check your internet and try again.');
  }
}

const ChatWidget = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Msg = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowQuickReplies(false);

    let assistantSoFar = '';

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: upsertAssistant,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: err },
        ]);
        setIsLoading(false);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-24 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transition-all duration-300 group max-md:bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] max-md:right-24 animate-fade-up hover:scale-110"
          aria-label="Open chat"
        >
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-40" aria-hidden="true" />
          <img src={chatIcon3d} alt="Chat" className="w-14 h-14 object-contain relative z-10 drop-shadow-lg" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] rounded-2xl border border-primary/20 bg-background/98 backdrop-blur-xl shadow-2xl shadow-primary/10 flex flex-col overflow-hidden animate-fade-up max-md:bottom-[calc(4rem+env(safe-area-inset-bottom,0px))]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-primary/15 bg-card/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                <img src={chatIcon3d} alt="GROPPI" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">GROPPI Assistant</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="bg-card/60 border border-primary/10 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground/90 max-w-[85%]">
                  <p>
                    👋 {t('chat.welcome', 'Welkom bij GROPPI! Hoe kan ik je helpen? Vraag me alles over onze diensten, prijzen of boek een gratis gesprek.')}
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-2 px-1">
                  <a
                    href={socialLinks.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary hover:bg-primary/25 transition-colors border border-primary/20"
                  >
                    <Calendar className="w-3 h-3" /> Book a Call
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-accent/15 text-accent hover:bg-accent/25 transition-colors border border-accent/20"
                  >
                    <Phone className="w-3 h-3" /> WhatsApp
                  </a>
                  <a
                    href={`mailto:${socialLinks.email.replace('mailto:', '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors border border-primary/20"
                  >
                    <Mail className="w-3 h-3" /> Email
                  </a>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-card/60 border border-primary/10 text-foreground/90 rounded-tl-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_ul]:my-1 [&_li]:my-0 [&_a]:text-primary [&_a]:underline">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="bg-card/60 border border-primary/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuickReplies && messages.length === 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr.label}
                  onClick={() => sendMessage(qr.message)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground transition-colors border border-primary/10"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-3 py-2.5 border-t border-primary/15 bg-card/50 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder', 'Stel je vraag...')}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-8 w-8 rounded-full shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
