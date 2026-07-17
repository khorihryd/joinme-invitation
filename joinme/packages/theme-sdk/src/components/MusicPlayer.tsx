import React, { useRef, useEffect } from "react";
import { useMusic } from "../hooks/useMusic";

export interface MusicPlayerProps {
  src: string;
  autoPlay?: boolean;
  className?: string;
}

export function MusicPlayer({ src, autoPlay = false, className = "" }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, togglePlay, volume, setVolume } = useMusic(audioRef);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && autoPlay) {
      // Attempt autoplay
      const startPlayback = () => {
        audio.play().catch((err) => {
          console.warn("Autoplay was prevented by browser. User interaction is required.", err);
        });
      };

      // Some browsers allow play on first click or when page is loaded
      startPlayback();
    }
  }, [src, autoPlay]);

  return (
    <div 
      id="music-player-container" 
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 p-2.5 bg-slate-950/85 hover:bg-slate-900/95 border border-white/10 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 group ${className}`}
    >
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={src} 
        loop 
        preload="auto"
      />

      {/* Floating Animated Play Button */}
      <button
        id="music-player-toggle"
        onClick={togglePlay}
        className={`relative w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg transition-all duration-300 active:scale-95 cursor-pointer`}
        aria-label={isPlaying ? "Pause Musik" : "Putar Musik"}
      >
        {/* Pulsing ring animation when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping"></span>
        )}

        {isPlaying ? (
          /* Pause Icon */
          <svg className="w-4 h-4 fill-current z-10 animate-pulse" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          /* Play Icon */
          <svg className="w-4 h-4 fill-current translate-x-[1px] z-10" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Slide-out Volume Controller */}
      <div 
        id="music-player-volume-panel"
        className="flex items-center gap-2 w-0 overflow-hidden group-hover:w-24 group-hover:pr-3 transition-all duration-300 ease-out"
      >
        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
        <input 
          id="music-player-volume-slider"
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 accent-indigo-500 bg-white/10 h-1 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
}
