import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput, AuthSubmitButton } from '@/components/auth/AuthFormParts';
import { firstLoginAction } from '@/lib/auth/actions';

export default function FirstLoginPage() {
  return (
    <AuthCard title="First Login">
      <div className="w-full max-w-md">
        <p className="font-gabarito text-sm text-gray-500">Use your default credentials to sign in</p>
        <form action={firstLoginAction} className="mt-6 space-y-4">
          <AuthInput label="Email" name="email" type="email" defaultValue="student@rca.ac.rw" />
          <AuthInput label="Password" name="password" type="password" defaultValue="password" />
          <AuthSubmitButton label="Continue" />
        </form>
        <Link href="/login" className="mt-4 block text-center font-gabarito text-sm text-mento-auth-navy hover:underline">
          Use regular login
        </Link>
      </div>
    </AuthCard>
  );
}
