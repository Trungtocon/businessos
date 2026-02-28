// ERPNext Action Adapters — map ActionDraft payloads to ERPNext doctypes
import { createDocument, getErpConfig, type ErpConfig, type ErpResult } from "./client";
import type { ActionDraft } from "@/modules/actions/types";

export interface AdapterResult {
    ok: boolean;
    created: { doctype: string; name: string; url: string }[];
    errors: { code: string; message: string }[];
}

function docUrl(cfg: ErpConfig, doctype: string, name: string): string {
    return `${cfg.baseUrl}/app/${doctype.toLowerCase().replace(/\s/g, "-")}/${name}`;
}

// ─── Create ToDo/Tasks ───────────────────────────────────────────────

export async function executeCreateTodos(action: ActionDraft): Promise<AdapterResult> {
    const cfg = getErpConfig();
    const result: AdapterResult = { ok: true, created: [], errors: [] };

    // Extract tasks from payload
    const tasks: { description: string; priority?: string; due?: string }[] = [];

    if (Array.isArray(action.payload.checklist)) {
        for (const item of action.payload.checklist as string[]) {
            tasks.push({ description: item, priority: "Medium" });
        }
    }
    if (Array.isArray(action.payload.tasks)) {
        for (const t of action.payload.tasks as { task: string; impact?: number; due?: string }[]) {
            tasks.push({
                description: t.task,
                priority: (t.impact ?? 3) >= 4 ? "High" : "Medium",
                due: t.due,
            });
        }
    }

    if (tasks.length === 0) {
        tasks.push({ description: `Action ${action.type} from pack ${action.packId}`, priority: "Medium" });
    }

    for (const task of tasks) {
        const res: ErpResult = await createDocument(cfg, "ToDo", {
            description: task.description,
            priority: task.priority || "Medium",
            status: "Open",
            date: task.due || new Date().toISOString().slice(0, 10),
            allocated_to: cfg.defaultAssignee || cfg.defaultOwner || undefined,
            reference_type: "Note",
            reference_name: action.packId,
        });

        if (res.ok && res.name) {
            result.created.push({ doctype: "ToDo", name: res.name, url: docUrl(cfg, "ToDo", res.name) });
        } else {
            result.errors.push(res.error || { code: "unknown", message: "Failed to create ToDo" });
            result.ok = false;
        }
    }

    return result;
}

// ─── Create Lead ─────────────────────────────────────────────────────

export async function executeCreateLead(action: ActionDraft): Promise<AdapterResult> {
    const cfg = getErpConfig();
    const result: AdapterResult = { ok: true, created: [], errors: [] };

    // Extract persona/ICP data from payload
    const persona = action.payload as {
        name?: string;
        context?: string;
        who?: string;
        company?: string;
        email?: string;
        phone?: string;
    };

    const leadName = persona.name || persona.who || `Lead from ${action.packType} pack`;

    const res = await createDocument(cfg, "Lead", {
        lead_name: leadName,
        company_name: persona.company || undefined,
        email_id: persona.email || undefined,
        phone: persona.phone || undefined,
        notes: persona.context || `Generated from BusinessOS Sprint Pack (${action.packId})`,
        source: "BusinessOS Sprint Pack",
    });

    if (res.ok && res.name) {
        result.created.push({ doctype: "Lead", name: res.name, url: docUrl(cfg, "Lead", res.name) });
    } else {
        result.errors.push(res.error || { code: "unknown", message: "Failed to create Lead" });
        result.ok = false;
    }

    return result;
}

// ─── Router ──────────────────────────────────────────────────────────

export async function executeErpAction(action: ActionDraft): Promise<AdapterResult> {
    switch (action.type) {
        case "CREATE_FOLLOWUP_TASKS_7D":
        case "CREATE_PRIORITIZED_TASKS":
        case "CREATE_CONTENT_TASKS":
        case "SCHEDULE_14D_CONTENT":
            return executeCreateTodos(action);

        case "CREATE_NURTURE_SEQUENCE_DRAFT":
        case "CREATE_PIPELINE_DRAFT":
            return executeCreateLead(action);

        default:
            return { ok: false, created: [], errors: [{ code: "unsupported_action", message: `No ERPNext adapter for action type: ${action.type}` }] };
    }
}
