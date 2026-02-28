# Workspaces — Sprint 5

## Overview

Multi-tenant workspace isolation across the Action lifecycle. Every action, audit entry, and evidence pack is scoped to a `workspaceId`.

## Data Model

```typescript
interface Workspace { id: string; name: string; createdAt: string; }
const DEFAULT_WORKSPACE = "default";
```

All types updated:
- `ActionDraft.workspaceId` — required
- `AuditEntry.workspaceId` — required
- `EvidenceBundle.workspaceId` — required
- `PackIdentity.workspaceId` — required

## Backward Compatibility

Old data without `workspaceId` is automatically assigned `"default"` on read. No migration script needed.

## API Changes

| Endpoint | Change |
|----------|--------|
| POST /api/actions/create-from-pack | Accepts `workspaceId` in body |
| GET /api/actions/list | Accepts `workspaceId` query param |
| POST approve/reject/defer/execute | Uses action's stored workspaceId for audit |
| GET /api/evidence/pack | Accepts `workspaceId`, outputs to `data/evidence/<workspaceId>/` |
| GET /api/workspaces/list | **NEW** — returns workspace list |
| POST /api/workspaces/list | **NEW** — creates workspace |

## Storage Layout

```
data/
├── actions/actions.json      ← flat array, filtered by workspaceId
├── audit/audit.jsonl          ← each line includes workspaceId
├── evidence/<workspaceId>/    ← workspace-scoped evidence output
│   └── <packId>/
└── workspaces/workspaces.json ← workspace registry
```

## UI

- Approval Console: workspace selector dropdown in top bar
- Selection persisted in `localStorage` as `bos_workspace`

## Idempotency

Execute route generates `idempotencyKey = SHA256(actionId + workspaceId + backend)`.
If a duplicate execution is attempted, the previous result is returned without calling the backend again.
