# 🔁 Handover Document: AI Software Engineer (AE)
**Project:** JoinMe - Platform Undangan Digital Premium (SaaS)
**Handover Date:** July 18, 2026
**From:** Previous AI Software Engineer
**To:** Incoming AI Software Engineer

---

## 1. Welcome Aboard! (What is JoinMe?)
JoinMe adalah platform undangan digital berbasis **Theme Engine**. Tugas kita sebagai AI Engineer adalah membangun kode yang bersih, mengikuti arsitektur, dan memastikan semua fitur berjalan mulus. 

**Kita tidak mendesain arsitektur (itu tugas CA). Kita mengimplementasikan spesifikasi yang diberikan oleh CA.**

---

## 2. Technical Stack (Wajib Hafal)
- **Package Manager:** `pnpm` (Jangan gunakan npm atau yarn, karena workspace-nya pnpm).
- **Frontend:** React 18 + TypeScript (Strict mode).
- **Bundler:** Vite (Library Mode untuk SDK, SPA untuk apps).
- **Styling:** Tailwind CSS.
- **Monorepo:** Workspace bawaan pnpm (tidak menggunakan Nx/Turborepo agar sederhana).

---

## 3. Struktur Monorepo (Dimana Letak Kode?)
```text
joinme/
├── apps/
│   ├── landing/         # Halaman Publik (Marketing). Copywriting di sini.
│   ├── auth/            # Login & Register.
│   ├── dashboard/       # TEMPAT KERJA UTAMA. Marketplace, Create Form (Multi-Step).
│   └── runtime/         # MESIN PEMUTAR TEMA. Load file JS dinamis.
├── packages/
│   └── theme-sdk/       # KITAB SUCI. JANGAN RUSAK ARSITEKTURNYA.
│       ├── src/
│       │   ├── components/ # 8 Komponen UI (Countdown, RSVP, dll)
│       │   ├── hooks/      # 6 Hooks (useInvitation, useCountdown, dll)
│       │   └── types/      # InvitationData (Jangan diubah sembarangan)
├── themes/              # Koleksi Tema (sample, premium, royal-gold, dll)
└── scripts/
    └── upload-theme.ts  # CLI untuk build + zip tema.
```

## 4. Perintah Penting (Command Cheat Sheet)
Kode ini HARUS jalan di terminal Anda tanpa error:

| Perintah | Fungsi |
| :--- | :--- |
| `pnpm install` | Install semua dependencies di semua workspace. |
| `pnpm dev:all` | Jalankan ALL apps (Landing, Auth, Dashboard, Runtime) sekaligus. |
| `pnpm build` | Build semua apps sekaligus (untuk production). |
| `cd themes/royal-gold && pnpm build` | Build spesifik satu tema (menghasilkan folder dist/). |
| `npx tsx scripts/upload-theme.ts --path themes/royal-gold` | Upload tema ke apps/runtime/public/themes/. |
| `pnpm run lint` | Jalankan TypeScript compiler check (tsc --noEmit). |

---

## 5. Aturan Emas (The "Don't Do It" List)
Ini adalah batu sandungan yang paling sering membuat PR ditolak oleh CA:

- ❌ **JANGAN** menyentuh localStorage atau fetch di dalam packages/theme-sdk. SDK harus murni presentasional.
- ❌ **JANGAN** membuat logika Countdown atau RSVP manual di dalam folder themes/. Gunakan komponen dari SDK.
- ❌ **JANGAN** mengubah struktur InvitationData tanpa persetujuan CA. (Karena ini mempengaruhi semua tema dan database).
- ❌ **JANGAN** lupa menambahkan "tier": "premium" di manifest.json jika tema tersebut berbayar.
- ❌ **JANGAN** menggunakan any di TypeScript. Selalu buat interface yang strict.

---

## 6. Arsitektur Komunikasi (Yang Paling Sering Bikin Bingung)
### Bagaimana Live Preview (Split Screen) Bekerja?
1. Dashboard (Create Form) mengirim data ke Runtime (iframe) melalui `window.postMessage`.
2. Runtime mendengarkan event message di `apps/runtime/src/App.tsx` dan memperbarui `ThemeProvider`.
3. **Debugging**: Jika preview tidak berubah, buka console di iframe dan cek apakah ada log Received UPDATE_INVITATION_DATA.

### Bagaimana Runtime Memuat Tema?
1. Runtime baca URL: `?invite=abc123&theme=royal-gold`.
2. Panggil `loadManifest("royal-gold")` untuk mengambil `manifest.json`.
3. Baca entry di manifest (contoh: `dist/index.es.js`).
4. Lakukan `React.lazy(() => import(/themes/royal-gold/dist/index.es.js))`.

---

## 7. Status Kode Terkini (Current State)
| Modul | Status | Catatan |
| :--- | :--- | :--- |
| **SDK** | ✅ Complete | 8 Components, 6 Hooks. |
| **Runtime** | ✅ Complete | Support postMessage untuk preview. |
| **Create Form** | ✅ Complete | 5 Tabs, Split-screen, Dynamic Gift/Gallery. |
| **Marketplace** | ✅ Complete | 5 Themes (1 Free, 4 Premium). |
| **Landing Page** | ✅ Complete | Copywriting sudah di-deploy. |
| **Supabase** | ⏳ TODO! | Hanya blueprint SQL. Belum terintegrasi. |

---

## 8. Daftar Tugas yang Harus Dikerjakan (To-Do Priority)
Ini adalah PR List untuk Anda, AI Engineer baru:

1. 🚀 **[KRITIS] Integrasi Supabase**:
   - Ganti semua fungsi `safeGetItem` / `safeSetItem` di `apps/dashboard/src/services/` dan `apps/runtime/src/services/` dengan pemanggilan `supabase.from(...)`.
   - Gunakan trigger `on_auth_user_created` yang sudah dibuat di `docs/SUPABASE_SCHEMA.sql`.
2. 💳 **[KRITIS] Payment Gateway**:
   - Integrasikan Midtrans/Xendit di tombol "Upgrade".
   - Setelah sukses, update status `subscription_tier` di Supabase menjadi `premium`.
3. 🎨 **[Opsional] Tambah Tema**:
   - Jika diminta Owner, buat tema baru di `themes/`. Jangan lupa build dan upload.

---

## 9. Tips Debugging untuk AI Engineer
### Preview Tema Tidak Muncul?
- Cek Network tab di browser. Apakah ada request 404 ke `/themes/.../manifest.json`? Pastikan folder tema sudah di-upload.
- Cek URL: pastikan ada `?theme=...` dan `&invite=...`.

### Build Gagal?
- Pastikan `tsconfig.json` di tema memiliki `"moduleResolution": "bundler"`.
- Jalankan `pnpm install` dulu jika ada dependency baru.

### Format Tanggal Error?
- Data date harus dalam format ISO String (`new Date().toISOString()`). Jangan kirim string lokal.

---

## 10. Penutup
Kode ini sudah di-review oleh CA dan siap untuk production secara teknis. Tugas utama Anda saat ini adalah mengganti localStorage dengan Supabase agar data tidak hilang.

Jika CA memberikan perintah dalam format "Blok" (misal: Blok 14, Blok 15), ikuti instruksi tersebut dengan disiplin. Jangan berinovasi di luar spesifikasi yang diberikan oleh CA.

Selamat bekerja! Jaga kebersihan kode dan patuhi aturan SDK. 🚀
