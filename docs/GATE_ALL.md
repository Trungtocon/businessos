# Gate All-in-One

Run all quality gates in a single command with a consolidated report.

## Commands

| Command | What it runs | When to use |
|---------|-------------|-------------|
| `npm run gate:all` | build + nav + all UAT suites | Before release or PR merge |
| `npm run gate:all:fast` | build + nav:validate only | Quick check during dev |

## FULL Gate Order

| # | Step | Required | Notes |
|---|------|----------|-------|
| 1 | `npm run build` | ✅ | Production compilation |
| 2 | `npm run nav:validate` | ✅ | 48 routes validated |
| 3 | `npm run uat:nav` | ✅ | 14 navigation tests |
| 4 | `npm run uat:product` | ✅ | 6 Sprint Pack tests |
| 5 | `npm run uat:approval` | ✅ | 4 approval flow tests |
| 6 | `npm run uat:evidence` | ✅ | 2 evidence pack tests |
| 7 | `npm run uat:erpnext` | ⏭ Optional | Only if ERPNext env vars are set |

## FAST Gate

Only runs steps 1-2 (build + nav:validate). Use during active development.

## ERPNext Gate (Optional)

Runs automatically if all 3 env vars are present:
```
ERPNEXT_BASE_URL=http://localhost:8081
ERPNEXT_API_KEY=your_key
ERPNEXT_API_SECRET=your_secret
```
If missing → step is SKIPPED (not FAIL).

## Reports

After running, find reports at:
- `docs/GATE_ALL_REPORT.md` — human-readable table + failure details
- `docs/GATE_ALL_REPORT.json` — machine-readable with log tails

## Interpreting Results

| Verdict | Meaning |
|---------|---------|
| ✅ PASS | All required steps passed. Optional steps may be SKIPPED. |
| ❌ FAIL | At least one required step failed. Check failure details. |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Playwright tests fail with "Cannot find module" | Run `npm run uat:install` first |
| UAT tests timeout | Ensure dev server is running on port 3000 |
| Port 3000 in use | Kill existing processes: `Stop-Process -Name node -Force` |
