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
    <header className="sticky top-0 z-20 flex h-[var(--header-height)] items-center justify-between border-b border-mento-border/60 bg-white px-[var(--portal-padding-x)]">
      <h1 className="font-urbanist text-sm font-bold uppercase tracking-[0.12em] text-mento-navy md:text-base">
        {title}
      </h1>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          className="mento-btn-ghost !rounded-full !p-2.5"
          aria-label="Notifications"
        >
          <Icon name="bell" className="size-5" />
        </button>
        <button
          type="button"
          className="mento-btn-ghost !rounded-full !p-2.5"
          aria-label="Help"
        >
          <Icon name="help" className="size-5" />
        </button>

        <Link
          href="/settings"
          className="ml-1 flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-2 transition hover:bg-mento-accent-light/60"
        >
          <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-mento-navy font-urbanist text-xs font-bold text-white shadow-sm">
            {initials}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="font-urbanist text-sm font-semibold text-mento-text">{session.user.name}</p>
            <p className="font-urbanist text-xs text-mento-muted">
              {session.role === 'SUPER_ADMIN'
                ? 'Super Admin'
                : session.role === 'ADMIN'
                  ? 'Admin'
                  : session.role === 'TEACHER'
                    ? 'Mentor'
                    : 'Student'}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
