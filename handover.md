# 🤝 SERAH TERIMA PROYEK (HANDOVER) - JOINME PLATFORM V2.0

Dokumen ini ditujukan bagi AI Engineer / Developer berikutnya untuk memahami seluruh kronologi pengembangan, struktur arsitektur sistem, serta aturan teknis ketat yang telah didefinisikan oleh **Chief Architect**.

---

## 📌 1. Gambaran Umum Sistem (System Overview)
**JoinMe** adalah platform ekosistem undangan pernikahan digital premium. Aplikasi ini menggunakan arsitektur monorepo modern yang terdiri dari:
- **`packages/theme-sdk`**: SDK Inti yang digunakan oleh semua tema untuk berinteraksi dengan data undangan (Context, hooks, komponen UI siap pakai seperti Countdown, RSVP, Gallery, Gift, MusicPlayer).
- **`themes/`**: Koleksi desain tema undangan independen yang di-render secara dinamis dalam iframe (misal: `sample-theme`, `royal-gold`, `botanical-garden`, `modern-minimalist`, dan tema baru **`reels-story`**).
- **`apps/landing`**: Halaman depan (Landing Page) pemasaran yang menargetkan calon mempelai / EO dengan copywriting bernilai jual tinggi.
- **`apps/dashboard`**: Panel manajemen pengguna untuk mendesain undangan (menggunakan form berjenjang multi-step dan simulator pratinjau langsung).
- **`apps/runtime`**: Mesin rendering (Engine) untuk menampilkan undangan aktif berdasarkan ID undangan atau parameter tema.

---

## 🛠️ 2. Kronologi Pekerjaan & Riwayat Fitur (Changelog & Completed Tasks)

### 🎬 A. Pembuatan Tema Premium "Reels Story" (`/joinme/themes/reels-story`)
- **Implementasi**: Membuat tema imersif layar penuh yang mengadopsi navigasi vertikal/horizontal khas Instagram Reels & Stories.
- **Fitur Tema**:
  - Segmented progress bar penunjuk halaman di bagian atas.
  - Swipe/Touch gesture detection untuk berpindah cerita.
  - Komponen musik otomatis (`MusicPlayer`), Hitung Mundur (`Countdown`), RSVP, Galeri Foto (`Gallery`), dan Kado Digital (`Gift`).
- **Registrasi**: Dibuat di `/joinme/themes/reels-story`, dibuild menggunakan bundler Vite (Format ESM Lib), dan didaftarkan ke `/joinme/apps/dashboard/src/services/themeCatalog.ts` serta `/joinme/apps/runtime/src/loaders/ThemeLoader.tsx`.

### ✍️ B. Pembaruan Copywriting Landing Page (`/joinme/apps/landing/src/App.tsx`)
- **Implementasi**: Mengubah seluruh teks berbau teknis/developer menjadi copywriting berbahasa Indonesia yang emosional dan elegan bagi calon pengantin.
- **Slogan Baru**: *"Kirim Undangan Digital Mewah & Elegan dalam 5 Menit."*
- **Aksi CTA**: Tombol dialihkan langsung ke halaman Registrasi (`apps/auth`) untuk memaksimalkan rasio konversi.

### 🗄️ C. Desain Blueprint Supabase Database (`/joinme/docs/SUPABASE_SCHEMA.sql`)
- **Implementasi**: Menulis rancangan skema relasional lengkap untuk migrasi masa depan dari `localStorage`.
- **Tabel**: `users`, `subscriptions`, dan `invitations`.
- **Fitur Keamanan**: Row Level Security (RLS) diaktifkan, plus trigger otomatis sinkronisasi pendaftaran user baru dari Supabase Auth.
- **Panduan Kueri**: Menyediakan perbandingan per baris kode kueri dari model lama `localStorage` ke pemanggilan baru menggunakan Supabase JS SDK.

### 📋 D. Pembaruan Form Pembuatan & Live Preview (`/joinme/apps/dashboard/src/pages/CreateInvitation.tsx`)
- **Pembaruan Tipe Data**: Menambahkan field pernikahan spesifik pada `InvitationData` di `/joinme/packages/theme-sdk/src/types/index.ts` (nama mempelai, waktu mulai/selesai, tautan maps, cerita cinta, kado, dsb).
- **Form Multi-Tab**: Membagi proses pengisian data menjadi 5 tab interaktif:
  1. *Pasangan & Host*
  2. *Acara & Lokasi*
  3. *Cerita & Galeri*
  4. *Media & Hadiah*
  5. *Pengaturan & Konfirmasi*
- **Live Preview Split-Screen**:
  - **Desktop (Layar >= 1024px)**: Layout dibagi rata (50% Form input, 50% Live Preview Simulator Iframe). Setiap ketikan langsung memperbarui visual tema tanpa muat ulang halaman.
  - **Mobile (Layar < 1024px)**: Pratinjau disembunyikan agar form dapat diisi dengan nyaman. Muncul tombol melayang `"👁️ Lihat Pratinjau"` di pojok kanan bawah yang akan membuka overlay simulator layar penuh saat diketuk.
- **Komunikasi postMessage**: Menggunakan metode aman `window.postMessage` untuk mengirim payload data mentah terupdate dari form Dashboard ke Iframe Runtime secara real-time.

### ⚡ E. Sinkronisasi Data Runtime (`/joinme/apps/runtime/src/App.tsx` & `ThemeProvider.tsx`)
- **Implementasi**: Memasang pendengar event (`window.addEventListener("message", ...)`) di sisi Runtime untuk menangkap payload data yang dikirim oleh Dashboard.
- **Sifat Sinkron**: Begitu event ditangkap, state lokal `setData` diperbarui secara reaktif sehingga tema di dalam iframe langsung beradaptasi secara instan tanpa perlu reload.

---

## 🚦 3. Aturan Arsitektur & Larangan Keras (Mandatory Developer Rules)

Silakan patuhi larangan berikut demi menjaga integritas sistem:
1. **Dilarang keras mengubah mekanisme `useInvitation()` di SDK**: Data di dalam tema harus murni mengalir secara reaktif dari context/provider SDK.
2. **Dilarang keras menaruh logika bisnis ke dalam tema**: Tema hanyalah representasi visual murni (*Presentational Component*) yang menerima data apa adanya dari Context SDK.
3. **Konfigurasi Port**: Semua server pengembangan harus dikonfigurasi berjalan di **Port 3000** sesuai dengan pembatasan container proxy Cloud Run.
4. **Verifikasi Kode**: Selalu jalankan linter (`npm run lint` / `lint_applet`) dan kompilasi (`compile_applet`) secara berkala setelah membuat perubahan guna menghindari error fatal pada runtime produksi.

---

*Diserahkan dengan penuh hormat untuk inovasi tiada henti di JoinMe Platform!* 🚀
