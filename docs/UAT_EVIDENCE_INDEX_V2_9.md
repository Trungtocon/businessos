# UAT Evidence Index — Business OS V2.9

| Field | Value |
|---|---|
| **Date** | 2026-02-16 |

---

## HTTP Verification Evidence

### Matrix A — Copilot OFF

| Test | Routes | Result |
|---|---|---|
| HTTP 200 check | 41 routes | **41 PASS, 0 FAIL** |

### Matrix B — Copilot ON (OpenAI)

| Test | Routes | Result |
|---|---|---|
| HTTP 200 check | 41 routes | **41 PASS, 0 FAIL** |
| Copilot references | 34 routes | **Copilot present in admin+portal layouts** |

---

## API Smoke Evidence

| # | Provider | Module | HTTP | Response Time | Tokens |
|---|---|---|---|---|---|
| 1 | OpenAI (real) | brief | 200 | 10,197ms | 554 |
| 2 | OpenAI (real) | draft | 200 | 4,223ms | — |
| 3 | OpenAI (real) | qa | 200 | 4,753ms | 391 |
| 4 | OpenAI (no key) | brief | 200 | 373ms | mock |
| 5 | Gemini (no key) | brief | 200 | 637ms | mock |

---

## Audit Log Evidence

### OpenAI Real Call (brief)
```
provider_selected  { provider: "openai", configuredProvider: "openai", fellBackFromKeyMissing: false }
provider_call_start { provider: "openai" }
provider_call_ok   { provider: "openai", tokenUsage: { prompt: 218, completion: 336, total: 554 } }
run_ai_module      { provider: "openai", fellBack: false }
POST /api/ai-copilot 200 in 10197ms
```

### OpenAI Key-Missing Fallback
```
provider_key_missing { provider: "openai" }
provider_selected    { provider: "mock", configuredProvider: "openai", fellBackFromKeyMissing: true }
run_ai_module        { provider: "mock", fellBackFromKeyMissing: true }
POST /api/ai-copilot 200 in 373ms
```

### Gemini Key-Missing Fallback
```
provider_key_missing { provider: "gemini" }
provider_selected    { provider: "mock", configuredProvider: "gemini", fellBackFromKeyMissing: true }
run_ai_module        { provider: "mock", fellBackFromKeyMissing: true }
POST /api/ai-copilot 200 in 637ms
```

---

## Route List (41 Total)

```
/login, /otp, /role, /onboarding, /splash
/dashboard, /users, /notifications, /settings, /workflow, /chat
/classic/marketplace, /classic/projects, /classic/briefing, /classic/checkout
/classic/team, /classic/finance, /classic/invoices, /classic/profile
/classic/reports, /classic/feedback
/freelancer, /freelancer/jobs, /freelancer/workspace, /freelancer/submit
/freelancer/timesheet, /freelancer/wallet, /freelancer/withdraw
/freelancer/profile, /freelancer/skills, /freelancer/test
/freelancer/learning, /freelancer/bank
/virtual, /virtual/approval, /virtual/war-room, /virtual/voice
/search, /pricing, /team, /error-states
```
