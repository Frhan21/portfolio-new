'use client';

import type { Certificate } from '@/model/certificate';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fadeUp } from '../motions';
import CertificateItem from './certificate-item';

export default function CertificateSlider({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Limiting to 4 certificates as requested
  const displayCertificates = certificates.slice(0, 4);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const item = el.firstElementChild;
    const step = item ? item.clientWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full relative mt-12">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar pl-4 md:pl-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayCertificates.map((cert) => (
          <CertificateItem
            key={cert.id}
            cert={cert}
            className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 snap-center"
          />
        ))}

        {/* "See More" Card at the end */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="min-w-[300px] h-[280px] md:h-80 shrink-0 snap-center bg-primary/10 dark:bg-primary/5 rounded-4xl border border-primary/20 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/20 transition-colors group"
        >
          <Link
            href="/certificate"
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <div className="w-16 h-16 bg-white dark:bg-card rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-bold text-primary text-xl">
              See All
              <br />
              Certificates
            </h3>
          </Link>
        </motion.div>
      </div>

      {/* Edge gradients — cut-off cards fade out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-16 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-16 bg-linear-to-l from-background to-transparent" />

      {/* Navigation buttons */}
      <button
        type="button"
        aria-label="Previous certificate"
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-11 rounded-full bg-white dark:bg-card border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next certificate"
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-11 rounded-full bg-white dark:bg-card border border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
