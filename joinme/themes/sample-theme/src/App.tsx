import { useInvitation, Countdown, RSVP } from "@joinme/theme-sdk";

export default function App() {
  const { data, loading, error } = useInvitation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d11] text-amber-100">
        <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d11] text-red-400 p-6 text-center">
        <div className="max-w-md p-6 bg-red-950/20 border border-red-900/40 rounded-2xl">
          <p className="font-semibold">Error Loading Invitation Theme</p>
          <p className="text-sm text-red-300/80 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d11] text-gray-400">
        <p>No invitation data found.</p>
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
    <div className="min-h-screen bg-[#0d0d11] text-gray-100 relative overflow-hidden flex items-center justify-center p-4 sm:p-8 font-sans">
      {/* Background Decorative Circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-[#14141a]/80 backdrop-blur-md border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
        {/* Top Decorative Border */}
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-indigo-500"></div>

        <div className="p-8 sm:p-16 space-y-12 text-center">
          {/* Subtitle / Category */}
          <div className="space-y-3 animate-fade-in">
            <span className="text-xs font-mono tracking-[0.25em] text-amber-400/90 uppercase">The Celebration of Love</span>
            <div className="h-px w-12 bg-amber-500/30 mx-auto"></div>
          </div>

          {/* Event Title */}
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            {data.eventName}
          </h1>

          {/* Invitation Quote */}
          <p className="text-sm sm:text-base italic text-gray-400 max-w-md mx-auto leading-relaxed">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
          </p>

          {/* Countdown Section */}
          <div className="py-2 animate-fade-in">
            <Countdown targetDate={data.date} />
          </div>

          <div className="h-px bg-white/[0.06] w-full"></div>

          {/* Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            <div className="space-y-2 p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block">Tanggal & Waktu</span>
              <p className="text-base font-semibold text-white">{formattedDate}</p>
              <p className="text-xs text-gray-400 mt-1">Pukul 10:00 WIB - Selesai</p>
            </div>

            <div className="space-y-2 p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase block">Lokasi Acara</span>
              <p className="text-base font-semibold text-white">{data.location}</p>
              <button 
                className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                onClick={() => alert("Membuka Peta...")}
              >
                Lihat Peta Petunjuk ↗
              </button>
            </div>
          </div>

          <div className="h-px bg-white/[0.06] w-full"></div>

          {/* Host Name Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase block">Kami Yang Mengundang</span>
            <p className="text-xl font-medium text-amber-100/90">{data.hostName}</p>
          </div>

          {/* RSVP Section */}
          <div className="space-y-4 text-left max-w-md mx-auto animate-fade-in">
            <h3 className="text-center text-xs font-semibold text-amber-400 font-mono uppercase tracking-widest">Konfirmasi Kehadiran</h3>
            <RSVP guestId={data.guestId || "default-guest"} />
          </div>

          <div className="h-px bg-white/[0.06] w-full"></div>

          {/* Action Buttons Frame */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-8 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium rounded-xl transition-all duration-300 active:scale-[0.98]">
              Kirim Hadiah Digital
            </button>
          </div>
        </div>

        {/* Bottom Decorative Pattern */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-yellow-400 to-amber-500 opacity-30"></div>
      </div>
    </div>
  );
}
