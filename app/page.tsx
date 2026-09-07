import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { ProcessTimeline } from '@/components/landing/ProcessTimeline';

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-7 text-mento-green" aria-hidden>
      <path
        d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 13v4c0 0 3.5 3 7 3s7-3 7-3v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 9l-10 5L2 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-mento-auth-navy" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  {
    title: 'REQUEST INPUT',
    desc: 'Unified intake for students, mentors, and administrators to submit and manage mentorship requests seamlessly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'FLAIR MATCHING',
    desc: 'Intelligent AI matching pairs students with the right mentor based on skills, goals, and availability.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'HEALTH ANALYTICS',
    desc: 'Real-time dashboards track mentorship wellness, engagement metrics, and institutional outcomes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'SECURE EXECUTION',
    desc: 'Enterprise-grade role-based access controls protect every action across the platform.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const BENEFITS = [
  {
    num: '01',
    title: 'Centralized Coordination',
    desc: 'It replaces fragmented, unreliable communication channels (like unrecorded emails) with one unified hub.',
  },
  {
    num: '02',
    title: 'Real-time Analytics',
    desc: 'Live dashboards give administrators instant visibility into engagement, sessions, and program health.',
  },
  {
    num: '03',
    title: 'Secure Role Access',
    desc: 'Granular permissions ensure each user sees only what they need, keeping institutional data protected.',
  },
  {
    num: '04',
    title: 'Smart Appointment Matching',
    desc: 'AI-powered scheduling finds the best mentor-student pairings based on goals and availability.',
  },
  {
    num: '05',
    title: 'Survey & Feedback Tools',
    desc: 'Built-in surveys capture mentor and student feedback to continuously improve program quality.',
  },
  {
    num: '06',
    title: 'Academic Cycle Tracking',
    desc: 'Track mentorship progress across academic terms with structured session records and milestones.',
  },
];

const USER_CARD_ITEMS = [
  'Instant Appointments',
  'Mentor Profiles',
  'AI Recommendations',
];

export default async function HomePage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <div className="font-gabarito text-gray-900">
      {/* ── Navigation ── */}
      <header className="landing-nav sticky top-0 z-50 bg-mento-auth-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-wide text-white">
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-md bg-white p-0.5">
              <img
                src="/images/mento-logo.png"
                alt=""
                width={28}
                height={28}
                className="size-7 object-contain"
              />
            </span>
            MENTO
          </Link>
          <nav className="hidden items-center gap-10 text-xs font-semibold tracking-widest md:flex">
            <a href="#home" className="text-mento-green">HOME</a>
            <a href="#services" className="text-white/80 transition hover:text-white">SERVICES</a>
            <a href="#faq" className="text-white/80 transition hover:text-white">FAQs</a>
            <a href="#contact" className="text-white/80 transition hover:text-white">CONTACT</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white/90 transition hover:text-white">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-mento-auth-navy transition hover:bg-gray-100"
            >
              Buy now
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="home" className="landing-hero relative bg-mento-auth-navy pb-0 pt-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-32 lg:grid-cols-2 lg:pb-40">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Trusted. Reliable. Professional.
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.15] md:text-[2.75rem]">
              The Intelligent Engineering Culture Companion.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
              Empower your team with intelligent mentorship coordination, analytics, and secure workflows
              built for high-performance engineering organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-mento-auth-navy transition hover:bg-gray-100"
              >
                Get Started
              </Link>
              <a
                href="#services"
                className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View All Products
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
              <Image
                src="/images/hero-dashboard.png"
                alt="Mento dashboard preview"
                width={800}
                height={500}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="landing-hero-wave absolute bottom-0 left-0 w-full leading-none">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-[60px] w-full md:h-[80px]" aria-hidden>
            <path
              fill="#f2f5f8"
              d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </section>

      {/* ── What Mento Offers ── */}
      <section id="services" className="bg-[#f2f5f8] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-wide text-mento-auth-navy md:text-3xl">
              WHAT MENTO OFFERS
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Everything you need to run a world-class mentorship program in one intelligent platform.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(f => (
              <div key={f.title} className="text-center">
                <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-lg bg-mento-auth-navy text-white">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold tracking-wide text-mento-auth-navy">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Working Process ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold tracking-wide text-mento-auth-navy md:text-3xl">
            MENTO WORKING PROCESS
          </h2>
          <ProcessTimeline />
        </div>
      </section>

      {/* ── Why Mento? ── */}
      <section className="bg-[#eef0f8] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mento-auth-navy">
              SOME REASONS
            </p>
            <h2 className="mt-3 text-3xl font-bold text-mento-auth-navy md:text-4xl">Why Mento?</h2>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(b => (
              <div key={b.num} className="flex items-center gap-3">
                <span className="w-14 shrink-0 select-none text-5xl font-bold leading-none text-mento-auth-navy md:text-6xl">
                  {b.num}
                </span>
                <div className="h-px w-6 shrink-0 bg-gray-400" aria-hidden />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-mento-auth-navy md:text-base">{b.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mento-auth-navy/70 md:text-sm">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Will Use Mento? ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold tracking-wide text-mento-auth-navy md:text-3xl">
            WHO WILL USE MENTO?
          </h2>

          <div className="relative mx-auto mt-16 h-[480px] max-w-2xl sm:h-[520px]">
            {/* Top-left card */}
            <div className="absolute left-0 top-0 z-10 w-[240px] -rotate-[14deg] border-[5px] border-mento-auth-navy bg-white p-6 shadow-md sm:w-[260px] sm:p-7">
              <GraduationCapIcon />
              <h3 className="mt-4 text-sm font-bold tracking-widest text-mento-auth-navy">STUDENTS</h3>
              <ul className="mt-5 space-y-3">
                {USER_CARD_ITEMS.map(item => (
                  <li key={`left-${item}`} className="flex items-center gap-2.5 text-xs text-mento-auth-navy sm:text-sm">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-mento-auth-navy"
              >
                ENTER STUDENT PORTAL
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Top-right card */}
            <div className="absolute right-0 top-0 z-10 w-[240px] rotate-[14deg] border-[5px] border-mento-auth-navy bg-white p-6 shadow-md sm:w-[260px] sm:p-7">
              <GraduationCapIcon />
              <h3 className="mt-4 text-sm font-bold tracking-widest text-mento-auth-navy">STUDENTS</h3>
              <ul className="mt-5 space-y-3">
                {USER_CARD_ITEMS.map(item => (
                  <li key={`right-${item}`} className="flex items-center gap-2.5 text-xs text-mento-auth-navy sm:text-sm">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-mento-auth-navy"
              >
                ENTER STUDENT PORTAL
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Bottom-center card */}
            <div className="absolute bottom-0 left-1/2 z-20 w-[240px] -translate-x-1/2 -rotate-[5deg] border-[5px] border-mento-auth-navy bg-white p-6 shadow-lg sm:w-[260px] sm:p-7">
              <GraduationCapIcon />
              <h3 className="mt-4 text-sm font-bold tracking-widest text-mento-auth-navy">STUDENTS</h3>
              <ul className="mt-5 space-y-3">
                {USER_CARD_ITEMS.map(item => (
                  <li key={`bottom-${item}`} className="flex items-center gap-2.5 text-xs text-mento-auth-navy sm:text-sm">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-mento-auth-navy"
              >
                ENTER STUDENT PORTAL
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-mento-auth-navy md:text-4xl">
              Any questions?
              <br />
              We got you.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
              Everything you need to know about Mento. Can&apos;t find the answer you&apos;re looking for?
              Reach out to our support team.
            </p>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 py-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl">
          <Image
            src="/images/cta-banner.png"
            alt="Mentor and student in classroom"
            width={1200}
            height={400}
            className="h-[280px] w-full object-cover md:h-[360px]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-mento-auth-navy/60 px-6 text-center text-white">
            <h2 className="text-2xl font-bold md:text-4xl">Ready to find your dream life?</h2>
            <p className="mt-3 max-w-md text-sm text-white/80">
              Our missions of modern work habits for high performance teams.
            </p>
            <Link
              href="/signup"
              className="mt-8 rounded-lg bg-[#1a4bbd] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#153da0]"
            >
              Find your team
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-mento-auth-navy px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <p className="flex items-center gap-2.5 text-xl font-bold tracking-wide">
                <span className="flex size-7 items-center justify-center overflow-hidden rounded-md bg-white p-0.5">
                  <img
                    src="/images/mento-logo.png"
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 object-contain"
                  />
                </span>
                MENTO
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Kigali, Rwanda
                <br />
                Rwanda Coding Academy
              </p>
              <p className="mt-3 text-sm text-white/60">+250 788 000 000</p>
            </div>

            {/* Product */}
            <div>
              <p className="text-sm font-semibold tracking-wide">Product</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li><a href="#services" className="transition hover:text-white">Features</a></li>
                <li><a href="#home" className="transition hover:text-white">Pricing</a></li>
                <li><Link href="/login" className="transition hover:text-white">Sign In</Link></li>
                <li><Link href="/signup" className="transition hover:text-white">Register</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <p className="text-sm font-semibold tracking-wide">Support</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li><a href="#faq" className="transition hover:text-white">FAQ</a></li>
                <li><a href="#contact" className="transition hover:text-white">Contact Us</a></li>
                <li><a href="mailto:info@rca.ac.rw" className="transition hover:text-white">info@rca.ac.rw</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold tracking-wide">Subscribe to Our Newsletter</p>
              <form className="mt-4 flex" action="#" method="post">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-l-lg border-0 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-[#1a4bbd] px-4 py-2.5 text-white transition hover:bg-[#153da0]"
                  aria-label="Subscribe"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-xs text-white/50">
              © 2024 Mento. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms', 'Cookies'].map(link => (
                <a key={link} href="#" className="text-xs text-white/50 transition hover:text-white/80">
                  {link}
                </a>
              ))}
              <div className="ml-4 flex gap-3">
                {['facebook', 'twitter', 'instagram'].map(social => (
                  <a
                    key={social}
                    href="#"
                    className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                    aria-label={social}
                  >
                    <span className="text-xs font-bold uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
