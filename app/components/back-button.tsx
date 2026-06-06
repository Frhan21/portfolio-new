'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="inline-flex items-center justify-center bg-[#FF6E31] hover:bg-[#ff5c17] text-white font-bold rounded-xl px-16 py-6 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <ArrowLeft className="size-5 mr-3" />
      Kembali ke halaman sebelumnya
    </Button>
  );
}
