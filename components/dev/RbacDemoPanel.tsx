'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { PermissionKey } from '@/lib/rbac/permissions';
import { PERMISSIONS, toPermissionString } from '@/lib/rbac/permissions';
import type { Session } from '@/lib/auth/types';
import { getPermissionKeysForRole } from '@/lib/rbac/authorize';
import { LoadingDots } from '@/components/ui/MentoPrimitives';

const DEMO_ACTIONS: { label: string; permission: PermissionKey }[] = [
  { label: 'Request Appointment', permission: 'appointment:request' },
  { label: 'Record Session', permission: 'session:record' },
  { label: 'Add New User', permission: 'user:create' },
  { label: 'Manage Templates', permission: 'template:manage' },
  { label: 'View System Analytics', permission: 'analytics:view_system' },
];

interface RbacDemoPanelProps {
  session: Session;
}

export function RbacDemoPanel({ session }: RbacDemoPanelProps) {
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const granted = new Set(getPermissionKeysForRole(session.role));

  function testAction(permission: PermissionKey) {
    startTransition(async () => {
      const res = await fetch('/api/auth/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permission }),
      });
      const data = await res.json();
      if (data.allowed) {
        setResult({ ok: true, text: `Allowed: ${data.message}` });
      }
      else {
        setResult({ ok: false, text: `Denied (${res.status}): ${data.reason}` });
      }
    });
  }

  return (
    <div className="mento-card p-6">
      <h3 className="font-urbanist text-lg font-bold text-mento-navy">RBAC Action Demo</h3>
      <p className="mt-1 font-urbanist text-sm text-mento-muted">
        Each button calls <code className="rounded-md bg-mento-accent-light px-1.5 py-0.5 text-xs">POST /api/auth/check</code> — same logic as the UI.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {DEMO_ACTIONS.map(action => {
          const hasPermission = granted.has(action.permission);
          return (
            <button
              key={action.permission}
              type="button"
              onClick={() => testAction(action.permission)}
              disabled={pending}
              className={`rounded-xl px-4 py-2 font-urbanist text-sm font-semibold transition active:scale-[0.98] disabled:opacity-60 ${
                hasPermission
                  ? 'mento-btn-primary !py-2'
                  : 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
              }`}
              title={toPermissionString(PERMISSIONS[action.permission])}
            >
              {action.label}
            </button>
          );
        })}
      </div>
      {pending && (
        <p className="mt-4 font-urbanist text-sm text-mento-muted">
          Checking permission… <LoadingDots />
        </p>
      )}
      {result && !pending && (
        <p className={`mento-feedback mt-4 ${result.ok ? 'mento-feedback-success' : 'mento-feedback-error'}`}>
          {result.text}
        </p>
      )}
    </div>
  );
}
