import type { ReactNode } from 'react';
import type { Session } from '@/lib/auth/types';
import { authorize } from '@/lib/rbac/authorize';
import type { PermissionKey } from '@/lib/rbac/permissions';

interface CanProps {
  session: Session;
  permission: PermissionKey;
  children: ReactNode;
  fallback?: ReactNode;
}

/** Declarative UI gate — uses the same authorize() as server routes. */
export function Can({ session, permission, children, fallback = null }: CanProps) {
  if (!authorize(session, permission)) {
    return fallback;
  }
  return children;
}
