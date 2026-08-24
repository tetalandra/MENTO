import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection, TabNav } from '@/components/portal/PageSection';

export default async function SettingsSecurityPage() {
  await requirePage('settings:read');

  return (
    <PageSection title="Security Settings">
      <TabNav
        active="/settings/security"
        tabs={[
          { label: 'Profile', href: '/settings' },
          { label: 'Security', href: '/settings/security' },
          { label: 'Notifications', href: '/settings/notifications' },
        ]}
      />
      <Link href="/change-password" className="inline-block rounded-lg bg-mento-navy px-6 py-2.5 font-urbanist text-sm font-semibold text-white">
        Change Password
      </Link>
    </PageSection>
  );
}
