import { requirePage } from '@/lib/portal/guard';
import { DataTable, PageSection } from '@/components/portal/PageSection';

export default async function ReportsPage() {
  await requirePage('report:read');

  return (
    <PageSection title="Reports & AI Reports" description="Session reports and AI-generated insights">
      <DataTable
        columns={['Student', 'Date', 'Field', 'Summary', 'Status']}
        rows={[
          { cells: ['John Doe', 'Aug 20, 2026', 'Academic', 'Project proposal review', 'Complete'], href: '/profiles' },
          { cells: ['Jane Smith', 'Aug 18, 2026', 'Career', 'Internship guidance', 'Complete'], href: '/profiles' },
        ]}
      />
    </PageSection>
  );
}
