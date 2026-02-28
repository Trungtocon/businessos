# CHANGELOG — Business OS

## v1.0.0-lean (2026-02-27)

### Sprint 1 — Scaffolding + Navigation
- Multi-portal architecture (Admin, Virtual, Classic, Freelancer, Auth)
- 40+ route scaffolding with design system
- Navigation validation gate (`nav:validate`)

### Sprint 2 — Sprint Packs + AI Generation
- `/api/sprint/generate` with schema-validated packs (lead/content/report)
- Mock data engine + Zod validation
- UI pages: `/virtual/sprint/lead`, `/content`, `/report`

### Sprint 3 — Action Drafts + Approval Gate + Evidence Pack
- ActionDraft lifecycle (draft → approved → executed/failed)
- Approval Console UI (`/virtual/approvals`)
- Evidence Pack export (actions.json, audit.jsonl, evidence.md)

### Sprint 4 — ERPNext Connector V1
- ERPNext REST client (token auth, retry, timeout)
- ToDo/Lead adapters
- `uat:erpnext` gate (4 tests)

### Sprint 5 — Multi-Tenant Workspaces + Production Gate
- workspaceId across all lifecycle stages
- Idempotency for execute
- Production gate script (`gate:prod`)

### Sprint 6 — Pack Library + Generator + Onboarding
- Pack library (`/virtual/packs`) with filters
- `/api/packs/generate` endpoint
- Onboarding wizard (`/virtual/onboarding`)

### Sprint 7 — E2E ERPNext Execution Gate
- Full E2E gate: packs → drafts → approve → execute → evidence
- Server-based ERP config detection (`/api/integrations/erpnext/auth/test`)
- Granular error codes: `provider_key_missing`, `auth_failed`, `unreachable`, `validation_error`
- `gate:all:prod` pipeline (build + gate:prod + nav + uat:packs + uat:e2e)

### Release Fixes
- Route drift check path fix (docs/ canonical path)
- ERPNext adapter error propagation (granular codes from client.ts)
- E2E Steps 6-7 environment-aware assertions
