'use server';

import { redirect } from 'next/navigation';
import { getMockUserForRole } from './mock-users';
import { clearSession, getSession, setSession } from './session';
import type { Role } from '../rbac/roles';
import { isRole } from '../rbac/roles';

/** Mock login — picks role from email prefix for demo */
function roleFromEmail(email: string): Role {
  const lower = email.toLowerCase();
  if (lower.includes('admin')) return 'ADMIN';
  if (lower.includes('teacher') || lower.includes('mentor')) return 'TEACHER';
  if (lower.includes('super')) return 'SUPER_ADMIN';
  return 'STUDENT';
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? 'student@rca.ac.rw');
  const role = roleFromEmail(email);
  const user = getMockUserForRole(role);
  await setSession({ user, role, issuedAt: new Date().toISOString() });
  redirect('/dashboard');
}

export async function signupAction(_formData: FormData) {
  redirect('/otp');
}

export async function otpAction(_formData: FormData) {
  redirect('/verify-account');
}

export async function verifyAction() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }
  // First-time verify → create student session
  const user = getMockUserForRole('STUDENT');
  await setSession({ user, role: 'STUDENT', issuedAt: new Date().toISOString() });
  redirect('/dashboard');
}

export async function forgotPasswordAction(_formData: FormData) {
  redirect('/reset-password');
}

export async function resetPasswordAction(_formData: FormData) {
  redirect('/change-password');
}

export async function changePasswordAction(_formData: FormData) {
  redirect('/password-updated');
}

export async function firstLoginAction(formData: FormData) {
  await loginAction(formData);
}

export async function signInAction(role: Role, _redirectTo = '/dashboard') {
  const user = getMockUserForRole(role);
  await setSession({
    user,
    role,
    issuedAt: new Date().toISOString(),
  });
  redirect('/dashboard');
}

export async function signOutAction() {
  await clearSession();
  redirect('/login');
}

/** Dev/demo: simulate a different authenticated user without URL-based role params. */
export async function switchRoleAction(role: Role) {
  if (!isRole(role)) {
    throw new Error('Invalid role');
  }
  const user = getMockUserForRole(role);
  await setSession({
    user,
    role,
    issuedAt: new Date().toISOString(),
  });
}

export async function getSessionAction() {
  return getSession();
}
