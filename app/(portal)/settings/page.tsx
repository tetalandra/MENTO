import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection, TabNav } from '@/components/portal/PageSection';

export default async function SettingsPage() {
  await requirePage('settings:read');

  return (
    <PageSection title="Settings" description="Manage your account preferences">
      <TabNav
        active="/settings"
        tabs={[
          { label: 'Profile', href: '/settings' },
          { label: 'Security', href: '/settings/security' },
          { label: 'Notifications', href: '/settings/notifications' },
        ]}
      />
      <form className="max-w-md space-y-4 rounded-lg border border-mento-border bg-white p-6 shadow-sm">
        <input placeholder="Display Name" defaultValue="John Doe" className="w-full rounded-lg border border-mento-border px-4 py-2 font-urbanist text-sm" />
        <input placeholder="Email" defaultValue="student@rca.ac.rw" className="w-full rounded-lg border border-mento-border px-4 py-2 font-urbanist text-sm" />
        <button type="button" className="rounded-lg bg-mento-navy px-6 py-2 font-urbanist text-sm font-semibold text-white">
          Save Profile
        </button>
      </form>
      <Link href="/change-password" className="inline-block font-urbanist text-sm text-mento-navy hover:underline">
        Update Password →
      </Link>
    </PageSection>
  );
}
