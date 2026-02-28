"use client";

export default function DisputesPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">Xử lý tranh chấp</h1>
                    <p className="text-sm text-slate-500">A03 — Dispute Center</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors" onClick={() => {}}>
                        Tạo case mới
                    </button>
                </div>
            </header>
            <main className="p-6">
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
                    <span className="material-symbols-outlined text-5xl mb-4 block">gavel</span>
                    <p className="text-sm">Danh sách tranh chấp sẽ hiển thị tại đây.</p>
                    {/* TODO: Wire dispute case list + detail views */}
                </div>
            </main>
            {/* AI Copilot provided by (admin)/layout.tsx */}
        </div>
    );
}
