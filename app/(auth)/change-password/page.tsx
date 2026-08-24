'use client';

import { useTransition } from 'react';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput, AuthSubmitButton } from '@/components/auth/AuthFormParts';
import { changePasswordAction } from '@/lib/auth/actions';

export default function ChangePasswordPage() {
  const [pending, startTransition] = useTransition();

  return (
    <AuthCard title="Change Password">
      <div className="w-full max-w-md">
        <p className="mb-4 font-gabarito text-sm text-gray-500">You must change your password before continuing</p>
        <form action={fd => startTransition(() => changePasswordAction(fd))} className="space-y-4">
          <AuthInput label="Current Password" name="current" type="password" />
          <AuthInput label="New Password" name="password" type="password" />
          <AuthInput label="Confirm Password" name="confirm" type="password" />
          <AuthSubmitButton label={pending ? 'Updating…' : 'Update Password'} pending={pending} />
        </form>
      </div>
    </AuthCard>
  );
}
