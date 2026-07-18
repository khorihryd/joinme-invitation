# 🔁 Handover Document: Chief Software Architect (CA)
**Project:** JoinMe - Platform Undangan Digital Premium (SaaS)
**Handover Date:** July 18, 2026
**From:** Previous Chief Software Architect (Architect)
**To:** Incoming Chief Software Architect

---

## 1. Executive Summary (The "Elevator Pitch")
JoinMe adalah platform SaaS undangan digital berbasis **Theme Engine**, bukan editor drag-and-drop. 
Filosofi inti: **"Template adalah produk"**. 
Kita menjual template premium dan kecepatan publish. Arsitektur memisahkan secara ketat **Runtime (Logika Bisnis)** dari **Theme (Presentasi/UI)**.

> **Motto:** *"Architecture before implementation. Consistency before speed. Themes are products, Studio is only the tool."*

---

## 2. Source of Truth & Referensi Wajib
Sebelum melihat kode, bacalah 3 dokumen berikut di repositori:

1.  **`AI_INSTRUCTIONS.md`** → Panduan pembuatan tema untuk AI/manusia. Berisi aturan main SDK.
2.  **`docs/SUPABASE_SCHEMA.sql`** → Skema database final (PostgreSQL) untuk migrasi ke production.
3.  **`JoinMe Constitution v1.0`** (ada di root) → Konstitusi teknis yang tidak boleh dilanggar.

---

## 3. Status Proyek (Current State - Blok 1 s/d 13)
| Modul | Status | Keterangan |
| :--- | :--- | :--- |
| **Theme SDK (`@joinme/theme-sdk`)** | ✅ 100% | 8 Komponen UI (Cover, Countdown, RSVP, Gallery, Music, Story, Timeline, Gift) + 6 Hooks. Tipe data sudah diperkaya untuk form multi-step. |
| **Runtime Engine** | ✅ 100% | Memuat tema secara dinamis via manifest. Mendukung `postMessage` untuk Live Preview dari Dashboard. |
| **Marketplace** | ✅ 100% | Menampilkan 5 tema (1 Free: Sample, 4 Premium: Premium, Royal Gold, Botanical, Modern Minimalist). |
| **Landing Page** | ✅ 100% | Copywriting sudah diubah ke bahasa Indonesia emosional (bukan teknis). |
| **Auth & Dashboard** | ✅ 100% | Login/Register (localStorage). Dashboard dengan Create Form Multi-Step (5 Tabs). |
| **Create Form (Blok 13)** | ✅ 100% | Form 5 Tab, Split-Screen Preview (Desktop) dengan Toggle Mobile (Overlay). Sinkronisasi data real-time via `postMessage`. |
| **Docker / Deployment** | ✅ 100% | Dockerfile dan Nginx config sudah siap untuk production. |
| **Backend (Supabase Blueprint)** | ✅ Design | Skema SQL sudah siap. **NAMUN BELUM TERINTEGRASI** (masih pakai localStorage). |

---

## 4. Struktur Monorepo (Wajib Tahu)
```text
joinme/
├── apps/
│   ├── landing/         # Halaman publik (Port 3000)
│   ├── auth/            # Login/Register (Port 3001)
│   ├── dashboard/       # Admin user (Port 3002) - Tempat Create Form & Marketplace
│   └── runtime/         # Mesin pemutar tema (Port 5173)
├── packages/
│   └── theme-sdk/       # Jantung arsitektur (React + TS)
├── themes/              # Koleksi tema (sample, premium, royal-gold, dll)
├── scripts/
│   └── upload-theme.ts  # CLI untuk build + zip tema ke public runtime
└── docs/
    └── SUPABASE_SCHEMA.sql

5. Arsitektur Kritis & Trade-offs (Decision Log)
A. Komunikasi Preview (PostMessage)
Masalah: User ingin melihat perubahan form secara langsung di tema.

Solusi: Dashboard mengirim data ke iframe Runtime via window.postMessage. Runtime mendengarkan event dan memperbarui ThemeContext.

Catatan: Ini aman secara arsitektur karena theme tetap hanya membaca Context, tidak tahu dari mana data berasal.

B. Fleksibilitas Layout (Tema Reels)
Bukti: Tema "Reels" membuktikan bahwa layout TIDAK terbatas. Tema bebas berbentuk carousel, swipe, atau apapun, selama data berasal dari useInvitation().

Pesan untuk Penerus: Jangan pernah mengekang developer tema. Biarkan mereka berinovasi di UI.

C. Kondisi Iframe di AI Studio
Issue: Preview iframe tidak berjalan di lingkungan AI Studio (sandbox HTTPS vs HTTP).

Status: Telah diatasi dengan Mockup visual + tombol "Buka Tab Baru" di Marketplace. Biarkan saja, karena ini hanya masalah lingkungan development, bukan kode.

D. Satu Form Universal untuk Semua Tema
Keputusan: Semua tema menggunakan struktur InvitationData yang sama. Tidak ada form berbeda per tema.

Alasan: Menjaga kecepatan publish dan kesederhanaan. Jika tema butuh data unik, gunakan field opsional atau JSONB di database.

6. Pekerjaan yang Belum Selesai (Critical Path untuk Launch)
Prioritas	Tugas	Dampak jika Tidak Dilakukan
🔴 1	Migrasi localStorage ke Supabase (Ganti semua service di apps/dashboard dan apps/runtime dengan panggilan API Supabase).	Fatal. Semua data akan hilang jika user refresh browser. Tidak mungkin jualan.
🔴 2	Integrasi Payment Gateway (Midtrans/Xendit). Hubungkan tombol "Upgrade" dengan pembayaran nyata.	Fatal. Tidak ada pemasukan.
🟡 3	Deployment ke Server Publik (Gunakan Docker + aaPanel).	Penting. Agar pengguna nyata bisa akses.
🟢 4	Tambah Tema Premium	Opsional. SDK sudah siap, tinggal minta AI/desainer buat tema baru.
7. Perintah Penting untuk Developer / AI
Menjalankan Semua Aplikasi:

bash
pnpm dev:all
Build Tema Baru:

bash
cd themes/royal-gold && npm run build
Upload Tema ke Marketplace (ZIP):

bash
npx tsx scripts/upload-theme.ts --path themes/royal-gold
Menjalankan Lint:

bash
npx run lint
8. Tips untuk Chief Architect Baru
Pegang Erat Konstitusi: Jika ada yang meminta fitur "drag-drop editor", tolak! Itu melanggar visi produk. Arahkan ke pembuatan tema baru via SDK.

Jaga Kemurnian SDK: Jangan pernah menambahkan logika bisnis (fetch, localStorage) ke dalam packages/theme-sdk. Biarkan itu di Runtime atau Dashboard.

Komunikasi dengan Owner: Owner adalah "penerjemah". Ia akan menyampaikan arahan bisnis dan mengirimkan hasil kode AI Engineer kepada Anda. Berikan instruksi dalam bentuk "Blok" agar pengerjaan terstruktur.

Tahap Selanjutnya: Fokus pada Blok 14 (Integrasi Supabase). Gunakan file docs/SUPABASE_SCHEMA.sql yang sudah saya siapkan sebagai acuan.

9. Kontak & Penutup
Proyek ini adalah fondasi yang solid. Semua keputusan teknis dibuat dengan mempertimbangkan skalabilitas dan kemudahan pengembangan AI.

Selamat mengerjakan, Chief Architect baru! Bawa JoinMe menjadi platform undangan digital terbaik di Indonesia. 🚀

Signed: Previous Chief Software Architect
