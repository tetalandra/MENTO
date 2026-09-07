'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/icons';

const CATEGORY_CARDS = [
  {
    title: 'Academic Mentorship',
    count: '18',
    trend: '2+ increased from last month',
    href: '/templates/create?category=academic',
  },
  {
    title: 'Mental Mentorship',
    count: '15',
    trend: '9+ increased from last month',
    href: '/templates/create?category=mental',
  },
  {
    title: 'Career Mentorship',
    count: '12',
    trend: '6+ increased from last month',
    href: '/templates/create?category=career',
  },
];

const ROWS = [
  { id: '1', templateId: 'TMP-023897', name: 'Internship Guidance', category: 'Career', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '2', templateId: 'TMP-023897', name: 'Family matters', category: 'Mental', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '3', templateId: 'TMP-023897', name: 'Uhirwa Melissa', category: 'Career', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '4', templateId: 'TMP-023897', name: 'Internship Guidance', category: 'Career', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '5', templateId: 'TMP-023897', name: 'Family matters', category: 'Mental', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '6', templateId: 'TMP-023897', name: 'Uhirwa Melissa', category: 'Academic', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '7', templateId: 'TMP-023897', name: 'Internship Guidance', category: 'Career', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '8', templateId: 'TMP-023897', name: 'Family matters', category: 'Mental', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '9', templateId: 'TMP-023897', name: 'Uhirwa Melissa', category: 'Career', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '10', templateId: 'TMP-023897', name: 'Internship Guidance', category: 'Academic', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
  { id: '11', templateId: 'TMP-023897', name: 'Family matters', category: 'Mental', createdAt: '2026-06-01', lastEdited: '2026-06-01' },
];

const FILTERS = ['Template-id', 'Temp-name', 'Category', 'created-at', 'last-edited'] as const;

export function TemplatesManagement() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ROWS;
    return ROWS.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.templateId.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
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
      {/* Breadcrumb + header */}
      <div>
        <p className="text-xs text-gray-400">
          Settings <span className="mx-1">›</span> Template Management
        </p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
              Templates Management
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Configure and organize educational mentorship frameworks. Standardize how your
              institution tracks student growth and administrative milestones.
            </p>
          </div>
          <Link
            href="/templates/create"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
          >
            <Icon name="plus" className="size-4" />
            Create New Template
          </Link>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-mento-navy p-5 text-white shadow-md">
          <p className="text-sm text-white/70">Total templates</p>
          <p className="mt-2 font-inter text-4xl font-bold">45</p>
          <p className="mt-3 text-xs text-white/60">24+ increased from last month</p>
        </div>

        {CATEGORY_CARDS.map(card => (
          <div
            key={card.title}
            className="flex flex-col rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <Link
                href={card.href}
                aria-label={`Open ${card.title}`}
                className="flex size-7 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-mento-navy"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path d="M5 5h5V3H3v7h2V5zm5 10H5v-5H3v7h7v-2zm5-5v5h-5v2h7v-7h-2zm0-5h-5v2h5v5h2V3h-2v2z" />
                </svg>
              </Link>
            </div>
            <p className="mt-2 font-inter text-3xl font-bold text-mento-navy">{card.count}</p>
            <p className="mt-2 text-xs text-gray-400">{card.trend}</p>
            <Link
              href={card.href}
              className="mt-4 flex h-9 w-full items-center justify-center rounded-lg bg-mento-navy text-xs font-bold text-white transition hover:bg-[#152038]"
            >
              Add Sub-template
            </Link>
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
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search templates..."
              className="h-10 w-56 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-mento-navy"
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
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="bg-mento-navy text-white">
                <th className="w-12 px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all templates"
                    className="size-4 rounded border-white/40 accent-white"
                  />
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Template-id</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Template-name</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Category</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">created-at</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">last-edited</th>
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
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.templateId}</td>
                  <td className="px-3 py-3.5 text-sm font-medium text-mento-navy">{row.name}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.category}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.createdAt}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{row.lastEdited}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/templates/${row.category.toLowerCase()}`}
                        aria-label={`View ${row.name}`}
                        className="flex size-8 items-center justify-center rounded-lg text-mento-navy transition hover:bg-[#eef1f8]"
                      >
                        <Icon name="eye" className="size-4" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Download ${row.name}`}
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

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-500">Showing 1-{filtered.length} of 1,248 teachers</p>
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
