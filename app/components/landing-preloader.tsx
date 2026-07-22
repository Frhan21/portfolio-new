'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const sessionKey = 'portfolio-preloader-seen';

export function LandingPreloader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || sessionStorage.getItem(sessionKey)) return;

    const showTimeout = window.setTimeout(() => setIsVisible(true), 0);
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem(sessionKey, 'true');
      setIsVisible(false);
    }, 850);

    return () => {
      window.clearTimeout(showTimeout);
      window.clearTimeout(timeout);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950 px-6 text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="grid size-14 place-items-center rounded-full border border-primary/40 bg-primary/10 text-lg font-black text-primary">
              FR
            </span>
            <p className="text-xs font-semibold tracking-[0.32em] text-slate-300">
              INITIALIZING PORTFOLIO
            </p>
            <motion.div
              className="h-px w-36 origin-left bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
