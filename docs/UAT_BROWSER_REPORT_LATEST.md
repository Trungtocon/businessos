# UAT Browser Report — Latest

**Date:** 2026-02-28 00:45
**Server:** localhost:3005 (production build)
**ERPNext:** local.site:8081 (Docker, 9 containers)
**Playwright:** v1.58.2 — **HEADED MODE**

## 🎉 VERDICT: GO — RELEASE READY

## Gate Results

| Gate | Status |
|------|--------|
| `gate:all:prod` | ✅ EXIT 0 |
| Playwright headed (29 tests) | ✅ **29 PASSED, 0 skipped** (1.2m) |

## Playwright UAT — Full Suite (headed)

| Suite | Tests | Passed | Skipped |
|-------|-------|--------|---------|
| E2E ERPNext Gate S7 | 8 | **8** | **0** |
| Nav Gate S1 | 15 | 15 | 0 |
| Packs Gate S6 | 6 | 6 | 0 |
| **Total** | **29** | **29** | **0** |

**Duration:** 1.2 minutes
**Mode:** Headed (browser visible to user)
**Traces:** Enabled (`--trace=on`)

## ERPNext Status

| Check | Result |
|-------|--------|
| Docker containers | ✅ 9/9 running |
| `/api/method/ping` | ✅ `pong` |
| `auth/test` | ✅ `configured=true, reachable=true` |
| Step 6 (ERPNext execute) | ✅ **PASSED** (not skipped!) |

## Routes Verified (Nav Gate — headed)

| Route | Status |
|-------|--------|
| `/virtual` | ✅ Hub loads |
| `/virtual/packs` | ✅ Pack cards render |
| `/virtual/approvals` | ✅ Console renders |
| `/virtual/onboarding` | ✅ Wizard renders |
| `/virtual/sprint/lead` | ✅ Navigates |
| `/virtual/sprint/content` | ✅ Navigates |
| `/virtual/sprint/report` | ✅ Navigates |
| `/virtual/voice` | ✅ Navigates |
| `/virtual/war-room` | ✅ Navigates |
| `/notifications` | ✅ Navigates |
| `/chat` | ✅ Navigates |

## E2E Flows Verified (headed)

| Flow | Status |
|------|--------|
| Pack generation → drafts | ✅ |
| Unapproved execution blocked | ✅ |
| Approve → execute (internal) | ✅ |
| Idempotency | ✅ |
| Evidence pack output | ✅ |
| ERPNext backend execute | ✅ **PASS** |
| ERPNext graceful handling | ✅ |
| Approval Console UI | ✅ |

## Environment

- Node: v24.11.1 | npm: 11.6.2
- Next.js: 14.2.0 | Playwright: 1.58.2
- Docker: v28.5.1 | ERPNext: 9 containers
- OS: Windows

## Reproduce

```powershell
# Start ERPNext Docker
docker compose -p erpnext up -d

# Run gate
npm run gate:all:prod

# Run headed UAT
npm run build
npx next start -p 3005 &
npx playwright test scripts/uat/ --headed --trace=on
```
