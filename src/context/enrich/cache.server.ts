// Server-only: File-based URL cache
// Uses Node.js fs — must NEVER be imported by client code.
// Stored at: .data/url-cache.json

import * as fs from "fs";
import * as path from "path";
import type { UrlCacheEntry } from "./types";
import { CACHE_TTL_MS, MAX_CACHE_ENTRIES } from "./types";

const CACHE_DIR = path.resolve(process.cwd(), ".data");
const CACHE_FILE = path.join(CACHE_DIR, "url-cache.json");

/**
 * Read the cache from disk. Returns empty map if file doesn't exist.
 */
function readCache(): Map<string, UrlCacheEntry> {
    try {
        if (!fs.existsSync(CACHE_FILE)) {
            return new Map();
        }
        const raw = fs.readFileSync(CACHE_FILE, "utf-8");
        const entries: UrlCacheEntry[] = JSON.parse(raw);
        return new Map(entries.map((e) => [e.url, e]));
    } catch {
        return new Map();
    }
}

/**
 * Write the cache to disk. Auto-creates .data/ folder if missing.
 */
function writeCache(cache: Map<string, UrlCacheEntry>): void {
    try {
        if (!fs.existsSync(CACHE_DIR)) {
            fs.mkdirSync(CACHE_DIR, { recursive: true });
        }
        const entries = Array.from(cache.values());
        fs.writeFileSync(CACHE_FILE, JSON.stringify(entries, null, 2), "utf-8");
    } catch (err) {
        console.error("[cache.server] Failed to write cache:", err);
    }
}

/**
 * Get a cache entry if it exists and is still valid (within TTL).
 */
export function serverCacheGet(url: string): UrlCacheEntry | null {
    const cache = readCache();
    const entry = cache.get(url);
    if (!entry) return null;

    const age = Date.now() - entry.cachedAt;
    if (age > CACHE_TTL_MS) {
        // Expired — remove it
        cache.delete(url);
        writeCache(cache);
        return null;
    }

    return entry;
}

/**
 * Set a cache entry, pruning oldest if over MAX_CACHE_ENTRIES.
 */
export function serverCacheSet(entry: UrlCacheEntry): void {
    const cache = readCache();
    cache.set(entry.url, entry);

    // Prune oldest if over limit
    if (cache.size > MAX_CACHE_ENTRIES) {
        const sorted = Array.from(cache.entries()).sort(
            (a, b) => a[1].cachedAt - b[1].cachedAt
        );
        const toRemove = sorted.slice(0, cache.size - MAX_CACHE_ENTRIES);
        for (const [key] of toRemove) {
            cache.delete(key);
        }
    }

    writeCache(cache);
}
