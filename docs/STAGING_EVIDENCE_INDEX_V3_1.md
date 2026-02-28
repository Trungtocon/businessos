# Staging Evidence Index — V3.1

**Date**: 2026-02-16  
**Location**: `docs/evidence/v3.1/`

---

## API Smoke Evidence

| # | File | Provider | Module | Status |
|---|------|----------|--------|--------|
| 1 | `openai/brief_response.json` | OpenAI | brief | ✅ PASS |
| 2 | `openai/draft_response.json` | OpenAI | draft | ✅ PASS |
| 3 | `openai/qa_response.json` | OpenAI | qa | ✅ PASS |
| 4 | `openai/brief_response_recheck.json` | OpenAI | brief (recheck) | ✅ PASS |
| 5 | `openai/draft_response_recheck.json` | OpenAI | draft (recheck) | ✅ PASS |
| 6 | `openai/qa_response_recheck.json` | OpenAI | qa (recheck) | ✅ PASS |

## Browser Evidence

| # | File | Route | Status |
|---|------|-------|--------|
| 7 | `browser/f03_copilot_on.png` | F03 workspace | ✅ Copilot visible |

## Prior Gemini Evidence

| # | Reference | Notes |
|---|-----------|-------|
| 8 | `docs/PROVIDER_SMOKE_V2_9.md` (Tests 4-6) | Gemini brief ✅, key-missing fallback ✅ |

## HTTP Verification

| # | Route | Port | Status |
|---|-------|------|--------|
| 9 | C11 `/classic/projects/proj-1/task/task-1` | 3001 | HTTP 200 |
| 10 | F04 `.../task/task-1/submit` | 3001 | HTTP 200 |

---

## Regenerate

```powershell
.\scripts\staging-smoke.ps1 -BaseUrl http://localhost:3001 -Provider openai
.\scripts\staging-evidence-pack.ps1
```
