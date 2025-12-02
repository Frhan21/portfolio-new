"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { Project } from "../types/Model";
import { motion } from "motion/react";
import { fadeUp } from "../motions";

interface CardComponentProps {
  projects: Project[];
}

const GRADIENTS = [
  "from-orange-400 via-orange-400 to-orange-500",
  "from-sky-400 via-sky-400 to-blue-500",
  "from-indigo-500 via-violet-500 to-purple-600",
  "from-emerald-400 via-teal-400 to-green-500",
];

const CardComponent = ({ projects }: CardComponentProps) => {
  if (!projects.length) {
    return (
      <section className="flex flex-col items-center justify-center text-center w-full py-16">
        <p className="text-gray-600">
          Belum ada proyek yang bisa ditampilkan.
        </p>
      </section>
    );
  }

  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => {
        const gradient = GRADIENTS[index % GRADIENTS.length];
        const badge = project.category?.title ?? "Project";
        const description =
          project.description ??
          "Deskripsi proyek belum tersedia, namun segera akan diperbarui.";

        return (
          <motion.article
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-lg shadow-orange-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className={`relative flex min-h-[220px] flex-col justify-between rounded-[32px] rounded-b-none bg-gradient-to-br ${gradient} text-white`}
            >
              {project.image && (
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-80 mix-blend-soft-light"
                  />
                </div>
              )}
              <div className="relative flex items-center justify-between px-6 pt-6">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                  {badge}
                </span>
              </div>
              <div className="relative px-6 pb-8 pt-4">
                <p className="text-2xl font-semibold leading-tight">
                  {project.title}
                </p>
              </div>
            </div>

            <div className="rounded-[32px] rounded-t-none bg-white px-6 pb-6 pt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {project.title}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {description}
              </p>

              {!!project.tags?.length && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => {
                    const cleanedTag = tag.replace(/[\[\]"]/g, "").trim();
                    return (
                      <span
                        key={`${project.id}-${cleanedTag}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {cleanedTag}
                      </span>
                    );
                  })}
                </div>
              )}

              {(project.demo || project.github) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.demo && (
                    <Button
                      asChild
                      variant="secondary"
                      className="rounded-full bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"
                    >
                      <Link href={project.demo} target="_blank">
                        Demo Langsung
                      </Link>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      asChild
                      variant="ghost"
                      className="rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      <Link href={project.github} target="_blank">
                        Lihat Kode
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default CardComponent;
