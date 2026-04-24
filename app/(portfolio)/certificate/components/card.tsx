'use client';

import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/date';
import { Certificate } from '@/model/certificate';
import { Calendar, LinkIcon } from 'lucide-react';
import Image from 'next/image';

interface CertificateProps {
  certificates: Certificate[];
}

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
      {certificates.map((certificate) => (
        <Card
          key={certificate.id}
          className="group relative overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="relative flex items-center justify-center bg-slate-50 h-60 w-full overflow-hidden">
            <Image
              src={certificate.image}
              alt={certificate.title}
              width={500}
              height={240}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow">
              {certificate.category?.title ?? 'Certificate'}
            </span>
          </div>
          <CardContent className="space-y-4 px-6 py-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-900">
                {certificate.title}
              </h3>
              <p className="text-sm text-slate-500">
                Issued by{' '}
                <span className="font-medium">{certificate.issuer}</span>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-orange-500" />
                <span>{formatDate(certificate.issuer_date)}</span>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              View Credential
              <LinkIcon size={16} />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CertificateCard;
