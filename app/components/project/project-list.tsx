'use client';

import { Button } from '@/components/ui/button';
import { Category } from '@/model/category';
import type { Project } from '@/model/project';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import CardComponent from '../card';
import { fadeUp } from '../motions';

export default function ProjectList({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category?.title === activeCategory);

  // Get max 4 projects
  const displayProjects = filteredProjects.slice(0, 4);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Filter Tabs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-10 w-full"
      >
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeCategory === 'All'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-card dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.title)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat.title
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-card dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid with Animation */}
      <div className="w-full min-h-[300px]">
        {displayProjects.length === 0 ? (
          <section className="flex flex-col items-center justify-center text-center w-full py-16">
            <p className="text-gray-500">
              No projects available for this category.
            </p>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <CardComponent projects={displayProjects} priorityFirstImage />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <Button
          className="px-8 py-6 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 font-bold shadow-sm flex items-center gap-2 dark:bg-card dark:border-slate-800 dark:text-white dark:hover:bg-slate-800"
          asChild
        >
          <Link href="/projects">View All Projects &rarr;</Link>
        </Button>
      </motion.div>
    </div>
  );
}
