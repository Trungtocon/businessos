import { z } from "zod";

// ─── Lead/CRM Pack ────────────────────────────────────────────────────

export const LeadPackSchema = z.object({
    icp: z.object({
        who: z.string(),
        painPoints: z.array(z.string()),
        triggers: z.array(z.string()),
        exclusions: z.array(z.string()),
    }),
    persona: z.object({
        name: z.string(),
        context: z.string(),
        objections: z.array(z.string()),
        desiredOutcome: z.string(),
    }),
    offerAngles: z.array(z.object({
        angle: z.string(),
        promise: z.string(),
        proof: z.string(),
        cta: z.string(),
    })),
    funnelPlan: z.array(z.object({
        step: z.string(),
        channel: z.string(),
        asset: z.string(),
        successMetric: z.string(),
    })),
    crmPipelineStages: z.array(z.string()),
    nurtureSequences: z.object({
        sequence1: z.array(z.object({ day: z.number(), message: z.string(), channel: z.string(), cta: z.string() })),
        sequence2: z.array(z.object({ day: z.number(), message: z.string(), channel: z.string(), cta: z.string() })),
    }),
    followUpChecklist7d: z.array(z.string()),
    nextActions: z.array(z.string()),
});
export type LeadPack = z.infer<typeof LeadPackSchema>;

// ─── Content Pack ─────────────────────────────────────────────────────

export const ContentPackSchema = z.object({
    calendar14d: z.array(z.object({
        day: z.number(),
        theme: z.string(),
        format: z.string(),
        hook: z.string(),
        cta: z.string(),
    })),
    hooks10: z.array(z.string()),
    ctas10: z.array(z.string()),
    posts10: z.array(z.object({
        title: z.string(),
        caption: z.string(),
        channel: z.string(),
        hashtags: z.array(z.string()),
        visualBrief: z.string(),
    })),
    videos3: z.array(z.object({
        title: z.string(),
        script: z.string(),
        shots: z.array(z.string()),
    })),
    keyVisualBrief: z.object({
        concept: z.string(),
        colors: z.string(),
        typography: z.string(),
        do: z.string(),
        dont: z.string(),
    }),
    nextActions: z.array(z.string()),
});
export type ContentPack = z.infer<typeof ContentPackSchema>;

// ─── Weekly Report Pack ───────────────────────────────────────────────

export const ReportPackSchema = z.object({
    kpiSummary: z.array(z.object({
        kpi: z.string(),
        current: z.string(),
        target: z.string(),
        gap: z.string(),
        note: z.string(),
    })),
    insights3: z.array(z.string()),
    decisions3: z.array(z.string()),
    prioritizedTasks5: z.array(z.object({
        task: z.string(),
        impact: z.number().min(1).max(5),
        effort: z.number().min(1).max(5),
        ownerRole: z.string(),
        due: z.string(),
    })),
    risks: z.array(z.string()),
    nextActions: z.array(z.string()),
});
export type ReportPack = z.infer<typeof ReportPackSchema>;

// ─── Schema Map ───────────────────────────────────────────────────────

export const PACK_SCHEMAS = {
    lead: LeadPackSchema,
    content: ContentPackSchema,
    report: ReportPackSchema,
} as const;
