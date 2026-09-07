import { Suspense } from 'react';
import { requirePage } from '@/lib/portal/guard';
import { CreateTemplateForm } from '@/components/templates/CreateTemplateForm';

export default async function CreateTemplatePage() {
  await requirePage('template:manage');

  return (
    <Suspense fallback={<div className="p-6 text-sm text-gray-500">Loading template editor…</div>}>
      <CreateTemplateForm />
    </Suspense>
  );
}
