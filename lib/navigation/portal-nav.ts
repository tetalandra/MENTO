import type { PermissionKey } from '@/lib/rbac/permissions';
import type { Role } from '@/lib/rbac/roles';
import type { NavIcon } from '@/lib/rbac/navigation';

/** Matches Figma sidebar component variants */
export type SidebarVariant = 'student' | 'teacher' | 'admin';

export interface NavChild {
  id: string;
  label: string;
  href: string;
  permission: PermissionKey;
  icon: NavIcon;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: NavIcon;
  permission: PermissionKey;
  section: 'primary' | 'footer';
  /** Which Figma sidebar variant shows this item */
  variants: SidebarVariant[];
  /** Direct link (no children) */
  href?: string;
  /** Expandable submenu */
  children?: NavChild[];
}

/** All portal nav — filtered by role variant + RBAC permission */
export const PORTAL_NAV: NavGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    permission: 'dashboard:view',
    section: 'primary',
    variants: ['student', 'teacher', 'admin'],
  },
  {
    id: 'request-appointment',
    label: 'Request appointment',
    href: '/appointments/request',
    icon: 'calendar-plus',
    permission: 'appointment:request',
    section: 'primary',
    variants: ['student'],
  },
  {
    id: 'my-appointments',
    label: 'My Appointments',
    href: '/appointments',
    icon: 'calendar',
    permission: 'appointment:read_own',
    section: 'primary',
    variants: ['student'],
  },
  {
    id: 'appointments-group',
    label: 'Appointments',
    icon: 'clipboard',
    permission: 'appointment:manage',
    section: 'primary',
    variants: ['teacher', 'admin'],
    children: [
      { id: 'all-appointments', label: 'All Appointments', href: '/appointments', permission: 'appointment:manage', icon: 'calendar' },
      { id: 'request-appt', label: 'Request Appointment', href: '/appointments/request', permission: 'appointment:request', icon: 'calendar-plus' },
    ],
  },
  {
    id: 'mentors',
    label: 'Mentors',
    href: '/mentors',
    icon: 'users',
    permission: 'mentor:read',
    section: 'primary',
    variants: ['student'],
  },
  {
    id: 'session-management',
    label: 'Session Management',
    icon: 'mic',
    permission: 'report:manage',
    section: 'primary',
    variants: ['admin'],
    children: [
      { id: 'record', label: 'Record Sessions', href: '/sessions/record', permission: 'session:record', icon: 'mic' },
      { id: 'reports-manage', label: 'Reports & Sessions', href: '/reports', permission: 'report:manage', icon: 'file-text' },
    ],
  },
  {
    id: 'ai-reports',
    label: 'AI Reports',
    href: '/reports',
    icon: 'file-text',
    permission: 'report:read',
    section: 'primary',
    variants: ['teacher'],
  },
  {
    id: 'record-sessions',
    label: 'Record Sessions',
    href: '/sessions/record',
    icon: 'mic',
    permission: 'session:record',
    section: 'primary',
    variants: ['teacher'],
  },
  {
    id: 'profiles',
    label: 'Profiles',
    href: '/profiles',
    icon: 'user-circle',
    permission: 'profile:read',
    section: 'primary',
    variants: ['teacher', 'admin'],
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: 'user-cog',
    permission: 'user:manage',
    section: 'primary',
    variants: ['teacher', 'admin'],
    children: [
      { id: 'users', label: 'Users', href: '/users', permission: 'user:manage', icon: 'user-cog' },
      { id: 'roles', label: 'Roles', href: '/users/roles', permission: 'role:manage', icon: 'users' },
      {
        id: 'mentorship-connect',
        label: 'Mentorship Connect',
        href: '/users/mentorship-connect',
        permission: 'user:manage',
        icon: 'users',
      },
    ],
  },
  {
    id: 'template-management',
    label: 'Template Management',
    href: '/templates',
    icon: 'layout-template',
    permission: 'template:manage',
    section: 'primary',
    variants: ['teacher', 'admin'],
  },
  {
    id: 'surveys',
    label: 'Mentorship Surveys',
    href: '/surveys',
    icon: 'clipboard',
    permission: 'survey:read',
    section: 'primary',
    variants: ['teacher', 'admin'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: 'bar-chart',
    permission: 'analytics:view_system',
    section: 'primary',
    variants: ['admin'],
  },
  {
    id: 'chatbot',
    label: 'AI Chatbot',
    href: '/chatbot',
    icon: 'message-circle',
    permission: 'chatbot:use',
    section: 'primary',
    variants: ['student', 'teacher', 'admin'],
  },
  {
    id: 'peer-review',
    label: 'Peer Review',
    href: '/peer-review',
    icon: 'users',
    permission: 'peer-review:read',
    section: 'primary',
    variants: ['admin'],
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: 'settings',
    permission: 'settings:read',
    section: 'footer',
    variants: ['student', 'teacher', 'admin'],
  },
  {
    id: 'support',
    label: 'Support',
    href: '/support',
    icon: 'life-buoy',
    permission: 'support:read',
    section: 'footer',
    variants: ['student', 'teacher', 'admin'],
  },
];

export function getSidebarVariant(role: Role): SidebarVariant {
  if (role === 'STUDENT') return 'student';
  if (role === 'TEACHER') return 'teacher';
  return 'admin';
}

/** Page title shown in header — keyed by pathname */
export const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'DASHBOARD',
  '/appointments': 'PORTAL',
  '/appointments/request': 'REQUEST APPOINTMENT',
  '/mentors': 'Mentors',
  '/sessions/record': 'PORTAL',
  '/reports': 'Report Management',
  '/profiles': 'Profiles',
  '/users': 'User Management',
  '/users/add': 'Add User',
  '/users/roles': 'ROLES',
  '/users/mentorship-connect': 'MENTOR PORTAL',
  '/templates': 'Template Management',
  '/templates/create': 'Create Template',
  '/analytics': 'Analytics',
  '/surveys': 'Mentorship Surveys',
  '/chatbot': 'AI Chatbot',
  '/peer-review': 'Peer Review',
  '/settings': 'Settings',
  '/settings/security': 'Security',
  '/settings/notifications': 'Notifications',
  '/support': 'Support',
};
