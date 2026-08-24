import type { PermissionKey } from './permissions';

export type DashboardSectionId =
  | 'student-analytics'
  | 'teacher-welcome'
  | 'teacher-stats'
  | 'teacher-charts'
  | 'teacher-mentees'
  | 'admin-welcome'
  | 'admin-stats'
  | 'admin-activities';

export interface DashboardSection {
  id: DashboardSectionId;
  permission: PermissionKey;
}

/**
 * Widget registry — dashboard composes sections by permission, not by role name.
 * Student-only sections use appointment:request (unique to STUDENT).
 * Teacher sections use session:record. Admin sections use user:manage.
 */
export const DASHBOARD_SECTIONS: DashboardSection[] = [
  { id: 'student-analytics', permission: 'appointment:request' },
  { id: 'teacher-welcome', permission: 'session:record' },
  { id: 'teacher-stats', permission: 'session:record' },
  { id: 'teacher-charts', permission: 'report:read' },
  { id: 'teacher-mentees', permission: 'profile:read' },
  { id: 'admin-welcome', permission: 'user:manage' },
  { id: 'admin-stats', permission: 'analytics:view_system' },
  { id: 'admin-activities', permission: 'activity:read_system' },
];
