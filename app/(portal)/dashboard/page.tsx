import { requirePage } from '@/lib/portal/guard';
import { DashboardComposer } from '@/components/dashboard/DashboardComposer';
import { RbacDemoPanel } from '@/components/dev/RbacDemoPanel';

export default async function DashboardPage() {
  const session = await requirePage('dashboard:view');

  return (
    <>
      <DashboardComposer session={session} />
      <div className="mt-10">
        <RbacDemoPanel session={session} />
      </div>
    </>
  );
}
