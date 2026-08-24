import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

export default async function SupportPage() {
  await requirePage('support:read');

  return (
    <PageSection title="Support" description="Get help with the Mento portal">
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/chatbot" className="rounded-lg border border-mento-border bg-white p-6 shadow-sm transition hover:border-mento-navy">
          <h3 className="font-urbanist font-semibold text-mento-navy">AI Chatbot</h3>
          <p className="mt-2 font-urbanist text-sm text-mento-muted">Instant answers to common questions</p>
        </Link>
        <a href="mailto:support@rca.ac.rw" className="rounded-lg border border-mento-border bg-white p-6 shadow-sm transition hover:border-mento-navy">
          <h3 className="font-urbanist font-semibold text-mento-navy">Email Support</h3>
          <p className="mt-2 font-urbanist text-sm text-mento-muted">support@rca.ac.rw</p>
        </a>
      </div>
    </PageSection>
  );
}
