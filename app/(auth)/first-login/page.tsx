import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { FirstLoginForm } from '@/components/auth/FirstLoginForm';

export default function FirstLoginPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <FirstLoginForm />
    </AuthSplitShell>
  );
}
