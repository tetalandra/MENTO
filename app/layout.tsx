import type { Metadata } from 'next';
import { Gabarito, Inter, Poppins, Urbanist } from 'next/font/google';
import './globals.css';

const gabarito = Gabarito({
  variable: '--font-gabarito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'MENTO — Institutional Portal',
  description: 'Mentorship portal for Rwanda Coding Academy',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${gabarito.variable} ${urbanist.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
