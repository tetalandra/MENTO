'use client';

import { useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/icons';

const TABS = ['Peer Hub', 'My Feedback', 'Resources'] as const;

const CLASSMATES = [
  { initials: 'ER', name: 'Elena Rodriguez', role: 'PhD Candidate — Architecture', color: 'bg-[#c8d4ef]' },
  { initials: 'ML', name: 'Marcus Lewis', role: 'MSc — Systems Design', color: 'bg-[#d4e8d4]' },
  { initials: 'EM', name: 'Emily Rivera', role: 'PhD Candidate — HCI', color: 'bg-[#f0dcc8]' },
  { initials: 'SV', name: 'Siddharth V.', role: 'MSc — Cognitive Systems', color: 'bg-[#e0d4f0]' },
];

const ACTIVITY = [
  {
    id: '1',
    icon: 'comment' as const,
    text: 'Elena left a comment on your project draft',
    time: '15 minutes ago',
  },
  {
    id: '2',
    icon: 'check' as const,
    text: 'Dr. Vance approved your peer review phase',
    time: '2 hours ago',
  },
  {
    id: '3',
    icon: 'file' as const,
    text: 'Marcus uploaded a comparative analysis template',
    time: 'Yesterday',
  },
];

const EVAL_METRICS = [
  { id: '1', label: 'Code quality and flow' },
  { id: '2', label: 'Code quality and flow' },
  { id: '3', label: 'Code quality and flow' },
];

type ChatMsg = { id: string; from: string; self?: boolean; text: string };

const INITIAL_CHAT: ChatMsg[] = [
  {
    id: '1',
    from: 'Elena Rodriguez',
    text: 'Has anyone looked at the new grading rubric Dr. Vance shared? I want to align our PR comments with it.',
  },
  {
    id: '2',
    from: 'You',
    self: true,
    text: "Yes — he's focusing on clarity of architecture decisions and test coverage. I'll map our notes tonight.",
  },
  {
    id: '3',
    from: 'Marcus Lewis',
    text: 'I dropped a comparative analysis template in Resources if that helps with the write-up.',
  },
];

function AssetChip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-mento-navy transition hover:bg-gray-50"
    >
      {children}
      {label}
    </button>
  );
}

export function PeerCollaborationHub() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Peer Hub');
  const [query, setQuery] = useState('');
  const [scores, setScores] = useState([9, 9, 9]);
  const [vote, setVote] = useState<'changes' | 'approve' | null>('approve');
  const [chat, setChat] = useState(INITIAL_CHAT);
  const [draft, setDraft] = useState('');

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setChat(prev => [...prev, { id: `m-${Date.now()}`, from: 'You', self: true, text }]);
    setDraft('');
  }

  return (
    <section className="space-y-5 pb-6">
      {/* In-page top links (matches design while keeping portal shell) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <p className="font-urbanist text-sm font-bold tracking-wide text-mento-navy">MENTO</p>
        <nav className="flex flex-wrap items-center gap-5">
          {TABS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`text-sm font-semibold transition ${
                tab === t
                  ? 'border-b-2 border-mento-navy pb-0.5 text-mento-navy'
                  : 'text-gray-500 hover:text-mento-navy'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
            Peer Collaboration Hub
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Collaborate with fellow students under Dr. Julian Vance&apos;s mentorship.
          </p>
        </div>
        <div className="relative w-full max-w-md">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search projects, peers, or files..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-mento-navy"
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        {/* Main column */}
        <div className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Active Peer Projects */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-urbanist text-base font-bold text-mento-navy">
                  Active Peer Projects
                </h3>
                <button type="button" className="text-xs font-semibold text-[#2f6fed] hover:underline">
                  View All
                </button>
              </div>

              <div className="rounded-xl border border-gray-200 bg-[#fafbfc] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md bg-mento-navy px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Project Canvas
                  </span>
                  <span className="text-xs text-gray-400">Last updated: 4 mins ago</span>
                </div>
                <h4 className="mt-3 font-urbanist text-base font-bold leading-snug text-mento-navy">
                  Neuro-linguistic Patterns in Systems Architecture
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Exploring the correlation between synaptic density and cognitive load in distributed
                  mentorship workflows…
                </p>

                <p className="mt-4 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  Development Assets &amp; Repository Links
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <AssetChip label="Figma">
                    <span className="flex size-5 items-center justify-center rounded bg-[#1e1e1e] text-[9px] font-bold text-white">
                      F
                    </span>
                  </AssetChip>
                  <AssetChip label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.22.682-.48 0-.24-.01-.87-.01-1.71-2.782.6-3.369-1.34-3.369-1.34-.454-1.16-1.11-1.47-1.11-1.47-.908-.62.07-.61.07-.61 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.09 2.91.83.09-.647.35-1.09.636-1.34-2.22-.25-4.555-1.11-4.555-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.7.115 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </AssetChip>
                  <AssetChip label="API">
                    <span className="flex size-5 items-center justify-center rounded bg-[#eef1f8] text-[9px] font-bold text-mento-navy">
                      {'</>'}
                    </span>
                  </AssetChip>
                </div>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                    Pending Code Branch Changes (PRs)
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-mento-navy">
                      PR #12 — Setup PostgreSQL Schemas
                    </p>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      Needs testing
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Evaluation */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
              <h3 className="font-urbanist text-xs font-bold uppercase tracking-wider text-mento-navy">
                Structured Evaluation
              </h3>
              <p className="mt-1 text-sm text-gray-500">Assess team contributions systematically.</p>

              <div className="mt-5 space-y-4">
                {EVAL_METRICS.map((m, i) => (
                  <div key={m.id}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <p className="text-sm text-gray-600">{m.label}</p>
                      <span className="text-sm font-bold text-mento-navy">{scores[i]}/10</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={scores[i]}
                      onChange={e => {
                        const next = [...scores];
                        next[i] = Number(e.target.value);
                        setScores(next);
                      }}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-mento-navy"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-wide text-gray-400">
                Submit Vote Decision
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVote('changes')}
                  className={`h-10 rounded-lg text-sm font-semibold transition ${
                    vote === 'changes'
                      ? 'bg-mento-navy text-white'
                      : 'border border-gray-300 bg-white text-mento-navy hover:bg-gray-50'
                  }`}
                >
                  Needs changes?
                </button>
                <button
                  type="button"
                  onClick={() => setVote('approve')}
                  className={`h-10 rounded-lg text-sm font-semibold transition ${
                    vote === 'approve'
                      ? 'bg-mento-navy text-white'
                      : 'border border-gray-300 bg-white text-mento-navy hover:bg-gray-50'
                  }`}
                >
                  Approve code
                </button>
              </div>
              <button
                type="button"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-mento-navy text-sm font-semibold text-white transition hover:bg-[#152038]"
              >
                Request Mentor review
              </button>
            </div>
          </div>

          {/* Discussion Board */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-urbanist text-base font-bold text-mento-navy">Discussion Board</h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-mento-navy"
                  aria-label="Filter"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-mento-navy"
                  aria-label="Attachments"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-h-[280px] space-y-3 overflow-y-auto pr-1">
              {chat.map(m => (
                <div key={m.id} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${m.self ? 'items-end' : 'items-start'} flex flex-col`}>
                    {!m.self && (
                      <span className="mb-1 px-1 text-[11px] font-semibold text-gray-400">{m.from}</span>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.self
                          ? 'rounded-br-md bg-mento-navy text-white'
                          : 'rounded-bl-md bg-[#e8eef8] text-mento-navy'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                sendMessage();
              }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-[#fafbfc] p-2"
            >
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg text-gray-400 hover:bg-white hover:text-mento-navy"
                aria-label="Emoji"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Type a message or share feedback..."
                className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-lg text-gray-400 hover:bg-white hover:text-mento-navy"
                aria-label="Attach"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
              <button
                type="submit"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mento-navy text-white transition hover:bg-[#152038]"
                aria-label="Send"
              >
                <Icon name="arrow-right" className="size-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right sidebar widgets */}
        <aside className="space-y-5">
          <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h3 className="font-urbanist text-base font-bold text-mento-navy">Online Classmates</h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                8 Active
              </span>
            </div>
            <ul className="space-y-3">
              {CLASSMATES.map(c => (
                <li key={c.name} className="flex items-center gap-3">
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-mento-navy ${c.color}`}
                  >
                    {c.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-mento-navy">{c.name}</p>
                    <p className="truncate text-xs text-gray-400">{c.role}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 text-sm font-semibold text-mento-navy transition hover:bg-gray-50"
            >
              Invite a Colleague
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <h3 className="font-urbanist text-base font-bold text-mento-navy">Recent Activity</h3>
            <ul className="relative mt-4 space-y-4 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gray-200">
              {ACTIVITY.map(a => (
                <li key={a.id} className="relative flex gap-3 pl-0">
                  <span className="relative z-[1] flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-mento-navy">
                    {a.icon === 'check' ? (
                      <Icon name="check" className="size-3" />
                    ) : a.icon === 'file' ? (
                      <Icon name="file-text" className="size-3" />
                    ) : (
                      <Icon name="message-circle" className="size-3" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm leading-snug text-gray-700">{a.text}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-mento-navy p-5 text-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">Lead Mentor</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 font-urbanist text-sm font-bold">
                JV
              </div>
              <div>
                <p className="font-urbanist text-sm font-bold">Dr. Julian Vance</p>
                <p className="text-xs text-white/70">Senior Academic Lead</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-mento-navy transition hover:bg-gray-100"
            >
              <Icon name="mail" className="size-4" />
              Message Mentor
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
