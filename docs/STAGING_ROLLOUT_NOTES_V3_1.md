# Staging Rollout Notes — V3.1

**Date**: 2026-02-16  
**Branch**: `release/v3.1-staging-gate`

---

## Deployment Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| `AI_PROVIDER` | `openai` | Default provider |
| `NEXT_PUBLIC_AI_COPILOT_ENABLED` | `false` | Copilot OFF by default on staging |
| `NEXT_PUBLIC_CONTEXT_ENRICH_ENABLED` | `true` | Context enrichment active |
| `OPENAI_MODEL` | `gpt-4o-mini` | Cost-efficient model |
| `GEMINI_MODEL` | `gemini-2.0-flash` | Fast Gemini model |

## Rollout Steps

1. **Pre-deploy**: Run `npm run build` — must exit 0
2. **Deploy**: Push to staging (localhost or platform)
3. **Verify Copilot OFF**: Visit C11, F03, F04 → AI buttons hidden
4. **Run smoke tests**: `.\scripts\staging-smoke.ps1 -Provider openai`
5. **Toggle Copilot ON**: Set `NEXT_PUBLIC_AI_COPILOT_ENABLED=true`, restart
6. **Verify Copilot ON**: AI buttons visible, drawer opens
7. **Run full smoke**: Both providers × brief/draft/qa
8. **Package evidence**: `.\scripts\staging-evidence-pack.ps1`

## Rollback Procedure

1. Set `NEXT_PUBLIC_AI_COPILOT_ENABLED=false`
2. Set `AI_PROVIDER=mock` (disables real AI calls entirely)
3. Restart application
4. Copilot hidden + all AI calls return mock data

## Known Limitations

- Rate limiting is in-memory (resets on server restart)
- Gemini may hit 429 rate limits under high load — has automatic retry + fallback
- Audit logs are in-memory (not persisted to external store)

## Provider Switch

To switch providers without redeployment:
```env
# Switch to Gemini
AI_PROVIDER=gemini

# Switch back to OpenAI
AI_PROVIDER=openai

# Emergency: disable AI entirely
AI_PROVIDER=mock
```
Requires server restart after env var change.
