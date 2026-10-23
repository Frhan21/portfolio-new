# Knowledge text ingestion

## Goal

Admin dapat menambah pengetahuan chatbot dari teks atau satu PDF melalui dashboard. File PDF mentah tidak disimpan.

## Behaviour

- Endpoint hanya menerima sesi admin yang valid.
- Input teks wajib memiliki judul dan isi; PDF wajib satu file valid.
- Teks dinormalisasi lalu di-hash. Hash sumber baru disimpan unik agar ingest identik berikutnya ditolak.
- Data lama tidak di-backfill; kemiripan semantik tidak dianggap duplikat.
- Alur setelah ekstraksi: dedupe → chunk 1000/200 → embedding → vector store.
- Respons baru sukses setelah seluruh proses selesai.
- Tidak ada edit, hapus, daftar sumber, atau penyimpanan PDF mentah.
- Prompt merangkum pengulangan dan menyebut konflik konteks tanpa menebak.

## Failure handling

Catatan hash berstatus `processing` selama ingest. Kegagalan menghapus catatan agar retry bisa dilakukan. Permintaan bersamaan ditahan unique constraint dan dilaporkan sebagai duplikat.

## Verification seam

Vitest menguji normalisasi/hash, ingest sukses, exact duplicate, dan cleanup saat gagal. Route/UI diverifikasi lewat lint, build, serta smoke test bila environment tersedia.
