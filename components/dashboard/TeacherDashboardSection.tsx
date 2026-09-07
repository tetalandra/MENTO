import type { Session } from '@/lib/auth/types';
import { Can } from '@/components/rbac/Can';
import { Icon } from '@/components/ui/icons';
import { DashboardHeader } from '@/components/ui/MentoPrimitives';
import { AcademicCycleBadge, ActionCard, StatCard } from './widgets/StatCard';
import {
  AppointmentsTable,
  MentorshipFieldsChart,
  ParticipationChart,
} from './SharedDashboardWidgets';

interface TeacherDashboardSectionProps {
  session: Session;
}

export function TeacherDashboardSection({ session }: TeacherDashboardSectionProps) {
  const menteeRows = [
    { rank: 1, name: 'Sarah K.', field: 'Psychology', rating: '4.9', sessions: 42 },
    { rank: 2, name: 'James M.', field: 'Engineering', rating: '4.8', sessions: 38 },
    { rank: 3, name: 'Elena D.', field: 'Career Adv', rating: '4.8', sessions: 35 },
  ];

  return (
    <section className="space-y-6">
      <DashboardHeader
        title={`Welcome back, ${session.user.name}`}
        subtitle="You have 3 active mentees and 2 pending session reviews today."
        badge={<AcademicCycleBadge />}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Can session={session} permission="session:record">
          <ActionCard
            title="Record a mentorship session"
            description="Capture notes and outcomes from your latest meeting."
            actionLabel="Record Session"
            href="/sessions/record"
          />
        </Can>
        <StatCard
          label="My students"
          value={40}
          trend="+12"
          href="/profiles"
          icon={<Icon name="users" className="size-7 text-mento-navy" />}
        />
        <StatCard
          label="Total Mentors"
          value={10}
          trend="+5"
          href="/mentors"
          icon={<Icon name="file-text" className="size-7 text-mento-navy" />}
        />
        <StatCard
          label="Total Appointments"
          value={40}
          trend="+15"
          href="/appointments"
          icon={<Icon name="calendar" className="size-7 text-mento-navy" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ParticipationChart />
        <MentorshipFieldsChart />
      </div>

      <AppointmentsTable title="Top Performing Mentees" rows={menteeRows} viewAllHref="/profiles" />
    </section>
  );
}
