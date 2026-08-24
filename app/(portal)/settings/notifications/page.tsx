import { requirePage } from '@/lib/portal/guard';
import { PageSection, TabNav } from '@/components/portal/PageSection';

export default async function SettingsNotificationsPage() {
  await requirePage('settings:read');

  return (
    <PageSection title="Notification Settings">
      <TabNav
        active="/settings/notifications"
        tabs={[
          { label: 'Profile', href: '/settings' },
          { label: 'Security', href: '/settings/security' },
          { label: 'Notifications', href: '/settings/notifications' },
        ]}
      />
      <div className="space-y-3 rounded-lg border border-mento-border bg-white p-6 shadow-sm">
        {['Email notifications', 'Appointment reminders', 'Session summaries'].map(label => (
          <label key={label} className="flex items-center justify-between font-urbanist text-sm">
            <span>{label}</span>
            <input type="checkbox" defaultChecked className="size-4 rounded" />
          </label>
        ))}
      </div>
    </PageSection>
  );
}
