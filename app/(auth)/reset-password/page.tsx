'use client';

import { useTransition } from 'react';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput, AuthSubmitButton } from '@/components/auth/AuthFormParts';
import { resetPasswordAction } from '@/lib/auth/actions';

export default function ResetPasswordPage() {
  const [pending, startTransition] = useTransition();

  return (
    <AuthCard title="Reset Password">
      <div className="w-full max-w-md">
        <form action={fd => startTransition(() => resetPasswordAction(fd))} className="space-y-4">
          <AuthInput label="New Password" name="password" type="password" />
          <AuthInput label="Confirm Password" name="confirmPassword" type="password" />
          <AuthSubmitButton label={pending ? 'Saving…' : 'Reset Password'} pending={pending} />
        </form>
      </div>
    </AuthCard>
  );
}
