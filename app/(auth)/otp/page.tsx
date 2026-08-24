'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput, AuthSubmitButton } from '@/components/auth/AuthFormParts';
import { otpAction } from '@/lib/auth/actions';

export default function OtpPage() {
  const [pending, startTransition] = useTransition();

  return (
    <AuthCard title="OTP Verification">
      <div className="w-full max-w-md">
        <p className="font-gabarito text-sm text-gray-500">Enter your contact details to receive a code</p>
        <form
          action={fd => startTransition(() => otpAction(fd))}
          className="mt-6 space-y-4"
        >
          <AuthInput label="Email" name="email" type="email" defaultValue="student@rca.ac.rw" />
          <AuthInput label="Phone" name="phone" type="tel" placeholder="+250 7XX XXX XXX" />
          <AuthSubmitButton label={pending ? 'Sending…' : 'GET OTP'} pending={pending} />
        </form>
        <Link href="/login" className="mt-6 block text-center font-gabarito text-sm text-mento-auth-navy hover:underline">
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}
