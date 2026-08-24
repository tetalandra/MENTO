import type { Role } from '../rbac/roles';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

/** Authenticated session — role comes from here, never from URL params. */
export interface Session {
  user: User;
  role: Role;
  issuedAt: string;
}

export interface AuthProvider {
  getSession(): Promise<Session | null>;
  createSession(user: User, role: Role): Promise<Session>;
  destroySession(): Promise<void>;
  updateRole(role: Role): Promise<Session | null>;
}
