# Audit: Performance & Reliability V4.4

**Date:** 2026-02-27
**Status:** ⚠️ Cache Gaps Identified

## 1. ERPNext Ping Thrashing (P2)
**Location:** `/virtual` page (CockpitDashboardPage)
**Issue:** The dashboard performs a `fetch('/api/integrations/erpnext/ping')` inside a `useEffect` on every single mount. 
**Risk:** Navigating between tabs or routes unmounts and remounts the dashboard, instantly triggering another ping. Under heavy local development or fast tab-switching, this spams the Next.js origin server and the Docker container.
**Recommendation:** Implement `SWR` or React Query with a generous `dedupingInterval` (e.g., 30s), or utilize the global Next.js cache.

## 2. Missing Retries on LLM Calls (P1)
**Location:** `ai-copilot` connectors
**Issue:** Calls via the Gemini library may randomly fail due to 503 or 429 Rate Limits. There is currently no `p-retry` or exponential backoff wrapper around the `AI_MODEL.generateContent()` calls.
**Recommendation:** Wrap AI calls in an exponential backoff loop with a Max Attempts limit (e.g., 3).
