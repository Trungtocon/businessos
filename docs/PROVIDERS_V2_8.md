# AI Providers — V2.8 Configuration Guide

## Overview

Business OS V2.8 supports three AI providers for the Copilot module:

| Provider | `AI_PROVIDER` | SDK | Status |
|---|---|---|---|
| Mock | `mock` | Built-in | ✅ Default |
| OpenAI | `openai` | `openai` | ✅ Production-ready |
| Gemini | `gemini` | `@google/genai` | ✅ Production-ready |

## Configuration

### `.env.local`

```env
# Choose provider: mock | openai | gemini
AI_PROVIDER=openai

# OpenAI (required when AI_PROVIDER=openai)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini          # default if omitted

# Gemini (required when AI_PROVIDER=gemini)
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.0-flash     # default if omitted
```

## Safety Guarantees

### Server-Only
- All provider code lives in `src/modules/ai-copilot/providers/`
- Providers use dynamic `import()` — SDK is never bundled into client JS
- API keys are server-side env vars (no `NEXT_PUBLIC_` prefix)

### Graceful Fallback
| Scenario | Behavior |
|---|---|
| Provider configured but API key missing | Falls back to mock + audit `provider_key_missing` |
| Provider API call fails (429/5xx) | 1 retry, then falls back to mock + audit `provider_call_fail` |
| Provider returns invalid JSON | Falls back to mock + audit `schema_fail_closed` |
| Mock provider fails | Returns structured error (no fallback) |

### Schema Enforcement (Fail-Closed)
All provider responses are validated against strict JSON schemas in `schemas.ts`.
Invalid outputs from real providers trigger schema-fallback to mock.

## Switching Providers

1. Edit `.env.local`
2. Restart dev server (`npm run dev`)
3. The API route automatically uses the new provider

No code changes or redeployment needed for switching.

## Models

### OpenAI
Default: `gpt-4o-mini` — fast, cost-effective, sufficient for structured JSON tasks.
Alternative: `gpt-4o` for higher quality (set `OPENAI_MODEL=gpt-4o`).

### Gemini
Default: `gemini-2.0-flash` — fastest Gemini model with strong JSON output.
Alternative: `gemini-2.5-pro` for complex analysis (set `GEMINI_MODEL=gemini-2.5-pro-preview-05-06`).
