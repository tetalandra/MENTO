import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { AuthCard } from '@/components/auth/AuthCard';
import { SignupForm } from '@/components/auth/SignupForm';

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <AuthCard>
      <SignupForm />
    </AuthCard>
  );
}
