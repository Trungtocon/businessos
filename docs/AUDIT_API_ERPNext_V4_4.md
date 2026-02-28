# Audit: API & ERPNext Integration V4.4

**Date:** 2026-02-27
**Status:** ⚠️ Missing Strict Schema Validation

## Overview
The backend connectors for ERPNext (`src/connectors/erpnext/*`) and their corresponding Next.js route handlers (`src/app/api/integrations/erpnext/*`) were audited for logic and resilience.

## Findings

### 1. Robust Security Guard on Execution (P0: ✅ PASS)
**Location:** `api/integrations/erpnext/actions/execute/route.ts`
The execute endpoint strictly enforces that an `actionId` must reside in the in-memory store and its `status` must be `"approved"` before firing to the actual ERPNext backend. Arbitrary execution via direct API payload is blocked.

### 2. Secrets Handling (P0: ✅ PASS)
No secrets are sent to the client. The client requests `/api/integrations/erpnext/ping`, which uses server-side configurations (`hasAuthConfig()`) to communicate with the Docker backend. 

### 3. Missing Input Validation (P1: ⚠️ RISK)
**Location:** All POST endpoints.
Neither the Copilot routes nor the ERPNext action routes utilize runtime schema validation (e.g., `zod`). 
- The `execute` route casts `body` as `{ actionId: string }` without verifying the type runtime.
- A maliciously malformed JSON payload could cause a 500 error if `body.actionId` is undefined or an unexpected type.

**Fix Recommendation:**
Implement `zod` schemas for `POST` bodies on `auth/test`, `actions/execute`, and Copilot AI endpoints.
