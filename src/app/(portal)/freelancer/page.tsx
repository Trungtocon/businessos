"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const tasks = [
    { urgent: true, priority: "Gấp", project: "BusinessOS SaaS", title: "Thiết kế UI màn hình Dashboard", deadline: "17:00 Hôm nay", deadlineColor: "text-red-500", files: 3 },
    { urgent: false, priority: "Ưu tiên cao", project: "E-commerce App", title: "Fix bug API đăng nhập", deadline: "14:00 Ngày mai", deadlineColor: "text-slate-500" },
    { urgent: false, priority: null, project: "Website Landing", title: "Họp tiến độ với Client", deadline: "09:00 Thứ 6", deadlineColor: "text-slate-500", meeting: true },
];

const events = [
    { day: "T6", date: "06", title: "Deadline dự án X", time: "17:00 PM", active: true },
    { day: "T2", date: "09", title: "Họp team tuần mới", time: "09:30 AM", active: false },
];

export default function FreelancerDashboardPage() {
    return (
        <div className="bg-gray-50 text-slate-900 flex h-screen overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 flex flex-col h-full shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                    <div className="flex flex-col"><h1 className="text-white text-lg font-bold leading-none tracking-tight">BusinessOS</h1><p className="text-blue-300 text-xs font-normal mt-1">Freelancer</p></div>
                </div>
                <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-500 text-white" href="/dashboard"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span><span className="text-sm font-medium">Tổng quan</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5" href="/classic/projects"><span className="material-symbols-outlined text-[20px]">work</span><span className="text-sm font-medium">Dự án</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5" href="/classic/finance"><span className="material-symbols-outlined text-[20px]">payments</span><span className="text-sm font-medium">Tài chính</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5" href="/classic/reports"><span className="material-symbols-outlined text-[20px]">bar_chart</span><span className="text-sm font-medium">Báo cáo</span></a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5" href="/settings"><span className="material-symbols-outlined text-[20px]">settings</span><span className="text-sm font-medium">Cài đặt</span></a>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 rounded-full bg-slate-500"></div>
                        <div className="flex flex-col"><span className="text-white text-sm font-medium">Nguyễn Văn A</span><span className="text-slate-400 text-xs">Thành viên Pro</span></div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 h-full min-w-0 bg-gray-50">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex-1 max-w-lg relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <Input className="w-full bg-slate-100 border-none rounded-lg h-10 pl-10 pr-4 text-sm placeholder:text-slate-400" placeholder="Tìm kiếm dự án, nhiệm vụ..." />
                    </div>
                    <div className="flex items-center gap-4 ml-6">
                        <Button variant="primary" className="hidden md:flex h-9 px-4 items-center gap-2 text-sm shadow-sm shadow-blue-200" onClick={() => alert('addTạo nhiệm vụ')}><span className="material-symbols-outlined text-[18px]">add</span><span>Tạo nhiệm vụ</span></Button>
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600" onClick={() => { }}><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
                        <div className="w-9 h-9 rounded-full bg-slate-200 ring-2 ring-slate-100 cursor-pointer" onClick={() => { }}></div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Income Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1"><p className="text-slate-500 text-sm font-medium">Thu nhập chờ về</p><h2 className="text-blue-500 text-3xl font-bold tracking-tight">15.000.000 đ</h2></div>
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><span className="material-symbols-outlined">pending</span></div>
                                </div>
                                <div className="mt-4 flex items-center gap-2"><span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold"><span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+5%</span><span className="text-slate-400 text-xs">so với tháng trước</span></div>
                            </div>
                            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1"><p className="text-slate-500 text-sm font-medium">Thu nhập tháng này</p><h2 className="text-blue-500 text-3xl font-bold tracking-tight">32.500.000 đ</h2></div>
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><span className="material-symbols-outlined">account_balance_wallet</span></div>
                                </div>
                                <div className="mt-4 flex items-center gap-2"><span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold"><span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+12%</span><span className="text-slate-400 text-xs">so với tháng trước</span></div>
                            </div>
                        </div>

                        {/* Tasks & Calendar */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-5">
                                <div className="flex items-center justify-between"><h2 className="text-slate-900 text-xl font-bold">Việc cần làm hôm nay</h2><a className="text-blue-500 text-sm font-medium hover:underline" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('Xem tất cả'); }}>Xem tất cả</a></div>
                                {tasks.map((task, i) => (
                                    <div key={i} className={`group bg-white rounded-xl p-5 ${task.urgent ? "border-l-4 border-l-red-500 border-y border-r border-slate-100" : "border border-slate-200"} shadow-sm hover:border-blue-500/30 transition-all`}>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    {task.urgent && <span className="px-2 py-1 rounded bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span>{task.priority}</span>}
                                                    {task.priority && !task.urgent && <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">{task.priority}</span>}
                                                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">{task.project}</span>
                                                </div>
                                                <h3 className="text-slate-900 text-base font-bold mb-1 group-hover:text-blue-500 transition-colors">{task.title}</h3>
                                                <div className="flex items-center gap-4 text-slate-500 text-sm">
                                                    <div className={`flex items-center gap-1 ${task.deadlineColor} font-medium`}><span className="material-symbols-outlined text-[16px]">{task.meeting ? "calendar_today" : "schedule"}</span>{task.deadline}</div>
                                                    {task.files && <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">attach_file</span>{task.files} tệp</div>}
                                                    {task.meeting && <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">videocam</span>Google Meet</div>}
                                                </div>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2">
                                                {task.urgent && <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">+</div>}
                                                <Button variant={task.urgent ? "primary" : "secondary"} className={`px-4 py-2 text-sm font-bold ${task.urgent ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white" : ""}`} onClick={() => alert('{task.urgent && play_arrow}')}>
                                                    {task.urgent && <span className="material-symbols-outlined text-[18px] mr-1.5">play_arrow</span>}
                                                    {task.urgent ? "Bắt đầu" : task.meeting ? "Tham gia" : "Chi tiết"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="lg:col-span-1 flex flex-col gap-6">
                                {/* Calendar Widget */}
                                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-slate-800">Tháng 10, 2023</h3>
                                        <div className="flex gap-1"><button className="p-1 hover:bg-slate-100 rounded text-slate-500" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">chevron_left</span></button><button className="p-1 hover:bg-slate-100 rounded text-slate-500" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">chevron_right</span></button></div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 text-center mb-2">{["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => <span key={d} className="text-xs font-medium text-slate-400">{d}</span>)}</div>
                                    <div className="grid grid-cols-7 gap-1 text-sm">
                                        {[25, 26, 27, 28, 29, 30].map((d) => <span key={d} className="aspect-square flex items-center justify-center text-slate-300">{d}</span>)}
                                        {[1, 2, 3].map((d) => <span key={d} className="aspect-square flex items-center justify-center text-slate-700 hover:bg-slate-50 rounded-full cursor-pointer">{d}</span>)}
                                        <span className="aspect-square flex items-center justify-center bg-blue-500 text-white rounded-full font-bold shadow-md shadow-blue-200">4</span>
                                        {[5, 6, 7].map((d) => <span key={d} className="aspect-square flex items-center justify-center text-slate-700 hover:bg-slate-50 rounded-full cursor-pointer">{d}</span>)}
                                        <span className="aspect-square flex items-center justify-center text-slate-700 hover:bg-slate-50 rounded-full cursor-pointer relative">8<span className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full"></span></span>
                                        {[9, 10, 11, 12].map((d) => <span key={d} className="aspect-square flex items-center justify-center text-slate-700 hover:bg-slate-50 rounded-full cursor-pointer">{d}</span>)}
                                    </div>
                                </div>
                                {/* Upcoming Events */}
                                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                                    <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Sắp diễn ra</h3>
                                    <div className="space-y-4">
                                        {events.map((e, i) => (
                                            <div key={i} className="flex gap-3">
                                                <div className={`flex flex-col items-center ${e.active ? "bg-blue-50" : "bg-slate-50"} rounded-lg p-2 min-w-[50px]`}><span className={`text-xs ${e.active ? "text-blue-600" : "text-slate-500"} font-bold uppercase`}>{e.day}</span><span className={`text-lg font-bold ${e.active ? "text-blue-800" : "text-slate-700"}`}>{e.date}</span></div>
                                                <div className="flex flex-col"><p className="text-sm font-bold text-slate-800 line-clamp-1">{e.title}</p><p className="text-xs text-slate-500 mt-1">{e.time}</p></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
