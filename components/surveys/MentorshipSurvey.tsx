'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

const RATINGS = [
  { value: 1, label: 'POOR', stars: 1 },
  { value: 2, label: 'FAIR', stars: 2 },
  { value: 3, label: 'GOOD', stars: 3 },
  { value: 4, label: 'GREAT', stars: 4 },
  { value: 5, label: 'PERFECT', stars: 5 },
] as const;

const EFFECTIVENESS = ['Highly Effective', 'Moderately', 'Poor'] as const;
const GROWTH_OPTIONS = ['Minimal Growth', 'Some Growth', 'Significant Growth', 'Exceptional Growth'];
const ALIGNMENT_OPTIONS = ['Not Aligned', 'Somewhat Aligned', 'Well Aligned', 'Perfectly Aligned'];

function SectionBadge({ n }: { n: number }) {
  return (
    <span className="mr-2 inline-flex size-7 items-center justify-center rounded-md bg-[#dbe4f5] font-urbanist text-sm font-bold text-mento-navy">
      {n}
    </span>
  );
}

function StarRow({ count, selected }: { count: number; selected: boolean }) {
  return (
    <div className="mt-2 flex justify-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`size-3.5 ${
            i < count
              ? selected
                ? 'fill-amber-300 text-amber-300'
                : 'fill-amber-400 text-amber-400'
              : selected
                ? 'fill-white/25 text-white/25'
                : 'fill-gray-200 text-gray-200'
          }`}
          aria-hidden
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

export function MentorshipSurvey() {
  const [satisfaction, setSatisfaction] = useState(5);
  const [effectiveness, setEffectiveness] = useState<(typeof EFFECTIVENESS)[number]>('Highly Effective');
  const [feedback, setFeedback] = useState<'Consistently' | 'Rarely'>('Consistently');
  const [valueScore, setValueScore] = useState(92);
  const [growth, setGrowth] = useState('Significant Growth');
  const [alignment, setAlignment] = useState('Perfectly Aligned');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => {
    let done = 0;
    if (satisfaction) done += 1;
    if (effectiveness) done += 1;
    if (feedback) done += 1;
    if (valueScore > 0) done += 1;
    if (growth) done += 1;
    if (alignment) done += 1;
    if (notes.trim()) done += 1;
    return Math.round((done / 7) * 100);
  }, [satisfaction, effectiveness, feedback, valueScore, growth, alignment, notes]);

  function discard() {
    setSatisfaction(5);
    setEffectiveness('Highly Effective');
    setFeedback('Consistently');
    setValueScore(92);
    setGrowth('Significant Growth');
    setAlignment('Perfectly Aligned');
    setNotes('');
    setSubmitted(false);
  }

  return (
    <section className="mx-auto max-w-4xl space-y-5 pb-8">
      {/* Header card */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-7">
        <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
          Mentorship Feedback Survey
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon name="clock" className="size-4 text-mento-navy" />
            <span className="font-semibold text-mento-navy">2 MINS</span>
            <span>Active Survey • Oct 2023</span>
          </div>
          <div className="w-full max-w-xs sm:w-56">
            <div className="mb-1.5 flex justify-end">
              <span className="text-xs font-semibold text-mento-navy">{progress}% Complete</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-mento-navy transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-500">
          Your insights help us refine the Mento experience. We value your honest feedback to build
          a better portal for every student.
        </p>
      </div>

      {/* 1 Overall Satisfaction */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-7">
        <h3 className="flex items-center font-urbanist text-base font-bold text-mento-navy">
          <SectionBadge n={1} />
          Overall Satisfaction
        </h3>
        <p className="mt-4 text-sm text-gray-600">
          How satisfied are you with guidance provided by your mentor?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {RATINGS.map(r => {
            const selected = satisfaction === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setSatisfaction(r.value)}
                className={`rounded-xl border px-2 py-4 text-center transition ${
                  selected
                    ? 'border-mento-navy bg-mento-navy text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <p className="font-urbanist text-lg font-bold">{r.value}</p>
                <p className={`mt-0.5 text-[10px] font-bold tracking-wide ${selected ? 'text-white/90' : 'text-gray-400'}`}>
                  {r.label}
                </p>
                <StarRow count={r.stars} selected={selected} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2 Mentorship Interaction */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-7">
        <h3 className="flex items-center font-urbanist text-base font-bold text-mento-navy">
          <SectionBadge n={2} />
          Mentorship Interaction
        </h3>

        <div className="mt-5 space-y-6">
          <div>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="message-circle" className="size-4 text-mento-navy" />
              Mentors communication clarity and responsiveness:
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {EFFECTIVENESS.map(opt => {
                const selected = effectiveness === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setEffectiveness(opt)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      selected
                        ? 'bg-mento-navy text-white'
                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4 text-mento-navy" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Does your mentor provide actionable feedback on your progress?:
            </p>
            <div className="mt-3 flex flex-wrap gap-6">
              {(['Consistently', 'Rarely'] as const).map(opt => (
                <label key={opt} className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                  <span
                    className={`flex size-5 items-center justify-center rounded-full border-2 ${
                      feedback === opt ? 'border-mento-navy' : 'border-gray-300'
                    }`}
                  >
                    {feedback === opt && <span className="size-2.5 rounded-full bg-mento-navy" />}
                  </span>
                  <input
                    type="radio"
                    name="feedback"
                    className="sr-only"
                    checked={feedback === opt}
                    onChange={() => setFeedback(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <Icon name="clipboard" className="size-4 text-mento-navy" />
              Rate the value of your mentorship sessions (From &apos;Not Valuable&apos; To &apos;Life
              Changing&apos;):
            </p>
            <div className="mt-4 px-1">
              <input
                type="range"
                min={0}
                max={100}
                value={valueScore}
                onChange={e => setValueScore(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-mento-navy"
              />
              <div className="mt-3 flex items-center justify-between text-[10px] font-bold tracking-wide text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 text-gray-400" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M8.5 15.5s1.5-1.5 3.5-1.5 3.5 1.5 3.5 1.5M9 10h.01M15 10h.01" />
                  </svg>
                  NOT VALUABLE
                </span>
                <span className="inline-flex items-center gap-1.5">
                  LIFE CHANGING
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 text-mento-navy" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Learning Outcomes */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-7">
        <h3 className="flex items-center font-urbanist text-base font-bold text-mento-navy">
          <SectionBadge n={3} />
          Learning Outcomes
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-[#fafbfc] p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#eef1f8] text-mento-navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Skill development
                </p>
                <p className="mt-1 text-sm font-medium text-mento-navy">How much have you improved?</p>
                <div className="relative mt-3">
                  <select
                    value={growth}
                    onChange={e => setGrowth(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  >
                    {GROWTH_OPTIONS.map(o => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-[#fafbfc] p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#eef1f8] text-mento-navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Goal alignment
                </p>
                <p className="mt-1 text-sm font-medium text-mento-navy">
                  Is the mentor helping you to reach your target?
                </p>
                <div className="relative mt-3">
                  <select
                    value={alignment}
                    onChange={e => setAlignment(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-sm text-mento-navy outline-none focus:border-mento-navy"
                  >
                    {ALIGNMENT_OPTIONS.map(o => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
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
      </div>

      {/* 4 Final Thoughts */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-7">
        <h3 className="flex items-center font-urbanist text-base font-bold text-mento-navy">
          <SectionBadge n={4} />
          Final Thoughts
        </h3>
        <p className="mt-4 text-sm text-gray-600">
          Is there anything specific about your mentor&apos;s approach you would like to highlight?
        </p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={5}
          placeholder="Feature requests, pain points, or praise..."
          className="mt-4 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
        />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={discard}
          className="text-sm font-semibold text-gray-500 transition hover:text-mento-navy"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-mento-navy px-6 text-sm font-semibold text-white transition hover:bg-[#152038]"
        >
          {submitted ? 'Submitted' : 'Submit Feedback'}
          <Icon name="chevron-right" className="size-4" />
        </button>
      </div>
    </section>
  );
}
