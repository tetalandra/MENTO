import { requirePage } from '@/lib/portal/guard';
import { AnalyticsAttendance } from '@/components/analytics/AnalyticsAttendance';

export default async function AnalyticsPage() {
  await requirePage('analytics:view_system');

  return <AnalyticsAttendance />;
}
