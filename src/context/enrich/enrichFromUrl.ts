// Server-only: URL Enrichment Orchestrator
// Fetches URL → Parses HTML → Caches result
// Must NEVER be imported by client code (uses cache.server which imports fs).

import type { EnrichedUrlData } from "./types";
import { FETCH_TIMEOUT_MS, MAX_HTML_BYTES, POLITE_USER_AGENT } from "./types";
import { parseTitle, parseMetaDescription, parseCanonicalUrl, parseLanguage } from "./parseMeta";
import { parseH1, parseH2List, detectUspHints } from "./parseHeadings";
import { htmlToTextSnippet } from "./htmlToText";
import { serverCacheGet, serverCacheSet } from "./cache.server";

/**
 * Validate URL: must be http or https.
 */
function isValidUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

/**
 * Enrich a URL by fetching, parsing, and caching its content.
 * Returns EnrichedUrlData on success, throws on failure.
 */
export async function enrichFromUrl(url: string): Promise<EnrichedUrlData> {
    // 1. Validate URL
    if (!isValidUrl(url)) {
        throw new EnrichError("INVALID_URL", `Invalid URL: must be http or https. Got: "${url}"`);
    }

    // 2. Check server cache first
    const cached = serverCacheGet(url);
    if (cached) {
        return cached.data;
    }

    // 3. Fetch with timeout and size limit
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let html: string;
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": POLITE_USER_AGENT,
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "vi,en;q=0.9",
            },
            redirect: "follow",
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new EnrichError(
                "HTTP_ERROR",
                `HTTP ${response.status}: ${response.statusText} for ${url}`
            );
        }

        // Check content type
        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
            throw new EnrichError(
                "NOT_HTML",
                `URL returned non-HTML content type: ${contentType}`
            );
        }

        // Check content-length if available
        const contentLength = response.headers.get("content-length");
        if (contentLength && parseInt(contentLength) > MAX_HTML_BYTES) {
            throw new EnrichError(
                "TOO_LARGE",
                `HTML exceeds ${MAX_HTML_BYTES / 1024}KB limit (${contentLength} bytes)`
            );
        }

        // Read body with size limit
        const reader = response.body?.getReader();
        if (!reader) {
            throw new EnrichError("NO_BODY", "Response has no readable body");
        }

        const chunks: Uint8Array[] = [];
        let totalSize = 0;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            totalSize += value.length;
            if (totalSize > MAX_HTML_BYTES) {
                reader.cancel();
                throw new EnrichError(
                    "TOO_LARGE",
                    `HTML exceeds ${MAX_HTML_BYTES / 1024}KB limit (streaming abort at ${totalSize} bytes)`
                );
            }
            chunks.push(value);
        }

        const decoder = new TextDecoder("utf-8", { fatal: false });
        html = decoder.decode(Buffer.concat(chunks));
    } catch (err) {
        clearTimeout(timeoutId);
        if (err instanceof EnrichError) throw err;
        if (err instanceof DOMException && err.name === "AbortError") {
            throw new EnrichError("TIMEOUT", `Fetch timed out after ${FETCH_TIMEOUT_MS}ms for ${url}`);
        }
        throw new EnrichError("FETCH_ERROR", `Failed to fetch ${url}: ${(err as Error).message}`);
    }

    // 4. Parse HTML
    const mainText = htmlToTextSnippet(html, 1200);

    const enrichedData: EnrichedUrlData = {
        url,
        pageTitle: parseTitle(html),
        metaDescription: parseMetaDescription(html),
        canonicalUrl: parseCanonicalUrl(html),
        detectedLanguage: parseLanguage(html),
        h1: parseH1(html),
        h2List: parseH2List(html),
        mainTextSnippet: mainText,
        uspHints: detectUspHints(mainText),
    };

    // 5. Cache result
    serverCacheSet({
        url,
        data: enrichedData,
        cachedAt: Date.now(),
    });

    return enrichedData;
}

/**
 * Custom error class for enrichment failures.
 */
export class EnrichError extends Error {
    code: string;
    constructor(code: string, message: string) {
        super(message);
        this.code = code;
        this.name = "EnrichError";
    }
}
