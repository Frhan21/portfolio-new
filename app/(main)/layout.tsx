import type { Metadata } from 'next';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { SmoothScroll } from '../components/smooth-scroll';
import { ScrollProgress } from '../components/scroll-progress';
import { LandingPreloader } from '../components/landing-preloader';
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
    <SmoothScroll>
      <ScrollProgress />
      <LandingPreloader />
      <div className="w-full relative transition-colors duration-300 ease-in-out">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
