import { NextResponse } from "next/server";
import type { Workspace } from "@/modules/actions/types";
import { DEFAULT_WORKSPACE } from "@/modules/actions/types";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data", "workspaces");
const WS_FILE = join(DATA_DIR, "workspaces.json");

function ensureDir() {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function readWorkspaces(): Workspace[] {
    ensureDir();
    if (!existsSync(WS_FILE)) {
        const defaults: Workspace[] = [
            { id: DEFAULT_WORKSPACE, name: "Default Workspace", createdAt: new Date().toISOString() },
        ];
        writeFileSync(WS_FILE, JSON.stringify(defaults, null, 2), "utf-8");
        return defaults;
    }
    try { return JSON.parse(readFileSync(WS_FILE, "utf-8")); } catch { return []; }
}

function writeWorkspaces(ws: Workspace[]) {
    ensureDir();
    writeFileSync(WS_FILE, JSON.stringify(ws, null, 2), "utf-8");
}

export async function GET() {
    return NextResponse.json({ ok: true, workspaces: readWorkspaces() });
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        if (!name) return NextResponse.json({ ok: false, error: "Missing name" }, { status: 400 });

        const all = readWorkspaces();
        const id = `ws_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const ws: Workspace = { id, name, createdAt: new Date().toISOString() };
        all.push(ws);
        writeWorkspaces(all);
        return NextResponse.json({ ok: true, workspace: ws });
    } catch (err) {
        return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
}
