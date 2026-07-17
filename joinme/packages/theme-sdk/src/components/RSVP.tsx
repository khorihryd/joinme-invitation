import React, { useState } from "react";
import { useRSVP } from "../hooks/useRSVP";

export interface RSVPProps {
  guestId: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export function RSVP({ guestId, className = "", inputClassName = "", buttonClassName = "" }: RSVPProps) {
  const { submitRSVP, loading, error, success } = useRSVP();
  const [isAttending, setIsAttending] = useState<boolean>(true);
  const [plusOneCount, setPlusOneCount] = useState<number>(1);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRSVP({
      guestId,
      isAttending,
      plusOneCount: isAttending ? plusOneCount : 0,
      message: message.trim() || undefined,
    });
  };

  if (success) {
    return (
      <div id="rsvp-success-container" className={`p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-center space-y-2 ${className}`}>
        <span className="text-2xl">🎉</span>
        <h4 className="font-bold text-white text-sm">Terima Kasih!</h4>
        <p className="text-xs">Konfirmasi kehadiran Anda telah berhasil tercatat.</p>
      </div>
    );
  }

  return (
    <form 
      id="rsvp-form" 
      onSubmit={handleSubmit} 
      className={`p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-5 ${className}`}
    >
      {error && (
        <div id="rsvp-error" className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-mono">
          ⚠️ {error.message || "Terjadi kesalahan saat mengirim konfirmasi."}
        </div>
      )}

      {/* Attending Radio Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Konfirmasi Kehadiran</label>
        <div className="grid grid-cols-2 gap-3">
          <label 
            id="rsvp-option-attending"
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isAttending 
                ? "bg-indigo-600/10 border-indigo-500 text-white" 
                : "bg-white/[0.01] border-white/[0.06] text-gray-400 hover:border-white/[0.12]"
            }`}
          >
            <input 
              type="radio" 
              name="isAttending" 
              checked={isAttending === true}
              onChange={() => setIsAttending(true)}
              className="sr-only"
            />
            <span className="text-xs font-semibold">Saya Hadir</span>
          </label>

          <label 
            id="rsvp-option-not-attending"
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
              !isAttending 
                ? "bg-red-500/10 border-red-500/30 text-white" 
                : "bg-white/[0.01] border-white/[0.06] text-gray-400 hover:border-white/[0.12]"
            }`}
          >
            <input 
              type="radio" 
              name="isAttending" 
              checked={isAttending === false}
              onChange={() => setIsAttending(false)}
              className="sr-only"
            />
            <span className="text-xs font-semibold">Berhalangan</span>
          </label>
        </div>
      </div>

      {/* Guest Count (if attending) */}
      {isAttending && (
        <div id="rsvp-guest-count-container" className="space-y-2 transition-all">
          <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Jumlah Tamu (Termasuk Anda)</label>
          <input 
            id="rsvp-guest-count-input"
            type="number" 
            min="1" 
            max="10"
            value={plusOneCount}
            onChange={(e) => setPlusOneCount(Math.max(1, parseInt(e.target.value) || 1))}
            className={`w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white text-xs font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all ${inputClassName}`}
          />
        </div>
      )}

      {/* Messages */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Ucapan & Doa Restu</label>
        <textarea 
          id="rsvp-message-input"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan selamat atau doa restu Anda..."
          className={`w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white text-xs font-light focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none placeholder-gray-600 ${inputClassName}`}
        />
      </div>

      {/* Submit Button */}
      <button
        id="rsvp-submit-button"
        type="submit"
        disabled={loading}
        className={`w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition-all cursor-pointer ${buttonClassName}`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>Mengirim...</span>
          </div>
        ) : (
          "Kirim Konfirmasi"
        )}
      </button>
    </form>
  );
}
