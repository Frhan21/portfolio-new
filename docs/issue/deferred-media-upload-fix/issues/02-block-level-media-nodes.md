# 02: Media (gambar/PDF) tersisip sebagai blok di level root

**What to build:** Menyisipkan gambar atau PDF di editor menghasilkan node dekorator yang berdiri sendiri sebagai blok (child langsung `root`), bukan tersarang di dalam paragraf. Hari ini Lexical 0.50 menganggap `DecoratorNode` inline (`isInline()` default `true`), sehingga node di-_splice_ ke dalam paragraf aktif dan paragraf baru jadi tersarang (`paragraph → [documentation-image, paragraph]`) — struktur invalid yang terverifikasi tersimpan di DB.

**Blocked by:** None (can start immediately); verifikasi menyeluruh menunggu 01.

**Status:** resolved

- [ ] `components/lexical/media-nodes.tsx`: `DocumentationImageNode` dan `PdfAttachmentNode` override `isInline()` mengembalikan `false`.
- [ ] `components/lexical/rich-text-editor.tsx` (`insertMedia`): sisipkan `[node, paragraph]` di level root — `$insertNodes([node, paragraph])` saat ada `RangeSelection`, `$getRoot().append(node, paragraph)` sebagai fallback; caret di paragraf baru setelah node; hapus pola `node.insertAfter(paragraph)`.
- [ ] Konten baru tersimpan dengan `documentation-image`/`pdf-attachment` sebagai child langsung `root` (bukan di dalam `paragraph`).
- [ ] Editor masih benar saat toolbar dipakai tanpa seleksi (fallback root), dan setelah menyisipkan media caret pindah ke paragraf berikutnya.
- [ ] Konten legacy yang masih bersarang (project "Cinema Ticketing API") tidak menyebabkan error saat dibuka di editor (`$parseSerializedNodeImpl` tidak memvalidasi inline/block — perilaku hanya beda visual; kalau aneh, hapus + tambah ulang gambarnya).
- [ ] `npm run lint` dan `npm run build` bersih.

## Comments

- Terimplementasi: `isInline() { return false }` di `DocumentationImageNode` & `PdfAttachmentNode`; `insertMedia` kini `$insertNodes([node, paragraph])` / `$getRoot().append(node, paragraph)` + `paragraph.select()`. Verifikasi struktur node root-level: lewat smoke test ticket 03 (insert media, simpan, cek `projects.content`). Build + lint bersih.
