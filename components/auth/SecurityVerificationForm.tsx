import Link from 'next/link';
import { OtpIllustration } from '@/components/auth/OtpIllustration';

export function SecurityVerificationForm() {
  return (
    <div className="w-full max-w-[360px]">
      <div className="text-center">
        <OtpIllustration className="mx-auto h-auto w-[170px]" />
        <h1 className="mt-5 text-[22px] font-bold leading-snug text-[#041135] md:text-[24px]">
          Security Verification Required
        </h1>
        <p className="mx-auto mt-4 max-w-[320px] text-[13px] font-normal leading-relaxed text-[#667085]">
          Your credentials have been successfully authenticated. For security purposes, a One-Time
          Password (OTP) has been sent to your registered email address. Please retrieve the code
          and proceed with verification to continue.
        </p>
      </div>

      <Link
        href="/verify"
        className="mt-8 flex h-[48px] w-full items-center justify-center rounded-[8px] bg-[#041135] text-[14px] font-bold tracking-wide text-white transition hover:bg-[#030d28]"
      >
        VERIFY MY ACCOUNT
      </Link>
    </div>
  );
}
