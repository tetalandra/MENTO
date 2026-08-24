import { requirePage } from '@/lib/portal/guard';
import { DataTable, PageSection } from '@/components/portal/PageSection';

export default async function ProfilesPage() {
  await requirePage('profile:read');

  return (
    <PageSection title="Profiles" description="View mentor and student profiles">
      <DataTable
        columns={['Name', 'Role', 'Field', 'Email', 'Cycle']}
        rows={[
          { cells: ['Dr. Uwase Marie', 'Mentor', 'Academic', 'uwase@rca.ac.rw', '2023-2024'], href: '/profiles' },
          { cells: ['John Doe', 'Student', 'Software', 'john@rca.ac.rw', '2023-2024'], href: '/profiles' },
        ]}
      />
    </PageSection>
  );
}
