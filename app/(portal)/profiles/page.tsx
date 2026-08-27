import { requirePage } from '@/lib/portal/guard';
import { TeacherPortfolio } from '@/components/profiles/TeacherPortfolio';

export default async function ProfilesPage() {
  await requirePage('profile:read');

  return <TeacherPortfolio />;
}
