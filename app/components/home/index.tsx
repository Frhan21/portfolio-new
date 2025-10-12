"use client";

import { useTypeWriter } from "@/app/hooks/use-typing";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fadeDown, fadeIn, fadeLeft, fadeRight, fadeUp } from "../motions";

const Home = () => {
  const { typeWriterText, cursorVisible } = useTypeWriter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animasi setelah halaman siap
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50); // kasih sedikit delay biar smooth
    return () => clearTimeout(timer);
  }, []);
  return (
    <motion.div
      className="w-full h-screen px-6 md:px-16 py-8 mx-auto flex flex-col justify-center items-center gap-6 max-w-7xl"
      id="home"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <header className="space-y-6 text-center relative">
        <motion.h1
          className="text-[14px] md:text-[20px] relative inline-block"
          variants={fadeDown}
        >
          <span className="border-[2.5px] border-black px-6 md:px-12 py-2 font-bold text-black inline-block">
            Hello There, I'm M Farhan Ramadhan
          </span>
          {/* Decorative Boxes */}
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -top-2 -right-2" />
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -bottom-2 -right-2" />
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -top-2 -left-2" />
          <div className="w-5 h-5 md:w-4 md:h-4 bg-orange-400 border-[2.5px] border-black absolute -bottom-2 -left-2" />
        </motion.h1>

        <motion.h2
          className="text-[32px] md:text-[48px] font-extrabold leading-tight h-16 md:h-fit"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          I'am{" "}
          <span className="text-black dark:text-white whitespace-pre-line">
            {typeWriterText}
          </span>{" "}
          {cursorVisible && <span className="animate-blink">|</span>}
        </motion.h2>

        <motion.p
          className="tracking-wide text-[14px] md:text-[16px] text-gray-700 px-2 md:px-0"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          I create amazing websites and applications that are future-ready,
          leveraging the latest technologies with a focus on innovation, sleek
          design, and impressive digital experiences.
        </motion.p>
      </header>

      <motion.nav
        className="flex flex-col sm:flex-row mt-6 gap-4 items-center justify-center"
        variants={fadeUp}
        transition={{ delay: 0.6 }}
      >
        <motion.div variants={fadeLeft}>
          <Button
            className="bg-[#FE7743] rounded-full px-4 sm:w-60 h-14 hover:bg-[#EFEEEA] border-2 border-orange-500 hover:text-slate-700 text-[#EFEEEA]"
            aria-label="View my portfolio"
          >
            <a href="#portfolio">
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="px-4 py-2 rounded-full  text-sm font-bold">
                    View my portfolio
                  </span>
                  <span className="bg-[#EFEEEA] p-2 rounded-full hover:scale-95 transition-transform duration-200 ">
                    <ArrowRight size={24} className="text-slate-700" />
                  </span>
                </div>
              </div>
            </a>
          </Button>
        </motion.div>
        <motion.div variants={fadeRight}>
          <Button
            className="w-40 h-14 rounded-full bg-[#EFEEEA] border-2 border-black text-black hover:text-white"
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
      </motion.nav>
    </motion.div>
  );
};

export default Home;
