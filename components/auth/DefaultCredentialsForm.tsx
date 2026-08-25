import Link from 'next/link';
import { OtpIllustration } from '@/components/auth/OtpIllustration';

export function DefaultCredentialsForm() {
  return (
    <div className="w-full max-w-[360px]">
      <div className="text-center">
        <OtpIllustration className="mx-auto h-auto w-[170px]" />
        <h1 className="mt-5 text-[24px] font-bold leading-snug text-[#041135] md:text-[26px]">
          Registration Successful
        </h1>
        <p className="mx-auto mt-4 max-w-[320px] text-[13px] font-normal leading-relaxed text-[#041135]/80">
          Your account has been created successfully. We have sent temporary login credentials to
          your email. Please check your inbox and log in to activate your account.
        </p>
      </div>

      <Link
        href="/login"
        className="mt-8 flex h-[48px] w-full items-center justify-center rounded-[8px] bg-[#041135] text-[14px] font-bold tracking-wide text-white transition hover:bg-[#030d28]"
      >
        GO TO LOGIN
      </Link>
    </div>
  );
}
