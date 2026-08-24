import { requirePage } from '@/lib/portal/guard';
import { DataTable, PageSection } from '@/components/portal/PageSection';

export default async function MentorsPage() {
  await requirePage('mentor:read');

  return (
    <PageSection title="Mentors" description="Browse available mentors at RCA">
      <DataTable
        columns={['Name', 'Field', 'Students', 'Rating', 'Status']}
        rows={[
          { cells: ['Dr. Uwase Marie', 'Academic', '12', '4.9', 'Available'], href: '/profiles' },
          { cells: ['Mr. Nziza Ange', 'Career', '8', '4.7', 'Available'], href: '/profiles' },
          { cells: ['Ms. Landra', 'Mental Wellness', '15', '4.8', 'Busy'], href: '/profiles' },
        ]}
      />
    </PageSection>
  );
}
