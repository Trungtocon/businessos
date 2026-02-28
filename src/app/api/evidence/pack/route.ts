import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { buildEvidencePack, toEvidenceIndexMarkdown, buildEvidenceFiles, evidenceDir } from "@/modules/evidence/evidencePack";
import type { PackType } from "@/modules/actions/types";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";

export async function GET(request: NextRequest) {
    try {
        const sp = request.nextUrl.searchParams;
        const packId = sp.get("packId");
        const packType = sp.get("packType") as PackType | null;
        const workspaceId = sp.get("workspaceId") || DEFAULT_WORKSPACE;

        if (!packId || !packType) {
            return NextResponse.json({ ok: false, error: "Missing packId or packType" }, { status: 400 });
        }

        let input: Record<string, unknown> = {};
        let output: Record<string, unknown> = {};
        try {
            const rawInput = sp.get("input");
            if (rawInput) input = JSON.parse(decodeURIComponent(rawInput));
            const rawOutput = sp.get("output");
            if (rawOutput) output = JSON.parse(decodeURIComponent(rawOutput));
        } catch { /* use defaults */ }

        const bundle = buildEvidencePack(packId, packType, input, output, workspaceId);
        const evidenceMd = toEvidenceIndexMarkdown(bundle);
        const files = buildEvidenceFiles(bundle, evidenceMd);

        // Save to disk under workspace-scoped path
        const outDir = join(process.cwd(), evidenceDir(workspaceId, packId));
        if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
        for (const f of files) {
            writeFileSync(join(outDir, f.name), f.content, "utf-8");
        }

        const filename = `BusinessOS_Evidence_${packType}_${new Date().toISOString().slice(0, 10)}_${packId}.json`;

        return new NextResponse(
            JSON.stringify({
                packId,
                workspaceId,
                packType,
                files: files.map(f => ({ name: f.name, size: f.content.length })),
                evidenceIndex: evidenceMd,
                savedTo: outDir,
            }, null, 2),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Content-Disposition": `attachment; filename="${filename}"`,
                },
            }
        );
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
