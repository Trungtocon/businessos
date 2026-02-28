// Pack Library Types

export type PackGoal = "lead_generation" | "brand_awareness" | "performance_tracking";
export type PackDuration = "7d" | "14d" | "30d";
export type PackPriceTier = "free" | "starter" | "pro";

export interface PackActionDef {
    type: string;
    backend: "internal" | "erpnext" | "fluentcrm";
    riskLevel: "low" | "medium" | "high";
    description: string;
}

export interface PackInputDef {
    key: string;
    label: string;
    type: "text" | "select" | "number";
    options?: string[];
    required: boolean;
}

export interface PackDef {
    id: string;
    name: string;
    description: string;
    packType: "lead" | "content" | "report";
    industry: string[];
    goal: PackGoal;
    duration: PackDuration;
    priceTier: PackPriceTier;
    version: string;
    actions: PackActionDef[];
    inputs: PackInputDef[];
    createdAt: string;
}
