import Link from 'next/link';
import type { ReactNode } from 'react';
import { EmptyState } from '@/components/ui/MentoPrimitives';

interface PageSectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: { label: string; href: string }[];
}

export function PageSection({ title, description, children, actions }: PageSectionProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy">{title}</h2>
          {description && (
            <p className="mt-1.5 max-w-2xl font-urbanist text-sm leading-relaxed text-mento-muted">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap gap-2">
            {actions.map(a => (
              <Link key={a.href} href={a.href} className="mento-btn-primary">
                {a.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}

export function DataTable({
  columns,
  rows,
  emptyTitle = 'No records yet',
  emptyDescription = 'Data will appear here once available.',
  emptyActionLabel,
  emptyActionHref,
}: {
  columns: string[];
  rows: { cells: string[]; href?: string }[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  emptyActionHref?: string;
}) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={emptyActionLabel}
        actionHref={emptyActionHref}
        icon="clipboard"
      />
    );
  }

  return (
    <div className="mento-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-mento-border/80 bg-mento-accent-light/60">
            <tr>
              {columns.map(col => (
                <th key={col} className="px-6 py-3.5 font-urbanist text-xs font-bold uppercase tracking-wide text-mento-muted">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-mento-border/40">
            {rows.map((row, i) => (
              <tr key={i} className="mento-table-row">
                {row.cells.map((cell, j) => (
                  <td key={j} className="px-6 py-4 font-urbanist text-sm text-mento-text">
                    {j === 0 && row.href ? (
                      <Link href={row.href} className="font-semibold text-mento-navy transition hover:text-mento-navy/80 hover:underline">
                        {cell}
                      </Link>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TabNav({ tabs, active }: { tabs: { label: string; href: string }[]; active: string }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl bg-mento-accent-light/50 p-1.5">
      {tabs.map(tab => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`rounded-lg px-4 py-2 font-urbanist text-sm font-semibold transition ${
            active === tab.href
              ? 'bg-white text-mento-navy shadow-sm'
              : 'text-mento-muted hover:text-mento-navy'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
