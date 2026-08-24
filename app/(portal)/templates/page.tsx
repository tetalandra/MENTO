import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

const TEMPLATES = [
  { name: 'Academic Mentorship', href: '/templates/academic' },
  { name: 'Mental Wellness', href: '/templates/mental' },
  { name: 'Career Guidance', href: '/templates/career' },
];

export default async function TemplatesPage() {
  await requirePage('template:manage');

  return (
    <PageSection title="Template Management" description="Manage mentorship session templates">
      <div className="grid gap-4 sm:grid-cols-3">
        {TEMPLATES.map(t => (
          <Link
            key={t.href}
            href={t.href}
            className="mento-card mento-card-interactive block p-6"
          >
            <h3 className="font-urbanist text-lg font-semibold text-mento-navy">{t.name}</h3>
            <p className="mt-2 font-urbanist text-sm text-mento-muted">Click to edit template</p>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
