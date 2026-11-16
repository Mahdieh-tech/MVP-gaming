const BASE = "http://localhost";

// Only allows paths inside this site. Anything else returns the fallback.
export function getSafeRedirectPath(
  value: string | null | undefined,
  fallback: string = "/",
): string {
  if (!value || !value.startsWith("/")) return fallback;

  try {
    const url = new URL(value, BASE);
    if (url.origin !== BASE) return fallback; // e.g. //evil.com or /\evil.com
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}