import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { assertPermission } from '@/lib/rbac/authorize';
import type { PermissionKey } from '@/lib/rbac/permissions';
import { PERMISSIONS, toPermissionString } from '@/lib/rbac/permissions';
import { getPermissionKeysForRole } from '@/lib/rbac/authorize';

/** Demo API — enforces the same RBAC as the UI (Fortress routeMap pattern). */
export async function POST(request: Request) {
  const session = await getSession();
  const body = await request.json() as { permission?: PermissionKey };

  if (!body.permission || !(body.permission in PERMISSIONS)) {
    return NextResponse.json({ error: 'Invalid permission key' }, { status: 400 });
  }

  const result = assertPermission(session, body.permission);
  if (!result.allowed) {
    return NextResponse.json(
      {
        allowed: false,
        reason: result.reason,
        required: toPermissionString(PERMISSIONS[body.permission]),
      },
      { status: 403 },
    );
  }

  return NextResponse.json({
    allowed: true,
    user: result.session.user,
    role: result.session.role,
    permission: body.permission,
    message: `Authorized: ${toPermissionString(PERMISSIONS[body.permission])}`,
  });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const permissions = getPermissionKeysForRole(session.role);
  return NextResponse.json({
    user: session.user,
    role: session.role,
    permissions,
  });
}
