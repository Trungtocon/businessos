import { NextResponse } from "next/server";
import { getPackById, buildDraftsFromPack } from "@/modules/packs/generator";
import { addActions } from "@/server/actionsStore";
import { logAction } from "@/server/auditLog";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";

export async function POST(request: Request) {
    try {
        const { workspaceId, packId } = await request.json();
        const wsId = workspaceId || DEFAULT_WORKSPACE;

        if (!packId) return NextResponse.json({ ok: false, error: "Missing packId" }, { status: 400 });

        const pack = getPackById(packId);
        if (!pack) return NextResponse.json({ ok: false, error: `Pack not found: ${packId}` }, { status: 404 });

        const drafts = buildDraftsFromPack(pack, wsId);
        addActions(drafts);

        for (const d of drafts) {
            logAction("action_created", d.packId, d.id, "system", { type: d.type, packName: pack.name }, wsId);
        }

        return NextResponse.json({
            ok: true,
            packId: drafts[0]?.packId,
            packName: pack.name,
            draftsCount: drafts.length,
            approvalUrl: "/virtual/approvals",
        });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
