'use client';

import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <ResetPasswordForm />
    </AuthSplitShell>
  );
}
