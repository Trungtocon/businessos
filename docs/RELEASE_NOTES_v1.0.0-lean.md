# Release Notes — v1.0.0-lean

**Date:** 2026-02-27
**Tag:** `v1.0.0-lean`
**Branch:** `release/v1.0.0-lean`

## Highlights

- **Multi-Portal Architecture** — Admin, Virtual, Classic, Freelancer, Auth portals with 40+ routes
- **Sprint Pack Engine** — Generate lead/content/report packs with schema validation
- **Action Lifecycle** — Draft → Approve → Execute with fail-closed safety
- **ERPNext Connector** — Real execution: ToDo + Lead creation with retry/timeout
- **Multi-Tenant Workspaces** — Workspace-scoped actions, audit, evidence
- **Pack Library + Onboarding** — One-click pack generation + onboarding wizard
- **E2E Gate Pipeline** — Deterministic prod gate: build + nav + uat + e2e

## Gate Status

| Gate | Status |
|------|--------|
| `npm run build` | ✅ Exit 0 |
| `npm run gate:prod` | ✅ (secrets + schema + drift) |
| `npm run nav:validate` | ✅ |
| `npm run uat:packs:prod` | ✅ |
| `npm run uat:e2e:prod` | ✅ 8/8 |
| `gate:all:prod` | ✅ Exit 0 |

## Known Limitations

1. **ERPNext validation_error** — Create ToDo may return 417 from ERPNext if the `reference_name` doesn't match an existing Note doctype. The system handles this gracefully (fail-closed with `validation_error` code).
2. **AI Provider** — Sprint pack generation uses mock data; AI provider integration is scaffolded but not production-active.
3. **FluentCRM** — Connector scaffolded, not implemented.

## How to Run

```powershell
# Full gate (build + all UATs)
npm run gate:all:prod

# Individual gates
npm run uat:erpnext       # ERPNext connector tests
npm run uat:e2e:prod      # E2E execution gate
npm run gate:prod         # Prod security/schema/drift

# Dev server
npm run dev
```

## Environment Setup

Copy `.env.local.example` to `.env.local` and fill in:
- `ERPNEXT_BASE_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET` (for ERPNext)
- `OPENAI_API_KEY` or `GEMINI_API_KEY` (for AI, optional in lean release)
