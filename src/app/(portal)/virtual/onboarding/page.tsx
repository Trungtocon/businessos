"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PackDef, PackGoal } from "@/modules/packs/types";
import type { Workspace } from "@/modules/actions/types";

const INDUSTRIES = ["retail", "f&b", "education", "beauty", "fitness", "tech", "saas", "other"];
const GOALS: { value: PackGoal; label: string }[] = [
    { value: "lead_generation", label: "Lead / CRM" },
    { value: "brand_awareness", label: "Content / Brand" },
    { value: "performance_tracking", label: "Growth Report" },
];

type Step = "workspace" | "industry" | "goal" | "pack" | "generating" | "done";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("workspace");
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [packs, setPacks] = useState<PackDef[]>([]);
    const [selectedWs, setSelectedWs] = useState("default");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [selectedGoal, setSelectedGoal] = useState<PackGoal | "">("");
    const [selectedPack, setSelectedPack] = useState<PackDef | null>(null);
    const [result, setResult] = useState<{ draftsCount: number; approvalUrl: string } | null>(null);

    useEffect(() => {
        fetch("/api/workspaces/list").then(r => r.json()).then(d => { if (d.ok) setWorkspaces(d.workspaces); });
        fetch("/api/packs/list").then(r => r.json()).then(d => { if (d.ok) setPacks(d.packs); });
    }, []);

    const filteredPacks = packs.filter(p => {
        if (selectedIndustry && !p.industry.includes(selectedIndustry)) return false;
        if (selectedGoal && p.goal !== selectedGoal) return false;
        return true;
    });

    const generate = async (pack: PackDef) => {
        setSelectedPack(pack);
        setStep("generating");
        localStorage.setItem("bos_workspace", selectedWs);

        const res = await fetch("/api/packs/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workspaceId: selectedWs, packId: pack.id }),
        });
        const json = await res.json();
        if (json.ok) {
            setResult({ draftsCount: json.draftsCount, approvalUrl: json.approvalUrl });
            setStep("done");
        }
    };

    return (
        <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex items-center justify-center">
            <div className="max-w-lg w-full mx-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    {/* Progress */}
                    <div className="flex gap-1 mb-6">
                        {["workspace", "industry", "goal", "pack"].map((s, i) => (
                            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${["workspace", "industry", "goal", "pack", "generating", "done"].indexOf(step) >= i ? "bg-blue-500" : "bg-slate-200"}`} />
                        ))}
                    </div>

                    {/* Step 1: Workspace */}
                    {step === "workspace" && (
                        <div data-testid="step-workspace">
                            <h2 className="text-lg font-bold mb-1">Chọn Workspace</h2>
                            <p className="text-sm text-slate-500 mb-4">Workspace nào bạn muốn dùng?</p>
                            <select data-testid="select-ws" value={selectedWs} onChange={e => setSelectedWs(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm mb-4">
                                {workspaces.map(ws => <option key={ws.id} value={ws.id}>{ws.name}</option>)}
                                {workspaces.length === 0 && <option value="default">Default</option>}
                            </select>
                            <button data-testid="btn-next" onClick={() => setStep("industry")} className="w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700">Tiếp tục</button>
                        </div>
                    )}

                    {/* Step 2: Industry */}
                    {step === "industry" && (
                        <div data-testid="step-industry">
                            <h2 className="text-lg font-bold mb-1">Ngành hàng</h2>
                            <p className="text-sm text-slate-500 mb-4">Bạn kinh doanh ngành gì?</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {INDUSTRIES.map(i => (
                                    <button key={i} onClick={() => setSelectedIndustry(i)} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${selectedIndustry === i ? "bg-blue-50 border-blue-300 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-200"}`}>{i}</button>
                                ))}
                            </div>
                            <button data-testid="btn-next" onClick={() => setStep("goal")} disabled={!selectedIndustry} className="w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-40">Tiếp tục</button>
                        </div>
                    )}

                    {/* Step 3: Goal */}
                    {step === "goal" && (
                        <div data-testid="step-goal">
                            <h2 className="text-lg font-bold mb-1">Mục tiêu</h2>
                            <p className="text-sm text-slate-500 mb-4">Bạn muốn tập trung vào gì?</p>
                            <div className="space-y-2 mb-4">
                                {GOALS.map(g => (
                                    <button key={g.value} onClick={() => setSelectedGoal(g.value)} className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium border transition-colors ${selectedGoal === g.value ? "bg-blue-50 border-blue-300 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-200"}`}>{g.label}</button>
                                ))}
                            </div>
                            <button data-testid="btn-next" onClick={() => setStep("pack")} disabled={!selectedGoal} className="w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-40">Chọn gói</button>
                        </div>
                    )}

                    {/* Step 4: Pick Pack */}
                    {step === "pack" && (
                        <div data-testid="step-pack">
                            <h2 className="text-lg font-bold mb-1">Chọn Sprint Pack</h2>
                            <p className="text-sm text-slate-500 mb-4">{filteredPacks.length} gói phù hợp</p>
                            <div className="space-y-2 mb-4">
                                {filteredPacks.map(p => (
                                    <button key={p.id} data-testid="btn-pick-pack" onClick={() => generate(p)} className="w-full px-4 py-3 rounded-lg text-left border border-slate-200 hover:border-blue-300 transition-colors">
                                        <div className="font-bold text-sm">{p.name}</div>
                                        <div className="text-xs text-slate-500 mt-1">{p.actions.length} actions · {p.duration}</div>
                                    </button>
                                ))}
                                {filteredPacks.length === 0 && <p className="text-sm text-slate-400 text-center py-4">Không có gói phù hợp.</p>}
                            </div>
                        </div>
                    )}

                    {/* Generating */}
                    {step === "generating" && (
                        <div className="text-center py-8">
                            <div className="animate-spin inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mb-4" />
                            <p className="text-sm text-slate-600">Đang tạo drafts từ {selectedPack?.name}...</p>
                        </div>
                    )}

                    {/* Done */}
                    {step === "done" && result && (
                        <div data-testid="step-done" className="text-center py-6">
                            <div className="text-4xl mb-3">🎉</div>
                            <h2 className="text-lg font-bold mb-1">Xong!</h2>
                            <p className="text-sm text-slate-500 mb-4">Đã tạo {result.draftsCount} action drafts. Bạn có thể duyệt và thực thi ngay.</p>
                            <button data-testid="btn-go-approvals" onClick={() => router.push(result.approvalUrl)} className="w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700">Đi đến Approval Console</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
