import { ThemeManifest } from "./manifestService";

export interface ThemeManifestWithTier extends ThemeManifest {
  tier?: string;
}

/**
 * Checks if the current user has access to a specific theme based on their subscription tier.
 * Both dashboard and runtime share the same browser's localStorage.
 */
export function hasThemeAccess(manifest: ThemeManifestWithTier): boolean {
  // If the theme has no tier or is standard/free, anyone can access it
  if (!manifest.tier || manifest.tier.toLowerCase() === "free" || manifest.tier.toLowerCase() === "standard") {
    return true;
  }

  // Retrieve user subscription status from localStorage (supporting multiple possible keys for safety)
  const subscription = localStorage.getItem("user-subscription") || localStorage.getItem("subscription") || "free";

  if (manifest.tier.toLowerCase() === "premium") {
    return subscription.toLowerCase() === "premium";
  }

  return true;
}
