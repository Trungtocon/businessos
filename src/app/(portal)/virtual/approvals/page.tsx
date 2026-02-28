"use client";

import { useEffect, useState, useCallback } from "react";
import type { ActionDraft, ActionStatus, PackType, Workspace } from "@/modules/actions/types";

const STATUS_COLORS: Record<ActionStatus, string> = {
    draft: "bg-slate-100 text-slate-700",
    approved: "bg-blue-100 text-blue-700",
    executed: "bg-emerald-100 text-emerald-700",
    failed: "bg-red-100 text-red-700",
    rejected: "bg-rose-100 text-rose-600",
    deferred: "bg-amber-100 text-amber-700",
};

const RISK_COLORS: Record<string, string> = {
    low: "text-emerald-600",
    medium: "text-amber-600",
    high: "text-rose-600",
};

export default function ApprovalsPage() {
    const [actions, setActions] = useState<ActionDraft[]>([]);
    const [filter, setFilter] = useState<{ status?: ActionStatus; packType?: PackType }>({});
    const [selected, setSelected] = useState<ActionDraft | null>(null);
    const [loading, setLoading] = useState(true);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [activeWs, setActiveWs] = useState<string>(() => {
        if (typeof window !== "undefined") return localStorage.getItem("bos_workspace") || "default";
        return "default";
    });

    // Fetch workspaces
    useEffect(() => {
        fetch("/api/workspaces/list").then(r => r.json()).then(d => {
            if (d.ok) setWorkspaces(d.workspaces);
        }).catch(() => { });
    }, []);

    const fetchActions = useCallback(async () => {
        const params = new URLSearchParams({ workspaceId: activeWs });
        if (filter.status) params.set("status", filter.status);
        if (filter.packType) params.set("packType", filter.packType);
        const res = await fetch(`/api/actions/list?${params}`);
        const json = await res.json();
        if (json.ok) setActions(json.actions);
        setLoading(false);
    }, [filter, activeWs]);

    useEffect(() => { fetchActions(); }, [fetchActions]);

    const switchWorkspace = (wsId: string) => {
        setActiveWs(wsId);
        localStorage.setItem("bos_workspace", wsId);
        setSelected(null);
    };

    const doAction = async (endpoint: string, id: string, extra?: Record<string, string>) => {
        await fetch(`/api/actions/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...extra }),
        });
        await fetchActions();
        if (selected?.id === id) setSelected(null);
    };

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <a href="/virtual" className="text-slate-400 hover:text-blue-600 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </a>
                    <h1 className="text-2xl font-bold text-slate-800">Approval Console</h1>
                    <span className="text-sm text-slate-500 ml-2">{actions.length} actions</span>
                    <div className="ml-auto">
                        <select data-testid="select-workspace" value={activeWs} onChange={e => switchWorkspace(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold">
                            {workspaces.map(ws => (
                                <option key={ws.id} value={ws.id}>{ws.name}</option>
                            ))}
                            {workspaces.length === 0 && <option value="default">Default Workspace</option>}
                        </select>
                    </div>
                </div>

                {/* Filters */}
                <div data-testid="approval-filters" className="flex gap-3 mb-6">
                    <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm" value={filter.status || ""} onChange={e => setFilter(f => ({ ...f, status: (e.target.value || undefined) as ActionStatus | undefined }))}>
                        <option value="">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="approved">Approved</option>
                        <option value="executed">Executed</option>
                        <option value="rejected">Rejected</option>
                        <option value="deferred">Deferred</option>
                        <option value="failed">Failed</option>
                    </select>
                    <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm" value={filter.packType || ""} onChange={e => setFilter(f => ({ ...f, packType: (e.target.value || undefined) as PackType | undefined }))}>
                        <option value="">All Packs</option>
                        <option value="lead">Lead</option>
                        <option value="content">Content</option>
                        <option value="report">Report</option>
                    </select>
                    <button onClick={fetchActions} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">Refresh</button>
                </div>

                {loading ? (
                    <p className="text-slate-400 text-sm">Loading...</p>
                ) : actions.length === 0 ? (
                    <div data-testid="no-actions" className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                        <span className="material-symbols-outlined text-[48px] text-slate-300 mb-2 block">inbox</span>
                        <p className="text-slate-500">Chưa có hành động nào. Tạo Sprint Pack và tạo drafts trước.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Actions List */}
                        <div className="lg:col-span-2 space-y-3">
                            {actions.map(a => (
                                <div key={a.id} data-testid="action-row" onClick={() => setSelected(a)} className={`bg-white rounded-xl border p-4 cursor-pointer hover:border-blue-300 transition-colors ${selected?.id === a.id ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200"}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-sm text-slate-700">{a.type}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className={`font-semibold ${RISK_COLORS[a.riskLevel]}`}>Risk: {a.riskLevel}</span>
                                        <span>Pack: {a.packType}</span>
                                        <span>Backend: {a.backend}</span>
                                    </div>
                                    {a.status === "draft" && (
                                        <div className="mt-3 flex gap-2 items-center" onClick={e => e.stopPropagation()}>
                                            <select data-testid="select-backend" value={a.backend} onChange={async (e) => {
                                                await fetch("/api/actions/set-backend", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ id: a.id, backend: e.target.value }),
                                                });
                                                await fetchActions();
                                            }} className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs">
                                                <option value="internal">internal</option>
                                                <option value="erpnext">erpnext</option>
                                            </select>
                                            <button data-testid="btn-approve" onClick={() => doAction("approve", a.id)} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Approve</button>
                                            <button data-testid="btn-reject" onClick={() => doAction("reject", a.id, { reason: "Rejected by user" })} className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100">Reject</button>
                                            <button onClick={() => doAction("defer", a.id, { reason: "Deferred" })} className="px-3 py-1.5 bg-amber-50 text-amber-600 text-xs font-bold rounded-lg hover:bg-amber-100">Defer</button>
                                        </div>
                                    )}
                                    {a.status === "approved" && (
                                        <div className="mt-3" onClick={e => e.stopPropagation()}>
                                            <button data-testid="btn-execute" onClick={() => doAction("execute", a.id)} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">play_arrow</span> Execute
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Detail Panel */}
                        <div className="lg:col-span-1">
                            {selected ? (
                                <div data-testid="action-detail" className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-4">
                                    <h3 className="font-bold text-slate-700 mb-3">{selected.type}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div><strong className="text-slate-500">ID:</strong> <span className="font-mono text-xs">{selected.id}</span></div>
                                        <div><strong className="text-slate-500">Status:</strong> <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_COLORS[selected.status]}`}>{selected.status}</span></div>
                                        <div><strong className="text-slate-500">Risk:</strong> <span className={RISK_COLORS[selected.riskLevel]}>{selected.riskLevel}</span></div>
                                        <div><strong className="text-slate-500">Backend:</strong> {selected.backend}</div>
                                        <div><strong className="text-slate-500">Workspace:</strong> {selected.workspaceId}</div>
                                        <div><strong className="text-slate-500">Pack:</strong> {selected.packType} ({selected.packId.slice(0, 8)}…)</div>
                                        {selected.evidence?.summary && <div><strong className="text-slate-500">Evidence:</strong> {selected.evidence.summary}</div>}
                                        {selected.error && <div className="p-2 bg-red-50 rounded text-red-600 text-xs"><strong>Error:</strong> {selected.error.message}</div>}
                                        {selected.result && <div className="p-2 bg-emerald-50 rounded text-emerald-700 text-xs"><strong>Result:</strong> {JSON.stringify(selected.result)}</div>}
                                    </div>
                                    <div className="mt-4"><h4 className="font-semibold text-xs text-slate-500 mb-1">Payload</h4><pre className="text-[10px] bg-slate-50 p-2 rounded overflow-auto max-h-40">{JSON.stringify(selected.payload, null, 2)}</pre></div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
                                    Chọn một hành động để xem chi tiết
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
