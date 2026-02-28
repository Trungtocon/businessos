"use client";

import type { ModuleType } from "../types";
import { useAICopilotStore } from "../store/aiCopilotStore";
import { RunButton } from "./RunButton";
import { JsonResultViewer } from "./JsonResultViewer";
import { StatusBanner } from "./StatusBanner";

const TABS: { key: ModuleType; label: string; icon: string; runLabel: string }[] = [
    { key: "brief", label: "Brief", icon: "description", runLabel: "Phân tích Brief" },
    { key: "outline", label: "Outline", icon: "format_list_bulleted", runLabel: "Tạo Outline" },
    { key: "draft", label: "Draft", icon: "edit_note", runLabel: "Cải thiện Draft" },
    { key: "qa", label: "QA", icon: "checklist", runLabel: "Chạy QA Check" },
];

export function AICopilotTabs() {
    const { activeTab, setActiveTab, modules, runModule } = useAICopilotStore();
    const currentTab = TABS.find((t) => t.key === activeTab)!;
    const moduleState = modules[activeTab];

    return (
        <>
            {/* Tab Bar */}
            <div className="flex border-b border-slate-100 shrink-0">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors relative ${activeTab === tab.key
                                ? "text-blue-600"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                        {tab.label}
                        {activeTab === tab.key && (
                            <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full" />
                        )}
                        {/* Dot indicator for completed */}
                        {modules[tab.key].status === "success" && (
                            <div className="absolute top-2 right-2 size-1.5 bg-green-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Error Banner */}
                {moduleState.status === "error" && moduleState.error && (
                    <StatusBanner type="error" title="Lỗi" message={moduleState.error} />
                )}

                {/* Result View */}
                {moduleState.status === "success" && moduleState.result && (
                    <JsonResultViewer moduleType={activeTab} data={moduleState.result} />
                )}

                {/* Idle state */}
                {moduleState.status === "idle" && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                            <span className="material-symbols-outlined text-slate-400 text-2xl">{currentTab.icon}</span>
                        </div>
                        <p className="text-sm text-slate-500 max-w-[260px]">
                            Nhấn nút bên dưới để chạy AI {currentTab.label} analyzer.
                        </p>
                    </div>
                )}

                {/* Running state */}
                {moduleState.status === "running" && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="size-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4" />
                        <p className="text-sm text-slate-500">Đang phân tích...</p>
                    </div>
                )}
            </div>

            {/* Run Button Footer */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0">
                <RunButton
                    status={moduleState.status}
                    label={currentTab.runLabel}
                    onClick={() => runModule(activeTab)}
                />
                {moduleState.lastRunAt && (
                    <p className="text-[10px] text-slate-400 text-center mt-2">
                        Lần chạy cuối: {new Date(moduleState.lastRunAt).toLocaleTimeString("vi-VN")}
                    </p>
                )}
            </div>
        </>
    );
}
