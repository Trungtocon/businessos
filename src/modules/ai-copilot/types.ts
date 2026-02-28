// V2.4 AI Copilot — Type Definitions

export type ModuleType = "brief" | "outline" | "draft" | "qa";

// --- Brief Analyzer ---
export interface BriefResult {
    summary: string;
    missing_questions: string[];
    assumptions: string[];
    recommended_kpis: string[];
    risks: string[];
    next_actions: string[];
}

// --- Outline Generator ---
export interface OutlineH2H3 {
    h2: string;
    h3: string[];
}
export interface OutlineKeyword {
    keyword: string;
    intent: string;
    placement: string;
}
export interface OutlineResult {
    title: string;
    meta_title: string;
    meta_description: string;
    h2_h3_outline: OutlineH2H3[];
    keyword_plan: OutlineKeyword[];
    cta_suggestions: string[];
}

// --- Draft Booster ---
export interface DraftResult {
    improved_text: string;
    changes: string[];
    tone: string;
    seo_notes: string[];
}

// --- QA Gate ---
export interface QACheck {
    name: string;
    passed: boolean;
    details: string;
}
export interface QAResult {
    score: number;
    passed: boolean;
    checks: QACheck[];
    blocking_issues: string[];
    fix_suggestions: string[];
}

// --- Union ---
export type ModuleResult = BriefResult | OutlineResult | DraftResult | QAResult;

// --- API Request / Response ---
export interface AICopilotRequest {
    moduleType: ModuleType;
    input: Record<string, unknown>;
    context: Record<string, unknown>;
}

export interface AICopilotSuccessResponse {
    ok: true;
    data: ModuleResult;
}

export interface AICopilotErrorResponse {
    ok: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
}

export type AICopilotResponse = AICopilotSuccessResponse | AICopilotErrorResponse;

// --- Module Run State (client) ---
export type RunStatus = "idle" | "running" | "success" | "error";

export interface ModuleRunState {
    status: RunStatus;
    result: ModuleResult | null;
    error: string | null;
    lastRunAt: number | null;
}
