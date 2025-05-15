"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Computer, Figma } from "lucide-react";
import { SiAdobephotoshop } from "react-icons/si";

// ServiceCard Component
const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="w-full max-w-sm">
    <div className="bg-white rounded-[32px] border-2 border-orange-500 shadow-lg px-6 py-10 flex flex-col items-start gap-4">
      <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* === About Section === */}
      <section
        id="about"
        className="bg-black w-full min-h-screen flex items-center px-4 sm:px-6"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full py-12">
          {/* Text Content */}
          <div className="flex flex-col items-start text-left gap-4 max-w-xl w-full md:ml-12 ml-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-orange-500" />
              <span className="text-white text-xl">About</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              Who is <span className="text-orange-500">Farhan</span>?
            </h2>
            <p className="text-white text-base md:text-lg tracking-wide">
              Seorang pengembang web dan desainer antarmuka dengan minat pada
              pengalaman pengguna dan efisiensi sistem. Saya menggabungkan
              logika dan kreativitas untuk menciptakan produk digital yang
              bermakna.
            </p>
            <Link
              href="/"
              className="mt-4 px-6 py-3 bg-slate-700 hover:bg-orange-500 text-white rounded-full flex items-center justify-center gap-2 transition-colors duration-300 text-sm md:text-base"
            >
              Download my CV
            </Link>
          </div>

          {/* SVG Image */}
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg flex justify-center z-0">
            <div className="w-full aspect-square bg-orange-500 rounded-full relative z-0" />
            <Image
              src="/WhatsApp Image 2025-05-13 at 00.56.38_f30390e6 1.svg"
              alt="About Image"
              width={320}
              height={320}
              className="absolute top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2  w-full h-full object-contain z-10"
              priority
            />
          </div>
        </div>
      </section>

      {/* === Service Section === */}
      <section id="service" className="w-full px-6 py-20">
        <div className="max-w-7xl mx-auto flex flex-col items-start gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-orange-500" />
            <h3 className="text-black text-2xl md:text-[32px] font-bold">
              Services
            </h3>
          </div>
          <h2 className="text-black text-3xl md:text-[48px] font-bold">
            Service that I <span className="text-orange-500">Provide</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 w-full justify-items-center">
            <ServiceCard
              icon={<Computer size={40} color="white" />}
              title="Web Developer"
              description="Membangun dan mengelola aplikasi web yang responsif dan interaktif."
            />
            <ServiceCard
              icon={<Figma size={40} color="white" />}
              title="UI/UX Designer"
              description="Mendesain pengalaman pengguna dan tampilan antarmuka yang menarik."
            />
            <ServiceCard
              icon={<SiAdobephotoshop size={40} color="white" />}
              title="Graphic Designer"
              description="Menciptakan visual branding dan desain kreatif yang komunikatif."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
