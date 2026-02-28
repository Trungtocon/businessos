// Sprint Pack Input Model + Enums
// Shared across all 3 packs. Max 8 fields.

export const CHANNELS = ["facebook", "tiktok", "seo", "zalo", "email", "multi"] as const;
export const BUDGET_RANGES = ["low", "mid", "high"] as const;
export const TONES = ["expert", "friendly", "bold"] as const;
export const PACK_TYPES = ["lead", "content", "report"] as const;

export type Channel = (typeof CHANNELS)[number];
export type BudgetRange = (typeof BUDGET_RANGES)[number];
export type Tone = (typeof TONES)[number];
export type PackType = (typeof PACK_TYPES)[number];

export interface SprintInput {
    industry: string;
    offer: string;
    targetCustomer: string;
    primaryChannel: Channel;
    budgetRange: BudgetRange;
    tone: Tone;
    goal7d: string;
    constraints?: string;
}

export const DEFAULT_INPUT: SprintInput = {
    industry: "",
    offer: "",
    targetCustomer: "",
    primaryChannel: "multi",
    budgetRange: "mid",
    tone: "expert",
    goal7d: "",
    constraints: "",
};

export const PACK_LABELS: Record<PackType, { title: string; description: string }> = {
    lead: { title: "Lead & CRM Sprint Pack", description: "ICP, personas, funnel plan, nurture sequences" },
    content: { title: "Content Engine Sprint Pack", description: "14-day calendar, hooks, CTAs, video scripts" },
    report: { title: "Weekly Growth Report", description: "KPIs, insights, decisions, prioritized tasks" },
};
