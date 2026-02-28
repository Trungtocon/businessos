"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { MOCK_PROJECTS, formatVND } from "@/lib/mock-data";

// Convert projects to job listings format
const jobs = MOCK_PROJECTS.filter(p => p.status === "Pending" || p.status === "Active").map((p, index) => {
    const skillTags = [
        ["ReactJS", "NodeJS", "System Design"],
        ["Figma", "UI/UX", "Mobile App"],
        ["Copywriting", "SEO", "Marketing"],
        ["Python", "AI", "Backend"],
        ["WordPress", "PHP", "Frontend"],
    ];
    const timeAgo = ["2 giờ trước", "5 giờ trước", "1 ngày trước", "2 ngày trước", "3 ngày trước"];

    return {
        id: p.id,
        title: p.name,
        company: p.client,
        verified: index % 2 === 0,
        posted: timeAgo[index % timeAgo.length],
        desc: `Dự án ${p.name} đang tìm kiếm các freelancer có kinh nghiệm. Ngân sách ${formatVND(p.budget)}. Deadline: ${p.deadline}. Tiến độ hiện tại: ${p.progress}%.`,
        tags: skillTags[index % skillTags.length],
        budget: `${formatVND(p.budget * 0.3)} - ${formatVND(p.budget * 0.5)}`,
        budgetRaw: p.budget,
    };
});

export default function JobMarketPage() {
    const openJobsCount = jobs.length;

    return (
        <div className="bg-gray-50 text-slate-900 h-screen flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 flex-shrink-0 flex flex-col h-full border-r border-slate-800">
                <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
                    <div className="size-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">B</div>
                    <div className="flex flex-col"><h1 className="text-white text-base font-bold leading-tight">BusinessOS</h1><p className="text-slate-400 text-xs font-normal">Freelancer</p></div>
                </div>
                <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" href="/dashboard"><span className="material-symbols-outlined">dashboard</span><span className="text-sm font-medium">Tổng quan</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-900/20" href="/freelancer/jobs"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work</span><span className="text-sm font-medium">Chợ việc làm</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" href="/classic/projects"><span className="material-symbols-outlined">folder_open</span><span className="text-sm font-medium">Dự án của tôi</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" href="/freelancer/bank"><span className="material-symbols-outlined">attach_money</span><span className="text-sm font-medium">Thu nhập</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" href="/chat"><span className="material-symbols-outlined">chat_bubble</span><span className="text-sm font-medium">Tin nhắn</span><span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span></a>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 cursor-pointer" onClick={() => { }}>
                        <div className="size-10 rounded-full bg-slate-600"></div>
                        <div className="flex flex-col overflow-hidden"><p className="text-white text-sm font-medium truncate">Minh Nguyen</p><p className="text-slate-400 text-xs truncate">Lập trình viên Full Stack</p></div>
                        <span className="material-symbols-outlined text-slate-500 ml-auto text-[20px]">expand_more</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="bg-white border-b border-slate-200 px-8 py-5 shrink-0 flex items-center justify-between gap-6">
                    <div className="flex flex-col gap-1"><h2 className="text-2xl font-bold text-slate-900 tracking-tight">Chợ việc làm</h2><p className="text-slate-500 text-sm">Tìm kiếm dự án phù hợp với kỹ năng của bạn</p></div>
                    <div className="flex-1 max-w-xl relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                        <Input className="w-full h-11 pl-11 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400" placeholder="Tìm kiếm dự án theo tên hoặc ID..." />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 relative" onClick={() => { }}><span className="material-symbols-outlined">notifications</span><span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white"></span></button>
                        <button className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100" onClick={() => { }}><span className="material-symbols-outlined">settings</span></button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                        {/* Filters */}
                        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                            <div className="flex items-center justify-between"><h3 className="text-slate-900 font-semibold flex items-center gap-2"><span className="material-symbols-outlined text-[20px]">tune</span>Bộ lọc</h3><button className="text-blue-500 text-sm font-medium hover:underline" onClick={() => { }}>Đặt lại</button></div>
                            <div className="flex flex-col gap-4">
                                <details className="group bg-white rounded-xl border border-slate-200 shadow-sm" open>
                                    <summary className="flex cursor-pointer items-center justify-between px-4 py-3 select-none"><span className="text-sm font-semibold text-slate-900">Kỹ năng (Skills)</span><span className="material-symbols-outlined text-slate-400 group-open:rotate-180 text-[20px]">expand_more</span></summary>
                                    <div className="px-4 pb-4 pt-0 flex flex-col gap-2.5">
                                        {["ReactJS / Frontend", "NodeJS / Backend", "UI/UX Design", "Python / AI"].map((skill, i) => (
                                            <label key={skill} className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="size-4 rounded border-slate-300 text-blue-500" defaultChecked={i === 0} /><span className="text-sm text-slate-600">{skill}</span></label>
                                        ))}
                                    </div>
                                </details>
                                <details className="group bg-white rounded-xl border border-slate-200 shadow-sm" open>
                                    <summary className="flex cursor-pointer items-center justify-between px-4 py-3 select-none"><span className="text-sm font-semibold text-slate-900">Ngân sách (VNĐ)</span><span className="material-symbols-outlined text-slate-400 group-open:rotate-180 text-[20px]">expand_more</span></summary>
                                    <div className="px-4 pb-6 pt-2">
                                        <div className="relative w-full h-8 flex items-center"><div className="absolute w-full h-1 bg-slate-200 rounded-full"></div><div className="absolute h-1 bg-blue-500 rounded-full left-[10%] right-[30%]"></div><div className="absolute left-[10%] -ml-1.5 size-4 bg-white border-2 border-blue-500 rounded-full shadow cursor-grab"></div><div className="absolute right-[30%] -mr-1.5 size-4 bg-white border-2 border-blue-500 rounded-full shadow cursor-grab"></div></div>
                                        <div className="flex justify-between items-center mt-2"><span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">5tr</span><span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">50tr+</span></div>
                                    </div>
                                </details>
                                <details className="group bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <summary className="flex cursor-pointer items-center justify-between px-4 py-3 select-none"><span className="text-sm font-semibold text-slate-900">Trạng thái dự án</span><span className="material-symbols-outlined text-slate-400 group-open:rotate-180 text-[20px]">expand_more</span></summary>
                                    <div className="px-4 pb-4 pt-0 flex flex-col gap-2.5">
                                        {["Đang tuyển", "Sắp bắt đầu", "Cần gấp"].map((status, i) => (
                                            <label key={status} className="flex items-center gap-3 cursor-pointer"><input type="radio" name="status" className="size-4 border-slate-300 text-blue-500" defaultChecked={i === 0} /><span className="text-sm text-slate-600">{status}</span></label>
                                        ))}
                                    </div>
                                </details>
                            </div>
                        </aside>

                        {/* Job Feed */}
                        <section className="col-span-12 lg:col-span-9 flex flex-col gap-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-500 text-sm">Hiển thị <span className="font-semibold text-slate-900">{openJobsCount}</span> dự án đang mở</p>
                                <div className="flex items-center gap-2"><span className="text-sm text-slate-500">Sắp xếp:</span><select className="text-sm font-medium text-slate-900 bg-transparent border-none focus:ring-0 cursor-pointer p-0 pr-6"><option>Mới nhất</option><option>Ngân sách cao nhất</option><option>Phù hợp nhất</option></select></div>
                            </div>
                            {jobs.map((job) => (
                                <article key={job.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-500 transition-colors">{job.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                                                    {job.verified && <span className="material-symbols-outlined text-blue-500 text-[16px]">verified</span>}
                                                    {job.company}
                                                </span>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-xs text-slate-400">Đăng {job.posted}</span>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-blue-500 transition-colors" onClick={() => { }}><span className="material-symbols-outlined text-[24px]">bookmark_border</span></button>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{job.desc}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {job.tags.map((t) => <span key={t} className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">{t}</span>)}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500">Ngân sách dự kiến</span>
                                            <span className="text-base font-bold text-slate-900">{job.budget}</span>
                                        </div>
                                        <Button variant="primary" className="px-5 py-2.5 text-sm font-bold shadow-sm shadow-blue-500/30" onClick={() => alert('sendGửi báo giá')}>
                                            <span className="material-symbols-outlined text-[18px] mr-2">send</span>Gửi báo giá
                                        </Button>
                                    </div>
                                </article>
                            ))}
                            <div className="flex justify-center mt-6">
                                <Button variant="secondary" className="px-6 py-2 text-sm font-medium" onClick={() => alert('Xem thêm dự án')}>Xem thêm dự án</Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
