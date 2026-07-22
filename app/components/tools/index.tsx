'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { FaGitAlt } from 'react-icons/fa';
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiGo,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { fadeIn, fadeUp } from '../motions';

type Tool = {
  name: string;
  icon: React.ElementType;
  color: string;
};

const topTools: Tool[] = [
  { name: 'React', icon: SiReact, color: 'text-cyan-400' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-black dark:text-white' },
  { name: 'Laravel', icon: SiLaravel, color: 'text-red-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
  { name: 'Express', icon: SiExpress, color: 'text-gray-500' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'Tailwind', icon: SiTailwindcss, color: 'text-teal-400' },
  { name: 'Go', icon: SiGo, color: 'text-cyan-500' },
  { name: 'Python', icon: SiPython, color: 'text-yellow-500' },
];

const bottomTools: Tool[] = [
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-400' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
  { name: 'Figma', icon: SiFigma, color: 'text-pink-500' },
  { name: 'VS Code', icon: VscVscode, color: 'text-blue-500' },
  { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
  { name: 'GitHub', icon: SiGithub, color: 'text-black dark:text-white' },
  { name: 'Vercel', icon: SiVercel, color: 'text-black dark:text-white' },
  { name: 'Firebase', icon: SiFirebase, color: 'text-yellow-500' },
  { name: 'Supabase', icon: SiSupabase, color: 'text-emerald-500' },
  { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
  {
    name: 'Prisma',
    icon: SiPrisma,
    color: 'text-slate-800 dark:text-slate-200',
  },
];

const ToolBadge = ({ tool }: { tool: Tool }) => (
  <div className="flex items-center gap-3 bg-white dark:bg-card px-6 py-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 min-w-max mx-3 hover:border-primary hover:shadow-md transition-all cursor-pointer group">
    <tool.icon
      size={28}
      className={`${tool.color} group-hover:scale-110 transition-transform`}
    />
    <span className="font-semibold text-slate-800 dark:text-slate-200">
      {tool.name}
    </span>
  </div>
);

const Tools = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerScale = useTransform(scrollYProgress, [0.1, 0.35], [0.95, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center py-24 overflow-hidden"
      id="tech-stack"
    >
      <motion.div
        style={{ scale: headerScale, opacity: headerOpacity }}
        className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-center px-4 max-w-3xl mb-10 sm:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2">
          <span className="text-primary font-bold tracking-widest text-sm uppercase">
            TECH STACK
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white"
        >
          What do I use for work? <br className="hidden sm:block" /> Check this
          out 🔥
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-slate-500 dark:text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base"
        >
          Tools, frameworks, and random tech I genuinely enjoy using.
        </motion.p>
      </motion.div>

      {/* Marquee 1 - Moves Left */}
      <div className="relative flex overflow-x-hidden w-full group py-4">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...topTools, ...topTools, ...topTools].map((tool, index) => (
            <ToolBadge key={index} tool={tool} />
          ))}
        </div>
      </div>

      {/* Marquee 2 - Moves Right */}
      <div className="relative flex overflow-x-hidden w-full group py-4 mt-2">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]"
          style={{ animationDirection: 'reverse' }}
        >
          {[...bottomTools, ...bottomTools, ...bottomTools].map(
            (tool, index) => (
              <ToolBadge key={index} tool={tool} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Tools;
