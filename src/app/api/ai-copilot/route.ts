// API Route: POST /api/ai-copilot
// V2.8 — Hardened. Server-side only. Rate-limited. Schema-validated.
// Never exposes stack traces. Consistent error payloads.

import { NextRequest, NextResponse } from "next/server";
import { runAIModule, AIServiceError } from "@/modules/ai-copilot/ai.service";
import type { ModuleType, AICopilotResponse } from "@/modules/ai-copilot/types";

// --- Rate Limiting (in-memory) ---
// LIMITATION: Resets on server restart. Use Redis for production.

interface RLEntry { count: number; windowStart: number; }
const ipRL = new Map<string, RLEntry>();
const MAX_REQ = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkRL(key: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const e = ipRL.get(key);
    if (!e || now - e.windowStart > WINDOW_MS) {
        ipRL.set(key, { count: 1, windowStart: now });
        return { allowed: true, remaining: MAX_REQ - 1, resetAt: now + WINDOW_MS };
    }
    if (e.count >= MAX_REQ) {
        return { allowed: false, remaining: 0, resetAt: e.windowStart + WINDOW_MS };
    }
    e.count++;
    return { allowed: true, remaining: MAX_REQ - e.count, resetAt: e.windowStart + WINDOW_MS };
}

// Prune stale entries periodically
const pruneTimer = setInterval(() => {
    const now = Date.now();
    ipRL.forEach((v, k) => { if (now - v.windowStart > WINDOW_MS) ipRL.delete(k); });
}, 10 * 60 * 1000);
if (pruneTimer && typeof pruneTimer === "object" && "unref" in pruneTimer) {
    (pruneTimer as NodeJS.Timeout).unref();
}

// --- Constants ---
const MAX_INPUT_CHARS = parseInt(process.env.AI_MAX_INPUT_CHARS ?? "12000", 10);
const VALID_MODULES: ModuleType[] = ["brief", "outline", "draft", "qa"];

function errorResponse(code: string, message: string, status: number): NextResponse<AICopilotResponse> {
    return NextResponse.json(
        { ok: false, error: { code, message } } as AICopilotResponse,
        { status }
    );
}

// --- Route Handler ---

export async function POST(request: NextRequest): Promise<NextResponse<AICopilotResponse>> {
    try {
        // 1. Content-Type check
        const ct = request.headers.get("content-type") ?? "";
        if (!ct.includes("application/json")) {
            return errorResponse("INVALID_CONTENT_TYPE", "Content-Type must be application/json.", 415);
        }

        // 2. Parse body
        let body: Record<string, unknown>;
        try {
            body = await request.json();
        } catch {
            return errorResponse("INVALID_JSON", "Request body is not valid JSON.", 400);
        }

        const { moduleType, input, context } = body ?? {};

        // 3. Validate moduleType
        if (!moduleType || !VALID_MODULES.includes(moduleType as ModuleType)) {
            return errorResponse(
                "INVALID_MODULE",
                `Invalid moduleType. Must be one of: ${VALID_MODULES.join(", ")}`,
                400
            );
        }

        // 4. Validate input/context
        if (!input || typeof input !== "object") {
            return errorResponse("INVALID_INPUT", "Missing or invalid 'input' object.", 400);
        }
        if (!context || typeof context !== "object") {
            return errorResponse("INVALID_CONTEXT", "Missing or invalid 'context' object.", 400);
        }

        // 5. Check input size
        const inputStr = JSON.stringify(input) + JSON.stringify(context);
        if (inputStr.length > MAX_INPUT_CHARS) {
            return errorResponse(
                "INPUT_TOO_LARGE",
                `Combined input+context exceeds ${MAX_INPUT_CHARS} chars (got ${inputStr.length}).`,
                413
            );
        }

        // 6. Rate limit
        const fwd = request.headers.get("x-forwarded-for");
        const clientId = fwd?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
        const rl = checkRL(clientId);
        if (!rl.allowed) {
            const res = errorResponse(
                "RATE_LIMITED",
                `Rate limit exceeded. Max ${MAX_REQ} requests/hour. Resets at ${new Date(rl.resetAt).toISOString()}.`,
                429
            );
            res.headers.set("Retry-After", String(Math.ceil((rl.resetAt - Date.now()) / 1000)));
            res.headers.set("X-RateLimit-Limit", String(MAX_REQ));
            res.headers.set("X-RateLimit-Remaining", "0");
            return res;
        }

        // 7. Run AI module
        const data = await runAIModule({
            moduleType: moduleType as ModuleType,
            input: input as Record<string, unknown>,
            context: context as Record<string, unknown>,
        });

        const res = NextResponse.json(
            { ok: true, data, provider: process.env.AI_PROVIDER ?? "mock" } as AICopilotResponse & { provider: string },
            { status: 200 }
        );
        res.headers.set("X-RateLimit-Remaining", String(rl.remaining));
        return res;

    } catch (err) {
        // AIServiceError → structured error, no stack trace
        if (err instanceof AIServiceError) {
            const status = err.code === "PROVIDER_ERROR" ? 502
                : err.code === "SCHEMA_VALIDATION_FAILED" ? 422
                    : 500;
            return errorResponse(err.code, err.message, status);
        }

        // Unknown error → generic message, log internally
        console.error("[ai-copilot route] Unexpected:", (err as Error).message);
        return errorResponse("INTERNAL_ERROR", "An unexpected error occurred. Please try again.", 500);
    }
}
