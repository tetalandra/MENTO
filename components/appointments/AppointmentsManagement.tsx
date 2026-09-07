'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

const KPIS = [
  {
    label: 'Total Appointments',
    value: '128',
    trend: '+ 5%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Pending',
    value: '128',
    trend: '+ 3.8%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Rescheduled',
    value: '30,00',
    trend: '+ 3.8%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" />
      </svg>
    ),
  },
  {
    label: 'Completed',
    value: '35%',
    trend: '+ 3.8%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const ROWS = [
  { id: '1', student: 'Sarah Johnson', topic: 'Project Review', date: '12 - 07 - 2025', status: 'confirmed' },
  { id: '2', student: 'Sarah Johnson', topic: 'Sarah Johnson', date: '12 - 07 - 2025', status: 'confirmed' },
  { id: '3', student: 'Sarah Johnson', topic: 'Sarah Johnson', date: '12 - 07 - 2025', status: 'confirmed' },
  { id: '4', student: 'Sarah Johnson', topic: 'Sarah Johnson', date: '12 - 07 - 2025', status: 'confirmed' },
  { id: '5', student: 'Sarah Johnson', topic: 'Sarah Johnson', date: '12 - 07 - 2025', status: 'confirmed' },
  { id: '6', student: 'Sarah Johnson', topic: 'Sarah Johnson', date: '12 - 07 - 2025', status: 'confirmed' },
  { id: '7', student: 'Sarah Johnson', topic: 'Sarah Johnson', date: '12 - 07 - 2025', status: 'confirmed' },
];

export function AppointmentsManagement() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ROWS;
    return ROWS.filter(
      r => r.student.toLowerCase().includes(q) || r.topic.toLowerCase().includes(q),
    );
  }, [query]);

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

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
            Appointment Management
          </h2>
          <p className="mt-1 max-w-xl font-urbanist text-sm text-gray-500">
            Manage student mentorship sessions, review thesis progress, and finalize academic career
            paths.
          </p>
        </div>

        <button
          type="button"
          className="flex min-w-[220px] items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-[0_1px_3px_rgba(26,38,74,0.04)] transition hover:bg-gray-50"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-[#eef1f8] text-mento-navy">
            <Icon name="download" className="size-4" />
          </span>
          <span className="flex-1 font-urbanist text-sm font-semibold text-mento-navy">
            Export Schedule
          </span>
          <Icon name="chevron-right" className="size-4 text-gray-400" />
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map(kpi => (
          <div
            key={kpi.label}
            className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex size-14 shrink-0 items-center justify-center">
                <svg viewBox="0 0 56 56" className="absolute inset-0 size-14" aria-hidden>
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#e8ebf2" strokeWidth="4" />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="none"
                    stroke="#1a264a"
                    strokeWidth="4"
                    strokeDasharray="100 151"
                    strokeLinecap="round"
                    transform="rotate(-90 28 28)"
                  />
                </svg>
                <span className="relative text-mento-navy">{kpi.icon}</span>
              </div>
              <div>
                <p className="font-urbanist text-sm text-gray-500">{kpi.label}</p>
                <p className="mt-0.5 font-inter text-[26px] font-bold tracking-tight text-mento-navy">
                  {kpi.value}
                </p>
                <p className="mt-1 font-urbanist text-xs font-semibold text-emerald-600">
                  {kpi.trend}
                  <span className="ml-1 font-normal text-gray-400">this month</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search students, Topic"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
          />
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-700"
        >
          <Icon name="calendar" className="size-4 text-gray-500" />
          Mar 05 - May 04
        </button>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-700"
        >
          All type
          <Icon name="chevron-down" className="size-3.5 text-gray-400" />
        </button>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-700"
        >
          Newest
          <Icon name="chevron-down" className="size-3.5 text-gray-400" />
        </button>

        <div className="ml-auto flex overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            type="button"
            onClick={() => setView('list')}
            aria-label="List view"
            className={`flex size-10 items-center justify-center ${
              view === 'list' ? 'bg-mento-navy text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className={`flex size-10 items-center justify-center ${
              view === 'grid' ? 'bg-mento-navy text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
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
                    aria-label="Select all"
                    className="size-4 rounded border-white/40 accent-white"
                  />
                </th>
                <th className="px-3 py-3.5 font-urbanist text-xs font-semibold uppercase tracking-wide">
                  Student Name
                </th>
                <th className="px-3 py-3.5 font-urbanist text-xs font-semibold uppercase tracking-wide">
                  Topic
                </th>
                <th className="px-3 py-3.5 font-urbanist text-xs font-semibold uppercase tracking-wide">
                  Date
                </th>
                <th className="px-3 py-3.5 font-urbanist text-xs font-semibold uppercase tracking-wide">
                  Status
                </th>
                <th className="w-16 px-3 py-3.5 font-urbanist text-xs font-semibold uppercase tracking-wide">
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
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleOne(row.id)}
                      aria-label={`Select ${row.student}`}
                      className="size-4 rounded border-gray-300 accent-mento-navy"
                    />
                  </td>
                  <td className="px-3 py-4 font-urbanist text-sm font-medium text-mento-navy">
                    {row.student}
                  </td>
                  <td className="px-3 py-4 font-urbanist text-sm text-gray-600">{row.topic}</td>
                  <td className="px-3 py-4 font-urbanist text-sm text-gray-600">{row.date}</td>
                  <td className="px-3 py-4">
                    <span className="inline-flex rounded-full bg-mento-navy px-3.5 py-1 text-xs font-semibold capitalize text-white">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <button
                      type="button"
                      aria-label="Row actions"
                      className="flex size-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-mento-navy"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 17a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
