import type { ReactNode } from 'react';
import Image from 'next/image';

interface AuthSplitShellProps {
  children: ReactNode;
  /** Thin blue rim around the card (used on OTP). */
  withBlueBorder?: boolean;
}

export function AuthSplitShell({ children, withBlueBorder = false }: AuthSplitShellProps) {
  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden font-gabarito">
      <div className="absolute inset-0">
        <Image
          src="/images/signup-bg.png"
          alt=""
          fill
          className="scale-110 object-cover blur-[8px] brightness-[0.75]"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#041135]/25" aria-hidden />
      </div>

      <div className="relative flex h-full items-center justify-center px-4 py-3 md:px-8">
        <div
          className={`relative flex h-[calc(100dvh-1.5rem)] max-h-[640px] w-full max-w-[1080px] overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_24px_80px_rgba(4,17,53,0.28)] lg:p-5 ${
            withBlueBorder ? 'border border-[#60a5fa]/80' : ''
          }`}
        >
          <div className="relative hidden h-full w-[46%] shrink-0 overflow-hidden rounded-[16px] lg:block">
            <div
              className="absolute inset-0"
              style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)' }}
            >
              <Image
                src="/images/signup-bg.png"
                alt="Mentor and student in classroom"
                fill
                className="object-cover object-[30%_center]"
                priority
                sizes="500px"
              />
              <div className="absolute inset-0 bg-[#041135]/32" aria-hidden />
            </div>
            <div className="relative flex h-full max-w-[85%] flex-col justify-center px-8 pr-14">
              <h1 className="text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-white xl:text-[30px]">
                Code. Mentor. Accelerate.
              </h1>
              <p className="mt-4 max-w-[270px] text-[13px] font-normal leading-[1.6] text-white/90">
                Access the intelligent digital backbone driving software engineering excellence at
                Rwanda Coding Academy.
              </p>
            </div>
          </div>

          <div className="flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden px-6 lg:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
