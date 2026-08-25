'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { firstLoginAction } from '@/lib/auth/actions';

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-bold text-[#041135]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-[44px] w-full rounded-[8px] border border-[#d0d5dd] bg-white px-3.5 text-[13.5px] text-[#041135] outline-none placeholder:text-[#98a2b3] focus:border-[#041135]"
      />
    </div>
  );
}

export function FirstLoginForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => firstLoginAction(formData));
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="text-center">
        <h1 className="text-[26px] font-bold leading-none text-[#041135]">Welcome Back!</h1>
        <p className="mt-2 text-[13px] font-normal text-[#667085]">
          Enter your credentials to access Mento
        </p>
      </div>

      <form action={handleSubmit} className="mt-8 space-y-[14px]">
        <Field label="Email" name="email" type="email" placeholder="Enter your email" />
        <Field label="Password" name="password" type="password" placeholder="Enter your password" />

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              className="size-[15px] appearance-none rounded-[3px] border border-[#d0d5dd] bg-white checked:border-[#041135] checked:bg-[#041135] checked:bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 12 12%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M2.5 6.2L4.8 8.5L9.5 3.5%27 stroke=%27white%27 stroke-width=%271.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat"
            />
            <span className="text-[13px] font-medium text-[#041135]">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[13px] font-medium text-[#041135] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-[48px] w-full rounded-[8px] bg-[#041135] text-[14px] font-bold tracking-wide text-white transition hover:bg-[#030d28] disabled:opacity-60"
        >
          {pending ? 'Signing in…' : 'LOGIN'}
        </button>
      </form>

      <p className="mt-5 text-center text-[13px] text-[#041135]">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-bold hover:underline">
          Get started
        </Link>
      </p>
    </div>
  );
}
