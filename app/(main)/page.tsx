import React from 'react';
import dynamicImport from 'next/dynamic';
import Home from '../components/home';
import About from '../components/about';
import { ParallaxBackground } from '../components/parallax-background';
import { getPublicPortfolioProfile } from '@/server/services/profile.server';

export const dynamic = 'force-dynamic';

const Tools = dynamicImport(() => import('../components/tools'), {
  loading: () => <div className="h-[200px]" />,
});
const Experience = dynamicImport(() => import('../components/experience'), {
  loading: () => <div className="h-[400px]" />,
});
const Project = dynamicImport(() => import('../components/project'), {
  loading: () => <div className="h-[400px]" />,
});
const Certificate = dynamicImport(() => import('../components/certificate'), {
  loading: () => <div className="h-[300px]" />,
});
const FAQ = dynamicImport(() => import('../components/faq'), {
  loading: () => <div className="h-[300px]" />,
});
const Contact = dynamicImport(() => import('../components/contact'), {
  loading: () => <div className="h-[300px]" />,
});

const Page = async () => {
  const profile = await getPublicPortfolioProfile();

  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      <ParallaxBackground />

      <Home profile={profile} />
      <About profile={profile} />
      <Tools />
      <Experience />
      <Project />
      <Certificate />
      <FAQ />
      <Contact profile={profile} />
    </div>
  );
};

export default Page;
