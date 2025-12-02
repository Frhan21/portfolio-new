"use client";

import { useTypeWriter } from "@/app/hooks/use-typing";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { fadeDown, fadeIn, fadeLeft, fadeRight, fadeUp } from "../motions";

const Home = () => {
  const { typeWriterText, cursorVisible } = useTypeWriter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="relative mx-auto h-screen flex w-full max-w-6xl flex-col items-center gap-10 py-16 text-center"
      id="home"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <motion.div
        variants={fadeDown}
        className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-5 py-2 text-sm font-medium text-orange-600"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
        </span>
        Available for Freelance & Remote Work
      </motion.div>
      <div className="space-y-8">
        <motion.div
          className="relative mx-auto inline-flex items-center justify-center border-2 border-slate-900  px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 bg-background"
          variants={fadeDown}
        >
          Hello There, Iam M Farhan Ramadhan
          {/* Decorative Boxes */}
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -top-2 -right-2" />
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -bottom-2 -right-2" />
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -top-2 -left-2" />
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -bottom-2 -left-2" />
        </motion.div>
      </div>

      <motion.h1
        className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
      >
        I&apos;m{" "}
        <span className="whitespace-pre-line text-black dark:text-white">
          {typeWriterText}
        </span>{" "}
        {cursorVisible && <span className="animate-blink">|</span>}
      </motion.h1>

      <motion.p
        className="max-w-7xl w-96 md:w-full text-base leading-relaxed text-slate-500 md:text-lg"
        variants={fadeUp}
        transition={{ delay: 0.35 }}
      >
        I create amazing websites and applications that are future-ready,
        leveraging the latest technologies with a focus on innovation, sleek
        design, and impressive digital experiences.
      </motion.p>

      <motion.div
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        variants={fadeUp}
        transition={{ delay: 0.45 }}
      >
        <motion.div variants={fadeLeft}>
          <Button
            className="flex items-center gap-3 rounded-full border-2 border-orange-500 bg-[#FE7743] px-10 py-6 text-base font-semibold text-[#EFEEEA] shadow-lg shadow-orange-200 transition hover:bg-[#EFEEEA] hover:text-slate-700"
            aria-label="View my portfolio"
          >
            <a href="#portfolio" className="flex items-center gap-3">
              <span>View my portfolio</span>
            </a>
          </Button>
        </motion.div>
        <motion.div variants={fadeRight}>
          <Button
            className="rounded-full border-2 border-slate-900 bg-[#EFEEEA] px-10 py-6 text-base font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
            aria-label="Hire me"
          >
            <a
              href="mailto:frhn.r3@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hire me
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
