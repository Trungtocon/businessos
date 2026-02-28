# UAT Evidence Index — Business OS V2.7

| Field | Value |
|---|---|
| **Date** | 2026-02-15 |
| **Evidence Dir** | `docs/uat_evidence/v2_7/` |

---

## Screenshot Evidence

| # | File | Description | Matrix |
|---|---|---|---|
| 1 | `admin_dashboard_baseline.png` | Admin dashboard with stat cards, chart, registration table, sidebar nav | A (OFF) |
| 2 | `freelancer_dashboard_baseline.png` | Freelancer dashboard with earnings, task list, calendar, sidebar | A (OFF) |

---

## HTTP Verification Evidence

### Matrix A — All Flags OFF

| Test | Routes | Result |
|---|---|---|
| HTTP 200 check | 41 routes | **41 PASS, 0 FAIL** |
| Copilot DOM search | 5 sampled pages | **0 matches** — Copilot correctly hidden |

### Matrix B — All Flags ON

| Test | Routes | Result |
|---|---|---|
| HTTP 200 check | 41 routes | **41 PASS, 0 FAIL** |
| Copilot HTML match | `/freelancer` page | **True** — Copilot references present |

---

## Code Verification Evidence

| Check | File | Line | Result |
|---|---|---|---|
| Flag gate | `aiCopilotStore.ts` | 68 | `isEnabled: process.env.NEXT_PUBLIC_AI_COPILOT_ENABLED === "true"` ✅ |
| FAB injection (admin) | `(admin)/layout.tsx` | 11-12 | `<AICopilotFAB>` + `<AICopilotDrawer>` ✅ |
| FAB injection (portal) | `(portal)/layout.tsx` | 12-13 | Same components ✅ |
| Context enrichment | `buildContextPack.client.ts` | 46 | `NEXT_PUBLIC_CONTEXT_ENRICH_ENABLED !== "false"` ✅ |
| QA gate | `submit/page.tsx` | 14 | `AI_ENABLED` const ✅ |

---

## Browser Recordings

| Recording | Description |
|---|---|
| `uat_admin_dashboard` | Admin dashboard navigation and visual verification |
| `uat_freelancer_dash` | Freelancer dashboard load and screenshot capture |

---

## Route List (41 Total)

```
/login, /otp, /role, /onboarding, /splash,
/dashboard, /users, /notifications, /settings, /workflow, /chat,
/classic/marketplace, /classic/projects, /classic/briefing, /classic/checkout,
/classic/team, /classic/finance, /classic/invoices, /classic/profile,
/classic/reports, /classic/feedback,
/freelancer, /freelancer/jobs, /freelancer/workspace, /freelancer/submit,
/freelancer/timesheet, /freelancer/wallet, /freelancer/withdraw,
/freelancer/profile, /freelancer/skills, /freelancer/test,
/freelancer/learning, /freelancer/bank,
/virtual, /virtual/approval, /virtual/war-room, /virtual/voice,
/search, /pricing, /team, /error-states
```
