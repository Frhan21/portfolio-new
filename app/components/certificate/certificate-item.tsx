'use client';

import { Card3D } from '@/components/ui/card-3d';
import type { Certificate } from '@/model/certificate';
import { motion } from 'motion/react';
import Image from 'next/image';
import { FaGraduationCap } from 'react-icons/fa';
import { LuCalendarDays } from 'react-icons/lu';
import { fadeUp } from '../motions';

import { cn } from '@/lib/utils';

interface CertificateItemProps {
  cert: Certificate;
  className?: string;
}

export default function CertificateItem({
  cert,
  className,
}: CertificateItemProps) {
  return (
    <Card3D intensity={10} className={cn('w-full h-full', className)}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="group relative w-full h-[280px] sm:h-[300px] md:h-80 rounded-[28px] sm:rounded-4xl overflow-hidden bg-slate-800 border-4 sm:border-[6px] border-white dark:border-slate-800 shadow-xl shadow-black/10 cursor-pointer"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {cert.image ? (
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-400 font-medium text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Dark Overlay - Partially visible on mobile, full on desktop hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-black/30 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
          {/* Top Elements */}
          <div className="flex flex-col items-start gap-3">
            {/* Default State Pill */}
            <div className="bg-white/90 backdrop-blur-xs rounded-full px-4 py-1.5 shadow-sm">
              <span className="text-slate-900 text-xs font-extrabold tracking-wide">
                {cert.category?.title || 'Certificate'}
              </span>
            </div>
          </div>

          {/* Bottom Elements - Always visible on mobile, slide-up on desktop hover */}
          <div className="flex flex-col gap-3 sm:gap-4 opacity-100 md:opacity-0 md:translate-y-5 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-75">
            <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl leading-tight uppercase tracking-wide line-clamp-2">
              {cert.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-white/20">
                <div className="bg-white text-black p-1 rounded-lg shrink-0">
                  <FaGraduationCap size={14} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] sm:text-[10px] text-white/70">
                    Issuer
                  </span>
                  <span className="text-xs text-white font-bold max-w-[120px] truncate">
                    {cert.issuer || 'Unknown Issuer'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-white/20">
                <div className="bg-white text-black p-1 rounded-lg shrink-0">
                  <LuCalendarDays size={14} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] sm:text-[10px] text-white/70">
                    Issued at
                  </span>
                  <span className="text-xs text-white font-bold">
                    {cert.issuer_date
                      ? new Date(cert.issuer_date).toLocaleDateString('id-ID', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Unknown Date'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Card3D>
  );
}
