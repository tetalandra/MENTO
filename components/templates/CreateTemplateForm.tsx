'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/icons';

const IMPACTS = [
  'Low grades',
  'Lack of confidence',
  'Fear of asking questions',
  'Stress',
  'Missing deadlines',
];

const CATEGORY_MAP: Record<string, string> = {
  academic: 'Academic Support',
  mental: 'Mental Support',
  career: 'Career Support',
};

export function CreateTemplateForm() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') ?? 'career';

  const [name, setName] = useState('Internship Guidance');
  const [category, setCategory] = useState(
    CATEGORY_MAP[categoryParam] ?? 'Career Support',
  );
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [challenge, setChallenge] = useState('');
  const [frequency, setFrequency] = useState('');
  const [impacts, setImpacts] = useState<Set<string>>(new Set());
  const [assistance, setAssistance] = useState('Teacher explanation');

  const breadcrumbCategory = useMemo(() => {
    if (category.includes('Academic')) return 'Academic Learning Support';
    if (category.includes('Mental')) return 'Mental Learning Support';
    return 'Academic Learning Support';
  }, [category]);

  function toggleImpact(item: string) {
    setImpacts(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  }

  return (
    <section className="space-y-5 pb-24">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400">
            Templates <span className="mx-1">›</span> {breadcrumbCategory}
          </p>
          <h2 className="mt-1 font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[26px]">
            Create Template: {name || 'Untitled'}
          </h2>
        </div>
        <Link
          href="/templates"
          className="inline-flex h-10 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Discard Draft
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        {/* Left form */}
        <div className="space-y-5">
          {/* Basic Information */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3b82f6]">
                <Icon name="help" className="size-4" />
              </span>
              <h3 className="font-urbanist text-base font-bold text-mento-navy">Basic Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Template Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-mento-navy outline-none focus:border-mento-navy"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 pr-10 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  >
                    <option>Career Support</option>
                    <option>Academic Support</option>
                    <option>Mental Support</option>
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the purpose of this academic support template.."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
                />
              </div>
            </div>
          </div>

          {/* Structured Template Fields */}
          <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3b82f6]">
                <Icon name="layout-template" className="size-4" />
              </span>
              <h3 className="font-urbanist text-base font-bold text-mento-navy">
                Structured Template Fields
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Subject Area</label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  >
                    <option value="">Select Subject</option>
                    <option>Software Engineering</option>
                    <option>Career Planning</option>
                    <option>Mental Wellness</option>
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Specific Challenge</label>
                <input
                  type="text"
                  value={challenge}
                  onChange={e => setChallenge(e.target.value)}
                  placeholder="Identify Challenge"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Frequency</label>
                <div className="relative">
                  <select
                    value={frequency}
                    onChange={e => setFrequency(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  >
                    <option value="">How often?</option>
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold text-mento-navy">Current Impact</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {IMPACTS.map(item => (
                  <label key={item} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={impacts.has(item)}
                      onChange={() => toggleImpact(item)}
                      className="size-4 rounded border-gray-300 accent-mento-navy"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-semibold text-mento-navy">Assistance Needed</label>
              <div className="relative">
                <select
                  value={assistance}
                  onChange={e => setAssistance(e.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 pr-10 text-sm text-mento-navy outline-none focus:border-mento-navy"
                >
                  <option>Teacher explanation</option>
                  <option>Peer support</option>
                  <option>Resource materials</option>
                </select>
                <Icon
                  name="chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <div className="flex items-center justify-between bg-mento-navy px-4 py-3 text-white">
            <p className="text-xs font-bold uppercase tracking-wide">Live Preview</p>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold">
              Drafting mode active
            </span>
          </div>

          <div className="space-y-5 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-urbanist text-xl font-bold text-mento-navy">
                  {name || 'Untitled Template'}
                </h3>
                <p className="mt-1 text-xs text-gray-500">Template ID: T-2024-082</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#eef1f8] text-mento-navy">
                <Icon name="file-text" className="size-4" />
              </span>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                01 · Scope
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Subject</p>
                  <p className="mt-0.5 font-medium text-mento-navy">{subject || '---'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Challenge</p>
                  <p className="mt-0.5 font-medium text-mento-navy">{challenge || '---'}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                02 · Analysis
              </p>
              <p className="mb-1.5 text-xs text-gray-500">Impact Indicators</p>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {impacts.size === 0 ? (
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                    No indicators selected
                  </span>
                ) : (
                  [...impacts].map(item => (
                    <span
                      key={item}
                      className="rounded-full bg-[#eef1f8] px-2.5 py-1 text-[11px] font-medium text-mento-navy"
                    >
                      {item}
                    </span>
                  ))
                )}
              </div>
              <p className="mb-1.5 text-xs text-gray-500">Intervention Strategy</p>
              <span className="inline-flex rounded-full bg-mento-navy px-2.5 py-1 text-[11px] font-semibold text-white">
                {assistance}
              </span>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                03 · Narrative
              </p>
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-4 text-sm text-gray-400">
                {description || 'Description content will be rendered here in the final output...'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-[11px] text-gray-400">
            <span>© 2024 Mento Educational Systems</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="lock" className="size-3" />
              Secure Template
            </span>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-[var(--sidebar-width)] right-0 z-20 border-t border-gray-200 bg-white/95 px-[var(--portal-padding-x)] py-3 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-500">Last saved: Just now</p>
          <div className="flex flex-wrap items-center gap-2">
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
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-mento-navy transition hover:bg-gray-100"
            >
              <Icon name="eye" className="size-4" />
              Preview Full
            </button>
            <Link
              href="/templates"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3 21l18-9L3 3l3 9zm0 0h7" />
              </svg>
              Publish Template
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
