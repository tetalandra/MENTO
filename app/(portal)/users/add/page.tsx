import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

export default async function AddUserPage() {
  await requirePage('user:create');

  return (
    <PageSection title="Add User" description="Create a new portal user">
      <form className="max-w-md space-y-4 rounded-lg border border-mento-border bg-white p-6 shadow-sm">
        <input placeholder="Full Name" className="w-full rounded-lg border border-mento-border px-4 py-2 font-urbanist text-sm" />
        <input placeholder="Email" type="email" className="w-full rounded-lg border border-mento-border px-4 py-2 font-urbanist text-sm" />
        <select className="w-full rounded-lg border border-mento-border px-4 py-2 font-urbanist text-sm">
          <option>Student</option>
          <option>Teacher</option>
          <option>Admin</option>
        </select>
        <Link href="/users" className="inline-block rounded-lg bg-mento-navy px-6 py-2.5 font-urbanist text-sm font-semibold text-white">
          Create User
        </Link>
      </form>
    </PageSection>
  );
}
