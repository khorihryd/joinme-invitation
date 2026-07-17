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
    const linkId = "botanical-garden-fonts";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Nunito:wght@300;400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f5] text-[#2f5233] font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#2f5233]/30 border-t-[#2f5233] rounded-full animate-spin"></div>
          <p className="text-xs font-mono tracking-widest uppercase">Memuat Tema Botanical Garden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f5] text-red-750 p-6 font-sans">
        <div className="max-w-md p-8 bg-white border border-red-200 rounded-3xl text-center shadow-xl">
          <h3 className="font-bold text-lg text-gray-800">Gagal Memuat Undangan</h3>
          <p className="text-sm text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f5] text-gray-500 font-sans">
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
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="min-h-screen bg-[#f3f6f3] text-gray-700 relative overflow-x-hidden p-4 sm:p-8 md:p-12 selection:bg-[#2f5233]/20"
    >
      {/* Botanical Organic Background SVG patterns or circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#e3eae4] rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e1eae2] rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto space-y-16 relative">
        
        {/* Cover Section */}
        <div className="relative group rounded-[32px] overflow-hidden p-1.5 bg-gradient-to-br from-[#2f5233]/20 via-[#8fa89b]/10 to-[#2f5233]/15 shadow-xl">
          <Cover 
            eventName={data.eventName}
            hostName={data.hostName}
            date={formattedDate}
            location={data.location}
            className="bg-gradient-to-b from-[#f9faf9] to-[#edf2ed] !border-0 font-serif !text-gray-800 !bg-opacity-95"
          />
        </div>

        {/* Botanical welcome message */}
        <div className="text-center max-w-xl mx-auto space-y-4 py-6">
          <span className="text-[#2f5233] text-xs font-mono tracking-[0.3em] uppercase block">Assalamu'alaikum Wr. Wb.</span>
          <p className="text-base font-light text-gray-600 leading-relaxed font-serif italic">
            Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan penuh syukur, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara kami.
          </p>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#2f5233]/20 to-transparent w-40 mx-auto mt-4"></div>
        </div>

        {/* Story Section */}
        {data.story && (
          <div className="space-y-6">
            <h3 className="text-center text-xs font-semibold text-[#2f5233] font-mono uppercase tracking-[0.25em]">A Little Love Story</h3>
            <Story 
              title={data.story.title} 
              content={data.story.content} 
              className="bg-white/80 border-[#2f5233]/10 !text-gray-800 !rounded-[28px] shadow-sm"
            />
          </div>
        )}

        {/* Countdown Section */}
        <div className="space-y-6">
          <h3 className="text-center text-xs font-semibold text-[#2f5233] font-mono uppercase tracking-[0.25em]">Menghitung Hari</h3>
          <div className="p-1 rounded-[24px] bg-gradient-to-b from-[#8fa89b]/30 to-transparent max-w-md mx-auto">
            <Countdown 
              targetDate={data.date} 
              className="!gap-4"
              itemClassName="!bg-white !border-[#2f5233]/10 rounded-2xl shadow-sm"
              labelClassName="!text-[#2f5233]/80"
              numberClassName="!text-[#2f5233]"
            />
          </div>
        </div>

        {/* Timeline Section */}
        {data.timeline && data.timeline.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-center text-xs font-semibold text-[#2f5233] font-mono uppercase tracking-[0.25em]">Agenda Acara</h3>
            <Timeline 
              items={data.timeline} 
              className="!border-l-[#2f5233]/30"
            />
          </div>
        )}

        {/* Gallery Section */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[#2f5233] text-xs font-mono tracking-widest uppercase block">Our Gallery</span>
              <h3 className="text-3xl font-bold font-serif text-[#2f5233] tracking-tight">Momen Bahagia</h3>
            </div>
            <Gallery 
              images={data.gallery} 
              className="grid-cols-2 md:grid-cols-3 gap-3"
              imageClassName="border-4 border-white shadow-md hover:shadow-xl hover:scale-105"
            />
          </div>
        )}

        {/* RSVP Section */}
        <div className="space-y-8 max-w-xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[#2f5233] text-xs font-mono tracking-widest uppercase block">RSVP</span>
            <h3 className="text-2xl font-bold font-serif text-[#2f5233] tracking-tight">Konfirmasi Kehadiran</h3>
          </div>
          <RSVP 
            guestId={data.guestId || "botanical-guest"} 
            className="!bg-white/90 !border-[#2f5233]/10 !rounded-3xl shadow-xl p-8 text-gray-800"
            inputClassName="border-[#2f5233]/20 focus:border-[#2f5233] focus:ring-[#2f5233]/20"
            buttonClassName="!bg-[#2f5233] !text-white !font-bold hover:bg-[#203a24] active:scale-[0.98] cursor-pointer"
          />
        </div>

        {/* Gift Section */}
        {data.gift && data.gift.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[#2f5233] text-xs font-mono tracking-widest uppercase block">E-Gift</span>
              <h3 className="text-2xl font-bold font-serif text-[#2f5233] tracking-tight">Amplop Digital</h3>
              <p className="text-xs text-gray-500 font-light max-w-sm mx-auto">Kehadiran Anda adalah hadiah utama. Namun jika ingin memberikan kado secara digital, Anda dapat mentransfer ke rekening di bawah ini.</p>
            </div>
            <Gift 
              items={data.gift} 
              className="grid-cols-1 sm:grid-cols-2 gap-6"
            />
          </div>
        )}

        {/* Outro / Footnotes */}
        <div className="text-center py-12 space-y-4 font-serif border-t border-[#2f5233]/10">
          <p className="text-sm font-light text-gray-500">Tiada kesan tanpa kehadiran Anda. Terima kasih atas doa restu yang Anda berikan.</p>
          <p className="text-[#2f5233] text-xl font-bold italic">Terima Kasih</p>
          <span className="text-[10px] text-gray-500 font-mono tracking-widest block uppercase mt-6 font-bold">Kami yang Mengundang</span>
          <p className="text-lg font-bold text-[#2f5233] mt-1">{data.hostName}</p>
        </div>

      </div>

      {/* Elegant Music Player */}
      <MusicPlayer 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
        autoPlay={true}
        className="!border-[#2f5233]/20 !bg-white/95 !text-[#2f5233] shadow-lg"
      />
    </div>
  );
}
