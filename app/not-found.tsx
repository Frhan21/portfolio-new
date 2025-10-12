import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Karena kita tidak menggunakan Next.js <Link> atau custom Button,
// kita akan menggunakan tag <a> standar untuk tautan.
// Komponen ini mandiri dan tidak bergantung pada komponen eksternal.

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4 font-['Montserrat']font-sans">
        <div className="text-center max-w-lg w-full">
          {/* Ilustrasi SVG Under Construction */}
          <div className="mb-8">
            <svg
              className="w-64 h-64 mx-auto"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                {/* Latar Belakang & Elemen Utama */}
                <path d="M 50,150 Q 100,70 150,150 Z" fill="#FFD180" />
                <rect x="70" y="110" width="60" height="40" rx="5" fill="#FFAB40" stroke="#4F4F4F" strokeWidth="3"/>
                <text x="100" y="135" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#4F4F4F">WIP</text>
                
                {/* Crane */}
                <path d="M 140,110 L 140,40 L 160,40" stroke="#4F4F4F" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <line x1="160" y1="40" x2="100" y2="40" stroke="#4F4F4F" strokeWidth="4" strokeLinecap="round"/>
                <line x1="100" y1="40" x2="100" y2="60" stroke="#4F4F4F" strokeWidth="3" strokeLinecap="round"/>
                
                {/* "Content" Block */}
                <rect x="85" y="60" width="30" height="30" rx="5" fill="#81D4FA" stroke="#0288D1" strokeWidth="2.5"/>
                
                {/* Pekerja Kecil */}
                <g transform="translate(40, 125)">
                    <circle cx="10" cy="5" r="5" fill="#4F4F4F"/>
                    <rect x="5" y="10" width="10" height="15" fill="#4F4F4F"/>
                    {/* Hard Hat */}
                    <path d="M 5,5 Q 10,0 15,5 Z" fill="#FFC107"/>
                </g>
                
                 {/* Elemen Dekoratif */}
                <circle cx="25" cy="80" r="5" fill="#BDBDBD"/>
                <circle cx="175" cy="100" r="8" fill="#BDBDBD"/>
                <path d="M 20,150 L 180,150" stroke="#4F4F4F" strokeWidth="4" strokeDasharray="8 4" strokeLinecap="round"/>

              </g>
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 tracking-tight">
            Segera Hadir!
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-600 mb-4">
            Halaman ini sedang kami siapkan.
          </p>
          <p className="text-md text-gray-500 mb-8 max-w-md mx-auto">
            Kami sedang bekerja keras untuk menyajikan konten-konten terbaru yang menarik. Mohon bersabar dan nantikan kejutan dari kami!
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#FF6E31] hover:bg-[#ff5c17] text-white font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="size-5 mr-3" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;