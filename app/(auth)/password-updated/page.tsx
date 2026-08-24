import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { Icon } from '@/components/ui/icons';

export default function PasswordUpdatedPage() {
  return (
    <AuthCard>
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="check" className="size-8" />
        </div>
        <h1 className="mt-6 font-gabarito text-2xl font-bold text-mento-auth-navy">Password Updated!</h1>
        <p className="mt-2 font-gabarito text-sm text-gray-500">Your password has been changed successfully.</p>
        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-mento-auth-navy px-8 py-3 font-gabarito text-sm font-semibold text-white hover:bg-mento-auth-navy/90"
        >
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}
