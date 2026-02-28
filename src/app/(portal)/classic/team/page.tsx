"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const teamMembers = [
    { name: "Nguyễn Văn A", status: "available", skills: ["SEO", "Marketing"], permission: "editor", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC64TmE1yvZY1ghKndbY71-D8-7cVw6PSJVA1TuKvxRdpvShME79o2iDAtiXf3G8RwjzAzPWj154r8YXg3E9_bIM6efP3X7Kv_9imn8D8GZhzUL9L9s2_XWs564Yy-erjLMbHbeJHZkbOJ8ANxe9Ei_wNSpHumtYtcknOP3o5pOb3_a78oGhb-4vwzDMSFOLSDtbh6hhlY2j2Lk5WVPKIZzLmUWUYK7GGlbbjC5kk1yebKXuy0oqSL9Byd4FqGEmbBbj8tpIsLrLnA" },
    { name: "Trần Thi B", status: "busy", skills: ["Content Writer", "Copywriting"], permission: "viewer", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl_0GUZfqaQMxhJiSPE9bytLNIv8f1IYcK34br8m_14x3n0O1LwN9UbynB3_0I8FxdGgR6rPf5FF7ETp5GMp8ImNH6ikHvW19GaWS6mpHmc07I6dH8wCz0MgAcqchVBw71RQob2AqvhWB7RCSOO_QqCywm8p_2fh-ZRJhx5km4kvEPxXqXA4qb2wBK9d5zbNGBRALSAp9UOfy2PPeQNPYtrbUT-7FWJIRaS7TZa1uP-q8pqBE8KV0WzY_dypLGbYUsLMMjudN2c7U" },
    { name: "Lê Văn C", status: "available", skills: ["UI/UX Design", "Figma"], permission: "editor", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAgQp_YCsoSjiEpm3ArHu1tBy_dVRlNenpzMseDaeD-ADzMJHz_3noCMD6qLMxpKm4W59pnBJx-QdW0JjtfLMcyXrEeYh1rA8uj69fzG6Ls_uSaDuiQ23KELt-RY_QCNJjrD5aW0SIqP5KDvwsaeUviG4-q1B1AKMBngQ00ShGdoZPVJqwmurZCv7KCjy9iIHq17EtIuO9KHyiZUL9Vofjsa0j7CTb0t-Pd2cA89bJbf5zm0bL8qKN-k2Sac2l-FI8yEFVRjITE-4" },
    { name: "Phạm Thị D", status: "busy", skills: ["Frontend", "ReactJS"], permission: "viewer", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAutYvPQUMvRtZsyYvf0UW7_nFRQRjAmiJJwfAMMVqBr2aWCOgwDCSePm9w6ghVtww7B0OsuUaiCyrdlqpxr3Egz32x7wOCu5HXgfKmVIW6qmiAX9P4gYt0DgN9-bQR0CXgmeBjq364X01x8DPtdGN7tuJIFclKqT2GG4b4o7VvjZDAJsS2LWHQGeqzckTpWQl55WRrGpfhj45oAk3bSYu5mud4fvHP0RIzkmIZsbj5TOvv9FfsrKDkHHM7eg3soAbyojBgQBYAt2g" },
    { name: "Hoàng Văn E", status: "available", skills: ["Video Editor", "Animation"], permission: "viewer", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq5cvqr4ASa_sUwG0KIxEiqwj4LddaBYsesiHKhGvKEentvK-LmTUwy7CMD5gLTV-PyltxaGWhKY0EknvGGYM0gaYxXP4_e_kVMMcr3m7q89YdgAe1v88SxeCth_sz7vKGeluUA1FkfMUdW1SDqNPGN1dmFGGxOqx_Fp2TfniYIhBDtOtB185UejrzdMMrYDweNJL05ZcWPgVS-cqtnwh92RuNkjUH9CWofZ9HKaE2gQn605tVwTdSRztzHNNtTcTYHIwrvXKME-0" },
];

const StatusBadge = ({ status }: { status: string }) => {
    const s = status === "available" ? { bg: "bg-green-500", text: "text-green-700", bgLight: "bg-green-50", label: "Đang rảnh" } : { bg: "bg-amber-500", text: "text-amber-700", bgLight: "bg-amber-50", label: "Đang làm" };
    return (
        <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-2 h-2 rounded-full ${s.bg}`}></span>
            <span className={`text-xs font-medium ${s.text} ${s.bgLight} px-2 py-0.5 rounded-full`}>{s.label}</span>
        </div>
    );
};

const MemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
    <div className="group relative flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-500/30 transition-all duration-300">
        <div className="absolute top-4 right-4">
            <button className="text-slate-400 hover:text-slate-600" onClick={() => {}}><span className="material-symbols-outlined">more_vert</span></button>
        </div>
        <div className="flex flex-col items-center mb-4">
            <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-cover bg-center shadow-inner" style={{ backgroundImage: `url('${member.avatar}')` }}></div>
                <div className={`absolute bottom-0 right-0 w-5 h-5 ${member.status === "available" ? "bg-green-500" : "bg-amber-500"} border-2 border-white rounded-full`}></div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
            <StatusBadge status={member.status} />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
            {member.skills.map((skill) => <span key={skill} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{skill}</span>)}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 w-full">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quyền hạn</span>
                <select className={`appearance-none ${member.permission === "editor" ? "bg-blue-50 hover:bg-blue-100 text-blue-600" : "bg-slate-50 hover:bg-slate-100 text-slate-700"} text-sm font-bold py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none transition-colors`}>
                    <option value="editor">Chỉnh sửa</option>
                    <option value="viewer">Xem</option>
                </select>
            </div>
        </div>
    </div>
);

export default function TeamPage() {
    return (
        <div className="bg-white text-slate-900 font-sans min-h-screen">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                    <a className="hover:text-blue-500 transition-colors" href="/dashboard">Trang chủ</a>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <a className="hover:text-blue-500 transition-colors" href="/classic/team">Đội ngũ</a>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-slate-900 font-medium">Quản lý đội ngũ</span>
                </nav>

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gray-200 pb-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Đội ngũ của tôi</h1>
                        <p className="text-slate-500 text-base max-w-2xl">Danh sách các Freelancer đang làm việc cho công ty. Quản lý quyền truy cập và trạng thái công việc.</p>
                    </div>
                    <Button variant="primary" className="flex items-center justify-center gap-2 px-5 py-2.5 shadow-lg shadow-blue-500/20" onClick={() => alert('addMời thêm')}>
                        <span className="material-symbols-outlined text-[20px]">add</span><span>Mời thêm</span>
                    </Button>
                </header>

                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
                    <div className="flex flex-1 gap-3">
                        <div className="relative flex-1 max-w-md group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"><span className="material-symbols-outlined">search</span></span>
                            <Input className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-gray-200 border rounded-lg text-sm placeholder:text-slate-400" placeholder="Tìm kiếm nhân sự..." />
                        </div>
                        <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-slate-50 text-slate-600" onClick={() => {}}><span className="material-symbols-outlined">filter_list</span></button>
                        <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-slate-50 text-slate-600" onClick={() => {}}><span className="material-symbols-outlined">sort</span></button>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                        {["Tất cả", "SEO", "Content", "Design", "Marketing"].map((tag, i) => (
                            <button key={tag} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`} onClick={() => {}}>
                                {i === 0 && <span className="material-symbols-outlined text-[18px]">check</span>}
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teamMembers.map((member) => <MemberCard key={member.name} member={member} />)}
                    <button className="group flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-gray-200 rounded-xl p-5 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 h-full min-h-[300px]" onClick={() => {}}>
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-blue-500 text-[32px]">person_add</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-500">Mời thành viên mới</h3>
                        <p className="text-sm text-slate-500 text-center mt-2 max-w-[200px]">Gửi email mời freelancer tham gia vào workspace của bạn.</p>
                    </button>
                </div>

                <div className="flex items-center justify-center mt-12 gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50" onClick={() => {}}><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20" onClick={() => {}}>1</button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50" onClick={() => {}}>2</button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50" onClick={() => {}}>3</button>
                    <span className="px-2 text-slate-400">...</span>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50" onClick={() => {}}><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                </div>
            </div>
        </div>
    );
}
