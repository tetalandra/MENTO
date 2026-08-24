import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

export default async function RecordSessionsPage() {
  await requirePage('session:record');

  return (
    <PageSection
      title="Record Sessions"
      description="Log a mentorship session with your mentee"
      actions={[{ label: 'View Reports', href: '/reports' }]}
    >
      <form className="max-w-xl space-y-4 rounded-lg border border-mento-border bg-white p-6 shadow-sm">
        <div>
          <label className="font-urbanist text-sm font-semibold">Student</label>
          <select className="mt-1 w-full rounded-lg border border-mento-border px-4 py-2 font-urbanist text-sm">
            <option>John Doe — RCA-2024-001</option>
            <option>Jane Smith — RCA-2024-002</option>
          </select>
        </div>
        <div>
          <label className="font-urbanist text-sm font-semibold">Session Notes</label>
          <textarea rows={4} className="mt-1 w-full rounded-lg border border-mento-border px-4 py-2 font-urbanist text-sm" />
        </div>
        <Link href="/reports" className="inline-block rounded-lg bg-mento-navy px-6 py-2.5 font-urbanist text-sm font-semibold text-white">
          Save Session
        </Link>
      </form>
    </PageSection>
  );
}
