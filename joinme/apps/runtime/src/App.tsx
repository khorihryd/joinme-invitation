import { useEffect, useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ThemeLoader } from "./loaders/ThemeLoader";
import { loadManifest } from "./services/manifestService";

export default function App() {
  const [themeUrl, setThemeUrl] = useState<string | null>(null);
  const [manifestError, setManifestError] = useState<Error | null>(null);
  const [inviteId, setInviteId] = useState<string | null>(null);

  // Retrieve the invite parameter from the URL query string
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("invite");
    setInviteId(id);
  }, []);

  useEffect(() => {
    loadManifest("sample-theme")
      .then((manifest) => {
        const entry = manifest.entry || "dist/index.es.js";
        setThemeUrl(`/themes/sample-theme/${entry}`);
      })
      .catch((err) => {
        console.error("Gagal memuat manifest:", err);
        setManifestError(err instanceof Error ? err : new Error("Gagal memuat manifest"));
      });
  }, []);

  const handleSetInvite = (id: string) => {
    // Elegant routing fallback for development preview
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?invite=${id}`;
    window.location.href = newUrl;
  };

  if (!inviteId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d11] text-gray-100 p-6 text-center font-sans">
        <div className="max-w-md p-8 bg-amber-950/10 border border-amber-500/20 rounded-3xl shadow-2xl shadow-black/50">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-amber-500 text-lg font-bold">⚠️</span>
          </div>
          <span className="text-xs font-mono tracking-widest text-amber-500 uppercase font-semibold">JoinMe Router</span>
          <h2 className="text-xl font-bold text-white mt-2">Undangan Tidak Ditemukan</h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Anda perlu menyertakan parameter <code className="text-amber-300 font-mono bg-white/[0.02] px-1.5 py-0.5 rounded">?invite=ID</code> pada URL untuk memuat undangan digital.
          </p>

          <div className="h-px bg-white/[0.06] my-6"></div>

          <div className="space-y-3">
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Pilih Demo Undangan Berikut:</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => handleSetInvite("abc123")}
                className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded-lg transition-all"
              >
                Pernikahan Budi & Ani (abc123)
              </button>
              <button 
                onClick={() => handleSetInvite("xyz789")}
                className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-lg transition-all"
              >
                Ulang Tahun Clara (xyz789)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (manifestError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d11] text-gray-100 p-6 text-center font-sans">
        <div className="max-w-md p-8 bg-red-950/20 border border-red-900/30 rounded-3xl shadow-xl">
          <span className="text-xs font-mono tracking-widest text-red-500 uppercase font-semibold">System Error</span>
          <h2 className="text-xl font-bold text-white mt-2">Gagal Memuat Manifest Tema</h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Tidak dapat mengunduh konfigurasi manifest tema. Pastikan server berjalan dan file manifest tersedia.
          </p>
          <p className="text-xs text-red-400 font-mono mt-4 break-all bg-black/40 p-3 border border-white/[0.04] rounded-xl text-left">
            {manifestError.message}
          </p>
        </div>
      </div>
    );
  }

  if (!themeUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d11] text-gray-100 font-sans">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-xs tracking-widest text-gray-500 font-mono animate-pulse uppercase">Menginisialisasi Tema...</p>
      </div>
    );
  }

  return (
    <ThemeProvider inviteId={inviteId}>
      {/* Floating Demo Navigation to easily toggle invitations within the preview */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md border border-white/[0.08] px-4 py-2 rounded-full flex items-center gap-3 shadow-2xl">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Demo ID:</span>
        <button 
          onClick={() => handleSetInvite("abc123")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            inviteId === "abc123" 
              ? "bg-indigo-600 text-white" 
              : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          abc123
        </button>
        <button 
          onClick={() => handleSetInvite("xyz789")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            inviteId === "xyz789" 
              ? "bg-amber-500 text-slate-950 font-semibold" 
              : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          xyz789
        </button>
      </div>

      <ThemeLoader themeUrl={themeUrl} />
    </ThemeProvider>
  );
}

