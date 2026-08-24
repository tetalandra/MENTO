import { requirePage } from '@/lib/portal/guard';
import { DataTable, PageSection } from '@/components/portal/PageSection';

export default async function PeerReviewPage() {
  await requirePage('peer-review:read');

  return (
    <PageSection title="Peer Review" description="Review peer mentorship activities">
      <DataTable
        columns={['Student', 'Reviewer', 'Session', 'Score', 'Status']}
        rows={[
          { cells: ['John Doe', 'Jane Smith', 'Project Review', '4.5/5', 'Pending'] },
          { cells: ['Alice K.', 'Bob M.', 'Code Review', '5/5', 'Complete'] },
        ]}
      />
    </PageSection>
  );
}
