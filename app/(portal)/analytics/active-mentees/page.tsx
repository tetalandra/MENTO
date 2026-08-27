import { requireAnyPage } from '@/lib/portal/guard';
import { ActiveMentees } from '@/components/dashboard/ActiveMentees';

export default async function ActiveMenteesPage() {
  await requireAnyPage(['dashboard:view', 'analytics:view_system', 'user:manage']);

  return <ActiveMentees />;
}
