import React, { useState, useEffect } from "react";

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newInviteName, setNewInviteName] = useState<string>("");
  const [inviteIdCreated, setInviteIdCreated] = useState<string | null>(null);

  useEffect(() => {
    // 1. Protected Route Check
    const token = localStorage.getItem("user-token");
    const userEmail = localStorage.getItem("user-email") || "user@email.com";
    
    if (!token) {
      // Redirect to login
      window.location.href = "?page=login";
    } else {
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-email");
    window.location.href = "?page=login";
  };

  const handleCreateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInviteName.trim()) return;
    
    // Generate a quick random ID and show success
    const randomId = Math.random().toString(36).substring(2, 8);
    setInviteIdCreated(randomId);
  };

  const handleViewDemo = (id: string) => {
    window.location.href = `?invite=${id}`;
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
            <span className="text-sm font-semibold text-gray-400 font-mono tracking-wider uppercase hidden sm:block">
              Dashboard
            </span>
          </div>

          {/* User Email & Logout */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-mono bg-white/[0.02] border border-white/[0.06] px-3 py-1.5 rounded-full">
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

      {/* Main Body */}
      <main className="relative max-w-5xl mx-auto w-full px-6 py-12 sm:py-16 flex-grow z-10 space-y-10">
        
        {/* Welcome Section */}
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">Selamat Datang</span>
          <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Halo, {email.split("@")[0]} 👋
          </h1>
          <p className="text-sm text-gray-400 font-light">
            Kelola seluruh undangan digital premium dan tema eksklusif Anda dari satu kontrol panel terpadu.
          </p>
        </div>

        {/* Empty State Card */}
        <div className="p-8 sm:p-12 bg-white/[0.01] border border-dashed border-white/[0.08] rounded-3xl text-center space-y-6 max-w-2xl mx-auto shadow-inner relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-indigo-500/10"></div>
          
          <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.04] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <span className="text-3xl">✉️</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Belum ada undangan</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              Anda belum memiliki undangan aktif. Buat undangan digital pertamamu dan undang kerabat dengan tampilan premium instan!
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition-all cursor-pointer active:scale-[0.98]"
          >
            ➕ Buat Undangan Baru
          </button>
        </div>

        {/* Demo Section */}
        <div className="border-t border-white/[0.04] pt-10 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Lihat Demo Tema Aktif (Sample Theme)</h3>
            <p className="text-xs text-gray-400">Pilih ID berikut untuk melihat preview data undangan yang dikirim ke penampil tema (Runtime):</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white/[0.02] border border-white/[0.04] hover:border-indigo-500/20 rounded-2xl flex flex-col justify-between gap-4 transition-all group">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-semibold">Demo ID: abc123</span>
                <h4 className="text-base font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">Pernikahan Budi & Ani</h4>
                <p className="text-xs text-gray-400 mt-1">Menggunakan template pernikahan premium dengan visualisasi tanggal & lokasi.</p>
              </div>
              <button
                onClick={() => handleViewDemo("abc123")}
                className="w-full sm:w-auto self-start px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-lg transition-all border border-indigo-500/20"
              >
                Lihat Tema ↗
              </button>
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/20 rounded-2xl flex flex-col justify-between gap-4 transition-all group">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">Demo ID: xyz789</span>
                <h4 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">Sweet 17th Clara Olivia</h4>
                <p className="text-xs text-gray-400 mt-1">Menggunakan template pesta ulang tahun remaja modern.</p>
              </div>
              <button
                onClick={() => handleViewDemo("xyz789")}
                className="w-full sm:w-auto self-start px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-lg transition-all border border-amber-500/20"
              >
                Lihat Tema ↗
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Create Modal Simulation */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-[#0f0f15] border border-white/[0.08] rounded-2xl shadow-2xl relative">
            <button 
              onClick={() => { setShowCreateModal(false); setInviteIdCreated(null); setNewInviteName(""); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white font-mono text-sm cursor-pointer"
            >
              ✕
            </button>

            {!inviteIdCreated ? (
              <form onSubmit={handleCreateInvite} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Buat Undangan Baru</h3>
                  <p className="text-xs text-gray-400">Simulasikan penambahan undangan digital baru Anda.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400 font-mono uppercase">Nama Undangan / Acara</label>
                  <input
                    type="text"
                    required
                    value={newInviteName}
                    onChange={(e) => setNewInviteName(e.target.value)}
                    placeholder="Contoh: Pernikahan Kevin & Viona"
                    className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/[0.08] focus:border-indigo-500 rounded-lg text-sm text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all shadow-md active:scale-[0.98]"
                >
                  Proses Pembuatan (Simulasi)
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <span className="text-3xl">🎉</span>
                <h3 className="text-lg font-bold text-white">Undangan Sukses Dibuat!</h3>
                <p className="text-xs text-gray-400">
                  Undangan <span className="text-indigo-400 font-semibold">"{newInviteName}"</span> berhasil ditambahkan ke database virtual.
                </p>
                <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl font-mono text-xs text-gray-300">
                  ID Undangan: <span className="text-amber-400 font-bold">{inviteIdCreated}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Custom mock handler
                      alert(`Gunakan ID "${inviteIdCreated}" untuk memproses pengiriman data di database nyata nanti pada Blok 7!`);
                    }}
                    className="flex-1 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    OK
                  </button>
                  <button
                    onClick={() => {
                      // Redirect to custom mock id to show custom view handling
                      window.location.href = `?invite=abc123`;
                    }}
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    Demo Runtime
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] py-6 z-10 bg-[#07070a]/90">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[10px] text-gray-500 font-mono">
            &copy; 2026 JoinMe Ecosystem. Signed in as admin.
          </p>
          <div className="flex gap-4 text-[10px] font-mono">
            <a href="#" className="text-gray-500 hover:text-gray-300">Docs</a>
            <a href="#" className="text-gray-500 hover:text-gray-300">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
