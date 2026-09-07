import { requirePage } from '@/lib/portal/guard';
import { AccountSettings } from '@/components/settings/AccountSettings';

export default async function SettingsPage() {
  await requirePage('settings:read');

  return <AccountSettings initialTab="account" />;
}
