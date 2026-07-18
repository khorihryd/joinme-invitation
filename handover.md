# 📘 Handover Document: JoinMe Platform

> **Dokumen ini adalah "Pintu Gerbang" untuk memahami seluruh proyek JoinMe.**  
> Bacaan 10 menit untuk semua pihak: Owner, Chief Architect baru, dan AI Engineer baru.

---

## 1. Apa Itu JoinMe? (Visi & Misi)

**JoinMe** adalah platform SaaS undangan digital berbasis **Theme Engine**, bukan editor drag-and-drop.

**Filosofi:**
- **Template adalah produk** (bukan sekadar layout).
- **Studio hanya untuk mengisi data** (bukan mendesain).
- **Fokus pada kecepatan publish**, bukan kompleksitas editor.

**Target Alur Pengguna:**
Daftar → Pilih Template → Isi Data → Preview → Publish → Share

> **Motto:** *"Architecture before implementation. Consistency before speed. Themes are products, Studio is only the tool."*

---

## 2. Tim dan Peran

| Peran | Bertanggung Jawab |
| :--- | :--- |
| **Product Owner** | Menentukan visi, roadmap, menjalankan AI, testing, deployment. |
| **Chief Software Architect** | Menjaga arsitektur, mendesain SDK & Runtime, review milestone. |
| **AI Software Engineer** | Implementasi kode, refactor, testing, dokumentasi. |

---

## 3. Ringkasan Teknis (Stack & Struktur)

### Tech Stack
- **Package Manager:** `pnpm` (workspace monorepo)
- **Framework:** React 18 + TypeScript (strict mode)
- **Bundler:** Vite (Library Mode untuk SDK, SPA untuk apps)
- **Styling:** Tailwind CSS
- **Database:** Supabase (blueprint siap, belum terintegrasi)

### Struktur Monorepo
```text
joinme/
├── apps/
│   ├── landing/         # Halaman publik (Port 3000)
│   ├── auth/            # Login & Register (Port 3001)
│   ├── dashboard/       # Admin user (Port 3002) - Marketplace & Create Form
│   └── runtime/         # Mesin pemutar tema (Port 5173)
├── packages/
│   └── theme-sdk/       # Jantung arsitektur (8 Components, 6 Hooks)
├── themes/              # Koleksi tema (sample, premium, royal-gold, dll)
├── scripts/
│   └── upload-theme.ts  # CLI untuk build + zip tema
└── docs/
    └── SUPABASE_SCHEMA.sql
```

---

## 4. Arsitektur Inti (Yang Harus Diingat Semua Orang)

| Prinsip | Penjelasan |
| :--- | :--- |
| **Runtime owns business logic** | Runtime mengelola data, autentikasi, dan permission. |
| **Theme owns presentation** | Theme hanya menampilkan UI, tidak boleh mengakses data langsung. |
| **SDK sebagai kontrak** | Theme wajib menggunakan `@joinme/theme-sdk` untuk semua interaksi data. |
| **Manifest sebagai kontrak** | Setiap theme wajib memiliki `manifest.json` yang dibaca Runtime. |

**Larangan untuk Theme:**
- ❌ Fetch data langsung atau mengakses database.
- ❌ Membuat RSVP atau Countdown sendiri (harus pakai SDK).
- ❌ Menyimpan state global (selain UI state lokal seperti tab aktif).

---

## 5. Histori Pekerjaan (Blok 1 s/d 13)

| Blok | Nama | Deskripsi Singkat | Status | Tantangan & Solusi |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Foundation & SDK Awal | Inisialisasi monorepo, ThemeContext, useInvitation, types. | ✅ | - |
| 2 | Runtime Engine | Runtime load theme, ThemeProvider dengan loading & error state. | ✅ | - |
| 3 | Theme Starter & Dynamic Loader | Sample theme, React.lazy dynamic import, Error Boundary. | ✅ | Fallback source di DEV, throw error di PROD. |
| 4 | Production Loader & Manifest | Runtime baca manifest.json, conditional DEV/PROD fallback. | ✅ | - |
| 5 | Invitation Engine & Upload | Dynamic data based on inviteId, upload-theme CLI (adm-zip). | ✅ | Upload menggunakan adm-zip agar platform-agnostic. |
| 6 | Landing Page & Authentication | Landing, Auth (localStorage), Dashboard (Protected Route). | ✅ | - |
| 7 | Billing & Premium Theme | Subscription simulation, Premium theme, permissionService. | ✅ | - |
| 8 | Marketplace & Theme Discovery | Theme catalog, grid cards, preview mockup, responsive viewport frame. | ✅ | Device selector untuk preview. |
| 9 | Production Hardening | Env variables, code splitting, console drop, Dockerization, Supabase blueprint. | ✅ | Docker multi-stage + Nginx SPA routing. |
| 10 | UI Components (Countdown & RSVP) | useCountdown, useRSVP, Countdown, RSVP komponen SDK. | ✅ | Memisahkan logika dari presentasi. |
| 11 | UI Components (Gallery & MusicPlayer) | useGallery, useMusic, Gallery (lightbox), MusicPlayer (floating). | ✅ | Custom lightbox tanpa library eksternal, autoplay mitigation. |
| 12 | UI Components (Cover, Story, Timeline, Gift) | useStory, Cover, Story, Timeline, Gift. | ✅ | - |
| 13 | Create Form Multi-Step & Split Preview | 5-tab form, live preview via postMessage, mobile toggle overlay. | ✅ | Komunikasi real-time antar apps tanpa melanggar arsitektur. |

---

## 6. Status Terkini (Kondisi Sekarang)

| Modul | Status | Catatan |
| :--- | :--- | :--- |
| **Theme SDK (8 Components + 6 Hooks)** | ✅ 100% | Lengkap dan siap pakai. |
| **Runtime Engine** | ✅ 100% | Support dynamic loading & postMessage preview. |
| **Marketplace (5 Tema)** | ✅ 100% | 1 Free (Sample), 4 Premium (Premium, Royal Gold, Botanical Garden, Modern Minimalist). |
| **Landing Page** | ✅ 100% | Copywriting sudah diubah ke bahasa Indonesia emosional. |
| **Auth & Dashboard** | ✅ 100% | Login/Register (localStorage). |
| **Create Form (Blok 13)** | ✅ 100% | 5 Tabs, Split-screen Preview (Desktop), Toggle Mobile Overlay. |
| **Docker / Deployment** | ✅ 100% | Siap deploy ke server. |
| **Supabase Integration** | ⏳ Belum | Blueprint SQL siap, tapi belum terhubung ke kode. |
| **Payment Gateway** | ⏳ Belum | Tombol "Upgrade" masih simulasi. |

---

## 7. Pekerjaan yang Belum Selesai (Prioritas)

| Prioritas | Tugas | Dampak jika Tidak Dilakukan |
| :--- | :--- | :--- |
| 🔴 **1** | Integrasi Supabase (ganti localStorage dengan API nyata) | Fatal. Data akan hilang jika user refresh browser. |
| 🔴 **2** | Integrasi Payment Gateway (Midtrans/Xendit) | Fatal. Tidak ada pemasukan. |
| 🟡 **3** | Deployment ke Server Publik (Docker + aaPanel) | Penting. Agar pengguna nyata bisa akses. |
| 🟢 **4** | Tambah Tema Premium | Opsional. SDK sudah siap, tinggal minta AI/desainer buat tema baru. |

---

## 8. Perintah Penting (Cheat Sheet)

| Perintah | Fungsi |
| :--- | :--- |
| `pnpm install` | Install semua dependencies. |
| `pnpm dev:all` | Jalankan semua apps sekaligus (Landing, Auth, Dashboard, Runtime). |
| `pnpm build` | Build semua apps untuk production. |
| `cd themes/[nama-tema] && pnpm build` | Build satu tema (menghasilkan dist/). |
| `npx tsx scripts/upload-theme.ts --path themes/[nama-tema]` | Upload tema ke apps/runtime/public/themes/. |
| `pnpm run lint` | Jalankan TypeScript compiler check. |
| `docker build -t joinme-app .` | Build Docker image. |
| `docker run -d -p 3000:3000 --name joinme joinme-app` | Jalankan container. |

---

## 9. Tips untuk Tim Baru

### Untuk Chief Architect Baru
- **Pegang Erat Konstitusi:** Jika ada yang meminta fitur "drag-drop editor", tolak! Arahkan ke pembuatan tema baru via SDK.
- **Jaga Kemurnian SDK:** Jangan pernah menambahkan logika bisnis (fetch, localStorage) ke dalam `packages/theme-sdk`.
- **Fokus pada Prioritas:** Setelah membaca dokumen ini, arahan pertama ke AI Engineer adalah Integrasi Supabase.

### Untuk AI Engineer Baru
- Baca `AI_INSTRUCTIONS.md` sebelum membuat tema baru.
- Jangan menyentuh `localStorage` atau `fetch` di dalam `packages/theme-sdk`.
- Jika preview tidak berubah, cek console iframe untuk log `Received UPDATE_INVITATION_DATA`.
- Gunakan perintah `pnpm dev:all` untuk menjalankan semua aplikasi sekaligus.

---

## 10. Kontak & Penutup

Proyek ini telah melalui 13 blok pengembangan intensif. Semua keputusan teknis dibuat dengan mempertimbangkan skalabilitas, kemudahan pengembangan AI, dan kecepatan publish sebagai nilai utama.

**Sumber Daya Tambahan:**
- **JoinMe Constitution v1.0** → Aturan arsitektur yang tidak boleh dilanggar.
- **AI_INSTRUCTIONS.md** → Panduan membuat tema untuk AI/manusia.
- **docs/SUPABASE_SCHEMA.sql** → Skema database final untuk migrasi.

Selamat bergabung dengan tim JoinMe! Bawa platform ini menjadi pemimpin pasar undangan digital di Indonesia. 🚀

---
Dokumen ini dibuat pada: July 18, 2026  
Oleh: Previous Chief Software Architect
