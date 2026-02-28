// V2.3 URL Crawl Enrichment — Shared Types
// Safe to import from both server and client code.

export interface EnrichedUrlData {
    url: string;
    pageTitle: string;           // <= 200 chars
    metaDescription: string;     // <= 320 chars
    canonicalUrl: string;
    detectedLanguage: string;    // <= 10 chars
    h1: string;                  // <= 200 chars
    h2List: string[];            // max 8 items, each <= 150 chars
    mainTextSnippet: string;     // <= 1200 chars
    uspHints: string[];          // max 5 items
}

export interface UrlCacheEntry {
    url: string;
    data: EnrichedUrlData;
    cachedAt: number; // Unix timestamp ms
}

export type CrawlStatus = "idle" | "fetching" | "parsing" | "cached" | "error";

export interface EnrichUrlRequest {
    url: string;
}

export interface EnrichUrlSuccessResponse {
    ok: true;
    data: EnrichedUrlData;
}

export interface EnrichUrlErrorResponse {
    ok: false;
    error: {
        code: string;
        message: string;
    };
}

export type EnrichUrlResponse = EnrichUrlSuccessResponse | EnrichUrlErrorResponse;

// Constants
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
export const MAX_CACHE_ENTRIES = 100;
export const FETCH_TIMEOUT_MS = 8000;
export const MAX_HTML_BYTES = 500 * 1024; // 500 KB
export const POLITE_USER_AGENT = "BusinessOS-Enrichment/2.3 (+https://businessos.app/bot)";
