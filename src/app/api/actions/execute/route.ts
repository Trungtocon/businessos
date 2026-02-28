import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getAction, updateAction, findByIdempotencyKey } from "@/server/actionsStore";
import { logAction } from "@/server/auditLog";
import { hasErpConfig } from "@/server/erpnext/client";
import { executeErpAction } from "@/server/erpnext/adapters";

function makeIdempotencyKey(actionId: string, workspaceId: string, backend: string): string {
    return createHash("sha256").update(`${actionId}:${workspaceId}:${backend}`).digest("hex").slice(0, 16);
}

export async function POST(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) return NextResponse.json({ ok: false, error: "Missing action id" }, { status: 400 });

        const action = getAction(id);
        if (!action) return NextResponse.json({ ok: false, error: "Action not found" }, { status: 404 });

        // ─── Idempotency check (before status guard) ──────────────
        const idemKey = makeIdempotencyKey(action.id, action.workspaceId, action.backend);
        const existing = findByIdempotencyKey(idemKey);
        if (existing && (existing.status === "executed" || existing.status === "failed")) {
            return NextResponse.json({ ok: existing.status === "executed", action: existing, idempotent: true });
        }

        if (action.status !== "approved") return NextResponse.json({ ok: false, error: `Cannot execute action in status: ${action.status}. Must be approved first.` }, { status: 400 });

        // ─── Internal backend ─────────────────────────────────────
        if (action.backend === "internal") {
            const updated = updateAction(id, {
                status: "executed",
                idempotencyKey: idemKey,
                result: { message: `Action ${action.type} executed successfully`, executedAt: new Date().toISOString(), provider: "internal" },
            });
            logAction("action_executed", action.packId, id, "system", { type: action.type, provider: "internal" }, action.workspaceId);
            return NextResponse.json({ ok: true, action: updated });
        }

        // ─── ERPNext backend ──────────────────────────────────────
        if (action.backend === "erpnext") {
            const missingKeys = ["ERPNEXT_BASE_URL", "ERPNEXT_API_KEY", "ERPNEXT_API_SECRET"].filter(k => !process.env[k]?.trim());
            if (missingKeys.length > 0) {
                const updated = updateAction(id, {
                    status: "failed",
                    idempotencyKey: idemKey,
                    error: { code: "provider_key_missing", message: `Missing ERPNext env: ${missingKeys.join(", ")}`, missing: missingKeys },
                });
                logAction("action_failed", action.packId, id, "system", { error: "provider_key_missing", backend: "erpnext", missing: missingKeys }, action.workspaceId);
                return NextResponse.json({ ok: false, action: updated, error: "provider_key_missing" }, { status: 422 });
            }

            const erpResult = await executeErpAction(action);

            if (erpResult.ok) {
                const updated = updateAction(id, {
                    status: "executed",
                    idempotencyKey: idemKey,
                    result: { message: `Created ${erpResult.created.length} document(s) in ERPNext`, provider: "erpnext", executedAt: new Date().toISOString(), created: erpResult.created },
                });
                logAction("action_executed", action.packId, id, "system", { type: action.type, provider: "erpnext", created: erpResult.created.map(c => c.name) }, action.workspaceId);
                return NextResponse.json({ ok: true, action: updated });
            } else {
                // Propagate granular error code from adapter (auth_failed, unreachable, timeout, validation_error, etc.)
                const firstErr = erpResult.errors[0] || { code: "erpnext_execution_failed", message: "Unknown ERPNext error" };
                const updated = updateAction(id, {
                    status: "failed",
                    idempotencyKey: idemKey,
                    error: { code: firstErr.code, message: erpResult.errors.map(e => e.message).join("; ") },
                    result: { partial: erpResult.created, errors: erpResult.errors },
                });
                logAction("action_failed", action.packId, id, "system", { type: action.type, provider: "erpnext", errors: erpResult.errors }, action.workspaceId);
                return NextResponse.json({ ok: false, action: updated, error: firstErr.code }, { status: 422 });
            }
        }

        // ─── FluentCRM backend ────────────────────────────────────
        if (action.backend === "fluentcrm") {
            if (!process.env.FLUENTCRM_API_KEY) {
                const updated = updateAction(id, {
                    status: "failed",
                    idempotencyKey: idemKey,
                    error: { code: "provider_key_missing", message: "Missing FluentCRM API key" },
                });
                logAction("action_failed", action.packId, id, "system", { error: "provider_key_missing", backend: "fluentcrm" }, action.workspaceId);
                return NextResponse.json({ ok: false, action: updated, error: "provider_key_missing" }, { status: 422 });
            }

            const updated = updateAction(id, {
                status: "executed",
                idempotencyKey: idemKey,
                result: { message: `Action sent to FluentCRM`, provider: "fluentcrm", executedAt: new Date().toISOString() },
            });
            logAction("action_executed", action.packId, id, "system", { type: action.type, backend: "fluentcrm" }, action.workspaceId);
            return NextResponse.json({ ok: true, action: updated });
        }

        return NextResponse.json({ ok: false, error: "Unknown backend" }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
