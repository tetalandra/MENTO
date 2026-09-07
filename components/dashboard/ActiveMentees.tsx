'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

const FILTERS = ['Student-id', 'Full-name', 'email', 'created-at', 'status'] as const;

const DATES = ['2026-06-01', '2026-06-02', '2026-07-03'] as const;

function MoreIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

export function ActiveMentees() {
  const rows = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: String(i + 1),
        studentId: 'ST-023',
        name: 'Habumugisha Olivier',
        email: 'uhirwamelissa@gmail.com',
        createdAt: DATES[i % DATES.length],
        status: (i % 3 === 1 ? 'Unassigned' : 'Assigned') as 'Assigned' | 'Unassigned',
      })),
    [],
  );

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

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

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
          Total active mentees
        </h2>
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
                    aria-label="Select all mentees"
                    className="size-4 rounded border-white/40 accent-white"
                  />
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                  Student-id
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                  Full name
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">email</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                  created-at
                </th>
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
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        row.status === 'Assigned' ? 'bg-mento-navy' : 'bg-[#3d5a9e]'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <button
                      type="button"
                      aria-label={`Actions for ${row.name}`}
                      className="flex size-8 items-center justify-center rounded-lg text-mento-navy transition hover:bg-[#eef1f8]"
                    >
                      <MoreIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-500">Showing 1-{filtered.length} of 2,260 mentees</p>
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
