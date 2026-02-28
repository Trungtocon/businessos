// Action Contract Types — Sprint 5 (workspace-scoped)

export type PackType = "lead" | "content" | "report";
export type ActionBackend = "internal" | "erpnext" | "fluentcrm";
export type RiskLevel = "low" | "medium" | "high";
export type ActionStatus = "draft" | "approved" | "executed" | "failed" | "rejected" | "deferred";

export const DEFAULT_WORKSPACE = "default";

export interface Workspace {
    id: string;
    name: string;
    createdAt: string;
}

export interface ActionDraft {
    id: string;
    workspaceId: string;
    packId: string;
    packType: PackType;
    type: string;
    backend: ActionBackend;
    payload: Record<string, unknown>;
    riskLevel: RiskLevel;
    requiresApproval: true;
    evidence?: {
        packId: string;
        packHash?: string;
        summary?: string;
    };
    status: ActionStatus;
    createdAt: string;
    updatedAt: string;
    result?: Record<string, unknown>;
    error?: { code: string; message: string; missing?: string[] };
    rejectionReason?: string;
    deferReason?: string;
    idempotencyKey?: string;
}

export interface PackIdentity {
    packId: string;
    workspaceId: string;
    packType: PackType;
    createdAt: string;
    inputHash: string;
    outputHash: string;
    version: string;
}

export type AuditEvent =
    | "action_created"
    | "action_approved"
    | "action_executed"
    | "action_failed"
    | "action_rejected"
    | "action_deferred";

export interface AuditEntry {
    timestamp: string;
    event: AuditEvent;
    workspaceId: string;
    packId: string;
    actionId: string;
    actor: "system" | "user";
    details?: Record<string, unknown>;
}
