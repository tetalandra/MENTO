import { requireAnyPage } from '@/lib/portal/guard';
import { RecordSessionForm } from '@/components/sessions/RecordSessionForm';

export default async function RecordSessionsPage() {
  await requireAnyPage(['session:record', 'appointment:manage']);

  return <RecordSessionForm />;
}
