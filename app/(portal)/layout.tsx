import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { PortalShell } from '@/components/layout/PortalShell';
import { RoleSwitcher } from '@/components/dev/RoleSwitcher';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <PortalShell session={session}>
      <RoleSwitcher session={session} />
      {children}
    </PortalShell>
  );
}
