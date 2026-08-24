'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput, AuthSubmitButton } from '@/components/auth/AuthFormParts';
import { forgotPasswordAction } from '@/lib/auth/actions';

export default function ForgotPasswordPage() {
  const [pending, startTransition] = useTransition();

  return (
    <AuthCard title="Forgot Password">
      <div className="w-full max-w-md">
        <p className="font-gabarito text-sm text-gray-500">We&apos;ll send a reset link to your email</p>
        <form action={fd => startTransition(() => forgotPasswordAction(fd))} className="mt-6 space-y-4">
          <AuthInput label="Email" name="email" type="email" defaultValue="student@rca.ac.rw" />
          <AuthSubmitButton label={pending ? 'Sending…' : 'SEND RESET LINK'} pending={pending} />
        </form>
        <Link href="/login" className="mt-6 block text-center font-gabarito text-sm text-mento-auth-navy hover:underline">
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}
