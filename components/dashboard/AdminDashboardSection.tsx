import Link from 'next/link';
import type { Session } from '@/lib/auth/types';
import { Icon } from '@/components/ui/icons';
import {
  ParticipationBarChart,
  MentorshipFieldsPie,
  AttendanceDonut,
  ActiveUsersAreaChart,
} from './DashboardCharts';

interface AdminDashboardSectionProps {
  session: Session;
}

const KPIS = [
  {
    label: 'Total active mentors',
    value: '128',
    trend: '+ 7.86',
    trendPositive: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14v4m0 0v4m0-4h4m-4 0h-4" />
      </svg>
    ),
  },
  {
    label: 'Total active mentees',
    value: '478',
    trend: '+ 9.56',
    trendPositive: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    label: 'Assigned Students',
    value: '94.2%',
    trend: '+ 3.6',
    trendPositive: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Unassigned Students',
    value: '23',
    trend: '- 34',
    trendPositive: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12l-6 6m0-6l6 6" />
      </svg>
    ),
  },
];

export function AdminDashboardSection({ session }: AdminDashboardSectionProps) {
  void session;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
            System Analytics
          </h2>
          <p className="mt-1 font-urbanist text-sm text-gray-500">
            Real-time performance metrics and mentorship health overview.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <Icon name="calendar" className="size-4 text-gray-500" />
            Last 30 Days
          </button>
          <Link
            href="/users/add"
            className="inline-flex items-center gap-2 rounded-lg bg-mento-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#152038]"
          >
            <Icon name="plus" className="size-4" />
            Assign Student
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map(kpi => (
          <div
            key={kpi.label}
            className="rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-urbanist text-sm text-gray-500">{kpi.label}</p>
                <p className="mt-2 font-inter text-[28px] font-bold tracking-tight text-mento-navy">
                  {kpi.value}
                </p>
                <p
                  className={`mt-2 font-urbanist text-xs font-semibold ${
                    kpi.trendPositive ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  <span className="mr-1">{kpi.trendPositive ? '↗' : '↘'}</span>
                  {kpi.trend}
                  <span className="ml-1 font-normal text-gray-400">This month</span>
                </p>
              </div>
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#eef1f8] text-mento-navy">
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="min-h-[320px] rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <ParticipationBarChart />
        </div>
        <div className="min-h-[320px] rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <MentorshipFieldsPie />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="min-h-[300px] rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <AttendanceDonut />
        </div>
        <div className="min-h-[300px] rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
          <ActiveUsersAreaChart />
        </div>
      </div>
    </section>
  );
}
