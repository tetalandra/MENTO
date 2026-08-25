'use client';

import { useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'];
const APPOINTMENTS = [42, 58, 48, 72, 55, 68, 78];
const SESSIONS = [28, 38, 52, 45, 62, 48, 58];

export function ParticipationBarChart() {
  const [period, setPeriod] = useState<'Annually' | 'Monthly' | 'Weekly'>('Weekly');
  const max = 100;
  const chartH = 180;
  const chartW = 420;
  const padL = 36;
  const padB = 28;
  const groupW = (chartW - padL) / MONTHS.length;
  const barW = 12;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-urbanist text-base font-bold text-mento-navy">Monthly Participation Trends</h3>
        <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs font-semibold">
          {(['Annually', 'Monthly', 'Weekly'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-md px-3 py-1.5 transition ${
                period === p ? 'bg-white text-mento-navy shadow-sm' : 'text-gray-500 hover:text-mento-navy'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-[#1a264a]" /> Appointments
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-[#9ca3af]" /> Sessions
        </span>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH + padB}`} className="mt-2 w-full flex-1" role="img" aria-label="Participation trends">
        {[0, 20, 40, 60, 80, 100].map(v => {
          const y = chartH - (v / max) * chartH;
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={chartW} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
              <text x={padL - 8} y={y + 3} textAnchor="end" className="fill-gray-400" fontSize="10">
                {v}
              </text>
            </g>
          );
        })}
        {MONTHS.map((m, i) => {
          const x = padL + i * groupW + groupW / 2;
          const aH = (APPOINTMENTS[i] / max) * chartH;
          const sH = (SESSIONS[i] / max) * chartH;
          return (
            <g key={m}>
              <rect x={x - barW - 2} y={chartH - aH} width={barW} height={aH} rx={2} fill="#1a264a" />
              <rect x={x + 2} y={chartH - sH} width={barW} height={sH} rx={2} fill="#9ca3af" />
              <text x={x} y={chartH + 16} textAnchor="middle" className="fill-gray-500" fontSize="10">
                {m}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const FIELDS = [
  { label: 'Academic', value: 38, color: '#1a264a' },
  { label: 'Discipline', value: 27, color: '#3d4f7a' },
  { label: 'Mental', value: 20, color: '#6b7a99' },
  { label: 'Others', value: 15, color: '#c5cad6' },
];

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

function pieSlices(
  items: { label: string; value: number; color: string }[],
  cx: number,
  cy: number,
  r: number,
) {
  const total = items.reduce((s, f) => s + f.value, 0);
  let angle = -90;

  return items.map(f => {
    const start = angle;
    const sweep = (f.value / total) * 360;
    angle += sweep;
    const end = angle;
    const large = sweep > 180 ? 1 : 0;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = round(cx + r * Math.cos(toRad(start)));
    const y1 = round(cy + r * Math.sin(toRad(start)));
    const x2 = round(cx + r * Math.cos(toRad(end)));
    const y2 = round(cy + r * Math.sin(toRad(end)));
    return {
      ...f,
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
    };
  });
}

const MENTORSHIP_SLICES = pieSlices(FIELDS, 90, 90, 70);

export function MentorshipFieldsPie() {
  return (
    <div className="flex h-full flex-col">
      <h3 className="font-urbanist text-base font-bold text-mento-navy">Mentorship Fields</h3>
      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-6 sm:flex-row">
        <svg viewBox="0 0 180 180" className="size-[160px] shrink-0" role="img" aria-label="Mentorship fields">
          {MENTORSHIP_SLICES.map(s => (
            <path key={s.label} d={s.d} fill={s.color} />
          ))}
        </svg>
        <ul className="space-y-2.5">
          {FIELDS.map(f => (
            <li key={f.label} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="size-2.5 rounded-full" style={{ background: f.color }} />
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ATTENDANCE_SLICES = pieSlices(
  [
    { label: 'Girls', value: 60, color: '#1a264a' },
    { label: 'Boys', value: 40, color: '#c5cad6' },
  ],
  90,
  90,
  70,
);

export function AttendanceDonut() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-urbanist text-base font-bold text-mento-navy">Attendance Statistics</h3>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600"
        >
          Monthly
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="relative mx-auto mt-4 flex flex-1 items-center justify-center">
        <svg viewBox="0 0 180 180" className="size-[180px]" role="img" aria-label="Attendance by gender">
          {ATTENDANCE_SLICES.map(s => (
            <path key={s.label} d={s.d} fill={s.color} />
          ))}
          <text x="48" y="78" fill="white" fontSize="11" fontWeight="700">
            GIRLS
          </text>
          <text x="52" y="96" fill="white" fontSize="16" fontWeight="700">
            60%
          </text>
          <text x="118" y="100" fill="#1a264a" fontSize="11" fontWeight="700">
            BOYS
          </text>
          <text x="120" y="118" fill="#1a264a" fontSize="16" fontWeight="700">
            40%
          </text>
        </svg>
      </div>

      <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#1a264a]" /> Girls
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#c5cad6]" /> Boys
        </span>
      </div>
    </div>
  );
}

const ACTIVE_POINTS = [
  { date: '2025-10-15', value: 42 },
  { date: '2025-10-16', value: 55 },
  { date: '2025-10-17', value: 48 },
  { date: '2025-10-18', value: 72 },
  { date: '2025-10-19', value: 65 },
  { date: '2025-10-20', value: 88 },
  { date: '2025-10-21', value: 78 },
];

const ACTIVE_W = 420;
const ACTIVE_H = 200;
const ACTIVE_PAD_X = 16;
const ACTIVE_PAD_Y = 20;

const ACTIVE_COORDS = ACTIVE_POINTS.map((p, i) => {
  const x = round(ACTIVE_PAD_X + (i / (ACTIVE_POINTS.length - 1)) * (ACTIVE_W - ACTIVE_PAD_X * 2));
  const y = round(ACTIVE_PAD_Y + (1 - p.value / 100) * (ACTIVE_H - ACTIVE_PAD_Y * 2));
  return { ...p, x, y };
});

const ACTIVE_LINE = ACTIVE_COORDS.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
const ACTIVE_AREA = `${ACTIVE_LINE} L ${ACTIVE_COORDS[ACTIVE_COORDS.length - 1].x} ${ACTIVE_H - ACTIVE_PAD_Y} L ${ACTIVE_COORDS[0].x} ${ACTIVE_H - ACTIVE_PAD_Y} Z`;

export function ActiveUsersAreaChart() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-urbanist text-base font-bold text-mento-navy">Active users</h3>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600"
        >
          Monthly
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <svg viewBox={`0 0 ${ACTIVE_W} ${ACTIVE_H + 24}`} className="mt-4 w-full flex-1" role="img" aria-label="Active users">
        <defs>
          <linearGradient id="activeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map(v => {
          const y = round(ACTIVE_PAD_Y + (1 - v / 100) * (ACTIVE_H - ACTIVE_PAD_Y * 2));
          return (
            <line key={v} x1={ACTIVE_PAD_X} y1={y} x2={ACTIVE_W - ACTIVE_PAD_X} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
          );
        })}
        <path d={ACTIVE_AREA} fill="url(#activeFill)" />
        <path d={ACTIVE_LINE} fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {ACTIVE_COORDS.map(c => (
          <circle key={c.date} cx={c.x} cy={c.y} r="4" fill="white" stroke="#7c3aed" strokeWidth="2" />
        ))}
        {ACTIVE_COORDS.map((c, i) =>
          i % 2 === 0 || i === ACTIVE_COORDS.length - 1 ? (
            <text key={`t-${c.date}`} x={c.x} y={ACTIVE_H + 14} textAnchor="middle" className="fill-gray-400" fontSize="9">
              {c.date}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  );
}
