export function safeGetItem(key: string, fallback: string = ""): string {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (e) {
    console.warn(`localStorage.getItem failed for key "${key}":`, e);
    return fallback;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`localStorage.setItem failed for key "${key}":`, e);
  }
}

export function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`localStorage.removeItem failed for key "${key}":`, e);
  }
}
