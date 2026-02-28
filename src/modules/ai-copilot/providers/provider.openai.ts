// V2.8 AI Copilot — OpenAI Provider (Server-Only)
// Uses OpenAI Responses API. Dynamic import ensures no client bundle leak.

import type { AIProvider, AIProviderRequest, AIProviderResponse } from "./provider.interface";
import type { ModuleResult } from "../types";

const DEFAULT_MODEL = "gpt-4o-mini";
const TIMEOUT_MS = 30_000;
const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 1_000;

function isRetryable(err: unknown): boolean {
    if (err && typeof err === "object" && "status" in err) {
        const status = (err as { status: number }).status;
        return status === 429 || status >= 500;
    }
    return false;
}

async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class OpenAIProvider implements AIProvider {
    name = "openai";

    async generate(request: AIProviderRequest): Promise<AIProviderResponse> {
        // Dynamic import — server-only guarantee
        const { default: OpenAI } = await import("openai");

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not set");
        }

        const client = new OpenAI({ apiKey });
        const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

        let lastError: unknown;

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            if (attempt > 0) {
                await delay(RETRY_DELAY_MS);
            }

            try {
                const response = await client.responses.create(
                    {
                        model,
                        input: request.prompt,
                    },
                    {
                        signal: AbortSignal.timeout(TIMEOUT_MS),
                    }
                );

                const raw = response.output_text;

                if (!raw || typeof raw !== "string") {
                    throw new Error("OpenAI returned empty or non-string output");
                }

                // Parse JSON — prompts force JSON-only output
                let parsed: ModuleResult;
                try {
                    parsed = JSON.parse(raw) as ModuleResult;
                } catch {
                    throw new Error(
                        `OpenAI output is not valid JSON: ${raw.substring(0, 200)}`
                    );
                }

                return {
                    raw,
                    parsed,
                    tokenUsage: response.usage
                        ? {
                            prompt: response.usage.input_tokens ?? 0,
                            completion: response.usage.output_tokens ?? 0,
                            total: response.usage.total_tokens ?? 0,
                        }
                        : undefined,
                };
            } catch (err) {
                lastError = err;
                if (attempt < MAX_RETRIES && isRetryable(err)) {
                    continue;
                }
                break;
            }
        }

        throw lastError instanceof Error
            ? lastError
            : new Error(`OpenAI provider error: ${String(lastError)}`);
    }
}
