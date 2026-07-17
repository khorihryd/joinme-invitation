import React, { useState, useEffect } from "react";

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
    const stored = localStorage.getItem("user-subscription") || localStorage.getItem("subscription") || "free";
    setSubTier(stored.toLowerCase());
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
    const existingInvitesRaw = localStorage.getItem("joinme-invitations");
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
    localStorage.setItem("joinme-invitations", JSON.stringify(existingInvites));

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
              <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Pilih Theme Desain</label>
              {subTier !== "premium" && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                  Akun Free Plan
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Sample Theme (Standard) */}
              <label className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                theme === "sample-theme" 
                  ? "bg-indigo-600/[0.04] border-indigo-500 ring-1 ring-indigo-500/30" 
                  : "bg-white/[0.01] border-white/[0.06] hover:border-white/[0.12]"
              }`}>
                <input
                  type="radio"
                  name="theme"
                  value="sample-theme"
                  checked={theme === "sample-theme"}
                  onChange={() => setTheme("sample-theme")}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">Sample Theme</span>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">Minimalist & clean default layout.</span>
                  </div>
                  <span className="text-xs text-indigo-400 font-mono font-bold">Free</span>
                </div>
              </label>

              {/* Premium Theme */}
              {subTier === "premium" ? (
                <label className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                  theme === "premium-theme" 
                    ? "bg-amber-500/[0.04] border-amber-500 ring-1 ring-amber-500/30" 
                    : "bg-white/[0.01] border-white/[0.06] hover:border-white/[0.12]"
                }`}>
                  <input
                    type="radio"
                    name="theme"
                    value="premium-theme"
                    checked={theme === "premium-theme"}
                    onChange={() => setTheme("premium-theme")}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">Premium Luxury Theme</span>
                      <span className="text-[10px] text-amber-200/60 mt-0.5 block">Golden ornament, glassmorphism.</span>
                    </div>
                    <span className="text-xs text-amber-400 font-mono font-bold">👑 Premium</span>
                  </div>
                </label>
              ) : (
                <div 
                  className="p-4 rounded-2xl border border-dashed border-white/[0.04] bg-white/[0.01] flex flex-col justify-between gap-3 opacity-50 relative group cursor-not-allowed"
                  title="Upgrade ke Premium untuk membuka tema ini"
                  onClick={() => {
                    if (confirm("Tema premium hanya untuk akun Premium. Ingin menuju halaman Upgrade paket sekarang?")) {
                      const params = new URLSearchParams(window.location.search);
                      params.set("subpage", "pricing");
                      window.location.href = `?${params.toString()}`;
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-gray-500 block">Premium Luxury Theme</span>
                      <span className="text-[10px] text-gray-600 mt-0.5 block">Kunci terbuka setelah upgrade.</span>
                    </div>
                    <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold px-2 py-0.5 rounded-full">👑 Lock</span>
                  </div>
                </div>
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
