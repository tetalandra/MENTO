'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { Session } from '@/lib/auth/types';
import { authorize } from '@/lib/rbac/authorize';
import {
  PORTAL_NAV,
  getSidebarVariant,
  type NavGroup,
  type NavChild,
} from '@/lib/navigation/portal-nav';
import type { NavIcon } from '@/lib/rbac/navigation';
import { Icon } from '@/components/ui/icons';
import { SignOutButton } from '@/components/auth/SignOutButton';

interface PortalSidebarProps {
  session: Session;
}

/** Every nav label uses the same 18px Urbanist Bold — Figma uniform sizing */
const NAV_LABEL = 'font-urbanist text-lg font-bold leading-6';

/** px-4 (16) + icon (18) + gap-3 (12) = 46 — sub-item icons align under parent text */
const SUBMENU_INDENT = 'pl-[46px]';

/** Pick the single best-matching href (longest wins) so siblings don't both highlight */
function getActiveHref(pathname: string, hrefs: string[]): string | null {
  const matches = hrefs.filter(
    href => pathname === href || pathname.startsWith(`${href}/`),
  );
  if (matches.length === 0) return null;
  return matches.sort((a, b) => b.length - a.length)[0] ?? null;
}

function collectVisibleHrefs(
  nav: NavGroup[],
  session: Session,
  variant: ReturnType<typeof getSidebarVariant>,
): string[] {
  const hrefs: string[] = [];
  for (const g of nav) {
    if (!groupVisible(session, g, variant)) continue;
    if (g.href) hrefs.push(g.href);
    for (const c of g.children ?? []) {
      if (childVisible(session, c)) hrefs.push(c.href);
    }
  }
  return hrefs;
}

function childVisible(session: Session, child: NavChild) {
  return authorize(session, child.permission);
}

function groupVisible(session: Session, group: NavGroup, variant: ReturnType<typeof getSidebarVariant>) {
  if (!group.variants.includes(variant)) return false;
  if (group.children) {
    return group.children.some(c => childVisible(session, c));
  }
  return authorize(session, group.permission);
}

/** Same 18px for every item — only color changes by state */
function navTextClass(active: boolean, isSubItem = false) {
  if (active) return `${NAV_LABEL} text-mento-navy`;
  if (isSubItem) return `${NAV_LABEL} text-[#c4c6d0]`;
  return `${NAV_LABEL} text-white/70`;
}

export function PortalSidebar({ session }: PortalSidebarProps) {
  const pathname = usePathname();
  const variant = getSidebarVariant(session.role);

  const visibleNav = useMemo(
    () => PORTAL_NAV.filter(g => groupVisible(session, g, variant)),
    [session, variant],
  );

  const activeHref = useMemo(() => {
    const hrefs = collectVisibleHrefs(PORTAL_NAV, session, variant);
    return getActiveHref(pathname, hrefs);
  }, [pathname, session, variant]);

  const isItemActive = (href: string) => activeHref === href;

  const primary = visibleNav.filter(g => g.section === 'primary');
  const footer = visibleNav.filter(g => g.section === 'footer');

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const g of visibleNav) {
      if (g.children?.some(c => isItemActive(c.href))) {
        initial[g.id] = true;
      }
    }
    return initial;
  });

  function toggleGroup(id: string) {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function renderNavLink(
    href: string,
    label: string,
    icon: NavIcon,
    active: boolean,
    index: number,
  ) {
    return (
      <Link
        href={href}
        style={{ animationDelay: `${index * 40}ms` }}
        className={`sidebar-link sidebar-nav-item relative flex min-h-[var(--sidebar-item-height)] w-full items-center gap-3 rounded px-4 py-3 ${
          active ? 'is-active -mr-0.5' : ''
        }`}
      >
        <Icon
          name={icon}
          className={`size-[18px] shrink-0 ${active ? 'text-mento-navy' : 'text-white/70'}`}
        />
        <span className={`min-w-0 flex-1 ${navTextClass(active)}`}>
          {label}
        </span>
      </Link>
    );
  }

  function renderSubLink(child: NavChild, childActive: boolean) {
    return (
      <Link
        key={child.id}
        href={child.href}
        className={`sidebar-link flex min-h-[var(--sidebar-item-height)] w-full items-center gap-3 rounded py-3 pr-4 ${SUBMENU_INDENT} ${
          childActive ? 'is-active -mr-0.5 bg-white shadow-sm' : 'hover:bg-white/10'
        }`}
      >
        <Icon
          name={child.icon}
          className={`size-[18px] shrink-0 ${childActive ? 'text-mento-navy' : 'text-white/70'}`}
        />
        <span className={`min-w-0 flex-1 ${navTextClass(childActive, true)}`}>
          {child.label}
        </span>
      </Link>
    );
  }

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 flex w-[var(--sidebar-width)] flex-col bg-mento-navy text-white"
      aria-label="Portal navigation"
    >
      <div className="shrink-0 pb-6 pt-6">
        <Link href="/dashboard" className="sidebar-logo flex items-center gap-3 px-6">
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-sm">
            <img
              src="/images/mento-logo.png"
              alt="MENTO"
              width={32}
              height={32}
              className="size-8 object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="font-urbanist text-2xl font-bold tracking-[-0.6px] text-white">
              MENTO
            </p>
            <p className="font-urbanist text-[10px] font-bold uppercase tracking-[1px] text-white/60">
              Institutional Portal
            </p>
          </div>
        </Link>
      </div>

      <nav className="sidebar-nav-scroll flex flex-1 flex-col gap-1 px-2 pb-4">
        {primary.map((group, index) => {
          if (group.href) {
            return (
              <div key={group.id} className="px-1">
                {renderNavLink(
                  group.href,
                  group.label,
                  group.icon,
                  isItemActive(group.href),
                  index,
                )}
              </div>
            );
          }

          const visibleChildren = (group.children ?? []).filter(c => childVisible(session, c));
          const groupActive = visibleChildren.some(c => isItemActive(c.href));
          const isOpen = openGroups[group.id] ?? groupActive;

          return (
            <div key={group.id} className="px-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                style={{ animationDelay: `${index * 40}ms` }}
                className={`sidebar-link sidebar-nav-item flex min-h-[var(--sidebar-item-height)] w-full items-center gap-3 rounded px-4 py-3 ${
                  groupActive && !isOpen ? 'bg-white/10' : ''
                }`}
              >
                <Icon name={group.icon} className="size-[18px] shrink-0 text-white/70" />
                <span className={`min-w-0 flex-1 text-left ${navTextClass(false)}`}>
                  {group.label}
                </span>
                <Icon
                  name="chevron-down"
                  className={`sidebar-chevron size-3 shrink-0 text-white/50 ${isOpen ? 'is-open' : ''}`}
                />
              </button>

              <div className={`sidebar-submenu-grid ${isOpen ? 'is-open' : ''}`}>
                <div className="sidebar-submenu-inner">
                  <div className="space-y-0.5 py-1">
                    {visibleChildren.map(child =>
                      renderSubLink(child, isItemActive(child.href)),
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 px-2 pb-4 pt-6">
        {footer.map((group, i) =>
          group.href ? (
            <div key={group.id} className="px-1">
              {renderNavLink(
                group.href,
                group.label,
                group.icon,
                isItemActive(group.href),
                primary.length + i,
              )}
            </div>
          ) : null,
        )}

        <div className="mt-1 flex min-h-[var(--sidebar-item-height)] items-center gap-3 px-5 py-3">
          <Icon name="log-out" className="size-5 shrink-0 text-white/70" />
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
