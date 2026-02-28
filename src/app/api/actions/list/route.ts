import { NextRequest, NextResponse } from "next/server";
import { listActions } from "@/server/actionsStore";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";

export async function GET(request: NextRequest) {
    const sp = request.nextUrl.searchParams;
    const workspaceId = sp.get("workspaceId") || DEFAULT_WORKSPACE;
    const packId = sp.get("packId") || undefined;
    const status = sp.get("status") as "draft" | "approved" | "executed" | "failed" | "rejected" | "deferred" | undefined;
    const packType = sp.get("packType") as "lead" | "content" | "report" | undefined;

    const actions = listActions({ workspaceId, packId, status, packType });
    return NextResponse.json({ ok: true, actions });
}
