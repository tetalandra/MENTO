import { requireAnyPage } from '@/lib/portal/guard';
import { ReportsManagement } from '@/components/reports/ReportsManagement';

export default async function ReportsPage() {
  await requireAnyPage(['report:read', 'report:manage']);

  return <ReportsManagement />;
}
