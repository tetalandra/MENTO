import { requirePage } from '@/lib/portal/guard';
import { FindYourMentor } from '@/components/mentors/FindYourMentor';

export default async function MentorsPage() {
  await requirePage('mentor:read');

  return <FindYourMentor />;
}
