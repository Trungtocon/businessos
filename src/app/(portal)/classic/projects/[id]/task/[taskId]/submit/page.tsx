"use client";

import { useState, useCallback } from "react";
// AI Copilot Drawer provided by (portal)/layout.tsx
import { runQAGateWithContext } from "@/modules/ai-copilot/store/aiCopilotStore";
import type { QAResult } from "@/modules/ai-copilot/types";

// --- Mock F04 Data ---
const taskInfo = {
    deadline: "17:00 hôm nay",
    hoursLeft: 2,
};

const AI_ENABLED = process.env.NEXT_PUBLIC_AI_COPILOT_ENABLED === "true";

export default function SubmitWorkPage() {
    const [link, setLink] = useState("");
    const [fileName, setFileName] = useState("");
    const [isDragOver, setIsDragOver] = useState(false);

    // QA Gate state
    const [qaRunning, setQaRunning] = useState(false);
    const [qaResult, setQaResult] = useState<QAResult | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) setFileName(files[0].name);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) setFileName(files[0].name);
    };

    // Original submit logic (preserved)
    const doSubmit = useCallback(async () => {
        setSubmitting(true);
        // TODO: Actual API call to submit work
        await new Promise((r) => setTimeout(r, 1000));
        setSubmitted(true);
        setSubmitting(false);
    }, []);

    // QA-gated submit handler
    const handleSubmit = useCallback(async () => {
        // Prevent double submit
        if (submitting || submitted || qaRunning) return;

        // If AI not enabled, skip QA
        if (!AI_ENABLED) {
            await doSubmit();
            return;
        }

        // If QA already passed, submit directly
        if (qaResult?.passed) {
            await doSubmit();
            return;
        }

        // Run QA gate
        setQaRunning(true);
        setQaResult(null);
        const submission = [fileName, link].filter(Boolean).join(" | ") || "(no content)";
        const contextInput = { brief: "Design Homepage V2", taskId: "C11-024", projectId: "C11-024", userRole: "business" as const };

        const result = await runQAGateWithContext(contextInput, submission);
        setQaRunning(false);

        if (!result) {
            // QA failed to run — allow submit with warning
            setQaResult({ score: 0, passed: true, checks: [], blocking_issues: [], fix_suggestions: ["QA service unavailable — submitting without check."] });
            await doSubmit();
            return;
        }

        setQaResult(result);

        // Log audit events (client-side)
        if (result.passed) {
            // QA passed — auto-submit
            await doSubmit();
        }
        // If failed, qaResult is set and UI shows blocking banner
    }, [submitting, submitted, qaRunning, qaResult, fileName, link, doSubmit]);

    return (
        <div className="min-h-screen bg-[#f5f7f8] font-[Inter,sans-serif] text-slate-900 flex items-center justify-center p-4">
            {/* Modal Overlay */}
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-0" />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-[640px] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <h3 className="text-xl font-bold leading-tight tracking-tight">Nộp sản phẩm công việc</h3>
                    <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 transition-colors text-slate-500" onClick={() => { }}>
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-col p-6 gap-6 overflow-y-auto max-h-[80vh]">
                    {/* File Upload Zone */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-2">Tệp đính kèm</label>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleDrop}
                            className={`group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed transition-all px-6 py-10 cursor-pointer relative ${isDragOver
                                ? "border-blue-500 bg-blue-50/50"
                                : "border-slate-300 hover:border-blue-500 hover:bg-slate-50"
                                }`}
                        >
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-blue-500 text-4xl">cloud_upload</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 text-center">
                                {fileName ? (
                                    <p className="text-base font-bold text-green-600 flex items-center gap-2">
                                        <span className="material-symbols-outlined">check_circle</span>
                                        {fileName}
                                    </p>
                                ) : (
                                    <p className="text-base font-bold">Kéo thả file kết quả vào đây</p>
                                )}
                                <p className="text-slate-500 text-sm">Hỗ trợ định dạng: JPG, PDF, ZIP. Tối đa 50MB.</p>
                            </div>
                            <button className="mt-2 flex items-center justify-center rounded-lg h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors" onClick={() => { }}>
                                Hoặc chọn file từ máy tính
                            </button>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileSelect}
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-slate-200 flex-1" />
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Hoặc</span>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    {/* External Link */}
                    <div className="flex flex-col gap-2">
                        <label className="flex flex-col w-full">
                            <p className="text-sm font-semibold pb-2">Liên kết ngoài (Google Drive, Figma...)</p>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">link</span>
                                </div>
                                <input
                                    className="flex w-full rounded-lg border border-slate-300 bg-white h-12 pl-10 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-shadow"
                                    placeholder="https://..."
                                    type="url"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>

                    {/* Deadline Notice */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-500 text-[20px] mt-0.5">schedule</span>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium">Hạn chót: {taskInfo.deadline}</p>
                            <p className="text-slate-600 text-sm">
                                Lưu ý: Bạn còn <span className="text-blue-500 font-semibold">{taskInfo.hoursLeft} giờ</span> để nộp bài trước deadline.
                            </p>
                        </div>
                    </div>

                    {/* QA Gate Banner — only when AI enabled */}
                    {AI_ENABLED && qaRunning && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3 animate-pulse">
                            <span className="size-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                            <div>
                                <p className="text-sm font-semibold text-blue-800">Đang chạy QA Check...</p>
                                <p className="text-xs text-blue-600">Hệ thống AI đang kiểm tra chất lượng bài nộp.</p>
                            </div>
                        </div>
                    )}

                    {/* QA FAILED — hard block */}
                    {AI_ENABLED && qaResult && !qaResult.passed && (
                        <div className="space-y-3">
                            {/* Score Banner */}
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="material-symbols-outlined text-red-600 text-[24px]">gpp_bad</span>
                                    <div>
                                        <p className="text-sm font-bold text-red-800">QA Gate: Không đạt (Score: {qaResult.score}/100)</p>
                                        <p className="text-xs text-red-600">Bạn cần sửa các lỗi bên dưới trước khi nộp bài.</p>
                                    </div>
                                </div>

                                {/* Checks */}
                                <div className="space-y-1 mb-3">
                                    {qaResult.checks.map((check, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm">
                                            <span className={`material-symbols-outlined text-[16px] mt-0.5 ${check.passed ? "text-green-500" : "text-red-500"}`}>
                                                {check.passed ? "check_circle" : "cancel"}
                                            </span>
                                            <div>
                                                <span className="font-medium text-slate-800">{check.name}</span>
                                                <span className="text-slate-500 ml-1">— {check.details}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Blocking Issues */}
                                {qaResult.blocking_issues.length > 0 && (
                                    <div className="bg-white/60 rounded-lg p-3 mb-2">
                                        <p className="text-xs font-bold text-red-800 uppercase mb-1">Lỗi nghiêm trọng</p>
                                        <ul className="space-y-1">
                                            {qaResult.blocking_issues.map((issue, i) => (
                                                <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                                                    <span className="text-red-400">•</span>{issue}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Fix Suggestions */}
                                {qaResult.fix_suggestions.length > 0 && (
                                    <div className="bg-white/60 rounded-lg p-3">
                                        <p className="text-xs font-bold text-amber-800 uppercase mb-1">Đề xuất cải thiện</p>
                                        <ul className="space-y-1">
                                            {qaResult.fix_suggestions.map((sug, i) => (
                                                <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                                                    <span className="material-symbols-outlined text-[14px] text-amber-500 mt-0.5">lightbulb</span>{sug}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Retry button */}
                            <button
                                onClick={() => setQaResult(null)}
                                className="w-full h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Sửa lại và chạy QA lần nữa
                            </button>
                        </div>
                    )}

                    {/* QA PASSED */}
                    {AI_ENABLED && qaResult?.passed && !submitted && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600 text-[20px]">verified</span>
                            <div>
                                <p className="text-sm font-semibold text-green-800">QA Gate: Đạt (Score: {qaResult.score}/100)</p>
                                <p className="text-xs text-green-600">Bài nộp đã vượt qua kiểm tra chất lượng.</p>
                            </div>
                        </div>
                    )}

                    {/* Submitted confirmation */}
                    {submitted && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600 text-[24px]">task_alt</span>
                            <div>
                                <p className="text-sm font-bold text-green-800">Đã nộp bài thành công!</p>
                                <p className="text-xs text-green-600">Bài nộp đã được gửi cho khách hàng.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button className="flex min-w-[84px] items-center justify-center rounded-lg h-11 px-5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors" onClick={() => { }}>
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || submitted || qaRunning || (AI_ENABLED && qaResult !== null && !qaResult.passed)}
                        className={`flex min-w-[84px] items-center justify-center rounded-lg h-11 px-6 text-sm font-bold shadow-sm transition-all gap-2 ${submitting || submitted || qaRunning || (AI_ENABLED && qaResult !== null && !qaResult.passed)
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow"
                            }`}
                    >
                        {qaRunning && <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                        {submitting ? "Đang nộp..." : submitted ? "Đã nộp ✓" : qaRunning ? "Đang kiểm tra..." : "Xác nhận nộp bài"}
                    </button>
                </div>
            </div>

            {/* AI Copilot Drawer provided by (portal)/layout.tsx */}
        </div>
    );
}
