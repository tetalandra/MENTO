'use client';

import { useRef, useState, useTransition, type KeyboardEvent, type ClipboardEvent } from 'react';
import Link from 'next/link';
import { verifyAction } from '@/lib/auth/actions';
import { OtpIllustration } from './OtpIllustration';

const OTP_LENGTH = 6;

export function VerifyOtpForm() {
  const [pending, startTransition] = useTransition();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function focusIndex(index: number) {
    const el = inputsRef.current[index];
    if (el) el.focus();
  }

  function updateDigit(index: number, value: string) {
    const char = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < OTP_LENGTH - 1) focusIndex(index + 1);
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusIndex(index - 1);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((ch, i) => {
      next[i] = ch;
    });
    setDigits(next);
    focusIndex(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  function handleSubmit() {
    startTransition(() => verifyAction());
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="text-center">
        <OtpIllustration />
        <h1 className="mt-4 text-[26px] font-bold leading-none text-[#041135]">OTP Verification</h1>
        <p className="mx-auto mt-3 max-w-[280px] text-[13px] font-normal leading-relaxed text-[#667085]">
          Enter the security security code sent to your official student email address.
        </p>
      </div>

      <form
        action={handleSubmit}
        className="mt-8"
      >
        <input type="hidden" name="otp" value={digits.join('')} />

        <div className="flex items-center justify-center gap-2.5">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={el => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={digit}
              onChange={e => updateDigit(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={handlePaste}
              aria-label={`Digit ${i + 1}`}
              className="size-11 rounded-[8px] border border-[#d0d5dd] bg-white text-center text-lg font-semibold text-[#041135] outline-none focus:border-[#041135] focus:ring-1 focus:ring-[#041135]/15 sm:size-12"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-8 h-[48px] w-full rounded-[8px] bg-[#041135] text-[14px] font-bold tracking-wide text-white transition hover:bg-[#030d28] disabled:opacity-60"
        >
          {pending ? 'Verifying…' : 'VERIFY OTP'}
        </button>
      </form>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-[13px] text-[#041135]">
        <span>Didn&apos;t receive code?</span>
        <Link href="/otp" className="font-semibold text-[#e11d48] hover:underline">
          Resend
        </Link>
      </p>
    </div>
  );
}
