import { requireAnyPage } from '@/lib/portal/guard';
import { AssignedMentors } from '@/components/dashboard/AssignedMentors';

export default async function AssignedMentorsPage() {
  await requireAnyPage(['dashboard:view', 'analytics:view_system', 'user:manage']);

  return <AssignedMentors />;
}
