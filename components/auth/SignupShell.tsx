import type { ReactNode } from 'react';
import { AuthSplitShell } from './AuthSplitShell';

interface SignupShellProps {
  children: ReactNode;
}

export function SignupShell({ children }: SignupShellProps) {
  return <AuthSplitShell>{children}</AuthSplitShell>;
}
