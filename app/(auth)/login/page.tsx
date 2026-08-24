import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/auth/LoginForm';

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <AuthCard>
      <LoginForm />
    </AuthCard>
  );
}
