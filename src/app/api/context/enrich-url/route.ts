// API Route: POST /api/context/enrich-url
// Server-side only. Rate-limited per IP per hour + per URL per session.

import { NextRequest, NextResponse } from "next/server";
import { enrichFromUrl, EnrichError } from "@/context/enrich/enrichFromUrl";
import type { EnrichUrlResponse } from "@/context/enrich/types";

// ============================================================
// Rate Limiting (in-memory Map)
// LIMITATION: Resets on server restart / redeployment.
// For production, use Redis or similar persistent store.
// ============================================================

interface RateLimitEntry {
    count: number;
    windowStart: number;
}

// Per-IP: max 30 requests per hour
const ipRateLimit = new Map<string, RateLimitEntry>();
const IP_MAX_REQUESTS = 30;
const IP_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Per-URL per session: max 3 crawls of same URL per hour (avoids repeat crawling)
const urlRateLimit = new Map<string, RateLimitEntry>();
const URL_MAX_REQUESTS = 3;
const URL_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(
    store: Map<string, RateLimitEntry>,
    key: string,
    maxRequests: number,
    windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now - entry.windowStart > windowMs) {
        // New window
        store.set(key, { count: 1, windowStart: now });
        return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
    }

    if (entry.count >= maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: entry.windowStart + windowMs,
        };
    }

    entry.count++;
    return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetAt: entry.windowStart + windowMs,
    };
}

// Clean up stale entries every 10 minutes
function pruneStaleEntries() {
    const now = Date.now();
    ipRateLimit.forEach((entry, key) => {
        if (now - entry.windowStart > IP_WINDOW_MS) ipRateLimit.delete(key);
    });
    urlRateLimit.forEach((entry, key) => {
        if (now - entry.windowStart > URL_WINDOW_MS) urlRateLimit.delete(key);
    });
}

let pruneInterval: ReturnType<typeof setInterval> | null = null;
if (typeof globalThis !== "undefined" && !pruneInterval) {
    pruneInterval = setInterval(pruneStaleEntries, 10 * 60 * 1000);
    // Don't prevent Node from exiting
    if (pruneInterval && typeof pruneInterval === "object" && "unref" in pruneInterval) {
        pruneInterval.unref();
    }
}

// ============================================================
// Route Handler
// ============================================================

export async function POST(request: NextRequest): Promise<NextResponse<EnrichUrlResponse>> {
    try {
        // 1. Parse body
        const body = await request.json();
        const url = body?.url;

        if (!url || typeof url !== "string") {
            return NextResponse.json(
                { ok: false, error: { code: "INVALID_INPUT", message: "Missing or invalid 'url' field in request body." } },
                { status: 400 }
            );
        }

        // 2. Get client identifier (IP fallback)
        const forwarded = request.headers.get("x-forwarded-for");
        const clientId = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";

        // 3. Check IP rate limit
        const ipCheck = checkRateLimit(ipRateLimit, clientId, IP_MAX_REQUESTS, IP_WINDOW_MS);
        if (!ipCheck.allowed) {
            return NextResponse.json(
                {
                    ok: false,
                    error: {
                        code: "RATE_LIMITED",
                        message: `Rate limit exceeded. Max ${IP_MAX_REQUESTS} requests/hour per IP. Resets at ${new Date(ipCheck.resetAt).toISOString()}.`,
                    },
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(Math.ceil((ipCheck.resetAt - Date.now()) / 1000)),
                        "X-RateLimit-Remaining": "0",
                    },
                }
            );
        }

        // 4. Check URL rate limit (per-URL per session)
        const urlKey = `${clientId}::${url}`;
        const urlCheck = checkRateLimit(urlRateLimit, urlKey, URL_MAX_REQUESTS, URL_WINDOW_MS);
        if (!urlCheck.allowed) {
            return NextResponse.json(
                {
                    ok: false,
                    error: {
                        code: "URL_RATE_LIMITED",
                        message: `Same URL crawled too many times. Max ${URL_MAX_REQUESTS} crawls/hour for same URL.`,
                    },
                },
                { status: 429 }
            );
        }

        // 5. Enrich
        const data = await enrichFromUrl(url);

        return NextResponse.json(
            { ok: true, data },
            {
                status: 200,
                headers: {
                    "X-RateLimit-Remaining": String(ipCheck.remaining),
                    "Cache-Control": "private, max-age=3600",
                },
            }
        );
    } catch (err) {
        if (err instanceof EnrichError) {
            const statusMap: Record<string, number> = {
                INVALID_URL: 400,
                HTTP_ERROR: 502,
                NOT_HTML: 422,
                TOO_LARGE: 413,
                TIMEOUT: 504,
                FETCH_ERROR: 502,
                NO_BODY: 502,
            };
            return NextResponse.json(
                { ok: false, error: { code: err.code, message: err.message } },
                { status: statusMap[err.code] ?? 500 }
            );
        }

        console.error("[enrich-url] Unexpected error:", err);
        return NextResponse.json(
            { ok: false, error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred." } },
            { status: 500 }
        );
    }
}
