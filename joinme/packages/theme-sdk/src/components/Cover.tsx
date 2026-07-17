import React from "react";

export interface CoverProps {
  eventName: string;
  hostName: string;
  date: string;
  location: string;
  className?: string;
}

export function Cover({ eventName, hostName, date, location, className = "" }: CoverProps) {
  return (
    <div 
      id="cover-container" 
      className={`relative min-h-[80vh] flex flex-col items-center justify-center text-center p-6 md:p-12 overflow-hidden bg-slate-950/40 rounded-3xl border border-white/[0.06] backdrop-blur-sm shadow-2xl transition-all ${className}`}
    >
      {/* Decorative corners */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 rounded-tl-lg"></div>
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20 rounded-tr-lg"></div>
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20 rounded-bl-lg"></div>
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 rounded-br-lg"></div>

      {/* Main Content */}
      <div id="cover-content" className="space-y-6 max-w-2xl z-10 animate-fade-in">
        <span id="cover-sub-title" className="text-xs md:text-sm font-semibold font-mono tracking-widest text-amber-400 uppercase">
          Undangan Digital
        </span>

        <h1 
          id="cover-event-name" 
          className="text-4xl md:text-6xl font-bold font-sans tracking-tight text-white drop-shadow-xl leading-tight"
        >
          {eventName}
        </h1>

        <div className="w-16 h-0.5 bg-amber-400/60 mx-auto rounded-full"></div>

        <p id="cover-host-name" className="text-lg md:text-2xl font-light text-amber-100/90 tracking-wide font-serif italic">
          {hostName}
        </p>

        <div id="cover-details" className="pt-6 space-y-2 text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase">
          <p id="cover-date" className="font-semibold text-white">{date}</p>
          <p id="cover-location" className="text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
}
