'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/icons';

const TIME_SLOTS = [
  { label: '08:00 AM', disabled: false },
  { label: '10:30 AM', disabled: false },
  { label: '01:00 PM', disabled: false },
  { label: '02:30 PM', disabled: false },
  { label: '04:00 PM', disabled: false },
  { label: '05:30 PM', disabled: true },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/** October 2023 starts on Sunday */
const OCT_2023_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const RECOMMENDED = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  name: 'Mark Tuan',
  title: 'AI Research Fellow Stanford',
  rating: '5.0',
  match: '99%',
}));

const PREVIOUS = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  index: i + 1,
  name: 'Habumugisha Olivier',
  rating: '4.9',
  field: 'Career advice',
  sessions: '43',
}));

export function RequestAppointmentForm() {
  const [category, setCategory] = useState('Software Architecture');
  const [selectedDay, setSelectedDay] = useState(13);
  const [selectedTime, setSelectedTime] = useState('01:00 PM');
  const [purpose, setPurpose] = useState('');
  const [prevSelected, setPrevSelected] = useState<Set<string>>(new Set());

  function togglePrev(id: string) {
    setPrevSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      {/* Appointment Details */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-urbanist text-lg font-bold text-mento-navy">Appointment Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Specify your mentorship needs and select a time.
            </p>
          </div>
          <span className="flex size-9 items-center justify-center rounded-lg bg-[#eef1f8] text-mento-navy">
            <Icon name="calendar" className="size-4" />
          </span>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-mento-navy">
              Mentorship Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 pr-10 text-sm text-mento-navy outline-none focus:border-mento-navy"
              >
                <option>Software Architecture</option>
                <option>Career Guidance</option>
                <option>Academic Support</option>
                <option>Mental Wellness</option>
              </select>
              <Icon
                name="chevron-down"
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-mento-navy">
              Select Date
            </label>
            <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
              {/* Mini calendar */}
              <div className="rounded-xl border border-gray-200 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-50" aria-label="Previous month">
                    <Icon name="chevron-right" className="size-4 rotate-180" />
                  </button>
                  <p className="text-sm font-semibold text-mento-navy">October 2023</p>
                  <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-50" aria-label="Next month">
                    <Icon name="chevron-right" className="size-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-400">
                  {DAYS.map(d => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {OCT_2023_DAYS.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`flex size-8 items-center justify-center rounded-full text-xs font-medium transition ${
                        selectedDay === day
                          ? 'bg-mento-navy text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="grid grid-cols-2 content-start gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot.label}
                    type="button"
                    disabled={slot.disabled}
                    onClick={() => setSelectedTime(slot.label)}
                    className={`h-10 rounded-lg border text-xs font-semibold transition ${
                      slot.disabled
                        ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                        : selectedTime === slot.label
                          ? 'border-[#c5d0e8] bg-[#e8eef8] text-mento-navy'
                          : 'border-gray-200 bg-white text-mento-navy hover:bg-gray-50'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-mento-navy">
              Session Purpose
            </label>
            <textarea
              rows={4}
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              placeholder="What is the main purpose of the session"
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
            />
          </div>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center rounded-lg bg-mento-navy text-sm font-bold text-white transition hover:bg-[#152038]"
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="flex flex-col rounded-xl bg-mento-navy p-5 text-white shadow-lg">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#a5b4fc]">
              <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zm6 10l.9 3.1L22 16l-3.1.9L18 20l-.9-3.1L14 16l3.1-.9L18 12zM6 14l.75 2.5L9.5 17.5 6.75 18.25 6 21l-.75-2.75L2.5 17.5l2.75-.75L6 14z" />
            </svg>
          </span>
          <h3 className="font-urbanist text-sm font-bold">Google Gemini 2.5 Flash</h3>
        </div>

        <div className="mt-4 rounded-xl bg-white/10 p-4 text-[13px] leading-relaxed text-white/85">
          Based on your interest in &apos;Code&apos; and &apos;Careers&apos;, I&apos;ve identified two mentors
          who excel in full-stack architecture and technical interview prep. Their current
          availability aligns perfectly with your selected Friday slot.
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-white/5">
          <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr] gap-2 border-b border-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white/50">
            <span>Teacher</span>
            <span>Rating</span>
            <span>% Match</span>
            <span>Action</span>
          </div>
          <ul>
            {RECOMMENDED.map(m => (
              <li
                key={m.id}
                className="grid grid-cols-[1.4fr_0.6fr_0.6fr_0.7fr] items-center gap-2 border-b border-white/5 px-3 py-2.5 last:border-0"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#c7d2fe] text-[10px] font-bold text-mento-navy">
                    MT
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">{m.name}</p>
                    <p className="truncate text-[10px] text-white/50">{m.title}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-300">★ {m.rating}</span>
                <span className="text-xs font-semibold">{m.match}</span>
                <button
                  type="button"
                  className="rounded-md bg-white px-2 py-1 text-[10px] font-bold text-mento-navy transition hover:bg-white/90"
                >
                  request
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="mt-auto flex h-11 w-full items-center justify-center rounded-lg bg-white text-sm font-bold text-mento-navy transition hover:bg-white/90"
        >
          View All recommendations
        </button>
      </div>

      {/* Previously Mentored By */}
      <div className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-gray-500">
          Previously Mentored By
        </p>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="bg-mento-navy text-white">
                  <th className="w-10 px-3 py-3" />
                  <th className="px-2 py-3 text-[11px] font-semibold uppercase tracking-wide">#</th>
                  <th className="px-2 py-3 text-[11px] font-semibold uppercase tracking-wide">Mentor</th>
                  <th className="px-2 py-3 text-[11px] font-semibold uppercase tracking-wide">Rating</th>
                  <th className="px-2 py-3 text-[11px] font-semibold uppercase tracking-wide">Field</th>
                  <th className="px-2 py-3 text-[11px] font-semibold uppercase tracking-wide">Sessions</th>
                </tr>
              </thead>
              <tbody>
                {PREVIOUS.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#f8f9fb]' : 'bg-white'}`}
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={prevSelected.has(row.id)}
                        onChange={() => togglePrev(row.id)}
                        aria-label={`Select ${row.name}`}
                        className="size-4 rounded border-gray-300 accent-mento-navy"
                      />
                    </td>
                    <td className="px-2 py-3 text-sm text-gray-600">{row.index}</td>
                    <td className="px-2 py-3 text-sm font-medium text-mento-navy">{row.name}</td>
                    <td className="px-2 py-3 text-sm font-semibold text-teal-600">
                      ★ {row.rating}
                    </td>
                    <td className="px-2 py-3 text-sm text-gray-600">{row.field}</td>
                    <td className="px-2 py-3 text-sm text-gray-600">{row.sessions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Session Guidelines */}
      <div className="flex flex-col rounded-xl border border-[#dce3f0] bg-[#eef1f8] p-5">
        <div className="flex items-center gap-2">
          <h3 className="font-urbanist text-base font-bold text-mento-navy">Session Guidelines</h3>
          <Icon name="help" className="size-4 text-mento-navy/60" />
        </div>
        <ul className="mt-4 space-y-3">
          {[
            'Requests are typically processed within 24 hours.',
            'Cancellations require a minimum of 4 hours notice.',
            'Bring specific code repositories or portfolios to session.',
          ].map(item => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-mento-navy/80">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mento-navy text-white">
                <Icon name="check" className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/appointments"
          className="mt-auto flex h-12 w-full items-center justify-center rounded-lg bg-mento-navy text-sm font-bold text-white transition hover:bg-[#152038]"
        >
          View All Appointments
        </Link>
      </div>
    </div>
  );
}
