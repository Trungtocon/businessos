# Connector Contracts V4.5

**Date:** 2026-02-27

To support the transition from a hardcoded "ERPNext" connector to an agnostic "CRM Adapter" (supporting FluentCRM), the following contract must be established in the next tech sprint.

## 1. Agnostic Action Types
Currently, `types.ts` defines:
`export type ErpActionType = "ERP.CREATE_LEAD" | "ERP.CREATE_TODO";`

This must be abstracted to:
`export type CrmActionType = "CRM.CREATE_LEAD" | "CRM.CREATE_TAG" | "CRM.CREATE_SEQUENCE";`

## 2. Adapter Interface
```typescript
interface ICrmAdapter {
  providerId: "erpnext" | "fluentcrm" | "mock";
  ping(): Promise<{ ok: boolean; status: string }>;
  createLead(payload: LeadPayload): Promise<{ ok: boolean; externalId: string }>;
  createSequence(payload: SequencePayload): Promise<{ ok: boolean }>;
}
```

## 3. Data Transformation
- **FluentCRM:** Expects `first_name`, `last_name`, `email`, `tags[]`.
- **ERPNext:** Expects `lead_name`, `email_id`.

The Next.js backend `/api/integrations/crm/execute` will map the abstract `CrmActionType` payload into the provider-specific shape using the selected `ICrmAdapter`.
