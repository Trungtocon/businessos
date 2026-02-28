// V2.4.2 AI Copilot — Kimi (Moonshot) Provider (Production)
// Uses OpenAI-compatible chat completion endpoint via server-side fetch.
// Server-only. JSON-only output enforced with repair attempt.

import type { AIProvider, AIProviderRequest, AIProviderResponse } from "./provider.interface";
import type { ModuleResult } from "../types";

const KIMI_API_URL = "https://api.moonshot.cn/v1/chat/completions";
const DEFAULT_MODEL = "moonshot-v1-8k";
const DEFAULT_MAX_TOKENS = 4096;
const DEFAULT_TIMEOUT_MS = 15000;

const JSON_REPAIR_PROMPT = `Your previous response was not valid JSON. You MUST respond with ONLY a raw JSON object. No markdown, no code fences, no explanation text. Just the JSON object starting with { and ending with }.`;

function getConfig() {
    const apiKey = process.env.KIMI_API_KEY;
    if (!apiKey) {
        throw new Error("[KimiProvider] KIMI_API_KEY is not set in environment variables.");
    }
    return {
        apiKey,
        model: process.env.KIMI_MODEL ?? DEFAULT_MODEL,
        maxTokens: parseInt(process.env.AI_MAX_TOKENS ?? String(DEFAULT_MAX_TOKENS), 10),
        timeoutMs: parseInt(process.env.AI_REQUEST_TIMEOUT_MS ?? String(DEFAULT_TIMEOUT_MS), 10),
    };
}

function extractJson(text: string): string {
    const trimmed = text.trim();
    if (trimmed.startsWith("{")) return trimmed;

    const fenceMatch = trimmed.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (fenceMatch?.[1]) return fenceMatch[1].trim();

    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end > start) return trimmed.slice(start, end + 1);

    return trimmed;
}

interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

async function callKimi(
    messages: ChatMessage[],
    config: ReturnType<typeof getConfig>,
): Promise<{ text: string; promptTokens: number; completionTokens: number }> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);

    try {
        const res = await fetch(KIMI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
                model: config.model,
                messages,
                max_tokens: config.maxTokens,
                temperature: 0.3,
                response_format: { type: "json_object" },
            }),
            signal: controller.signal,
        });

        if (!res.ok) {
            const errBody = await res.text().catch(() => "");
            const statusLabel = res.status === 429 ? "RATE_LIMITED" : res.status === 401 ? "AUTH_FAILED" : "API_ERROR";
            throw new Error(`[KimiProvider] ${statusLabel} (${res.status}): ${errBody.slice(0, 300)}`);
        }

        const json = await res.json();
        const text = json.choices?.[0]?.message?.content ?? "";
        return {
            text,
            promptTokens: json.usage?.prompt_tokens ?? 0,
            completionTokens: json.usage?.completion_tokens ?? 0,
        };
    } finally {
        clearTimeout(timer);
    }
}

export class KimiProvider implements AIProvider {
    name = "kimi";

    async generate(request: AIProviderRequest): Promise<AIProviderResponse> {
        const config = getConfig();

        const systemMsg: ChatMessage = {
            role: "system",
            content: "You are a JSON-only API. Always respond with valid JSON matching the schema specified in the user message. No markdown, no explanation, just raw JSON.",
        };

        // First attempt
        const first = await callKimi(
            [systemMsg, { role: "user", content: request.prompt }],
            config,
        );

        const extracted = extractJson(first.text);

        try {
            const parsed: ModuleResult = JSON.parse(extracted);
            return {
                raw: first.text,
                parsed,
                tokenUsage: {
                    prompt: first.promptTokens,
                    completion: first.completionTokens,
                    total: first.promptTokens + first.completionTokens,
                },
            };
        } catch {
            // JSON parse failed — repair attempt
        }

        // Repair attempt
        const repair = await callKimi(
            [
                systemMsg,
                { role: "user", content: request.prompt },
                { role: "assistant", content: first.text },
                { role: "user", content: JSON_REPAIR_PROMPT },
            ],
            config,
        );

        const repairExtracted = extractJson(repair.text);

        try {
            const parsed: ModuleResult = JSON.parse(repairExtracted);
            return {
                raw: repair.text,
                parsed,
                tokenUsage: {
                    prompt: first.promptTokens + repair.promptTokens,
                    completion: first.completionTokens + repair.completionTokens,
                    total: first.promptTokens + first.completionTokens + repair.promptTokens + repair.completionTokens,
                },
            };
        } catch {
            throw new Error(
                `[KimiProvider] Failed to parse JSON after repair attempt. Raw: ${repairExtracted.slice(0, 200)}`
            );
        }
    }
}
