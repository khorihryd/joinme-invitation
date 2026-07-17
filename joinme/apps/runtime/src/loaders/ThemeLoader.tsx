import React, { Suspense, Component, ErrorInfo, ReactNode } from "react";

interface Props {
  themeUrl: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  props!: { children: React.ReactNode };
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ThemeLoader Error Boundary caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d11] text-gray-100 p-6 text-center font-sans">
          <div className="max-w-md p-8 bg-red-950/20 border border-red-900/30 rounded-3xl shadow-xl">
            <span className="text-xs font-mono tracking-widest text-red-500 uppercase font-semibold">System Failure</span>
            <h2 className="text-xl font-bold text-white mt-2">Gagal Memuat Tema</h2>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Terjadi kesalahan saat mengunduh atau mengeksekusi modul visual tema eksternal.
            </p>
            <div className="mt-4 p-3 bg-black/40 border border-white/[0.04] rounded-xl text-left">
              <span className="text-[10px] font-mono text-gray-500 uppercase block">Detail Log</span>
              <p className="text-xs text-red-400 font-mono mt-1 break-all overflow-x-auto whitespace-pre-wrap">
                {this.state.error?.message || "Unknown error occurred"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ThemeLoader({ themeUrl }: Props) {
  const LazyTheme = React.lazy(() => {
    return import(/* @vite-ignore */ themeUrl).catch((err) => {
      // @ts-ignore
      if (import.meta.env.DEV) {
        console.warn("DEV: Fallback to source theme because bundle was not found or failed:", err);
        return import("../../../../themes/sample-theme/src/App");
      }
      throw new Error(`Failed to load theme bundle: ${err.message}`);
    });
  });

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d11] text-gray-100 font-sans">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute w-6 h-6 border-2 border-amber-500/10 border-b-amber-500 rounded-full animate-spin [animation-direction:reverse]"></div>
            </div>
            <p className="mt-4 text-sm tracking-widest text-gray-500 font-mono animate-pulse uppercase">Mengunduh Tema...</p>
          </div>
        }
      >
        <LazyTheme />
      </Suspense>
    </ErrorBoundary>
  );
}
