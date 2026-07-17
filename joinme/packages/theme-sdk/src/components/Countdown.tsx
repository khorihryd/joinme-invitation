import React from "react";
import { useCountdown } from "../hooks/useCountdown";

export interface CountdownProps {
  targetDate: string;
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  numberClassName?: string;
}

export function Countdown({ targetDate, className = "", itemClassName = "", labelClassName = "", numberClassName = "" }: CountdownProps) {
  const { days, hours, minutes, seconds, isFinished } = useCountdown(targetDate);

  if (isFinished) {
    return (
      <div id="countdown-finished" className={`text-center py-6 px-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white font-semibold font-mono tracking-wide ${className}`}>
        Acara Telah Dimulai!
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const items = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds }
  ];

  return (
    <div 
      id="countdown-container" 
      className={`grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto ${className}`}
    >
      {items.map((item, idx) => (
        <div 
          key={idx} 
          id={`countdown-item-${item.label.toLowerCase()}`}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-2xl transition-all ${itemClassName}`}
        >
          <span className={`text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight ${numberClassName}`}>
            {formatNumber(item.value)}
          </span>
          <span className={`text-[10px] sm:text-xs text-gray-400 font-mono mt-1 font-light uppercase tracking-wider ${labelClassName}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
