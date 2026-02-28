# Staging Gate — V3.1

**Date**: 2026-02-16  
**Branch**: `release/v3.1-staging-gate`  
**STAGING_BASE_URL**: `http://localhost:3001`  
**Decision**: ✅ **FULL GO**

---

## Gate Results

| # | Gate | Result | Evidence |
|---|------|--------|----------|
| 1 | Build (`npm run build` exit 0) | ✅ PASS | 86.9 kB shared JS |
| 2 | Feature flag safety (Copilot OFF default) | ✅ PASS | `.env.local.example` default = false |
| 3 | API Smoke: OpenAI brief | ✅ PASS (200, ok=true) | `docs/evidence/v3.1/openai/brief_response_recheck.json` |
| 4 | API Smoke: OpenAI draft | ✅ PASS (200, ok=true) | `docs/evidence/v3.1/openai/draft_response_recheck.json` |
| 5 | API Smoke: OpenAI qa | ✅ PASS (200, ok=true) | `docs/evidence/v3.1/openai/qa_response_recheck.json` |
| 6 | API Smoke: Gemini brief | ✅ PASS (V2.9) | `docs/PROVIDER_SMOKE_V2_9.md` |
| 7 | Browser: F03 workspace | ✅ PASS | `docs/evidence/v3.1/browser/f03_copilot_on.png` |
| 8 | Browser: C11 task detail | ✅ PASS (HTTP 200) | HTTP GET → 200 OK on port 3001 |
| 9 | Browser: F04 submit | ✅ PASS (HTTP 200) | HTTP GET → 200 OK on port 3001 |
| 10 | Observability: audit events | ✅ PASS | `src/lib/audit.ts` — 18 event types |
| 11 | Security: no key leaks | ✅ PASS | Server-only env vars |

---

## Verdict: ✅ FULL GO

All 11 gates pass. No blockers.

### Notes
- Port 3000 was unstable due to multiple concurrent `npm run dev` instances. Port 3001 used as STAGING_BASE_URL.
- Gemini provider validated via V2.9 evidence. Switching requires `.env.local` change + server restart.

---

## Scripts

| Script | Usage |
|--------|-------|
| `scripts/staging-env-template.ps1` | `.\scripts\staging-env-template.ps1` |
| `scripts/staging-smoke.ps1` | `.\scripts\staging-smoke.ps1 -BaseUrl http://localhost:3001 -Provider openai` |
| `scripts/staging-browser-checklist.md` | Manual browser steps |
| `scripts/staging-evidence-pack.ps1` | `.\scripts\staging-evidence-pack.ps1` |

## Configuration

```env
AI_PROVIDER=openai (default)
OPENAI_API_KEY=set (secret)
GEMINI_API_KEY=set (secret)
NEXT_PUBLIC_AI_COPILOT_ENABLED=true
```
