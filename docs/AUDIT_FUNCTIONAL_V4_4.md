# Audit: Functionality & State Risks V4.4

**Date:** 2026-02-27
**Status:** ⚠️ Hydration Risks Identified

## Zustand Store Misuse

### Hydration Mismatches (P2)
**Location:** `src/lib/store.ts`
**Issue:** The global store uses the `persist` middleware (writing to `localStorage`). However, the store is exported directly as `useStore` without a hydration mechanism.
**Impact:** When evaluating server-rendered React components, Next.js uses the initial state (e.g., `theme: "light"`), but the client immediately tries to render the persisted state (e.g., `theme: "dark"`), leading to React hydration errors:
> *Warning: Text content did not match. Server: "light" Client: "dark"*

**Fix Recommendation:**
Implement a custom hook `useHydratedStore` that waits for `useEffect` before returning the store, or explicitly mark components that rely on persisted state with `next/dynamic` targeting `ssr: false`.

## Server/Client Boundary Violations
**Status:** ✅ Clean
A scan of `src/app` reveals no inappropriate imports of `fs`, `path`, or Node-only modules within `"use client"` components.

## Data Persistence & Mock Data (P3)
**Location:** `/classic/*` and `/virtual/*`
Many lists (e.g., projects, teams) rely entirely on `MOCK_DATA` seeded manually in `store.ts`. There are currently no boundaries drawn to shift this to actual database queries via server actions, which poses a scaling limit once real production data is introduced.
