"use client";

import { useState } from "react";
import type { ModuleResult, QAResult, BriefResult, OutlineResult, DraftResult } from "../types";
import type { ModuleType } from "../types";

interface JsonResultViewerProps {
    moduleType: ModuleType;
    data: ModuleResult;
}

export function JsonResultViewer({ moduleType, data }: JsonResultViewerProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadJson = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `BusinessOS_${moduleType}_Result.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownloadMarkdown = () => {
        let md = `# Business OS AI Result: ${moduleType.toUpperCase()}\n\n`;

        // Simple recursive markdown formatter
        const formatMd = (obj: any, depth = 2): string => {
            let out = "";
            for (const [k, v] of Object.entries(obj)) {
                if (Array.isArray(v)) {
                    out += `${"#".repeat(depth)} ${k}\n`;
                    v.forEach((item) => {
                        if (typeof item === "object") {
                            out += `- ${JSON.stringify(item)}\n`;
                        } else {
                            out += `- ${item}\n`;
                        }
                    });
                    out += "\n";
                } else if (typeof v === "object" && v !== null) {
                    out += `${"#".repeat(depth)} ${k}\n${formatMd(v, depth + 1)}`;
                } else {
                    out += `**${k}:** ${v}\n\n`;
                }
            }
            return out;
        };

        md += formatMd(data);

        const blob = new Blob([md], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `BusinessOS_${moduleType}_Result.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-end gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors px-2 py-1 rounded hover:bg-slate-100"
                >
                    <span className="material-symbols-outlined text-[16px]">
                        {copied ? "check" : "content_copy"}
                    </span>
                    {copied ? "Copied!" : "Copy JSON"}
                </button>
                <div className="w-px h-4 bg-slate-300 self-center" />
                <button
                    onClick={handleDownloadJson}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors px-2 py-1 rounded hover:bg-slate-100"
                >
                    <span className="material-symbols-outlined text-[16px]">data_object</span>
                    JSON
                </button>
                <button
                    onClick={handleDownloadMarkdown}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors px-2 py-1 rounded hover:bg-slate-100"
                >
                    <span className="material-symbols-outlined text-[16px]">markdown</span>
                    Markdown
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                {moduleType === "brief" && <BriefView data={data as BriefResult} />}
                {moduleType === "outline" && <OutlineView data={data as OutlineResult} />}
                {moduleType === "draft" && <DraftView data={data as DraftResult} />}
                {moduleType === "qa" && <QAView data={data as QAResult} />}
                {(!["brief", "outline", "draft", "qa"].includes(moduleType)) && (
                    <pre className="text-xs bg-slate-50 p-3 rounded overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}

function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
    return (
        <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mt-4 mb-2 first:mt-0">
            <span className="material-symbols-outlined text-[14px]">{icon}</span>
            {children}
        </h4>
    );
}

function ListItems({ items, color = "slate" }: { items: string[]; color?: string }) {
    if (!items?.length) return <p className="text-xs text-slate-400 italic">Không có</p>;
    return (
        <ul className="space-y-1">
            {items.map((item, i) => (
                <li key={i} className={`text-sm text-${color}-700 flex items-start gap-2`}>
                    <span className="text-slate-300 mt-1">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function BriefView({ data }: { data: BriefResult }) {
    return (
        <div className="space-y-1">
            <SectionTitle icon="summarize">Tóm tắt</SectionTitle>
            <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>

            <SectionTitle icon="help">Câu hỏi cần làm rõ</SectionTitle>
            <ListItems items={data.missing_questions} />

            <SectionTitle icon="psychology">Giả định</SectionTitle>
            <ListItems items={data.assumptions} />

            <SectionTitle icon="trending_up">KPIs đề xuất</SectionTitle>
            <ListItems items={data.recommended_kpis} color="blue" />

            <SectionTitle icon="warning">Rủi ro</SectionTitle>
            <ListItems items={data.risks} color="amber" />

            <SectionTitle icon="checklist">Hành động tiếp theo</SectionTitle>
            <ListItems items={data.next_actions} color="green" />
        </div>
    );
}

function OutlineView({ data }: { data: OutlineResult }) {
    return (
        <div className="space-y-1">
            <SectionTitle icon="title">Tiêu đề</SectionTitle>
            <p className="text-sm font-semibold text-slate-800">{data.title}</p>
            <p className="text-xs text-slate-500">Meta: {data.meta_title}</p>
            <p className="text-xs text-slate-500">{data.meta_description}</p>

            <SectionTitle icon="format_list_bulleted">Outline</SectionTitle>
            <div className="space-y-2">
                {data.h2_h3_outline?.map((section, i) => (
                    <div key={i} className="pl-3 border-l-2 border-blue-200">
                        <p className="text-sm font-semibold text-slate-800">{section.h2}</p>
                        {section.h3?.map((h3, j) => (
                            <p key={j} className="text-xs text-slate-600 pl-3 mt-0.5">↳ {h3}</p>
                        ))}
                    </div>
                ))}
            </div>

            <SectionTitle icon="search">Keyword Plan</SectionTitle>
            <div className="space-y-1">
                {data.keyword_plan?.map((kw, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                        <code className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-mono">{kw.keyword}</code>
                        <span className="text-slate-400">→</span>
                        <span className="text-slate-600">{kw.intent}</span>
                    </div>
                ))}
            </div>

            <SectionTitle icon="ads_click">CTAs</SectionTitle>
            <ListItems items={data.cta_suggestions} color="green" />
        </div>
    );
}

function DraftView({ data }: { data: DraftResult }) {
    return (
        <div className="space-y-1">
            <SectionTitle icon="edit_note">Bản nâng cấp</SectionTitle>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-200">
                {data.improved_text}
            </div>

            <SectionTitle icon="compare_arrows">Thay đổi</SectionTitle>
            <ListItems items={data.changes} />

            <SectionTitle icon="record_voice_over">Tone</SectionTitle>
            <p className="text-sm text-slate-700">{data.tone}</p>

            <SectionTitle icon="search">SEO Notes</SectionTitle>
            <ListItems items={data.seo_notes} color="blue" />
        </div>
    );
}

function QAView({ data }: { data: QAResult }) {
    return (
        <div className="space-y-1">
            {/* Score */}
            <div className={`flex items-center gap-3 p-3 rounded-lg border ${data.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <div className={`text-3xl font-bold ${data.passed ? "text-green-600" : "text-red-600"}`}>{data.score}</div>
                <div>
                    <p className={`font-semibold ${data.passed ? "text-green-800" : "text-red-800"}`}>
                        {data.passed ? "✅ Passed" : "❌ Failed"}
                    </p>
                    <p className="text-xs text-slate-500">Ngưỡng: 70/100 + không có blocking issues</p>
                </div>
            </div>

            <SectionTitle icon="checklist">Checks</SectionTitle>
            <div className="space-y-1">
                {data.checks?.map((check, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                        <span className={`material-symbols-outlined text-[16px] mt-0.5 ${check.passed ? "text-green-500" : "text-red-500"}`}>
                            {check.passed ? "check_circle" : "cancel"}
                        </span>
                        <div>
                            <span className="font-medium text-slate-800">{check.name}</span>
                            <p className="text-xs text-slate-500">{check.details}</p>
                        </div>
                    </div>
                ))}
            </div>

            {data.blocking_issues?.length > 0 && (
                <>
                    <SectionTitle icon="block">Blocking Issues</SectionTitle>
                    <ListItems items={data.blocking_issues} color="red" />
                </>
            )}

            <SectionTitle icon="lightbulb">Đề xuất cải thiện</SectionTitle>
            <ListItems items={data.fix_suggestions} color="amber" />
        </div>
    );
}
