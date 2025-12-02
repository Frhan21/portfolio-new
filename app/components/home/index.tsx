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
      <motion.section
      className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-12 text-center"
      id="home"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <div className="space-y-5">
        <motion.div
          variants={fadeDown}
          className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-5 py-2 text-sm font-medium text-orange-600"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
          Available for Freelance & Remote Work
        </motion.div>

        <motion.div
          className="relative mx-auto inline-flex items-center justify-center rounded-[32px] border-2 border-slate-900 bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-900"
          variants={fadeDown}
        >
          Hello There, I'm M Farhan Ramadhan
          <span className="pointer-events-none absolute -left-3 -top-3 h-4 w-4 rounded-md border-2 border-slate-900 bg-orange-400" />
          <span className="pointer-events-none absolute -right-3 -top-3 h-4 w-4 rounded-md border-2 border-slate-900 bg-orange-400" />
          <span className="pointer-events-none absolute -left-3 -bottom-3 h-4 w-4 rounded-md border-2 border-slate-900 bg-orange-400" />
          <span className="pointer-events-none absolute -right-3 -bottom-3 h-4 w-4 rounded-md border-2 border-slate-900 bg-orange-400" />
        </motion.div>
      </div>

      <motion.h1
        className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
      >
        I'am{" "}
        <span className="text-black dark:text-white whitespace-pre-line">
          {typeWriterText}
        </span>{" "}
        {cursorVisible && <span className="animate-blink">|</span>}
      </motion.h1>

      <motion.p
        className="max-w-3xl text-base leading-relaxed text-slate-500 md:text-lg"
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
            className="flex items-center gap-3 rounded-full border-2 border-orange-500 bg-[#FE7743] px-6 py-3 text-base font-semibold text-[#EFEEEA] shadow-lg shadow-orange-200 transition hover:bg-[#EFEEEA] hover:text-slate-700"
            aria-label="View my portfolio"
          >
            <a href="#portfolio" className="flex items-center gap-3">
              <span>View my portfolio</span>
              <span className="rounded-full bg-[#EFEEEA] p-2 text-slate-700 transition hover:scale-95">
                <ArrowRight size={20} />
              </span>
            </a>
          </Button>
        </motion.div>
        <motion.div variants={fadeRight}>
          <Button
            className="rounded-full border-2 border-slate-900 bg-[#EFEEEA] px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
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
   Hire me
            </a>
          </Button>
        </motion.div>
      </motion.nav>
    </motion.div>
    </a>
          </Button>
        </motion.div>
      </motion.nav>
    </motion.div>
      </a>
          </Button>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};

export default Home;
