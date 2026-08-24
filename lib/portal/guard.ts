import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { authorize } from '@/lib/rbac/authorize';
import type { PermissionKey } from '@/lib/rbac/permissions';
import type { Session } from '@/lib/auth/types';

/** Use on portal pages — redirects if not logged in or missing permission */
export async function requirePage(permission: PermissionKey): Promise<Session> {
  const session = await getSession();
  if (!session) redirect('/login');
  if (!authorize(session, permission)) redirect('/dashboard');
  return session;
}

/** Allow page if user has ANY of the listed permissions */
export async function requireAnyPage(permissions: PermissionKey[]): Promise<Session> {
  const session = await getSession();
  if (!session) redirect('/login');
  if (!permissions.some(p => authorize(session, p))) redirect('/dashboard');
  return session;
}
