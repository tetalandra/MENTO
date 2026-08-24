import Link from 'next/link';

export function AuthLink({ href, children, className = '' }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`font-gabarito text-sm font-semibold text-mento-auth-navy transition hover:underline ${className}`}>
      {children}
    </Link>
  );
}

export function AuthInput({
  label,
  name,
  type = 'text',
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-gabarito text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mento-input mt-1.5 font-gabarito focus:border-mento-auth-navy focus:ring-mento-auth-navy/20"
      />
    </div>
  );
}

export function AuthSubmitButton({ label, pending }: { label: string; pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-xl bg-mento-auth-navy py-3.5 font-gabarito text-sm font-semibold text-white shadow-md transition hover:bg-mento-auth-navy/90 hover:shadow-lg active:scale-[0.99] disabled:opacity-60"
    >
      {pending ? 'Please wait…' : label}
    </button>
  );
}
