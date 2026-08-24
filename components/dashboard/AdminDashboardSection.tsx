import Link from 'next/link';
import type { Session } from '@/lib/auth/types';
import { Can } from '@/components/rbac/Can';
import { Icon } from '@/components/ui/icons';
import { DashboardHeader } from '@/components/ui/MentoPrimitives';
import { AcademicCycleBadge, ActionCard, StatCard } from './widgets/StatCard';

interface AdminDashboardSectionProps {
  session: Session;
}

const ACTIVITIES = [
  {
    icon: 'clock' as const,
    time: 'Just now',
    text: 'Student Landra was added on the system by Admin as Student',
  },
  {
    icon: 'users' as const,
    time: '1H AGO',
    text: 'NZIZA Ange conducted mentorship session with student about Project Proposal',
  },
  {
    icon: 'check' as const,
    time: '3H AGO',
    text: 'Mentorship log validated: Group Activity #4',
  },
];

export function AdminDashboardSection({ session }: AdminDashboardSectionProps) {
  return (
    <section className="space-y-6">
      <DashboardHeader
        title={`Welcome back, ${session.user.name}`}
        subtitle="The system sustains 17 mentors and 287 mentees. All are active at the moment."
        badge={<AcademicCycleBadge />}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Can session={session} permission="user:create">
          <ActionCard
            title="Overview"
            description="Manage institutional users and mentorship assignments."
            actionLabel="+ Add New User"
            href="/users/add"
          />
        </Can>
        <StatCard label="Total Mentors" value={17} trend="3 Pending Check-ins" trendLabel="" href="/analytics/active-mentors" />
        <StatCard label="Total Mentees" value={287} trend="High Priority" trendLabel="" href="/analytics/unassigned" />
        <StatCard label="Total Mentorship Sessions" value={30} trend="+12" trendLabel="this month" href="/analytics/completed" />
      </div>

      <div className="mento-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-mento-border/60 bg-mento-accent-light/40 px-6 py-4">
          <h3 className="font-urbanist text-lg font-bold text-mento-navy">Recent activities</h3>
          <Link href="/users" className="mento-btn-ghost text-xs font-bold uppercase tracking-wide">
            Mark all read
          </Link>
        </div>
        <ul className="divide-y divide-mento-border/40">
          {ACTIVITIES.map((activity, i) => (
            <li key={i}>
              <Link
                href="/users"
                className="group flex items-center gap-4 px-6 py-5 transition hover:bg-mento-accent-light/60"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mento-accent-light text-mento-navy transition group-hover:scale-105">
                  <Icon name={activity.icon} className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-urbanist text-xs font-bold uppercase tracking-wide text-mento-muted">
                    {activity.time}
                  </p>
                  <p className="mt-1 font-urbanist text-sm leading-relaxed text-mento-text">{activity.text}</p>
                </div>
                <Icon name="chevron-right" className="size-4 text-mento-muted opacity-0 transition group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
