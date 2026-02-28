"use client";

export default function TestResultsPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <h1 className="text-xl font-bold">Kết quả bài thi & Chứng chỉ số</h1>
                <p className="text-sm text-slate-500">Test Results & Digital Certificates</p>
            </header>
            <main className="p-6">
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
                    <span className="material-symbols-outlined text-5xl mb-4 block">verified</span>
                    <p className="text-sm">Kết quả và chứng chỉ sẽ hiển thị tại đây.</p>
                    {/* TODO: Wire test results list + certificate download */}
                </div>
            </main>
            {/* AI Copilot provided by (portal)/layout.tsx */}
        </div>
    );
}
