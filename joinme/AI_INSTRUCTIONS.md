# 🤖 AI Instructions: Building a JoinMe Theme

> **Purpose:** Panduan resmi untuk AI (Artificial Intelligence) dalam membangun tema undangan digital untuk platform JoinMe. 
> **Version:** 1.0
> **Architecture Reference:** JoinMe Constitution v1.0

---

## 1. ⚠️ THE GOLDEN RULES (NON-NEGOTIABLE)

Sebagai AI yang membangun tema, Anda **WAJIB** mematuhi aturan arsitektur berikut. Pelanggaran akan menyebabkan tema ditolak oleh Runtime.

| Aturan | Keterangan |
| :--- | :--- |
| ✅ **WAJIB** menggunakan `@joinme/theme-sdk` | Semua interaksi data harus melalui SDK. |
| ✅ **FOKUS** pada UI/UX | Tema adalah produk visual. Jaga estetika dan animasi. |
| ❌ **DILARANG** fetch data langsung | Jangan panggil `fetch()`, `axios`, atau `localStorage`. |
| ❌ **DILARANG** mengakses database | Tidak boleh ada koneksi ke API eksternal. |
| ❌ **DILARANG** membuat RSVP sendiri | Gunakan komponen `<RSVP />` dari SDK. |
| ❌ **DILARANG** membuat Countdown sendiri | Gunakan komponen `<Countdown />` dari SDK. |
| ❌ **DILARANG** memiliki business logic | Theme hanya menampilkan data, tidak boleh menyimpan state global (selain UI state seperti tab aktif). |

---

## 2. 🛠️ TECH STACK (Wajib)

- **Framework:** React (Functional Components)
- **Language:** TypeScript
- **Bundler:** Vite (Library Mode)
- **Styling:** Tailwind CSS (dengan konfigurasi kustom jika perlu)
- **Package Manager:** pnpm (atau npm)

---

## 3. 📦 SDK API REFERENCE

Paket `@joinme/theme-sdk` menyediakan tools berikut. **Import hanya dari package ini.**

### Hooks (Pengambilan Data)
- **`useInvitation()`** → Mengembalikan data undangan utama.
  ```typescript
  const { data, loading, error } = useInvitation();
  // data: InvitationData | null
  // loading: boolean
  // error: Error | null
  ```
- **`useRSVP()`** → Mengembalikan fungsi `submitRSVP(payload)` dan status pengiriman.
- **`useMusic()`** → Untuk kontrol pemutar musik (play/pause/volume).
- **`useGallery()`** → Untuk mengambil daftar gambar galeri.

### Komponen UI (Presentational)
- **`<Cover />`** → Halaman sampul undangan.
- **`<Countdown />`** → Timer hitung mundur menuju acara.
- **`<RSVP />`** → Formulir konfirmasi kehadiran (otomatis terintegrasi dengan Runtime).
- **`<Gallery />`** → Grid foto acara.
- **`<Story />`** & `<Timeline />` → Untuk menampilkan cerita atau susunan acara.
- **`<Gift />`** & `<MusicPlayer />` → Untuk hadiah dan musik.

### Utilities
- **`formatDate(date: string)`** → Memformat tanggal sesuai locale Indonesia.
- **`copyToClipboard(text: string)`** → Menyalin teks ke clipboard.

### Types (Struktur Data)
```typescript
interface InvitationData {
  eventName: string;      // Nama Acara
  date: string;           // ISO Date String
  location: string;       // Lokasi
  hostName: string;       // Nama Tuan Rumah
  // ... properti lain seperti story, gallery, dll.
}

interface RsvpPayload {
  guestId: string;
  isAttending: boolean;
  plusOneCount: number;
  message?: string;
}
```

---

## 4. 📁 STRUKTUR FOLDER TEMA
Buat folder baru di `themes/nama-tema-anda/` dengan struktur berikut:

```text
themes/nama-tema-anda/
├── src/
│   ├── App.tsx          # Komponen utama (ekspor default)
│   └── main.tsx         # Entry point build (ekspor ulang App)
├── manifest.json        # Kontrak dengan Runtime (WAJIB)
├── package.json         # Dependencies
├── vite.config.ts       # Konfigurasi build
├── tailwind.config.js   # Styling (opsional)
└── tsconfig.json        # TypeScript
```

---

## 5. 📄 FILE-FILE WAJIB (Template Kode)

### A. `manifest.json` (Kontrak)
```json
{
  "name": "Nama Temamu",
  "version": "1.0.0",
  "description": "Deskripsi singkat tema ini",
  "author": "Nama Kamu",
  "runtimeVersion": "1.x",
  "entry": "dist/index.es.js",
  "tier": "free", // atau "premium"
  "configSchema": {
    "properties": {
      "primaryColor": { "type": "string", "default": "#7C3AED" },
      "font": { "type": "string", "default": "Inter" }
    }
  }
}
```

### B. `src/App.tsx` (Komponen Utama)
```tsx
import React from 'react';
import { useInvitation } from '@joinme/theme-sdk';

export default function App() {
  const { data, loading, error } = useInvitation();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Data tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <h1 className="text-4xl font-bold text-center">{data.eventName}</h1>
      <p className="text-center text-gray-600">{data.hostName}</p>
      <p className="text-center">{data.location}</p>
      {/* Tambahkan Komponen SDK seperti <Countdown /> di sini */}
    </div>
  );
}
```

### C. `src/main.tsx` (Entry Build)
```tsx
import App from './App';
export default App;
```

### D. `vite.config.ts` (Library Mode - WAJIB)
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'ThemeName',
      fileName: (format) => `index.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@joinme/theme-sdk'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@joinme/theme-sdk': 'JoinMeSDK'
        }
      }
    }
  }
});
```

---

## 6. 🧠 PANDUAN VISUAL UNTUK AI
Saat mendesain tampilan (UI), ikuti prinsip ini agar terlihat premium:

- **Tipografi:** Gunakan perpaduan Serif (untuk nama acara) dan Sans-Serif (untuk detail). Contoh: `font-family: 'Playfair Display', 'Inter', sans-serif;`.
- **Warna:** Hindari warna terlalu ramai. Gunakan palet monokromatik atau pastel dengan 1 warna aksen (sesuai `primaryColor` di manifest).
- **Spasi:** Berikan padding dan margin yang longgar (luas) agar terasa mewah.
- **Efek:** Gunakan `backdrop-blur` (glassmorphism) atau shadow lembut untuk kedalaman.
- **Animasi:** Tambahkan animasi fade-in atau slide-up yang halus saat komponen di-render.

---

## 7. 🚀 LANGKAH-LANGKAH KERJA UNTUK AI
Jika Anda adalah AI yang diminta membuat tema, ikuti langkah ini:

1. **Buat Folder:** Buat folder baru di `themes/` dengan nama unik (misal: `themes/flower-elegant/`).
2. **Salin Template:** Salin kode dari file-file di atas ke dalam folder tersebut.
3. **Kustomisasi UI:** Ubah `App.tsx` sesuai konsep desain yang diminta. Gunakan Tailwind CSS untuk styling. Gunakan komponen SDK seperti `<Countdown />` atau `<RSVP />` agar fungsionalitas jalan otomatis.
4. **Uji Lokal (Opsional):** Jalankan `pnpm dev` di root, lalu buka `http://localhost:5173/?invite=abc123` untuk melihat tema Anda.
5. **Build:** Jalankan `npm run build` di dalam folder tema Anda untuk menghasilkan `dist/`.
6. **Upload:** Beri tahu user untuk menjalankan `npx tsx scripts/upload-theme.ts --path themes/nama-tema-anda`.

---

## 8. 🎯 CONTOH PROMPT UNTUK AI (Copy-Paste ini ke AI lain)
> "Halo AI, saya ingin kamu membuat tema undangan premium untuk JoinMe. Berdasarkan AI_INSTRUCTIONS.md, buatlah folder tema baru bernama themes/royal-gold/. Desainnya harus mewah dengan warna emas dan latar gelap. Gunakan komponen <Countdown /> untuk timer dan <RSVP /> untuk konfirmasi. Pastikan tidak ada fetch di dalam kode dan semua data berasal dari useInvitation(). Berikan saya semua kode file-nya."

---

Penutup: Dengan mengikuti panduan ini, AI dapat menciptakan tema yang 100% kompatibel dengan ekosistem JoinMe tanpa merusak arsitektur. Selamat berkarya!
