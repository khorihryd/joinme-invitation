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
    const linkId = "modern-minimalist-fonts";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-black font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
          <p className="text-xs font-mono tracking-widest uppercase">Memuat Tema Modern Minimalist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-red-600 p-6 font-sans">
        <div className="max-w-md p-8 bg-white border border-black/5 rounded-3xl text-center shadow-xl">
          <h3 className="font-bold text-lg text-black">Gagal Memuat Undangan</h3>
          <p className="text-sm text-red-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-gray-400 font-sans">
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
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#fafafa] text-black relative overflow-x-hidden p-6 sm:p-12 md:p-16 selection:bg-black selection:text-white"
    >
      <div className="max-w-3xl mx-auto space-y-20 relative">
        
        {/* Cover Section */}
        <div className="relative group rounded-2xl overflow-hidden p-px bg-black/10">
          <Cover 
            eventName={data.eventName}
            hostName={data.hostName}
            date={formattedDate}
            location={data.location}
            className="bg-[#ffffff] !border-0 font-sans !text-black !bg-opacity-100 shadow-none !rounded-2xl"
          />
        </div>

        {/* Minimalist welcome message with generous white space */}
        <div className="text-center max-w-lg mx-auto space-y-6 py-8">
          <span className="text-black text-xs font-mono tracking-[0.4em] uppercase block">INVITATION / ATTE</span>
          <p className="text-base font-normal text-gray-600 leading-relaxed tracking-tight">
            Kami mengundang Anda untuk bergabung bersama kami dalam perayaan momen berharga ini. Kehadiran Anda adalah suatu kehormatan yang luar biasa bagi kami.
          </p>
          <div className="h-[2px] bg-black w-10 mx-auto mt-6"></div>
        </div>

        {/* Story Section */}
        {data.story && (
          <div className="space-y-6">
            <h3 className="text-center text-xs font-bold text-black font-mono uppercase tracking-[0.3em]">01 / THE STORY</h3>
            <Story 
              title={data.story.title} 
              content={data.story.content} 
              className="bg-white border-black/10 !text-black !rounded-xl shadow-none"
            />
          </div>
        )}

        {/* Countdown Section */}
        <div className="space-y-6">
          <h3 className="text-center text-xs font-bold text-black font-mono uppercase tracking-[0.3em]">02 / COUNTDOWN</h3>
          <div className="max-w-md mx-auto">
            <Countdown 
              targetDate={data.date} 
              className="!gap-2"
              itemClassName="!bg-white !border-black/5 rounded-xl shadow-none"
              labelClassName="!text-black/60 font-mono text-[10px]"
              numberClassName="!text-black font-bold"
            />
          </div>
        </div>

        {/* Timeline Section */}
        {data.timeline && data.timeline.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-center text-xs font-bold text-black font-mono uppercase tracking-[0.3em]">03 / THE SCHEDULE</h3>
            <Timeline 
              items={data.timeline} 
              className="!border-l-black"
            />
          </div>
        )}

        {/* Gallery Section */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-black text-xs font-mono tracking-widest uppercase block">04 / IMAGES</span>
              <h3 className="text-2xl font-bold tracking-tight text-black">GALERI FOTO</h3>
            </div>
            <Gallery 
              images={data.gallery} 
              className="grid-cols-2 md:grid-cols-3 gap-2"
              imageClassName="border border-black/5 rounded-lg filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        )}

        {/* RSVP Section */}
        <div className="space-y-8 max-w-md mx-auto">
          <div className="text-center space-y-2">
            <span className="text-black text-xs font-mono tracking-widest uppercase block">05 / CONFIRMATION</span>
            <h3 className="text-2xl font-bold tracking-tight text-black">KONFIRMASI RSVP</h3>
          </div>
          <RSVP 
            guestId={data.guestId || "modern-guest"} 
            className="!bg-white !border-black/10 !rounded-2xl shadow-none p-8 text-black"
            inputClassName="border-0 border-b border-black/20 focus:border-black focus:ring-0 rounded-none bg-transparent"
            buttonClassName="!bg-black !text-white !font-bold hover:bg-gray-900 active:scale-[0.98] cursor-pointer rounded-lg uppercase tracking-wider text-xs py-3"
          />
        </div>

        {/* Gift Section */}
        {data.gift && data.gift.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-black text-xs font-mono tracking-widest uppercase block">06 / GIFTING</span>
              <h3 className="text-2xl font-bold tracking-tight text-black">REGISTRASI REKENING</h3>
            </div>
            <Gift 
              items={data.gift} 
              className="grid-cols-1 sm:grid-cols-2 gap-4"
            />
          </div>
        )}

        {/* Outro / Footnotes */}
        <div className="text-center py-12 space-y-6 border-t border-black/10">
          <p className="text-sm font-normal text-gray-500 max-w-md mx-auto leading-relaxed">Terima kasih atas perhatian dan doa baik yang tiada henti untuk mengiringi langkah baru kami.</p>
          <p className="text-black text-xl font-bold tracking-widest">RESPECTFULLY</p>
          <span className="text-[10px] text-gray-400 font-mono tracking-widest block uppercase mt-6">HOSTED BY</span>
          <p className="text-md font-bold text-black mt-1 uppercase tracking-wider">{data.hostName}</p>
        </div>

      </div>

      {/* Modern minimal music player */}
      <MusicPlayer 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
        autoPlay={true}
        className="!border-black/10 !bg-white/95 !text-black shadow-md rounded-xl"
      />
    </div>
  );
}
