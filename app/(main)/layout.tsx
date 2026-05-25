import type { Metadata } from 'next';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import '../globals.css';

export const metadata: Metadata = {
  title: 'M Farhan Ramadhan | Portfolio',
  description: 'Website ini adalah portfolio pribadi saya',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full relative transition-colors duration-300 ease-in-out">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </main>
  );
}
