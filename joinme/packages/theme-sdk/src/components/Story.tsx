import React from "react";

export interface StoryProps {
  title: string;
  content: string;
  className?: string;
}

export function Story({ title, content, className = "" }: StoryProps) {
  return (
    <div 
      id="story-container" 
      className={`max-w-2xl mx-auto p-6 md:p-10 bg-white/[0.02] border border-white/[0.06] backdrop-blur-md rounded-3xl text-center space-y-4 relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Editorial Giant Quotes */}
      <div className="absolute top-4 left-6 text-6xl text-white/[0.04] font-serif select-none pointer-events-none">“</div>
      
      <h2 
        id="story-title" 
        className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug font-serif"
      >
        {title}
      </h2>

      <div className="w-10 h-0.5 bg-amber-400/40 mx-auto rounded-full"></div>

      <p 
        id="story-content" 
        className="text-sm md:text-base text-gray-300 leading-relaxed font-light italic"
      >
        {content}
      </p>

      <div className="absolute bottom-2 right-6 text-6xl text-white/[0.04] font-serif select-none pointer-events-none">”</div>
    </div>
  );
}
