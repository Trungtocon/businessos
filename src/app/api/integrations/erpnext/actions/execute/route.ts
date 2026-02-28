// POST /api/integrations/erpnext/actions/execute
// Execute an approved ERP action. Requires actionId referencing an approved action.

import { NextResponse } from "next/server";
import { executeAction, hasAuthConfig } from "@/connectors/erpnext";
import { registerAction, getAction, updateAction } from "@/connectors/erpnext/action-store";
import { logAudit } from "@/lib/audit";
import type { ErpAction } from "@/connectors/erpnext";

export async function POST(request: Request) {
    const auditEventId = `erp_exec_${Date.now()}`;

    try {
        const body = await request.json();
        const { actionId, action: inlineAction } = body as {
            actionId?: string;
            action?: ErpAction;
        };

        // If an inline action is provided (for dry-run / smoke test), register it
        if (inlineAction && !actionId) {
            registerAction(inlineAction);
            logAudit({
                event: "erp_action_created",
                metadata: { auditEventId, actionId: inlineAction.id, type: inlineAction.type },
            });
            return NextResponse.json({
                ok: true,
                provider: "erpnext",
                message: `Action ${inlineAction.id} registered (status: ${inlineAction.status})`,
                actionId: inlineAction.id,
                auditEventId,
            });
        }

        if (!actionId) {
            return NextResponse.json(
                { ok: false, error: "actionId is required", auditEventId },
                { status: 400 }
            );
        }

        const action = getAction(actionId);
        if (!action) {
            return NextResponse.json(
                { ok: false, error: `Action ${actionId} not found`, auditEventId },
                { status: 404 }
            );
        }

        // ── APPROVAL GUARD ──
        if (action.status !== "approved") {
            return NextResponse.json(
                {
                    ok: false,
                    error: `Action ${actionId} is not approved (status: ${action.status}). Approve first.`,
                    auditEventId,
                },
                { status: 403 }
            );
        }

        if (!hasAuthConfig()) {
            return NextResponse.json({
                ok: false,
                error: "ERPNEXT_API_KEY/SECRET not configured. Cannot execute. See docs/ERPNext_API_Key_Guide.md",
                auditEventId,
            }, { status: 400 });
        }

        // Execute
        updateAction(actionId, { status: "executing" });

        logAudit({
            event: "erp_action_approved",
            metadata: { auditEventId, actionId, type: action.type },
        });

        const result = await executeAction({ ...action, status: "approved" });

        updateAction(actionId, { status: "executed", result });

        logAudit({
            event: "erp_action_executed",
            metadata: { auditEventId, actionId, result },
        });

        return NextResponse.json({
            ok: true,
            provider: "erpnext",
            result,
            auditEventId,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        logAudit({
            event: "erp_action_failed",
            metadata: { auditEventId, error: message },
        });

        return NextResponse.json(
            { ok: false, provider: "erpnext", error: message, auditEventId },
            { status: 500 }
        );
    }
}
