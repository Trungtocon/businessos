"use client";

export default function UsersPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">Quản lý người dùng</h1>
                    <p className="text-sm text-slate-500">A02 — User Management</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors" onClick={() => {}}>
                        Thêm người dùng
                    </button>
                </div>
            </header>
            {/* Content placeholder */}
            <main className="p-6">
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
                    <span className="material-symbols-outlined text-5xl mb-4 block">group</span>
                    <p className="text-sm">Danh sách người dùng sẽ hiển thị tại đây.</p>
                    {/* TODO: Wire user table + search + filters */}
                </div>
            </main>
            {/* AI Copilot provided by (admin)/layout.tsx */}
        </div>
    );
}
