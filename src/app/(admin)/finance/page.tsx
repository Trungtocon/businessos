"use client";

export default function PlatformFinancePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">Kiểm soát tài chính sàn</h1>
                    <p className="text-sm text-slate-500">A05 — Finance Control</p>
                </div>
            </header>
            <main className="p-6">
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
                    <span className="material-symbols-outlined text-5xl mb-4 block">account_balance</span>
                    <p className="text-sm">Tổng quan tài chính sàn sẽ hiển thị tại đây.</p>
                    {/* TODO: Wire finance dashboard + transaction list */}
                </div>
            </main>
            {/* AI Copilot provided by (admin)/layout.tsx */}
        </div>
    );
}
