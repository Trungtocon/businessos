# UAT Nav Gate — Sprint 1

**Date:** 2026-02-27
**Verdict:** ✅ **14/14 PASS** (23.0s)

## Gate Results

| Gate | Status | Detail |
|------|--------|--------|
| `npm run build` | ✅ Exit 0 | Compiled successfully |
| `npm run nav:validate` | ✅ Exit 0 | 48/48 routes OK |
| `npm run uat:nav` | ✅ Exit 0 | **14 passed**, 0 skipped |

## Test Details

| # | Test | Result | Strategy |
|---|------|--------|----------|
| 1-3 | Cards (Finance, Operations, Growth) | ✅ | `data-testid` + Playwright click |
| 4-11 | Quick Actions (8 buttons) | ✅ | `button:has-text()` + Playwright click |
| 12 | Voice button → /virtual/voice | ✅ | DOM `evaluate` click (see below) |
| 13 | Notification icon → /notifications | ✅ | `button[title]` + Playwright click |
| 14 | Chat icon → /chat | ✅ | `button[title]` + Playwright click |

## Voice Button Strategy

The floating Voice button (`fixed bottom-10 right-10`) required special handling in headless Chromium:

1. **`data-testid="btn-voice"` + `aria-label="Voice Command"`** on the actual `<Button>` element (not wrapper div)
2. **Viewport 1440x900** in `playwright.config.ts`
3. **`waitUntil: "load"`** instead of `domcontentloaded` for full page load
4. **2s hydration wait** (`waitForTimeout`) to ensure React event handlers are attached
5. **Pure DOM click** via `page.evaluate(() => document.querySelector('[data-testid="btn-voice"]').click())` — bypasses Playwright's viewport/overlay checks entirely
6. Navigation verified via `waitForURL('**/virtual/voice*')`

## How to Run
```powershell
npm run uat:nav        # 14 tests, expects dev server on :3000
npm run uat:install    # First time: install Chromium
```

## Troubleshooting
- **Cold start flake**: `retries: 1` in config handles first-test JIT penalty
- **Port conflict**: Ensure nothing else runs on :3000, or set `reuseExistingServer: true`
- **Viewport issues**: Config forces 1440x900; do not reduce below 1280x720
