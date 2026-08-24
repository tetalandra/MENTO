import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { DataTable, PageSection } from '@/components/portal/PageSection';

export default async function UsersPage() {
  await requirePage('user:manage');

  return (
    <PageSection
      title="User Management"
      description="Manage students, mentors, and administrators"
      actions={[
        { label: '+ Add User', href: '/users/add' },
        { label: 'Assign Roles', href: '/users/roles' },
      ]}
    >
      <DataTable
        columns={['Name', 'Email', 'Role', 'Status', 'Joined']}
        rows={[
          { cells: ['John Doe', 'john@rca.ac.rw', 'Student', 'Active', 'Sep 2023'], href: '/profiles' },
          { cells: ['Dr. Uwase', 'uwase@rca.ac.rw', 'Mentor', 'Active', 'Aug 2023'], href: '/profiles' },
          { cells: ['Admin User', 'admin@rca.ac.rw', 'Admin', 'Active', 'Jan 2023'], href: '/profiles' },
        ]}
      />
    </PageSection>
  );
}
