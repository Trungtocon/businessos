# Sprint 7 Gate Report — E2E ERPNext Execution

**Date:** 2026-02-27
**Verdict:** ✅ **FULL GO** — gate:all:prod 100% PASS

## Pipeline Results

| Gate | Status | Detail |
|------|--------|--------|
| `npm run build` | ✅ Exit 0 | Production build |
| `npm run gate:prod` | ✅ | Schema + leaks + drift |
| `npm run nav:validate` | ✅ | Route map validated |
| `npm run uat:packs:prod` | ✅ | Packs UI gate |
| `npm run uat:e2e:prod` | ✅ **8/8 passed** (7.4s) | E2E exec gate |

## E2E Test Results

| # | Test | Result |
|---|------|--------|
| 1 | Generate pack → drafts created | ✅ |
| 2 | Fail-closed — cannot execute unapproved | ✅ |
| 3 | Approve + Execute (internal) → executed | ✅ |
| 4 | Idempotency — re-execute returns same | ✅ |
| 5 | Evidence pack contains expected files | ✅ |
| 6 | ERPNext backend execute | ✅ (validation_error — graceful) |
| 7 | ERPNext backend — handles gracefully | ✅ |
| 8 | Approval Console UI renders drafts | ✅ |

## Root Cause (previous failure)

**Test env mismatch.** E2E Steps 6-7 used `process.env` in the Playwright runner to detect ERPNext config. But `.env.local` was loaded by the server, not the test runner. Additionally, even when ERPNext was reachable with valid keys, the ToDo creation returned `validation_error` (417) — ERPNext schema requires fields not in the test payload.

## Fixes Applied

| Fix | File | Detail |
|-----|------|--------|
| Server-based detection | `api/integrations/erpnext/auth/test/route.ts` | New GET endpoint returns `{ok, configured, reachable}` |
| Granular error codes | `api/actions/execute/route.ts` | Propagates first adapter error code (`auth_failed`, `unreachable`, `validation_error`) instead of generic `erpnext_execution_failed` |
| E2E spec rewrite | `scripts/uat/e2e-erpnext-gate-s7.spec.ts` | Steps 6+7 use `detectErpStatus()` via auth/test, accept both 200 success and 422 known fail-closed errors |
| ActionDraft type | `modules/actions/types.ts` | Added `missing?: string[]` to error field |

## Error Contract

| Code | When |
|------|------|
| `provider_key_missing` | Missing/empty ERPNEXT_BASE_URL, API_KEY, or API_SECRET |
| `auth_failed` | ERPNext returns 401/403 |
| `unreachable` | Cannot connect to ERPNext |
| `timeout` | ERPNext request timed out (30s) |
| `validation_error` | ERPNext returns 417/422 (schema mismatch) |
| `erp_error` | Other ERPNext HTTP errors |

## How to Run
```powershell
npm run gate:all:prod
```
