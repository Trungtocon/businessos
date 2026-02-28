# Sprint 6.1 — Gate Report

**Date:** 2026-02-27
**Verdict:** ✅ **GO**

## Gate Results

| Gate | Status | Detail |
|------|--------|--------|
| `npm run build` | ✅ Exit 0 | Production build |
| `npm run uat:packs:prod` | ✅ **7/7** (7.8s) | 0 flaky, 0 skipped |

## What Changed

| File | Change |
|------|--------|
| `playwright.prod.config.ts` | **NEW** — prod config on port 3005 via `next start` |
| `scripts/uat/prewarm.mjs` | **NEW** — sequential URL prewarm with retry |
| `scripts/uat/packs-gate-s6.spec.ts` | **HARDENED** — hydration guard, networkidle, reload fallback |
| `package.json` | Added `uat:packs:prod`, `uat:prewarm`, `gate:all:prod` |

## How to Run

```powershell
# Build first (required for prod tests)
npm run build

# Run prod packs gate (deterministic, no cold-start flake)
npm run uat:packs:prod

# Full prod release gate (build + prod-gate + nav + packs:prod)
npm run gate:all:prod
```

## Why Prod Server?

The dev server (`next dev`) compiles JS bundles on-demand. On first page visit, the page shell loads but client-side React hydration and API fetches are blocked by bundle compilation (~15-30s). This causes the packs page UI test to be flaky.

The prod server (`next start`) serves pre-compiled bundles, eliminating this issue. All 7 tests pass deterministically in <10s.

## Release Policy

- **Release gate:** `npm run gate:all:prod` (production server, deterministic)
- **Dev check:** `npm run uat:packs` (dev server, optional, may flake on cold start)
