import { requirePage } from '@/lib/portal/guard';
import { MentorshipSurvey } from '@/components/surveys/MentorshipSurvey';

export default async function SurveysPage() {
  await requirePage('survey:read');

  return <MentorshipSurvey />;
}
