'use client';

import { motion } from 'motion/react';
import React from 'react';
import { Briefcase } from 'lucide-react';
import { fadeIn, fadeUp } from '../motions';

const experiences = [
  {
    title: 'Backend Engineer Intern',
    role: 'PT. DOT Indonesia',
    type: 'Internship',
    date: 'Mar 2026 - Present',
    description:
      'Built secure RESTful APIs with Go and PostgreSQL. Implemented Clean Architecture to ensure long-term scalability and robust performance.',
    badges: ['Go', 'Gin', 'PostgreSQL', 'GORM', 'REST API'],
  },
  {
    title: 'Frontend Developer Intern',
    role: 'CV Koding Data',
    type: 'Internship',
    date: 'Sep 2025 - Nov 2025',
    description:
      'Developed responsive Next.js dashboards. Integrated authentication flows and RESTful APIs for modern, user-friendly interfaces.',
    badges: ['React', 'Next.js', 'Tailwind CSS', 'API Integration'],
  },
  {
    title: 'Head of Graphic Design',
    role: 'BEM KM Universitas Andalas',
    type: 'Organization',
    date: '2023 - 2024',
    description:
      'Led visual content production and coordinated design workflows to deliver engaging event branding and social media publications.',
    badges: ['Branding', 'Design', 'Leadership'],
  },
  {
    title: 'Data & Program Staff',
    role: 'LPPM Universitas Andalas',
    type: 'Contract',
    date: 'Nov 2025 - Present',
    description:
      'Managed institutional social media and provided robust research support and web updates for academic projects.',
    badges: ['Content', 'Web', 'Research Support'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Experience = () => {
  return (
    <section
      className="flex flex-col items-center justify-center w-full h-fit mt-20 md:px-12 px-4 mx-auto py-24"
      id="experience"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        {/* Left Side */}
        <motion.div
          className="flex flex-col w-full lg:w-5/12 shrink-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-2 mb-6">
            <Briefcase
              size={20}
              className="text-slate-500 dark:text-slate-400"
            />
            <span className="text-primary font-bold tracking-widest text-sm uppercase">
              EXPERIENCES
            </span>
          </div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight"
          >
            Things I&apos;ve done <br /> outside my localhost
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed"
          >
            A mix of professional work, organization experience, and real-world
            projects that shaped how I build, design, and communicate.
          </motion.p>

          {/* Card: Hands-on / Track Record */}
          <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 md:items-center"
          >
            <div className="flex flex-col shrink-0">
              <span className="text-2xl font-bold text-orange-500">
                Track Record
              </span>
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wide">
                Proven & Reliable
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-4">
              A blend of backend engineering, frontend development, and creative
              roles that highlights a holistic approach to building digital
              solutions.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side - Timeline */}
        <div className="w-full lg:w-7/12 relative">
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {experiences.slice(0, 3).map((exp, index, arr) => (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
                variants={fadeUp}
              >
                {/* Segmented Timeline Line (except for last item) */}
                {index !== arr.length - 1 && (
                  <div className="absolute left-[15px] top-12 -bottom-12 w-0.5 bg-orange-200 dark:bg-orange-900/50 hidden md:block z-0"></div>
                )}

                {/* Timeline Dot */}
                <div className="hidden md:flex shrink-0 w-[32px] h-[32px] bg-orange-100 dark:bg-orange-900/30 rounded-full items-center justify-center relative z-10 border-4 border-background mt-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full group-hover:scale-125 transition-transform"></div>
                </div>

                {/* Experience Card */}
                <motion.div
                  className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm flex-1 relative overflow-hidden"
                  whileHover={{
                    y: -4,
                    boxShadow:
                      '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-400 to-orange-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <span className="text-sm font-semibold text-orange-500 shrink-0 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full">
                        {exp.date}
                      </span>
                    </div>

                    <div className="text-slate-500 dark:text-slate-400 font-medium mb-4 flex items-center gap-2">
                      <Briefcase size={14} className="text-orange-500" />
                      {exp.role}{' '}
                      <span className="text-slate-300 dark:text-slate-600">
                        •
                      </span>{' '}
                      <span className="font-normal">{exp.type}</span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 px-3 py-1 text-xs font-medium rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
