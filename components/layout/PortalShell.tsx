import type { ReactNode } from 'react';
import type { Session } from '@/lib/auth/types';
import { PortalSidebar } from './PortalSidebar';
import { TopHeader } from './TopHeader';

interface PortalShellProps {
  session: Session;
  children: ReactNode;
}

export function PortalShell({ session, children }: PortalShellProps) {
  return (
    <div className="portal-bg min-h-screen">
      <PortalSidebar session={session} />
      <div className="ml-[var(--sidebar-width)] flex min-h-screen flex-col">
        <TopHeader session={session} />
        <main className="portal-main w-full flex-1 px-[var(--portal-padding-x)] py-[var(--portal-padding-y)]">
          {children}
        </main>
      </div>
    </div>
  );
}
