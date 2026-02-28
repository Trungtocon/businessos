# ERPNext Connector V1 — Documentation

## Architecture

```
Browser → Business OS (Next.js) → ERPNext API (Docker)
                ↓
        API Routes (server-only)
                ↓
        src/connectors/erpnext/
```

**Keys never reach the client.** All ERPNext calls go through server-side API routes.

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `ERPNEXT_BASE_URL` | No | `http://localhost:8081` | ERPNext base URL |
| `ERPNEXT_SITE` | No | `local.site` | Frappe site name |
| `ERPNEXT_API_KEY` | For auth | — | API key (see API Key Guide) |
| `ERPNEXT_API_SECRET` | For auth | — | API secret |

## API Endpoints

### `GET /api/integrations/erpnext/ping`
Health check — no auth required.

```json
// Response
{ "ok": true, "provider": "erpnext", "message": "pong" }
```

### `POST /api/integrations/erpnext/auth/test`
Test API credentials.

```json
// Response (success)
{ "ok": true, "provider": "erpnext", "user": "api@business-os.local" }

// Response (no keys)
{ "ok": false, "error": "ERPNEXT_API_KEY and ERPNEXT_API_SECRET not configured" }
```

### `POST /api/integrations/erpnext/actions/execute`
Register or execute an action.

**Register** (returns registered action without executing):
```json
// Request
{
  "action": {
    "id": "unique-id",
    "type": "ERP.CREATE_TODO",
    "status": "pending",
    "payload": { "description": "Test TODO", "priority": "Low" },
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z"
  }
}
```

**Execute** (action must be in `approved` status):
```json
// Request
{ "actionId": "unique-id" }

// Response (success)
{
  "ok": true,
  "provider": "erpnext",
  "result": {
    "doctype": "ToDo",
    "name": "TODO-00001",
    "url": "http://localhost:8081/app/todo/TODO-00001"
  }
}
```

## Supported Action Types

| Type | DocType | Required Fields |
|---|---|---|
| `ERP.CREATE_LEAD` | Lead | `lead_name` |
| `ERP.CREATE_TODO` | ToDo | `description` |

## Approval Flow
1. Client creates action (status: `pending`)
2. Admin approves (status: `approved`)
3. Client calls execute with `actionId`
4. Server verifies approval → calls ERPNext → returns result

## Connector Module Structure
```
src/connectors/erpnext/
├── index.ts          # Barrel export
├── erpnext.client.ts # HTTP client with retry
├── auth.ts           # Auth header builder
├── actions.ts        # Action → REST mapping
├── action-store.ts   # In-memory action store
├── types.ts          # Type definitions
└── errors.ts         # Error normalization
```
