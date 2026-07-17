import React, { useState, useRef } from "react";
import { useInvitation, Countdown, RSVP, Gallery, Gift, MusicPlayer } from "@joinme/theme-sdk";

export default function App() {
  const { data, loading, error } = useInvitation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = 6;

  if (loading) {
    return (
      <div id="reels-loading" className="min-h-screen flex items-center justify-center bg-[#07030a] text-pink-400">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
          <span className="text-xs font-mono tracking-widest uppercase text-pink-500/80">MEMUAT CERITA...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="reels-error" className="min-h-screen flex items-center justify-center bg-[#07030a] text-red-400 p-6 text-center">
        <div className="max-w-md p-6 bg-red-950/20 border border-red-900/40 rounded-3xl backdrop-blur-md">
          <p className="font-bold text-lg">Gagal Memuat Cerita</p>
          <p className="text-sm text-red-300/80 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div id="reels-empty" className="min-h-screen flex items-center justify-center bg-[#07030a] text-gray-400">
        <p>Data undangan tidak ditemukan.</p>
      </div>
    );
  }

  // Handle slide changes safely
  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // Swipe gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Minimum swipe distance of 50px
    if (diffX > 50) {
      nextSlide(); // Swiped left -> Go next
    } else if (diffX < -50) {
      prevSlide(); // Swiped right -> Go previous
    }
    touchStartX.current = null;
  };

  // Format date helper
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
      id="reels-app-root"
      className="fixed inset-0 w-full h-full bg-[#07030a] text-gray-100 flex flex-col items-center justify-center overflow-hidden font-sans select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Immersive glowing background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Container mirroring mobile story viewport ratio */}
      <div 
        id="reels-viewport-container"
        className="relative w-full max-w-[480px] h-full sm:h-[85vh] sm:rounded-[36px] bg-[#12071a]/90 sm:border border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
      >
        {/* Instagram-style segmented progress bar */}
        <div id="reels-progress-bar" className="absolute top-4 left-4 right-4 z-50 flex gap-1 px-1">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer focus:outline-none"
              aria-label={`Buka halaman ${idx + 1}`}
            >
              <div
                className={`h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300 ${
                  idx <= currentSlideIndex ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Swipe left/right zones (Touch fallbacks) */}
        <div 
          id="reels-nav-zone-left"
          onClick={prevSlide}
          className="absolute left-0 top-16 bottom-16 w-[15%] z-30 cursor-w-resize"
          title="Ketuk untuk kembali"
        />
        <div 
          id="reels-nav-zone-right"
          onClick={nextSlide}
          className="absolute right-0 top-16 bottom-16 w-[15%] z-30 cursor-e-resize"
          title="Ketuk untuk lanjut"
        />

        {/* Main Stories Carousel Container */}
        <div 
          id="reels-carousel-wrapper"
          className="flex-1 flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
        >
          {/* SLIDE 0: Cover */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between p-8 pt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#12071a]/40 via-transparent to-[#12071a] z-0 pointer-events-none" />
            
            {/* Top branding */}
            <div className="text-center z-10 mt-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-pink-400 uppercase">You Are Cordially Invited</span>
            </div>

            {/* Couple / Event Title */}
            <div className="text-center z-10 space-y-3 my-auto">
              <div className="inline-block p-4 bg-pink-500/10 border border-pink-500/20 rounded-full mb-2 animate-pulse">
                <span className="text-3xl">💖</span>
              </div>
              <h1 className="text-4xl font-serif font-black tracking-tight text-white leading-tight drop-shadow-md">
                {data.eventName}
              </h1>
              <p className="text-xs font-mono text-pink-300 uppercase tracking-widest mt-2">{data.hostName}</p>
            </div>

            {/* Call to action */}
            <div className="text-center z-10 space-y-4 pb-4">
              <button
                onClick={nextSlide}
                className="py-3 px-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-full uppercase tracking-widest shadow-lg shadow-pink-500/20 transition-all cursor-pointer animate-bounce"
              >
                Buka Cerita Undangan ↗
              </button>
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">Geser kiri untuk menjelajah</p>
            </div>
          </div>

          {/* SLIDE 1: Detail Acara */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between p-8 pt-16 relative overflow-y-auto scrollbar-thin">
            <div className="my-auto space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase">WAKTU & TEMPAT</span>
                <h2 className="text-2xl font-serif font-bold text-white">Detail Acara</h2>
                <div className="h-0.5 w-8 bg-pink-500 mx-auto mt-2"></div>
              </div>

              {/* Date Card */}
              <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-3xl space-y-3 text-center">
                <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase block">Tanggal Pelaksanaan</span>
                <p className="text-lg font-bold text-white">{formattedDate}</p>
                <p className="text-xs text-gray-400">Pukul 10:00 WIB - Selesai</p>
              </div>

              {/* Location Card */}
              <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-3xl space-y-3 text-center">
                <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase block">Lokasi Acara</span>
                <p className="text-base font-bold text-white">{data.location}</p>
                <p className="text-xs text-gray-400">Gedung Pertemuan Utama</p>
                
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(data.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  📍 Buka Petunjuk Peta
                </a>
              </div>
            </div>

            <div className="text-center pb-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Ketuk bagian kanan layar untuk lanjut</p>
            </div>
          </div>

          {/* SLIDE 2: Countdown */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between p-8 pt-16 relative">
            <div className="my-auto space-y-8 text-center">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase">HITUNG MUNDUR</span>
                <h2 className="text-2xl font-serif font-bold text-white">Hari Bahagia</h2>
                <div className="h-0.5 w-8 bg-pink-500 mx-auto mt-2"></div>
              </div>

              <div className="py-2">
                <Countdown targetDate={data.date} />
              </div>

              {/* Romantic quote */}
              <div className="p-5 bg-pink-500/5 border border-pink-500/10 rounded-2xl max-w-sm mx-auto">
                <p className="text-xs italic text-pink-200/80 leading-relaxed">
                  "Menghitung setiap detik berharga menuju babak baru kehidupan bersama dalam bingkai restu, kasih, dan kesetiaan abadi."
                </p>
              </div>
            </div>

            <div className="text-center pb-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Ketuk bagian kanan layar untuk lanjut</p>
            </div>
          </div>

          {/* SLIDE 3: Galeri */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between p-6 pt-16 relative overflow-y-auto scrollbar-thin">
            <div className="my-auto space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase">GALERI FOTO</span>
                <h2 className="text-2xl font-serif font-bold text-white">Momen Indah</h2>
                <div className="h-0.5 w-8 bg-pink-500 mx-auto mt-2"></div>
              </div>

              {/* SDK Gallery */}
              <div className="max-h-[50vh] overflow-y-auto p-1 rounded-2xl scrollbar-thin">
                <Gallery images={data.gallery} className="grid-cols-2 gap-3" />
              </div>
            </div>

            <div className="text-center pb-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Ketuk bagian kanan layar untuk lanjut</p>
            </div>
          </div>

          {/* SLIDE 4: RSVP */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between p-6 pt-16 relative overflow-y-auto scrollbar-thin">
            <div className="my-auto space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase">KONFIRMASI KEHADIRAN</span>
                <h2 className="text-2xl font-serif font-bold text-white">Konfirmasi RSVP</h2>
                <div className="h-0.5 w-8 bg-pink-500 mx-auto mt-2"></div>
              </div>

              {/* SDK RSVP */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-4 sm:p-6 text-left shadow-xl">
                <RSVP guestId={data.guestId || "default-guest"} />
              </div>
            </div>

            <div className="text-center pb-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Ketuk bagian kanan layar untuk lanjut</p>
            </div>
          </div>

          {/* SLIDE 5: Gift */}
          <div className="w-full h-full flex-shrink-0 flex flex-col justify-between p-6 pt-16 relative overflow-y-auto scrollbar-thin">
            <div className="my-auto space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase">KIRIM HADIAH</span>
                <h2 className="text-2xl font-serif font-bold text-white">Kado Digital</h2>
                <div className="h-0.5 w-8 bg-pink-500 mx-auto mt-2"></div>
                <p className="text-[10px] text-gray-400 max-w-xs mx-auto mt-2">
                  Terima kasih atas segala bentuk perhatian dan doa restu Anda yang sangat berharga bagi kami.
                </p>
              </div>

              {/* SDK Gift */}
              <div className="p-1 max-h-[50vh] overflow-y-auto scrollbar-thin">
                <Gift items={data.gift || []} />
              </div>
            </div>

            {/* Ending CTA and reset */}
            <div className="text-center pb-4 space-y-3">
              <button
                onClick={() => setCurrentSlideIndex(0)}
                className="text-[10px] font-bold text-pink-400 hover:text-pink-300 font-mono uppercase tracking-widest border border-pink-500/20 px-3 py-1.5 rounded-full bg-pink-500/5 cursor-pointer"
              >
                🔄 Ulangi Cerita
              </button>
            </div>
          </div>
        </div>

        {/* Custom Navigation indicators at the bottom */}
        <div id="reels-bottom-indicators" className="absolute bottom-4 left-4 right-4 z-40 flex justify-between items-center px-1">
          {/* Arrow navigation handles */}
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`w-9 h-9 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white font-bold transition-all cursor-pointer ${
              currentSlideIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-pink-500/20 hover:border-pink-500/30 active:scale-90"
            }`}
            aria-label="Kembali"
          >
            ←
          </button>

          {/* Slide index label */}
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-black/30 border border-white/5 rounded-full px-3 py-1">
            Story {currentSlideIndex + 1} / {totalSlides}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`w-9 h-9 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white font-bold transition-all cursor-pointer ${
              currentSlideIndex === totalSlides - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-pink-500/20 hover:border-pink-500/30 active:scale-90"
            }`}
            aria-label="Lanjut"
          >
            →
          </button>
        </div>
      </div>

      {/* Background Music player via SDK */}
      <MusicPlayer 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        autoPlay={true} 
      />
    </div>
  );
}
