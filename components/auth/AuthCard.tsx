import type { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
  title?: string;
}

export function AuthCard({ children, title }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef1f8] via-[#f5f6fb] to-[#e8ecf4] p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl lg:grid-cols-2">
          <div className="relative hidden min-h-[520px] overflow-hidden bg-mento-auth-navy lg:block">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-35 transition duration-700 hover:scale-105"
              style={{ backgroundImage: 'url(https://picsum.photos/seed/mento-classroom/800/1200)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-mento-auth-navy via-mento-auth-navy/92 to-mento-auth-navy/70" />
            <div className="relative flex h-full flex-col justify-end p-10 text-white">
              <h1 className="font-gabarito text-4xl font-bold leading-tight">
                Code.<br />Mentor.<br />Accelerate.
              </h1>
              <p className="mt-4 max-w-xs font-gabarito text-sm leading-relaxed text-white/70">
                Rwanda Coding Academy mentorship portal
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            {title && (
              <h2 className="mb-6 font-gabarito text-2xl font-bold text-mento-auth-navy">{title}</h2>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
