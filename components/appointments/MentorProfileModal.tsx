'use client';

import { useEffect } from 'react';
import { Icon } from '@/components/ui/icons';

const SPECIALIZATIONS = [
  'System Design',
  'React & Next.js',
  'Node.js',
  'Cloud Architecture',
  'AWS/Azure',
  'PostgreSQL',
  'CI/CD Pipelines',
];

const EXPERIENCE = [
  {
    title: 'Senior Software Architect',
    company: 'TechFlow',
    period: '2020 – Present',
    detail: 'Leading global infrastructure teams building scalable distributed systems.',
  },
  {
    title: 'Lead Systems Engineer',
    company: 'Global Systems Inc.',
    period: '2016 – 2020',
    detail: 'Drove architectural transformations across multi-region product platforms.',
  },
  {
    title: 'Full Stack Developer',
    company: 'DataLab',
    period: '2012 – 2016',
    detail: 'Built end-to-end web applications and mentoring pipelines for junior engineers.',
  },
];

interface MentorProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function MentorProfileModal({ open, onClose }: MentorProfileModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-profile-title"
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-mento-navy"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto p-5 md:p-7">
          {/* Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="relative mx-auto shrink-0 sm:mx-0">
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-2xl bg-[#dbe4f5] font-urbanist text-3xl font-bold text-mento-navy md:size-32">
                SJ
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-mento-navy px-2.5 py-1 text-[10px] font-bold text-white shadow">
                95% Match
              </span>
            </div>

            <div className="min-w-0 flex-1 pt-2 text-center sm:text-left">
              <h2
                id="mentor-profile-title"
                className="font-urbanist text-2xl font-bold text-mento-navy md:text-[28px]"
              >
                Dr. Sarah Jenkins
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Senior Software Architect @ TechFlow • Expert Mentor
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4 text-mento-navy" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <strong className="text-mento-navy">12 Years</strong> Experience
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                  <Icon name="star" className="size-4 text-amber-400" />
                  <strong className="text-mento-navy">4.9 Rating</strong>
                  <span className="text-gray-400">(124 Reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                  <Icon name="users" className="size-4 text-mento-navy" />
                  <strong className="text-mento-navy">50+ Students</strong> Mentored
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            {/* Left column */}
            <div className="space-y-7">
              <section>
                <h3 className="font-urbanist text-base font-bold text-mento-navy">About</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Dr. Sarah Jenkins is a software architect specializing in scalable distributed
                  systems and cloud-native development. She helps mentees grow from solid engineers
                  into confident system designers through practical mentoring, code reviews, and
                  career guidance.
                </p>
              </section>

              <section>
                <h3 className="font-urbanist text-base font-bold text-mento-navy">
                  Professional Experience
                </h3>
                <ol className="relative mt-4 space-y-5 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gray-200">
                  {EXPERIENCE.map(job => (
                    <li key={job.title} className="relative flex gap-3 pl-0">
                      <span className="relative z-[1] mt-1.5 size-3.5 shrink-0 rounded-full border-2 border-mento-navy bg-white" />
                      <div>
                        <p className="text-sm font-semibold text-mento-navy">{job.title}</p>
                        <p className="text-xs text-gray-500">
                          {job.company} · {job.period}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">{job.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="font-urbanist text-base font-bold text-mento-navy">
                  Teaching History
                </h3>
                <div className="mt-3 rounded-xl bg-[#eef3fb] p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-mento-navy">
                    Academic Involvement
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Guest lecturer at Rwanda Coding Academy and related programs. Holds a Ph.D. in
                    Computer Science with a focus on distributed systems and mentoring best
                    practices in technical education.
                  </p>
                </div>
              </section>
            </div>

            {/* Right column */}
            <aside className="space-y-5">
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Specializations
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SPECIALIZATIONS.map(tag => (
                    <span
                      key={tag}
                      className="rounded-lg border border-gray-200 bg-[#f8f9fb] px-3 py-1.5 text-xs font-semibold text-mento-navy"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <div className="rounded-2xl bg-mento-navy p-5 text-white">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10">
                  <Icon name="message-circle" className="size-5" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  Interested? Dr. Sarah typically responds within 24 hours to new session requests.
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-bold text-mento-navy transition hover:bg-gray-100"
                >
                  Request Session with Dr. Sarah
                  <Icon name="arrow-right" className="size-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Website"
                  className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-mento-navy"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9s1.3-6.3 3.8-9z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Share"
                  className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-mento-navy"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Email"
                  className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-mento-navy"
                >
                  <Icon name="mail" className="size-4" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
