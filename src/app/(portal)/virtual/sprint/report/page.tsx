"use client";

import SprintPackPage from "@/modules/sprint-packs/SprintPackPage";
import type { ReportPack } from "@/modules/sprint-packs/schemas";

function ReportOutput({ data }: { data: ReportPack }) {
    return (
        <div className="space-y-6">
            {/* KPI Summary */}
            <section data-testid="section-kpi" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">monitoring</span> KPI Summary
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm"><thead><tr className="bg-slate-50 text-slate-600"><th className="px-3 py-2 text-left font-semibold">KPI</th><th className="px-3 py-2 text-left font-semibold">Current</th><th className="px-3 py-2 text-left font-semibold">Target</th><th className="px-3 py-2 text-left font-semibold">Gap</th><th className="px-3 py-2 text-left font-semibold">Note</th></tr></thead><tbody>
                        {data.kpiSummary.map((k, i) => (
                            <tr key={i} className="border-t border-slate-100">
                                <td className="px-3 py-2 font-medium">{k.kpi}</td>
                                <td className="px-3 py-2">{k.current}</td>
                                <td className="px-3 py-2 text-blue-600">{k.target}</td>
                                <td className={`px-3 py-2 font-medium ${k.gap.startsWith("-") ? "text-rose-600" : k.gap.startsWith("+") ? "text-amber-600" : "text-emerald-600"}`}>{k.gap}</td>
                                <td className="px-3 py-2 text-slate-500 text-xs">{k.note}</td>
                            </tr>
                        ))}
                    </tbody></table>
                </div>
            </section>

            {/* Insights & Decisions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section data-testid="section-insights" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500">psychology</span> Top 3 Insights
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">{data.insights3.map((ins, i) => <li key={i}>{ins}</li>)}</ol>
                </section>
                <section data-testid="section-decisions" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-500">gavel</span> Key Decisions
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">{data.decisions3.map((dec, i) => <li key={i}>{dec}</li>)}</ol>
                </section>
            </div>

            {/* Prioritized Tasks */}
            <section data-testid="section-tasks" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-500">format_list_numbered</span> Prioritized Tasks
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm"><thead><tr className="bg-slate-50 text-slate-600"><th className="px-3 py-2 text-left font-semibold">Task</th><th className="px-3 py-2 text-center font-semibold">Impact</th><th className="px-3 py-2 text-center font-semibold">Effort</th><th className="px-3 py-2 text-left font-semibold">Owner</th><th className="px-3 py-2 text-left font-semibold">Due</th></tr></thead><tbody>
                        {data.prioritizedTasks5.map((t, i) => (
                            <tr key={i} className="border-t border-slate-100">
                                <td className="px-3 py-2 font-medium">{t.task}</td>
                                <td className="px-3 py-2 text-center"><span className={`px-2 py-0.5 rounded text-xs font-bold ${t.impact >= 4 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{t.impact}/5</span></td>
                                <td className="px-3 py-2 text-center"><span className={`px-2 py-0.5 rounded text-xs font-bold ${t.effort >= 4 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{t.effort}/5</span></td>
                                <td className="px-3 py-2 text-slate-600">{t.ownerRole}</td>
                                <td className="px-3 py-2 text-blue-600 font-medium">{t.due}</td>
                            </tr>
                        ))}
                    </tbody></table>
                </div>
            </section>

            {/* Risks */}
            <section data-testid="section-risks" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-rose-500">warning</span> Risks
                </h3>
                <ul className="space-y-1">{data.risks.map((r, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="text-rose-400">⚠️</span>{r}</li>)}</ul>
            </section>

            {/* Next Actions */}
            <section data-testid="section-actions" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3">Next Actions</h3>
                <ul className="space-y-1">{data.nextActions.map((a, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="material-symbols-outlined text-blue-400 text-[16px] mt-0.5">check_box_outline_blank</span>{a}</li>)}</ul>
            </section>
        </div>
    );
}

export default function ReportSprintPage() {
    return <SprintPackPage packType="report" renderOutput={(data) => <ReportOutput data={data as ReportPack} />} />;
}
