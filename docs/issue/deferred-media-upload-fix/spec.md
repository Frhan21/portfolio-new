# Deferred media upload fix

## Goal

Gambar/PDF yang disisipkan di editor konten project (Lexical) harus benar-benar ter-upload ke Cloudinary dan tersimpan final saat project di-save. Saat ini fitur "deferred upload" (commit `70fd053`) tidak pernah berjalan: setiap media yang disisipkan selamanya tersimpan sebagai draft (`pendingId` + `previewUrl: blob:` + `publicId: ""`), sehingga di update page muncul badge "Draft — diunggah saat disimpan" dengan preview rusak, dan di halaman publik gambarnya tidak tampil.

## Diagnosis (terverifikasi, bukan dugaan)

Bukti dikumpulkan dari DB (`projects.content` project `0316d47f-…` "Kasir POS"), listing Cloudinary, dan source `lexical@0.50.0`.

1. **Bug A — traversal `collectPendingIds()` tidak pernah mencapai node.**
   `lib/pending-media.ts` memulai `visit(content)` pada wrapper `{ root: {...} }`. Wrapper tidak punya key `children`, sehingga traversal berhenti di langkah pertama dan set selalu kosong. Di `form.tsx` (`ProjectForm.onSubmit`), blok `if (pendingIds.size > 0)` akibatnya selalu dilewati: `POST /api/v1/project-media` tidak pernah dipanggil dan `replacePendingMedia` tidak pernah dijalankan. JSON draft mentah (blob URL, `publicId: ""`, `width/height: 0`, `pendingId`) tersimpan ke DB.
   - Bukti: menjalankan `collectPendingIds` asli terhadap content DB mengembalikan `[]` meski ada 2 `pendingId`.
   - Bukti: folder Cloudinary `project-content/images` hanya berisi 1 asset (dibuat saat pengembangan fitur); kedua foto "Documentation" project Kasir tidak pernah terunggah.
2. **Bug B — node media dianggap inline oleh Lexical 0.50.**
   `DocumentationImageNode`/`PdfAttachmentNode` adalah `DecoratorNode`, dan di Lexical 0.50 default `DecoratorNode.isInline()` mengembalikan `true`. Akibatnya `insertMedia()` di `rich-text-editor.tsx`:
   - `$insertNodes([node])` masuk jalur "semua inline" sehingga decorator di-_splice_ ke dalam paragraf aktif,
   - `node.insertAfter($createParagraphNode())` menaruh paragraf di dalam paragraf.
     Struktur ini terverifikasi di DB: `root.children[12] = paragraph → [documentation-image, paragraph → [documentation-image]]`. Project "Cinema Ticketing API" (satu-satunya yang berhasil upload) juga menyimpan `<figure>` di dalam `<p>` — HTML invalid.
3. **Dampak tampilan.**
   - Editor: badge "Draft" permanen + preview `<img src={blob}>` mati setelah reload.
   - Halaman publik: `components/lexical/renderer.tsx` mensyaratkan `src` Cloudinary **dan** `width/height` > 0, jadi gambar draft di-drop (tidak tampil sama sekali).

## Keputusan (settled dengan user)

- Lingkup perbaikan: **Bug A + Bug B**. Hardening lanjutan (sanitasi draft saat load, perbaikan route API `/api/v1/project` yang membuang `content`/`summary`, revoke blob URL) **tidak** dikerjakan di paket ini — dicatat sebagai follow-up.
- Data lama yang rusak (2 node draft project Kasir) dibersihkan **manual lewat UI** (tombol hapus di tiap figure), tanpa script tulis ke DB.
- Seam verifikasi: **unit test Vitest** di seam murni `lib/pending-media.ts` (`lib/pending-media.test.ts`, fixture JSON Lexical asli berbentuk wrapper `{root}`), dipadukan lint + build + smoke test manual. Repo sudah punya Vitest (`npm test`).

## Behaviour setelah fix

- Menyisipkan gambar/PDF di editor tetap membuat node draft (preview lokal + badge), tidak ada upload per sisipan.
- Saat "Update/Simpan Project": semua media draft ter-upload ke `project-content/images|documents`, lalu JSON konten di-finalize (`pendingId` & `previewUrl` dihapus; `src`/`publicId`/`width`/`height` atau `url`/`fileName` terisi) sebelum dikirim ke server action.
- Struktur konten: `documentation-image`/`pdf-attachment` selalu child langsung `root` (block-level), bukan di dalam `paragraph`.
- Kegagalan upload → error toast, save dibatalkan, asset yang terlanjur naik di-rollback (`rollbackUploadedMedia`).
- Media dihapus dari konten → asset Cloudinary lama ikut terhapus (`removedMedia` di `server/actions/project.actions.ts`).
- Guard yang dipertahankan: jika ada `pendingId` tanpa `File` di memori (mis. setelah reload), save ditolak dengan toast "Ada media draft yang sudah tidak valid…".

## Database

Tidak ada perubahan skema. Kolom `projects.content` tetap Json.

## Verification seam

1. `npm test` — `lib/pending-media.test.ts` baru; test fixture bentuk asli wajib **merah** di HEAD sebelum fix, hijau setelahnya.
2. `npm run lint` + `npm run build`.
3. Smoke test manual (lihat ticket 03).

## Follow-up (di luar lingkup, dicatat)

- `lib/lexical-content.ts` + test: helper murni `hoistNestedMediaNodes(content)` saat form load untuk menormalkan konten legacy yang masih bersarang.
- `app/api/v1/project/[id]/route.ts` (PUT) & `app/api/v1/project/route.ts` (POST): baca/simpan `content` + `summary` agar API eksternal tidak membuang data diam-diam.
- Revoke `previewUrl` blob setelah simpan; cegah double-upload bila user menyimpan dua kali tanpa navigasi.
