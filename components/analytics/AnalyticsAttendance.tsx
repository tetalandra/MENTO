'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icons';

const ATTENDANCE_KPIS = [
  { value: 27, label: 'Mentees', sub: 'Total Attendance' },
  { value: 11, label: 'Mentees', sub: 'Late Attendance' },
  { value: 2, label: 'Mentees', sub: 'Under-time Attendance' },
  { value: 3, label: 'Mentees', sub: 'Total absentees' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'];
const BOYS = [55, 72, 48, 85, 62, 78, 90];
const GIRLS = [42, 58, 38, 68, 52, 65, 75];

const FIELDS = [
  { label: 'Academic', value: 38, color: '#1a264a' },
  { label: 'Discipline', value: 27, color: '#3d4f7a' },
  { label: 'Mental', value: 20, color: '#6b7a99' },
  { label: 'Others', value: 15, color: '#c5cad6' },
];

const STUDENT_ROWS = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  name: 'Teta Ange Landra',
  sessions: 12,
  attendance: 10,
  absentees: 1,
  pct: '98%',
}));

const SESSIONS = ['Session1', 'Session2', 'Session3', 'Session4', 'Session5', 'Session6'];
const BOYS_TREND = [45, 62, 58, 72, 68, 85];
const GIRLS_TREND = [38, 48, 52, 55, 60, 58];

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

function AttendanceRing({ value }: { value: number }) {
  const pct = Math.min(value / 30, 1) * 100;
  const r = 18;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div className="relative flex size-11 shrink-0 items-center justify-center">
      <svg viewBox="0 0 44 44" className="size-11 -rotate-90" aria-hidden>
        <circle cx="22" cy="22" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="#1a264a"
          strokeWidth="4"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-urbanist text-xs font-bold text-mento-navy">{value}</span>
    </div>
  );
}

function ParticipationChart() {
  const [period, setPeriod] = useState<'Annually' | 'Monthly' | 'Weekly'>('Weekly');
  const max = 100;
  const chartH = 180;
  const chartW = 420;
  const padL = 36;
  const padB = 28;
  const groupW = (chartW - padL) / MONTHS.length;
  const barW = 12;

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-urbanist text-base font-bold text-mento-navy">
          Monthly Participation Trends
        </h3>
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

      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-[#1a264a]" /> Boys
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-[#9ca3af]" /> Girls
        </span>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH + padB}`} className="mt-2 w-full" role="img" aria-label="Participation trends">
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
          const bH = (BOYS[i] / max) * chartH;
          const gH = (GIRLS[i] / max) * chartH;
          return (
            <g key={m}>
              <rect x={x - barW - 2} y={chartH - bH} width={barW} height={bH} rx={2} fill="#1a264a" />
              <rect x={x + 2} y={chartH - gH} width={barW} height={gH} rx={2} fill="#9ca3af" />
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

function MentorshipFieldsChart() {
  const slices = pieSlices(FIELDS, 90, 90, 70);
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
      <h3 className="text-center font-urbanist text-base font-bold text-mento-navy">
        Mentorship Fields
      </h3>
      <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <svg viewBox="0 0 180 180" className="size-[160px] shrink-0" role="img" aria-label="Mentorship fields">
          {slices.map(s => (
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

function SessionTrendChart() {
  const chartW = 360;
  const chartH = 160;
  const padX = 40;
  const padY = 24;

  const boysCoords = BOYS_TREND.map((v, i) => ({
    x: round(padX + (i / (SESSIONS.length - 1)) * (chartW - padX * 2)),
    y: round(padY + (1 - v / 100) * (chartH - padY * 2)),
  }));
  const girlsCoords = GIRLS_TREND.map((v, i) => ({
    x: round(padX + (i / (SESSIONS.length - 1)) * (chartW - padX * 2)),
    y: round(padY + (1 - v / 100) * (chartH - padY * 2)),
  }));

  const boysLine = boysCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const girlsLine = girlsCoords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const boysArea = `${boysLine} L ${boysCoords[boysCoords.length - 1].x} ${chartH - padY} L ${boysCoords[0].x} ${chartH - padY} Z`;

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
      <div className="flex items-center justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600"
        >
          6 Recent session
          <Icon name="chevron-down" className="size-3.5" />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-[#1a264a]" /> Boys
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 border-t-2 border-dashed border-[#9ca3af]" /> Girls
        </span>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH + 28}`} className="mt-2 w-full" role="img" aria-label="Session trend">
        {[0, 50, 75, 100].map(v => {
          const y = round(padY + (1 - v / 100) * (chartH - padY * 2));
          return (
            <g key={v}>
              <line x1={padX} y1={y} x2={chartW - padX} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
              <text x={padX - 6} y={y + 3} textAnchor="end" className="fill-gray-400" fontSize="9">
                {v === 0 ? '0' : `${v}%`}
              </text>
            </g>
          );
        })}
        <path d={boysArea} fill="#1a264a" fillOpacity="0.08" />
        <path d={boysLine} fill="none" stroke="#1a264a" strokeWidth="2" strokeLinecap="round" />
        <path
          d={girlsLine}
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        {SESSIONS.map((s, i) => (
          <text
            key={s}
            x={boysCoords[i].x}
            y={chartH + 18}
            textAnchor="middle"
            className="fill-gray-400"
            fontSize="9"
          >
            {s}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function AnalyticsAttendance() {
  const [page, setPage] = useState(1);

  return (
    <section className="space-y-5">
      {/* Recent Mentorship Session */}
      <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-urbanist text-base font-bold text-mento-navy">
            Recent Mentorship Session
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-600"
            >
              Weekly
              <Icon name="chevron-down" className="size-3.5" />
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white transition hover:bg-[#152038]"
            >
              <Icon name="download" className="size-4" />
              Download
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-start gap-4 border-b border-gray-100 pb-5">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#dbe4f5] font-urbanist text-lg font-bold text-mento-navy">
            OH
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-urbanist text-base font-bold text-mento-navy">
              Tr. Olivier Habumugisha
            </p>
            <p className="text-sm text-gray-500">ID: 2021-0001</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Phone number
              </p>
              <p className="mt-1 text-sm font-medium text-mento-navy">+250 78126109078</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Email</p>
              <p className="mt-1 text-sm font-medium text-mento-navy">
                olivierhabumugisha@gmail.com
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                Category
              </p>
              <p className="mt-1 text-sm font-medium text-mento-navy">
                Academics, Mental Health
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ATTENDANCE_KPIS.map(kpi => (
            <div
              key={kpi.sub}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[#fafbfc] px-4 py-3"
            >
              <AttendanceRing value={kpi.value} />
              <div>
                <p className="font-urbanist text-lg font-bold text-mento-navy">
                  {kpi.value} {kpi.label}
                </p>
                <p className="text-xs text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button type="button" className="text-sm font-semibold text-[#2f6fed] hover:underline">
            View All
          </button>
        </div>
      </div>

      {/* Charts grid — 2×2 so Mentorship Fields doesn't stretch with the table column */}
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
        <ParticipationChart />
        <MentorshipFieldsChart />
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="font-urbanist text-base font-bold text-mento-navy">
              Top performing students
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-mento-navy text-white">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                    Student-name
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                    Total sessions
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                    Total attendance
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">
                    Total absentees
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide">%</th>
                </tr>
              </thead>
              <tbody>
                {STUDENT_ROWS.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#f8f9fb]' : 'bg-white'}`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-mento-navy">{row.name}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{row.sessions}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{row.attendance}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{row.absentees}</td>
                    <td className="px-3 py-3 text-sm font-semibold text-mento-navy">{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-500">Showing 1-5 of 1,248 teachers</p>
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
        <SessionTrendChart />
      </div>
    </section>
  );
}
