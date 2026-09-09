'use client';

import { Button } from '@/components/ui/button';
import { Category } from '@/model/category';
import type { Project } from '@/model/project';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { Layers } from 'lucide-react';
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

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category?.title === activeCategory);

  const displayProjects = filteredProjects.slice(0, 6);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Filter - Select Dropdown */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex items-center justify-center gap-3 mb-10 w-full"
      >
        <div className="relative">
          <Select
            value={activeCategory}
            onValueChange={(val) => setActiveCategory(val)}
          >
            <SelectTrigger className="w-[200px] rounded-full border-slate-200 dark:border-slate-700 bg-white dark:bg-card shadow-sm px-5 py-5 h-auto text-sm font-semibold text-slate-700 dark:text-slate-300 [&_svg:not([class*='text-'])]:text-slate-400">
              <Layers size={16} className="mr-1 text-primary" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-700">
              <SelectItem
                value="All"
                className="rounded-lg text-sm font-medium cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-400"
              >
                All Categories
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.title}
                  className="rounded-lg text-sm font-medium cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-400"
                >
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
