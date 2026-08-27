import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/icons';

const WEEKLY_DATA = [
  { day: 'Mon', appointments: 65, sessions: 40 },
  { day: 'Tue', appointments: 80, sessions: 55 },
  { day: 'Wed', appointments: 45, sessions: 30 },
  { day: 'Thu', appointments: 90, sessions: 70 },
  { day: 'Fri', appointments: 70, sessions: 50 },
  { day: 'Sat', appointments: 35, sessions: 20 },
  { day: 'Sun', appointments: 25, sessions: 15 },
];

export function ParticipationChart() {
  const max = 100;
  return (
    <div className="mento-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-urbanist text-xl font-semibold text-mento-navy">
          Weekly Participation Trends
        </h3>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-mento-navy" /> Appointments
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-[#74777f]" /> Sessions
          </span>
        </div>
      </div>
      <div className="flex h-48 items-end gap-3">
        {WEEKLY_DATA.map(d => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full flex-1 items-end justify-center gap-1">
              <div
                className="w-3 rounded-t bg-mento-navy/80"
                style={{ height: `${(d.appointments / max) * 100}%` }}
              />
              <div
                className="w-3 rounded-t bg-[#74777f]/80"
                style={{ height: `${(d.sessions / max) * 100}%` }}
              />
            </div>
            <span className="font-inter text-xs text-mento-muted">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MentorshipFieldsChart() {
  const fields = [
    { label: 'Academic', pct: 38, color: '#1a264a' },
    { label: 'Discipline', pct: 36, color: '#4a5568' },
    { label: 'Mental', pct: 23, color: '#828db8' },
    { label: 'Others', pct: 3, color: '#c6c6cd' },
  ];

  return (
    <div className="mento-card p-6">
      <h3 className="mb-6 font-urbanist text-xl font-semibold text-mento-navy">Mentorship Fields</h3>
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative mx-auto size-40 shrink-0">
          <svg viewBox="0 0 36 36" className="size-full -rotate-90">
            {
              fields.reduce<{ offset: number; elements: ReactNode[] }>(
                (acc, field) => {
                  const dash = field.pct;
                  const el = (
                    <circle
                      key={field.label}
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke={field.color}
                      strokeWidth="3.5"
                      strokeDasharray={`${dash} ${100 - dash}`}
                      strokeDashoffset={-acc.offset}
                    />
                  );
                  return { offset: acc.offset + dash, elements: [...acc.elements, el] };
                },
                { offset: 0, elements: [] as ReactNode[] },
              ).elements
            }
          </svg>
        </div>
        <ul className="flex-1 space-y-3">
          {fields.map(f => (
            <li key={f.label} className="flex items-center justify-between font-urbanist text-sm">
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-sm" style={{ backgroundColor: f.color }} />
                {f.label}
              </span>
              <span className="font-semibold">{f.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface TableRow {
  rank: number;
  name: string;
  field: string;
  rating: string;
  sessions: number;
}

export function AppointmentsTable({
  title,
  rows,
  showReschedule,
  viewAllHref = '/appointments',
}: {
  title: string;
  rows: TableRow[];
  showReschedule?: boolean;
  viewAllHref?: string;
}) {
  return (
    <div className="mento-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-mento-border/60 bg-mento-accent-light/40 px-6 py-4">
        <h3 className="font-urbanist text-lg font-bold text-mento-navy">{title}</h3>
        <Link
          href={viewAllHref}
          className="mento-btn-ghost text-sm !text-blue-600 hover:!bg-blue-50"
        >
          View all
          <Icon name="arrow-right" className="size-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-urbanist text-sm">
          <thead className="border-b border-mento-border/60 bg-mento-accent-light/30 text-xs uppercase text-mento-muted">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Mentor</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Field</th>
              <th className="px-6 py-3">Sessions</th>
              {showReschedule && <th className="px-6 py-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr
                key={row.rank}
                className="mento-table-row border-b border-mento-border/40 last:border-0"
              >
                <td className="px-6 py-4">{row.rank}</td>
                <td className="px-6 py-4 font-semibold">
                  <Link href="/profiles" className="hover:text-mento-navy hover:underline">
                    {row.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1">
                    <Icon name="star" className="size-4 text-amber-500" />
                    {row.rating}
                  </span>
                </td>
                <td className="px-6 py-4">{row.field}</td>
                <td className="px-6 py-4">{row.sessions}</td>
                {showReschedule && (
                  <td className="px-6 py-4">
                    <Link
                      href="/appointments/request"
                      className="mento-btn-primary !px-3 !py-1.5 !text-xs"
                    >
                      Reschedule
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
