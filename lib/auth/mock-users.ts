import type { User } from './types';
import type { Role } from '../rbac/roles';

export const MOCK_USERS: Record<Role, User> = {
  STUDENT: {
    id: 'user-student',
    name: 'Nziza Ange',
    email: 'student@rca.ac.rw',
  },
  TEACHER: {
    id: 'user-teacher',
    name: 'Dr. Olivier',
    email: 'olivier@rca.ac.rw',
  },
  ADMIN: {
    id: 'user-admin',
    name: 'Dr. Papias',
    email: 'admin@rca.ac.rw',
  },
  SUPER_ADMIN: {
    id: 'user-super-admin',
    name: 'Super Admin',
    email: 'superadmin@rca.ac.rw',
  },
};

export function getMockUserForRole(role: Role): User {
  return MOCK_USERS[role];
}
