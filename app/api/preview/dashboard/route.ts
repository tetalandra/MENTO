import { NextResponse } from 'next/server';
import { SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth/constants';

/**
 * Demo shortcut: open this URL to land on the admin dashboard without logging in.
 * http://localhost:3000/api/preview/dashboard
 */
export async function GET(request: Request) {
  const session = {
    user: {
      id: 'user-preview-admin',
      name: 'Alex Thompson',
      email: 'alex@rca.ac.rw',
    },
    role: 'SUPER_ADMIN',
    issuedAt: new Date().toISOString(),
  };

  const url = new URL('/dashboard', request.url);
  const response = NextResponse.redirect(url);

  response.cookies.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
