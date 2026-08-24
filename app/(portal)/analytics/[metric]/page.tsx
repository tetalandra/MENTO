import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { DataTable, PageSection } from '@/components/portal/PageSection';

const TITLES: Record<string, string> = {
  'total-appointments': 'Total Appointments',
  pending: 'Pending Check-ins',
  'active-mentors': 'Active Mentors',
  unassigned: 'Unassigned Mentees',
  completed: 'Completed Sessions',
};

export default async function AnalyticsDetailPage({ params }: { params: Promise<{ metric: string }> }) {
  await requirePage('analytics:view_system');
  const { metric } = await params;
  const title = TITLES[metric] ?? 'Analytics Detail';

  return (
    <PageSection
      title={title}
      description="Drill-down analytics view"
      actions={[{ label: '← Back to Analytics', href: '/analytics' }]}
    >
      <DataTable
        columns={['Name', 'Value', 'Trend', 'Period']}
        rows={[
          { cells: ['Sample A', '142', '+12%', 'This month'] },
          { cells: ['Sample B', '89', '+5%', 'This month'] },
          { cells: ['Sample C', '56', '-2%', 'This month'] },
        ]}
      />
      <Link href="/dashboard" className="inline-block font-urbanist text-sm text-mento-navy hover:underline">
        Return to Dashboard
      </Link>
    </PageSection>
  );
}
