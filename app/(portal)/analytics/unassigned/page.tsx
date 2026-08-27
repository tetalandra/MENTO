import { requireAnyPage } from '@/lib/portal/guard';
import { UnassignedMentees } from '@/components/dashboard/UnassignedMentees';

export default async function UnassignedMenteesPage() {
  await requireAnyPage(['dashboard:view', 'analytics:view_system', 'user:manage']);

  return <UnassignedMentees />;
}
