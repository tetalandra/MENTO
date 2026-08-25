import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { DefaultCredentialsForm } from '@/components/auth/DefaultCredentialsForm';

export default function DefaultCredentialsPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <DefaultCredentialsForm />
    </AuthSplitShell>
  );
}
