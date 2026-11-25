# 03: Bersihkan data draft lama & verifikasi end-to-end

**What to build:** Project "Kasir POS — Point of Sale Management System" bisa di-update dengan gambar dokumentasi baru yang benar-benar ter-upload dan tampil di halaman publik; dua node draft mati lama dibersihkan manual lewat UI. Ticket ini adalah verifikasi menyeluruh paket fix (tracer bullet akhir).

**Blocked by:** 01-fix-collect-pending-ids, 02-block-level-media-nodes.

**Status:** ready-for-agent

- [ ] Manual di UI (`/dashboard/projects/0316d47f-c512-4ea4-9103-d52551791e64/update`):
  - [ ] Klik tombol hapus (🗑) pada dua figure "Draft" lama, simpan → content DB tidak lagi mengandung `pendingId`.
  - [ ] Tambah 2 gambar (JPEG/PNG/WebP ≤ 5MB) + 1 PDF (≤ 10MB) di konten, isi alt (wajib) & caption (opsional), simpan.
- [ ] Setelah simpan (query read-only ke DB atau cek lewat editor):
  - [ ] `projects.content` tidak mengandung `pendingId`/`previewUrl`/`src: blob:`.
  - [ ] Node gambar punya `src: https://res.cloudinary.com/…`, `publicId: project-content/images/…`, `width`/`height` > 0; node PDF punya `url` Cloudinary + `publicId: project-content/documents/…`.
  - [ ] Cloudinary berisi asset baru di folder tersebut.
- [ ] Buka ulang editor: tidak ada badge "Draft", tidak ada preview rusak; halaman publik `/projects/kasir-pos-point-of-sale-management-system` menampilkan gambar sebagai `<figure>` (bukan hilang).
- [ ] Path gagal tetap benar:
  - [ ] File >5MB / tipe salah → toast error, tidak ada save.
  - [ ] Simpan gagal setelah upload berhasil → asset yang terlanjur naik di-rollback (tidak ada asset yatim di Cloudinary).
  - [ ] Hapus gambar dari konten lalu simpan → asset Cloudinary lama ikut terhapus (`removedMedia`).
- [ ] `npm test`, `npm run lint`, `npm run build` semua bersih.
