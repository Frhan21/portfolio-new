'use client';

import { useEffect, useState } from 'react';
import ProjectNav from './components/navbar';

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-background dark:text-foreground font-sans transition-colors duration-300">
      <ProjectNav isScrolled={isScrolled} />
      <main className="pt-28 pb-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
