'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icons';

const TEMPLATES = [
  'Academic Mentorship',
  'Career Guidance',
  'Discipline & Wellness',
];

function PublicToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Public</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-[22px] w-[40px] shrink-0 rounded-full transition-colors ${
          enabled ? 'bg-[#3b82f6]' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-[3px] size-4 rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-[20px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
    </div>
  );
}

export function RecordSessionForm() {
  const [student, setStudent] = useState('Alex Thompson');
  const [date, setDate] = useState('2023-11-20');
  const [duration, setDuration] = useState('45');
  const [format, setFormat] = useState('Virtual');
  const [discussion, setDiscussion] = useState('');
  const [discussionPublic, setDiscussionPublic] = useState(true);
  const [actionsPublic, setActionsPublic] = useState(true);
  const [actionItems, setActionItems] = useState<string[]>(['Complete Module 3 Self-Assessment']);
  const [newItem, setNewItem] = useState('');

  function updateItem(index: number, value: string) {
    setActionItems(prev => prev.map((item, i) => (i === index ? value : item)));
  }

  function removeItem(index: number) {
    setActionItems(prev => prev.filter((_, i) => i !== index));
  }

  function addItem() {
    const value = newItem.trim();
    if (!value) return;
    setActionItems(prev => [...prev, value]);
    setNewItem('');
  }

  return (
    <section className="space-y-5">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
          RECORD SESSION
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-mento-navy transition hover:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 3H7a2 2 0 00-2 2v14l7-3 7 3V5a2 2 0 00-2-2z" />
            </svg>
            Save Draft
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 21l18-9L3 3l3 9zm0 0h7" />
            </svg>
            Publish Report
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* Left column */}
        <div className="space-y-5">
          {/* Session Details */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#eef1f8] text-mento-navy">
                <Icon name="clipboard" className="size-4" />
              </span>
              <h3 className="font-urbanist text-base font-bold text-mento-navy">Session Details</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Student Name</label>
                <div className="relative">
                  <select
                    value={student}
                    onChange={e => setStudent(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 pr-10 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  >
                    <option>Alex Thompson</option>
                    <option>Nziza Ange</option>
                    <option>Sarah Johnson</option>
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Date of Session</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-mento-navy outline-none focus:border-mento-navy"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Duration (Min)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Format</label>
                  <div className="relative">
                    <select
                      value={format}
                      onChange={e => setFormat(e.target.value)}
                      className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 pr-10 text-sm text-mento-navy outline-none focus:border-mento-navy"
                    >
                      <option>Virtual</option>
                      <option>In Person</option>
                      <option>Hybrid</option>
                    </select>
                    <Icon
                      name="chevron-down"
                      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Choose Template */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#eef1f8] text-[#3b82f6]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <h3 className="font-urbanist text-base font-bold text-mento-navy">Choose template</h3>
            </div>
            <p className="mb-3 text-xs font-semibold text-gray-500">Template categories</p>
            <div className="space-y-3">
              {TEMPLATES.map(name => (
                <div
                  key={name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#dce3f0] bg-[#eef1f8] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-mento-navy">{name}</p>
                  <button
                    type="button"
                    className="rounded-lg bg-mento-navy px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#152038]"
                  >
                    Add Sub-template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* AI Synthesis */}
          <div className="rounded-xl border border-[#bfdbfe] bg-[#eff6ff] p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15 text-[#3b82f6]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zm6 10l.9 3.1L22 16l-3.1.9L18 20l-.9-3.1L14 16l3.1-.9L18 12z" />
                </svg>
              </span>
              <div>
                <h3 className="font-urbanist text-sm font-bold text-mento-navy">
                  Intelligent Session Synthesis
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-mento-navy/70">
                  Let MENTO AI draft your session narrative based on your previous interaction notes
                  and student goals.
                </p>
              </div>
            </div>
          </div>

          {/* Discussion Points */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-urbanist text-base font-bold text-mento-navy">Discussion Points</h3>
                <Icon name="help" className="size-4 text-gray-400" />
              </div>
              <PublicToggle enabled={discussionPublic} onChange={setDiscussionPublic} />
            </div>
            <textarea
              rows={5}
              value={discussion}
              onChange={e => setDiscussion(e.target.value)}
              placeholder="What key topics were covered during this session?"
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
            />
          </div>

          {/* Action Items */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-urbanist text-base font-bold text-mento-navy">
                Action Items & Next Steps
              </h3>
              <PublicToggle enabled={actionsPublic} onChange={setActionsPublic} />
            </div>

            <div className="space-y-3">
              {actionItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={e => updateItem(i, e.target.value)}
                    className="h-11 flex-1 rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    aria-label="Remove action item"
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0v12a1 1 0 001 1h6a1 1 0 001-1V7M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={e => setNewItem(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem();
                    }
                  }}
                  placeholder="Add a new action item..."
                  className="h-11 flex-1 rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
                />
                <button
                  type="button"
                  onClick={addItem}
                  aria-label="Add action item"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-white transition hover:bg-[#2563eb]"
                >
                  <Icon name="plus" className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-2 text-center text-xs text-gray-400">
        © 2023 MENTO Institutional Portal · Version 4.2.1
      </p>
    </section>
  );
}
