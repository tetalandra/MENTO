import Link from 'next/link';
import { requirePage } from '@/lib/portal/guard';
import { PageSection } from '@/components/portal/PageSection';

export default async function RequestAppointmentPage() {
  await requirePage('appointment:request');

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PageSection title="Request Appointment" description="Book a session with a mentor">
          <form className="mento-card space-y-5 p-6 md:p-8">
            <div>
              <label className="font-urbanist text-sm font-semibold text-mento-navy">Mentorship Field</label>
              <select className="mento-input mt-1.5">
                <option>Academic Support</option>
                <option>Career Guidance</option>
                <option>Mental Wellness</option>
                <option>Discipline</option>
              </select>
            </div>
            <div>
              <label className="font-urbanist text-sm font-semibold text-mento-navy">Preferred Date</label>
              <input type="date" className="mento-input mt-1.5" />
            </div>
            <div>
              <label className="font-urbanist text-sm font-semibold text-mento-navy">Notes</label>
              <textarea rows={3} className="mento-input mt-1.5 resize-none" placeholder="Describe what you need help with…" />
            </div>
            <Link href="/appointments" className="mento-btn-primary inline-flex">
              Submit Request
            </Link>
          </form>
        </PageSection>
      </div>

      <aside className="mento-card h-fit p-6">
        <h3 className="font-urbanist text-lg font-bold text-mento-navy">AI Smart Match</h3>
        <p className="mt-2 font-urbanist text-sm text-mento-muted">Suggested mentors based on your profile</p>
        <ul className="mt-4 space-y-2">
          {['Dr. Uwase Marie — Academic', 'Mr. Nziza — Career', 'Ms. Landra — Mental'].map(name => (
            <li key={name}>
              <Link
                href="/mentors"
                className="block rounded-xl bg-mento-accent-light/80 p-3 font-urbanist text-sm font-semibold text-mento-navy transition hover:bg-mento-accent-light hover:shadow-sm"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
