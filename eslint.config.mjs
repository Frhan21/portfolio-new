import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  // 1. Bagian Ignores (WAJIB diletakkan di paling atas)
  // Ini akan mencegah ESLint memeriksa folder-folder berat/otomatis ini.
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "build/**",
      "dist/**",
      "app/generated/**", // Penting: Abaikan file Prisma yang bikin error tadi
      "**/generated/**"
    ],
  },

  // 2. Gabungkan konfigurasi TypeScript dan Core Web Vitals
  ...nextTypescript,
  ...nextCoreWebVitals,
];