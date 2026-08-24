import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

export default async function SurveysPage() {
  await requirePage('survey:read');

  return (
    <PageSection title="Mentorship Surveys" description="Create and review mentorship feedback">
      <div className="space-y-4">
        {['Post-Session Feedback', 'Monthly Mentee Survey', 'Mentor Evaluation'].map(name => (
          <Link
            key={name}
            href="/surveys"
            className="block rounded-lg border border-mento-border bg-white p-5 shadow-sm transition hover:border-mento-navy"
          >
            <h3 className="font-urbanist font-semibold text-mento-navy">{name}</h3>
            <p className="mt-1 font-urbanist text-sm text-mento-muted">Click to view responses</p>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
