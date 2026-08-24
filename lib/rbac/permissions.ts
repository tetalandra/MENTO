/**
 * Fortress-style permission catalog: every grant is a resource + action pair.
 * Roles bind to these; UI and API both consult authorize().
 */

export interface Permission {
  resource: string;
  action: string;
}

export type PermissionKey =
  | 'dashboard:view'
  | 'appointment:request'
  | 'appointment:read_own'
  | 'appointment:read_all'
  | 'appointment:manage'
  | 'mentor:read'
  | 'session:record'
  | 'session:read_own'
  | 'session:read_all'
  | 'report:read'
  | 'report:manage'
  | 'profile:read'
  | 'profile:manage'
  | 'analytics:view_own'
  | 'analytics:view_system'
  | 'user:create'
  | 'user:manage'
  | 'template:manage'
  | 'activity:read_system'
  | 'settings:read'
  | 'support:read'
  | 'role:manage'
  | 'chatbot:use'
  | 'survey:read'
  | 'peer-review:read';

export const PERMISSIONS: Record<PermissionKey, Permission> = {
  'dashboard:view': { resource: 'dashboard', action: 'view' },
  'appointment:request': { resource: 'appointment', action: 'request' },
  'appointment:read_own': { resource: 'appointment', action: 'read_own' },
  'appointment:read_all': { resource: 'appointment', action: 'read_all' },
  'appointment:manage': { resource: 'appointment', action: 'manage' },
  'mentor:read': { resource: 'mentor', action: 'read' },
  'session:record': { resource: 'session', action: 'record' },
  'session:read_own': { resource: 'session', action: 'read_own' },
  'session:read_all': { resource: 'session', action: 'read_all' },
  'report:read': { resource: 'report', action: 'read' },
  'report:manage': { resource: 'report', action: 'manage' },
  'profile:read': { resource: 'profile', action: 'read' },
  'profile:manage': { resource: 'profile', action: 'manage' },
  'analytics:view_own': { resource: 'analytics', action: 'view_own' },
  'analytics:view_system': { resource: 'analytics', action: 'view_system' },
  'user:create': { resource: 'user', action: 'create' },
  'user:manage': { resource: 'user', action: 'manage' },
  'template:manage': { resource: 'template', action: 'manage' },
  'activity:read_system': { resource: 'activity', action: 'read_system' },
  'settings:read': { resource: 'settings', action: 'read' },
  'support:read': { resource: 'support', action: 'read' },
  'role:manage': { resource: 'role', action: 'manage' },
  'chatbot:use': { resource: 'chatbot', action: 'use' },
  'survey:read': { resource: 'survey', action: 'read' },
  'peer-review:read': { resource: 'peer-review', action: 'read' },
};

export function permissionKey(p: Permission): PermissionKey | null {
  const entry = Object.entries(PERMISSIONS).find(
    ([, value]) => value.resource === p.resource && value.action === p.action,
  );
  return entry ? (entry[0] as PermissionKey) : null;
}

export function toPermissionString(p: Permission): string {
  return `${p.resource}:${p.action}`;
}
