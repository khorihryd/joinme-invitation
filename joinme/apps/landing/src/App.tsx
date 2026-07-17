import { useState } from "react";

export default function App() {
  const handleNavigate = (page: string) => {
    // Elegant routing that works beautifully on any port, especially the platform's port 3000
    window.location.href = `?page=${page}`;
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-gray-100 font-sans flex flex-col justify-between overflow-x-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="relative border-b border-white/[0.04] backdrop-blur-md bg-[#0d0d11]/80 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="text-white font-bold text-xl font-mono">J</span>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">Join<span className="text-amber-400">Me</span></span>
              <span className="text-[9px] font-mono text-gray-450 block tracking-wider uppercase leading-none">Invitation Ecosystem</span>
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavigate("login")} 
              className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              Masuk
            </button>
            <button 
              onClick={() => handleNavigate("register")} 
              className="px-5 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/15 cursor-pointer active:scale-[0.98]"
            >
              Daftar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-20 sm:py-32 flex-grow flex flex-col items-center text-center justify-center z-10">
        <div className="space-y-8 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm shadow-inner animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">✨ Solusi Undangan Pernikahan Premium</span>
          </div>

          {/* Slogan */}
          <h1 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-white leading-[1.1]">
            Kirim Undangan Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-indigo-400">Mewah & Elegan</span> dalam 5 Menit
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
            Hadirkan kesan pertama yang memukau bagi para tamu undangan Anda. Dilengkapi dengan galeri foto momen indah, hitung mundur hari bahagia, pemutar musik romantis otomatis, kado digital, serta konfirmasi kehadiran RSVP yang instan dan praktis.
          </p>

          {/* CTA Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => handleNavigate("register")} 
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-base rounded-2xl shadow-xl shadow-amber-500/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              Mulai Buat Gratis
            </button>
            <button 
              onClick={() => handleNavigate("register")} 
              className="w-full sm:w-auto px-10 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white font-semibold text-base rounded-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              Lihat Contoh Tema
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 text-center max-w-2xl mx-auto">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-sans">10.000+</span>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">Pasangan Berbahagia</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans">5 Menit</span>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">Pembuatan Instan</p>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans">Mewah</span>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">Desain & Tipografi Eksklusif</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] py-8 z-10 bg-[#07070a]/90">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-gray-500 font-mono">
            &copy; 2026 JoinMe Ecosystem. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 font-mono transition-colors">Syarat Ketentuan</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 font-mono transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-xs text-gray-500 hover:text-indigo-400 font-mono transition-colors">Theme Marketplace ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
