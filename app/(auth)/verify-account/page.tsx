import { AuthSplitShell } from '@/components/auth/AuthSplitShell';
import { SecurityVerificationForm } from '@/components/auth/SecurityVerificationForm';

export default function VerifyAccountPage() {
  return (
    <AuthSplitShell withBlueBorder>
      <SecurityVerificationForm />
    </AuthSplitShell>
  );
}
