import { NextResponse } from "next/server";
import { loadPacks } from "@/modules/packs/generator";

export async function GET() {
    try {
        const packs = loadPacks();
        return NextResponse.json({ ok: true, packs });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown" }, { status: 500 });
    }
}
