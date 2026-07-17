import React from "react";

export interface TimelineItemData {
  time: string;
  activity: string;
}

export interface TimelineProps {
  items: TimelineItemData[];
  className?: string;
}

export function Timeline({ items, className = "" }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <div id="timeline-empty" className="text-center py-6 text-gray-500 text-xs font-mono">
        Belum ada agenda acara.
      </div>
    );
  }

  return (
    <div 
      id="timeline-container" 
      className={`relative max-w-xl mx-auto pl-6 sm:pl-8 border-l border-white/10 space-y-8 ${className}`}
    >
      {items.map((item, idx) => (
        <div 
          key={idx} 
          id={`timeline-item-${idx}`} 
          className="relative group transition-all duration-300"
        >
          {/* Dot Indicator */}
          <div 
            id={`timeline-dot-${idx}`}
            className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-slate-950 border-2 border-indigo-500 rounded-full flex items-center justify-center transition-all group-hover:scale-125 group-hover:border-amber-400"
          >
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:bg-amber-400"></div>
          </div>

          {/* Time & Activity Bubble */}
          <div 
            id={`timeline-content-${idx}`}
            className="p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] rounded-2xl space-y-1.5 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span 
              id={`timeline-time-${idx}`}
              className="inline-block text-[10px] sm:text-xs font-semibold text-indigo-400 font-mono uppercase tracking-widest"
            >
              {item.time}
            </span>
            <h4 
              id={`timeline-activity-${idx}`}
              className="text-sm sm:text-base font-semibold text-white tracking-tight"
            >
              {item.activity}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
