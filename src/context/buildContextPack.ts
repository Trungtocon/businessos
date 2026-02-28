// Server-only: Context Pack Builder
// Aggregates brief metadata + enriched URL data for AI consumption.
// Must only be called from server code (route handlers, server actions).

import type { EnrichedUrlData } from "./enrich/types";
import { enrichFromUrl } from "./enrich/enrichFromUrl";

export interface ContextPackInput {
    brief: string;
    websiteUrl?: string;
    projectName?: string;
    targetAudience?: string;
    industry?: string;
    additionalNotes?: string;
}

export interface ContextPack {
    brief: string;
    projectName?: string;
    targetAudience?: string;
    industry?: string;
    additionalNotes?: string;
    enrichedWebsite: EnrichedUrlData | null;
    enrichmentError?: string;
    builtAt: string; // ISO timestamp
}

/**
 * Build a context pack from a brief and optional website URL.
 * If websiteUrl is provided, enriches it server-side.
 */
export async function buildContextPack(input: ContextPackInput): Promise<ContextPack> {
    let enrichedWebsite: EnrichedUrlData | null = null;
    let enrichmentError: string | undefined;

    if (input.websiteUrl) {
        try {
            enrichedWebsite = await enrichFromUrl(input.websiteUrl);
        } catch (err) {
            enrichmentError = (err as Error).message;
        }
    }

    return {
        brief: input.brief,
        projectName: input.projectName,
        targetAudience: input.targetAudience,
        industry: input.industry,
        additionalNotes: input.additionalNotes,
        enrichedWebsite,
        enrichmentError,
        builtAt: new Date().toISOString(),
    };
}
