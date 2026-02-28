// V2.4.1 AI Copilot — Zustand Store (Client)
// Extended with context auto-build on drawer open, URL input storage, and enrichment status.
import { create } from "zustand";
import type { ModuleType, ModuleResult, ModuleRunState, RunStatus, AICopilotResponse, QAResult } from "../types";
import {
    buildContextPackClient,
    type ContextPack,
    type ContextStatus,
    type BuildContextInput,
} from "@/context/buildContextPack.client";
import { logAudit } from "@/lib/audit";

type ModuleStates = Record<ModuleType, ModuleRunState>;

const defaultRunState: ModuleRunState = {
    status: "idle",
    result: null,
    error: null,
    lastRunAt: null,
};

const CONTEXT_STALE_MS = 24 * 60 * 60 * 1000; // 24h

// ---- localStorage helper for websiteUrl per route ----
const URL_STORAGE_PREFIX = "bos_copilot_url_";
function getStoredUrl(routeKey: string): string {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(URL_STORAGE_PREFIX + routeKey) ?? "";
}
function setStoredUrl(routeKey: string, url: string): void {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(URL_STORAGE_PREFIX + routeKey, url); } catch { /* quota */ }
}

interface AICopilotState {
    // Feature flag
    isEnabled: boolean;
    // Drawer
    isDrawerOpen: boolean;
    activeTab: ModuleType;
    // Module states
    modules: ModuleStates;
    // Context (V2.4.1)
    contextPack: ContextPack | null;
    contextStatus: ContextStatus;
    contextError: string | undefined;
    contextInput: BuildContextInput | null;
    // Actions
    setEnabled: (enabled: boolean) => void;
    toggleDrawer: () => void;
    openDrawer: (contextInput?: BuildContextInput) => void;
    closeDrawer: () => void;
    setActiveTab: (tab: ModuleType) => void;
    setContextInput: (input: BuildContextInput) => void;
    refreshContext: () => Promise<void>;
    // Website URL per route
    getStoredWebsiteUrl: (routeKey: string) => string;
    storeWebsiteUrl: (routeKey: string, url: string) => void;
    // Module actions
    setModuleStatus: (module: ModuleType, status: RunStatus) => void;
    setModuleResult: (module: ModuleType, result: ModuleResult) => void;
    setModuleError: (module: ModuleType, error: string) => void;
    resetModule: (module: ModuleType) => void;
    runModule: (module: ModuleType, input?: Record<string, unknown>) => Promise<ModuleResult | null>;
}

export const useAICopilotStore = create<AICopilotState>((set, get) => ({
    isEnabled: process.env.NEXT_PUBLIC_AI_COPILOT_ENABLED === "true",
    isDrawerOpen: false,
    activeTab: "brief",
    modules: {
        brief: { ...defaultRunState },
        outline: { ...defaultRunState },
        draft: { ...defaultRunState },
        qa: { ...defaultRunState },
    },
    contextPack: null,
    contextStatus: "idle",
    contextError: undefined,
    contextInput: null,

    setEnabled: (enabled) => set({ isEnabled: enabled }),

    toggleDrawer: () => {
        const s = get();
        if (!s.isDrawerOpen) {
            // Opening — trigger context refresh if needed
            set({ isDrawerOpen: true });
            const state = get();
            if (state.contextInput && shouldRefreshContext(state.contextPack)) {
                state.refreshContext();
            }
        } else {
            set({ isDrawerOpen: false });
        }
    },

    openDrawer: (contextInput) => {
        const s = get();
        const newInput = contextInput ?? s.contextInput;
        set({ isDrawerOpen: true, contextInput: newInput ?? s.contextInput });
        // Auto-refresh context on open if needed
        const updated = get();
        if (updated.contextInput && shouldRefreshContext(updated.contextPack)) {
            updated.refreshContext();
        }
    },

    closeDrawer: () => set({ isDrawerOpen: false }),

    setActiveTab: (tab) => set({ activeTab: tab }),

    setContextInput: (input) => set({ contextInput: input }),

    refreshContext: async () => {
        const state = get();
        if (!state.contextInput) return;
        if (state.contextStatus === "loading") return; // Prevent concurrent

        set({ contextStatus: "loading", contextError: undefined });
        logAudit({ event: "context_build_start", metadata: { websiteUrl: state.contextInput.websiteUrl } });

        const result = await buildContextPackClient(state.contextInput);

        set({
            contextPack: result.pack,
            contextStatus: result.status,
            contextError: result.errorMessage,
        });

        // Audit log by status
        const auditEvent = result.status === "ok"
            ? "context_build_ok" as const
            : result.status === "rate_limited"
                ? "context_build_rate_limited" as const
                : result.status === "error"
                    ? "context_build_error" as const
                    : "context_build_ok" as const;

        logAudit({ event: auditEvent, metadata: { websiteUrl: state.contextInput.websiteUrl, status: result.status } });
    },

    getStoredWebsiteUrl: (routeKey) => getStoredUrl(routeKey),
    storeWebsiteUrl: (routeKey, url) => setStoredUrl(routeKey, url),

    setModuleStatus: (module, status) =>
        set((s) => ({
            modules: { ...s.modules, [module]: { ...s.modules[module], status } },
        })),

    setModuleResult: (module, result) =>
        set((s) => ({
            modules: {
                ...s.modules,
                [module]: { status: "success" as RunStatus, result, error: null, lastRunAt: Date.now() },
            },
        })),

    setModuleError: (module, error) =>
        set((s) => ({
            modules: {
                ...s.modules,
                [module]: { ...s.modules[module], status: "error" as RunStatus, error, result: null },
            },
        })),

    resetModule: (module) =>
        set((s) => ({
            modules: { ...s.modules, [module]: { ...defaultRunState } },
        })),

    runModule: async (module, input = {}) => {
        const state = get();
        if (state.modules[module].status === "running") return null;

        set((s) => ({
            modules: {
                ...s.modules,
                [module]: { ...s.modules[module], status: "running" as RunStatus, error: null },
            },
        }));

        try {
            // Build context object including contextPack with enrichedUrl
            const contextForApi = state.contextPack
                ? { ...state.contextPack }
                : { brief: state.contextInput?.brief ?? "" };

            const res = await fetch("/api/ai-copilot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    moduleType: module,
                    input,
                    context: contextForApi,
                }),
            });

            const json: AICopilotResponse = await res.json();

            if (!json.ok) {
                set((s) => ({
                    modules: {
                        ...s.modules,
                        [module]: { ...s.modules[module], status: "error" as RunStatus, error: json.error.message },
                    },
                }));
                return null;
            }

            set((s) => ({
                modules: {
                    ...s.modules,
                    [module]: { status: "success" as RunStatus, result: json.data, error: null, lastRunAt: Date.now() },
                },
            }));

            return json.data;
        } catch (err) {
            set((s) => ({
                modules: {
                    ...s.modules,
                    [module]: { ...s.modules[module], status: "error" as RunStatus, error: (err as Error).message },
                },
            }));
            return null;
        }
    },
}));

function shouldRefreshContext(pack: ContextPack | null): boolean {
    if (!pack) return true;
    return Date.now() - pack.createdAt > CONTEXT_STALE_MS;
}

/**
 * Standalone QA runner for F04 submit.
 * Optionally refreshes context before running QA.
 */
export async function runQAGateWithContext(
    contextInput: BuildContextInput,
    submission: string
): Promise<QAResult | null> {
    try {
        // Build fresh context for QA
        const ctxResult = await buildContextPackClient(contextInput);
        const context = ctxResult.pack;

        const res = await fetch("/api/ai-copilot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                moduleType: "qa",
                input: { submission },
                context,
            }),
        });

        const json: AICopilotResponse = await res.json();
        if (!json.ok) return null;
        return json.data as QAResult;
    } catch {
        return null;
    }
}

// Keep legacy export for backwards compat
export async function runQAGate(contextPack: Record<string, unknown>, submission: string): Promise<QAResult | null> {
    try {
        const res = await fetch("/api/ai-copilot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                moduleType: "qa",
                input: { submission },
                context: contextPack,
            }),
        });

        const json: AICopilotResponse = await res.json();
        if (!json.ok) return null;
        return json.data as QAResult;
    } catch {
        return null;
    }
}
