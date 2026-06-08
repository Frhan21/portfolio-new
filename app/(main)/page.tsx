import React from 'react';
import Home from '../components/home';
import About from '../components/about';
import Tools from '../components/tools';
import Experience from '../components/experience';
import Project from '../components/project';
import Certificate from '../components/certificate';
import FAQ from '../components/faq';
import Contact from '../components/contact';

const Page = () => {
  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      {/* Global Background Blur Circles (Orange) spanning the entire page */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[2%] left-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-orange-500/30 dark:bg-orange-500/15 rounded-full blur-[100px] md:blur-[150px]"></div>
        <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[120px] md:blur-[150px]"></div>
        <div className="absolute top-[35%] left-[15%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-orange-500/25 dark:bg-orange-500/10 rounded-full blur-[100px] md:blur-[150px]"></div>
        <div className="absolute top-[55%] right-[10%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[120px] md:blur-[150px]"></div>
        <div className="absolute top-[75%] left-[5%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-orange-500/25 dark:bg-orange-500/10 rounded-full blur-[120px] md:blur-[180px]"></div>
        <div className="absolute bottom-[5%] right-[15%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-orange-500/30 dark:bg-orange-500/15 rounded-full blur-[100px] md:blur-[150px]"></div>
      </div>

      <Home />
      <About />
      <Tools />
      <Experience />
      <Project />
      <Certificate />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Page;
