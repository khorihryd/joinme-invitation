import React, { useState, useEffect } from "react";

export default function SubscriptionBadge() {
  const [subTier, setSubTier] = useState<string>("free");

  useEffect(() => {
    // Read status from localStorage
    const stored = localStorage.getItem("user-subscription") || localStorage.getItem("subscription") || "free";
    setSubTier(stored.toLowerCase());
  }, []);

  const handleNavigateToPricing = () => {
    // Update subpage parameter in query string
    const params = new URLSearchParams(window.location.search);
    params.set("page", "dashboard");
    params.set("subpage", "pricing");
    window.location.href = `?${params.toString()}`;
  };

  if (subTier === "premium") {
    return (
      <button
        onClick={handleNavigateToPricing}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-yellow-500/15 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/5 cursor-pointer"
        title="Klik untuk mengelola paket Anda"
      >
        <span>👑</span>
        <span className="tracking-wide uppercase text-[10px]">PREMIUM</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleNavigateToPricing}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05] text-xs font-mono rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
      title="Klik untuk upgrade ke Premium"
    >
      <span>🌱</span>
      <span className="tracking-wide uppercase text-[10px]">FREE PLAN</span>
    </button>
  );
}
