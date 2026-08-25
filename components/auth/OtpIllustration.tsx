export function OtpIllustration({ className = 'mx-auto h-auto w-[160px]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="78" y="18" width="64" height="104" rx="10" fill="#041135" />
      <rect x="82" y="26" width="56" height="80" rx="4" fill="#eef2ff" />
      <circle cx="110" cy="114" r="4" fill="#94a3b8" />

      <circle cx="110" cy="52" r="14" fill="#c7d2fe" />
      <circle cx="110" cy="48" r="7" fill="#6366f1" />
      <ellipse cx="110" cy="62" rx="10" ry="6" fill="#6366f1" />
      <rect x="96" y="74" width="28" height="6" rx="3" fill="#a5b4fc" />
      <rect x="92" y="84" width="36" height="5" rx="2.5" fill="#c7d2fe" />

      <circle cx="42" cy="78" r="12" fill="#fbbf24" />
      <circle cx="42" cy="74" r="6" fill="#78350f" />
      <path d="M26 112c0-10 7-18 16-18s16 8 16 18" fill="#3b82f6" />
      <rect x="34" y="94" width="16" height="18" rx="3" fill="#2563eb" />

      <circle cx="178" cy="72" r="12" fill="#fb923c" />
      <circle cx="178" cy="68" r="6" fill="#7c2d12" />
      <path d="M162 112c0-10 7-18 16-18s16 8 16 18" fill="#22c55e" />
      <rect x="170" y="90" width="16" height="22" rx="3" fill="#16a34a" />

      <path
        d="M48 28l10-4 10 4v8c0 6-4 11-10 13-6-2-10-7-10-13V28z"
        fill="#22c55e"
        stroke="#15803d"
        strokeWidth="1"
      />
      <path d="M53 38l3.5 3.5L63 35" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      <circle cx="170" cy="34" r="10" fill="#f59e0b" />
      <circle cx="170" cy="34" r="4" fill="white" />
      <path
        d="M170 20v4M170 44v4M156 34h4M180 34h4M160 24l3 3M177 41l3 3M160 44l3-3M177 27l3-3"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Key accent for verify screen */}
      <rect x="188" y="52" width="18" height="8" rx="2" fill="#a78bfa" transform="rotate(25 188 52)" />
      <circle cx="186" cy="56" r="5" fill="#8b5cf6" />
      <circle cx="186" cy="56" r="2" fill="white" />

      <rect x="28" y="48" width="22" height="14" rx="4" fill="#38bdf8" />
      <path d="M34 62l4-4h4" fill="#38bdf8" />
      <circle cx="35" cy="55" r="1.5" fill="white" />
      <circle cx="39" cy="55" r="1.5" fill="white" />
      <circle cx="43" cy="55" r="1.5" fill="white" />
    </svg>
  );
}
