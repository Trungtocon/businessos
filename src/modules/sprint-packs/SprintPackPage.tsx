"use client";

import { useState } from "react";
import type { SprintInput, PackType } from "@/modules/sprint-packs/types";
import { DEFAULT_INPUT, CHANNELS, BUDGET_RANGES, TONES, PACK_LABELS } from "@/modules/sprint-packs/types";
import type { LeadPack, ContentPack, ReportPack } from "@/modules/sprint-packs/schemas";
import { toMarkdown, toJSON, downloadFile } from "@/modules/sprint-packs/export";

interface SprintPackPageProps {
    packType: PackType;
    renderOutput: (data: LeadPack | ContentPack | ReportPack) => React.ReactNode;
}

export default function SprintPackPage({ packType, renderOutput }: SprintPackPageProps) {
    const [input, setInput] = useState<SprintInput>({ ...DEFAULT_INPUT });
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
    const [data, setData] = useState<(LeadPack | ContentPack | ReportPack) | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [qaScore, setQaScore] = useState<number | null>(null);
    const [packId, setPackId] = useState<string | null>(null);
    const [draftsCreated, setDraftsCreated] = useState(false);
    const [draftsCount, setDraftsCount] = useState(0);

    const meta = PACK_LABELS[packType];

    const handleGenerate = async () => {
        if (!input.industry || !input.offer || !input.targetCustomer || !input.goal7d) {
            setError("Vui lòng điền ít nhất: Ngành, Dịch vụ, Đối tượng KH, và Mục tiêu 7 ngày.");
            return;
        }
        setStatus("loading");
        setError(null);
        setData(null);
        try {
            const res = await fetch("/api/sprint/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ packType, input }),
            });
            const json = await res.json();
            if (!json.ok) {
                setError(json.error || "Generation failed");
                setStatus("error");
                return;
            }
            setData(json.data);
            setQaScore(json.qa?.score ?? null);
            setPackId(`pack_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
            setDraftsCreated(false);
            setDraftsCount(0);
            setStatus("done");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Network error");
            setStatus("error");
        }
    };

    const handleExportJSON = () => {
        if (!data) return;
        downloadFile(`sprint-${packType}-${Date.now()}.json`, toJSON(data), "application/json");
    };

    const handleExportMD = () => {
        if (!data) return;
        downloadFile(`sprint-${packType}-${Date.now()}.md`, toMarkdown(packType, data), "text/markdown");
    };

    const updateField = (field: keyof SprintInput, value: string) => {
        setInput(prev => ({ ...prev, [field]: value }));
    };

    const handleCreateDrafts = async () => {
        if (!data || !packId) return;
        const res = await fetch("/api/actions/create-from-pack", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ packId, packType, input, data }),
        });
        const json = await res.json();
        if (json.ok) {
            setDraftsCreated(true);
            setDraftsCount(json.drafts?.length ?? 0);
        }
    };

    const handleExportEvidence = () => {
        if (!packId || !data) return;
        const params = new URLSearchParams({
            packId,
            packType,
            input: encodeURIComponent(JSON.stringify(input)),
            output: encodeURIComponent(JSON.stringify(data)),
        });
        window.open(`/api/evidence/pack?${params}`, "_blank");
    };

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <a href="/virtual" className="text-slate-400 hover:text-blue-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </a>
                        <h1 className="text-2xl font-bold text-slate-800">{meta.title}</h1>
                    </div>
                    <p className="text-slate-500 ml-8">{meta.description}</p>
                </div>

                {/* Input Form */}
                <div data-testid="sprint-form" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-500">edit_note</span>
                        Thông tin đầu vào
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Ngành *</label>
                            <input data-testid="input-industry" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="VD: Spa & Beauty" value={input.industry} onChange={e => updateField("industry", e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Dịch vụ/Sản phẩm *</label>
                            <input data-testid="input-offer" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="VD: Gói chăm sóc da cao cấp" value={input.offer} onChange={e => updateField("offer", e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Đối tượng KH *</label>
                            <input data-testid="input-target" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="VD: Phụ nữ 25-40 tuổi, thu nhập trung-cao" value={input.targetCustomer} onChange={e => updateField("targetCustomer", e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Mục tiêu 7 ngày *</label>
                            <input data-testid="input-goal" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="VD: Có 50 leads mới qua Facebook" value={input.goal7d} onChange={e => updateField("goal7d", e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Kênh chính</label>
                            <select data-testid="input-channel" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={input.primaryChannel} onChange={e => updateField("primaryChannel", e.target.value)}>
                                {CHANNELS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Ngân sách</label>
                            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={input.budgetRange} onChange={e => updateField("budgetRange", e.target.value)}>
                                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b === "low" ? "Thấp" : b === "mid" ? "Trung bình" : "Cao"}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Tone</label>
                            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={input.tone} onChange={e => updateField("tone", e.target.value)}>
                                {TONES.map(t => <option key={t} value={t}>{t === "expert" ? "Chuyên gia" : t === "friendly" ? "Thân thiện" : "Mạnh mẽ"}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 mb-1">Ràng buộc (tuỳ chọn)</label>
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="VD: Không dùng hình ảnh người nổi tiếng" value={input.constraints ?? ""} onChange={e => updateField("constraints", e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <button data-testid="btn-generate" onClick={handleGenerate} disabled={status === "loading"} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">{status === "loading" ? "hourglass_empty" : "auto_awesome"}</span>
                            {status === "loading" ? "Đang tạo..." : "Tạo Sprint Pack"}
                        </button>
                        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
                        {qaScore !== null && status === "done" && (
                            <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                                QA Score: {qaScore}/100
                            </span>
                        )}
                    </div>
                </div>

                {/* Output */}
                {status === "done" && data && (
                    <div data-testid="sprint-output">
                        {/* Export Bar */}
                        <div data-testid="export-bar" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
                                    Sprint Pack đã sẵn sàng
                                </span>
                                <div className="flex gap-3">
                                    <button data-testid="btn-export-json" onClick={handleExportJSON} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-200 transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px]">data_object</span>
                                        Export JSON
                                    </button>
                                    <button data-testid="btn-export-md" onClick={handleExportMD} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-200 transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px]">description</span>
                                        Export Markdown
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-3 border-t border-slate-100 pt-3">
                                <button data-testid="btn-create-drafts" onClick={handleCreateDrafts} disabled={draftsCreated} className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center gap-1.5 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-[16px]">assignment</span>
                                    {draftsCreated ? `${draftsCount} Drafts đã tạo` : "Tạo hành động (Draft)"}
                                </button>
                                <button data-testid="btn-export-evidence" onClick={handleExportEvidence} className="px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-lg text-sm hover:bg-emerald-100 transition-colors flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px]">folder_zip</span>
                                    Xuất Evidence Pack
                                </button>
                                {draftsCreated && (
                                    <a href="/virtual/approvals" className="px-4 py-2 bg-purple-50 text-purple-700 font-semibold rounded-lg text-sm hover:bg-purple-100 transition-colors flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[16px]">gavel</span>
                                        Mở Approval Console
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Pack-specific output */}
                        {renderOutput(data)}
                    </div>
                )}
            </div>
        </div>
    );
}
