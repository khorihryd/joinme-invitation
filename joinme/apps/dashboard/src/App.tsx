import React, { useState, useEffect, lazy, Suspense } from "react";
import SubscriptionBadge from "./components/SubscriptionBadge";
import { safeGetItem, safeSetItem, safeRemoveItem } from "./services/storage";

const Subscription = lazy(() => import("./pages/Subscription"));
const CreateInvitation = lazy(() => import("./pages/CreateInvitation"));
const Marketplace = lazy(() => import("./pages/Marketplace"));

interface LocalInvitation {
  id: string;
  eventName: string;
  date: string;
  location: string;
  hostName: string;
  theme: string;
  createdAt: string;
}

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [subPage, setSubPage] = useState<string>("");
  const [invitations, setInvitations] = useState<LocalInvitation[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Protected Route Check
    const token = safeGetItem("user-token");
    const userEmail = safeGetItem("user-email") || "user@email.com";
    
    if (!token) {
      window.location.href = "?page=login";
      return;
    }
    
    setEmail(userEmail);

    // Parse URL params for subpage routing
    const params = new URLSearchParams(window.location.search);
    const sub = params.get("subpage") || "";
    setSubPage(sub);

    // Load custom invitations safely
    const localInvitesRaw = safeGetItem("joinme-invitations");
    if (localInvitesRaw) {
      try {
        setInvitations(JSON.parse(localInvitesRaw));
      } catch (e) {
        console.error("Failed to parse local invitations:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    safeRemoveItem("user-token");
    safeRemoveItem("user-email");
    window.location.href = "?page=login";
  };

  const handleNavigate = (sub: string) => {
    const params = new URLSearchParams(window.location.search);
    if (sub) {
      params.set("subpage", sub);
    } else {
      params.delete("subpage");
    }
    window.location.href = `?${params.toString()}`;
  };

  const handleViewInvite = (id: string) => {
    window.location.href = `?invite=${id}`;
  };

  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/?invite=${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteInvite = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus undangan ini?")) {
      const filtered = invitations.filter((inv) => inv.id !== id);
      setInvitations(filtered);
      safeSetItem("joinme-invitations", JSON.stringify(filtered));
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-gray-100 font-sans flex flex-col justify-between relative overflow-x-hidden">
      {/* Ambience background blobs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="relative border-b border-white/[0.04] backdrop-blur-md bg-[#0d0d11]/80 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Dashboard Title */}
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = "/"} className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <span className="text-white font-bold text-lg font-mono">J</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">Join<span className="text-amber-400">Me</span></span>
            </button>
            <div className="h-4 w-px bg-white/[0.1] hidden sm:block"></div>
            <button
              onClick={() => handleNavigate("")}
              className={`text-sm font-semibold font-mono tracking-wider uppercase hidden sm:block transition-colors cursor-pointer ${
                !subPage ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <div className="h-4 w-px bg-white/[0.1] hidden sm:block"></div>
            <button
              onClick={() => handleNavigate("marketplace")}
              className={`text-sm font-semibold font-mono tracking-wider uppercase hidden sm:block transition-colors cursor-pointer ${
                subPage === "marketplace" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Marketplace
            </button>
          </div>

          {/* User Email & Subscription Badge & Logout */}
          <div className="flex items-center gap-4">
            <SubscriptionBadge />
            <span className="text-xs text-gray-400 font-mono bg-white/[0.02] border border-white/[0.06] px-3 py-1.5 rounded-full hidden md:inline-block">
              👤 {email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-semibold bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-900/30 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative max-w-5xl mx-auto w-full px-6 py-12 sm:py-16 flex-grow z-10">
        
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse">Memuat halaman...</p>
          </div>
        }>
          {subPage === "pricing" ? (
            <Subscription />
          ) : subPage === "marketplace" ? (
            <Marketplace />
          ) : subPage === "create" ? (
            <CreateInvitation />
          ) : (
            /* PRIMARY DASHBOARD PANELS */
            <div className="space-y-12">
              
              {/* Welcome Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">Selamat Datang</span>
                  <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
                    Halo, {email.split("@")[0]} 👋
                  </h1>
                  <p className="text-sm text-gray-400 font-light max-w-xl">
                    Kelola seluruh undangan digital premium dan tema eksklusif Anda dari satu kontrol panel terpadu.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate("create")}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition-all cursor-pointer active:scale-[0.98] self-start sm:self-center"
                >
                  ➕ Buat Undangan Baru
                </button>
              </div>

              {/* List of Active Invitations */}
              <div className="space-y-6">
                <div className="border-b border-white/[0.04] pb-4">
                  <h3 className="text-lg font-bold text-white font-mono tracking-wide uppercase text-sm">📋 Undangan Anda</h3>
                </div>

                {invitations.length === 0 ? (
                  /* Empty State Card */
                  <div className="p-8 sm:p-12 bg-white/[0.01] border border-dashed border-white/[0.08] rounded-3xl text-center space-y-6 max-w-2xl mx-auto shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-indigo-500/10"></div>
                    
                    <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.04] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                      <span className="text-3xl">✉️</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-white">Belum ada undangan</h3>
                      <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                        Anda belum memiliki undangan aktif. Buat undangan digital pertamamu dan undang kerabat dengan tampilan premium instan!
                      </p>
                    </div>

                    <button
                      onClick={() => handleNavigate("create")}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Mulai Buat Undangan
                    </button>
                  </div>
                ) : (
                  /* Card List Grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {invitations.map((inv) => {
                      const isPremium = inv.theme === "premium-theme";
                      const formattedDate = new Date(inv.date).toLocaleDateString("id-ID", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      });

                      return (
                        <div 
                          key={inv.id} 
                          className={`p-6 bg-white/[0.01] border rounded-2xl flex flex-col justify-between gap-5 transition-all hover:bg-white/[0.02] hover:border-white/[0.12] ${
                            isPremium 
                              ? "border-amber-500/20" 
                              : "border-white/[0.06]"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <span className="text-[9px] font-mono text-gray-500 uppercase block">ID: {inv.id.substring(0, 10)}...</span>
                                <h4 className="text-base font-bold text-white mt-0.5 leading-snug">{inv.eventName}</h4>
                              </div>
                              
                              {isPremium ? (
                                <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-mono uppercase font-bold rounded-full">
                                  👑 Premium
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-gray-400 text-[8px] font-mono uppercase font-semibold rounded-full">
                                  Standard
                                </span>
                              )}
                            </div>

                            <div className="space-y-1.5 text-xs text-gray-400">
                              <p className="flex items-center gap-1.5 font-light">
                                <span>📅</span> {formattedDate}
                              </p>
                              <p className="flex items-center gap-1.5 font-light truncate">
                                <span>📍</span> {inv.location}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-white/[0.04]">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewInvite(inv.id)}
                                className="px-3 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                              >
                                Buka ↗
                              </button>
                              <button
                                onClick={() => handleCopyLink(inv.id)}
                                className={`px-3 py-2 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer ${
                                  copiedId === inv.id
                                    ? "bg-emerald-600/10 border-emerald-500/20 text-emerald-400"
                                    : "bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.08] text-gray-300"
                                }`}
                              >
                                {copiedId === inv.id ? "✓ Tersalin" : "📋 Salin Link"}
                              </button>
                            </div>

                            <button
                              onClick={() => handleDeleteInvite(inv.id)}
                              className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-xs transition-colors cursor-pointer"
                              title="Hapus undangan"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Default Demo Section (Unchanged, so they can test easily) */}
              <div className="border-t border-white/[0.04] pt-10 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white uppercase font-mono tracking-wider">Lihat Demo Tema Aktif (Sample Theme)</h3>
                  <p className="text-xs text-gray-400">Pilih ID berikut untuk melihat preview data undangan yang dikirim ke penampil tema (Runtime):</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/[0.02] border border-white/[0.04] hover:border-indigo-500/20 rounded-2xl flex flex-col justify-between gap-4 transition-all group">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-semibold">Demo ID: abc123</span>
                      <h4 className="text-base font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">Pernikahan Budi & Ani</h4>
                      <p className="text-xs text-gray-400 mt-1 font-light">Menggunakan template pernikahan premium dengan visualisasi tanggal & lokasi.</p>
                    </div>
                    <button
                      onClick={() => handleViewInvite("abc123")}
                      className="w-full sm:w-auto self-start px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-lg transition-all border border-indigo-500/20"
                    >
                      Lihat Tema ↗
                    </button>
                  </div>

                  <div className="p-5 bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/20 rounded-2xl flex flex-col justify-between gap-4 transition-all group">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">Demo ID: xyz789</span>
                      <h4 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">Sweet 17th Clara Olivia</h4>
                      <p className="text-xs text-gray-400 mt-1 font-light">Menggunakan template pesta ulang tahun remaja modern.</p>
                    </div>
                    <button
                      onClick={() => handleViewInvite("xyz789")}
                      className="w-full sm:w-auto self-start px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-lg transition-all border border-amber-500/20"
                    >
                      Lihat Tema ↗
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] py-6 z-10 bg-[#07070a]/90">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[10px] text-gray-500 font-mono">
            &copy; 2026 JoinMe Ecosystem. Signed in as admin.
          </p>
          <div className="flex gap-4 text-[10px] font-mono">
            <button onClick={() => handleNavigate("pricing")} className="text-gray-500 hover:text-gray-300 cursor-pointer">Paket & Upgrade</button>
            <span className="text-gray-700">|</span>
            <a href="#" className="text-gray-500 hover:text-gray-300">Docs</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="text-gray-500 hover:text-gray-300">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
