'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput, AuthSubmitButton } from '@/components/auth/AuthFormParts';
import { verifyAction } from '@/lib/auth/actions';

export default function VerifyPage() {
  const [pending, startTransition] = useTransition();

  return (
    <AuthCard title="Verify OTP">
      <div className="w-full max-w-md">
        <p className="font-gabarito text-sm text-gray-500">Enter the 6-digit code sent to your email</p>
        <form action={() => startTransition(() => verifyAction())} className="mt-6 space-y-4">
          <AuthInput label="OTP Code" name="otp" placeholder="123456" defaultValue="123456" />
          <AuthSubmitButton label={pending ? 'Verifying…' : 'Verify Account'} pending={pending} />
        </form>
        <Link href="/otp" className="mt-4 block text-center font-gabarito text-sm text-mento-auth-navy hover:underline">
          Resend code
        </Link>
      </div>
    </AuthCard>
  );
}
