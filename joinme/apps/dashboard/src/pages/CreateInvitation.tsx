import React, { useState, useEffect } from "react";
import { safeGetItem, safeSetItem, safeRemoveItem } from "../services/storage";

export default function CreateInvitation() {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [hostName, setHostName] = useState("");
  const [theme, setTheme] = useState("sample-theme");
  const [subTier, setSubTier] = useState<string>("free");
  
  const [createdInviteId, setCreatedInviteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = safeGetItem("user-subscription") || safeGetItem("subscription") || "free";
    const normalizedTier = stored.toLowerCase();
    setSubTier(normalizedTier);

    const selectedTheme = safeGetItem("joinme-selected-theme");
    if (!selectedTheme) {
      // No theme chosen yet, redirect to theme marketplace!
      const params = new URLSearchParams(window.location.search);
      params.set("subpage", "marketplace");
      window.location.href = `?${params.toString()}`;
    } else {
      setTheme(selectedTheme);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !date || !location || !hostName) return;

    // Generate unique ID: Date.now() + random string
    const randStr = Math.random().toString(36).substring(2, 6);
    const uniqueId = `${Date.now()}-${randStr}`;

    const newInvitation = {
      id: uniqueId,
      eventName,
      date,
      location,
      hostName,
      theme,
      createdAt: new Date().toISOString()
    };

    // Store in localStorage (simulated DB)
    const existingInvitesRaw = safeGetItem("joinme-invitations");
    const existingInvites = existingInvitesRaw ? JSON.parse(existingInvitesRaw) : [];
    
    // Check Free tier limit (1 invitation)
    if (subTier !== "premium" && existingInvites.length >= 1) {
      alert("Batas Paket Gratis: Anda hanya diperbolehkan membuat maksimal 1 undangan. Silakan upgrade ke Premium untuk membuat undangan tanpa batas!");
      // Redirect to pricing
      const params = new URLSearchParams(window.location.search);
      params.set("subpage", "pricing");
      window.location.href = `?${params.toString()}`;
      return;
    }

    existingInvites.push(newInvitation);
    safeSetItem("joinme-invitations", JSON.stringify(existingInvites));

    // Clear the selected theme from marketplace after successful creation
    safeRemoveItem("joinme-selected-theme");

    setCreatedInviteId(uniqueId);
  };

  const handleCopyLink = () => {
    if (!createdInviteId) return;
    const link = `${window.location.origin}/?invite=${createdInviteId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackToDashboard = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("subpage");
    window.location.href = `?${params.toString()}`;
  };

  const inviteLink = createdInviteId ? `${window.location.origin}/?invite=${createdInviteId}` : "";

  return (
    <div className="space-y-8 max-w-2xl mx-auto relative">
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-6">
        <div className="space-y-1">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">PEMBUAT UNDANGAN</span>
          <h1 className="text-2xl font-extrabold text-white">Buat Undangan Digital Baru</h1>
          <p className="text-xs text-gray-400">Publikasikan karya ke dalam runtime terpadu kami.</p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="px-4 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          Batal
        </button>
      </div>

      {!createdInviteId ? (
        <form onSubmit={handleSubmit} className="p-8 bg-white/[0.01] border border-white/[0.06] rounded-3xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Event Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Nama Acara / Undangan</label>
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Contoh: Pernikahan Kevin & Clarissa"
                className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-indigo-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Event Date */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Tanggal & Waktu</label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-indigo-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Host Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Nama Host / Penyelenggara</label>
              <input
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="Contoh: Keluarga Bpk. Kusuma & Ibu Shinta"
                className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-indigo-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Lokasi Acara</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Grand Ballroom Ritz Carlton, Jakarta"
                className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-indigo-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

          </div>

          <div className="h-px bg-white/[0.04]"></div>

          {/* Theme Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Theme Desain Pilihan</label>
              <button
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.set("subpage", "marketplace");
                  window.location.href = `?${params.toString()}`;
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-all cursor-pointer flex items-center gap-1"
              >
                🎨 Ubah Tema di Marketplace
              </button>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr flex items-center justify-center ${
                  theme === "premium-theme" 
                    ? "from-amber-600/20 to-yellow-500/10 border border-amber-500/30 text-amber-300" 
                    : "from-indigo-600/20 to-indigo-500/10 border border-indigo-500/30 text-indigo-300"
                }`}>
                  <span className="text-xl">{theme === "premium-theme" ? "👑" : "🌱"}</span>
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-white block">
                    {theme === "premium-theme" ? "Luxury Gold & Glassmorphism Theme" : "Standard Minimalist Theme"}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5 block">
                    {theme === "premium-theme" ? "Sentuhan warna emas mewah, glassmorphic." : "Desain bersih, modern, dan elegan."}
                  </span>
                </div>
              </div>

              {theme === "premium-theme" ? (
                <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[9px] font-mono uppercase font-bold rounded-full">
                  Premium
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[9px] font-mono uppercase font-bold rounded-full">
                  Standard
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/10 active:scale-[0.98] cursor-pointer"
          >
            🚀 Buat & Publikasikan Undangan
          </button>
        </form>
      ) : (
        /* Success State */
        <div className="p-8 bg-white/[0.01] border border-emerald-500/30 rounded-3xl text-center space-y-6 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"></div>

          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
            <span className="text-3xl">🎉</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Undangan Sukses Dibuat & Dipublikasikan!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Undangan Anda telah diterbitkan secara instan ke sistem runtime. Bagikan link eksklusif ini ke seluruh kerabat Anda.
            </p>
          </div>

          {/* Copyable Link Block */}
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex flex-col sm:flex-row items-center gap-4 justify-between max-w-xl mx-auto">
            <div className="text-left overflow-hidden w-full sm:w-auto flex-grow pr-4">
              <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase font-semibold block">LINK UNDANGAN AKTIF:</span>
              <span className="text-xs text-indigo-300 font-mono font-semibold block truncate select-all mt-1">{inviteLink}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                copied 
                  ? "bg-emerald-600 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {copied ? "✓ Tersalin" : "📋 Salin Link"}
            </button>
          </div>

          <div className="h-[1px] bg-white/[0.04] w-full max-w-md mx-auto"></div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                window.location.href = `?invite=${createdInviteId}`;
              }}
              className="px-6 py-2.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-white text-xs font-semibold rounded-xl transition-all"
            >
              Buka Preview Undangan ↗
            </button>
            <button
              onClick={handleBackToDashboard}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
