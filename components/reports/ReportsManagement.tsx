'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

const KPIS = [
  {
    label: 'Total reports',
    value: '478',
    trend: '+ 3%',
    trendPositive: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Session reports',
    value: '471',
    trend: '+ 7.5%',
    trendPositive: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Termly reports',
    value: '6',
    trend: '- 9.8%',
    trendPositive: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: 'Monthly reports',
    value: '8',
    trend: '+ 3%',
    trendPositive: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const ROWS = [
  { id: '1', teacher: 'Ishime Nziza Ange', student: 'Mentees', category: 'Overall', createdAt: '2026-06-01', status: 'Monthly' },
  { id: '2', teacher: 'Ishime Nziza Ange', student: 'Uhirwa Melissa', category: 'Mental', createdAt: '2026-06-01', status: 'Session' },
  { id: '3', teacher: 'Ishime Nziza Ange', student: 'All', category: 'Academic', createdAt: '2026-06-01', status: 'Term' },
  { id: '4', teacher: 'Ishime Nziza Ange', student: 'Mentees', category: 'Discipline', createdAt: '2026-06-01', status: 'Monthly' },
  { id: '5', teacher: 'Ishime Nziza Ange', student: 'Uhirwa Melissa', category: 'Career', createdAt: '2026-06-01', status: 'Session' },
  { id: '6', teacher: 'Ishime Nziza Ange', student: 'All', category: 'Overall', createdAt: '2026-06-01', status: 'Term' },
  { id: '7', teacher: 'Ishime Nziza Ange', student: 'Mentees', category: 'Mental', createdAt: '2026-06-01', status: 'Monthly' },
  { id: '8', teacher: 'Ishime Nziza Ange', student: 'Uhirwa Melissa', category: 'Academic', createdAt: '2026-06-01', status: 'Session' },
  { id: '9', teacher: 'Ishime Nziza Ange', student: 'All', category: 'Discipline', createdAt: '2026-06-01', status: 'Term' },
  { id: '10', teacher: 'Ishime Nziza Ange', student: 'Mentees', category: 'Career', createdAt: '2026-06-01', status: 'Monthly' },
  { id: '11', teacher: 'Ishime Nziza Ange', student: 'Uhirwa Melissa', category: 'Overall', createdAt: '2026-06-01', status: 'Session' },
  { id: '12', teacher: 'Ishime Nziza Ange', student: 'All', category: 'Mental', createdAt: '2026-06-01', status: 'Term' },
  { id: '13', teacher: 'Ishime Nziza Ange', student: 'Mentees', category: 'Academic', createdAt: '2026-06-01', status: 'Monthly' },
  { id: '14', teacher: 'Ishime Nziza Ange', student: 'Uhirwa Melissa', category: 'Discipline', createdAt: '2026-06-01', status: 'Session' },
  { id: '15', teacher: 'Ishime Nziza Ange', student: 'All', category: 'Career', createdAt: '2026-06-01', status: 'Term' },
];

const FILTERS = ['Tchr-name', 'Sdt-name', 'Category', 'created-at', 'status'] as const;

export function ReportsManagement() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ROWS;
    return ROWS.filter(
      r =>
        r.teacher.toLowerCase().includes(q) ||
        r.student.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q),
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
            Report Management & Sessions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Real-time performance metrics and mentorship health overview
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-mento-navy transition hover:bg-gray-50"
          >
            <Icon name="download" className="size-4" />
            Export CSV
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
          >
            <Icon name="file-text" className="size-4" />
            Request Report
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map(kpi => (
          <div
            key={kpi.label}
            className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#eef1f8] text-mento-navy">
                {kpi.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="mt-0.5 font-inter text-[28px] font-bold tracking-tight text-mento-navy">
                  {kpi.value}
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${
                    kpi.trendPositive ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {kpi.trend}
                  <span className="ml-1 font-normal text-gray-400">This month</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {FILTERS.map(label => (
          <button
            key={label}
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700"
          >
            {label}
            <Icon name="chevron-down" className="size-3.5 text-gray-400" />
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search"
              className="h-10 w-48 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-mento-navy"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-lg bg-mento-navy px-5 text-sm font-semibold text-white transition hover:bg-[#152038]"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="bg-mento-navy text-white">
                <th className="w-12 px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all reports"
                    className="size-4 rounded border-white/40 accent-white"
                  />
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Teacher-name</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Student-name</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Category</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">created-at</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Status</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Action</th>
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
                      aria-label={`Select report ${row.id}`}
                      className="size-4 rounded border-gray-300 accent-mento-navy"
                    />
                  </td>
                  <td className="px-3 py-3.5 text-sm font-medium text-mento-navy">{row.teacher}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.student}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.category}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.createdAt}</td>
                  <td className="px-3 py-3.5">
                    <span className="inline-flex rounded-full bg-mento-navy px-3 py-1 text-xs font-semibold text-white">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="View report"
                        className="flex size-8 items-center justify-center rounded-lg text-mento-navy transition hover:bg-[#eef1f8]"
                      >
                        <Icon name="eye" className="size-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Download report"
                        className="flex size-8 items-center justify-center rounded-lg text-mento-navy transition hover:bg-[#eef1f8]"
                      >
                        <Icon name="download" className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-500">Showing 1-{filtered.length} of 1,240 teachers</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
              aria-label="Previous page"
            >
              <Icon name="chevron-right" className="size-4 rotate-180" />
            </button>
            {[1, 2, 3].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`flex size-8 items-center justify-center rounded-md text-xs font-semibold ${
                  page === n ? 'bg-mento-navy text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-xs text-gray-400">…</span>
            <button
              type="button"
              onClick={() => setPage(250)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold ${
                page === 250 ? 'bg-mento-navy text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              250
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
              aria-label="Next page"
            >
              <Icon name="chevron-right" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
