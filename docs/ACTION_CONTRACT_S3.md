# Action Contract — Sprint 3

## ActionDraft Schema

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique action ID (act_timestamp_random) |
| packId | string | Parent pack ID |
| packType | lead\|content\|report | Pack type |
| type | string | Action type (e.g. CREATE_FOLLOWUP_TASKS_7D) |
| backend | internal\|erpnext\|fluentcrm | Execution backend |
| payload | object | Action-specific data |
| riskLevel | low\|medium\|high | Risk assessment |
| requiresApproval | true | Always requires approval |
| status | draft→approved→executed | Lifecycle status |
| evidence | object? | Link to pack evidence |
| result | object? | Execution result |
| error | object? | Execution error |

## Action Types by Pack

| Pack | Action Type | Backend | Risk |
|------|-------------|---------|------|
| Lead | CREATE_FOLLOWUP_TASKS_7D | internal | low |
| Lead | CREATE_NURTURE_SEQUENCE_DRAFT | internal | medium |
| Lead | CREATE_PIPELINE_DRAFT | internal | low |
| Content | SCHEDULE_14D_CONTENT | internal | medium |
| Content | CREATE_CONTENT_TASKS | internal | low |
| Report | CREATE_PRIORITIZED_TASKS | internal | low |

## API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/actions/create-from-pack | Generate drafts from pack output |
| GET | /api/actions/list?packId=&status=&packType= | List/filter actions |
| POST | /api/actions/approve | Transition draft → approved |
| POST | /api/actions/reject | Transition draft → rejected |
| POST | /api/actions/defer | Transition draft → deferred |
| POST | /api/actions/execute | Execute approved action |

## Fail-Closed Guards
- Cannot execute un-approved action (returns 400)
- Missing API keys for external backends → status: failed, error: provider_key_missing
- All state transitions are audit-logged
