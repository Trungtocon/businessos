"use client";

import SprintPackPage from "@/modules/sprint-packs/SprintPackPage";
import type { ContentPack } from "@/modules/sprint-packs/schemas";

function ContentOutput({ data }: { data: ContentPack }) {
    return (
        <div className="space-y-6">
            {/* Calendar 14d */}
            <section data-testid="section-calendar" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">calendar_month</span> Lịch Content 14 Ngày
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm"><thead><tr className="bg-slate-50 text-slate-600"><th className="px-3 py-2 text-left font-semibold">Day</th><th className="px-3 py-2 text-left font-semibold">Theme</th><th className="px-3 py-2 text-left font-semibold">Format</th><th className="px-3 py-2 text-left font-semibold">Hook</th><th className="px-3 py-2 text-left font-semibold">CTA</th></tr></thead><tbody>
                        {data.calendar14d.map((c, i) => <tr key={i} className="border-t border-slate-100"><td className="px-3 py-2 font-bold text-blue-600">{c.day}</td><td className="px-3 py-2">{c.theme}</td><td className="px-3 py-2"><span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs font-medium">{c.format}</span></td><td className="px-3 py-2 text-slate-600 text-xs">{c.hook}</td><td className="px-3 py-2 text-emerald-600 text-xs">{c.cta}</td></tr>)}
                    </tbody></table>
                </div>
            </section>

            {/* Hooks & CTAs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section data-testid="section-hooks" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-700 mb-3">10 Hooks</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600">{data.hooks10.map((h, i) => <li key={i}>{h}</li>)}</ol>
                </section>
                <section data-testid="section-ctas" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-700 mb-3">10 CTAs</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600">{data.ctas10.map((c, i) => <li key={i}>{c}</li>)}</ol>
                </section>
            </div>

            {/* Posts */}
            <section data-testid="section-posts" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">article</span> 10 Posts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.posts10.slice(0, 6).map((p, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-sm text-slate-700">{p.title}</h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.caption}</p>
                            <div className="mt-2 flex flex-wrap gap-1">{p.hashtags.map((h, j) => <span key={j} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium">{h}</span>)}</div>
                        </div>
                    ))}
                </div>
                {data.posts10.length > 6 && <p className="text-xs text-slate-400 mt-3">+{data.posts10.length - 6} more posts (see full export)</p>}
            </section>

            {/* Videos */}
            <section data-testid="section-videos" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-rose-500">videocam</span> 3 Video Scripts
                </h3>
                <div className="space-y-4">
                    {data.videos3.map((v, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-sm text-slate-700">{v.title}</h4>
                            <pre className="text-xs text-slate-600 mt-2 whitespace-pre-wrap font-sans">{v.script}</pre>
                        </div>
                    ))}
                </div>
            </section>

            {/* Key Visual Brief */}
            <section data-testid="section-visual" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3">Key Visual Brief</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div><strong className="text-slate-500 text-xs block">Concept</strong><span className="text-slate-700">{data.keyVisualBrief.concept}</span></div>
                    <div><strong className="text-slate-500 text-xs block">Colors</strong><span className="text-slate-700">{data.keyVisualBrief.colors}</span></div>
                    <div><strong className="text-slate-500 text-xs block">Typography</strong><span className="text-slate-700">{data.keyVisualBrief.typography}</span></div>
                    <div><strong className="text-emerald-500 text-xs block">✅ Do</strong><span className="text-slate-700">{data.keyVisualBrief.do}</span></div>
                    <div><strong className="text-red-500 text-xs block">❌ Don&apos;t</strong><span className="text-slate-700">{data.keyVisualBrief.dont}</span></div>
                </div>
            </section>

            {/* Next Actions */}
            <section data-testid="section-actions" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-700 mb-3">Next Actions</h3>
                <ul className="space-y-1">{data.nextActions.map((a, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="material-symbols-outlined text-blue-400 text-[16px] mt-0.5">check_box_outline_blank</span>{a}</li>)}</ul>
            </section>
        </div>
    );
}

export default function ContentSprintPage() {
    return <SprintPackPage packType="content" renderOutput={(data) => <ContentOutput data={data as ContentPack} />} />;
}
