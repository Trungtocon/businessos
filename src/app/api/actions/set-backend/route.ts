import { NextResponse } from "next/server";
import { getAction, updateAction } from "@/server/actionsStore";
import type { ActionBackend } from "@/modules/actions/types";

export async function POST(request: Request) {
    try {
        const { id, backend } = await request.json() as { id: string; backend: ActionBackend };
        if (!id || !backend) return NextResponse.json({ ok: false, error: "Missing id or backend" }, { status: 400 });
        if (!["internal", "erpnext", "fluentcrm"].includes(backend)) {
            return NextResponse.json({ ok: false, error: "Invalid backend" }, { status: 400 });
        }

        const action = getAction(id);
        if (!action) return NextResponse.json({ ok: false, error: "Action not found" }, { status: 404 });
        if (action.status !== "draft") {
            return NextResponse.json({ ok: false, error: "Can only change backend for draft actions" }, { status: 400 });
        }

        const updated = updateAction(id, { backend });
        return NextResponse.json({ ok: true, action: updated });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
