'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { loginAction } from '@/lib/auth/actions';
import { AuthInput, AuthSubmitButton } from './AuthFormParts';

export function LoginForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => loginAction(formData));
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="font-gabarito text-3xl font-bold text-mento-auth-navy">Welcome Back!</h1>
      <p className="mt-2 font-gabarito text-sm text-gray-500">Sign in to your Mento account</p>

      <form action={handleSubmit} className="mt-8 space-y-4">
        <AuthInput label="Email" name="email" type="email" defaultValue="student@rca.ac.rw" />
        <AuthInput label="Password" name="password" type="password" defaultValue="password" />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-gabarito text-xs text-gray-600">
            <input type="checkbox" name="remember" defaultChecked className="size-4 rounded" />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-gabarito text-xs font-medium text-mento-auth-navy hover:underline">
            Forgot password?
          </Link>
        </div>

        <AuthSubmitButton label={pending ? 'Signing in…' : 'Login'} pending={pending} />
      </form>

      <p className="mt-6 text-center font-gabarito text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold text-mento-auth-navy hover:underline">
          Get started
        </Link>
      </p>

      <p className="mt-4 text-center font-gabarito text-xs text-gray-400">
        Demo tip: use admin@ / teacher@ / student@ in email to switch roles
      </p>
    </div>
  );
}
