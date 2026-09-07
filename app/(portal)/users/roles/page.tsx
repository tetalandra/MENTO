import { requirePage } from '@/lib/portal/guard';
import { RolesManagement } from '@/components/users/RolesManagement';

export default async function RolesPage() {
  await requirePage('role:manage');

  return <RolesManagement />;
}
