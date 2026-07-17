import React, { useState } from "react";
import { ThemeItem } from "../services/themeCatalog";

interface PreviewThemeProps {
  theme: ThemeItem;
  userTier: string;
  onBack: () => void;
  onSelect: (themeId: string) => void;
  onUpgrade: () => void;
}

export default function PreviewTheme({ theme, userTier, onBack, onSelect, onUpgrade }: PreviewThemeProps) {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
  
  const isPremium = theme.tier === "premium";
  const isLocked = isPremium && userTier !== "premium";

  // Build the live preview URL using the designated preview invitation ID of the theme
  const previewUrl = `/?invite=${theme.demoInviteId}&theme=${theme.id}`;

  // Custom theme-specific mock styles to show high-fidelity preview placeholders
  const getMockStyle = () => {
    switch (theme.id) {
      case "royal-gold":
        return {
          bg: "bg-gradient-to-b from-[#1c1416] via-[#0d0a0b] to-[#131011]",
          textColor: "text-gray-100",
          accentColor: "text-[#d4af37]",
          accentBorder: "border-[#d4af37]/30",
          buttonBg: "bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] hover:from-[#f3e5ab] hover:to-[#d4af37] text-slate-950 font-extrabold shadow-lg shadow-[#d4af37]/10",
          badge: "👑 PREMIUM TEMA",
          badgeStyle: "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30",
          coupleNames: "Romeo & Juliet",
          coupleStyle: "font-serif text-3xl font-bold tracking-wide text-[#d4af37] my-3 drop-shadow",
          quote: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri."
        };
      case "botanical-garden":
        return {
          bg: "bg-gradient-to-b from-[#edf2ed] via-[#f3f6f3] to-[#e3eae4]",
          textColor: "text-slate-800",
          accentColor: "text-[#4a7c59]",
          accentBorder: "border-[#4a7c59]/20",
          buttonBg: "bg-gradient-to-r from-[#4a7c59] to-[#68a379] hover:from-[#68a379] hover:to-[#4a7c59] text-white font-extrabold shadow-lg shadow-[#4a7c59]/10",
          badge: "👑 PREMIUM TEMA",
          badgeStyle: "bg-[#4a7c59]/10 text-[#4a7c59] border-[#4a7c59]/20",
          coupleNames: "Emma & Liam",
          coupleStyle: "font-serif text-3xl font-bold italic text-[#2f5233] my-3",
          quote: "Menyatukan dua hati dalam ikatan suci yang diiringi keindahan alam yang asri."
        };
      case "modern-minimalist":
        return {
          bg: "bg-gradient-to-b from-[#ffffff] via-[#fafafa] to-[#f4f4f4]",
          textColor: "text-neutral-800",
          accentColor: "text-black",
          accentBorder: "border-black/10",
          buttonBg: "bg-black hover:bg-neutral-800 text-white font-extrabold shadow-lg shadow-black/10",
          badge: "👑 PREMIUM TEMA",
          badgeStyle: "bg-black/5 text-black border-black/10",
          coupleNames: "R + J",
          coupleStyle: "font-sans font-black text-4xl tracking-tighter text-black my-3 uppercase",
          quote: "Simplicity is the ultimate sophistication. Kami mengundang Anda merayakan hari bahagia kami."
        };
      case "premium-theme":
        return {
          bg: "bg-gradient-to-b from-[#1a1510] via-[#0f0c08] to-[#070503]",
          textColor: "text-gray-100",
          accentColor: "text-amber-400",
          accentBorder: "border-amber-400/30",
          buttonBg: "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-extrabold shadow-lg shadow-amber-400/10",
          badge: "👑 PREMIUM TEMA",
          badgeStyle: "bg-amber-400/10 text-amber-400 border-amber-400/30",
          coupleNames: "Arthur & Guinevere",
          coupleStyle: "font-serif text-3xl font-bold tracking-tight text-amber-400 my-3",
          quote: "Menyambut babak baru kehidupan penuh cinta, kemegahan, dan harmoni abadi."
        };
      case "reels-story":
        return {
          bg: "bg-gradient-to-b from-[#12071a] via-[#1c0827] to-[#12071a]",
          textColor: "text-gray-100",
          accentColor: "text-pink-500",
          accentBorder: "border-pink-500/30",
          buttonBg: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold shadow-lg shadow-pink-500/20",
          badge: "👑 PREMIUM TEMA",
          badgeStyle: "bg-pink-500/10 text-pink-400 border-pink-500/30",
          coupleNames: "Reels & Story Theme",
          coupleStyle: "font-serif text-3xl font-black text-white my-3 drop-shadow-md",
          quote: "Swipe horizontal & full-screen immersive design. Nikmati pengalaman undangan modern seperti Instagram Stories."
        };
      case "sample-theme":
      default:
        return {
          bg: "bg-gradient-to-b from-[#1d1e26] via-[#12131a] to-[#0d0d11]",
          textColor: "text-gray-200",
          accentColor: "text-indigo-400",
          accentBorder: "border-indigo-500/20",
          buttonBg: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/15",
          badge: "✨ STANDAR TEMA",
          badgeStyle: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
          coupleNames: "Alex & Sophia",
          coupleStyle: "font-sans text-3xl font-bold text-white my-3",
          quote: "Sebuah momen berharga untuk merayakan persatuan cinta dan persahabatan sejati."
        };
    }
  };

  const style = getMockStyle();

  return (
    <div id="preview-theme-page" className="space-y-6">
      {/* Upper header action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.04] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer flex items-center gap-1"
            >
              ← Kembali ke Marketplace
            </button>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Pratinjau Tema: <span className={isPremium ? "text-amber-400 font-serif" : "text-white"}>{theme.name}</span>
          </h1>
          <p className="text-xs text-gray-400">
            Anda sedang melihat demonstrasi interaktif tema ini menggunakan data simulasi undangan.
          </p>
        </div>

        {/* Action button in header */}
        <div className="flex gap-3">
          {isLocked ? (
            <button
              onClick={onUpgrade}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer transition-all active:scale-[0.98]"
            >
              👑 Upgrade untuk Memakai Tema ini
            </button>
          ) : (
            <button
              onClick={() => onSelect(theme.id)}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer active:scale-[0.98] ${
                isPremium 
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/15" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/15"
              }`}
            >
              Pilih Tema Ini ↗
            </button>
          )}
        </div>
      </div>

      {/* Control Panel: Device selectors & direct link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.01] border border-white/[0.04] p-4 rounded-2xl">
        {/* Device Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-mono uppercase tracking-wider mr-2">Ukuran Layar:</span>
          <button
            onClick={() => setDevice("mobile")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              device === "mobile" 
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30" 
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            📱 Mobile
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              device === "tablet" 
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30" 
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            📟 Tablet
          </button>
          <button
            onClick={() => setDevice("desktop")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              device === "desktop" 
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30" 
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            💻 Desktop
          </button>
        </div>

        {/* Link Out */}
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 font-mono cursor-pointer"
        >
          <span>Buka di tab baru ↗</span>
        </a>
      </div>

      {/* Viewport Frame Container */}
      <div className="w-full flex justify-center py-6 bg-black/40 border border-white/[0.04] rounded-3xl min-h-[600px] relative overflow-hidden">
        {/* Ambience glow behind frame */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-20 ${
          isPremium ? "bg-amber-500" : "bg-indigo-500"
        }`}></div>

        {/* Device Wrapper */}
        <div 
          className={`transition-all duration-300 relative shadow-2xl ${
            device === "mobile" 
              ? "w-[375px] h-[667px] border-[12px] border-[#18181f] rounded-[40px] ring-4 ring-white/[0.04]" 
              : device === "tablet"
                ? "w-[768px] h-[900px] border-[16px] border-[#18181f] rounded-[48px] ring-4 ring-white/[0.04]"
                : "w-full h-[750px] border-t-[20px] border-x-[8px] border-b-[8px] border-[#18181f] rounded-t-3xl ring-4 ring-white/[0.04]"
          }`}
        >
          {/* Mobile Camera Notch */}
          {device === "mobile" && (
            <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-32 h-4 bg-[#18181f] rounded-b-xl z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-white/[0.02]"></div>
            </div>
          )}

          {/* Actual Live Frame / Dynamic Fallback in Sandbox */}
          {(import.meta as any).env?.DEV ? (
            <div className={`w-full h-full ${style.bg} ${style.textColor} rounded-[28px] relative z-20 flex flex-col justify-between p-6 overflow-y-auto border border-white/[0.04] scrollbar-thin`}>
              {/* Header Badge */}
              <div className="flex justify-between items-center pb-4 border-b border-white/[0.06]">
                <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full border ${style.badgeStyle}`}>
                  {style.badge}
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  Live Preview
                </span>
              </div>

              {/* Cover/Card Mockup */}
              <div className="flex-1 flex flex-col items-center justify-center text-center my-6 py-4 space-y-4">
                <span className={`text-xs uppercase tracking-widest ${style.accentColor} font-mono font-bold`}>
                  WEDDING INVITATION
                </span>
                
                <h2 className={style.coupleStyle}>{style.coupleNames}</h2>
                
                <div className={`w-12 h-[1px] bg-current opacity-30 ${style.accentColor} mx-auto`}></div>
                
                <p className="text-xs text-gray-400 max-w-[240px] italic leading-relaxed px-2 mx-auto">
                  "{style.quote}"
                </p>

                {/* Countdown Simulation */}
                <div className={`border ${style.accentBorder} bg-black/15 rounded-xl p-3 w-full max-w-[280px] mt-2 mx-auto`}>
                  <p className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mb-1.5 text-center">Acara Akan Dimulai Dalam</p>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div>
                      <span className={`text-sm font-bold block ${style.accentColor}`}>12</span>
                      <span className="text-[8px] text-gray-500 font-mono">Hari</span>
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${style.accentColor}`}>05</span>
                      <span className="text-[8px] text-gray-500 font-mono">Jam</span>
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${style.accentColor}`}>42</span>
                      <span className="text-[8px] text-gray-500 font-mono">Menit</span>
                    </div>
                    <div>
                      <span className={`text-sm font-bold block ${style.accentColor}`}>18</span>
                      <span className="text-[8px] text-gray-500 font-mono">Detik</span>
                    </div>
                  </div>
                </div>

                {/* Feature Bullets inside mock */}
                <div className="text-left w-full max-w-[280px] bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 space-y-1.5 mt-2 mx-auto">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Fitur Tema:</span>
                  {theme.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-gray-300">
                      <span className={style.accentColor}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Notice & Big Call-to-action */}
              <div className="border-t border-white/[0.06] pt-4 space-y-3 mt-auto bg-black/30 p-4 -mx-6 -mb-6 rounded-b-[28px] backdrop-blur-sm z-30">
                <div className="text-center space-y-1 px-1">
                  <p className="text-xs font-bold text-white flex items-center justify-center gap-1">
                    <span>⚠️</span> Pratinjau Terbatas Sandbox
                  </p>
                  <p className="text-[10px] text-gray-400 leading-normal max-w-[280px] mx-auto text-center">
                    Pratinjau langsung di dalam frame tidak tersedia di lingkungan pengembangan ini karena pembatasan sandbox browser. Silakan buka demonstrasi interaktif penuh di tab baru.
                  </p>
                </div>

                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl text-center text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-lg ${style.buttonBg}`}
                >
                  <span>📱 Buka Pratinjau di Tab Baru ↗</span>
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={previewUrl}
              title={`Preview ${theme.name}`}
              className="w-full h-full bg-[#0d0d11] rounded-[4px] relative z-20"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
