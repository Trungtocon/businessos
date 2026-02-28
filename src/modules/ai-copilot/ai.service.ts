// V3.0.1 AI Copilot — Server-Side AI Service
// Orchestrator: provider selection → prompt building → call → schema validation → normalize.
// With fallback to mock on provider failure + audit events.
// Rate-limit resilience: detects 429 errors and emits specific audit events.
// Server-only. Must NOT be imported from client code.

import type { ModuleType, ModuleResult, QAResult } from "./types";
import type { AIProvider } from "./providers/provider.interface";
import { MockProvider } from "./providers/provider.mock";
import { ClaudeProvider } from "./providers/provider.claude";
import { KimiProvider } from "./providers/provider.kimi";
import { OpenAIProvider } from "./providers/provider.openai";
import { GeminiProvider } from "./providers/provider.gemini";
import { validateAgainstSchema } from "./schemas";
import { buildPrompt } from "./prompts";
import { normalizeQAResult } from "./score";
import { logAudit } from "@/lib/audit";

/**
 * Get the configured AI provider.
 * If a real provider is selected but its API key is missing,
 * gracefully fall back to mock and emit an audit event.
 */
function getProvider(name?: string): { provider: AIProvider; fellBackFromKeyMissing: boolean } {
    const providerName = name ?? process.env.AI_PROVIDER ?? "mock";
    switch (providerName) {
        case "openai":
            if (!process.env.OPENAI_API_KEY) {
                logAudit({ event: "provider_key_missing", metadata: { provider: "openai" } });
                return { provider: new MockProvider(), fellBackFromKeyMissing: true };
            }
            return { provider: new OpenAIProvider(), fellBackFromKeyMissing: false };
        case "gemini":
            if (!process.env.GEMINI_API_KEY) {
                logAudit({ event: "provider_key_missing", metadata: { provider: "gemini" } });
                return { provider: new MockProvider(), fellBackFromKeyMissing: true };
            }
            return { provider: new GeminiProvider(), fellBackFromKeyMissing: false };
        case "claude":
            return { provider: new ClaudeProvider(), fellBackFromKeyMissing: false };
        case "kimi":
            return { provider: new KimiProvider(), fellBackFromKeyMissing: false };
        case "mock":
        default:
            return { provider: new MockProvider(), fellBackFromKeyMissing: false };
    }
}

export interface AIServiceInput {
    moduleType: ModuleType;
    input: Record<string, unknown>;
    context: Record<string, unknown>;
}

export class AIServiceError extends Error {
    code: string;
    details?: unknown;
    constructor(code: string, message: string, details?: unknown) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = "AIServiceError";
    }
}

/**
 * Run an AI module. Server-side only.
 *
 * Flow: select provider → build prompt → call provider → validate schema → normalize QA → audit.
 * Fallback: if selected provider fails and is not mock, retry with mock.
 */
export async function runAIModule(input: AIServiceInput): Promise<ModuleResult> {
    const { moduleType, input: moduleInput, context } = input;
    const providerName = process.env.AI_PROVIDER ?? "mock";

    // 1. Build prompt variables
    const variables: Record<string, string> = {
        brief: typeof context.brief === "string" ? context.brief : JSON.stringify(context.brief ?? ""),
        context: JSON.stringify(context, null, 2),
    };
    if (moduleType === "draft" && typeof moduleInput.text === "string") {
        variables.input_text = moduleInput.text;
    }
    if (moduleType === "qa" && typeof moduleInput.submission === "string") {
        variables.submission = moduleInput.submission;
    }

    // 2. Build prompt
    const prompt = buildPrompt(moduleType, variables);

    // 3. Select provider (with key-missing fallback)
    const { provider, fellBackFromKeyMissing } = getProvider(providerName);

    logAudit({
        event: "provider_selected",
        moduleType,
        metadata: {
            provider: provider.name,
            configuredProvider: providerName,
            fellBackFromKeyMissing,
        },
    });

    // 4. Call provider with fallback
    let result: ModuleResult;
    let usedProvider = provider.name;
    let fellBack = false;

    try {
        logAudit({ event: "provider_call_start", moduleType, metadata: { provider: provider.name } });

        const response = await provider.generate({ moduleType, prompt });
        result = response.parsed;

        logAudit({
            event: "provider_call_ok",
            moduleType,
            metadata: {
                provider: provider.name,
                tokenUsage: response.tokenUsage,
            },
        });
    } catch (providerErr) {
        const errMsg = (providerErr as Error).message;
        const isRateLimit = /429|rate.limit|cooldown|RESOURCE_EXHAUSTED/i.test(errMsg);

        logAudit({
            event: "provider_call_fail",
            moduleType,
            metadata: { provider: provider.name, error: errMsg, isRateLimit },
        });

        // Emit rate-limit-specific audit if applicable
        if (isRateLimit) {
            logAudit({
                event: "provider_rate_limited",
                moduleType,
                metadata: { provider: provider.name, error: errMsg },
            });
        }

        // Fallback to mock if not already mock
        if (providerName !== "mock") {
            try {
                const mockProvider = new MockProvider();
                logAudit({
                    event: "provider_fallback_mock_used",
                    moduleType,
                    metadata: {
                        from: provider.name,
                        to: "mock",
                        reason: isRateLimit ? "rate_limited" : "provider_error",
                    },
                });

                const fallbackResponse = await mockProvider.generate({ moduleType, prompt });
                result = fallbackResponse.parsed;
                usedProvider = "mock (fallback)";
                fellBack = true;
            } catch (fallbackErr) {
                throw new AIServiceError(
                    "PROVIDER_ERROR",
                    `AI provider '${provider.name}' failed and mock fallback also failed: ${(fallbackErr as Error).message}`
                );
            }
        } else {
            throw new AIServiceError(
                "PROVIDER_ERROR",
                `AI provider '${provider.name}' failed: ${errMsg}`
            );
        }
    }

    // 5. Validate against schema (FAIL CLOSED)
    const validation = validateAgainstSchema(moduleType, result);
    if (!validation.valid) {
        logAudit({
            event: "schema_fail_closed",
            moduleType,
            metadata: {
                provider: usedProvider,
                errors: validation.errors,
            },
        });

        // If a real provider returned invalid schema AND we haven't already
        // fallen back, retry with mock to return a safe structured response.
        if (usedProvider !== "mock" && usedProvider !== "mock (fallback)") {
            const mockProvider = new MockProvider();
            const mockResponse = await mockProvider.generate({ moduleType, prompt });
            result = mockResponse.parsed;
            usedProvider = "mock (schema-fallback)";
            fellBack = true;
        } else {
            throw new AIServiceError(
                "SCHEMA_VALIDATION_FAILED",
                "AI output did not match the expected schema. Rejecting result.",
                validation.errors
            );
        }
    }

    // 6. Normalize QA result
    if (moduleType === "qa") {
        result = normalizeQAResult(result as QAResult);
    }

    // 7. Audit log
    logAudit({
        event: "run_ai_module",
        moduleType,
        metadata: {
            provider: usedProvider,
            fellBack,
            fellBackFromKeyMissing,
        },
    });

    return result;
}
