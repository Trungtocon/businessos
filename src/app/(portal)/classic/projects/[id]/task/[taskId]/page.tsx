"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { AICopilotButton } from "@/modules/ai-copilot/ui/AICopilotDrawer";

// --- Mock Data (matches Stitch C11 spec) ---
const task = {
    id: "C11-024",
    title: "Design Homepage V2",
    status: "Đang thực hiện",
    createdAt: "Oct 20, 2023",
    assignee: { name: "Nguyen Van A", avatar: "JD" },
    dueDate: "Oct 30, 2023",
    priority: "Cao",
    description: `Cần thiết kế lại trang chủ phiên bản V2 dựa trên brand guidelines mới. Mục tiêu là tăng tỉ lệ chuyển đổi (CTR) cho nút CTA chính và làm mới giao diện người dùng để hiện đại hơn.`,
    requirements: [
        "Thay đổi layout Hero Section.",
        "Cập nhật màu sắc theo palette mới (Xanh dương đậm chủ đạo).",
        "Tối ưu hiển thị trên mobile.",
    ],
    checklist: [
        { id: 1, text: "Nghiên cứu đối thủ cạnh tranh", done: true },
        { id: 2, text: "Draft Wireframe Low-fi", done: false },
        { id: 3, text: "Design High-fi Mockup", done: false },
    ],
    attachments: [
        { name: "Wireframe_V1.png", size: "2.4 MB", date: "20 Oct", icon: "image", color: "indigo" },
        { name: "Assets_Export.zip", size: "156 MB", date: "21 Oct", icon: "folder_zip", color: "orange" },
    ],
};

const messages = [
    { id: 1, sender: "them", name: "Nguyen Van A", time: "09:15 AM", text: "Em đã cập nhật wireframe mới rồi ạ, anh xem giúp em nhé." },
    { id: 2, sender: "me", name: "Bạn", time: "09:42 AM", text: "Ok em, để anh check bản mobile view xem sao." },
    { id: 3, sender: "them", name: "Nguyen Van A", time: "10:05 AM", text: "Em gửi file chi tiết ạ:", file: { name: "Specs_V2.pdf", size: "2.4 MB" } },
];

export default function TaskDetailPage() {
    const [checklistState, setChecklistState] = useState(
        task.checklist.map((c) => ({ ...c }))
    );
    const [chatInput, setChatInput] = useState("");

    const toggleCheck = (id: number) => {
        setChecklistState((prev) =>
            prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
        );
    };

    const completedCount = checklistState.filter((c) => c.done).length;

    return (
        <div className="min-h-screen bg-[#f8f9fc] font-[Inter,sans-serif] text-slate-900 flex items-center justify-center p-4">
            {/* Modal Container */}
            <div className="relative w-full max-w-[85%] h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-b border-slate-200 bg-white z-10 shrink-0 gap-4 sm:gap-0">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold leading-tight tracking-tight">{task.title}</h2>
                            <Badge variant="info">{task.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="material-symbols-outlined text-[16px]">tag</span>
                            <span>Task ID: #{task.id}</span>
                            <span className="mx-1">•</span>
                            <span>Tạo ngày {task.createdAt}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <AICopilotButton contextPack={{ brief: task.description, taskId: task.id, projectId: task.id, userRole: "business" }} />
                        <button className="hidden sm:flex items-center justify-center h-9 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-sm transition-colors" onClick={() => { }}>
                            <span className="material-symbols-outlined text-[18px] mr-2">edit_note</span>
                            Yêu cầu sửa
                        </button>
                        <button className="hidden sm:flex items-center justify-center h-9 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-sm transition-colors" onClick={() => { }}>
                            <span className="material-symbols-outlined text-[18px] mr-2">check_circle</span>
                            Duyệt
                        </button>
                        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
                        <button className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => { }}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Main Split View */}
                <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                    {/* Left: Chat Panel */}
                    <div className="flex flex-col w-full md:w-[380px] lg:w-[420px] bg-slate-50/50 border-r border-slate-200 shrink-0 h-full">
                        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white/50">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Thảo luận</span>
                            <div className="flex -space-x-2">
                                {["JD", "NV", "MT"].map((initials, i) => (
                                    <div key={i} className="size-6 rounded-full ring-2 ring-white bg-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-600">
                                        {initials}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-5">
                            <div className="flex justify-center my-2">
                                <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today, Oct 24</span>
                            </div>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === "me" ? "justify-end" : ""}`}>
                                    {msg.sender !== "me" && (
                                        <div className="size-8 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">NA</div>
                                    )}
                                    <div className={`flex flex-col gap-1 ${msg.sender === "me" ? "items-end" : "items-start"} max-w-[85%]`}>
                                        <div className={`flex items-baseline gap-2 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                                            <p className="text-slate-500 text-[12px] font-medium">{msg.name}</p>
                                            <span className="text-slate-400 text-[10px]">{msg.time}</span>
                                        </div>
                                        <div className={`p-3 rounded-2xl shadow-sm text-sm ${msg.sender === "me"
                                            ? "bg-blue-500 text-white rounded-br-none"
                                            : "bg-white border border-slate-100 rounded-bl-none text-slate-800"
                                            }`}>
                                            {msg.text}
                                            {msg.file && (
                                                <div className="flex items-center gap-3 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => { }}>
                                                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-red-500 text-lg">picture_as_pdf</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-slate-700">{msg.file.name}</p>
                                                        <p className="text-[10px] text-slate-400">{msg.file.size}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {msg.sender === "me" && (
                                        <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">Bạn</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Chat Input */}
                        <div className="p-4 bg-white border-t border-slate-200">
                            <div className="relative flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-full hover:bg-slate-100" onClick={() => { }}>
                                    <span className="material-symbols-outlined text-[20px]">attach_file</span>
                                </button>
                                <input
                                    className="flex-1 bg-slate-100 border-none rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-400"
                                    placeholder="Nhập tin nhắn..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                />
                                <button className="p-2 text-blue-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50" onClick={() => { }}>
                                    <span className="material-symbols-outlined text-[20px]">send</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Detail Panel */}
                    <div className="flex-1 overflow-y-auto bg-white p-6 md:p-8">
                        <div className="max-w-3xl mx-auto space-y-8">
                            {/* Meta Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-100">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Người thực hiện</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="size-6 rounded-full bg-slate-300 flex items-center justify-center text-[8px] font-bold">{task.assignee.avatar}</div>
                                        <span className="text-sm font-medium text-slate-700">{task.assignee.name}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Hạn chót</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="material-symbols-outlined text-slate-400 text-[18px]">calendar_today</span>
                                        <span className="text-sm font-medium text-slate-700">{task.dueDate}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Độ ưu tiên</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                        <span className="text-sm font-medium text-slate-700">{task.priority}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500 text-[20px]">description</span>
                                    <h3 className="text-base font-bold text-slate-900">Mô tả</h3>
                                </div>
                                <div className="text-sm leading-relaxed text-slate-600 space-y-2 pl-7">
                                    <p>{task.description}</p>
                                    <p>Các yêu cầu cụ thể:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-2">
                                        {task.requirements.map((req, i) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-500 text-[20px]">check_box</span>
                                        <h3 className="text-base font-bold text-slate-900">Danh sách việc cần làm</h3>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                        {completedCount}/{checklistState.length} Hoàn thành
                                    </span>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-1 space-y-1">
                                    {checklistState.map((item) => (
                                        <label key={item.id} className="flex items-start gap-3 p-2 hover:bg-slate-100 rounded-md cursor-pointer group transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={item.done}
                                                onChange={() => toggleCheck(item.id)}
                                                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                            />
                                            <span className={`text-sm ${item.done ? "text-slate-500 line-through decoration-slate-400" : "text-slate-700 font-medium group-hover:text-blue-500"}`}>
                                                {item.text}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Attachments */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500 text-[20px]">attach_file</span>
                                    <h3 className="text-base font-bold text-slate-900">Tệp đính kèm</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-7">
                                    {task.attachments.map((file, i) => (
                                        <div key={i} className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group" onClick={() => { }}>
                                            <div className={`w-10 h-10 bg-${file.color}-50 rounded-lg flex items-center justify-center shrink-0 mr-3`}>
                                                <span className={`material-symbols-outlined text-${file.color}-500`}>{file.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-500">{file.name}</p>
                                                <p className="text-xs text-slate-500">{file.size} • {file.date}</p>
                                            </div>
                                            <button className="text-slate-400 hover:text-blue-500" onClick={() => { }}>
                                                <span className="material-symbols-outlined">download</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Copilot — results appear in the drawer */}
                        </div>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="sm:hidden border-t border-slate-200 p-3 flex gap-2 bg-white shrink-0">
                    <button className="flex-1 flex items-center justify-center h-10 rounded-lg bg-amber-500 text-white text-sm font-bold" onClick={() => { }}>Yêu cầu sửa</button>
                    <button className="flex-1 flex items-center justify-center h-10 rounded-lg bg-emerald-500 text-white text-sm font-bold" onClick={() => { }}>Duyệt</button>
                </div>
            </div>

            {/* AI Copilot Drawer provided by (portal)/layout.tsx */}
        </div>
    );
}
