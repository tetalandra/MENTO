'use client';

import { useTransition } from 'react';
import { otpAction } from '@/lib/auth/actions';
import { OtpIllustration } from './OtpIllustration';

export function OtpForm() {
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => otpAction(formData));
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="text-center">
        <OtpIllustration className="mx-auto h-auto w-[180px]" />
        <h1 className="mt-4 text-[26px] font-bold leading-none text-[#041135]">OTP Verification</h1>
        <p className="mx-auto mt-3 max-w-[280px] text-[13px] font-normal leading-relaxed text-[#667085]">
          Enter the security security code sent to your official student email address.
        </p>
      </div>

      <form action={handleSubmit} className="mt-7 space-y-[14px]">
        <input
          name="email"
          type="email"
          placeholder="Enter your Email to get verification code"
          className="h-[44px] w-full rounded-[8px] border border-[#d0d5dd] bg-white px-3.5 text-[13.5px] text-[#041135] outline-none placeholder:text-[#98a2b3] focus:border-[#041135]"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          className="h-[44px] w-full rounded-[8px] border border-[#d0d5dd] bg-white px-3.5 text-[13.5px] text-[#041135] outline-none placeholder:text-[#98a2b3] focus:border-[#041135]"
        />

        <button
          type="submit"
          disabled={pending}
          className="mt-1 h-[48px] w-full rounded-[8px] bg-[#041135] text-[14px] font-bold tracking-wide text-white transition hover:bg-[#030d28] disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'GET OTP'}
        </button>
      </form>
    </div>
  );
}
