# ERPNext Connector — Sprint 4

## Architecture

```
ActionDraft → Execute API → Backend Switch
                              ├─ internal → mark executed
                              ├─ erpnext  → client.ts → adapters.ts → ERPNext REST
                              └─ fluentcrm → (key check only)
```

## Server-Only Components

| File | Purpose |
|------|---------|
| `src/server/erpnext/client.ts` | REST wrapper with token auth, retry, error mapping |
| `src/server/erpnext/adapters.ts` | Action→DOCTYPE mappers (ToDo, Lead) |

## Environment Variables (server-only)

| Variable | Required | Description |
|----------|----------|-------------|
| ERPNEXT_BASE_URL | Yes | e.g. `http://localhost:8081` |
| ERPNEXT_API_KEY | Yes | API key from ERPNext |
| ERPNEXT_API_SECRET | Yes | API secret from ERPNext |
| ERPNEXT_VERIFY_TLS | No | `true` (default) or `false` |
| ERPNEXT_DEFAULT_OWNER | No | Email for document owner |
| ERPNEXT_DEFAULT_ASSIGNEE | No | Email for task assignment |

## Client Features
- Token auth: `Authorization: token api_key:api_secret`
- 30s timeout with AbortController
- 2 retries on 429/5xx with exponential backoff
- Error mapping: `unreachable`, `auth_failed`, `validation_error`, `timeout`

## Adapters

| Action Type | ERPNext Doctype | Adapted Fields |
|-------------|-----------------|----------------|
| CREATE_FOLLOWUP_TASKS_7D | ToDo | description, priority, status, date, allocated_to |
| CREATE_PRIORITIZED_TASKS | ToDo | description, priority (by impact), date |
| CREATE_CONTENT_TASKS | ToDo | description, priority, date |
| SCHEDULE_14D_CONTENT | ToDo | description per calendar item |
| CREATE_NURTURE_SEQUENCE_DRAFT | Lead | lead_name, company_name, notes |
| CREATE_PIPELINE_DRAFT | Lead | lead_name, notes, source |

## Fail-Closed Guards
- Missing env → status: `failed`, error: `provider_key_missing`
- ERPNext 401/403 → error: `auth_failed`
- ERPNext 417/422 → error: `validation_error`
- Timeout/unreachable → error: `timeout` or `unreachable`
- Partial success → stores created docs AND errors

## Backend Selector (UI)
- Approval Console shows `<select>` for draft actions: `internal` | `erpnext`
- API: `POST /api/actions/set-backend { id, backend }` (draft only)
