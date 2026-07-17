export interface ThemeItem {
  id: string;
  name: string;
  description: string;
  thumbnailGradient: string; // Tailwind class representing the card style for thumbnail
  tier: "free" | "premium";
  demoInviteId: string; // The invite ID used for live preview in the runtime
  features: string[];
  thumbnailUrl?: string; // Optional raster thumbnail URL for production hardening fallback
}

export const THEME_CATALOG: ThemeItem[] = [
  {
    id: "sample-theme",
    name: "Standard Minimalist",
    description: "Desain bersih, modern, dan elegan dengan tipografi kontemporer. Sangat cocok untuk acara semi-formal dan kasual.",
    thumbnailGradient: "from-[#1d1e26] via-[#12131a] to-[#0d0d11] border-indigo-500/20",
    tier: "free",
    demoInviteId: "abc123",
    features: ["Tipografi Inter & Monospace", "Desain Responsif Mobile", "Load Time < 800ms"],
    thumbnailUrl: "/assets/non-existent-standard-thumb.jpg" // Set to a non-existent URL to demonstrate the fallback UI
  },
  {
    id: "premium-theme",
    name: "Luxury Gold & Glassmorphism",
    description: "Tema eksklusif dengan sentuhan warna emas mewah, efek kaca transparan super halus, serta ornamen artistik royal.",
    thumbnailGradient: "from-[#1a1510] via-[#0f0c08] to-[#070503] border-amber-500/40",
    tier: "premium",
    demoInviteId: "xyz789",
    features: ["Aksen Ornamen Emas Royal", "Efek Glassmorphism Mewah", "Konfirmasi RSVP Eksklusif", "Efek Interaktif & Animasi Halus"],
    thumbnailUrl: "/assets/non-existent-premium-thumb.jpg" // Set to a non-existent URL to demonstrate the fallback UI
  },
  {
    id: "royal-gold",
    name: "Royal Gold",
    description: "Tema mewah klasik klasik dengan perpaduan warna latar belakang gelap yang pekat dan ornamen foil emas berkilau.",
    thumbnailGradient: "from-[#1c1416] via-[#0d0a0b] to-[#131011] border-[#d4af37]/40",
    tier: "premium",
    demoInviteId: "abc123",
    features: ["Aksen Foil Emas Mewah", "Countdown Style Gold", "Card Gift & Rekening Premium", "Playfair Display Typography"],
    thumbnailUrl: "/themes/royal-gold/thumbnail.png"
  },
  {
    id: "botanical-garden",
    name: "Botanical Garden",
    description: "Desain segar bernuansa alam dengan perpaduan latar belakang hijau sage lembut dan ornamen dedaunan organik.",
    thumbnailGradient: "from-[#edf2ed] via-[#f3f6f3] to-[#e3eae4] border-[#2f5233]/30 text-gray-800",
    tier: "premium",
    demoInviteId: "abc123",
    features: ["Nuansa Hijau Sage Alami", "Timeline Detail Dedaunan", "Cormorant Garamond Serif", "Music Player Organik"],
    thumbnailUrl: "/themes/botanical-garden/thumbnail.png"
  },
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Gaya kontemporer yang bersih dan berani dengan memanfaatkan ruang kosong yang luas dan tipografi ultra-modern.",
    thumbnailGradient: "from-[#ffffff] via-[#fafafa] to-[#f4f4f4] border-black/15 text-black",
    tier: "premium",
    demoInviteId: "xyz789",
    features: ["Tipografi DM Sans Bold", "Layout Flat Kontemporer", "Input RSVP Garis Minimalis", "Banyak Ruang Kosong (White Space)"],
    thumbnailUrl: "/themes/modern-minimalist/thumbnail.png"
  },
  {
    id: "reels-story",
    name: "Reels Story",
    description: "Tema imersif bergaya Instagram Reels & Stories. Layout layar penuh modern dengan swipe horizontal, iringan musik romantis otomatis, serta navigasi progress bar.",
    thumbnailGradient: "from-[#12071a] via-[#1c0827] to-[#12071a] border-pink-500/30 text-white",
    tier: "premium",
    demoInviteId: "abc123",
    features: ["Navigasi Cerita (Swipe Horizontal)", "Segmented Progress Bar Terintegrasi", "Layar Penuh (Immersive Fullscreen)", "Pemutar Musik Romantis Otomatis", "Formulir RSVP & Countdown Modern"],
    thumbnailUrl: "/themes/reels-story/thumbnail.png"
  }
];

export function getThemeById(id: string): ThemeItem | undefined {
  return THEME_CATALOG.find((theme) => theme.id === id);
}
