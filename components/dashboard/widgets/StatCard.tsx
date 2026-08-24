import type { ReactNode } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/icons';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendLabel?: string;
  trendPositive?: boolean;
  icon?: ReactNode;
  variant?: 'default' | 'dark';
  href?: string;
}

export function StatCard({
  label,
  value,
  trend,
  trendLabel = 'This month',
  trendPositive = true,
  icon,
  variant = 'default',
  href,
}: StatCardProps) {
  const isDark = variant === 'dark';

  const inner = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className={`font-urbanist text-sm font-medium ${isDark ? 'text-white/75' : 'text-mento-muted'}`}>
          {label}
        </p>
        <p className={`mt-2 font-inter text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-mento-navy'}`}>
          {value}
        </p>
        {trend && (
          <p className="mt-2 flex items-center gap-1.5 font-urbanist text-xs">
            <span className={`inline-flex items-center gap-0.5 font-semibold ${trendPositive ? 'text-emerald-600' : 'text-red-500'}`}>
              {trendPositive && <Icon name="trend-up" className="size-3" />}
              {trend}
            </span>
            {trendLabel && (
              <span className={isDark ? 'text-white/50' : 'text-mento-muted'}>{trendLabel}</span>
            )}
          </p>
        )}
      </div>
      {icon && (
        <div className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${isDark ? 'bg-white/10' : 'bg-mento-accent-light'}`}>
          {icon}
        </div>
      )}
      {href && (
        <Icon name="chevron-right" className={`absolute bottom-4 right-4 size-4 opacity-0 transition group-hover:opacity-60 ${isDark ? 'text-white' : 'text-mento-navy'}`} />
      )}
    </div>
  );

  const className = `group relative block overflow-hidden rounded-[var(--mento-radius)] p-6 ${
    isDark
      ? 'bg-gradient-to-br from-mento-navy to-[#152038] text-white shadow-lg'
      : 'mento-card mento-card-interactive bg-white text-mento-text'
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function ActionCard({
  title,
  description,
  actionLabel,
  href,
}: {
  title: string;
  description?: string;
  actionLabel: string;
  href?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[var(--mento-radius-lg)] bg-gradient-to-br from-mento-navy via-[#1e3058] to-[#152038] p-8 text-white shadow-lg transition hover:shadow-xl">
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/5 transition group-hover:scale-110" />
      <div className="absolute -bottom-6 -left-6 size-24 rounded-full bg-white/5" />
      <p className="relative font-urbanist text-lg font-bold">{title}</p>
      {description && (
        <p className="relative mt-2 max-w-xs font-urbanist text-sm leading-relaxed text-white/70">
          {description}
        </p>
      )}
      {href ? (
        <Link
          href={href}
          className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-urbanist text-xs font-bold uppercase tracking-wide text-mento-navy transition hover:bg-white/95 hover:shadow-md"
        >
          {actionLabel}
          <Icon name="arrow-right" className="size-3.5" />
        </Link>
      ) : (
        <span className="relative mt-6 inline-flex rounded-xl bg-white/40 px-5 py-2.5 font-urbanist text-xs font-bold uppercase tracking-wide text-mento-navy">
          {actionLabel}
        </span>
      )}
    </div>
  );
}

export function AcademicCycleBadge() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-mento-navy to-[#243562] px-5 py-3.5 text-white shadow-md">
      <p className="font-urbanist text-[10px] font-bold uppercase tracking-widest text-white/55">
        Academic Cycle
      </p>
      <p className="font-urbanist text-lg font-bold">2023 – 2024</p>
    </div>
  );
}
