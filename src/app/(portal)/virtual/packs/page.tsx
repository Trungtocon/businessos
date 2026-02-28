"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PackDef } from "@/modules/packs/types";

const GOAL_LABELS: Record<string, string> = {
    lead_generation: "Lead Generation",
    brand_awareness: "Brand Awareness",
    performance_tracking: "Performance Tracking",
};

const TIER_COLORS: Record<string, string> = {
    free: "bg-emerald-100 text-emerald-700",
    starter: "bg-blue-100 text-blue-700",
    pro: "bg-purple-100 text-purple-700",
};

const TYPE_ICONS: Record<string, string> = {
    lead: "🎯",
    content: "📝",
    report: "📊",
};

export default function PacksPage() {
    const [packs, setPacks] = useState<PackDef[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<{ industry?: string; goal?: string; duration?: string; priceTier?: string }>({});
    const [generating, setGenerating] = useState<string | null>(null);
    const router = useRouter();

    const wsId = typeof window !== "undefined" ? localStorage.getItem("bos_workspace") || "default" : "default";

    useEffect(() => {
        fetch("/api/packs/list").then(r => r.json()).then(d => {
            if (d.ok) setPacks(d.packs);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const filtered = packs.filter(p => {
        if (filters.industry && !p.industry.includes(filters.industry)) return false;
        if (filters.goal && p.goal !== filters.goal) return false;
        if (filters.duration && p.duration !== filters.duration) return false;
        if (filters.priceTier && p.priceTier !== filters.priceTier) return false;
        return true;
    });

    const generate = async (packId: string) => {
        setGenerating(packId);
        const res = await fetch("/api/packs/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workspaceId: wsId, packId }),
        });
        const json = await res.json();
        setGenerating(null);
        if (json.ok) {
            router.push(json.approvalUrl);
        }
    };

    const allIndustries = Array.from(new Set(packs.flatMap(p => p.industry)));

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-6 flex items-center gap-3">
                    <a href="/virtual" className="text-slate-400 hover:text-blue-600 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </a>
                    <h1 className="text-2xl font-bold text-slate-800">Pack Library</h1>
                    <span className="text-sm text-slate-500 ml-2">{filtered.length} gói</span>
                </div>

                {/* Filters */}
                <div data-testid="pack-filters" className="flex flex-wrap gap-3 mb-6">
                    <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm" value={filters.industry || ""} onChange={e => setFilters(f => ({ ...f, industry: e.target.value || undefined }))}>
                        <option value="">Tất cả ngành</option>
                        {allIndustries.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm" value={filters.goal || ""} onChange={e => setFilters(f => ({ ...f, goal: e.target.value || undefined }))}>
                        <option value="">Tất cả mục tiêu</option>
                        <option value="lead_generation">Lead Generation</option>
                        <option value="brand_awareness">Brand Awareness</option>
                        <option value="performance_tracking">Performance Tracking</option>
                    </select>
                    <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm" value={filters.duration || ""} onChange={e => setFilters(f => ({ ...f, duration: e.target.value || undefined }))}>
                        <option value="">Tất cả thời gian</option>
                        <option value="7d">7 ngày</option>
                        <option value="14d">14 ngày</option>
                        <option value="30d">30 ngày</option>
                    </select>
                </div>

                {loading ? (
                    <p className="text-slate-400 text-sm">Loading...</p>
                ) : filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                        <p className="text-slate-500">Không tìm thấy gói nào.</p>
                    </div>
                ) : (
                    <div data-testid="pack-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map(pack => (
                            <div key={pack.id} data-testid="pack-card" className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 transition-colors">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">{TYPE_ICONS[pack.packType] || "📦"}</span>
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-700">{pack.name}</h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${TIER_COLORS[pack.priceTier]}`}>{pack.priceTier}</span>
                                            <span className="text-[10px] text-slate-400">{pack.duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{pack.description}</p>
                                <div className="text-[10px] text-slate-400 mb-3">
                                    <span className="font-semibold">{GOAL_LABELS[pack.goal]}</span> · {pack.actions.length} actions · {pack.inputs.length} inputs
                                </div>
                                <button
                                    data-testid="btn-use-pack"
                                    onClick={() => generate(pack.id)}
                                    disabled={generating === pack.id}
                                    className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {generating === pack.id ? "Đang tạo..." : "Dùng gói này"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
