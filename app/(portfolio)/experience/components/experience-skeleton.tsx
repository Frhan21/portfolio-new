'use client';

import { motion } from 'motion/react';

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 ${className ?? ''}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        animate={{ translateX: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
      />
    </div>
  );
}

function ExperienceCardSkeleton() {
  return (
    <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start">
      {/* Timeline dot placeholder */}
      <div className="hidden md:flex shrink-0 w-[32px] h-[32px] rounded-full items-center justify-center mt-4">
        <Shimmer className="w-8 h-8 rounded-full" />
      </div>

      <div className="flex-1 w-full">
        <div className="bg-white dark:bg-card p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
            <Shimmer className="h-6 w-3/4" />
            <Shimmer className="h-5 w-36 rounded-full" />
          </div>
          <Shimmer className="h-4 w-1/3 mb-4" />
          <Shimmer className="h-4 w-full mb-1" />
          <Shimmer className="h-4 w-5/6 mb-2" />
          <Shimmer className="h-4 w-2/3 mb-6" />
          <div className="flex flex-wrap gap-2">
            <Shimmer className="h-6 w-16 rounded-full" />
            <Shimmer className="h-6 w-20 rounded-full" />
            <Shimmer className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceTimelineSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <ExperienceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
