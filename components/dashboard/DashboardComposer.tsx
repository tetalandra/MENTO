import type { Session } from '@/lib/auth/types';
import { authorize } from '@/lib/rbac/authorize';
import { EmptyState } from '@/components/ui/MentoPrimitives';
import { AdminDashboardSection } from './AdminDashboardSection';
import { StudentAnalyticsSection } from './StudentAnalyticsSection';
import { TeacherDashboardSection } from './TeacherDashboardSection';

interface DashboardComposerProps {
  session: Session;
}

/**
 * Picks the primary dashboard view by permission priority (Fortress-style):
 * admin capabilities win over teacher, teacher over student.
 */
export function DashboardComposer({ session }: DashboardComposerProps) {
  if (authorize(session, 'user:manage')) {
    return <AdminDashboardSection session={session} />;
  }
  if (authorize(session, 'session:record')) {
    return <TeacherDashboardSection session={session} />;
  }
  if (authorize(session, 'appointment:request')) {
    return <StudentAnalyticsSection />;
  }

  return (
    <EmptyState
      title="No dashboard content"
      description="Your account doesn't have dashboard permissions yet. Contact an administrator if this seems wrong."
      icon="dashboard"
    />
  );
}
