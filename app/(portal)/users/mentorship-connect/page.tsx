import { requirePage } from '@/lib/portal/guard';
import { MentorshipConnect } from '@/components/users/MentorshipConnect';

export default async function MentorshipConnectPage() {
  await requirePage('user:manage');

  return <MentorshipConnect />;
}
