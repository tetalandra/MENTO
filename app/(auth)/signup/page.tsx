import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { SignupShell } from '@/components/auth/SignupShell';
import { SignupForm } from '@/components/auth/SignupForm';

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <SignupShell>
      <SignupForm />
    </SignupShell>
  );
}
