import { useInvitation } from "@joinme/theme-sdk";

export default function App() {
  const { data, loading, error } = useInvitation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070a] text-amber-500">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-amber-500/10 border-t-amber-500 rounded-full animate-spin"></div>
          <div className="absolute w-6 h-6 border-2 border-indigo-500/10 border-b-indigo-500 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070a] text-red-400 p-6 text-center">
        <div className="max-w-md p-8 bg-red-950/20 border border-red-900/40 rounded-3xl shadow-2xl backdrop-blur-md">
          <p className="text-xs font-mono tracking-widest text-red-500 uppercase font-semibold">Luxury Theme Engine</p>
          <h2 className="text-xl font-bold text-white mt-2">Gagal Memuat Undangan</h2>
          <p className="text-sm text-red-300/80 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070a] text-gray-500">
        <p className="font-mono text-xs uppercase tracking-widest">No Invitation Loaded</p>
      </div>
    );
  }

  const dateObj = new Date(data.date);
  const formattedDate = isNaN(dateObj.getTime())
    ? data.date
    : dateObj.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="min-h-screen bg-[#060608] text-gray-100 relative overflow-hidden flex items-center justify-center p-4 sm:p-12 font-sans select-none">
      
      {/* Luxury Animated Orbs & Background effects */}
      <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/[0.04] rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative luxury sparkles (using simple rounded circles) */}
      <div className="absolute top-12 left-10 w-2 h-2 bg-amber-400 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute bottom-16 right-12 w-3 h-3 bg-amber-300 rounded-full opacity-25 animate-pulse"></div>
      <div className="absolute top-1/3 right-16 w-1.5 h-1.5 bg-yellow-450 rounded-full opacity-20"></div>

      {/* Main Container: Premium Glassmorphism with Luxury Gold Accent Borders */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#14141a]/90 to-[#0e0e12]/95 backdrop-blur-xl border border-amber-500/20 rounded-[40px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] shadow-black/80">
        
        {/* Top Gold Ornament Frame */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-amber-500/20 rounded-full"></div>

        <div className="p-8 sm:p-20 space-y-12 text-center relative z-10">
          
          {/* Crown / Premium Badge */}
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full border border-amber-500/30 flex items-center justify-center bg-gradient-to-tr from-amber-500/5 to-amber-500/20 shadow-inner shadow-amber-500/10 animate-fade-in">
              <span className="text-xl text-amber-400">👑</span>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] text-amber-400 uppercase font-semibold block">Exclusive Premium Theme</span>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mx-auto"></div>
            </div>
          </div>

          {/* Luxury Event Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-200">
                {data.eventName}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/50 uppercase tracking-widest font-serif">You Are Cordially Invited</p>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/20"></div>
            <span className="text-xs text-amber-500">✨</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/20"></div>
          </div>

          {/* Invitation Quote */}
          <p className="text-sm sm:text-base font-serif italic text-gray-300 max-w-md mx-auto leading-relaxed px-4">
            "Maka nikmat Tuhanmu yang manakah yang kamu dustakan? Pertemuan dua insan yang saling melengkapi dalam ikatan suci dan penuh berkah."
          </p>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent w-full"></div>

          {/* Premium Details Cards with Intense Glassmorphic Styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="space-y-3 p-6 bg-white/[0.01] border border-amber-500/10 hover:border-amber-500/20 rounded-3xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/[0.02] rounded-full blur-xl pointer-events-none"></div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold block">📅 TANGGAL & WAKTU</span>
              <p className="text-base font-bold text-white font-serif leading-snug">{formattedDate}</p>
              <p className="text-xs text-amber-100/60 font-mono">Pukul 10:00 WIB - Selesai</p>
            </div>

            <div className="space-y-3 p-6 bg-white/[0.01] border border-indigo-500/10 hover:border-indigo-500/20 rounded-3xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/[0.02] rounded-full blur-xl pointer-events-none"></div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-semibold block">📍 LOKASI ACARA</span>
              <p className="text-base font-bold text-white font-serif leading-snug">{data.location}</p>
              <button 
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 mt-1 cursor-pointer"
                onClick={() => alert("Membuka Peta Premium (Simulated)...")}
              >
                Navigasi Peta Google Maps ↗
              </button>
            </div>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent w-full"></div>

          {/* Host Name Section */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase block">Turut Mengundang</span>
            <p className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400">{data.hostName}</p>
          </div>

          {/* Action Buttons Frame with Luxury Styling */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.98] cursor-pointer">
              💍 Konfirmasi Kehadiran (RSVP)
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-white/[0.02] hover:bg-white/[0.05] border border-amber-500/20 text-amber-200 font-semibold text-sm rounded-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer">
              🎁 Amplop Digital
            </button>
          </div>
        </div>

        {/* Bottom Gold Ornament Frame */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-60"></div>
      </div>
    </div>
  );
}
