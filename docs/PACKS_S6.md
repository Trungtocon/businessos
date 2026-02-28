# Pack Library — Sprint 6

## Overview

Pack Library provides pre-built Sprint Packs that SMEs can browse, filter, and generate action drafts from. An Onboarding wizard guides new users through workspace → industry → goal → pack selection.

## Data

- `data/packs/packs.json` — 3 packs: Lead SME (3 actions), Content 14d (2 actions), Weekly Report (1 action)

## Module

| File | Purpose |
|------|---------|
| `src/modules/packs/types.ts` | PackDef, PackActionDef, PackInputDef types |
| `src/modules/packs/schemas.ts` | Zod validation: PackDefSchema, PacksFileSchema |
| `src/modules/packs/generator.ts` | loadPacks, getPackById, buildDraftsFromPack |

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/packs/list` | GET | Returns all packs |
| `/api/packs/generate` | POST | `{ workspaceId, packId }` → creates drafts |

## UI

| Route | Description |
|-------|-------------|
| `/virtual/packs` | Pack Library with filter dropdowns (industry/goal/duration/priceTier) |
| `/virtual/onboarding` | 4-step wizard: workspace → industry → goal → pack → generate → redirect |

## Tests

- `scripts/uat/packs-gate-s6.spec.ts` — 7 tests (5 API + 2 UI)
- `npm run uat:packs`

## Production Gate

- `prod-gate.mjs` now validates `packs.json` schema (check 4/4)
