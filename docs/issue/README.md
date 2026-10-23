# Issue Tracker (Local Markdown)

Semua issue & spec untuk repo ini hidup sebagai file markdown di folder ini. **Bukan** GitHub Issues.

## Struktur

```
docs/issue/
└── <feature-slug>/          # kebab-case, satu folder per task/fitur
    ├── spec.md              # output /to-spec
    ├── map.md               # output /wayfinder (kalau dipakai)
    └── issues/
        ├── 01-<slug>.md     # ticket — blocker duluan, nomor urut dependency
        ├── 02-<slug>.md
        └── 03-<slug>.md
```

## Aturan

- Nama file ticket: `<NN>-<nama-file>.md` — dua digit nomor, lalu slug kebab-case dari judul ticket
- Nomor urut mengikuti urutan dependency: ticket yang diblokir orang lain dapat nomor lebih besar
- Satu file per ticket, tidak pernah satu file gabungan berisi banyak ticket
- Status ditulis sebagai baris `Status:` di dekat atas file (lihat `docs/agents/triage-labels.md`)
- Blocking ditulis sebagai baris `Blocked by:` di dekat atas file
- Spec dan ticket ikut ter-commit ke repo — ini source of truth-nya

Detail lengkap: `docs/agents/issue-tracker.md`.
