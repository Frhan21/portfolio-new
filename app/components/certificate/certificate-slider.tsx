'use client';

import type { Certificate } from '@/model/certificate';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';
import { fadeUp } from '../motions';
import CertificateItem from './certificate-item';

export default function CertificateSlider({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Limiting to 4 certificates as requested
  const displayCertificates = certificates.slice(0, 4);

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
    </div>
  );
}
