"use client";

import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, Github } from "lucide-react";
import Link from "next/link";
import { Project } from "../types/Model";
import LoadingSpinner from "@/app/dashboard/components/LoadingSpinner";

import { motion } from "motion/react";
import { fadeUp } from "../motions";

const CardComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/project?limit=3");
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data.projects);
      } catch (err: any) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center">
        <LoadingSpinner size={64} />
      </section>
    );
  }

  // Tampilkan pesan error jika terjadi kesalahan saat fetch.
  if (error) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center text-center">
        <p className="text-red-500">Terjadi kesalahan:</p>
        <p className="text-gray-600">{error}</p>
      </section>
    );
  }

  // Tampilkan pesan jika tidak ada project yang ditemukan
  if (!loading && projects.length === 0) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center text-center">
        <p className="text-gray-600">data tidak ada DB sedang tidak aktif</p>
      </section>
    );
  }

  return (
    <>
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="flex flex-col p-2 gap-2"
          variants={fadeUp}
          animate={loading ? "visible" : "hidden"}
          initial="hidden"
        >
          <Card className="w-80 border-2 border-orange-500 hover:shadow-xl transition-all duration-300 ease-in-out">
            <CardContent>
              <div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-[15px] object-cover h-40"
                />
                <div className="flex flex-col items-start justify-start gap-2">
                  {/* Menambahkan flex-wrap agar tag bisa turun ke baris baru jika tidak muat */}
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    {project.tags?.map((tag) => {
                      // 4. Membersihkan string tag dari karakter `[` `]` dan `"`
                      const cleanedTag = tag.replace(/[\[\]"]/g, "").trim();
                      return (
                        <span
                          key={tag} // Key bisa tetap menggunakan tag asli untuk keunikan
                          className="px-3 py-1 bg-orange-500 text-white rounded-full"
                        >
                          {cleanedTag}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-2xl font-bold mt-2">
                    {project.title}
                  </span>
                  <span className="text-sm text-gray-400 ">
                    {project.category?.title}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  {/* Tombol Github hanya akan ditampilkan jika project.github memiliki nilai */}
                  {project.github && (
                    <Link href={project.github} target="_blank">
                      <Button className="px-5 py-5 rounded-full bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-black transition-all duration-300 ease-in-out hover:shadow-2xl">
                        <Github size={24} className="text-current" />
                      </Button>
                    </Link>
                  )}
                  {/* Tombol Demo hanya akan ditampilkan jika project.demo memiliki nilai */}
                  {project.demo && (
                    <Link href={project.demo} target="_blank">
                      <Button className="px-5 py-5 rounded-full bg-white border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-black transition-all duration-300 ease-in-out hover:shadow-2xl">
                        <EyeIcon size={24} className="text-current" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  );
};

export default CardComponent;
