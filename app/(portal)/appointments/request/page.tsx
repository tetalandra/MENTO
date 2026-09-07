import { requireAnyPage } from '@/lib/portal/guard';
import { RequestAppointmentForm } from '@/components/appointments/RequestAppointmentForm';

export default async function RequestAppointmentPage() {
  await requireAnyPage(['appointment:request', 'appointment:manage']);

  return <RequestAppointmentForm />;
}
