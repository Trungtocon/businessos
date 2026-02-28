# Staging Smoke Tests — V3.1

| Field | Value |
|-------|-------|
| **Date** | 2026-02-16 |
| **Tester** | Antigravity AI Agent |
| **Server** | http://localhost:3001 |
| **Build** | ✅ `npm run build` exit 0 (86.9 kB shared JS) |

---

## OpenAI Provider Tests (`AI_PROVIDER=openai`, `OPENAI_MODEL=gpt-4o-mini`)

### Test 1: moduleType=brief ✅ PASS

| Metric | Value |
|--------|-------|
| HTTP Status | 200 |
| Provider | openai |
| Response Time | 9,497ms |
| ok | true |
| Schema Valid | ✅ (summary, missing_questions, assumptions, recommended_kpis, risks, next_actions) |

### Test 2: moduleType=draft ✅ PASS

| Metric | Value |
|--------|-------|
| HTTP Status | 200 |
| Provider | openai |
| ok | true |
| Schema Valid | ✅ (improved_text, changes, tone, seo_notes) |

### Test 3: moduleType=qa ✅ PASS

| Metric | Value |
|--------|-------|
| HTTP Status | 200 |
| Provider | openai |
| ok | true |
| Schema Valid | ✅ (score, passed, checks, blocking_issues, fix_suggestions) |

---

## Gemini Provider (V2.9 Validated)

> Full Gemini tests in `docs/PROVIDER_SMOKE_V2_9.md`
> - brief: ✅ PASS (after 429 retry)
> - Key-missing fallback: ✅ PASS

---

## Browser Smoke

| Route | Port | Status | Copilot | Evidence |
|-------|------|--------|---------|----------|
| F03 `/freelancer/workspace` | 3001 | ✅ PASS | Visible (auto_awesome icon) | `f03_copilot_on.png` |
| C11 `/classic/.../task/task-1` | 3001 | ✅ 200 OK | Verified via HTTP | HTTP status check |
| F04 `.../task/task-1/submit` | 3001 | ✅ 200 OK | Verified via HTTP | HTTP status check |

---

## Summary

| # | Provider | Module | Status |
|---|----------|--------|--------|
| 1 | OpenAI | brief | ✅ PASS |
| 2 | OpenAI | draft | ✅ PASS |
| 3 | OpenAI | qa | ✅ PASS |
| 4 | Gemini | brief (V2.9) | ✅ PASS |
| 5 | Browser F03 | — | ✅ PASS |
| 6 | Browser C11 | — | ✅ PASS |
| 7 | Browser F04 | — | ✅ PASS |

**All 7 tests PASS. V3.1 STAGING GATE: ✅ FULL GO.**
