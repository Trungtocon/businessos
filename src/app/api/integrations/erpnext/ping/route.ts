// GET /api/integrations/erpnext/ping
// Proxy ping to ERPNext — no auth required.

import { NextResponse } from "next/server";
import { pingErpNext } from "@/connectors/erpnext";
import { logAudit } from "@/lib/audit";

export async function GET() {
    const auditEventId = `erp_ping_${Date.now()}`;

    try {
        const result = await pingErpNext();

        logAudit({
            event: "erp_action_executed",
            metadata: { auditEventId, action: "ping", result },
        });

        return NextResponse.json({
            ok: true,
            provider: "erpnext",
            status: result.status,
            message: result.data?.message,
            auditEventId,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);

        logAudit({
            event: "erp_action_failed",
            metadata: { auditEventId, action: "ping", error: message },
        });

        return NextResponse.json(
            { ok: false, provider: "erpnext", error: message, auditEventId },
            { status: 502 }
        );
    }
}
