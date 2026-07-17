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
  }
];

export function getThemeById(id: string): ThemeItem | undefined {
  return THEME_CATALOG.find((theme) => theme.id === id);
}
