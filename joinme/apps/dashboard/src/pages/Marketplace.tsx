import React, { useState, useEffect } from "react";
import { THEME_CATALOG, ThemeItem } from "../services/themeCatalog";
import ThemeCard from "../components/ThemeCard";
import PreviewTheme from "./PreviewTheme";

export default function Marketplace() {
  const [userTier, setUserTier] = useState<string>("free");
  const [previewTheme, setPreviewTheme] = useState<ThemeItem | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user-subscription") || localStorage.getItem("subscription") || "free";
    setUserTier(stored.toLowerCase());
  }, []);

  const handleSelectTheme = (themeId: string) => {
    // Save chosen theme in localStorage so the Create Invitation page can pick it up
    localStorage.setItem("joinme-selected-theme", themeId);
    
    // Redirect to Create Invitation subpage
    const params = new URLSearchParams(window.location.search);
    params.set("subpage", "create");
    window.location.href = `?${params.toString()}`;
  };

  const handlePreviewTheme = (demoInviteId: string) => {
    const matched = THEME_CATALOG.find((t) => t.demoInviteId === demoInviteId);
    if (matched) {
      setPreviewTheme(matched);
    }
  };

  const handleUpgradeRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("subpage", "pricing");
    window.location.href = `?${params.toString()}`;
  };

  const handleBackToDashboard = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("subpage");
    window.location.href = `?${params.toString()}`;
  };

  if (previewTheme) {
    return (
      <PreviewTheme
        theme={previewTheme}
        userTier={userTier}
        onBack={() => setPreviewTheme(null)}
        onSelect={handleSelectTheme}
        onUpgrade={handleUpgradeRedirect}
      />
    );
  }

  return (
    <div className="space-y-10">
      {/* Marketplace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">TEMA & DESIGN CATALOGUE</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Marketplace Tema</h1>
          <p className="text-xs text-gray-400">Jelajahi, pratinjau, dan pilih tema eksklusif untuk mempercantik undangan Anda.</p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="self-start px-4 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>←</span> Kembali ke Dashboard
        </button>
      </div>

      {/* Grid Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
        {THEME_CATALOG.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            userTier={userTier}
            onSelect={handleSelectTheme}
            onPreview={handlePreviewTheme}
            onUpgrade={handleUpgradeRedirect}
          />
        ))}
      </div>

      {/* Aesthetic Call-to-Action for custom theme requests */}
      <div className="p-6 bg-gradient-to-r from-indigo-950/20 via-slate-900/10 to-amber-950/10 border border-white/[0.04] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white">Butuh tema khusus yang didesain profesional?</h4>
            <p className="text-[10px] text-gray-400">Hubungi tim desainer visual kami untuk tema eksklusif dengan ilustrasi kustom buatan tangan.</p>
          </div>
        </div>
        <button 
          onClick={() => alert("Menghubungi Tim Desainer...")}
          className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 hover:text-indigo-200 text-xs font-semibold rounded-lg transition-all border border-indigo-500/20 cursor-pointer"
        >
          Pesan Tema Kustom ↗
        </button>
      </div>
    </div>
  );
}
