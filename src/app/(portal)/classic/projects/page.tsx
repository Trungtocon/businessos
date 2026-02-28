"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MOCK_PROJECTS, MOCK_FREELANCERS, formatVND, getStatusColor } from "@/lib/mock-data";

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, { bg: string; text: string; label: string; icon?: string }> = {
        Active: { bg: "bg-green-50", text: "text-green-700", label: "Đang chạy" },
        Completed: { bg: "bg-blue-50", text: "text-blue-700", label: "Hoàn thành", icon: "check_circle" },
        Pending: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Chờ duyệt", icon: "hourglass_empty" },
        "On Hold": { bg: "bg-orange-50", text: "text-orange-700", label: "Tạm dừng", icon: "pause_circle" },
    };
    const s = styles[status] || styles.Active;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text} border border-current/20`}>
            {s.icon ? <span className="material-symbols-outlined text-[14px]">{s.icon}</span> : <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>}
            {s.label}
        </span>
    );
};

// Get a freelancer avatar by index
const getFreelancerAvatar = (index: number) => {
    const freelancer = MOCK_FREELANCERS[index % MOCK_FREELANCERS.length];
    return freelancer.avatarUrl;
};

export default function ProjectListPage() {
    // Calculate summary stats
    const activeProjects = MOCK_PROJECTS.filter(p => p.status === "Active").length;
    const totalBudget = MOCK_PROJECTS.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = MOCK_PROJECTS.reduce((sum, p) => sum + p.spent, 0);

    return (
        <div className="bg-gray-100 text-slate-900 h-screen overflow-hidden flex font-sans">
            {/* Sidebar */}
            <aside className="w-[260px] h-full bg-[#0F172A] flex flex-col shrink-0 z-20">
                <div className="h-[72px] flex items-center px-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-blue-500 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        </div>
                        <div>
                            <h1 className="text-white text-base font-bold">BusinessOS</h1>
                            <p className="text-slate-400 text-xs">Chế độ Classic</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                    {[{ icon: "dashboard", label: "Tổng quan" }, { icon: "folder_open", label: "Dự án", active: true }, { icon: "payments", label: "Tài chính" }, { icon: "group", label: "Nhân sự" }].map((item) => (
                        <a key={item.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? "bg-blue-500/10 text-white relative" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`} href={item.active ? "/classic/projects" : item.label === "Tổng quan" ? "/dashboard" : item.label === "Tài chính" ? "/classic/finance" : item.label === "Nhân sự" ? "/classic/team" : "#"}>
                            {item.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full"></div>}
                            <span className={`material-symbols-outlined text-[20px] ${item.active ? "text-blue-500" : ""}`} style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </a>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-700/50">
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white" href="/settings">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <span className="text-sm font-medium">Cài đặt</span>
                    </a>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col h-full min-w-0">
                <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
                    <div className="flex-1 max-w-md relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400"><span className="material-symbols-outlined text-[20px]">search</span></span>
                        <Input className="w-full pl-10 py-2.5 rounded-lg border-none bg-slate-100 text-sm placeholder-slate-500" placeholder="Tìm kiếm dự án, freelancer..." />
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                        <button className="relative text-slate-500" onClick={() => { }}><span className="material-symbols-outlined">notifications</span><span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white"></span></button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="size-10 rounded-full bg-slate-200"></div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                        <nav className="text-sm text-slate-500"><a className="hover:text-blue-500" href="/dashboard">Tổng quan</a> / <span className="text-slate-900 font-medium">Dự án</span></nav>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">Dự án đang chạy</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">{activeProjects}</p>
                                    </div>
                                    <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-green-600">rocket_launch</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">Tổng ngân sách</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">{formatVND(totalBudget)}</p>
                                    </div>
                                    <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600">payments</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">Đã chi tiêu</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">{formatVND(totalSpent)}</p>
                                    </div>
                                    <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-orange-600">trending_up</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Danh sách dự án</h2>
                            <Button variant="primary" className="flex items-center gap-2 px-5 py-2.5" onClick={() => alert('addTạo dự án mới')}><span className="material-symbols-outlined text-[20px]">add</span>Tạo dự án mới</Button>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200 text-slate-500 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Tên dự án</th>
                                        <th className="px-6 py-4">Thành viên</th>
                                        <th className="px-6 py-4">Trạng thái</th>
                                        <th className="px-6 py-4 min-w-[160px]">Tiến độ</th>
                                        <th className="px-6 py-4 text-right">Ngân sách</th>
                                        <th className="px-6 py-4 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {MOCK_PROJECTS.map((p, index) => (
                                        <tr key={p.id} className="hover:bg-gray-50 group">
                                            <td className="px-6 py-4">
                                                <a className="font-semibold text-slate-900 hover:text-blue-500" href={`/classic/projects/${p.id}/kanban`}>{p.name}</a>
                                                <p className="text-xs text-slate-500 mt-0.5">ID: {p.id} • Deadline: {p.deadline}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-cover bg-center ring-2 ring-white" style={{ backgroundImage: `url("${getFreelancerAvatar(index)}")` }}></div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{p.team[0] || "Chưa phân công"}</p>
                                                        <p className="text-xs text-slate-500">{p.team.length > 1 ? `+${p.team.length - 1} người khác` : p.client}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className={`h-2 rounded-full ${p.status === 'Completed' ? 'bg-blue-500' : p.status === 'On Hold' ? 'bg-orange-400' : p.status === 'Pending' ? 'bg-yellow-400' : 'bg-green-500'}`} style={{ width: `${p.progress}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-medium w-8 text-right">{p.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium font-mono">{formatVND(p.budget)}</td>
                                            <td className="px-6 py-4 text-right"><button className="text-slate-400 opacity-0 group-hover:opacity-100" onClick={() => { }}><span className="material-symbols-outlined">more_vert</span></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                                <Button variant="secondary" onClick={() => alert('Trang trước')}>Trước</Button>
                                <div className="flex gap-1">
                                    <button className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md" onClick={() => { }}>1</button>
                                    <button className="px-3 py-1 text-sm text-slate-600 hover:bg-gray-200 rounded-md" onClick={() => { }}>2</button>
                                </div>
                                <Button variant="secondary" onClick={() => alert('Trang sau')}>Sau</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
