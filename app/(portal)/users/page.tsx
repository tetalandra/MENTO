import { requirePage } from '@/lib/portal/guard';
import { UserManagement } from '@/components/users/UserManagement';

export default async function UsersPage() {
  await requirePage('user:manage');

  return <UserManagement />;
}
