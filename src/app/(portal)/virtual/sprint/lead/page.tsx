"use client";

import SprintPackPage from "@/modules/sprint-packs/SprintPackPage";
import type { LeadPack } from "@/modules/sprint-packs/schemas";

function LeadOutput({ data }: { data: LeadPack }) {
    return (
        <div className="space-y-6">
            {/* ICP */}
            <section data-testid="section-icp" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">person_search</span> ICP
                </h3>
                <p className="text-sm text-slate-700 mb-2"><strong>Ai:</strong> {data.icp.who}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div><strong className="text-slate-600">Pain Points:</strong><ul className="list-disc list-inside mt-1 text-slate-600">{data.icp.painPoints.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
                    <div><strong className="text-slate-600">Triggers:</strong><ul className="list-disc list-inside mt-1 text-slate-600">{data.icp.triggers.map((t, i) => <li key={i}>{t}</li>)}</ul></div>
                    <div><strong className="text-slate-600">Exclusions:</strong><ul className="list-disc list-inside mt-1 text-slate-600">{data.icp.exclusions.map((e, i) => <li key={i}>{e}</li>)}</ul></div>
                </div>
            </section>

            {/* Persona */}
            <section data-testid="section-persona" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-500">badge</span> Persona: {data.persona.name}
                </h3>
                <p className="text-sm text-slate-600 mb-2">{data.persona.context}</p>
                <p className="text-sm text-slate-600"><strong>Desired Outcome:</strong> {data.persona.desiredOutcome}</p>
            </section>

            {/* Offer Angles */}
            <section data-testid="section-offers" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">lightbulb</span> Offer Angles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.offerAngles.map((a, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-sm text-slate-700">{a.angle}</h4>
                            <p className="text-xs text-slate-500 mt-1">{a.promise}</p>
                            <p className="text-xs text-emerald-600 mt-1">🔗 {a.cta}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Funnel Plan */}
            <section data-testid="section-funnel" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500">filter_alt</span> Funnel Plan
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm"><thead><tr className="bg-slate-50 text-slate-600"><th className="px-3 py-2 text-left font-semibold">Step</th><th className="px-3 py-2 text-left font-semibold">Channel</th><th className="px-3 py-2 text-left font-semibold">Asset</th><th className="px-3 py-2 text-left font-semibold">Metric</th></tr></thead><tbody>
                        {data.funnelPlan.map((f, i) => <tr key={i} className="border-t border-slate-100"><td className="px-3 py-2 font-medium">{f.step}</td><td className="px-3 py-2">{f.channel}</td><td className="px-3 py-2">{f.asset}</td><td className="px-3 py-2 text-emerald-600">{f.successMetric}</td></tr>)}
                    </tbody></table>
                </div>
            </section>

            {/* CRM Pipeline */}
            <section data-testid="section-pipeline" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3">CRM Pipeline</h3>
                <div className="flex flex-wrap gap-2">{data.crmPipelineStages.map((s, i) => <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{i + 1}. {s}</span>)}</div>
            </section>

            {/* Next Actions */}
            <section data-testid="section-actions" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3">Next Actions</h3>
                <ul className="space-y-1">{data.nextActions.map((a, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="material-symbols-outlined text-blue-400 text-[16px] mt-0.5">check_box_outline_blank</span>{a}</li>)}</ul>
            </section>
        </div>
    );
}

export default function LeadSprintPage() {
    return <SprintPackPage packType="lead" renderOutput={(data) => <LeadOutput data={data as LeadPack} />} />;
}
