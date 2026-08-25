'use client';

import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { VerifyOtpForm } from '@/components/auth/VerifyOtpForm';

export default function VerifyPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <VerifyOtpForm />
    </AuthSplitShell>
  );
}
