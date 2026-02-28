# Production Gate — Sprint 5

## Overview

Automated production readiness checks run as part of `gate:all`.

## Checks

| # | Check | What it does | Fail behavior |
|---|-------|-------------|---------------|
| 1 | Secrets Leak | Scans git-tracked files + docs/ for API key patterns | Hard FAIL |
| 2 | Schema: actions | Validates actions.json has required fields | Hard FAIL |
| 3 | Schema: audit | Validates audit.jsonl entries | Hard FAIL |
| 4 | Route Drift | Compares pages vs NAV_CANONICAL_MAP_S1.json | PASS with delta report |

## Secret Patterns Scanned

- `ERPNEXT_API_KEY=...`
- `ERPNEXT_API_SECRET=...`
- `OPENAI_API_KEY=...`
- `GEMINI_API_KEY=...`
- `sk-*` (OpenAI format)
- `ghp_*` (GitHub PAT)

## How to Run

```powershell
npm run gate:prod           # standalone
npm run gate:all:fast       # includes prod-gate
npm run gate:all            # includes prod-gate
```

## Reports

Results included in `docs/GATE_ALL_REPORT.md` and `docs/GATE_ALL_REPORT.json`.
