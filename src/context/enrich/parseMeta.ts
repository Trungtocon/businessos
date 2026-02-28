// Server-only: Parse HTML meta tags
// Extracts: title, meta description, canonical URL, detected language

/**
 * Extract <title> content from HTML.
 */
export function parseTitle(html: string): string {
    const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    return truncate(decodeEntities(match?.[1]?.trim() ?? ""), 200);
}

/**
 * Extract <meta name="description"> content.
 */
export function parseMetaDescription(html: string): string {
    // Match both name="description" and property="og:description"
    const patterns = [
        /<meta[^>]+name\s*=\s*["']description["'][^>]+content\s*=\s*["']([\s\S]*?)["'][^>]*\/?>/i,
        /<meta[^>]+content\s*=\s*["']([\s\S]*?)["'][^>]+name\s*=\s*["']description["'][^>]*\/?>/i,
        /<meta[^>]+property\s*=\s*["']og:description["'][^>]+content\s*=\s*["']([\s\S]*?)["'][^>]*\/?>/i,
        /<meta[^>]+content\s*=\s*["']([\s\S]*?)["'][^>]+property\s*=\s*["']og:description["'][^>]*\/?>/i,
    ];

    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
            return truncate(decodeEntities(match[1].trim()), 320);
        }
    }
    return "";
}

/**
 * Extract <link rel="canonical"> href.
 */
export function parseCanonicalUrl(html: string): string {
    const match = html.match(/<link[^>]+rel\s*=\s*["']canonical["'][^>]+href\s*=\s*["']([\s\S]*?)["'][^>]*\/?>/i)
        ?? html.match(/<link[^>]+href\s*=\s*["']([\s\S]*?)["'][^>]+rel\s*=\s*["']canonical["'][^>]*\/?>/i);
    return match?.[1]?.trim() ?? "";
}

/**
 * Detect page language from <html lang="..."> attribute.
 */
export function parseLanguage(html: string): string {
    const match = html.match(/<html[^>]+lang\s*=\s*["']([^"']+)["']/i);
    return truncate(match?.[1]?.trim() ?? "unknown", 10);
}

// --- Helpers ---

function truncate(str: string, maxLen: number): string {
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen - 1) + "…";
}

function decodeEntities(str: string): string {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&nbsp;/g, " ");
}
