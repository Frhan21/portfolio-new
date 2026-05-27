'use client';

import { Button } from '@/components/ui/button';
import { Briefcase, DownloadIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  SiGo,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { fadeIn, fadeUp } from '../motions';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="relative mx-auto min-h-[90vh] flex w-full max-w-6xl flex-col items-center justify-center py-20 px-6"
      id="home"
      initial="hidden"
      animate={isLoaded ? 'visible' : 'hidden'}
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      {/* Floating Icons (Desktop mostly) - Optimized without infinite JS animations */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute top-[20%] left-[10%] bg-white dark:bg-card p-4 rounded-3xl shadow-xl shadow-orange-500/10 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"
        >
          <SiReact className="text-cyan-400 text-4xl" />
        </motion.div>

        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-[15%] right-[15%] bg-white dark:bg-card p-4 rounded-3xl shadow-xl shadow-orange-500/10 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"
        >
          <SiLaravel className="text-red-500 text-3xl" />
        </motion.div>

        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute top-[45%] left-[5%] bg-white dark:bg-card p-4 rounded-3xl shadow-xl shadow-orange-500/10 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"
        >
          <SiNodedotjs className="text-green-600 text-3xl" />
        </motion.div>

        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute bottom-[20%] left-[10%] bg-white dark:bg-card p-4 rounded-3xl shadow-xl shadow-orange-500/10 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300"
        >
          <SiNextdotjs className="text-black dark:text-white text-3xl" />
        </motion.div>

        <motion.div className="absolute bottom-[35%] right-[10%] bg-white dark:bg-card p-4 rounded-3xl shadow-xl shadow-orange-500/10 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
          <SiTypescript className="text-blue-600 text-3xl" />
        </motion.div>

        <motion.div className="absolute top-[40%] right-[5%] bg-white dark:bg-card p-4 rounded-3xl shadow-xl shadow-orange-500/10 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
          <SiGo className="text-cyan-500 text-3xl" />
        </motion.div>

        {/* Sparkles */}
        <div className="absolute top-[10%] left-[25%] text-orange-400 text-2xl animate-pulse">
          ✦
        </div>
        <div className="absolute top-[5%] right-[30%] text-slate-700 dark:text-slate-300 text-3xl animate-pulse delay-75">
          ✦
        </div>
        <div className="absolute bottom-[25%] left-[15%] text-orange-400 text-3xl animate-pulse delay-150">
          ✧
        </div>
        <div className="absolute bottom-[20%] right-[15%] text-slate-700 dark:text-slate-300 text-2xl animate-pulse delay-300">
          ✦
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center z-10 w-full">
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm mb-8"
        >
          <span className="text-xl">👋</span>
          Hello, I&apos;m M. Farhan Ramadhan
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-[90px] font-extrabold leading-[1.1] text-slate-900 dark:text-white tracking-tight mb-12 max-w-5xl mx-auto"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          Newbie Software <br />
          Engineer <span className="text-primary">Wannabe</span>
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <Button
            className="w-full sm:w-[300px] flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-6 text-base font-bold text-white shadow-xl shadow-orange-500/25 hover:bg-primary/90 transition-all active:scale-[0.98]"
            asChild
          >
            <a href="#projects">
              View my Work
              <Briefcase />
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-[300px] flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-card px-10 py-6 text-base font-bold text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
            asChild
          >
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              Download CV
              <DownloadIcon />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Home;
