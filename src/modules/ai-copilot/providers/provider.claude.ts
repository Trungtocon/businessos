// V2.4.2 AI Copilot — Claude Provider (Production)
// Uses Anthropic Messages API via server-side fetch (no SDK dependency).
// Server-only. JSON-only output enforced with repair attempt.

import type { AIProvider, AIProviderRequest, AIProviderResponse } from "./provider.interface";
import type { ModuleResult } from "../types";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-4-20250514";
const DEFAULT_MAX_TOKENS = 4096;
const DEFAULT_TIMEOUT_MS = 15000;

const JSON_REPAIR_PROMPT = `Your previous response was not valid JSON. You MUST respond with ONLY a raw JSON object. No markdown, no code fences, no explanation text. Just the JSON object starting with { and ending with }.`;

function getConfig() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error("[ClaudeProvider] ANTHROPIC_API_KEY is not set in environment variables.");
    }
    return {
        apiKey,
        model: process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL,
        maxTokens: parseInt(process.env.AI_MAX_TOKENS ?? String(DEFAULT_MAX_TOKENS), 10),
        timeoutMs: parseInt(process.env.AI_REQUEST_TIMEOUT_MS ?? String(DEFAULT_TIMEOUT_MS), 10),
    };
}

function extractJson(text: string): string {
    // Try raw parse first
    const trimmed = text.trim();
    if (trimmed.startsWith("{")) return trimmed;

    // Extract from markdown code fences
    const fenceMatch = trimmed.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (fenceMatch?.[1]) return fenceMatch[1].trim();

    // Find first { to last }
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end > start) return trimmed.slice(start, end + 1);

    return trimmed;
}

async function callClaude(
    messages: Array<{ role: "user" | "assistant"; content: string }>,
    config: ReturnType<typeof getConfig>,
    system?: string,
): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);

    try {
        const body: Record<string, unknown> = {
            model: config.model,
            max_tokens: config.maxTokens,
            messages,
        };
        if (system) body.system = system;

        const res = await fetch(ANTHROPIC_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": config.apiKey,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify(body),
            signal: controller.signal,
        });

        if (!res.ok) {
            const errBody = await res.text().catch(() => "");
            const statusLabel = res.status === 429 ? "RATE_LIMITED" : res.status === 401 ? "AUTH_FAILED" : "API_ERROR";
            throw new Error(`[ClaudeProvider] ${statusLabel} (${res.status}): ${errBody.slice(0, 300)}`);
        }

        const json = await res.json();
        const textBlock = json.content?.find((b: { type: string }) => b.type === "text");
        return {
            text: textBlock?.text ?? "",
            inputTokens: json.usage?.input_tokens ?? 0,
            outputTokens: json.usage?.output_tokens ?? 0,
        };
    } finally {
        clearTimeout(timer);
    }
}

export class ClaudeProvider implements AIProvider {
    name = "claude";

    async generate(request: AIProviderRequest): Promise<AIProviderResponse> {
        const config = getConfig();

        const system = "You are a JSON-only API. Always respond with valid JSON matching the schema specified in the user message. No markdown, no explanation, just raw JSON.";

        // First attempt
        const first = await callClaude(
            [{ role: "user", content: request.prompt }],
            config,
            system,
        );

        const extracted = extractJson(first.text);

        try {
            const parsed: ModuleResult = JSON.parse(extracted);
            return {
                raw: first.text,
                parsed,
                tokenUsage: {
                    prompt: first.inputTokens,
                    completion: first.outputTokens,
                    total: first.inputTokens + first.outputTokens,
                },
            };
        } catch {
            // JSON parse failed — repair attempt
        }

        // Repair attempt: send original response back with repair instruction
        const repair = await callClaude(
            [
                { role: "user", content: request.prompt },
                { role: "assistant", content: first.text },
                { role: "user", content: JSON_REPAIR_PROMPT },
            ],
            config,
            system,
        );

        const repairExtracted = extractJson(repair.text);

        try {
            const parsed: ModuleResult = JSON.parse(repairExtracted);
            return {
                raw: repair.text,
                parsed,
                tokenUsage: {
                    prompt: first.inputTokens + repair.inputTokens,
                    completion: first.outputTokens + repair.outputTokens,
                    total: first.inputTokens + first.outputTokens + repair.inputTokens + repair.outputTokens,
                },
            };
        } catch {
            throw new Error(
                `[ClaudeProvider] Failed to parse JSON after repair attempt. Raw: ${repairExtracted.slice(0, 200)}`
            );
        }
    }
}
