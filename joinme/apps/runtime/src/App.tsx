import { useEffect, useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ThemeLoader } from "./loaders/ThemeLoader";
import { loadManifest } from "./services/manifestService";
import { fetchInvitation } from "./services/invitationService";
import { hasThemeAccess } from "./services/permissionService";

export default function App() {
  const [themeUrl, setThemeUrl] = useState<string | null>(null);
  const [manifestError, setManifestError] = useState<Error | null>(null);
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [isDenied, setIsDenied] = useState<boolean>(false);
  const [deniedThemeName, setDeniedThemeName] = useState<string>("");
  const [forcedTheme, setForcedTheme] = useState<string | null>(null);

  // Retrieve the invite parameter from the URL query string
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("invite");
    setInviteId(id);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "UPDATE_INVITATION_DATA") {
        if (event.data.payload && event.data.payload.theme) {
          setForcedTheme(event.data.payload.theme);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (!inviteId) return;

    setThemeUrl(null);
    setManifestError(null);
    setIsDenied(false);

    // Fetch invitation first to find out which theme it uses
    fetchInvitation(inviteId)
      .then((invitation) => {
        // Read theme from URL parameter, fallback to invitation's configured theme, and then to sample-theme
        const searchParams = new URLSearchParams(window.location.search);
        const themeName = forcedTheme || searchParams.get("theme") || invitation.theme || "sample-theme";
        
        // Load the manifest for the specified theme
        return loadManifest(themeName).then((manifest) => {
          // Check access permissions
          if (!hasThemeAccess(manifest)) {
            setIsDenied(true);
            setDeniedThemeName(manifest.name);
            return;
          }

          // Access granted, load the theme JS entry
          const entry = manifest.entry || "dist/index.es.js";
          setThemeUrl(`/themes/${themeName}/${entry}`);
        });
      })
      .catch((err) => {
        console.error("Gagal memuat:", err);
        setManifestError(err instanceof Error ? err : new Error("Gagal memuat tema atau undangan"));
      });
  }, [inviteId, forcedTheme]);

  const handleSetInvite = (id: string) => {
    // Elegant routing fallback for development preview
    const params = new URLSearchParams(window.location.search);
    params.set("invite", id);
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`;
    window.location.href = newUrl;
  };

  const handleSimulateUpgrade = () => {
    try {
      localStorage.setItem("user-subscription", "premium");
      localStorage.setItem("subscription", "premium");
    } catch (e) {
      console.warn("Failed to set item in localStorage:", e);
    }
    // Reload page to re-trigger permissions and instantly display theme
    window.location.reload();
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
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => handleSetInvite("abc123")}
                className="w-full px-4 py-3 bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/25 text-indigo-300 text-xs font-semibold rounded-xl transition-all"
              >
                Pernikahan Budi & Ani (abc123) - Free Theme
              </button>
              <button 
                onClick={() => handleSetInvite("xyz789")}
                className="w-full px-4 py-3 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold rounded-xl transition-all"
              >
                Ulang Tahun Clara (xyz789) - Premium Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isDenied) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#07070a] text-gray-100 p-6 text-center font-sans relative select-none">
        {/* Decorative ambient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-md w-full p-8 bg-[#121218]/90 border border-amber-500/30 rounded-[32px] shadow-2xl backdrop-blur-md relative z-10 space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/5">
            <span className="text-3xl">👑</span>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold block">Akses Tema Dibatasi</span>
            <h2 className="text-2xl font-serif font-extrabold text-white tracking-tight">Butuh Premium Theme</h2>
            <p className="text-sm text-gray-400 leading-relaxed px-2">
              Undangan ini menggunakan tema eksklusif <span className="text-amber-300 font-semibold font-serif">"{deniedThemeName}"</span> yang hanya dapat diakses dengan akun Premium.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-2xl space-y-2.5 text-left">
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <span className="text-amber-400">✓</span>
              <span>Akses penuh semua tema premium mewah</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <span className="text-amber-400">✓</span>
              <span>Unlimited pembuatan undangan</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <span className="text-amber-400">✓</span>
              <span>Fitur RSVP Real-time & Konfirmasi Tamu</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleSimulateUpgrade}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/10 active:scale-[0.98] cursor-pointer"
            >
              Simulasi Upgrade Sekarang ⚡
            </button>
            <button
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.delete("invite");
                params.set("page", "dashboard");
                window.location.href = `?${params.toString()}`;
              }}
              className="w-full py-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 font-semibold text-xs rounded-xl transition-all"
            >
              Kembali ke Dashboard
            </button>
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


