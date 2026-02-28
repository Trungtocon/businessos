// Client-safe: localStorage URL cache
// No Node.js modules — safe for client bundle.

import type { EnrichedUrlData, UrlCacheEntry } from "./types";
import { CACHE_TTL_MS } from "./types";

const STORAGE_PREFIX = "bos_url_cache_";

/**
 * Get enriched URL data from localStorage if cached and not expired.
 */
export function clientCacheGet(url: string): EnrichedUrlData | null {
    if (typeof window === "undefined") return null;

    try {
        const raw = localStorage.getItem(STORAGE_PREFIX + encodeURIComponent(url));
        if (!raw) return null;

        const entry: UrlCacheEntry = JSON.parse(raw);
        const age = Date.now() - entry.cachedAt;

        if (age > CACHE_TTL_MS) {
            localStorage.removeItem(STORAGE_PREFIX + encodeURIComponent(url));
            return null;
        }

        return entry.data;
    } catch {
        return null;
    }
}

/**
 * Store enriched URL data in localStorage.
 */
export function clientCacheSet(url: string, data: EnrichedUrlData): void {
    if (typeof window === "undefined") return;

    try {
        const entry: UrlCacheEntry = {
            url,
            data,
            cachedAt: Date.now(),
        };
        localStorage.setItem(
            STORAGE_PREFIX + encodeURIComponent(url),
            JSON.stringify(entry)
        );
    } catch {
        // localStorage quota exceeded or unavailable — silently fail
    }
}

/**
 * Remove a specific URL from client cache.
 */
export function clientCacheRemove(url: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_PREFIX + encodeURIComponent(url));
}
