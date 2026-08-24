'use client';

import { useTransition } from 'react';
import { signOutAction } from '@/lib/auth/actions';

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => signOutAction())}
      disabled={pending}
      className="font-urbanist text-lg font-bold leading-6 text-white/70 transition hover:text-white disabled:opacity-50"
    >
      Sign out
    </button>
  );
}
