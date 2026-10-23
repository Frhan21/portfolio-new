# Chat rate limiting

## Goal

Batasi biaya chatbot publik pada deployment Vercel tanpa layanan baru.

## Behaviour

- Hanya `POST /api/v1/chat` yang dibatasi.
- Maksimal 10 request per identitas klien dalam rolling window 10 menit.
- Maksimal 200 request global per hari, reset pukul 00.00 Asia/Jakarta.
- Counter dibagikan lintas instance melalui PostgreSQL.
- Pemeriksaan dan pencatatan counter atomik; request yang lolos tetap dihitung jika proses AI kemudian gagal.
- Limit tercapai mengembalikan HTTP 429 dengan `Retry-After` dan pesan ramah.
- Kegagalan counter mengembalikan HTTP 503; embedding/LLM tidak dipanggil.
- Identitas klien diambil dari header proxy Vercel, tanpa menyimpan IP mentah.

## Database

Gunakan tabel counter kecil melalui SQL terarah. Jangan memakai `prisma db push` karena tabel pgvector berada di luar schema Prisma.

## Verification seam

Vitest menguji fungsi rate limit melalui adapter mock dan respons route 429/503. SQL nyata diverifikasi dengan query terarah pada database saat ini.
