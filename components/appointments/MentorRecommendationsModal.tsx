'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

const MENTORS = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  name: 'Ange Nziza',
  title: 'AI Research Fellow - Stanford',
  initials: 'AN',
  rating: '5.0',
  match: '99%',
  status: 'Active' as const,
}));

function StarFilled({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

interface MentorRecommendationsModalProps {
  open: boolean;
  onClose: () => void;
}

export function MentorRecommendationsModal({ open, onClose }: MentorRecommendationsModalProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MENTORS;
    return MENTORS.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.status.toLowerCase().includes(q),
    );
  }, [query]);

  const allChecked = filtered.length > 0 && filtered.every(m => selected.has(m.id));

  if (!open) return null;

  function toggleAll() {
    if (allChecked) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(filtered.map(m => m.id)));
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-recommendations-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 md:px-6">
          <h2
            id="mentor-recommendations-title"
            className="font-urbanist text-lg font-bold text-mento-navy md:text-xl"
          >
            All Mentor Recommendations
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search anything here..."
                className="h-10 w-52 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-mento-navy sm:w-64"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700"
            >
              <Icon name="calendar" className="size-4 text-gray-500" />
              Last 30 Days
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
            >
              <Icon name="download" className="size-4" />
              Export Report
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-10 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-mento-navy"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-5 py-4 md:px-6">
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="bg-mento-navy text-white">
                    <th className="w-12 px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                        aria-label="Select all mentors"
                        className="size-4 rounded border-white/40 accent-white"
                      />
                    </th>
                    <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">#</th>
                    <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                      Mentor Profile
                    </th>
                    <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                      Rating
                    </th>
                    <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                      AI Match
                    </th>
                    <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr
                      key={m.id}
                      className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#f8f9fb]' : 'bg-white'}`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(m.id)}
                          onChange={() => toggleOne(m.id)}
                          aria-label={`Select ${m.name}`}
                          className="size-4 rounded border-gray-300 accent-mento-navy"
                        />
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600">1</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dbe4f5] text-xs font-bold text-mento-navy">
                            {m.initials}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-mento-navy">{m.name}</p>
                            <p className="text-xs text-gray-500">{m.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-mento-navy">
                          <StarFilled className="size-4 text-amber-400" />
                          {m.rating}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-mento-navy">{m.match}</td>
                      <td className="px-3 py-3">
                        <span className="inline-flex rounded-full bg-mento-navy px-3 py-1 text-xs font-semibold text-white">
                          {m.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          aria-label={`Request ${m.name}`}
                          className="flex size-9 items-center justify-center rounded-lg bg-[#eef1f8] text-mento-navy transition hover:bg-mento-navy hover:text-white"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            className="size-4"
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-3 md:px-6">
          <p className="text-xs text-gray-500">Showing 1 to 4 of 247 results</p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
              aria-label="Previous page"
            >
              <Icon name="chevron-right" className="size-4 rotate-180" />
            </button>
            {[1, 2].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`flex size-8 items-center justify-center rounded-md border text-xs font-semibold ${
                  page === n
                    ? 'border-mento-navy bg-mento-navy text-white'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
              aria-label="Next page"
            >
              <Icon name="chevron-right" className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
              aria-label="Last page"
            >
              <span className="inline-flex">
                <Icon name="chevron-right" className="size-3.5" />
                <Icon name="chevron-right" className="-ml-2 size-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
