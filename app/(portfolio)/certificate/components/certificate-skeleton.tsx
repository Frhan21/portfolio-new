'use client';

import { motion } from 'motion/react';

// ─── Primitive shimmer block ────────────────────────────────────────────────
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-300 dark:bg-slate-700 ${className ?? ''}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        animate={{ translateX: ['−100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
      />
    </div>
  );
}

// ─── Single certificate card skeleton ───────────────────────────────────────
export function CertificateCardSkeleton() {
  return (
    <div className="relative h-[280px] md:h-[320px] rounded-[32px] overflow-hidden bg-slate-200 dark:bg-slate-800 border-[6px] border-white dark:border-slate-800 shadow-xl w-full">
      {/* Background Image Shimmer */}
      <Shimmer className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
        {/* Top Elements */}
        <div className="flex flex-col items-start gap-3">
          <Shimmer className="h-9 w-24 rounded-full" />
        </div>

        {/* Bottom Elements */}
        <div className="flex flex-col gap-4">
          <Shimmer className="h-8 w-3/4 rounded-md" />

          <div className="flex flex-wrap items-center gap-3">
            <Shimmer className="h-10 w-28 rounded-xl" />
            <Shimmer className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
