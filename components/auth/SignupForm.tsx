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
      <label htmlFor={name} className="block text-[13px] font-bold text-[#050a30]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3.5 py-[11px] text-sm text-[#050a30] outline-none placeholder:text-[#9ca3af] focus:border-[#050a30] focus:ring-1 focus:ring-[#050a30]/10"
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
        className={`relative h-[20px] w-[36px] shrink-0 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-[#050a30]' : 'bg-[#d1d5db]'
        }`}
      >
        <span
          className={`absolute top-[2px] size-4 rounded-full transition-all duration-200 ${
            enabled ? 'translate-x-[16px] bg-white' : 'translate-x-[2px] bg-[#050a30]'
          }`}
        />
      </button>
      <span className="text-[13px] text-[#050a30]">2FA</span>
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
    <div className="mx-auto w-full max-w-[310px]">
      <div>
        <h1 className="text-[1.45rem] font-bold text-[#050a30]">Create account</h1>
        <p className="mt-1 text-[13px] text-[#6b7280]">
          create your account and unlock exclusive features
        </p>
      </div>

      <form action={handleSubmit} className="mt-7 space-y-[16px]">
        <SignupField label="Full Name" name="fullName" placeholder="e.g John Doe" />
        <SignupField label="Email Adress" name="email" type="email" placeholder="e.g John@gmail.com" />
        <SignupField label="ID" name="studentId" placeholder="e.g 0456-0987-8828" />
        <SignupField label="Password" name="password" type="password" placeholder="Enter your password here" />

        <div className="flex items-center justify-between pt-0.5">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              className="size-[14px] rounded-[2px] border-[#d1d5db] accent-[#050a30]"
            />
            <span className="text-[13px] text-[#050a30]">Remember me</span>
          </label>
          <TwoFactorToggle />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-3 w-full rounded-[6px] bg-[#050a30] py-[13px] text-sm font-bold text-white transition hover:bg-[#030825] disabled:opacity-60"
        >
          {pending ? 'Creating…' : 'Create Account'}
        </button>
      </form>

      <p className="mt-7 text-center text-[13px] text-[#050a30]">
        Already have an account?{' '}
        <Link href="/login" className="font-bold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
