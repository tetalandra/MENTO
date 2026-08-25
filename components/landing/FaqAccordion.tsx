'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Can I find a custom way for display?',
    a: 'Yes — Mento adapts dashboards and views to your role, whether you are a student, mentor, or administrator.',
  },
  {
    q: 'How do I find a course for my degree?',
    a: 'Browse available mentorship programs through the portal and match with mentors aligned to your academic track.',
  },
  {
    q: 'Who can access the Mento platform?',
    a: 'Students, mentors, and RCA administrators each receive role-based access tailored to their responsibilities.',
  },
  {
    q: 'Is my data secure on Mento?',
    a: 'All data is protected with secure role-based permissions and institutional-grade privacy controls.',
  },
  {
    q: 'How do I get started with Mento?',
    a: 'Register or sign in, complete your profile, and enter the portal to begin your mentorship journey.',
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 border-t border-gray-200">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-mento-auth-navy md:text-base">{faq.q}</span>
              <span
                className={`flex size-6 shrink-0 items-center justify-center text-xl font-light text-mento-auth-navy transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="pb-5 text-sm leading-relaxed text-gray-500">{faq.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
