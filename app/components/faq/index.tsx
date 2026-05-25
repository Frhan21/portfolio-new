'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { fadeIn, fadeUp } from '../motions';

const faqData = [
  {
    question: 'What kind of projects do you usually work on?',
    answer:
      "I usually work on web-based projects, ranging from landing pages, company profiles, and admin dashboards, to complex web apps (Fullstack). Lately, I've also been exploring AI integrations in applications.",
  },
  {
    question: "What's your go-to tech stack for building websites?",
    answer:
      'For the frontend, definitely React and Next.js, spiced up with TailwindCSS for styling. For the backend, I often use Node.js (Express), or sometimes Go if I need more performance. My favorite databases are PostgreSQL and MongoDB.',
  },
  {
    question: 'Can you build a project from scratch to release (Fullstack)?',
    answer:
      'Absolutely! I can help from UI/UX research, slicing designs into code, building APIs on the backend, connecting to the database, to finally deploying it so it can be accessed by everyone.',
  },
  {
    question:
      'How does the process work if I want to hire you for freelance work?',
    answer:
      "It's simple, just contact me via email or DM on my social media. We'll discuss your idea, feature requirements, timeline, and budget. Once we agree, we'll start executing the project!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center py-24 px-6 bg-secondary rounded-3xl"
      id="faq"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
        {/* Left: Heading */}
        <motion.div
          className="flex flex-col items-start text-left w-full md:w-1/3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Things people
            <br />
            usually ask me 👀
          </h2>
          <p className="text-slate-300 text-base">
            Quick answers before you slide into my inbox.
          </p>

          {/* Decorative arrow or icon */}
          <div className="mt-8 text-primary opacity-80 hidden md:block">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C12 4 12 11 12 15C12 19 16 20 20 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 16L20 20L16 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Right: Accordion */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-white font-medium text-lg md:text-xl pr-4">
                  {faq.question}
                </span>
                <span className="text-primary text-2xl flex-shrink-0 transition-transform duration-300 transform">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-300 text-base leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
