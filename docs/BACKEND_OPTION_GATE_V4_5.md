# Backend Option Gate V4.5 (Lean V1)

**Date:** 2026-02-27
**Status:** ✅ GO (Safe Fallbacks)

## Requirement
Lean V1 must support ERPNext (via Docker) or FluentCRM (via WordPress) to push Leads and Sequences. The app must not break if the backend is offline or keys are missing.

## ERPNext Assessment
1. **Fallback Safety (✅ PASS):** The `POST /actions/execute` and `POST /auth/test` endpoints explicitly check `hasAuthConfig()` before firing `erpFetch`. If keys are missing, they return a clean `400` with an error message, preventing unhandled 500s or timeouts.
2. **Ping Safety (✅ PASS):** The dashboard `/ping` endpoint does not require auth. If the Docker container is down, `erpFetch` exhausts its 2 retries and returns `ok: false`, which powers the "Disconnected" UI state.
3. **Draft-Only Mode (✅ PASS):** The UI and Action Store treat backend actions as "Pending" until approved. If the backend is off, users can still generate deliverables, copy/export them, and leave the CRM actions in "Pending" without crashing the frontend.

## FluentCRM Assessment
There is currently no FluentCRM adapter. To pass the final Go-To-Market gate for WordPress-heavy SMEs, an abstraction layer must be implemented over the existing `types.ts -> ErpActionType`.
