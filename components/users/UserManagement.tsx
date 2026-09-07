'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

type Tab = 'students' | 'teachers';

const STUDENT_KPIS = [
  {
    label: 'Total students',
    value: '1,248',
    trend: '+ 3%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    label: 'Total active students',
    value: '1,200',
    trend: '+ 2%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    label: 'Unassigned students',
    value: '40',
    trend: '+ 0.5%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h8m4-7l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2"
        />
      </svg>
    ),
  },
  {
    label: 'Assigned students',
    value: '8',
    trend: '+ 2%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const TEACHER_KPIS = [
  {
    label: 'Total teachers',
    value: '86',
    trend: '+ 4%',
    icon: STUDENT_KPIS[0].icon,
  },
  {
    label: 'Active mentors',
    value: '72',
    trend: '+ 3%',
    icon: STUDENT_KPIS[1].icon,
  },
  {
    label: 'Available mentors',
    value: '54',
    trend: '+ 1.2%',
    icon: STUDENT_KPIS[2].icon,
  },
  {
    label: 'At capacity',
    value: '18',
    trend: '+ 2%',
    icon: STUDENT_KPIS[3].icon,
  },
];

const STUDENT_ROWS = [
  { id: '1', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Active' as const },
  { id: '2', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Pending' as const },
  { id: '3', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Active' as const },
  { id: '4', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Pending' as const },
  { id: '5', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Active' as const },
  { id: '6', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Pending' as const },
  { id: '7', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Active' as const },
  { id: '8', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Pending' as const },
  { id: '9', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Active' as const },
  { id: '10', studentId: 'ST-023', name: 'Habumugisha Olivier', email: 'uhirwamelissa@gmail.com', createdAt: '2026-06-01', status: 'Pending' as const },
];

const TEACHER_ROWS = [
  { id: '1', studentId: 'TC-011', name: 'Ishime Nziza Ange', email: 'nziza.ange@rca.ac.rw', createdAt: '2026-05-12', status: 'Active' as const },
  { id: '2', studentId: 'TC-012', name: 'Uwase Marie', email: 'uwase.marie@rca.ac.rw', createdAt: '2026-05-12', status: 'Active' as const },
  { id: '3', studentId: 'TC-013', name: 'Habimana Eric', email: 'habimana.eric@rca.ac.rw', createdAt: '2026-04-08', status: 'Pending' as const },
  { id: '4', studentId: 'TC-014', name: 'Mukamana Claire', email: 'mukamana.claire@rca.ac.rw', createdAt: '2026-04-08', status: 'Active' as const },
  { id: '5', studentId: 'TC-015', name: 'Niyonsenga Paul', email: 'niyonsenga.paul@rca.ac.rw', createdAt: '2026-03-22', status: 'Pending' as const },
  { id: '6', studentId: 'TC-016', name: 'Ingabire Diane', email: 'ingabire.diane@rca.ac.rw', createdAt: '2026-03-22', status: 'Active' as const },
  { id: '7', studentId: 'TC-017', name: 'Bizimana Jean', email: 'bizimana.jean@rca.ac.rw', createdAt: '2026-02-14', status: 'Active' as const },
  { id: '8', studentId: 'TC-018', name: 'Uwimana Grace', email: 'uwimana.grace@rca.ac.rw', createdAt: '2026-02-14', status: 'Pending' as const },
  { id: '9', studentId: 'TC-019', name: 'Hakizimana Leo', email: 'hakizimana.leo@rca.ac.rw', createdAt: '2026-01-30', status: 'Active' as const },
  { id: '10', studentId: 'TC-020', name: 'Mukeshimana Ann', email: 'mukeshimana.ann@rca.ac.rw', createdAt: '2026-01-30', status: 'Pending' as const },
];

const FILTERS = ['Teacher-id', 'Full-name', 'email', 'created-at', 'status'] as const;

function MoreIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function GradCapIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
    </svg>
  );
}

export function UserManagement() {
  const [tab, setTab] = useState<Tab>('students');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const rows = tab === 'students' ? STUDENT_ROWS : TEACHER_ROWS;
  const kpis = tab === 'students' ? STUDENT_KPIS : TEACHER_KPIS;
  const idLabel = tab === 'students' ? 'Student-id' : 'Teacher-id';
  const totalLabel = tab === 'students' ? '1,248' : '86';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      r =>
        r.studentId.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q),
    );
  }, [query, rows]);

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

  function switchTab(next: Tab) {
    setTab(next);
    setSelected(new Set());
    setPage(1);
    setQuery('');
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
            User Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Efficiently manage student access and faculty roles across the portal.
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
          <Link
            href="/users/add"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
          >
            <Icon name="plus" className="size-4" />
            Add New User
          </Link>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-200">
        <button
          type="button"
          onClick={() => switchTab('students')}
          className={`inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
            tab === 'students'
              ? 'border-mento-navy text-mento-navy'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <GradCapIcon className="size-4" />
          Students
        </button>
        <button
          type="button"
          onClick={() => switchTab('teachers')}
          className={`inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
            tab === 'teachers'
              ? 'border-mento-navy text-mento-navy'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Icon name="user-circle" className="size-4" />
          Teachers & Mentors
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(kpi => (
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
                <p className="mt-1 text-xs font-semibold text-emerald-600">
                  {kpi.trend}
                  <span className="ml-1 font-normal text-gray-400">This month</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                    aria-label="Select all users"
                    className="size-4 rounded border-white/40 accent-white"
                  />
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">{idLabel}</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Full name</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">email</th>
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
                      aria-label={`Select ${row.name}`}
                      className="size-4 rounded border-gray-300 accent-mento-navy"
                    />
                  </td>
                  <td className="px-3 py-3.5 text-sm font-medium text-mento-navy">{row.studentId}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-700">{row.name}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.email}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.createdAt}</td>
                  <td className="px-3 py-3.5">
                    {row.status === 'Active' ? (
                      <span className="inline-flex rounded-full bg-mento-navy px-3 py-1 text-xs font-semibold text-white">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-semibold text-mento-navy">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <button
                      type="button"
                      aria-label={`Actions for ${row.name}`}
                      className="flex size-8 items-center justify-center rounded-lg text-mento-navy transition hover:bg-[#eef1f8]"
                    >
                      <MoreIcon className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-500">
            Showing 1-{filtered.length} of {totalLabel} teachers
          </p>
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
