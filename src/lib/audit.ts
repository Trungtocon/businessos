// V3.0.1 AI Copilot — Audit Logger
// Logs AI module runs, QA blocks, QA passes, context build events, and provider lifecycle.

export type AuditEvent =
    | "run_ai_module"
    | "qa_block_submit"
    | "qa_pass_submit"
    | "context_build_start"
    | "context_build_ok"
    | "context_build_rate_limited"
    | "context_build_error"
    | "provider_selected"
    | "provider_call_start"
    | "provider_call_ok"
    | "provider_call_fail"
    | "provider_fallback_used"
    | "provider_key_missing"
    | "schema_fail_closed"
    | "provider_rate_limited"
    | "provider_retry_exhausted"
    | "provider_fallback_mock_used"
    | "erp_action_created"
    | "erp_action_approved"
    | "erp_action_executed"
    | "erp_action_failed";

export interface AuditEntry {
    event: AuditEvent;
    timestamp: string;
    moduleType?: string;
    userId?: string;
    taskId?: string;
    metadata?: Record<string, unknown>;
}

const auditLog: AuditEntry[] = [];

/**
 * Log an audit event.
 */
export function logAudit(entry: Omit<AuditEntry, "timestamp">): void {
    const full: AuditEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
    };
    auditLog.push(full);

    if (process.env.NODE_ENV === "development") {
        console.log(`[AUDIT] ${full.event}`, JSON.stringify(full, null, 2));
    }
}

/**
 * Get audit log (for debugging/admin).
 */
export function getAuditLog(): AuditEntry[] {
    return [...auditLog];
}
