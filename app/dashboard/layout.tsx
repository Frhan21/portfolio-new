import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Portfolio',
  description: 'Website ini adalah portfolio pribadi saya',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
