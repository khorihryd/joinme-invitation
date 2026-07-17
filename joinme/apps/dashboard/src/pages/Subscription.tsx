import React, { useState, useEffect } from "react";
import { safeGetItem, safeSetItem } from "../services/storage";

export default function Subscription() {
  const [currentTier, setCurrentTier] = useState<string>("free");
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  useEffect(() => {
    const stored = safeGetItem("user-subscription") || safeGetItem("subscription") || "free";
    setCurrentTier(stored.toLowerCase());
  }, []);

  const handleSetTier = (tier: "free" | "premium") => {
    safeSetItem("user-subscription", tier);
    safeSetItem("subscription", tier);
    setCurrentTier(tier);

    if (tier === "premium") {
      setShowCelebration(true);
      // Auto-hide celebration and redirect back to dashboard overview after 1.8s
      setTimeout(() => {
        setShowCelebration(false);
        const params = new URLSearchParams(window.location.search);
        params.delete("subpage");
        window.location.href = `?${params.toString()}`;
      }, 1800);
    } else {
      window.location.reload();
    }
  };

  const handleBackToDashboard = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("subpage");
    window.location.href = `?${params.toString()}`;
  };

  return (
    <div className="space-y-10 relative">
      {/* Back button and page intro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">PILIHAN PAKET</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Paket & Layanan</h1>
          <p className="text-xs text-gray-400">Pilih paket terbaik untuk kebutuhan undangan digital eksklusif Anda.</p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="self-start px-4 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>←</span> Kembali ke Dashboard
        </button>
      </div>

      {/* Celebration Notification Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md p-8 bg-[#0f0f15] border border-amber-500/30 rounded-3xl text-center space-y-4 shadow-2xl shadow-amber-500/10">
            <span className="text-5xl animate-bounce block">🎉</span>
            <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Upgrade Berhasil!
            </h3>
            <p className="text-sm text-gray-300">
              Akun Anda kini aktif sebagai <span className="text-amber-300 font-bold uppercase font-mono text-xs">PREMIUM</span>. Menikmati seluruh tema mewah & rsvp eksklusif!
            </p>
            <div className="h-1 bg-amber-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 animate-[pulse_1.5s_infinite] w-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
        
        {/* FREE PLAN CARD */}
        <div className={`p-8 bg-white/[0.01] border rounded-[32px] flex flex-col justify-between gap-8 transition-all relative overflow-hidden ${
          currentTier === "free" 
            ? "border-indigo-500/30 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-500/20" 
            : "border-white/[0.06]"
        }`}>
          {currentTier === "free" && (
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[9px] font-mono uppercase font-bold rounded-full">
              Aktif
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block">🌱 PAKET PEMULA</span>
              <h3 className="text-2xl font-bold text-white">Paket Gratis</h3>
              <p className="text-xs text-gray-400">Cocok untuk mencoba fitur dasar JoinMe dan undangan sederhana.</p>
            </div>

            <div className="flex items-baseline gap-1 py-2">
              <span className="text-3xl font-bold text-white">Rp 0</span>
              <span className="text-xs text-gray-500">/ selamanya</span>
            </div>

            <div className="h-px bg-white/[0.06] w-full"></div>

            <ul className="space-y-3.5 text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Maksimal <strong>1 undangan aktif</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Akses Tema Standar (sample-theme)</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-500">
                <span>✕</span>
                <span className="line-through">Semua Tema Premium Mewah</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-500">
                <span>✕</span>
                <span className="line-through">Fitur RSVP & Buku Tamu Real-time</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-500">
                <span>✕</span>
                <span className="line-through">Tanpa Iklan / White-labeled link</span>
              </li>
            </ul>
          </div>

          {currentTier === "free" ? (
            <button
              disabled
              className="w-full py-3 bg-white/[0.04] text-gray-500 text-xs font-bold rounded-xl border border-white/[0.06] cursor-not-allowed text-center"
            >
              Paket Anda Saat Ini
            </button>
          ) : (
            <button
              onClick={() => handleSetTier("free")}
              className="w-full py-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-[0.98]"
            >
              Kembali ke Paket Gratis (Simulasi)
            </button>
          )}
        </div>

        {/* PREMIUM PLAN CARD */}
        <div className={`p-8 bg-[#121218]/50 border rounded-[32px] flex flex-col justify-between gap-8 transition-all relative overflow-hidden ${
          currentTier === "premium" 
            ? "border-amber-500/40 shadow-2xl shadow-amber-500/5 ring-1 ring-amber-500/30" 
            : "border-white/[0.08] hover:border-amber-500/20"
        }`}>
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          {currentTier === "premium" ? (
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono uppercase font-bold rounded-full">
              Aktif
            </div>
          ) : (
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-mono uppercase font-extrabold rounded-full animate-pulse">
              REKOMENDASI
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-bold">👑 AKSES SEUMUR HIDUP</span>
              <h3 className="text-2xl font-serif font-extrabold text-white">Paket Premium</h3>
              <p className="text-xs text-gray-400">Undangan mewah dengan fitur rsvp interaktif tanpa batasan apa pun.</p>
            </div>

            <div className="space-y-1 py-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 font-serif">Rp 149.000</span>
                <span className="text-xs text-gray-500">/ sekali bayar</span>
              </div>
              <p className="text-[10px] text-amber-200/50 font-mono">⚡ Promo Lifetime Access (No Monthly Fees)</p>
            </div>

            <div className="h-px bg-white/[0.06] w-full"></div>

            <ul className="space-y-3.5 text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Unlimited</strong> pembuatan undangan aktif</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Bebas pilih <strong>Semua Tema Premium Mewah</strong> (gold glassmorphic)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Akses <strong>Tema Standar</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Fitur <strong>RSVP & Konfirmasi Tamu</strong> Real-time</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Dashboard Analytics & Guest Attendance</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>White-labeled subdomain & tanpa iklan</span>
              </li>
            </ul>
          </div>

          {currentTier === "premium" ? (
            <button
              disabled
              className="w-full py-3 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-xl border border-amber-500/20 cursor-not-allowed text-center"
            >
              Paket Anda Saat Ini
            </button>
          ) : (
            <button
              onClick={() => handleSetTier("premium")}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/15 active:scale-[0.98] cursor-pointer"
            >
              Upgrade ke Premium Sekarang ⚡
            </button>
          )}
        </div>

      </div>

      {/* Feature highlight bar */}
      <div className="p-6 bg-white/[0.01] border border-white/[0.04] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white">Butuh bantuan memilih?</h4>
            <p className="text-[10px] text-gray-400">Tim bantuan kami siap melayani Anda 24/7 untuk custom domain atau integrasi khusus.</p>
          </div>
        </div>
        <button 
          onClick={() => alert("Menghubungi Tim Layanan...")}
          className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold rounded-lg transition-colors border border-white/[0.06] cursor-pointer"
        >
          Tanya Support ↗
        </button>
      </div>

    </div>
  );
}
