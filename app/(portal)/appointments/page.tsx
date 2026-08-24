import { requireAnyPage } from '@/lib/portal/guard';
import { DataTable, PageSection, TabNav } from '@/components/portal/PageSection';

export default async function AppointmentsPage() {
  await requireAnyPage(['appointment:read_own', 'appointment:manage']);

  return (
    <PageSection
      title="My Appointments"
      description="View and manage your mentorship appointments"
      actions={[{ label: '+ Request Appointment', href: '/appointments/request' }]}
    >
      <TabNav
        active="/appointments"
        tabs={[
          { label: 'Upcoming', href: '/appointments' },
          { label: 'Past', href: '/appointments?tab=past' },
          { label: 'Cancelled', href: '/appointments?tab=cancelled' },
        ]}
      />
      <DataTable
        columns={['Mentor', 'Date', 'Time', 'Status', 'Field']}
        rows={[
          { cells: ['Dr. Uwase Marie', 'Aug 28, 2026', '10:00 AM', 'Confirmed', 'Academic'], href: '/profiles' },
          { cells: ['Mr. Nziza Ange', 'Sep 02, 2026', '2:00 PM', 'Pending', 'Career'], href: '/profiles' },
          { cells: ['Ms. Landra', 'Sep 05, 2026', '9:00 AM', 'Confirmed', 'Mental'], href: '/profiles' },
        ]}
      />
    </PageSection>
  );
}
