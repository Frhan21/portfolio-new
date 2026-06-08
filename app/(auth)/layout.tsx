import type { Metadata } from 'next';
import '../globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login | Portfolio',
  description: 'Website ini adalah portfolio pribadi saya',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={`antialiased `}>{children}</section>;
}
