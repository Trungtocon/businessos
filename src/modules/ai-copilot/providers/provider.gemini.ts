// V3.0.1 AI Copilot — Gemini Provider (Server-Only)
// Uses @google/genai SDK. Dynamic import ensures no client bundle leak.
// Hardened: exponential backoff + jitter, per-provider cooldown for 429 rate limits.

import type { AIProvider, AIProviderRequest, AIProviderResponse } from "./provider.interface";
import type { ModuleResult } from "../types";
import { logAudit } from "@/lib/audit";

const DEFAULT_MODEL = "gemini-2.0-flash";
const TIMEOUT_MS = 30_000;
const MAX_RETRIES = 2;
const BASE_DELAY_MS = 2_000;
const COOLDOWN_MS = 90_000; // 90s cooldown after 429

// Module-level cooldown — persists across requests within the same server process
let cooldownUntil = 0;

function isRateLimitError(err: unknown): boolean {
    if (err && typeof err === "object" && "status" in err) {
        return (err as { status: number }).status === 429;
    }
    if (err instanceof Error && /429|RESOURCE_EXHAUSTED|quota|rate.limit/i.test(err.message)) {
        return true;
    }
    return false;
}

function isRetryable(err: unknown): boolean {
    if (isRateLimitError(err)) return true;
    if (err && typeof err === "object" && "status" in err) {
        const status = (err as { status: number }).status;
        return status >= 500;
    }
    if (err instanceof Error && /ECONNRESET|ETIMEDOUT|ENOTFOUND|fetch failed/i.test(err.message)) {
        return true;
    }
    return false;
}

function backoffWithJitter(attempt: number): number {
    // Exponential backoff: base * 2^attempt + random jitter(0, base/2)
    const exponentialDelay = BASE_DELAY_MS * Math.pow(2, attempt);
    const jitter = Math.floor(Math.random() * (BASE_DELAY_MS / 2));
    return exponentialDelay + jitter;
}

async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class GeminiProvider implements AIProvider {
    name = "gemini";

    async generate(request: AIProviderRequest): Promise<AIProviderResponse> {
        // Check cooldown — if still in cooldown, throw immediately to avoid wasting API call
        if (Date.now() < cooldownUntil) {
            const remainingSec = Math.ceil((cooldownUntil - Date.now()) / 1000);
            logAudit({
                event: "provider_rate_limited",
                moduleType: request.moduleType,
                metadata: {
                    provider: "gemini",
                    reason: "cooldown_active",
                    remainingSeconds: remainingSec,
                },
            });
            throw new Error(`Gemini rate-limit cooldown active (${remainingSec}s remaining)`);
        }

        // Dynamic import — server-only guarantee
        const { GoogleGenAI } = await import("@google/genai");

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not set");
        }

        const ai = new GoogleGenAI({ apiKey });
        const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

        let lastError: unknown;

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            if (attempt > 0) {
                const waitMs = backoffWithJitter(attempt);
                logAudit({
                    event: "provider_rate_limited",
                    moduleType: request.moduleType,
                    metadata: {
                        provider: "gemini",
                        reason: "retry_backoff",
                        attempt,
                        waitMs,
                    },
                });
                await delay(waitMs);
            }

            try {
                const response = await ai.models.generateContent({
                    model,
                    contents: request.prompt,
                    config: {
                        temperature: 0.3,
                        maxOutputTokens: 4096,
                        abortSignal: AbortSignal.timeout(TIMEOUT_MS),
                    },
                });

                const raw = response.text;

                if (!raw || typeof raw !== "string") {
                    throw new Error("Gemini returned empty or non-string output");
                }

                // Strip markdown code fences if present (Gemini sometimes wraps JSON)
                let cleanedRaw = raw.trim();
                if (cleanedRaw.startsWith("```")) {
                    cleanedRaw = cleanedRaw
                        .replace(/^```(?:json)?\s*\n?/, "")
                        .replace(/\n?```\s*$/, "")
                        .trim();
                }

                // Parse JSON — prompts force JSON-only output
                let parsed: ModuleResult;
                try {
                    parsed = JSON.parse(cleanedRaw) as ModuleResult;
                } catch {
                    throw new Error(
                        `Gemini output is not valid JSON: ${cleanedRaw.substring(0, 200)}`
                    );
                }

                // Success — clear cooldown
                cooldownUntil = 0;

                return {
                    raw: cleanedRaw,
                    parsed,
                    tokenUsage: response.usageMetadata
                        ? {
                            prompt: response.usageMetadata.promptTokenCount ?? 0,
                            completion: response.usageMetadata.candidatesTokenCount ?? 0,
                            total: response.usageMetadata.totalTokenCount ?? 0,
                        }
                        : undefined,
                };
            } catch (err) {
                lastError = err;

                // On 429, activate cooldown
                if (isRateLimitError(err)) {
                    cooldownUntil = Date.now() + COOLDOWN_MS;
                }

                if (attempt < MAX_RETRIES && isRetryable(err)) {
                    continue;
                }

                // All retries exhausted
                if (attempt >= MAX_RETRIES) {
                    logAudit({
                        event: "provider_retry_exhausted",
                        moduleType: request.moduleType,
                        metadata: {
                            provider: "gemini",
                            attempts: attempt + 1,
                            lastError: lastError instanceof Error ? lastError.message : String(lastError),
                        },
                    });
                }
                break;
            }
        }

        throw lastError instanceof Error
            ? lastError
            : new Error(`Gemini provider error: ${String(lastError)}`);
    }
}
