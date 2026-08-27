'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

const EXPERIENCE = ['2+', '3+', '5+', '2+', '3+', '2+', '5+', '3+', '2+', '3+', '5+', '2+'] as const;

const MENTORS = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: 'Habumugisha Oliver',
  expertise: 'Networking and Database analyst',
  experience: EXPERIENCE[i],
  rating: '5.0',
  status: 'Active' as const,
  email: 'HabOliver96@gmail.com',
  avatar: 'HO',
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

function StarFilled({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

export function FindYourMentor() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MENTORS;
    return MENTORS.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.expertise.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
            Find your Mentor
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Connect with industry experts and academic leaders who can help accelerate your learning
            journey and career growth.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-xs sm:w-56">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-mento-navy"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700"
          >
            All Mentors
            <Icon name="chevron-down" className="size-3.5 text-gray-400" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            All status
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-mento-navy text-white">
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide">Mentor</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                  Core Expertise
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">
                  Experience
                </th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Rating</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Status</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Email</th>
                <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mentor, i) => (
                <tr
                  key={mentor.id}
                  className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#f8f9fb]' : 'bg-white'}`}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#dfe5f2] font-urbanist text-xs font-bold text-mento-navy">
                        {mentor.avatar}
                      </div>
                      <span className="text-sm font-medium text-mento-navy">{mentor.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{mentor.expertise}</td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{mentor.experience}</td>
                  <td className="px-3 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-mento-navy">
                      <StarFilled className="size-4 text-amber-400" />
                      {mentor.rating}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="inline-flex rounded-full bg-mento-navy px-3 py-1 text-xs font-semibold text-white">
                      {mentor.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-gray-600">{mentor.email}</td>
                  <td className="px-3 py-3.5">
                    <button
                      type="button"
                      aria-label={`Actions for ${mentor.name}`}
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
          <p className="text-xs text-gray-500">
            Showing 1 to {Math.min(filtered.length, 10)} of 242 results
          </p>
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
            <span className="px-1 text-xs text-gray-400">…</span>
            <button
              type="button"
              onClick={() => setPage(25)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs font-semibold ${
                page === 25
                  ? 'border-mento-navy bg-mento-navy text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              25
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
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
