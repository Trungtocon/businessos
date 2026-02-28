"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const courses = [
    { img: "bg-gradient-to-br from-blue-400 to-indigo-500", category: "Onboarding", categoryColor: "text-blue-500 bg-blue-50", title: "Quy trình làm việc tại BusinessOS", desc: "Hiểu rõ về văn hóa, quy định và các bước bắt đầu công việc.", progress: 100, duration: "45 phút", done: true },
    { img: "bg-gradient-to-br from-orange-400 to-rose-500", category: "Kỹ năng mềm", categoryColor: "text-orange-500 bg-orange-50", title: "Kỹ năng giao tiếp khách hàng", desc: "Nghệ thuật đàm phán và xử lý tình huống khó.", progress: 45, duration: "1h 20p" },
    { img: "bg-gradient-to-br from-indigo-500 to-purple-600", category: "Tài chính", categoryColor: "text-indigo-500 bg-indigo-50", title: "Hướng dẫn xuất hóa đơn VAT", desc: "Quy định mới nhất về hóa đơn điện tử 2024.", progress: 0, duration: "15 trang", isNew: true },
    { img: "bg-gradient-to-br from-red-400 to-rose-500", category: "Tuân thủ", categoryColor: "text-red-500 bg-red-50", title: "An toàn bảo mật thông tin", desc: "Bảo vệ dữ liệu khách hàng và tránh rủi ro pháp lý.", progress: 10, duration: "30 phút" },
    { img: "bg-gradient-to-br from-purple-400 to-violet-500", category: "Design", categoryColor: "text-purple-500 bg-purple-50", title: "Tư duy thiết kế cơ bản", desc: "Nguyên lý màu sắc, bố cục và typography.", progress: 75, duration: "2h 15p" },
    { img: null, category: "Quản lý dự án", categoryColor: "text-slate-500 bg-gray-100", title: "Quản lý dự án nâng cao", desc: "Dành cho Senior Freelancer.", progress: 0, duration: "", locked: true },
];

export default function ELearningPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white hidden lg:flex flex-col z-20">
                <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3 px-2">
                            <div className="rounded-lg size-10 bg-blue-500 flex items-center justify-center text-white"><span className="material-symbols-outlined">grid_view</span></div>
                            <div className="flex flex-col"><h1 className="text-slate-900 text-base font-bold">BusinessOS</h1><p className="text-slate-500 text-xs">Freelancer</p></div>
                        </div>
                        <nav className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-slate-600" href="/dashboard"><span className="material-symbols-outlined text-slate-500">home</span><span className="text-sm font-medium">Tổng quan</span></a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-slate-600" href="/classic/projects"><span className="material-symbols-outlined text-slate-500">work</span><span className="text-sm font-medium">Dự án</span></a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-slate-600" href="/classic/finance"><span className="material-symbols-outlined text-slate-500">payments</span><span className="text-sm font-medium">Tài chính</span></a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-500/10 text-blue-500" href="/freelancer/learning"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span><span className="text-sm font-semibold">E-Learning</span></a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-slate-600" href="/settings"><span className="material-symbols-outlined text-slate-500">settings</span><span className="text-sm font-medium">Cài đặt</span></a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-3 border-t border-gray-200 mt-auto">
                        <div className="size-10 rounded-full bg-slate-200 ring-2 ring-white"></div>
                        <div className="flex flex-col"><p className="text-sm font-medium">Minh Hoang</p><p className="text-xs text-slate-500">Freelancer Pro</p></div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 relative">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 z-10 flex-shrink-0">
                    <div className="hidden lg:flex flex-col">
                        <div className="flex items-center gap-2 text-sm"><a className="text-slate-500 hover:text-blue-500" href="/dashboard">Trang chủ</a><span className="text-slate-300">/</span><a className="text-slate-500 hover:text-blue-500" href="/freelancer">Freelancer</a><span className="text-slate-300">/</span><span className="text-slate-900 font-medium">Thư viện học tập</span></div>
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <Input className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm w-64" placeholder="Tìm kiếm chung..." />
                        </div>
                        <button className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-slate-500 relative" onClick={() => { }}><span className="material-symbols-outlined">notifications</span><span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span></button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">Thư viện học tập</h2>
                                <p className="text-slate-500 text-base">Nâng cao kỹ năng chuyên môn và chuẩn hóa quy trình làm việc.</p>
                            </div>
                            <Button variant="primary" className="flex items-center gap-2 px-4 py-2 shadow-lg shadow-blue-500/20" onClick={() => alert('historyLịch sử học tập')}><span className="material-symbols-outlined text-[20px]">history</span>Lịch sử học tập</Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 mb-1"><span className="material-symbols-outlined text-blue-500 text-[20px]">play_circle</span><p className="text-sm font-medium uppercase tracking-wider">Đang học</p></div>
                                <p className="text-3xl font-bold">3 <span className="text-lg text-slate-400 font-normal">khóa</span></p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 mb-1"><span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span><p className="text-sm font-medium uppercase tracking-wider">Đã hoàn thành</p></div>
                                <p className="text-3xl font-bold">12 <span className="text-lg text-slate-400 font-normal">khóa</span></p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 mb-1"><span className="material-symbols-outlined text-orange-500 text-[20px]">schedule</span><p className="text-sm font-medium uppercase tracking-wider">Giờ tích lũy</p></div>
                                <p className="text-3xl font-bold">45 <span className="text-lg text-slate-400 font-normal">giờ</span></p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 bg-gray-50 z-10 py-2">
                            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                                <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium whitespace-nowrap shadow-md shadow-blue-500/25" onClick={() => { }}>Tất cả</button>
                                <button className="px-4 py-2 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium whitespace-nowrap" onClick={() => { }}>Onboarding</button>
                                <button className="px-4 py-2 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium whitespace-nowrap" onClick={() => { }}>Chuyên môn</button>
                                <button className="px-4 py-2 rounded-full bg-white border border-gray-200 text-slate-600 hover:bg-gray-50 text-sm font-medium whitespace-nowrap" onClick={() => { }}>Kỹ năng mềm</button>
                            </div>
                            <div className="relative w-full md:w-72">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <Input className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm" placeholder="Tìm khóa học..." />
                            </div>
                        </div>

                        {/* Course Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                            {courses.map((c, i) => (
                                <div key={i} className={`group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ${c.locked ? "opacity-75 hover:opacity-100" : "hover:-translate-y-1"}`}>
                                    <div className={`relative aspect-video overflow-hidden ${c.img || "bg-gray-200"}`}>
                                        {c.img && <div className={`absolute inset-0 ${c.img}`}></div>}
                                        {c.locked && <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 bg-gray-100"><span className="material-symbols-outlined text-slate-400 text-5xl">lock</span><span className="text-xs font-bold text-slate-500 uppercase">Sắp ra mắt</span></div>}
                                        {c.isNew && <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">MỚI</span>}
                                    </div>
                                    <div className="flex flex-col flex-1 p-4 gap-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${c.categoryColor}`}>{c.category}</span>
                                                {c.done && <span className="text-green-600 flex items-center gap-1 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full border border-green-100"><span className="material-symbols-outlined text-[14px]">check</span>Xong</span>}
                                            </div>
                                            <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-blue-500 transition-colors">{c.title}</h3>
                                            <p className="text-slate-500 text-sm line-clamp-2">{c.desc}</p>
                                        </div>
                                        {!c.locked && (
                                            <div className="mt-auto">
                                                <div className="flex justify-between text-xs text-slate-500 mb-1.5"><span>Tiến độ: {c.progress}%</span><span>{c.duration}</span></div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden"><div className={`${c.done ? "bg-green-500" : "bg-blue-500"} h-1.5 rounded-full`} style={{ width: `${c.progress}%` }}></div></div>
                                            </div>
                                        )}
                                        {c.locked && (
                                            <div className="mt-auto pt-2 border-t border-gray-100">
                                                <button className="w-full py-1.5 text-sm font-medium text-slate-500 hover:text-blue-500 flex items-center justify-center gap-1" onClick={() => { }}><span className="material-symbols-outlined text-[18px]">notifications_active</span>Nhận thông báo</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 pb-10">
                            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50" onClick={() => { }}><span className="material-symbols-outlined">chevron_left</span></button>
                            <button className="size-10 flex items-center justify-center rounded-lg bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/30" onClick={() => { }}>1</button>
                            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50" onClick={() => { }}>2</button>
                            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50" onClick={() => { }}>3</button>
                            <span className="text-slate-400">...</span>
                            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50" onClick={() => { }}><span className="material-symbols-outlined">chevron_right</span></button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
