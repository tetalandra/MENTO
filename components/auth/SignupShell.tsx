import type { ReactNode } from 'react';
import Image from 'next/image';

interface SignupShellProps {
  children: ReactNode;
}

export function SignupShell({ children }: SignupShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden font-gabarito">
      {/* Blurred classroom background */}
      <div className="absolute inset-0">
        <Image
          src="/images/signup-bg.png"
          alt=""
          fill
          className="scale-105 object-cover blur-[4px] brightness-[0.85]"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden />
      </div>

      {/* Centered card */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 md:px-6">
        <div className="flex w-full max-w-[920px] overflow-hidden rounded-[16px] bg-white shadow-[0_16px_48px_rgba(4,17,53,0.2)]">
          {/* Left panel — clear image with diagonal edge */}
          <div className="relative hidden min-h-[540px] w-[46%] shrink-0 lg:block">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 87% 100%, 0 100%)' }}
            >
              <Image
                src="/images/signup-bg.png"
                alt="Mentor and student in classroom"
                fill
                className="object-cover object-[center_20%]"
                priority
                sizes="420px"
              />
              {/* Light bottom gradient — keeps photo clear */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                aria-hidden
              />
              <div className="relative flex h-full flex-col justify-end p-10 pb-11">
                <h1 className="text-[1.6rem] font-bold leading-tight text-white">
                  Code. Mentor. Accelerate.
                </h1>
                <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-white/85">
                  Access the intelligent digital backbone driving software engineering excellence at
                  Rwanda Coding Academy.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="flex flex-1 flex-col justify-center px-10 py-12 md:px-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
