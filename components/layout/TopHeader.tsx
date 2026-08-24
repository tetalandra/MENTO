'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Session } from '@/lib/auth/types';
import { PAGE_TITLES } from '@/lib/navigation/portal-nav';
import { Icon } from '@/components/ui/icons';

interface TopHeaderProps {
  session: Session;
}

export function TopHeader({ session }: TopHeaderProps) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? PAGE_TITLES[pathname.replace(/\/[^/]+$/, '')] ?? 'Portal';

  const initials = session.user.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-[var(--header-height)] items-center justify-between border-b border-mento-border/60 bg-white/90 px-[var(--portal-padding-x)] backdrop-blur-md">
      <div>
        <p className="font-urbanist text-xs font-medium uppercase tracking-wider text-mento-muted">
          Institutional Portal
        </p>
        <h1 className="font-urbanist text-xl font-bold text-mento-navy md:text-2xl">{title}</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href="/dashboard"
          className="mento-btn-ghost hidden !rounded-full border border-transparent hover:border-mento-border md:flex"
        >
          <Icon name="search" className="size-4 text-mento-muted" />
          <span className="text-mento-muted">Search…</span>
        </Link>

        <button
          type="button"
          className="mento-btn-ghost !rounded-full !p-2.5"
          aria-label="Notifications"
        >
          <Icon name="bell" className="size-5" />
        </button>
        <Link href="/support" className="mento-btn-ghost !rounded-full !p-2.5" aria-label="Help">
          <Icon name="help" className="size-5" />
        </Link>

        <Link
          href="/settings"
          className="ml-1 flex items-center gap-2.5 rounded-xl border border-mento-border/60 bg-mento-accent-light/40 py-1.5 pl-1.5 pr-3 transition hover:bg-mento-accent-light"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-mento-navy font-urbanist text-xs font-bold text-white shadow-sm">
            {initials}
          </div>
          <span className="hidden font-urbanist text-sm font-semibold text-mento-text sm:inline">
            {session.user.name}
          </span>
          <Icon name="chevron-down" className="hidden size-3 text-mento-muted sm:block" />
        </Link>
      </div>
    </header>
  );
}
