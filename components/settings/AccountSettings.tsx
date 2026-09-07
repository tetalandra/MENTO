'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/icons';

type SettingsTab = 'account' | 'password' | 'notifications' | 'privacy';

const MENU: { id: SettingsTab; label: string; icon: ReactNode }[] = [
  {
    id: 'account',
    label: 'Account',
    icon: <Icon name="user-circle" className="size-4" />,
  },
  {
    id: 'password',
    label: 'Password',
    icon: <Icon name="lock" className="size-4" />,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Icon name="bell" className="size-4" />,
  },
  {
    id: 'privacy',
    label: 'Privacy & Security',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">
      {children}
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  readOnly,
  className = '',
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  readOnly?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={e => onChange?.(e.target.value)}
        className={`h-11 w-full rounded-lg border border-gray-200 bg-[#f4f7fb] px-3 text-sm text-mento-navy outline-none focus:border-mento-navy ${
          readOnly ? 'cursor-default text-gray-500' : ''
        }`}
      />
    </div>
  );
}

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 pr-11 text-sm text-mento-navy outline-none placeholder:text-gray-400 focus:border-mento-navy"
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-mento-navy"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <Icon name="eye" className="size-4" />
        </button>
      </div>
    </div>
  );
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        on ? 'bg-mento-navy' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition ${
          on ? 'translate-x-5' : ''
        }`}
      />
    </button>
  );
}

function AccountPanel() {
  const [fullName, setFullName] = useState('Dr. Sarah Jenkins');
  const [username, setUsername] = useState('sjenkins_mentor');
  const [email, setEmail] = useState('s.jenkins@academicbridge.edu');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [employeeId, setEmployeeId] = useState('AB-2024-99812');
  const [emailNotif, setEmailNotif] = useState(true);
  const [apptNotif, setApptNotif] = useState(true);
  const [announcements, setAnnouncements] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-urbanist text-xl font-bold text-mento-navy">Profile</h3>
        <p className="mt-1 text-sm text-gray-500">Update your photo and personal details.</p>
      </div>

      {/* Profile photo */}
      <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-6">
        <div className="relative">
          <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-[#dbe4f5] font-urbanist text-xl font-bold text-mento-navy">
            SJ
          </div>
          <button
            type="button"
            className="absolute -bottom-0.5 -right-0.5 flex size-7 items-center justify-center rounded-full bg-[#2f6fed] text-white shadow"
            aria-label="Edit photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-lg bg-mento-navy px-4 text-sm font-semibold text-white"
            >
              Upload Photo
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-lg border border-red-300 px-4 text-sm font-semibold text-red-500"
            >
              Remove Photo
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Recommended size: 400x400px. JPG, PNG or GIF (max 2MB).
          </p>
        </div>
      </div>

      {/* Personal information */}
      <div className="border-b border-gray-100 py-6">
        <h4 className="mb-4 font-urbanist text-sm font-bold text-mento-navy">Personal Information</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Full Name" value={fullName} onChange={setFullName} />
          <TextInput label="Username" value={username} onChange={setUsername} />
          <TextInput label="School Email Address" value={email} onChange={setEmail} type="email" />
          <TextInput label="Phone Number" value={phone} onChange={setPhone} />
          <div>
            <FieldLabel>Department</FieldLabel>
            <div className="relative">
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-[#f4f7fb] px-3 pr-9 text-sm text-mento-navy outline-none focus:border-mento-navy"
              >
                <option>Computer Science & Engineering</option>
                <option>Mathematics</option>
                <option>Business Administration</option>
                <option>Architecture</option>
              </select>
              <Icon
                name="chevron-down"
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <TextInput label="Role" value="Teacher / Mentor" readOnly />
          <TextInput
            label="Employee/Student ID"
            value={employeeId}
            onChange={setEmployeeId}
            className="sm:col-span-2"
          />
        </div>
      </div>

      {/* Account information */}
      <div className="border-b border-gray-100 py-6">
        <h4 className="mb-4 font-urbanist text-sm font-bold text-mento-navy">Account Information</h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Account Type', value: 'Teacher' },
            { label: 'Date Joined', value: 'Jan 12, 2024' },
            { label: 'Last Login', value: '2 hours ago' },
            { label: 'Status', value: 'Active', status: true },
          ].map(item => (
            <div key={item.label} className="rounded-xl bg-[#eef3fb] px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{item.label}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-mento-navy">
                {'status' in item && item.status && (
                  <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
                )}
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="py-6">
        <h4 className="mb-4 font-urbanist text-sm font-bold text-mento-navy">Preferences</h4>
        <div className="space-y-4">
          {[
            {
              title: 'Email Notifications',
              desc: 'Receive weekly summaries and important account alerts via email.',
              on: emailNotif,
              set: setEmailNotif,
            },
            {
              title: 'Appointment Notifications',
              desc: 'Get notified when a student books or cancels a mentorship session.',
              on: apptNotif,
              set: setApptNotif,
            },
            {
              title: 'System Announcements',
              desc: 'Stay updated with new features and system maintenance news.',
              on: announcements,
              set: setAnnouncements,
            },
          ].map(pref => (
            <div key={pref.title} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-mento-navy">{pref.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{pref.desc}</p>
              </div>
              <Toggle on={pref.on} onChange={pref.set} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-semibold text-mento-navy"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="inline-flex h-11 items-center rounded-lg bg-mento-navy px-5 text-sm font-semibold text-white hover:bg-[#152038]"
        >
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

function PasswordPanel() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [updated, setUpdated] = useState(false);

  const rules = useMemo(
    () => [
      { label: 'At least 8 characters long', ok: next.length >= 8 },
      { label: 'Include an uppercase letter (A-Z)', ok: /[A-Z]/.test(next) },
      { label: 'Include a lowercase letter (a-z)', ok: /[a-z]/.test(next) },
      { label: 'At least one numeric digit (0-9)', ok: /[0-9]/.test(next) },
      { label: 'At least one special character (!@#$)', ok: /[!@#$]/.test(next) },
    ],
    [next],
  );

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-urbanist text-xl font-bold text-mento-navy">Password &amp; Security</h3>
        <p className="mt-1 text-sm text-gray-500">Manage your password and secure your account.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-wide text-gray-400">
            Change Password
          </p>
          <div className="space-y-4">
            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
              value={current}
              onChange={setCurrent}
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              value={next}
              onChange={setNext}
            />
            <PasswordInput
              label="Confirm New Password"
              placeholder="Re-type new password"
              value={confirm}
              onChange={setConfirm}
            />
          </div>

          <div className="mt-6 rounded-xl bg-[#eef3fb] p-4">
            <p className="mb-3 text-sm font-bold text-mento-navy">Security Information</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Icon name="clock" className="size-4 text-mento-navy" />
                <span>
                  Last Password Change: <strong className="text-mento-navy">May 12, 2024</strong>
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Icon name="log-out" className="size-4 rotate-180 text-mento-navy" />
                <span>
                  Last Login: <strong className="text-mento-navy">2 hours ago</strong>
                </span>
              </li>
              <li className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4 text-emerald-600" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>
                  Account Security Status: <strong className="text-mento-navy">Highly Secure</strong>
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                  Optimal
                </span>
              </li>
            </ul>
          </div>
        </div>

        <aside className="rounded-2xl bg-mento-navy p-5 text-white">
          <div className="mb-3 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h4 className="font-urbanist text-sm font-bold">Password Requirements</h4>
          </div>
          <p className="text-xs leading-relaxed text-white/70">
            To ensure your account&apos;s safety, please adhere to the following rules:
          </p>
          <ul className="mt-4 space-y-2.5">
            {rules.map(r => (
              <li key={r.label} className="flex items-start gap-2.5 text-xs leading-snug">
                <span
                  className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${
                    r.ok ? 'bg-emerald-400 text-mento-navy' : 'border border-white/40'
                  }`}
                >
                  {r.ok && <Icon name="check" className="size-2.5" />}
                </span>
                <span className={r.ok ? 'text-white' : 'text-white/75'}>{r.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-white/50">Security Tip</p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/70">
              Avoid using common words or personal dates that are easily guessable from your profile.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={() => {
            setCurrent('');
            setNext('');
            setConfirm('');
            setUpdated(false);
          }}
          className="inline-flex h-11 items-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-semibold text-mento-navy"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setUpdated(true)}
          className="inline-flex h-11 items-center rounded-lg bg-mento-navy px-5 text-sm font-semibold text-white hover:bg-[#152038]"
        >
          {updated ? 'Updated' : 'Update Password'}
        </button>
      </div>
    </div>
  );
}

function NotificationsPanel() {
  const [prefs, setPrefs] = useState({
    email: true,
    appointments: true,
    sessions: true,
    announcements: false,
  });

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-urbanist text-xl font-bold text-mento-navy">Notifications</h3>
        <p className="mt-1 text-sm text-gray-500">Choose how you want to be notified.</p>
      </div>
      <div className="space-y-4">
        {(
          [
            ['email', 'Email Notifications', 'Receive weekly summaries and important account alerts via email.'],
            ['appointments', 'Appointment Notifications', 'Get notified when a student books or cancels a mentorship session.'],
            ['sessions', 'Session Summaries', 'Receive summaries after recorded mentorship sessions.'],
            ['announcements', 'System Announcements', 'Stay updated with new features and system maintenance news.'],
          ] as const
        ).map(([key, title, desc]) => (
          <div key={key} className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 bg-[#fafbfc] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-mento-navy">{title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
            </div>
            <Toggle
              on={prefs[key]}
              onChange={v => setPrefs(p => ({ ...p, [key]: v }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyPanel() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="font-urbanist text-xl font-bold text-mento-navy">Privacy &amp; Security</h3>
        <p className="mt-1 text-sm text-gray-500">Control visibility and security preferences.</p>
      </div>
      <div className="space-y-4">
        {[
          { title: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account.', status: 'Enabled' },
          { title: 'Login Alerts', desc: 'Get notified when a new device signs into your account.', status: 'On' },
          { title: 'Profile Visibility', desc: 'Allow mentors and classmates to find your profile.', status: 'Public' },
        ].map(item => (
          <div key={item.title} className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-[#fafbfc] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-mento-navy">{item.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>
            </div>
            <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-xs font-semibold text-mento-navy">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AccountSettings({ initialTab = 'account' }: { initialTab?: SettingsTab }) {
  const [tab, setTab] = useState<SettingsTab>(initialTab);

  return (
    <section className="space-y-5 pb-6">
      <div>
        <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy md:text-[28px]">
          Account Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and profile details.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(26,38,74,0.04)]">
        <div className="grid lg:grid-cols-[220px_1fr]">
          <aside className="border-b border-gray-100 bg-[#fafbfc] p-4 lg:border-b-0 lg:border-r">
            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Menu
            </p>
            <nav className="space-y-1">
              {MENU.map(item => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                      active
                        ? 'bg-mento-navy text-white'
                        : 'text-gray-600 hover:bg-[#eef3fb] hover:text-mento-navy'
                    }`}
                  >
                    <span className={active ? 'text-white' : 'text-gray-400'}>{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="p-5 md:p-7">
            {tab === 'account' && <AccountPanel />}
            {tab === 'password' && <PasswordPanel />}
            {tab === 'notifications' && <NotificationsPanel />}
            {tab === 'privacy' && <PrivacyPanel />}
          </div>
        </div>
      </div>
    </section>
  );
}
