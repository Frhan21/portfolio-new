# 01: Finalisasi media draft saat save (perbaiki traversal `collectPendingIds`)

**What to build:** Saat project di-save dari `ProjectForm`, semua media draft di konten (gambar/PDF dengan `pendingId`) harus terdeteksi, ter-upload ke `project-content/images|documents` via `POST /api/v1/project-media`, dan JSON konten yang tersimpan sudah final (tanpa `pendingId`/`previewUrl`, dengan `src`/`publicId`/`width`/`height` Cloudinary). Hari ini traversal `collectPendingIds()` berhenti di wrapper `{root}` sehingga seluruh blok upload + finalize di `ProjectForm.onSubmit` selalu dilewati dan JSON draft mentah tersimpan ke DB.

**Blocked by:** None (can start immediately).

**Status:** resolved

- [ ] `lib/pending-media.ts`: traversal sadar-wrapper — `collectPendingIds` mulai dari `content.root` (toleran terhadap node tunggal), descend rekursif lewat `children` termasuk array.
- [ ] Helper traversal dipakai ulang untuk root-lookup di `replacePendingMedia` tanpa mengubah perilakunya (output identik untuk input sama).
- [ ] Test baru `lib/pending-media.test.ts` (Vitest) dengan fixture JSON Lexical asli (wrapper `{root}` berisi `paragraph` → `documentation-image` dengan `pendingId`/`previewUrl` blob/`publicId: ""`/`width:0/height:0`):
  - [ ] `collectPendingIds` menemukan semua id (test ini wajib merah di HEAD sebelum fix).
  - [ ] Node bersarang di nested paragraph tetap terdeteksi.
  - [ ] Input `null`/string/array → set kosong, tidak throw.
  - [ ] `replacePendingMedia` menghapus `pendingId`+`previewUrl` dan mengisi `src`/`publicId`/`width`/`height` (root-level maupun bersarang).
  - [ ] `replacePendingMedia` tanpa upload untuk id tersebut men-drop node (`null`) — dikontrakkan di test.
- [ ] `npm test` hijau (5 file test lama tetap hijau), `npm run lint` bersih.

## Comments

- Bukti merah (di HEAD): `collectPendingIds(content` DB Kasir POS`) -> []` padahal ada 2 `pendingId`; `replacePendingMedia` pada content sama sudah menghasilkan output tanpa `pendingId`.
- Hasil: helper `lexicalRoot` + `walkLexicalTree` di `lib/pending-media.ts`; `replacePendingMedia` memakai `lexicalRoot` (perilaku identik, guard `root === content` untuk input tanpa `root`). Test `lib/pending-media.test.ts`: merah dulu (`expected Set{} to deeply equal Set{ 'id-a', 'id-b' }`), hijau setelah fix — `npm test` 24/24 pass.
