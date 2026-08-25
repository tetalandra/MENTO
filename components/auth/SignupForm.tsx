'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { signupAction } from '@/lib/auth/actions';

function SignupField({
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
        className="h-[40px] w-full rounded-[8px] border border-[#d0d5dd] bg-white px-3.5 text-[13.5px] text-[#041135] outline-none placeholder:text-[#98a2b3] focus:border-[#041135]"
      />
    </div>
  );
}

function TwoFactorToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Toggle two-factor authentication"
        onClick={() => setEnabled(v => !v)}
        className={`relative h-[22px] w-[40px] shrink-0 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-[#041135]' : 'bg-[#e4e7ec]'
        }`}
      >
        <span
          className={`absolute top-[3px] size-4 rounded-full shadow-sm transition-all duration-200 ${
            enabled ? 'translate-x-[20px] bg-white' : 'translate-x-[3px] bg-[#041135]'
          }`}
        />
      </button>
      <span className="text-[13px] font-medium text-[#041135]">2FA</span>
      <input type="hidden" name="twoFactor" value={enabled ? 'on' : ''} />
    </div>
  );
}

export function SignupForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => signupAction(formData));
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="text-center">
        <h1 className="text-[26px] font-bold leading-none text-[#041135]">Create account</h1>
        <p className="mt-2 text-[13px] font-normal text-[#667085]">
          create your account and unlock exclusive features
        </p>
      </div>

      <form action={handleSubmit} className="mt-5 space-y-[12px]">
        <SignupField label="Full Name" name="fullName" placeholder="e.g John Doe" />
        <SignupField label="Email Adress" name="email" type="email" placeholder="e.g John@gmail.com" />
        <SignupField label="ID" name="studentId" placeholder="e.g 0456-0987-8828" />
        <SignupField label="Password" name="password" type="password" placeholder="Enter your password here" />

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              className="size-[15px] appearance-none rounded-[3px] border border-[#d0d5dd] bg-white checked:border-[#041135] checked:bg-[#041135] checked:bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 12 12%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M2.5 6.2L4.8 8.5L9.5 3.5%27 stroke=%27white%27 stroke-width=%271.6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat"
            />
            <span className="text-[13px] font-medium text-[#041135]">Remember me</span>
          </label>
          <TwoFactorToggle />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-[44px] w-full rounded-[8px] bg-[#041135] text-[14px] font-bold text-white transition hover:bg-[#030d28] disabled:opacity-60"
        >
          {pending ? 'Creating…' : 'Create Account'}
        </button>
      </form>

      <p className="mt-4 text-center text-[13px] text-[#041135]">
        Already have an account?{' '}
        <Link href="/login" className="font-bold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
