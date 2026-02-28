# Evidence Pack — Sprint 3

## Purpose
Export a complete "handover dossier" for SME stakeholders — like an agency handoff package.

## Contents

| File | Description |
|------|-------------|
| input.json | Sprint inputs (industry, offer, target, etc.) |
| output.json | Validated pack output (schema-verified) |
| output.md | Human-readable Markdown output |
| actions.json | All action drafts with statuses and results |
| audit.jsonl | Full audit trail for the pack |
| evidence.md | Index file with summary, tables, next actions |

## Naming Convention
```
BusinessOS_Evidence_<packType>_<YYYYMMDD>_<packId>.json
```

## API
```
GET /api/evidence/pack?packId=...&packType=...&input=...&output=...
```
Returns JSON manifest with `Content-Disposition: attachment`.

## Evidence Index (evidence.md) includes:
- Pack summary (type, createdAt, industry, goal7d)
- File inventory table
- Actions table (id, type, status, risk)
- Audit trail event counts
- Next Actions (uncompleted items)
- Disclaimer footer

## Disk Storage
Evidence files are saved to:
```
data/evidence/<packId>/
├── input.json
├── output.json
├── output.md
├── actions.json
├── audit.jsonl
└── evidence.md
```

## Usage Flow
1. Generate Sprint Pack (any type)
2. Click "Tạo hành động (Draft)" → creates action drafts
3. Optionally approve/execute actions in Approval Console
4. Click "Xuất Evidence Pack" → downloads manifest + saves to disk
