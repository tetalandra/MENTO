'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { signupAction } from '@/lib/auth/actions';
import { AuthInput, AuthSubmitButton } from './AuthFormParts';

export function SignupForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => signupAction(formData));
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="font-gabarito text-3xl font-bold text-mento-auth-navy">Create Account</h1>
      <p className="mt-2 font-gabarito text-sm text-gray-500">Join the RCA mentorship program</p>

      <form action={handleSubmit} className="mt-8 space-y-4">
        <AuthInput label="Full Name" name="fullName" placeholder="Your name" />
        <AuthInput label="Email" name="email" type="email" placeholder="you@rca.ac.rw" />
        <AuthInput label="Student ID" name="studentId" placeholder="RCA-2024-001" />
        <AuthInput label="Password" name="password" type="password" placeholder="••••••••" />

        <label className="flex items-center gap-2 font-gabarito text-xs text-gray-600">
          <input type="checkbox" name="remember" className="size-4 rounded" />
          Remember me
        </label>

        <label className="flex items-center justify-between font-gabarito text-xs text-gray-600">
          <span>Enable 2FA</span>
          <input type="checkbox" name="twoFactor" className="size-4 rounded" />
        </label>

        <AuthSubmitButton label={pending ? 'Creating…' : 'Create Account'} pending={pending} />
      </form>

      <p className="mt-6 text-center font-gabarito text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-mento-auth-navy hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
