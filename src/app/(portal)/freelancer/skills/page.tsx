"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const tests = [
    { icon: "trending_up", category: "Marketing", title: "Kiến thức SEO nền tảng", desc: "Kiểm tra kiến thức về tối ưu hóa công cụ tìm kiếm, nghiên cứu từ khóa và on-page SEO.", time: "30 phút", questions: "20 câu" },
    { icon: "javascript", category: "Lập trình", title: "ReactJS Nâng cao", desc: "Đánh giá kỹ năng về Hooks, Context API và tối ưu hiệu năng ứng dụng React.", time: "45 phút", questions: "30 câu" },
    { icon: "draw", category: "Thiết kế", title: "Nguyên lý UI Design", desc: "Nắm vững quy tắc bố cục, màu sắc và typography trong thiết kế giao diện hiện đại.", time: "40 phút", questions: "25 câu" },
    { icon: "data_exploration", category: "Lập trình", title: "Python for Data Science", desc: "Kiểm tra kỹ năng phân tích dữ liệu với thư viện Pandas, NumPy và Matplotlib.", time: "60 phút", questions: "40 câu" },
    { icon: "edit_note", category: "Marketing", title: "Content Marketing", desc: "Chiến lược xây dựng nội dung đa kênh và đo lường hiệu quả chuyển đổi.", time: "35 phút", questions: "25 câu" },
    { icon: "brush", category: "Thiết kế", title: "Adobe Photoshop Pro", desc: "Kỹ thuật xử lý hình ảnh phức tạp, layer mask và retouching chuyên nghiệp.", time: "50 phút", questions: "35 câu" },
];

export default function SkillTestPage() {
    return (
        <div className="flex min-h-screen bg-white text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white hidden lg:flex flex-col p-6 sticky top-0 h-screen">
                <div className="mb-10 px-2"><div className="text-blue-500 font-bold text-xl tracking-tight">BusinessOS</div></div>
                <nav className="space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-lg hover:bg-gray-50 text-sm font-medium" href="/dashboard"><span className="material-symbols-outlined text-[20px]">dashboard</span>Tổng quan</a>
                    <a className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-500 rounded-lg text-sm font-medium" href="/freelancer/skills"><span className="material-symbols-outlined text-[20px]">workspace_premium</span>Trung tâm kỹ năng</a>
                    <a className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-lg hover:bg-gray-50 text-sm font-medium" href="/classic/profile"><span className="material-symbols-outlined text-[20px]">person</span>Hồ sơ cá nhân</a>
                    <a className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-lg hover:bg-gray-50 text-sm font-medium" href="/settings"><span className="material-symbols-outlined text-[20px]">settings</span>Cài đặt</a>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 bg-white">
                <div className="max-w-[1200px] mx-auto py-8 px-6 lg:px-10">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">
                            <span>Freelancer</span><span className="material-symbols-outlined text-[14px]">chevron_right</span><span className="text-slate-600">Trung tâm kỹ năng</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Trung tâm kỹ năng</h1>
                                <p className="text-slate-500 mt-1">Đánh giá năng lực chuyên môn và nhận chứng chỉ số từ hệ thống.</p>
                            </div>
                            <div className="flex items-center gap-3 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><span className="material-symbols-outlined">military_tech</span></div>
                                <div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Đã hoàn thành</div><div className="text-sm font-bold">03/12 Chứng chỉ</div></div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-8">
                        <button className="px-6 py-4 text-sm font-semibold text-blue-500 border-b-2 border-blue-500" onClick={() => {}}>Tất cả bài thi</button>
                        <button className="px-6 py-4 text-sm font-semibold text-slate-400 hover:text-slate-600 border-b-2 border-transparent" onClick={() => {}}>Chứng chỉ của tôi</button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <Input className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm" placeholder="Tìm kiếm bài thi theo tên hoặc kỹ năng..." />
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                            <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg shrink-0" onClick={() => {}}>Tất cả</button>
                            <button className="px-4 py-2 bg-white border border-gray-200 text-slate-600 hover:border-slate-300 text-sm font-medium rounded-lg shrink-0" onClick={() => {}}>Marketing</button>
                            <button className="px-4 py-2 bg-white border border-gray-200 text-slate-600 hover:border-slate-300 text-sm font-medium rounded-lg shrink-0" onClick={() => {}}>Thiết kế</button>
                            <button className="px-4 py-2 bg-white border border-gray-200 text-slate-600 hover:border-slate-300 text-sm font-medium rounded-lg shrink-0" onClick={() => {}}>Lập trình</button>
                        </div>
                    </div>

                    {/* Test Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {tests.map((t, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col hover:border-blue-200 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-slate-600 border border-gray-100"><span className="material-symbols-outlined">{t.icon}</span></div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-gray-50 rounded">{t.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-500 transition-colors">{t.title}</h3>
                                <p className="text-sm text-slate-500 mb-6 line-clamp-2">{t.desc}</p>
                                <div className="mt-auto">
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6 py-4 border-y border-gray-50">
                                        <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">timer</span><span>{t.time}</span></div>
                                        <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">format_list_bulleted</span><span>{t.questions}</span></div>
                                    </div>
                                    <Button variant="primary" className="w-full py-2.5 font-semibold flex items-center justify-center gap-2" onClick={() => alert('Bắt đầu làm bài')}><span>Bắt đầu làm bài</span></Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="flex justify-center">
                        <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg text-slate-500 font-medium hover:bg-gray-50 text-sm" onClick={() => {}}>
                            <span>Xem thêm bài thi</span><span className="material-symbols-outlined">keyboard_arrow_down</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
