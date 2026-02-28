// ERPNext Connector — Types
// Minimal DocType payloads and action contracts for Business OS integration.

// ── Action System ──

export type ErpActionType = "ERP.CREATE_LEAD" | "ERP.CREATE_TODO";

export type ErpActionStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "deferred"
    | "executing"
    | "executed"
    | "failed";

export interface ErpAction {
    id: string;
    type: ErpActionType;
    status: ErpActionStatus;
    payload: Record<string, unknown>;
    result?: ErpActionResult;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    approvedBy?: string;
    error?: string;
}

export interface ErpActionResult {
    ok: boolean;
    doctype: string;
    name: string; // ERPNext doc name (e.g. "LEAD-00001")
    url: string;  // link to doc in ERPNext
}

// ── DocType Payloads ──

export interface LeadPayload {
    lead_name: string;
    company_name?: string;
    email_id?: string;
    phone?: string;
    source?: string;
    notes?: string;
}

export interface ToDoPayload {
    description: string;
    priority?: "Low" | "Medium" | "High";
    date?: string;
    assigned_by?: string;
}

// ── API Response Envelope ──

export interface ErpApiResponse<T = unknown> {
    ok: boolean;
    provider: "erpnext";
    status: number;
    data?: T;
    error?: string;
    auditEventId?: string;
}
