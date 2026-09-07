import { requirePage } from '@/lib/portal/guard';
import { AccountSettings } from '@/components/settings/AccountSettings';

export default async function SettingsSecurityPage() {
  await requirePage('settings:read');

  return <AccountSettings initialTab="password" />;
}
