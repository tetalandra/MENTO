import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { Icon } from '@/components/ui/icons';

const FEATURES = [
  { title: 'Smart Matching', desc: 'AI pairs students with the right mentor.' },
  { title: 'Health Analytics', desc: 'Track mentorship wellness and engagement.' },
  { title: 'Session Records', desc: 'Log and review every mentorship session.' },
  { title: 'Institutional Portal', desc: 'One hub for RCA students, mentors, and admins.' },
];

const STEPS = ['Register', 'Get Matched', 'Attend Sessions', 'Track Progress'];

const BENEFITS = [
  'Structured mentorship for every student',
  'Real-time analytics for administrators',
  'Secure role-based access',
  'AI-powered appointment matching',
  'Survey and feedback tools',
  'Integrated academic cycle tracking',
];

const FAQS = [
  { q: 'Who can use Mento?', a: 'Students, mentors, and RCA administrators.' },
  { q: 'How do I get started?', a: 'Register or sign in, then enter the student portal.' },
  { q: 'Is my data secure?', a: 'Yes — role-based permissions protect every action.' },
];

export default async function HomePage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <div className="font-gabarito text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-mento-auth-navy">
            MENTO
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#home" className="hover:text-mento-auth-navy">HOME</a>
            <a href="#services" className="hover:text-mento-auth-navy">SERVICES</a>
            <a href="#faq" className="hover:text-mento-auth-navy">FAQs</a>
            <a href="#contact" className="hover:text-mento-auth-navy">CONTACT</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="mento-btn-secondary !py-2 !px-4">
              Sign in
            </Link>
            <Link href="/signup" className="mento-btn-primary !bg-mento-auth-navy !py-2 !px-4">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="bg-mento-auth-navy px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              The Intelligent Engineering Culture Companion
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Connect with mentors, track sessions, and accelerate your journey at Rwanda Coding Academy.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup" className="mento-btn-primary bg-white !text-mento-auth-navy shadow-lg hover:!bg-gray-50">
              Get started
            </Link>
            <a href="#services" className="mento-btn-secondary !border-white/30 !bg-transparent !text-white hover:!bg-white/10">
              View all features
            </a>
            </div>
          </div>
          {/* Replace with your Figma dashboard preview image */}
          <div className="overflow-hidden rounded-xl border border-white/20 shadow-2xl">
            <img
              src="https://picsum.photos/seed/mento-dashboard/800/500"
              alt="Dashboard preview — replace with Figma export"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="services" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-mento-auth-navy">What Mento Offers</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(f => (
              <div key={f.title} className="mento-card mento-card-interactive p-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-mento-auth-navy/10 text-mento-auth-navy">
                  <Icon name="star" className="size-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-mento-auth-navy">Mento Working Process</h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-mento-auth-navy text-sm font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span className="font-medium">{step}</span>
                {i < STEPS.length - 1 && <Icon name="chevron-right" className="hidden size-4 text-gray-400 sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-mento-auth-navy">Why Mento?</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <div key={b} className="rounded-xl border border-gray-200 p-5">
                <span className="text-xs font-bold text-mento-auth-navy">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who will use Mento */}
      <section className="bg-mento-auth-navy px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold">Who Will Use Mento?</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {['Students', 'Mentors', 'Administrators'].map(role => (
              <div key={role} className="rotate-1 rounded-xl bg-white/10 p-8 backdrop-blur transition hover:rotate-0 hover:bg-white/15">
                <p className="text-lg font-bold uppercase tracking-wider">{role}</p>
                <p className="mt-2 text-sm text-white/70">Access the institutional portal</p>
                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  ENTER STUDENT PORTAL
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold text-mento-auth-navy">FAQ</h2>
          <div className="mt-10 space-y-4">
            {FAQS.map(f => (
              <details key={f.q} className="rounded-lg border border-gray-200 p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-200 bg-gray-50 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-bold text-mento-auth-navy">MENTO</p>
          <p className="text-sm text-gray-500">© 2024 Rwanda Coding Academy — Mentorship Portal</p>
          <a href="mailto:info@rca.ac.rw" className="text-sm text-mento-auth-navy hover:underline">
            info@rca.ac.rw
          </a>
        </div>
      </footer>
    </div>
  );
}
