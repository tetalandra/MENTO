'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icons';

const DAYS = [
  { key: 'mon', label: 'M', name: 'Monday' },
  { key: 'tue', label: 'T', name: 'Tuesday' },
  { key: 'wed', label: 'W', name: 'Wednesday' },
  { key: 'thu', label: 'T', name: 'Thursday' },
  { key: 'fri', label: 'F', name: 'Friday' },
  { key: 'sat', label: 'S', name: 'Saturday' },
  { key: 'sun', label: 'S', name: 'Sunday' },
] as const;

const DEFAULT_BIO =
  'Dr. Oliver has over 15 years of experience in computational linguistics. Previously, she served as Lead Researcher at the Institute for Advanced Studies and has published over 40 peer-reviewed articles.';

export function TeacherPortfolio() {
  const [skills, setSkills] = useState(['Data Science', 'Academic Writing', 'Research Ethics']);
  const [skillDraft, setSkillDraft] = useState('');
  const [addingSkill, setAddingSkill] = useState(false);
  const [bio, setBio] = useState(DEFAULT_BIO);
  const [selectedDays, setSelectedDays] = useState<Set<string>>(
    new Set(['mon', 'tue', 'wed', 'thu']),
  );
  const [slots, setSlots] = useState<Record<string, { start: string; end: string }>>({
    mon: { start: '09:00 AM', end: '02:00 PM' },
    tue: { start: '09:00 AM', end: '02:00 PM' },
    wed: { start: '09:00 AM', end: '02:00 PM' },
    thu: { start: '09:00 AM', end: '02:00 PM' },
  });
  const [buffer, setBuffer] = useState<'15m' | '30m'>('15m');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(false);

  function toggleDay(key: string) {
    setSelectedDays(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        setSlots(s => {
          const copy = { ...s };
          delete copy[key];
          return copy;
        });
      } else {
        next.add(key);
        setSlots(s => ({
          ...s,
          [key]: s[key] ?? { start: '09:00 AM', end: '02:00 PM' },
        }));
      }
      return next;
    });
  }

  function removeSkill(skill: string) {
    setSkills(prev => prev.filter(s => s !== skill));
  }

  function addSkill() {
    const value = skillDraft.trim();
    if (!value || skills.includes(value)) return;
    setSkills(prev => [...prev, value]);
    setSkillDraft('');
    setAddingSkill(false);
  }

  function addTimeSlot() {
    const nextDay = DAYS.find(d => !selectedDays.has(d.key));
    if (!nextDay) return;
    toggleDay(nextDay.key);
  }

  const activeDaySlots = DAYS.filter(d => selectedDays.has(d.key));

  return (
    <section className="space-y-6 pb-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
            Teacher Portfolio
          </h2>
          <p className="mt-1 max-w-xl text-sm text-gray-500">
            Customize your professional identity and manage your availability to ensure a seamless
            mentorship experience for your mentees.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search resources or records..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-mento-navy"
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Specialization Management */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="inline-flex items-center gap-2 font-urbanist text-base font-bold text-mento-navy">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="size-5 text-mento-navy"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Specialization Management
            </h3>
            <button
              type="button"
              onClick={() => setSaved(true)}
              className="inline-flex h-9 items-center gap-2 rounded-lg text-sm font-semibold text-[#2f6fed] transition hover:underline"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {saved ? 'Saved' : 'Save Changes'}
            </button>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-mento-navy">Expertise &amp; Skills</p>
            <div className="flex flex-wrap items-center gap-2">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#eef1f8] px-3 py-1.5 text-xs font-semibold text-mento-navy"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="text-gray-400 transition hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
              {addingSkill ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    addSkill();
                  }}
                  className="inline-flex items-center gap-1"
                >
                  <input
                    autoFocus
                    value={skillDraft}
                    onChange={e => setSkillDraft(e.target.value)}
                    onBlur={() => {
                      if (!skillDraft.trim()) setAddingSkill(false);
                    }}
                    placeholder="Skill name"
                    className="h-8 w-32 rounded-full border border-gray-200 px-3 text-xs outline-none focus:border-mento-navy"
                  />
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setAddingSkill(true)}
                  className="text-xs font-semibold text-[#2f6fed] hover:underline"
                >
                  Add more
                </button>
              )}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-mento-navy">Professional Experience</p>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={5}
              className="w-full resize-y rounded-xl border border-gray-200 bg-[#fafbfc] px-4 py-3 text-sm leading-relaxed text-gray-700 outline-none focus:border-mento-navy"
            />
          </div>

          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold text-mento-navy">Mentorship Portfolio</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#fafbfc] p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eef1f8] text-mento-navy">
                  <Icon name="file-text" className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-mento-navy">CV.pdf</p>
                  <p className="text-xs text-gray-500">Shared with 14 Mentees</p>
                </div>
              </div>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm font-semibold text-gray-500 transition hover:border-mento-navy hover:text-mento-navy"
              >
                <Icon name="plus" className="size-5" />
                Upload New Document
              </button>
            </div>
          </div>
        </div>

        {/* Availability Scheduler */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-6">
          <div className="mb-5">
            <h3 className="inline-flex items-center gap-2 font-urbanist text-base font-bold text-mento-navy">
              <Icon name="clock" className="size-5" />
              Availability Scheduler
            </h3>
            <p className="mt-1 text-sm text-gray-500">Set your recurring weekly availability</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {DAYS.map(day => {
              const active = selectedDays.has(day.key);
              return (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => toggleDay(day.key)}
                  aria-pressed={active}
                  className={`flex size-10 items-center justify-center rounded-full text-sm font-bold transition ${
                    active
                      ? 'bg-mento-navy text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 space-y-3">
            {activeDaySlots.map(day => (
              <div key={day.key} className="flex flex-wrap items-center gap-2">
                <span className="w-24 shrink-0 text-sm font-medium text-mento-navy">{day.name}</span>
                <input
                  type="text"
                  value={slots[day.key]?.start ?? '09:00 AM'}
                  onChange={e =>
                    setSlots(s => ({
                      ...s,
                      [day.key]: { ...s[day.key], start: e.target.value, end: s[day.key]?.end ?? '02:00 PM' },
                    }))
                  }
                  className="h-10 w-[110px] rounded-lg border border-gray-200 bg-white px-3 text-center text-sm text-mento-navy outline-none focus:border-mento-navy"
                />
                <span className="text-sm text-gray-400">to</span>
                <input
                  type="text"
                  value={slots[day.key]?.end ?? '02:00 PM'}
                  onChange={e =>
                    setSlots(s => ({
                      ...s,
                      [day.key]: { ...s[day.key], end: e.target.value, start: s[day.key]?.start ?? '09:00 AM' },
                    }))
                  }
                  className="h-10 w-[110px] rounded-lg border border-gray-200 bg-white px-3 text-center text-sm text-mento-navy outline-none focus:border-mento-navy"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addTimeSlot}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-[#fafbfc] text-sm font-semibold text-mento-navy transition hover:bg-gray-100"
          >
            <Icon name="plus" className="size-4" />
            Add Time Slot
          </button>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-mento-navy">Automatic Buffer</p>
            <div className="mt-3 inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
              {(['15m', '30m'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBuffer(opt)}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                    buffer === opt
                      ? 'bg-mento-navy text-white shadow-sm'
                      : 'text-gray-500 hover:text-mento-navy'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-500">
              Buffers prevent back-to-back sessions by adding mandatory breaks.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-mento-navy p-6 text-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
            Total Mentorship Hours
          </p>
          <p className="mt-2 font-urbanist text-4xl font-bold tracking-tight">1,240</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-mento-navy p-6 text-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
            Active Mentees
          </p>
          <p className="mt-2 font-urbanist text-4xl font-bold tracking-tight">28</p>
          <Icon
            name="users"
            className="pointer-events-none absolute -bottom-2 -right-2 size-24 text-white/10"
          />
        </div>
      </div>
    </section>
  );
}
