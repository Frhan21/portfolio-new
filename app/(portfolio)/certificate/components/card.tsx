"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Certificate } from "@/model/Certificate";
import { Calendar, LinkIcon } from "lucide-react";
import { useState } from "react";
import { certificates as dummyCertificates } from "../../dummy";
import { paginate } from "../../utils/paginate";

interface CertificateProps {
  certificates: Certificate[];
}

const PAGE_SIZE = 5;

const CertificateCard = ({ certificates }: CertificateProps) => {

  
  if (!certificates.length) {
    return (
      <section className="flex flex-col items-center justify-center text-center w-full py-16">
        <p className="text-gray-600">
          Belum ada sertifikat yang bisa ditampilkan.
        </p>
      </section>
    );
  }

  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {certificates.map((cat, i) => (
        <Card className="rounded-[28px] border border-orange-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg max-w-lg">
          <div className="px-3">
            <img
              src={cat.image}
              alt={cat.title}
              className="h-64 w-full rounded-[20px] object-cover"
            />
          </div>
          <CardContent className="mt-2 px-6">
            <h1 className="text-lg font-bold text-orange-500">{cat.title}</h1>
            <p className="text-sm text-accent-foreground/40 mt-2">
              {cat.issuer}
            </p>
            <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{cat.issuer_date}</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 transition hover:text-orange-600"
                >
                  View Credential
                  <LinkIcon size={14} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CertificateCard;
