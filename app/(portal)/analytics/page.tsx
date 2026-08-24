import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

const METRICS = [
  { label: 'Total Appointments', value: '287', href: '/analytics/total-appointments' },
  { label: 'Pending Check-ins', value: '12', href: '/analytics/pending' },
  { label: 'Active Mentors', value: '17', href: '/analytics/active-mentors' },
  { label: 'Unassigned Mentees', value: '5', href: '/analytics/unassigned' },
  { label: 'Completed Sessions', value: '1,240', href: '/analytics/completed' },
];

export default async function AnalyticsPage() {
  await requirePage('analytics:view_system');

  return (
    <PageSection title="Analytics" description="Institution-wide mentorship metrics">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map(m => (
          <Link
            key={m.href}
            href={m.href}
            className="mento-card mento-card-interactive group block p-6"
          >
            <p className="font-urbanist text-sm font-medium text-mento-muted">{m.label}</p>
            <p className="mt-2 font-inter text-3xl font-bold text-mento-navy">{m.value}</p>
            <span className="mt-3 inline-block font-urbanist text-xs font-bold text-mento-navy opacity-0 transition group-hover:opacity-100">
              View details →
            </span>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
