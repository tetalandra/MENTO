import Link from 'next/link';
import { Icon } from '@/components/ui/icons';
import {
  ParticipationBarChart,
  MentorshipFieldsPie,
  AttendanceDonut,
  ActiveUsersAreaChart,
} from './DashboardCharts';

/**
 * Student dashboard mirrors the admin System Analytics layout
 * (same charts and chrome) without the institution-level KPI cards.
 */
export function StudentAnalyticsSection() {
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
            href="/appointments/request"
            className="inline-flex items-center gap-2 rounded-lg bg-mento-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#152038]"
          >
            <Icon name="plus" className="size-4" />
            Request Appointment
          </Link>
        </div>
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
