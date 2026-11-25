# 03: Bersihkan data draft lama & verifikasi end-to-end

**What to build:** Project "Kasir POS — Point of Sale Management System" bisa di-update dengan gambar dokumentasi baru yang benar-benar ter-upload dan tampil di halaman publik; dua node draft mati lama dibersihkan manual lewat UI. Ticket ini adalah verifikasi menyeluruh paket fix (tracer bullet akhir).

**Blocked by:** 01-fix-collect-pending-ids, 02-block-level-media-nodes.

**Status:** resolved

- [x] Manual di UI (`/dashboard/projects/0316d47f-c512-4ea4-9103-d52551791e64/update`):
  - [x] Klik tombol hapus (🗑) pada dua figure "Draft" lama, simpan → content DB tidak lagi mengandung `pendingId`.
  - [x] Tambah 1 gambar (JPEG/PNG/WebP ≤ 5MB) di konten, isi alt (wajib) & caption (opsional), simpan. _(2 gambar + 1 PDF dilewati — owner memutuskan dokumentasi rata-rata gambar; jalur PDF dianggap oke)_
- [x] Setelah simpan (query read-only ke DB atau cek lewat editor):
  - [x] `projects.content` tidak mengandung `pendingId`/`previewUrl`/`src: blob:`.
  - [x] Node gambar punya `src: https://res.cloudinary.com/…`, `publicId: project-content/images/…`, `width`/`height` > 0. _(node PDF tidak diuji)_
  - [x] Cloudinary berisi asset baru di folder tersebut.
- [x] Buka ulang editor: tidak ada badge "Draft", tidak ada preview rusak; halaman publik `/projects/kasir-pos-point-of-sale-management-system` menampilkan gambar sebagai `<figure>` (bukan hilang).
- [x] Path gagal tetap benar: _(diverifikasi dari kode, bukan uji manual — owner memutuskan cukup)_
  - [x] File >5MB / tipe salah → validasi type/size/signature di `app/api/v1/project-media/route.ts` mengembalikan 400 sebelum upload.
  - [x] Simpan gagal setelah upload berhasil → asset di-rollback via `rollbackUploadedMedia` di kedua jalur catch `form.tsx`.
  - [x] Hapus gambar dari konten lalu simpan → asset Cloudinary lama ikut terhapus via `removedMedia` di `server/actions/project.actions.ts`.
- [x] `npm test`, `npm run lint`, `npm run build` semua bersih.

## Comments

- Hasil verifikasi (bukti query read-only ke DB + Cloudinary API):
  - Semua 8 project: `pendingId`/`blob:` = 0 — dua figure "Draft" lama Kasir POS sudah bersih.
  - Kasir POS: node `documentation-image` root-level, `src: https://res.cloudinary.com/.../project-content/images/rbl0yz7kt2bmirrfpufe.webp`, `publicId: project-content/images/rbl0yz7kt2bmirrfpufe`, tanpa `pendingId`/`previewUrl`.
  - Cloudinary: asset baru muncul di `project-content/images`; sebelum verifikasi hanya ada 1 asset (Cinema).
  - Halaman publik: gambar dirender sebagai `<figure><img></img><figcaption>Contoh upload</figcaption></figure>`, alt terisi.
- Baseline: `npm test` 24/24 pass, `npm run lint` 0 error (5 warning eksisting), `npm run build` sukses.
- Scope dipangkas atas keputusan owner (2026-11-25): upload PDF (`resource_type: raw`) dan uji manual jalur gagal tidak dijalankan — dokumentasi proyek dirata-rata berupa gambar. Jalur PDF masih belum pernah teruji E2E; upgrade nanti kalau dibutuhkan.
