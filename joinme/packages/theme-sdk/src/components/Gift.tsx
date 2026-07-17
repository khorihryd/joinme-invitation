import React, { useState } from "react";

export interface GiftItemData {
  bank: string;
  number: string;
  name: string;
}

export interface GiftProps {
  items: GiftItemData[];
  className?: string;
}

export function Gift({ items, className = "" }: GiftProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return (
      <div id="gift-empty" className="text-center py-6 text-gray-500 text-xs font-mono">
        Belum ada informasi rekening donasi.
      </div>
    );
  }

  const handleCopy = (num: string, idx: number) => {
    navigator.clipboard.writeText(num)
      .then(() => {
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
      })
      .catch((err) => {
        console.warn("Failed to copy account number:", err);
      });
  };

  return (
    <div 
      id="gift-container" 
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto ${className}`}
    >
      {items.map((item, idx) => (
        <div 
          key={idx} 
          id={`gift-card-${idx}`}
          className="relative overflow-hidden p-5 bg-gradient-to-br from-slate-900/90 to-slate-950/90 hover:from-slate-900 hover:to-slate-950 border border-white/[0.08] hover:border-indigo-500/30 rounded-2xl flex flex-col justify-between h-44 shadow-lg transition-all duration-300"
        >
          {/* Decorative subtle holographic circle */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Bank Brand Name */}
          <div className="flex items-center justify-between">
            <span 
              id={`gift-bank-name-${idx}`}
              className="text-xs font-extrabold font-mono uppercase tracking-widest text-amber-400"
            >
              {item.bank}
            </span>
            <span className="w-8 h-5 bg-white/[0.03] border border-white/[0.06] rounded-md flex items-center justify-center text-[8px] text-gray-500 font-mono font-medium">
              CHIP
            </span>
          </div>

          {/* Account Number & Name */}
          <div className="space-y-1 mt-4">
            <span 
              id={`gift-account-number-${idx}`}
              className="block text-base sm:text-lg font-bold font-mono tracking-wider text-white"
            >
              {item.number}
            </span>
            <span 
              id={`gift-account-name-${idx}`}
              className="block text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase"
            >
              {item.name}
            </span>
          </div>

          {/* Interactive Actions */}
          <div className="mt-4 flex justify-end">
            <button
              id={`gift-copy-btn-${idx}`}
              onClick={() => handleCopy(item.number, idx)}
              className={`px-3 py-1.5 text-[10px] font-bold font-mono uppercase tracking-widest rounded-lg border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                copiedIdx === idx
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-white hover:border-white/25"
              }`}
            >
              {copiedIdx === idx ? (
                <>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  <span>Salin Rekening</span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
