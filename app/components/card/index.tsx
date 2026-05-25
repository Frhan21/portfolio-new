'use client';

import { Button } from '@/components/ui/button';
import type { Project } from '@/model/project';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { fadeUp } from '../motions';
import { FaGithub } from 'react-icons/fa';
import { LuArrowRight } from 'react-icons/lu';

interface CardComponentProps {
  projects: Project[];
  priorityFirstImage?: boolean;
}

export default function CardComponent({
  projects,
  priorityFirstImage = false,
}: CardComponentProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full text-center py-20 text-slate-500">
        No projects available to display.
      </div>
    );
  }

  return (
    <div className="grid w-full gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="group relative w-full h-[380px] bg-[#1e293b] rounded-[32px] overflow-hidden flex flex-col justify-between shadow-xl"
        >
          {/* Text Content (Top Left) */}
          <div className="p-6 md:p-8 z-20 flex flex-col h-full max-w-[85%]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-300 border border-slate-500/50 rounded-full px-3 py-1">
                {project.category?.title ?? 'Project'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#ea580c] transition-colors">
              {project.title}
            </h3>

            <p className="text-slate-300 text-sm line-clamp-2 mb-6">
              {project.description ||
                'Project description is not available yet.'}
            </p>

            {!!project.tags?.length && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {project.tags.slice(0, 3).map((tag) => {
                  const cleanedTag = tag.replace(/[\[\]"]/g, '').trim();
                  return (
                    <span
                      key={`${project.id}-${cleanedTag}`}
                      className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm"
                    >
                      {cleanedTag}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-auto">
              {project.demo && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-slate-500 bg-transparent text-white hover:bg-slate-700 hover:text-white px-4 py-2 h-auto text-xs flex items-center gap-1 transition-colors"
                >
                  <Link href={project.demo} target="_blank">
                    <LuArrowRight size={14} />
                    Demo
                  </Link>
                </Button>
              )}

              {project.github && (
                <Button
                  asChild
                  className="rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 h-auto text-xs flex items-center gap-1 shadow-lg shadow-orange-500/20 border-none"
                >
                  <Link href={project.github} target="_blank">
                    <FaGithub size={14} />
                    Github
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Project Image (Bottom Right) */}
          <div className="absolute -bottom-[15%] -right-[15%] w-[80%] h-[60%] z-10 transition-transform duration-500 group-hover:-translate-y-4 group-hover:-translate-x-4">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl rotate-[-10deg] border-4 border-slate-800">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top"
                  priority={priorityFirstImage && index === 0}
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
