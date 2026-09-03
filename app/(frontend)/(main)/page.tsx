import React from 'react';
import Home from '../../components/home';
import About from '../../components/about';
import { ParallaxBackground } from '../../components/parallax-background';
import Experience from '../../components/experience';
import Project from '../../components/project';
import Certificate from '../../components/certificate';
import Tools from '../../components/tools';
import FAQ from '../../components/faq';
import Contact from '../../components/contact';
import {
  getCachedAllCertificates,
  getCachedAllProjects,
  getCachedCategories,
  getCachedExperiences,
  getCachedProfile,
} from '@/server/queries';

const Page = async () => {
  const [profile, projects, categories, experiences, certificates] =
    await Promise.all([
      getCachedProfile(),
      getCachedAllProjects(),
      getCachedCategories(),
      getCachedExperiences(10, 1),
      getCachedAllCertificates(),
    ]);

  return (
    <div className="flex flex-col relative w-full overflow-x-clip">
      <ParallaxBackground />

      <Home profile={profile} />
      <About profile={profile} />
      <Tools />
      <Experience experiences={experiences.items} />
      <Project projects={projects} categories={categories} />
      <Certificate certificates={certificates} />
      <FAQ />
      <Contact profile={profile} />
    </div>
  );
};

export default Page;
