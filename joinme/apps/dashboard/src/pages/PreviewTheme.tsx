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
  const previewUrl = `${window.location.origin}/?invite=${theme.demoInviteId}`;

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

          {/* Actual Live Frame */}
          <iframe
            src={previewUrl}
            title={`Preview ${theme.name}`}
            className="w-full h-full bg-[#0d0d11] rounded-[4px] relative z-20"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
