import { NextResponse } from "next/server";
import { generateDraftsFromPack } from "@/modules/actions/fromPack";
import { addActions } from "@/server/actionsStore";
import { logAction } from "@/server/auditLog";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";

export async function POST(request: Request) {
    try {
        const { packId, packType, data, workspaceId } = await request.json();
        const wsId = workspaceId || DEFAULT_WORKSPACE;

        if (!packId || !packType || !data) {
            return NextResponse.json({ ok: false, error: "Missing packId, packType, or data" }, { status: 400 });
        }

        const drafts = generateDraftsFromPack(packId, packType, data, wsId);
        addActions(drafts);

        for (const d of drafts) {
            logAction("action_created", packId, d.id, "system", { type: d.type, backend: d.backend }, wsId);
        }

        return NextResponse.json({ ok: true, drafts });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
