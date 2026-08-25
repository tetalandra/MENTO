'use client';

import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { OtpForm } from '@/components/auth/OtpForm';

export default function OtpPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <OtpForm />
    </AuthSplitShell>
  );
}
