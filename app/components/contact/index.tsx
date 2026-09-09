'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef, useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { fadeLeft, fadeRight } from '../motions';
import { PortfolioProfile } from '@/model/profile';

interface ContactProps {
  profile: PortfolioProfile;
}

const Contact = ({ profile }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const formScale = useTransform(scrollYProgress, [0.1, 0.4], [0.96, 1]);
  const formOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6 dark:bg-background transition-colors duration-300 ease-in-out"
      id="contact"
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-8 items-start justify-between">
        {/* Left Section - Text Intro */}
        <motion.div
          className="w-full lg:w-5/12 flex flex-col items-start text-left"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">
              CONTACT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white mb-4 sm:mb-6">
            Got a cool idea? <br className="hidden sm:block" /> Let&apos;s build
            something sick together 🔥
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-6 sm:mb-8 leading-relaxed max-w-md">
            Whether it&apos;s a startup, AI tool, portfolio, or random mid night
            idea — I&apos;m down to build it.
          </p>

          <div className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 px-5 py-2.5 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              Currently available for freelance
            </span>
          </div>
        </motion.div>

        {/* Right Section - Contact Form and Links */}
        <motion.div
          className="w-full lg:w-7/12 flex flex-col md:flex-row gap-8"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Form */}
          <motion.form
            style={{ scale: formScale, opacity: formOpacity }}
            onSubmit={handleSubmit}
            className="w-full md:w-2/3 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-5 sm:gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                What do you have in mind?
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="What do you have in mind?"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900 dark:text-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-slate-950 font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Send Message <span className="text-xl">🚀</span>
            </button>
          </motion.form>

          {/* Social Links Container */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 ml-2 uppercase tracking-wide">
              You can also find me here
            </h3>

            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-primary transition-colors group"
              >
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  <FaGithub size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white">
                    GitHub
                  </span>
                  <span className="text-xs text-slate-500">GitHub profile</span>
                </div>
              </a>
            )}

            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-primary transition-colors group"
              >
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  <FaLinkedin size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white">
                    LinkedIn
                  </span>
                  <span className="text-xs text-slate-500">
                    LinkedIn profile
                  </span>
                </div>
              </a>
            )}

            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-primary transition-colors group"
            >
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                <FaEnvelope size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white">
                  Email
                </span>
                <span className="text-xs text-slate-500">{profile.email}</span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
