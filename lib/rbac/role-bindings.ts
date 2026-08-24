import type { PermissionKey } from './permissions';
import type { Role } from './roles';

/**
 * Role → permission bindings (Fortress role_permission + direct grants).
 * SUPER_ADMIN uses wildcard — evaluated in authorize().
 */
export const ROLE_PERMISSIONS: Record<Role, PermissionKey[] | ['*']> = {
  STUDENT: [
    'dashboard:view',
    'appointment:request',
    'appointment:read_own',
    'mentor:read',
    'analytics:view_own',
    'settings:read',
    'support:read',
    'chatbot:use',
  ],
  TEACHER: [
    'dashboard:view',
    'appointment:read_all',
    'appointment:manage',
    'session:record',
    'session:read_own',
    'report:read',
    'profile:read',
    'analytics:view_own',
    'settings:read',
    'support:read',
    'chatbot:use',
    'survey:read',
    'user:manage',
    'role:manage',
    'template:manage',
  ],
  ADMIN: [
    'dashboard:view',
    'appointment:read_all',
    'appointment:manage',
    'session:read_all',
    'report:read',
    'report:manage',
    'profile:read',
    'profile:manage',
    'analytics:view_system',
    'user:create',
    'user:manage',
    'template:manage',
    'activity:read_system',
    'settings:read',
    'support:read',
    'role:manage',
    'chatbot:use',
    'survey:read',
    'peer-review:read',
  ],
  SUPER_ADMIN: ['*'],
};
