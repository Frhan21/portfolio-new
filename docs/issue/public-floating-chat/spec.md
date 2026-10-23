# Public floating chat

## Goal

Pengunjung dapat membuka chatbot dari tombol mengambang kanan bawah pada semua halaman kecuali `/dashboard`, mengirim pertanyaan, melihat status loading/error, dan membaca jawaban yang diformat aman.

## Behaviour

- Widget terpasang sekali di root layout dan tidak dirender untuk `/dashboard` maupun turunannya.
- State percakapan bertahan selama navigasi client-side, lalu reset saat browser refresh.
- Desktop memakai panel compact kanan bawah; mobile memakai panel hampir penuh dengan ruang aman keyboard.
- Panel awal menampilkan sapaan dan tiga pertanyaan contoh tentang profil, proyek, dan pengalaman.
- Pertanyaan wajib berupa teks 1–500 karakter setelah trim.
- Setiap pertanyaan tetap standalone; riwayat hanya presentasional dan tidak dikirim sebagai konteks.
- Jawaban API dinormalisasi menjadi string dan dirender sebagai Markdown tanpa raw HTML.
- Dialog mendukung Escape, focus management, label pembaca layar, dan reduced motion.

## States

Closed, open/empty, submitting, answered, validation error, dan server/network error. Input dan suggestion dinonaktifkan ketika request berjalan. Riwayat tetap terlihat setelah error agar pengguna dapat mencoba lagi.

## Visual direction

Widget mengikuti token portfolio: permukaan netral, ink kuat, dan primary orange sebagai action. Tombol launcher berbentuk lingkaran karena benar-benar floating; panel memakai bidang solid, hierarki tipografi jelas, dan shadow hanya karena panel mengambang.

## Verification seam

Vitest menguji validasi/normalisasi kontrak chat dan reducer/state transitions. Browser smoke test desktop serta mobile memeriksa open/close, suggestion, submit/loading/answer/error, Escape/focus, dan absennya widget di dashboard.

## Out of scope

Streaming, conversation-aware follow-up, persisted history setelah refresh, citations, dan rate limiting.
