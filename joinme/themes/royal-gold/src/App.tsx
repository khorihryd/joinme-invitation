import React, { useEffect } from "react";
import {
  useInvitation,
  Cover,
  Countdown,
  RSVP,
  Gallery,
  MusicPlayer,
  Story,
  Timeline,
  Gift
} from "@joinme/theme-sdk";

export default function App() {
  const { data, loading, error } = useInvitation();

  // Inject beautiful Google Fonts
  useEffect(() => {
    const linkId = "royal-gold-fonts";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0a0b] text-[#d4af37] font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin"></div>
          <p className="text-xs font-mono tracking-widest uppercase">Memuat Tema Royal Gold...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0a0b] text-red-400 p-6 font-sans">
        <div className="max-w-md p-8 bg-red-950/20 border border-red-900/40 rounded-3xl text-center shadow-2xl">
          <h3 className="font-bold text-lg text-white">Gagal Memuat Undangan</h3>
          <p className="text-sm text-red-300 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0a0b] text-gray-400 font-sans">
        <p className="text-xs uppercase font-mono tracking-widest">Data undangan tidak ditemukan</p>
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
    <div 
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-[#0d0a0b] text-gray-200 relative overflow-x-hidden p-4 sm:p-8 md:p-12"
    >
      {/* Premium ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative Golden Pattern Corners on Main Container */}
      <div className="max-w-4xl mx-auto space-y-16 relative">
        
        {/* Cover Section */}
        <div className="relative group rounded-[32px] overflow-hidden p-0.5 bg-gradient-to-br from-[#d4af37]/30 via-transparent to-[#d4af37]/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <Cover 
            eventName={data.eventName}
            hostName={data.hostName}
            date={formattedDate}
            location={data.location}
            className="bg-gradient-to-b from-[#131011] to-[#0d0a0b] !border-0 font-serif"
          />
        </div>

        {/* Introduction / Welcome Message */}
        <div className="text-center max-w-xl mx-auto space-y-4 py-6">
          <span className="text-[#d4af37] text-xs font-mono tracking-[0.3em] uppercase block">Assalamu'alaikum Wr. Wb.</span>
          <p className="text-sm font-light text-gray-400 leading-relaxed font-serif italic">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i dalam perayaan suci penuh kebahagiaan kami.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent w-40 mx-auto mt-4"></div>
        </div>

        {/* Story Section */}
        {data.story && (
          <div className="space-y-6">
            <h3 className="text-center text-xs font-semibold text-[#d4af37] font-mono uppercase tracking-[0.25em]">Our Story</h3>
            <Story 
              title={data.story.title} 
              content={data.story.content} 
              className="bg-[#131011] border-[#d4af37]/15 !rounded-[28px]"
            />
          </div>
        )}

        {/* Countdown Section */}
        <div className="space-y-6">
          <h3 className="text-center text-xs font-semibold text-[#d4af37] font-mono uppercase tracking-[0.25em]">Save The Date</h3>
          <div className="p-1 rounded-[24px] bg-gradient-to-b from-[#d4af37]/10 to-transparent max-w-md mx-auto">
            <Countdown 
              targetDate={data.date} 
              className="!gap-4"
              itemClassName="!bg-[#131011] !border-[#d4af37]/15 rounded-2xl"
              labelClassName="!text-[#d4af37]/80"
            />
          </div>
        </div>

        {/* Timeline Section */}
        {data.timeline && data.timeline.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-center text-xs font-semibold text-[#d4af37] font-mono uppercase tracking-[0.25em]">Rundown Acara</h3>
            <Timeline 
              items={data.timeline} 
              className="!border-l-[#d4af37]/25"
            />
          </div>
        )}

        {/* Gallery Section */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase block">Captured Moments</span>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-white tracking-tight">Galeri Foto</h3>
            </div>
            <Gallery 
              images={data.gallery} 
              className="grid-cols-2 md:grid-cols-3 gap-3"
              imageClassName="border border-[#d4af37]/10 hover:border-[#d4af37]/30"
            />
          </div>
        )}

        {/* RSVP Section */}
        <div className="space-y-8 max-w-xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase block">Rsvp Confirmation</span>
            <h3 className="text-2xl font-bold font-serif text-white tracking-tight">Kehadiran Tamu</h3>
          </div>
          <RSVP 
            guestId={data.guestId || "royal-guest"} 
            className="!bg-[#131011] !border-[#d4af37]/20 !rounded-3xl shadow-2xl p-8"
            inputClassName="border-[#d4af37]/10 focus:border-[#d4af37] focus:ring-[#d4af37]/20"
            buttonClassName="!bg-gradient-to-r !from-[#d4af37] !to-[#b58e24] !text-[#0d0a0b] !font-extrabold hover:brightness-110 active:scale-[0.98]"
          />
        </div>

        {/* Gift Section */}
        {data.gift && data.gift.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[#d4af37] text-xs font-mono tracking-widest uppercase block">Love Gift</span>
              <h3 className="text-2xl font-bold font-serif text-white tracking-tight">Kirim Hadiah Digital</h3>
              <p className="text-xs text-gray-400 font-light max-w-sm mx-auto">Doa restu Anda adalah hadiah terindah, namun jika Anda ingin mengirimkan tanda kasih, Anda dapat melakukannya secara digital.</p>
            </div>
            <Gift 
              items={data.gift} 
              className="grid-cols-1 sm:grid-cols-2 gap-6"
            />
          </div>
        )}

        {/* Outro / Footnotes */}
        <div className="text-center py-12 space-y-4 font-serif border-t border-white/[0.04]">
          <p className="text-sm font-light text-gray-400">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
          <p className="text-[#d4af37] text-lg font-semibold italic">Terima Kasih</p>
          <span className="text-[10px] text-gray-600 font-mono tracking-widest block uppercase mt-6">Kami yang Berbahagia</span>
          <p className="text-base font-bold text-white mt-1">{data.hostName}</p>
        </div>

      </div>

      {/* Elegant Music Player */}
      <MusicPlayer 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        autoPlay={true}
        className="!border-[#d4af37]/25 !bg-[#0d0a0b]/90 text-[#d4af37]"
      />
    </div>
  );
}
