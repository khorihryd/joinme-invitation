export interface ThemeManifest {
  name: string;
  version: string;
  description: string;
  author: string;
  runtimeVersion: string;
  entry: string;
  configSchema?: {
    properties?: Record<string, any>;
  };
}

export async function loadManifest(themeName: string): Promise<ThemeManifest> {
  const res = await fetch(`/themes/${themeName}/manifest.json`);
  if (!res.ok) {
    throw new Error(`Gagal memuat manifest untuk tema "${themeName}"`);
  }
  return res.json();
}
