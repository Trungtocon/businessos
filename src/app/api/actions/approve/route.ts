import { NextResponse } from "next/server";
import { getAction, updateAction } from "@/server/actionsStore";
import { logAction } from "@/server/auditLog";

export async function POST(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) return NextResponse.json({ ok: false, error: "Missing action id" }, { status: 400 });

        const action = getAction(id);
        if (!action) return NextResponse.json({ ok: false, error: "Action not found" }, { status: 404 });
        if (action.status !== "draft") return NextResponse.json({ ok: false, error: "Only drafts can be approved" }, { status: 400 });

        const updated = updateAction(id, { status: "approved" });
        logAction("action_approved", action.packId, id, "user", {}, action.workspaceId);
        return NextResponse.json({ ok: true, action: updated });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
