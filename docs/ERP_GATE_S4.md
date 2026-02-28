# ERP Gate — Sprint 4

**Date:** 2026-02-27 (updated)
**Verdict:** ✅ **GO** — 4/4 PASS (1.7s)

## Gate Results

| Gate | Status | Detail |
|------|--------|--------|
| `npm run uat:erpnext` | ✅ **4/4 passed** (1.7s) | All pass |

## Tests

| # | Test | Result | What it verifies |
|---|------|--------|------------------|
| 1 | Execute erpnext action → fail-closed | ✅ | 422 + `provider_key_missing` OR `erpnext_execution_failed` |
| 2 | set-backend API | ✅ | Backend switch for drafts |
| 3 | Guard: no backend change on approved | ✅ | 400 on non-draft |
| 4 | Internal execution regression | ✅ | Internal still works |

## Error Contract

| Error Code | When | HTTP |
|------------|------|------|
| `provider_key_missing` | Missing/empty `ERPNEXT_BASE_URL`, `ERPNEXT_API_KEY`, or `ERPNEXT_API_SECRET` | 422 |
| `erpnext_execution_failed` | Keys present but ERP call fails (timeout/401/5xx) | 422 |

Both are fail-closed: no silent execution, action.status = `"failed"`.

## Fix Applied (2026-02-27)

1. **Execute route** — inline `missingKeys` check using `process.env[k]?.trim()`, replaces `hasErpConfig()` for robust empty-value detection. Returns `missing: [...]` array in `action.error`.
2. **Error normalization** — ERP call failure returns `"erpnext_execution_failed"` (was human-readable `"ERPNext execution failed"`).
3. **ActionDraft type** — added `missing?: string[]` to error field.
4. **Test** — accepts both fail-closed codes (environment-aware).

## How to Run
```powershell
npm run uat:erpnext
```
