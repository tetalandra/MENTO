import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from './icons';

/** Shared dashboard / page header */
export function DashboardHeader({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl font-urbanist text-base text-mento-muted">{subtitle}</p>
        )}
      </div>
      {(badge || children) && (
        <div className="flex flex-wrap items-center gap-3">
          {badge}
          {children}
        </div>
      )}
    </div>
  );
}

export function StatusBadge({
  children,
  variant = 'neutral',
}: {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'neutral' | 'info';
}) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-800 ring-amber-200',
    neutral: 'bg-slate-100 text-slate-600 ring-slate-200',
    info: 'bg-blue-50 text-blue-700 ring-blue-200',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon = 'calendar',
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ComponentProps<typeof Icon>['name'];
}) {
  return (
    <div className="mento-empty-state">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-mento-accent-light text-mento-navy">
        <Icon name={icon} className="size-7" />
      </div>
      <h3 className="mt-4 font-urbanist text-lg font-semibold text-mento-navy">{title}</h3>
      <p className="mt-2 max-w-sm font-urbanist text-sm text-mento-muted">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mento-btn-primary mt-6 inline-flex">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Loading">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="size-1.5 animate-pulse rounded-full bg-mento-navy/60"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}

export function ToolbarButton({
  children,
  onClick,
  primary,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  primary?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={primary ? 'mento-btn-primary inline-flex items-center gap-2 !py-2 !px-4 !text-sm' : 'mento-btn-secondary inline-flex items-center gap-2 !py-2 !px-4 !text-sm'}
    >
      {icon}
      {children}
    </button>
  );
}
