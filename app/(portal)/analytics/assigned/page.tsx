import { requireAnyPage } from '@/lib/portal/guard';
import { AssignedMentees } from '@/components/dashboard/UnassignedMentees';

export default async function AssignedMenteesPage() {
  await requireAnyPage(['dashboard:view', 'analytics:view_system', 'user:manage']);

  return <AssignedMentees />;
}
