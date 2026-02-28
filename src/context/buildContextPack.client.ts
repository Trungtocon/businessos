// V2.4.1 Client-safe Context Pack Builder
// Calls POST /api/context/enrich-url (V2.3 API) from client.
// NO server-only imports. Reuses V2.3 client cache.

import type { EnrichedUrlData, EnrichUrlResponse } from "./enrich/types";
import { clientCacheGet, clientCacheSet } from "./enrich/cache.client";

// ----------------------------------------------------------------
// Type definitions (client-safe, no server deps)
// ----------------------------------------------------------------

export interface ContextPackEnrichedUrl {
    url: string;
    pageTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    detectedLanguage: string;
    h1: string;
    h2List: string[];
    mainTextSnippet: string;
    uspHints: string[];
}

export interface ContextPack {
    brief?: string;
    websiteUrl?: string;
    taskId?: string;
    projectId?: string;
    userRole?: "business" | "freelancer" | "admin";
    enrichedUrl: ContextPackEnrichedUrl | null;
    createdAt: number;
}

export type ContextStatus = "idle" | "loading" | "ok" | "rate_limited" | "error";

export interface ContextBuildResult {
    pack: ContextPack;
    status: ContextStatus;
    errorMessage?: string;
}

// ----------------------------------------------------------------
// Config from feature flags
// ----------------------------------------------------------------

const ENRICH_ENABLED = process.env.NEXT_PUBLIC_CONTEXT_ENRICH_ENABLED !== "false"; // default true

function isValidHttpUrl(str: string): boolean {
    try {
        const u = new URL(str);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

function toContextEnriched(data: EnrichedUrlData): ContextPackEnrichedUrl {
    return {
        url: data.url,
        pageTitle: data.pageTitle,
        metaDescription: data.metaDescription,
        canonicalUrl: data.canonicalUrl,
        detectedLanguage: data.detectedLanguage,
        h1: data.h1,
        h2List: data.h2List,
        mainTextSnippet: data.mainTextSnippet,
        uspHints: data.uspHints,
    };
}

// ----------------------------------------------------------------
// Client Context Builder
// ----------------------------------------------------------------

export interface BuildContextInput {
    brief?: string;
    websiteUrl?: string;
    taskId?: string;
    projectId?: string;
    userRole?: "business" | "freelancer" | "admin";
}

/**
 * Build a ContextPack from the client side.
 * - Checks V2.3 client cache first (localStorage, 24h TTL).
 * - Falls back to POST /api/context/enrich-url.
 * - Handles RATE_LIMITED gracefully.
 * - Returns enrichedUrl:null if enrichment disabled or websiteUrl missing/invalid.
 */
export async function buildContextPackClient(
    input: BuildContextInput
): Promise<ContextBuildResult> {
    const basePack: ContextPack = {
        brief: input.brief ?? "",
        websiteUrl: input.websiteUrl,
        taskId: input.taskId,
        projectId: input.projectId,
        userRole: input.userRole,
        enrichedUrl: null,
        createdAt: Date.now(),
    };

    // 1. If enrichment disabled or no URL => return base
    if (!ENRICH_ENABLED || !input.websiteUrl || !isValidHttpUrl(input.websiteUrl)) {
        return { pack: basePack, status: input.websiteUrl ? "ok" : "idle" };
    }

    const url = input.websiteUrl;

    // 2. Check V2.3 client cache
    const cached = clientCacheGet(url);
    if (cached) {
        return {
            pack: { ...basePack, enrichedUrl: toContextEnriched(cached) },
            status: "ok",
        };
    }

    // 3. Call V2.3 API
    try {
        const res = await fetch("/api/context/enrich-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        const json: EnrichUrlResponse = await res.json();

        if (!json.ok) {
            // Handle rate limiting gracefully
            if (json.error.code === "RATE_LIMITED" || json.error.code === "URL_RATE_LIMITED") {
                return {
                    pack: basePack,
                    status: "rate_limited",
                    errorMessage: json.error.message,
                };
            }
            return {
                pack: basePack,
                status: "error",
                errorMessage: json.error.message,
            };
        }

        // Cache result in V2.3 client cache
        clientCacheSet(url, json.data);

        return {
            pack: { ...basePack, enrichedUrl: toContextEnriched(json.data) },
            status: "ok",
        };
    } catch (err) {
        return {
            pack: basePack,
            status: "error",
            errorMessage: (err as Error).message,
        };
    }
}
