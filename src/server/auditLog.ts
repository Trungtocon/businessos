// Server-side Audit Log — workspace-scoped JSONL
import { appendFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import type { AuditEntry, AuditEvent } from "@/modules/actions/types";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";

const DATA_DIR = join(process.cwd(), "data", "audit");
const AUDIT_FILE = join(DATA_DIR, "audit.jsonl");

function ensureDir() {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function appendAudit(entry: AuditEntry): void {
    ensureDir();
    appendFileSync(AUDIT_FILE, JSON.stringify(entry) + "\n", "utf-8");
}

export function logAction(
    event: AuditEvent,
    packId: string,
    actionId: string,
    actor: "system" | "user" = "system",
    details?: Record<string, unknown>,
    workspaceId: string = DEFAULT_WORKSPACE,
): void {
    appendAudit({
        timestamp: new Date().toISOString(),
        event,
        workspaceId,
        packId,
        actionId,
        actor,
        details,
    });
}

export function readAuditLog(packId?: string, workspaceId?: string): AuditEntry[] {
    ensureDir();
    if (!existsSync(AUDIT_FILE)) return [];
    const lines = readFileSync(AUDIT_FILE, "utf-8").trim().split("\n").filter(Boolean);
    let entries = lines.map(l => { try { return JSON.parse(l) as AuditEntry; } catch { return null; } }).filter(Boolean) as AuditEntry[];
    // Backward compat
    entries = entries.map(e => ({ ...e, workspaceId: e.workspaceId || DEFAULT_WORKSPACE }));
    if (workspaceId) entries = entries.filter(e => e.workspaceId === workspaceId);
    if (packId) entries = entries.filter(e => e.packId === packId);
    return entries;
}
