// Pack Generator — build ActionDrafts from a PackDef
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { ActionDraft } from "@/modules/actions/types";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";
import type { PackDef } from "./types";
import { PacksFileSchema } from "./schemas";

const PACKS_FILE = join(process.cwd(), "data", "packs", "packs.json");

function uid(): string {
    return `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function loadPacks(): PackDef[] {
    if (!existsSync(PACKS_FILE)) return [];
    const raw = JSON.parse(readFileSync(PACKS_FILE, "utf-8"));
    const result = PacksFileSchema.safeParse(raw);
    if (!result.success) throw new Error(`Invalid packs.json: ${result.error.message}`);
    return result.data;
}

export function getPackById(packId: string): PackDef | undefined {
    return loadPacks().find(p => p.id === packId);
}

export function buildDraftsFromPack(
    pack: PackDef,
    workspaceId: string = DEFAULT_WORKSPACE,
): ActionDraft[] {
    const now = new Date().toISOString();
    const packRunId = `${pack.id}_${Date.now()}`;

    return pack.actions.map(actionDef => ({
        id: uid(),
        workspaceId,
        packId: packRunId,
        packType: pack.packType,
        type: actionDef.type,
        backend: actionDef.backend,
        payload: { description: actionDef.description, packName: pack.name },
        riskLevel: actionDef.riskLevel,
        requiresApproval: true as const,
        evidence: { packId: packRunId, summary: actionDef.description },
        status: "draft" as const,
        createdAt: now,
        updatedAt: now,
    }));
}
