const STEPS = [
  {
    title: 'Request Input',
    desc: 'Students and mentors submit requests through a unified intake system.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    position: 'top' as const,
  },
  {
    title: 'Smart Matching',
    desc: 'AI pairs students with the most suitable mentor automatically.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    position: 'bottom' as const,
  },
  {
    title: 'Attend Sessions',
    desc: 'Conduct and log mentorship sessions with structured records.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    position: 'top' as const,
  },
  {
    title: 'Health Analytics',
    desc: 'Track engagement, wellness, and mentorship outcomes in real time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    position: 'bottom' as const,
  },
  {
    title: 'Secure Execution',
    desc: 'Role-based permissions ensure every action is safe and auditable.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    position: 'top' as const,
  },
];

export function ProcessTimeline() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl px-4">
      {/* Dashed zigzag connector — desktop only */}
      <svg
        className="absolute inset-x-0 top-[88px] hidden h-[120px] w-full md:block"
        viewBox="0 0 900 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M50,30 L200,90 L350,30 L500,90 L650,30 L800,90"
          fill="none"
          stroke="#c6c6cd"
          strokeWidth="2"
          strokeDasharray="8 6"
        />
      </svg>

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-4">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className={`flex flex-col items-center text-center ${step.position === 'bottom' ? 'md:mt-24' : ''}`}
          >
            <div className="relative z-10 flex size-[72px] items-center justify-center rounded-full border-2 border-mento-auth-navy bg-white text-mento-auth-navy shadow-sm">
              {step.icon}
            </div>
            <h3 className="mt-4 text-sm font-bold text-mento-auth-navy">{step.title}</h3>
            <p className="mt-2 max-w-[160px] text-xs leading-relaxed text-gray-500">{step.desc}</p>
            {i < STEPS.length - 1 && (
              <div className="mt-4 h-px w-12 bg-gray-300 md:hidden" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
