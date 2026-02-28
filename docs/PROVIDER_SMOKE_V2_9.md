# Provider Smoke Tests — V2.9 (Real Keys)

| Field | Value |
|---|---|
| **Date** | 2026-02-16 |
| **Tester** | Antigravity AI Agent |
| **Server** | http://localhost:3000 |
| **Build** | `npm run build` exit 0 |

---

## OpenAI Provider Tests (AI_PROVIDER=openai, OPENAI_MODEL=gpt-4o-mini)

### Test 1: moduleType=brief ✅ PASS

```powershell
$body = '{"moduleType":"brief","input":{},"context":{"brief":"Thiết kế landing page cho startup fintech với mục tiêu tăng CVR 20%"}}'
$r = Invoke-WebRequest -Uri "http://localhost:3000/api/ai-copilot" -Method POST -ContentType "application/json" -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -UseBasicParsing -TimeoutSec 60
```

| Metric | Value |
|---|---|
| HTTP Status | 200 |
| Provider | openai |
| Response Time | 10,197ms |
| Token Usage | prompt=218, completion=336, total=554 |
| Schema Valid | ✅ Yes (summary, missing_questions, assumptions, recommended_kpis, risks, next_actions) |
| Fallback | No |

### Test 2: moduleType=draft ✅ PASS

```powershell
$body = '{"moduleType":"draft","input":{"text":"TechFlow giúp team quản lý dự án hiệu quả hơn"},"context":{"brief":"Landing page cho startup fintech"}}'
$r = Invoke-WebRequest -Uri "http://localhost:3000/api/ai-copilot" -Method POST -ContentType "application/json" -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -UseBasicParsing -TimeoutSec 60
```

| Metric | Value |
|---|---|
| HTTP Status | 200 |
| Provider | openai |
| Response Time | 4,223ms |
| Schema Valid | ✅ Yes (improved_text, changes, tone, seo_notes) |
| Fallback | No |

### Test 3: moduleType=qa ✅ PASS

```powershell
$body = '{"moduleType":"qa","input":{"submission":"Bài viết giới thiệu sản phẩm TechFlow"},"context":{"brief":"Landing page cho startup fintech, target CVR 20%"}}'
$r = Invoke-WebRequest -Uri "http://localhost:3000/api/ai-copilot" -Method POST -ContentType "application/json" -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -UseBasicParsing -TimeoutSec 60
```

| Metric | Value |
|---|---|
| HTTP Status | 200 |
| Provider | openai |
| Response Time | 4,753ms |
| Token Usage | prompt=222, completion=169, total=391 |
| Schema Valid | ✅ Yes (score, passed, checks, blocking_issues, fix_suggestions) |
| Fallback | No |

---

## Gemini Provider Tests (AI_PROVIDER=gemini, GEMINI_MODEL=gemini-2.0-flash)

### Test 4: moduleType=brief ✅ PASS (after rate-limit retry)

```powershell
$body = '{"moduleType":"brief","input":{},"context":{"brief":"Test project for fintech"}}'
$r = Invoke-WebRequest -Uri "http://localhost:3000/api/ai-copilot" -Method POST -ContentType "application/json" -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -UseBasicParsing -TimeoutSec 60
```

| Metric | Value |
|---|---|
| HTTP Status | 200 |
| Provider | gemini |
| Schema Valid | ✅ Yes (summary, missing_questions, assumptions, recommended_kpis, risks, next_actions) |
| Fallback | No |
| Note | First attempt hit 429 rate limit (retryDelay: 58s) — fallback to mock worked correctly. Retry after 60s succeeded with real Gemini response. |

---

## Key-Missing Fallback Tests

### Test 5: OpenAI — no API key ✅ PASS

```env
AI_PROVIDER=openai
# OPENAI_API_KEY omitted
```

| Metric | Value |
|---|---|
| HTTP Status | 200 |
| Response | ok=True, mock data returned |
| Audit Event | `provider_key_missing` { provider: "openai" } |
| `fellBackFromKeyMissing` | true |

### Test 6: Gemini — no API key ✅ PASS

```env
AI_PROVIDER=gemini
# GEMINI_API_KEY omitted
```

| Metric | Value |
|---|---|
| HTTP Status | 200 |
| Response | ok=True, mock data returned |
| Audit Event | `provider_key_missing` { provider: "gemini" } |
| `fellBackFromKeyMissing` | true |

---

## Summary

| Test | Provider | Module | Status |
|---|---|---|---|
| 1 | OpenAI (real) | brief | ✅ PASS |
| 2 | OpenAI (real) | draft | ✅ PASS |
| 3 | OpenAI (real) | qa | ✅ PASS |
| 4 | Gemini (real) | brief | ✅ PASS (after 429 retry) |
| 5 | OpenAI (no key) | brief | ✅ Fallback |
| 6 | Gemini (no key) | brief | ✅ Fallback |

**All 6 tests PASS.** Both real providers return valid schema-compliant JSON. Fallback behavior works correctly for both providers. Gemini 429 rate-limit handled gracefully by fallback mechanism.
