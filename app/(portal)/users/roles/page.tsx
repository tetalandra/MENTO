import { requirePage } from '@/lib/portal/guard';
import { DataTable, PageSection } from '@/components/portal/PageSection';

export default async function RolesPage() {
  await requirePage('role:manage');

  return (
    <PageSection title="Assign Roles" description="Manage role assignments and permissions">
      <DataTable
        columns={['User', 'Current Role', 'Permissions', 'Actions']}
        rows={[
          { cells: ['John Doe', 'Student', '8 permissions', 'Edit'], href: '/profiles' },
          { cells: ['Dr. Uwase', 'Teacher', '14 permissions', 'Edit'], href: '/profiles' },
          { cells: ['Admin User', 'Admin', '22 permissions', 'Edit'], href: '/profiles' },
        ]}
      />
    </PageSection>
  );
}
