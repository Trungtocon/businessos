"use client";

import { useState } from "react";
import { useAICopilotStore } from "../store/aiCopilotStore";
import { AICopilotTabs } from "./AICopilotTabs";

/**
 * Small AI icon button for top-right action bar.
 */
export function AICopilotButton({ contextPack }: { contextPack?: Record<string, unknown> }) {
    const { isEnabled, openDrawer } = useAICopilotStore();
    if (!isEnabled) return null;

    return (
        <button
            onClick={() => openDrawer(contextPack as Parameters<typeof openDrawer>[0])}
            className="flex items-center justify-center size-9 rounded-lg hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition-colors"
            title="AI Copilot"
        >
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
        </button>
    );
}

/**
 * Floating action button (FAB) for AI Copilot.
 */
export function AICopilotFAB({ contextPack }: { contextPack?: Record<string, unknown> }) {
    const { isEnabled, openDrawer } = useAICopilotStore();
    if (!isEnabled) return null;

    return (
        <button
            onClick={() => openDrawer(contextPack as Parameters<typeof openDrawer>[0])}
            className="fixed right-6 bottom-6 z-40 size-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center justify-center"
            title="AI Copilot"
        >
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
        </button>
    );
}

/**
 * AI Copilot Drawer — Desktop panel + Mobile bottom sheet.
 */
export function AICopilotDrawer() {
    const { isEnabled, isDrawerOpen, closeDrawer } = useAICopilotStore();
    if (!isEnabled || !isDrawerOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={closeDrawer} />

            {/* Desktop */}
            <div className="hidden md:flex fixed right-0 top-0 bottom-0 w-[380px] z-50 bg-white border-l border-slate-200 shadow-2xl flex-col">
                <DrawerHeader />
                <ContextStatusBar />
                <WebsiteUrlInput />
                <AICopilotTabs />
            </div>

            {/* Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[85vh]">
                <div className="flex justify-center py-2">
                    <div className="w-8 h-1 bg-slate-300 rounded-full" />
                </div>
                <DrawerHeader />
                <ContextStatusBar />
                <WebsiteUrlInput />
                <AICopilotTabs />
            </div>
        </>
    );
}

function DrawerHeader() {
    const { closeDrawer } = useAICopilotStore();
    return (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">auto_awesome</span>
                <h3 className="font-bold text-slate-800">AI Copilot</h3>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">L1</span>
            </div>
            <button
                onClick={closeDrawer}
                className="size-8 rounded-full hover:bg-white/80 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
    );
}

/**
 * Context enrichment status bar — non-invasive, inside drawer header area.
 */
function ContextStatusBar() {
    const { contextStatus, contextError } = useAICopilotStore();
    if (contextStatus === "idle") return null;

    const configs = {
        loading: { icon: "sync", text: "Đang phân tích website…", color: "text-blue-500", bg: "bg-blue-50", spin: true },
        ok: { icon: "check_circle", text: "Đã nạp dữ liệu website", color: "text-green-600", bg: "bg-green-50", spin: false },
        rate_limited: { icon: "speed", text: "Đang bị giới hạn tần suất — dùng dữ liệu cơ bản", color: "text-amber-600", bg: "bg-amber-50", spin: false },
        error: { icon: "error", text: contextError ?? "Không lấy được dữ liệu website — vẫn có thể chạy AI", color: "text-red-500", bg: "bg-red-50", spin: false },
    };
    const c = configs[contextStatus];
    if (!c) return null;

    return (
        <div className={`flex items-center gap-2 px-5 py-2 ${c.bg} text-xs shrink-0`}>
            <span className={`material-symbols-outlined text-[14px] ${c.color} ${c.spin ? "animate-spin" : ""}`}>{c.icon}</span>
            <span className={`${c.color} font-medium`}>{c.text}</span>
        </div>
    );
}

/**
 * Minimal websiteUrl input — only shown if no websiteUrl in contextInput.
 */
function WebsiteUrlInput() {
    const { contextInput, setContextInput, refreshContext } = useAICopilotStore();
    const [urlInput, setUrlInput] = useState("");

    // If websiteUrl already provided by page, don't show input
    if (contextInput?.websiteUrl) return null;

    const handleSave = () => {
        if (!urlInput.trim()) return;
        const newInput = { ...(contextInput ?? {}), websiteUrl: urlInput.trim() };
        setContextInput(newInput);
        refreshContext();
    };

    return (
        <div className="flex items-center gap-2 px-5 py-2 bg-slate-50 border-b border-slate-100 shrink-0">
            <span className="material-symbols-outlined text-slate-400 text-[16px]">link</span>
            <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://website.com"
                className="flex-1 text-xs bg-white border border-slate-200 rounded-md px-2 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                onClick={handleSave}
                className="text-xs font-semibold text-blue-500 hover:text-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            >
                Lưu
            </button>
        </div>
    );
}
