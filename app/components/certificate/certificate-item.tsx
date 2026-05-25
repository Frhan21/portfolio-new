'use client';

import type { Certificate } from '@/model/certificate';
import { motion } from 'motion/react';
import Image from 'next/image';
import { FaGraduationCap } from 'react-icons/fa';
import { LuCalendarDays } from 'react-icons/lu';
import { fadeUp } from '../motions';

interface CertificateItemProps {
  cert: Certificate;
}

export default function CertificateItem({ cert }: CertificateItemProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`group relative min-w-[300px] md:min-w-[400px] shrink-0 snap-center h-[280px] rounded-[32px] overflow-hidden bg-slate-200 border-[6px] border-white dark:border-slate-800 shadow-xl shadow-black/10 cursor-pointer `}
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
          <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 font-medium">
            <Image
              src={'https://placehold.co/600x400'}
              alt={cert.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        )}
      </div>

      {/* Dark Overlay - Appears on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
        {/* Top Elements */}
        <div className="flex flex-col items-start gap-3">
          {/* Default State Pill */}
          <div className="bg-white rounded-full px-5 py-2 shadow-sm">
            <span className="text-slate-800 text-sm font-bold tracking-wide">
              {cert.category?.title || 'Certificate'}
            </span>
          </div>
        </div>

        {/* Bottom Elements - Appears on Hover */}
        <div className="flex flex-col gap-4 opacity-0 translate-y-[20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
          <h3 className="font-extrabold text-white text-2xl md:text-xl leading-tight uppercase tracking-wide">
            {cert.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20">
              <div className="bg-white text-black p-1.5 rounded-lg">
                <FaGraduationCap size={16} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-white/70">Issuer</span>
                <span className="text-xs text-white font-bold">
                  {cert.issuer || 'Unknown Issuer'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20">
              <div className="bg-white text-black p-1.5 rounded-lg">
                <LuCalendarDays size={16} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-white/70">Issued at</span>
                <span className="text-xs text-white font-bold">
                  {cert.issuer_date
                    ? new Date(cert.issuer_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
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
  );
}
