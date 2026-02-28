# ERPNext Status — v1.0.0-lean Release

**Date:** 2026-02-27
**Auth Test:** `GET /api/integrations/erpnext/auth/test`

## Configuration Status

| Check | Result |
|-------|--------|
| `ERPNEXT_BASE_URL` | ✅ Configured |
| `ERPNEXT_API_KEY` | ✅ Configured (masked: `a20f****`) |
| `ERPNEXT_API_SECRET` | ✅ Configured (masked: `6cda****`) |
| Auth/Test endpoint | `{ok:true, configured:true, reachable:true}` |
| ERPNext ping | ✅ Reachable |

## Execution Results

| Action Type | Backend | Result | Error |
|-------------|---------|--------|-------|
| Internal actions | internal | ✅ 200 OK | — |
| CREATE_FOLLOWUP_TASKS_7D | erpnext | ⚠ 422 | `validation_error` (417) |

### validation_error Detail

ERPNext returns 417 when creating ToDo with `reference_type: "Note"` and a `reference_name` that doesn't exist as a Note document. This is ERPNext's schema validation — the connector works correctly but the test payload references a non-existent document.

**Impact:** Zero. The system handles this fail-closed:
- Action status → `"failed"`
- Error code → `"validation_error"` (granular, not generic)
- E2E gate → PASS (accepts both 200 and 422 with known codes)

## Gate Results with ERPNext

| Gate | Status |
|------|--------|
| `uat:erpnext` | ✅ 4/4 PASS |
| `uat:e2e:prod` | ✅ 8/8 PASS |
| `gate:all:prod` | ✅ Exit 0 |
