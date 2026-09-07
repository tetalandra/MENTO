import { requireAnyPage } from '@/lib/portal/guard';
import { authorize } from '@/lib/rbac/authorize';
import { AppointmentsManagement } from '@/components/appointments/AppointmentsManagement';
import { MyAppointmentsStudent } from '@/components/appointments/MyAppointmentsStudent';

export default async function AppointmentsPage() {
  const session = await requireAnyPage(['appointment:read_own', 'appointment:manage']);

  if (authorize(session, 'appointment:manage')) {
    return <AppointmentsManagement />;
  }

  return <MyAppointmentsStudent />;
}
