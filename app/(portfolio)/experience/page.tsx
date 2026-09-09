'use client';

import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { use } from 'react';
import Header from '../components/header';
import Pagination from '../components/pagination';
import { useQueryExperience } from '@/app/components/experience/hooks/use-query-experience';
import { ExperienceTimelineSkeleton } from './components/experience-skeleton';
import { formatDate } from '@/lib/date';

const PAGE_SIZE = 10;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

type ExperiencePageProps = {
  searchParams?: Promise<{ page?: string }> | { page?: string };
};

const ExperiencePage = ({ searchParams }: ExperiencePageProps) => {
  const resolvedSearchParams =
    searchParams instanceof Promise ? use(searchParams) : searchParams;
  const requestedPage = Number(resolvedSearchParams?.page ?? '1');
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const { data, isLoading, isError } = useQueryExperience(
    PAGE_SIZE,
    currentPage
  );

  const totalPages = data?.meta.totalPages ?? 1;
  const totalItems = data?.meta.total ?? 0;
  const experiences = data?.items ?? [];
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);
  const pageLabel = `${startItem}-${endItem}`;

  return (
    <div className="mt-5 space-y-8 px-4 md:px-6 mb-20">
      <Header
        title="Work Experience"
        description="Perjalanan karir profesional saya di industri teknologi."
      />
      {isLoading ? (
        <ExperienceTimelineSkeleton count={3} />
      ) : isError || !experiences.length ? (
        <section className="flex min-h-[200px] flex-col items-center justify-center text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Experience data is not available yet.
          </p>
        </section>
      ) : (
        <>
          <div className="w-full max-w-4xl mx-auto">
            <motion.div
              className="flex flex-col gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {experiences.map((exp, index, arr) => (
                <motion.div
                  key={exp.id}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
                  variants={fadeUp}
                >
                  {/* Timeline connecting line */}
                  {index !== arr.length - 1 && (
                    <div className="absolute left-[15px] top-12 -bottom-12 w-0.5 bg-orange-200 dark:bg-orange-900/50 hidden md:block z-0" />
                  )}

                  {/* Timeline dot */}
                  <div className="hidden md:flex shrink-0 w-[32px] h-[32px] bg-orange-100 dark:bg-orange-900/30 rounded-full items-center justify-center relative z-10 border-4 border-background mt-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Mobile date badge (always visible on small screens) */}
                  <div className="flex md:hidden items-center gap-2 w-full">
                    <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0" />
                    <span className="text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full">
                      {formatDate(exp.startDate, 'en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {exp.endDate
                        ? formatDate(exp.endDate, 'en-US', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Present'}
                    </span>
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm flex-1 relative overflow-hidden"
                    whileHover={{
                      y: -4,
                      boxShadow:
                        '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {/* Orange top bar on hover */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-400 to-orange-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />

                    <div className="relative z-10">
                      {/* Title row + date (desktop) */}
                      <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <span className="text-sm font-semibold text-orange-500 shrink-0 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                          {formatDate(exp.startDate, 'en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          -{' '}
                          {exp.endDate
                            ? formatDate(exp.endDate, 'en-US', {
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Present'}
                        </span>
                      </div>

                      {/* Mobile title */}
                      <h3 className="md:hidden text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300 mt-1">
                        {exp.position}
                      </h3>

                      {/* Company */}
                      <div className="text-slate-500 dark:text-slate-400 font-medium mb-4 flex items-center gap-2">
                        <Briefcase size={14} className="text-orange-500" />
                        {exp.company}
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {exp.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 px-3 py-1 text-xs font-medium rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Pagination
            page={currentPage}
            totalPage={totalPages}
            totalItems={totalItems}
            pageLabel={pageLabel}
            basePath="/experience"
          />
        </>
      )}
    </div>
  );
};

export default ExperiencePage;
