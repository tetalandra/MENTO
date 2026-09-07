'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
/** Oct 2023 starts on Sunday → Mon-first grid: empty Mon–Sat then 1…31 */
const OCT_START_OFFSET = 6;
const OCT_DAYS = 31;

const TABS = ['All', 'Pending', 'Approved', 'Completed'] as const;

const ROWS = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  index: 1,
  mentor: 'Habumugisha Olivier',
  date: '2026-06-01',
  topic: 'Career Path Advice',
  status: 'Pending' as const,
}));

function MoreIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

export function MyAppointmentsStudent() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('All');
  const [selectedDay, setSelectedDay] = useState(3);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (tab === 'All') return ROWS;
    return ROWS.filter(r => r.status === tab);
  }, [tab]);

  const allChecked = filtered.length > 0 && filtered.every(r => selected.has(r.id));

  function toggleAll() {
    if (allChecked) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(filtered.map(r => r.id)));
  }

  function toggleOne(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: OCT_START_OFFSET }, () => null),
    ...Array.from({ length: OCT_DAYS }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <section className="space-y-6 pb-4">
      {/* Header badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
          My Appointments
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 text-sm font-semibold text-mento-navy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Rwanda Coding Academy
          </span>
          <span className="inline-flex h-10 items-center rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white">
            Student
          </span>
        </div>
      </div>

      {/* Calendar + side cards */}
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-urbanist text-base font-bold text-mento-navy">October 2023</h3>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Previous month"
              >
                <Icon name="chevron-right" className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Next month"
              >
                <Icon name="chevron-right" className="size-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map(d => (
              <div key={d} className="py-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                {d}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) {
                return <div key={`e-${i}`} className="aspect-square" />;
              }
              const isSelected = day === selectedDay;
              const isSoft = day === 12;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`flex aspect-square items-center justify-center rounded-lg text-sm font-semibold transition ${
                    isSelected
                      ? 'bg-[#e8ecf8] text-mento-navy'
                      : isSoft
                        ? 'bg-gray-100 text-mento-navy'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl bg-mento-navy p-5 text-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
              Next Session
            </p>
            <h3 className="mt-2 font-urbanist text-xl font-bold leading-snug">
              System Architecture Review
            </h3>
            <div className="mt-4 space-y-1.5 text-sm text-white/80">
              <p className="inline-flex items-center gap-2">
                <Icon name="clock" className="size-4 text-white/70" />
                Tomorrow, 14:00 PM
              </p>
              <p className="pl-6">With Eng. Uwena Claudine</p>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <h3 className="font-urbanist text-base font-bold text-mento-navy">Appointment Health</h3>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="font-urbanist text-3xl font-bold text-mento-navy">94%</p>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[94%] rounded-full bg-mento-navy" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              You have successfully attended 17 of your 18 scheduled sessions this semester. Keep up
              the consistency!
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <div className="mb-4 flex gap-6 border-b border-gray-200">
          {TABS.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setSelected(new Set());
              }}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                tab === t
                  ? 'border-mento-navy text-mento-navy'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="bg-mento-navy text-white">
                  <th className="w-12 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      aria-label="Select all appointments"
                      className="size-4 rounded border-white/40 accent-white"
                    />
                  </th>
                  <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">#</th>
                  <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                    Mentor
                  </th>
                  <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Date</th>
                  <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                    Topic
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
                {filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#f8f9fb]' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={selected.has(row.id)}
                        onChange={() => toggleOne(row.id)}
                        aria-label={`Select appointment ${row.id}`}
                        className="size-4 rounded border-gray-300 accent-mento-navy"
                      />
                    </td>
                    <td className="px-3 py-3.5 text-sm text-gray-600">{row.index}</td>
                    <td className="px-3 py-3.5 text-sm font-medium text-mento-navy">{row.mentor}</td>
                    <td className="px-3 py-3.5 text-sm text-gray-600">{row.date}</td>
                    <td className="px-3 py-3.5 text-sm text-gray-600">{row.topic}</td>
                    <td className="px-3 py-3.5">
                      <span className="inline-flex rounded-full bg-mento-navy px-3 py-1 text-xs font-semibold text-white">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <button
                        type="button"
                        aria-label={`Actions for appointment ${row.id}`}
                        className="flex size-8 items-center justify-center rounded-lg text-mento-navy transition hover:bg-[#eef1f8]"
                      >
                        <MoreIcon />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                      No {tab.toLowerCase()} appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-500">Showing 1 to 4 of 247 results</p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
                aria-label="Previous page"
              >
                <Icon name="chevron-right" className="size-4 rotate-180" />
              </button>
              {[1, 2, 3].map(n => (
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
    </section>
  );
}
