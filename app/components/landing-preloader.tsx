'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const sessionKey = 'portfolio-preloader-seen';

export function LandingPreloader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING');

  useEffect(() => {
    // Keydown listener to immediately clear session storage on Hard Refresh shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const isShift = e.shiftKey;
      const isRKey = e.key === 'r' || e.key === 'R';
      const isF5 = e.key === 'F5';

      // Hard refresh shortcuts: Ctrl+Shift+R, Cmd+Shift+R, Shift+F5, Ctrl+F5
      if (
        (isCmdOrCtrl && isShift && isRKey) ||
        (isShift && isF5) ||
        (isCmdOrCtrl && isF5)
      ) {
        sessionStorage.removeItem(sessionKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Check navigation type to detect reload
    const navEntries = performance.getEntriesByType(
      'navigation'
    ) as PerformanceNavigationTiming[];
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    // If it's a normal refresh and session key exists, skip preloader
    const hasSeenPreloader = sessionStorage.getItem(sessionKey);
    if (hasSeenPreloader && isReload) {
      // Normal refresh -> skip preloader
      return;
    }

    // Otherwise (First visit OR Hard refresh where sessionKey was cleared), show preloader
    const showTimeout = window.setTimeout(() => setIsVisible(true), 0);

    const startTime = performance.now();
    const duration = 1850; // Progress counts from 0 to 100 over ~1.85s

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const rawProgress = Math.min(elapsedTime / duration, 1);

      // Easing curve: easeOutCubic for smooth deceleration towards 100%
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const currentVal = Math.floor(easedProgress * 100);

      setProgress(currentVal);

      // Dynamic status messages based on progress
      if (currentVal < 25) {
        setStatusText('INITIALIZING SYSTEMS');
      } else if (currentVal < 60) {
        setStatusText('LOADING ASSETS');
      } else if (currentVal < 90) {
        setStatusText('CONFIGURING INTERFACE');
      } else {
        setStatusText('SYSTEM READY');
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Hold briefly at 100% before triggering exit curtain (~350ms hold)
        setTimeout(() => {
          sessionStorage.setItem(sessionKey, 'true');
          setIsVisible(false);
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      window.clearTimeout(showTimeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-between overflow-hidden bg-slate-950 px-6 py-12 text-white select-none"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.55,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          aria-hidden="true"
        >
          {/* Background Ambient Glow & Subtle Radial Pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/15 via-slate-950/80 to-slate-950" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

          {/* Top Header / Brand Tag */}
          <motion.div
            className="relative z-10 flex items-center justify-between w-full max-w-5xl text-xs font-mono tracking-widest text-slate-400 uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>PORTFOLIO OS</span>
            </div>
            <span>v2.0 // 2026</span>
          </motion.div>

          {/* Center Visual Monogram & Counter Display */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              filter: 'blur(10px)',
              transition: { duration: 0.25 },
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/50 to-cyan-500/50 opacity-75 blur-md animate-pulse" />
              <div className="relative grid size-16 place-items-center rounded-full border border-primary/50 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
                <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-slate-100 to-primary">
                  FR
                </span>
              </div>
            </div>

            {/* Large Sleek Percentage Counter */}
            <div className="flex items-baseline justify-center font-mono font-bold tracking-tighter text-white">
              <span className="text-6xl sm:text-7xl md:text-8xl transition-all duration-75">
                {String(progress).padStart(2, '0')}
              </span>
              <span className="text-2xl sm:text-3xl text-primary font-sans ml-1">
                %
              </span>
            </div>

            {/* Dynamic Status Text */}
            <div className="h-5 flex items-center justify-center overflow-hidden">
              <motion.p
                key={statusText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono font-semibold tracking-[0.3em] text-slate-300 uppercase"
              >
                {statusText}
              </motion.p>
            </div>
          </motion.div>

          {/* Bottom Progress Bar */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-2 w-full max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800/80 p-0.5 border border-slate-700/50">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-primary via-cyan-400 to-primary shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
