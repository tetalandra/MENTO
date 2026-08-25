'use client';

import { useTransition } from 'react';
import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { forgotPasswordAction } from '@/lib/auth/actions';

function ForgotPasswordForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => forgotPasswordAction(formData));
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="text-center">
        <h1 className="text-[26px] font-bold leading-none text-[#041135]">Welcome Back!</h1>
        <p className="mx-auto mt-4 max-w-[300px] text-[13px] font-normal leading-relaxed text-[#667085]">
          No problem. Enter your email address below, and we&apos;ll send you a link to reset your
          password. You&apos;ll be back in your account in just a few minutes.
        </p>
      </div>

      <form action={handleSubmit} className="mt-8 space-y-[14px]">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-bold text-[#041135]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="h-[44px] w-full rounded-[8px] border border-[#d0d5dd] bg-white px-3.5 text-[13.5px] text-[#041135] outline-none placeholder:text-[#98a2b3] focus:border-[#041135]"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-1 h-[48px] w-full rounded-[8px] bg-[#041135] text-[14px] font-bold tracking-wide text-white transition hover:bg-[#030d28] disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'SEND RESET LINK'}
        </button>
      </form>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <ForgotPasswordForm />
    </AuthSplitShell>
  );
}
