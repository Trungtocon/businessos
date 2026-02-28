// Server-side Actions Store — workspace-scoped JSON
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import type { ActionDraft, ActionStatus, PackType } from "@/modules/actions/types";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";

const DATA_DIR = join(process.cwd(), "data", "actions");
const ACTIONS_FILE = join(DATA_DIR, "actions.json");

function ensureDir() {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function readAll(): ActionDraft[] {
    ensureDir();
    if (!existsSync(ACTIONS_FILE)) return [];
    try {
        const raw = JSON.parse(readFileSync(ACTIONS_FILE, "utf-8")) as ActionDraft[];
        // Backward compat: assign default workspaceId if missing
        return raw.map(a => ({ ...a, workspaceId: a.workspaceId || DEFAULT_WORKSPACE }));
    } catch {
        return [];
    }
}

function writeAll(actions: ActionDraft[]) {
    ensureDir();
    writeFileSync(ACTIONS_FILE, JSON.stringify(actions, null, 2), "utf-8");
}

export function listActions(filters?: {
    workspaceId?: string;
    packId?: string;
    status?: ActionStatus;
    packType?: PackType;
}): ActionDraft[] {
    let all = readAll();
    if (filters?.workspaceId) all = all.filter(a => a.workspaceId === filters.workspaceId);
    if (filters?.packId) all = all.filter(a => a.packId === filters.packId);
    if (filters?.status) all = all.filter(a => a.status === filters.status);
    if (filters?.packType) all = all.filter(a => a.packType === filters.packType);
    return all;
}

export function getAction(id: string): ActionDraft | undefined {
    return readAll().find(a => a.id === id);
}

export function addActions(drafts: ActionDraft[]): void {
    const all = readAll();
    all.push(...drafts);
    writeAll(all);
}

export function updateAction(id: string, update: Partial<ActionDraft>): ActionDraft | null {
    const all = readAll();
    const idx = all.findIndex(a => a.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...update, updatedAt: new Date().toISOString() };
    writeAll(all);
    return all[idx];
}

// Idempotency check
export function findByIdempotencyKey(key: string): ActionDraft | undefined {
    return readAll().find(a => a.idempotencyKey === key);
}
