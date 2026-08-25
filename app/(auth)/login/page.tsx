import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { LoginForm } from '@/components/auth/LoginForm';

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <AuthSplitShell>
      <LoginForm />
    </AuthSplitShell>
  );
}
