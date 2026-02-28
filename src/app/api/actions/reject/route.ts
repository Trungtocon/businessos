import { NextResponse } from "next/server";
import { getAction, updateAction } from "@/server/actionsStore";
import { logAction } from "@/server/auditLog";

export async function POST(request: Request) {
    try {
        const { id, reason } = await request.json();
        if (!id) return NextResponse.json({ ok: false, error: "Missing action id" }, { status: 400 });

        const action = getAction(id);
        if (!action) return NextResponse.json({ ok: false, error: "Action not found" }, { status: 404 });
        if (action.status !== "draft") return NextResponse.json({ ok: false, error: "Only drafts can be rejected" }, { status: 400 });

        const updated = updateAction(id, { status: "rejected", rejectionReason: reason || "No reason provided" });
        logAction("action_rejected", action.packId, id, "user", { reason }, action.workspaceId);
        return NextResponse.json({ ok: true, action: updated });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
