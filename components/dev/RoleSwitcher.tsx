'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { switchRoleAction } from '@/lib/auth/actions';
import { ROLES, ROLE_LABELS, type Role } from '@/lib/rbac/roles';
import type { Session } from '@/lib/auth/types';
import { getPermissionKeysForRole } from '@/lib/rbac/authorize';

interface RoleSwitcherProps {
  session: Session;
}

export function RoleSwitcher({ session }: RoleSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const permissions = getPermissionKeysForRole(session.role);

  function handleChange(role: Role) {
    startTransition(async () => {
      await switchRoleAction(role);
      router.refresh();
    });
  }

  return (
    <div className="mb-5 rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-urbanist text-xs font-bold uppercase tracking-wider text-amber-800">
            Development — Role Switcher
          </p>
          <p className="mt-1 font-urbanist text-sm text-amber-900/80">
            Simulates backend session change. Permissions come from the cookie, not the URL.
          </p>
        </div>
        <label className="flex items-center gap-2 font-urbanist text-sm font-semibold text-mento-navy">
          Role:
          <select
            value={session.role}
            onChange={e => handleChange(e.target.value as Role)}
            disabled={pending}
            className="mento-input !py-2 font-urbanist text-sm"
          >
            {ROLES.map(role => (
              <option key={role} value={role}>
                {ROLE_LABELS[role]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 font-mono text-xs text-amber-900/70">
        Session: {session.user.name} ({session.role}) · {permissions.length} permissions
      </p>
    </div>
  );
}
