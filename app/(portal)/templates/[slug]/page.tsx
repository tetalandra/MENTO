import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await requirePage('template:manage');
  const { slug } = await params;
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <PageSection
      title={`${name} Template`}
      description="Edit template fields and questions"
      actions={[{ label: 'Back to Templates', href: '/templates' }]}
    >
      <div className="rounded-lg border border-mento-border bg-white p-6 shadow-sm">
        <p className="font-urbanist text-sm text-mento-muted">Template editor — add your Figma content here</p>
        <Link href="/templates" className="mt-4 inline-block font-urbanist text-sm font-semibold text-mento-navy hover:underline">
          Save & return
        </Link>
      </div>
    </PageSection>
  );
}
