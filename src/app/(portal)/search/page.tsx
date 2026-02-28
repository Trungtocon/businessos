"use client";

import { Input } from "@/components/ui/Input";

const results = [
    { type: "project", icon: "folder_open", iconBg: "bg-blue-100 text-blue-600", title: "Q3 Marketing Campaign", meta: "Dự án • Cập nhật 2 giờ trước", active: true },
    { type: "person", icon: "person", iconBg: "bg-orange-100 text-orange-600", title: "Nguyễn Văn An", meta: "Trưởng phòng Kinh doanh • Online" },
    { type: "file", icon: "description", iconBg: "bg-red-100 text-red-600", title: "Financial_Report_2024.pdf", meta: "Tài chính / Q4 • 2.4 MB" },
    { type: "file", icon: "table_chart", iconBg: "bg-green-100 text-green-600", title: "Customer_List_Export.csv", meta: "Dữ liệu khách hàng • Hôm qua" },
    { type: "message", icon: "forum", iconBg: "bg-purple-100 text-purple-600", title: "Thảo luận về Website Redesign", meta: "Trần Thị B: \"Chúng ta cần chốt lại layout...\"" },
];

export default function GlobalSearchPage() {
    return (
        <div className="bg-gray-50 font-sans h-screen w-full overflow-hidden flex flex-col relative text-slate-900">
            {/* Background App (blurred) */}
            <div className="absolute inset-0 z-0 flex flex-col filter blur-[6px] opacity-60 pointer-events-none select-none overflow-hidden">
                <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 justify-between">
                    <div className="flex items-center gap-4"><div className="w-8 h-8 rounded bg-blue-500/20"></div><div className="w-24 h-4 rounded bg-gray-200"></div></div>
                    <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-gray-200"></div></div>
                </header>
                <div className="flex flex-1">
                    <aside className="w-64 border-r border-gray-200 bg-white p-4 flex flex-col gap-4">
                        <div className="w-full h-8 rounded bg-gray-100"></div>
                        <div className="w-full h-8 rounded bg-gray-100"></div>
                        <div className="w-full h-8 rounded bg-gray-100"></div>
                    </aside>
                    <main className="flex-1 p-8 bg-gray-50 grid grid-cols-3 gap-6">
                        <div className="col-span-2 h-64 rounded-xl bg-white shadow-sm"></div>
                        <div className="col-span-1 h-64 rounded-xl bg-white shadow-sm"></div>
                    </main>
                </div>
            </div>

            {/* Overlay & Modal */}
            <div className="absolute inset-0 z-50 flex items-start justify-center pt-[10vh] bg-slate-900/20 backdrop-blur-sm">
                <div className="w-full max-w-[800px] flex flex-col bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden mx-4">
                    {/* Search Bar */}
                    <div className="flex items-center px-4 py-4 border-b border-gray-100">
                        <div className="flex-1 flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-500 text-[28px]">search</span>
                            <Input autoFocus className="w-full bg-transparent border-none p-0 text-xl placeholder:text-slate-400 focus:ring-0 h-10" placeholder="Tìm kiếm dự án, tệp tin, nhân sự..." type="text" />
                            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-md">ESC</kbd>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-gray-50/50 border-b border-gray-100 px-2 pt-2">
                        <div className="flex items-center gap-1 overflow-x-auto">
                            {["Tất cả", "Dự án", "Tệp tin", "Nhân sự", "Tin nhắn"].map((tab, i) => (
                                <button key={i} className={`px-4 py-2 text-sm font-medium ${i === 0 ? "text-blue-500 border-b-2 border-blue-500" : "text-slate-500 hover:text-slate-700 border-b-2 border-transparent"} transition-colors whitespace-nowrap`} onClick={() => {}}>{tab}</button>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="max-h-[500px] overflow-y-auto p-2">
                        <div className="px-3 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Gợi ý tốt nhất</div>
                        {results.map((r, i) => (
                            <div key={i} className={`group flex items-center justify-between gap-3 p-3 rounded-lg ${r.active ? "bg-blue-500/5 border-l-2 border-blue-500" : "hover:bg-slate-100 border-l-2 border-transparent"} cursor-pointer transition-all mt-1`} onClick={() => {}}>
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className={`flex items-center justify-center shrink-0 w-10 h-10 ${r.type === "person" ? "rounded-full" : "rounded-lg"} ${r.iconBg}`}>
                                        <span className="material-symbols-outlined text-[24px]">{r.icon}</span>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h4 className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-500">{r.title}</h4>
                                        <div className="text-xs text-slate-500 truncate">{r.meta}</div>
                                    </div>
                                </div>
                                {r.active && <span className="material-symbols-outlined text-slate-400 text-[20px]">arrow_forward</span>}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">keyboard_arrow_up</span><span className="material-symbols-outlined text-sm">keyboard_arrow_down</span> Di chuyển</span>
                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">keyboard_return</span> Chọn</span>
                        </div>
                        <span className="hidden sm:inline">Tìm kiếm chính xác với &quot;ngoặc kép&quot;</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
