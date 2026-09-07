import { requirePage } from '@/lib/portal/guard';
import { TemplatesManagement } from '@/components/templates/TemplatesManagement';

export default async function TemplatesPage() {
  await requirePage('template:manage');

  return <TemplatesManagement />;
}
