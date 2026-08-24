import type { PermissionKey } from './permissions';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  permission: PermissionKey;
  icon: NavIcon;
  section: 'primary' | 'footer';
}

export type NavIcon =
  | 'dashboard'
  | 'calendar-plus'
  | 'calendar'
  | 'users'
  | 'clipboard'
  | 'file-text'
  | 'mic'
  | 'user-circle'
  | 'user-cog'
  | 'bar-chart'
  | 'layout-template'
  | 'settings'
  | 'life-buoy'
  | 'message-circle';

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', permission: 'dashboard:view', icon: 'dashboard', section: 'primary' },
  { id: 'request-appointment', label: 'Request appointment', href: '/dashboard#request', permission: 'appointment:request', icon: 'calendar-plus', section: 'primary' },
  { id: 'my-appointments', label: 'My Appointments', href: '/dashboard#appointments', permission: 'appointment:read_own', icon: 'calendar', section: 'primary' },
  { id: 'mentors', label: 'Mentors', href: '/dashboard#mentors', permission: 'mentor:read', icon: 'users', section: 'primary' },
  { id: 'appointments', label: 'Appointments', href: '/dashboard#appointments', permission: 'appointment:manage', icon: 'clipboard', section: 'primary' },
  { id: 'ai-reports', label: 'AI Reports', href: '/dashboard#reports', permission: 'report:read', icon: 'file-text', section: 'primary' },
  { id: 'record-sessions', label: 'Record Sessions', href: '/dashboard#record', permission: 'session:record', icon: 'mic', section: 'primary' },
  { id: 'profiles', label: 'Profiles', href: '/dashboard#profiles', permission: 'profile:read', icon: 'user-circle', section: 'primary' },
  { id: 'user-management', label: 'User Management', href: '/dashboard#users', permission: 'user:manage', icon: 'user-cog', section: 'primary' },
  { id: 'reports-sessions', label: 'Reports & Sessions', href: '/dashboard#reports', permission: 'report:manage', icon: 'file-text', section: 'primary' },
  { id: 'template-management', label: 'Template Management', href: '/dashboard#templates', permission: 'template:manage', icon: 'layout-template', section: 'primary' },
  { id: 'analytics', label: 'Analytics', href: '/dashboard#analytics', permission: 'analytics:view_system', icon: 'bar-chart', section: 'primary' },
  { id: 'settings', label: 'Settings', href: '/dashboard#settings', permission: 'settings:read', icon: 'settings', section: 'footer' },
  { id: 'support', label: 'Support', href: '/dashboard#support', permission: 'support:read', icon: 'life-buoy', section: 'footer' },
];
