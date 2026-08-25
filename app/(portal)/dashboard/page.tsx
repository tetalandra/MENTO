import { requirePage } from '@/lib/portal/guard';
import { DashboardComposer } from '@/components/dashboard/DashboardComposer';

export default async function DashboardPage() {
  const session = await requirePage('dashboard:view');

  return <DashboardComposer session={session} />;
}
