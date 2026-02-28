import type { ActionDraft, PackType } from "./types";
import { DEFAULT_WORKSPACE } from "./types";

function uid(): string {
    return `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const now = () => new Date().toISOString();

export function generateDraftsFromPack(
    packId: string,
    packType: PackType,
    data: Record<string, unknown>,
    workspaceId: string = DEFAULT_WORKSPACE
): ActionDraft[] {
    switch (packType) {
        case "lead":
            return generateLeadDrafts(packId, data, workspaceId);
        case "content":
            return generateContentDrafts(packId, data, workspaceId);
        case "report":
            return generateReportDrafts(packId, data, workspaceId);
    }
}

function generateLeadDrafts(packId: string, data: Record<string, unknown>, workspaceId: string): ActionDraft[] {
    const base = { packId, workspaceId, packType: "lead" as const, requiresApproval: true as const, status: "draft" as const, createdAt: now(), updatedAt: now() };
    return [
        {
            ...base, id: uid(), type: "CREATE_FOLLOWUP_TASKS_7D", backend: "internal", riskLevel: "low",
            payload: { checklist: (data as { followUpChecklist7d?: string[] }).followUpChecklist7d ?? [] },
            evidence: { packId, summary: "7-day follow-up checklist from Lead Sprint Pack" },
        },
        {
            ...base, id: uid(), type: "CREATE_NURTURE_SEQUENCE_DRAFT", backend: "internal", riskLevel: "medium",
            payload: { sequences: (data as { nurtureSequences?: unknown }).nurtureSequences ?? {} },
            evidence: { packId, summary: "Email nurture sequences (2 sequences)" },
        },
        {
            ...base, id: uid(), type: "CREATE_PIPELINE_DRAFT", backend: "internal", riskLevel: "low",
            payload: { stages: (data as { crmPipelineStages?: string[] }).crmPipelineStages ?? [] },
            evidence: { packId, summary: "CRM Pipeline stages draft" },
        },
    ];
}

function generateContentDrafts(packId: string, data: Record<string, unknown>, workspaceId: string): ActionDraft[] {
    const base = { packId, workspaceId, packType: "content" as const, requiresApproval: true as const, status: "draft" as const, createdAt: now(), updatedAt: now() };
    return [
        {
            ...base, id: uid(), type: "SCHEDULE_14D_CONTENT", backend: "internal", riskLevel: "medium",
            payload: { calendar: (data as { calendar14d?: unknown[] }).calendar14d ?? [] },
            evidence: { packId, summary: "14-day content calendar scheduling" },
        },
        {
            ...base, id: uid(), type: "CREATE_CONTENT_TASKS", backend: "internal", riskLevel: "low",
            payload: { posts: ((data as { posts10?: unknown[] }).posts10 ?? []).length, videos: ((data as { videos3?: unknown[] }).videos3 ?? []).length },
            evidence: { packId, summary: "Content creation tasks (posts + videos)" },
        },
    ];
}

function generateReportDrafts(packId: string, data: Record<string, unknown>, workspaceId: string): ActionDraft[] {
    const base = { packId, workspaceId, packType: "report" as const, requiresApproval: true as const, status: "draft" as const, createdAt: now(), updatedAt: now() };
    return [
        {
            ...base, id: uid(), type: "CREATE_PRIORITIZED_TASKS", backend: "internal", riskLevel: "low",
            payload: { tasks: (data as { prioritizedTasks5?: unknown[] }).prioritizedTasks5 ?? [] },
            evidence: { packId, summary: "Prioritized tasks from Weekly Report" },
        },
    ];
}
