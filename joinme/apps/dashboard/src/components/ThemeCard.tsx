import React, { useState } from "react";
import { ThemeItem } from "../services/themeCatalog";

interface ThemeCardProps {
  key?: string;
  theme: ThemeItem;
  userTier: string;
  onSelect: (themeId: string) => void;
  onPreview: (themeId: string) => void;
  onUpgrade: () => void;
}

export default function ThemeCard({ theme, userTier, onSelect, onPreview, onUpgrade }: ThemeCardProps) {
  const isPremium = theme.tier === "premium";
  const isLocked = isPremium && userTier !== "premium";
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      id={`theme-card-${theme.id}`}
      className={`relative p-6 bg-[#121218]/60 border rounded-[32px] flex flex-col justify-between gap-6 transition-all hover:bg-[#151520]/80 hover:translate-y-[-2px] group ${
        isLocked 
          ? "border-white/[0.04]" 
          : isPremium 
            ? "border-amber-500/20 hover:border-amber-500/40 shadow-xl shadow-amber-500/2" 
            : "border-indigo-500/20 hover:border-indigo-500/40 shadow-xl shadow-indigo-500/2"
      }`}
    >
      {/* Visual Thumbnail Frame */}
      <div className={`relative h-44 rounded-2xl bg-gradient-to-b ${theme.thumbnailGradient} border overflow-hidden flex flex-col items-center justify-center p-4 select-none`}>
        {theme.thumbnailUrl && !imgError ? (
          <img 
            src={theme.thumbnailUrl} 
            alt={theme.name} 
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 group-hover:scale-105"
          />
        ) : null}

        {/* Fallback & Custom Mock Card UI (rendered if no image or if image load fails) */}
        <div className={`relative w-full max-w-[180px] bg-white/[0.02] border border-white/[0.08] rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-center transform group-hover:scale-105 transition-transform duration-300 z-10 ${imgError ? "ring-1 ring-red-500/30" : ""}`}>
          <span className={`text-[8px] font-mono tracking-widest ${isPremium ? "text-amber-400" : "text-indigo-400"} uppercase font-semibold`}>
            {imgError ? "⚠️ Fallback Active" : "Undangan Resmi"}
          </span>
          <h5 className="text-xs font-serif font-extrabold text-white mt-1 leading-tight">Budi & Ani</h5>
          <div className="h-[1px] bg-white/[0.06] my-1.5 w-8 mx-auto"></div>
          <span className="text-[7px] text-gray-500 font-mono block">17 JULI 2026</span>
        </div>

        {/* Background ambient decorative shapes (only visible if using CSS fallback or transparent image) */}
        {(!theme.thumbnailUrl || imgError) && (
          <>
            <div className={`absolute top-4 left-4 w-12 h-12 rounded-full blur-xl opacity-30 ${isPremium ? "bg-amber-500" : "bg-indigo-500"}`}></div>
            <div className={`absolute bottom-4 right-4 w-16 h-16 rounded-full blur-2xl opacity-20 ${isPremium ? "bg-yellow-400" : "bg-purple-500"}`}></div>
          </>
        )}

        {/* Tier Badge on Thumbnail Corner */}
        <div className="absolute top-3 right-3 z-20">
          {isPremium ? (
            <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[9px] font-mono uppercase font-bold rounded-full">
              👑 Premium
            </span>
          ) : (
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[9px] font-mono uppercase font-bold rounded-full">
              Standard
            </span>
          )}
        </div>
      </div>

      {/* Theme Info */}
      <div className="space-y-3 flex-grow">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors">{theme.name}</h4>
          <p className="text-xs text-gray-400 font-light leading-relaxed">{theme.description}</p>
        </div>

        {/* Bullet features */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {theme.features.map((feat, idx) => (
            <span key={idx} className="text-[9px] font-mono bg-white/[0.02] border border-white/[0.04] text-gray-400 px-2 py-0.5 rounded-md">
              • {feat}
            </span>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/[0.04]"></div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left: Interactive Preview */}
        <button
          onClick={() => onPreview(theme.id)}
          className="w-full py-2.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>👁</span> Pratinjau
        </button>

        {/* Right: Select or Upgrade */}
        {isLocked ? (
          <button
            onClick={onUpgrade}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-1"
          >
            <span>⚡</span> Upgrade
          </button>
        ) : (
          <button
            onClick={() => onSelect(theme.id)}
            className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              isPremium 
                ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/15" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/15"
            }`}
          >
            Pilih Tema ↗
          </button>
        )}
      </div>
    </div>
  );
}
