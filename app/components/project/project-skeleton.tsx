'use client';

import { motion } from 'motion/react';

// ─── Primitive shimmer block ────────────────────────────────────────────────
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 ${className ?? ''}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        animate={{ translateX: ['−100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
      />
    </div>
  );
}

// ─── Category filter tab skeletons ──────────────────────────────────────────
function CategoryTabsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <Shimmer key={i} className="h-9 w-28 rounded-full" />
      ))}
    </div>
  );
}

// ─── Single project card skeleton ───────────────────────────────────────────
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card overflow-hidden shadow-sm">
      {/* thumbnail */}
      <Shimmer className="w-full h-52" />
      <div className="p-5 flex flex-col gap-3">
        {/* category badge */}
        <Shimmer className="h-5 w-20 rounded-full" />
        {/* title */}
        <Shimmer className="h-6 w-3/4" />
        {/* description lines */}
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
        {/* tech stack chips */}
        <div className="flex gap-2 mt-1">
          <Shimmer className="h-6 w-14 rounded-full" />
          <Shimmer className="h-6 w-14 rounded-full" />
          <Shimmer className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Full project section skeleton (exported / reusable) ────────────────────
export default function ProjectSkeleton({
  cardCount = 4,
}: {
  cardCount?: number;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <CategoryTabsSkeleton count={5} />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: cardCount }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
      {/* "View All" button skeleton */}
      <div className="mt-12 flex justify-center">
        <Shimmer className="h-12 w-44 rounded-full" />
      </div>
    </div>
  );
}
