'use client';

import { useState } from 'react';
import { PageSection } from '@/components/portal/PageSection';

const STARTERS = [
  'How do I request an appointment?',
  'Who is my assigned mentor?',
  'How can I track my progress?',
];

export function ChatbotClient() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I\'m the Mento AI assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: `Thanks for asking about "${text}". This is a demo response — connect a real AI backend later.` },
      ]);
      setTyping(false);
    }, 600);
  }

  return (
    <PageSection title="AI Chatbot" description="Get instant help with mentorship questions">
      <div className="mento-card flex h-[480px] flex-col overflow-hidden">
        <div className="flex-1 space-y-3 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] animate-[portal-main-in_0.3s_ease_both] rounded-2xl px-4 py-3 font-urbanist text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'ml-auto rounded-br-md bg-mento-navy text-white shadow-md'
                  : 'rounded-bl-md bg-mento-accent-light text-mento-text'
              }`}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-mento-accent-light px-4 py-3 font-urbanist text-sm text-mento-muted">
              Typing…
            </div>
          )}
        </div>
        <div className="border-t border-mento-border/60 bg-mento-accent-light/30 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {STARTERS.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-mento-border/60 bg-white px-3 py-1.5 font-urbanist text-xs font-medium text-mento-navy transition hover:border-mento-navy hover:shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={e => { e.preventDefault(); send(input); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message…"
              className="mento-input flex-1"
            />
            <button type="submit" className="mento-btn-primary shrink-0">
              Send
            </button>
          </form>
        </div>
      </div>
    </PageSection>
  );
}
