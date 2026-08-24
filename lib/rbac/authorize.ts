import type { Session } from '../auth/types';
import { PERMISSIONS, type Permission, type PermissionKey, toPermissionString } from './permissions';
import { ROLE_PERMISSIONS } from './role-bindings';
import type { Role } from './roles';

export interface AuthorizeContext {
  role: Role;
  permissions: Permission[];
}

/** Resolve effective permissions for a role (mirrors Fortress getSubjectPermissions). */
export function getPermissionsForRole(role: Role): Permission[] {
  const binding = ROLE_PERMISSIONS[role];
  if (binding.length === 1 && binding[0] === '*') {
    return Object.values(PERMISSIONS);
  }
  return (binding as PermissionKey[]).map(key => PERMISSIONS[key]);
}

export function getPermissionKeysForRole(role: Role): PermissionKey[] {
  const binding = ROLE_PERMISSIONS[role];
  if (binding.length === 1 && binding[0] === '*') {
    return Object.keys(PERMISSIONS) as PermissionKey[];
  }
  return binding as PermissionKey[];
}

function matchesWildcard(pattern: string, value: string): boolean {
  return pattern === '*' || pattern === value;
}

function matchesPermission(granted: Permission, requested: Permission): boolean {
  return (
    matchesWildcard(granted.resource, requested.resource)
    && matchesWildcard(granted.action, requested.action)
  );
}

/**
 * Central authorization check — Fortress iam.checkPermission equivalent.
 * Default deny when no matching ALLOW exists.
 */
export function checkPermission(
  context: AuthorizeContext,
  resource: string,
  action: string,
): boolean {
  const requested: Permission = { resource, action };
  return context.permissions.some(p => matchesPermission(p, requested));
}

export function authorize(session: Session, key: PermissionKey): boolean {
  const permissions = getPermissionsForRole(session.role);
  const requested = PERMISSIONS[key];
  return checkPermission({ role: session.role, permissions }, requested.resource, requested.action);
}

export function authorizeResource(session: Session, resource: string, action: string): boolean {
  const permissions = getPermissionsForRole(session.role);
  return checkPermission({ role: session.role, permissions }, resource, action);
}

/** For API route guards — throws-style helper returning result object. */
export function assertPermission(
  session: Session | null,
  key: PermissionKey,
): { allowed: true; session: Session } | { allowed: false; reason: string } {
  if (!session) {
    return { allowed: false, reason: 'Not authenticated' };
  }
  if (!authorize(session, key)) {
    return {
      allowed: false,
      reason: `Missing permission ${toPermissionString(PERMISSIONS[key])}`,
    };
  }
  return { allowed: true, session };
}
