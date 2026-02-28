"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Define Task interface with all possible optional properties
interface Task {
    id: number;
    tag: string;
    tagColor?: string;
    title: string;
    attachments?: number;
    comments?: number;
    images?: number;
    progress?: number;
    date: string;
    dateColor?: string;
    urgent?: boolean;
    completed?: boolean;
}

const tasks: Record<string, Task[]> = {
    todo: [
        { id: 1, tag: "Design", tagColor: "blue", title: "Thiết kế Homepage v2", attachments: 2, date: "Oct 25", dateColor: "orange" },
        { id: 2, tag: "Backend", tagColor: "purple", title: "Viết API đăng nhập OAuth 2.0", comments: 5, date: "Oct 28" },
        { id: 3, tag: "Planning", tagColor: "slate", title: "Họp kickoff phase 2", date: "Nov 01" },
    ],
    doing: [
        { id: 4, tag: "Urgent", tagColor: "red", title: "Cắt HTML/CSS Landing Page", progress: 75, date: "Today", dateColor: "red", urgent: true },
        { id: 5, tag: "Backend", tagColor: "purple", title: "Tích hợp cổng thanh toán Stripe", date: "Oct 27" },
    ],
    review: [
        { id: 6, tag: "QA", tagColor: "green", title: "Test luồng đặt hàng (Checkout flow)", images: 4, date: "Oct 23" },
        { id: 7, tag: "Security", tagColor: "slate", title: "Audit bảo mật server", date: "Oct 24" },
    ],
    done: [
        { id: 8, tag: "DevOps", title: "Setup Server Production", date: "Oct 15", completed: true },
        { id: 9, tag: "Admin", title: "Mua domain .com", date: "Oct 12", completed: true },
    ],
};

const tagColors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    slate: "bg-slate-100 text-slate-600",
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
};

const TaskCard = ({ task }: { task: Task }) => (
    <div className={`group bg-white p-4 rounded-lg border ${task.urgent ? 'border-l-4 border-l-blue-500 border-y-slate-200 border-r-slate-200' : 'border-slate-200 hover:border-blue-500/50'} shadow-sm hover:shadow-md cursor-grab transition-all ${task.completed ? 'opacity-80 bg-slate-50' : ''}`}>
        <div className="flex justify-between items-start mb-2">
            <span className={`${tagColors[task.tagColor || 'slate']} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1`}>
                {task.urgent && <span className="material-symbols-outlined text-[12px]">local_fire_department</span>}
                {task.tag}
            </span>
            {task.completed && <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>}
        </div>
        <h4 className={`text-slate-800 font-medium mb-3 leading-snug ${task.completed ? 'line-through text-slate-600 decoration-slate-400' : ''}`}>{task.title}</h4>
        {task.progress !== undefined && (
            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-3 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${task.progress}%` }}></div>
            </div>
        )}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
            <div className="flex -space-x-1.5">
                <div className="size-6 rounded-full border border-white bg-slate-300"></div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                {task.attachments && <div className="flex items-center gap-1 hover:text-blue-500"><span className="material-symbols-outlined text-[16px]">attach_file</span><span>{task.attachments}</span></div>}
                {task.comments && <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">comment</span><span>{task.comments}</span></div>}
                {task.images && <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">image</span><span>{task.images}</span></div>}
                <div className={`flex items-center gap-1 ${task.dateColor === 'red' ? 'text-red-500 font-semibold' : task.dateColor === 'orange' ? 'text-orange-500' : ''}`}>
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>{task.date}</span>
                </div>
            </div>
        </div>
    </div>
);

const Column = ({ title, count, countColor, items }: { title: string; count: number; countColor: string; items: Task[] }) => (
    <div className="flex flex-col w-[320px] shrink-0 h-full">
        <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-700">{title}</h3>
                <span className={`${countColor} text-xs font-bold px-2 py-0.5 rounded-full`}>{count}</span>
            </div>
            <button className="text-slate-400 hover:text-blue-500" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
        </div>
        <div className="flex-1 bg-slate-100/50 rounded-xl p-3 flex flex-col gap-3 overflow-y-auto border border-slate-200/50">
            {items.map((task) => <TaskCard key={task.id} task={task} />)}
            {title === "Cần làm" && (
                <button className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-blue-500 hover:bg-white rounded-lg text-sm font-medium border border-transparent hover:border-slate-200 border-dashed" onClick={() => { }}>
                    <span className="material-symbols-outlined text-[20px]">add</span>Thêm task
                </button>
            )}
        </div>
    </div>
);

export default function KanbanPage() {
    return (
        <div className="bg-gray-100 text-slate-900 font-sans h-screen flex overflow-hidden">
            {/* Collapsed Sidebar */}
            <aside className="w-20 bg-white flex flex-col items-center py-6 border-r border-slate-200 z-20 shadow-sm shrink-0">
                <div className="mb-8">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                        <span className="material-symbols-outlined text-[24px]">grid_view</span>
                    </div>
                </div>
                <nav className="flex-1 flex flex-col gap-4 w-full px-2">
                    {[{ icon: "dashboard" }, { icon: "view_kanban", active: true }, { icon: "group" }, { icon: "folder" }, { icon: "calendar_month" }].map((item, i) => (
                        <a key={i} className={`flex items-center justify-center size-12 rounded-xl ${item.active ? 'bg-blue-500/10 text-blue-500' : 'text-slate-400 hover:text-blue-500 hover:bg-blue-500/10'} transition-colors`} href="javascript:void(0)" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('{item.icon}'); }}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </a>
                    ))}
                </nav>
                <div className="flex flex-col gap-4 w-full px-2 mt-auto">
                    <a className="flex items-center justify-center size-12 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-500/10" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('settings'); }}><span className="material-symbols-outlined">settings</span></a>
                    <div className="h-px w-8 bg-slate-200 mx-auto"></div>
                    <div className="size-10 rounded-full bg-slate-300 mx-auto"></div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-w-0 h-full">
                <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col gap-5 shrink-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <nav className="flex items-center gap-2 text-sm text-slate-500"><a className="hover:text-blue-500" href="/classic/projects">Dự án</a><span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span><span className="text-slate-900">Website E-commerce</span></nav>
                            <h1 className="text-2xl font-bold text-slate-900">Dự án Website E-commerce</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden lg:block">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
                                <Input className="h-10 pl-10 pr-4 rounded-lg bg-slate-100 border-none text-sm w-64 placeholder:text-slate-400" placeholder="Tìm kiếm task..." />
                            </div>
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => <div key={i} className="size-8 rounded-full border-2 border-white bg-slate-300"></div>)}
                                <button className="size-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500" onClick={() => { }}>+4</button>
                            </div>
                            <Button variant="primary" className="flex items-center gap-2 px-4 h-10 shadow-md" onClick={() => alert('Thêm task mới')}>
                                <span className="material-symbols-outlined text-[20px]">add</span>Task mới
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 border-t border-slate-100 pt-4">
                        <div className="flex flex-col gap-2 w-full max-w-md">
                            <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Tiến độ tổng thể</span><span className="text-slate-900 font-bold">45%</span></div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div></div>
                        </div>
                        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[20px] text-slate-400">calendar_today</span><span>Oct 1 - Dec 31</span></div>
                            <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[20px] text-slate-400">folder_open</span><span>24 Tệp</span></div>
                        </div>
                    </div>
                </header>

                {/* Kanban Board */}
                <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-100 p-6">
                    <div className="flex h-full gap-6 min-w-max">
                        <Column title="Cần làm" count={3} countColor="bg-slate-200 text-slate-600" items={tasks.todo} />
                        <Column title="Đang làm" count={2} countColor="bg-blue-100 text-blue-600" items={tasks.doing} />
                        <Column title="Đang kiểm tra" count={2} countColor="bg-yellow-100 text-yellow-700" items={tasks.review} />
                        <Column title="Hoàn thành" count={2} countColor="bg-green-100 text-green-700" items={tasks.done} />
                    </div>
                </div>
            </main>
        </div>
    );
}
