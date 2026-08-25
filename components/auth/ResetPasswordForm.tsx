'use client';

import { useTransition } from 'react';
import { resetPasswordAction } from '@/lib/auth/actions';

function ResetPasswordIllustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="mx-auto h-auto w-[160px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Desk / base */}
      <ellipse cx="100" cy="108" rx="70" ry="8" fill="#e0e7ff" />

      {/* Left monitor */}
      <rect x="28" y="42" width="52" height="38" rx="3" fill="#041135" />
      <rect x="32" y="46" width="44" height="28" rx="2" fill="#93c5fd" />
      <rect x="48" y="80" width="12" height="8" fill="#64748b" />
      <rect x="40" y="88" width="28" height="4" rx="1" fill="#94a3b8" />

      {/* Right monitor */}
      <rect x="120" y="38" width="52" height="42" rx="3" fill="#041135" />
      <rect x="124" y="42" width="44" height="32" rx="2" fill="#bfdbfe" />
      <rect x="140" y="80" width="12" height="8" fill="#64748b" />
      <rect x="132" y="88" width="28" height="4" rx="1" fill="#94a3b8" />

      {/* Screen content */}
      <rect x="36" y="50" width="20" height="3" rx="1" fill="white" opacity="0.8" />
      <rect x="36" y="56" width="28" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="36" y="61" width="24" height="2" rx="1" fill="white" opacity="0.5" />
      <circle cx="146" cy="56" r="8" fill="#3b82f6" />
      <rect x="130" y="68" width="32" height="3" rx="1" fill="#1e40af" opacity="0.4" />

      {/* Left person */}
      <circle cx="70" cy="58" r="10" fill="#fbbf24" />
      <circle cx="70" cy="55" r="5" fill="#78350f" />
      <path d="M58 90c0-8 5-14 12-14s12 6 12 14" fill="#2563eb" />

      {/* Right person */}
      <circle cx="130" cy="54" r="10" fill="#fb923c" />
      <circle cx="130" cy="51" r="5" fill="#7c2d12" />
      <path d="M118 90c0-8 5-14 12-14s12 6 12 14" fill="#22c55e" />

      {/* Floating icons */}
      <circle cx="100" cy="28" r="10" fill="#3b82f6" />
      <path
        d="M96 28h8M100 24v8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="168" y="24" width="16" height="16" rx="3" fill="#60a5fa" />
      <path d="M172 32h8M176 28v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ResetPasswordForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => resetPasswordAction(formData));
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="text-center">
        <ResetPasswordIllustration />
        <h1 className="mt-4 text-[26px] font-bold leading-none text-[#041135]">Reset Password</h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[13px] font-normal leading-relaxed text-[#667085]">
          Reset your password. And make sure to put a password that is easy for you to remember.
        </p>
      </div>

      <form action={handleSubmit} className="mt-7 space-y-[14px]">
        <input
          name="password"
          type="password"
          placeholder="Create new password"
          className="h-[44px] w-full rounded-[8px] border border-[#d0d5dd] bg-white px-3.5 text-[13.5px] text-[#041135] outline-none placeholder:text-[#98a2b3] focus:border-[#041135]"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          className="h-[44px] w-full rounded-[8px] border border-[#d0d5dd] bg-white px-3.5 text-[13.5px] text-[#041135] outline-none placeholder:text-[#98a2b3] focus:border-[#041135]"
        />

        <button
          type="submit"
          disabled={pending}
          className="mt-1 h-[48px] w-full rounded-[8px] bg-[#041135] text-[14px] font-bold tracking-wide text-white transition hover:bg-[#030d28] disabled:opacity-60"
        >
          {pending ? 'Saving…' : 'RESET PASSWORD'}
        </button>
      </form>
    </div>
  );
}
