'use client';

import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';

export default function ChangePasswordPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <ChangePasswordForm />
    </AuthSplitShell>
  );
}
