'use client';

import { GithubIcon, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  HiOutlineCode,
  HiOutlineColorSwatch,
  HiOutlineDatabase,
  HiOutlineServer,
} from 'react-icons/hi';
import { fadeDown, fadeIn, fadeRight, fadeUp } from '../motions';

const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    className="w-full"
    variants={fadeUp}
    whileInView={'visible'}
    initial="hidden"
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="bg-white dark:bg-card rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 px-8 py-10 flex flex-col items-start gap-6 h-full">
      <div className="bg-primary/10 rounded-2xl w-14 h-14 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* === About Section === */}
      <section id="about" className="w-full flex justify-center py-24 px-6">
        <motion.div
          className="bg-[#1e293b] dark:bg-card rounded-[40px] max-w-6xl w-full px-10 py-16 md:px-16 md:py-20 relative flex flex-col md:flex-row items-center justify-between shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          {/* Left Content */}
          <div className="z-20 max-w-xl space-y-6 w-full md:w-1/2">
            <motion.div variants={fadeDown} className="flex items-center gap-2">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">
                ABOUT ME
              </span>
            </motion.div>

            <motion.h2
              variants={fadeRight}
              className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
            >
              Knowing a little
              <br />
              bit about me..
            </motion.h2>

            <motion.p
              variants={fadeRight}
              className="mt-6 text-slate-300 text-sm md:text-sm leading-relaxed text-justify"
            >
              <strong className="text-white">Fullstack Developer</strong> with
              hands-on experience building dashboard systems and web
              applications using{' '}
              <strong className="text-white">
                Next.js, React.js, Go, Laravel, and Express.js
              </strong>
              . Experienced in integrating{' '}
              <strong className="text-white">
                REST APIs, implementing authentication and RBAC systems
              </strong>
              , and developing responsive user interfaces. Strong analytical and
              problem-solving background from Physics and Instrumentation
              studies, with interest in building scalable and user-focused
              digital products.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 mt-8 border border-white/20 w-max px-6 py-4 rounded-[20px]"
            >
              <span className="text-slate-300 text-sm font-medium">
                Just calling me,
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <FaLinkedin size={'24'} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <FaTwitter size={'24'} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <Instagram size={'24'} />
                </a>
                <a
                  href="https://github.com/nerddev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <GithubIcon size={'24'} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Content / Graphics */}
          <div className="w-full md:w-1/2 flex items-end justify-center relative mt-16 md:mt-0 min-h-[400px] lg:min-h-[500px]">
            {/* Decorative Orange Circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="absolute right-0 bottom-[-50px] md:bottom-0 w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-primary rounded-full z-0"
            ></motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="z-10 relative w-64 h-[300px] md:w-80 md:h-[380px] lg:w-[400px] lg:h-[480px] flex justify-center items-end"
            >
              <img
                src="/profile.png"
                alt="Profile"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
              />
            </motion.div>

            {/* Small Floating Text Editor */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: 'easeOut',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0.5,
              }}
              viewport={{ once: true }}
              className="absolute bottom-12 left-0 md:-left-8 lg:left-5 z-20 bg-[#0f172a] rounded-lg border border-slate-700/50 shadow-2xl overflow-hidden w-48 md:w-56"
            >
              <div className="flex items-center px-3 py-2 bg-[#1e293b] border-b border-slate-700/50">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-3 font-mono text-[10px] md:text-xs text-slate-300 leading-relaxed">
                <span className="text-pink-400">const</span>{' '}
                <span className="text-blue-400">coder</span>{' '}
                <span className="text-white">=</span> {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-sky-300">name</span>:{' '}
                <span className="text-amber-300">&apos;NerdDev&apos;</span>,
                <br />
                &nbsp;&nbsp;<span className="text-sky-300">skills</span>: [
                <span className="text-amber-300">&apos;React&apos;</span>,{' '}
                <span className="text-amber-300">&apos;Go&apos;</span>]
                <br />
                {'}'};
              </div>
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-[10%] left-[20%] z-10 bg-white p-3 rounded-2xl shadow-lg border border-slate-100"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                alt="Figma"
                className="w-8 h-8"
              />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute top-[20%] right-[10%] z-10 bg-white p-3 rounded-2xl shadow-lg border border-slate-100"
            >
              <img
                src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
                alt="Postman"
                className="w-8 h-8"
              />
            </motion.div>
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute bottom-[20%] right-[0%] z-10 bg-white p-3 rounded-2xl shadow-lg border border-slate-100"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
                alt="VSCode"
                className="w-8 h-8"
              />
            </motion.div>
            <motion.div
              animate={{ y: [15, -15, 15] }}
              transition={{ repeat: Infinity, duration: 7 }}
              className="absolute top-1/2 right-[-5%] z-10 bg-white p-3 rounded-2xl shadow-lg border border-slate-100"
            >
              <FaGithub size={32} className="text-black" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* === Service Section === */}
      <section id="service" className="w-full px-6 py-24">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">
              MY SERVICES
            </span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-extrabold">
            Some of my core <br />
            competencies, check them out
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mt-4">
            Various services I can provide to help turn your digital project
            ideas into reality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full text-left">
            <ServiceCard
              icon={<HiOutlineCode size={28} />}
              title="Frontend Development"
              description="Building interactive, responsive user interfaces that deliver optimal experiences using React & Next.js."
            />
            <ServiceCard
              icon={<HiOutlineServer size={28} />}
              title="Backend Development"
              description="Designing and building secure, scalable APIs and server architectures with Node.js and its ecosystem."
            />
            <ServiceCard
              icon={<HiOutlineDatabase size={28} />}
              title="Fullstack Solutions"
              description="End-to-end digital solution development from database design to ready-to-use user interfaces."
            />
            <ServiceCard
              icon={<HiOutlineColorSwatch size={28} />}
              title="UI/UX Design"
              description="Designing prototypes and interfaces that are not only visually stunning but also intuitive and user-centric."
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
