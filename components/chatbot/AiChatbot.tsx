'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/icons';

type Message =
  | { id: string; role: 'assistant'; kind: 'text'; text: string; time: string }
  | {
      id: string;
      role: 'assistant';
      kind: 'analysis';
      text: string;
      time: string;
    }
  | { id: string; role: 'user'; text: string; time: string };

const SUGGESTIONS = [
  { label: 'Generate Attendance Report', icon: 'file-text' as const },
  { label: 'Analyze Grade Trends', icon: 'bar-chart' as const },
  { label: 'Summarize Student Feedback', icon: 'message-circle' as const },
];

const INITIAL: Message[] = [
  {
    id: '1',
    role: 'assistant',
    kind: 'text',
    time: '9:41 AM',
    text: "Good morning, Professor Jenkins! I've been monitoring the Grade 11 Calculus results from yesterday's midterm. Would you like me to generate a summary report or analyze specific student performance trends?",
  },
  {
    id: '2',
    role: 'user',
    time: '9:42 AM',
    text: 'Yes, please. Summarize the grade trends and highlight any students who scored below 65%.',
  },
  {
    id: '3',
    role: 'assistant',
    kind: 'analysis',
    time: '9:42 AM',
    text: "I've compiled the Midterm Grade Analysis for Grade 11 Calculus. Overall, the class average is 78%, showing a 4% increase from the last quiz. However, three students may require immediate intervention.",
  },
];

function BotAvatar() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mento-navy text-white">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h.01M15 9h.01M9 15h6"
        />
      </svg>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#dbe4f5] text-mento-navy">
      <Icon name="user-circle" className="size-5" />
    </div>
  );
}

function GradeAnalysisCard() {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
        <h4 className="font-urbanist text-sm font-bold text-mento-navy">Grade Distribution Analysis</h4>
        <button type="button" className="text-xs font-semibold text-[#2f6fed] hover:underline">
          Export PDF
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="rounded-lg border border-gray-100 bg-[#f8f9fb] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Class Average</p>
          <p className="mt-1 font-urbanist text-2xl font-bold text-mento-navy">78%</p>
          <p className="mt-1 text-xs font-semibold text-emerald-600">↑ +4.2%</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-[#f8f9fb] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Pass Rate</p>
          <p className="mt-1 font-urbanist text-2xl font-bold text-mento-navy">91%</p>
          <p className="mt-1 text-xs text-gray-400">No change</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-[#f8f9fb] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">At Risk</p>
          <p className="mt-1 font-urbanist text-2xl font-bold text-red-500">3</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-red-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3" aria-hidden>
              <path d="M12 2L1 21h22L12 2zm0 5l7.5 12h-15L12 7zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z" />
            </svg>
            High Priority
          </p>
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 py-3">
        <p className="text-xs font-bold text-mento-navy">At-Risk Students (&lt;65%)</p>
        <ul className="mt-2 space-y-2">
          {[
            { initials: 'AL', name: 'Alex Lomax', score: '58%' },
            { initials: 'JS', name: 'Jamie Smith', score: '62%' },
          ].map(s => (
            <li key={s.name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#e8ecf4] text-[10px] font-bold text-mento-navy">
                  {s.initials}
                </span>
                <span className="text-sm text-gray-700">{s.name}</span>
              </div>
              <span className="text-sm font-semibold text-red-500">{s.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MessageRow({ children, align, time }: { children: ReactNode; align: 'left' | 'right'; time: string }) {
  return (
    <div className={`flex gap-2.5 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      {align === 'left' ? <BotAvatar /> : <UserAvatar />}
      <div className={`max-w-[min(100%,540px)] ${align === 'right' ? 'items-end' : 'items-start'} flex flex-col`}>
        {children}
        <span className={`mt-1.5 text-[11px] text-gray-400 ${align === 'right' ? 'self-end' : ''}`}>
          {time}
        </span>
      </div>
    </div>
  );
}

export function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function nowLabel() {
    return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages(prev => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: trimmed, time: nowLabel() },
    ]);
    setInput('');
    setTyping(true);

    window.setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          kind: 'text',
          time: nowLabel(),
          text: `I've noted your request about "${trimmed}". I can pull attendance, grade trends, or feedback summaries next — pick a suggestion below or ask another question.`,
        },
      ]);
      setTyping(false);
    }, 700);
  }

  return (
    <section className="flex h-[calc(100vh-var(--header-height)-3rem)] min-h-[560px] flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mento-navy text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h.01M15 9h.01M9 15h6"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-urbanist text-xl font-bold text-mento-navy md:text-2xl">
              Mento AI Assistant
            </h2>
            <p className="mt-0.5 flex items-center gap-2 text-sm text-gray-500">
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
              Online &amp; Ready to help
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-semibold text-mento-navy transition hover:bg-gray-50"
          >
            <Icon name="clock" className="size-4" />
            Recent
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-semibold text-mento-navy transition hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-5 overflow-y-auto rounded-2xl border border-gray-200/80 bg-[#f5f6f8] p-4 md:p-6">
        <div className="flex justify-center">
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-wide text-gray-400 shadow-sm">
            TODAY, OCTOBER 24
          </span>
        </div>

        {messages.map(m => {
          if (m.role === 'user') {
            return (
              <MessageRow key={m.id} align="right" time={m.time}>
                <div className="rounded-2xl rounded-tr-md bg-mento-navy px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
                  {m.text}
                </div>
              </MessageRow>
            );
          }

          return (
            <MessageRow key={m.id} align="left" time={m.time}>
              <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
                {m.text}
                {m.kind === 'analysis' && <GradeAnalysisCard />}
              </div>
            </MessageRow>
          );
        })}

        {typing && (
          <MessageRow align="left" time="">
            <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-400">
              Thinking…
            </div>
          </MessageRow>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="pt-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={() => send(s.label)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-mento-navy shadow-sm transition hover:border-mento-navy/30 hover:bg-gray-50"
            >
              <Icon name={s.icon} className="size-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_4px_16px_rgba(26,38,74,0.06)]"
        >
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-50 hover:text-mento-navy"
            aria-label="Attach file"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-50 hover:text-mento-navy"
            aria-label="Emoji"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask Mento AI to summarize grades, create plans, or analyze performance..."
            className="h-11 min-w-0 flex-1 bg-transparent text-sm text-mento-navy outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mento-navy text-white transition hover:bg-[#152038]"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="mt-3 text-center text-[11px] text-gray-400">
          Mento AI can make mistakes. Verify important academic data with official records.
        </p>
      </div>
    </section>
  );
}
