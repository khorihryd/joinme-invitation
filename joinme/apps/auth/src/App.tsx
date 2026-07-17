import React, { useState, useEffect } from "react";

// Safe storage utilities to harden production behavior in sandbox iframe
function safeGetItem(key: string, fallback: string = ""): string {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (e) {
    console.warn(`localStorage.getItem failed for key "${key}":`, e);
    return fallback;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`localStorage.setItem failed for key "${key}":`, e);
  }
}

export default function App() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Check initial state from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page === "register") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, []);

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setError(null);
    setSuccess(null);
    // Sync with URL for good browser UX
    const newPage = !isRegister ? "register" : "login";
    window.history.replaceState(null, "", `?page=${newPage}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    let users: any[] = [];
    try {
      users = JSON.parse(safeGetItem("users", "[]"));
    } catch (e) {
      console.error("Failed to parse users list:", e);
    }

    if (isRegister) {
      // REGISTER FLOW
      const userExists = users.some((u: any) => u.email === email);
      if (userExists) {
        setError("Email sudah terdaftar. Silakan login.");
        return;
      }

      users.push({ email, password });
      safeSetItem("users", JSON.stringify(users));
      setSuccess("Registrasi berhasil! Silakan login.");
      
      // Auto-switch to login after 1.5s
      setTimeout(() => {
        setIsRegister(false);
        setPassword("");
        setError(null);
        setSuccess(null);
        window.history.replaceState(null, "", "?page=login");
      }, 1500);

    } else {
      // LOGIN FLOW
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      // Add a default user for super easy demo-ing if they haven't registered
      const defaultUser = email === "admin@joinme.com" && password === "admin123";
      
      if (user || defaultUser) {
        safeSetItem("user-token", "dummy-user-token-xyz");
        safeSetItem("user-email", email);
        setSuccess("Login berhasil! Mengalihkan ke Dashboard...");
        
        setTimeout(() => {
          window.location.href = "?page=dashboard";
        }, 1000);
      } else {
        setError("Email atau password salah.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-gray-100 font-sans flex items-center justify-center p-6 relative">
      {/* Background Ambience */}
      <div className="absolute top-10 left-1/3 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/3 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl shadow-2xl backdrop-blur-md relative z-10">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-8">
          <button onClick={() => window.location.href = "/"} className="flex items-center gap-2 mb-3 cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="text-white font-bold text-lg font-mono">J</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">Join<span className="text-amber-400">Me</span></span>
          </button>
          <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
            {isRegister ? "Buat Akun Baru" : "Masuk ke Akun Anda"}
          </span>
        </div>

        {/* Success / Error States */}
        {error && (
          <div className="p-3 mb-6 bg-red-950/20 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 mb-6 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl text-center">
            {success}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-indigo-500 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-indigo-500 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/10 active:scale-[0.98] cursor-pointer mt-2"
          >
            {isRegister ? "Daftar Akun" : "Masuk Sekarang"}
          </button>
        </form>

        {/* Demo Helper Text */}
        {!isRegister && (
          <div className="mt-4 p-2.5 bg-indigo-500/[0.03] border border-indigo-500/[0.08] rounded-xl text-[10px] text-indigo-300 font-mono text-center">
            💡 Demo Quick login: <span className="font-semibold text-amber-300">admin@joinme.com</span> / <span className="font-semibold text-amber-300">admin123</span>
          </div>
        )}

        <div className="h-px bg-white/[0.04] my-6"></div>

        {/* Toggle Account Option */}
        <div className="text-center">
          <p className="text-xs text-gray-400">
            {isRegister ? "Sudah memiliki akun?" : "Belum memiliki akun?"}{" "}
            <button
              onClick={handleToggle}
              className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
            >
              {isRegister ? "Masuk" : "Daftar Baru"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
