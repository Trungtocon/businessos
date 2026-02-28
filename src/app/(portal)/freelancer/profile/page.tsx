"use client";

import { Button } from "@/components/ui/Button";

const skills = ["UX/UI Design", "Figma", "Adobe XD", "Prototyping", "Design Systems", "User Research"];
const projects = [
    { title: "E-Commerce Mobile App", desc: "Thiết kế giao diện ứng dụng mua sắm với hơn 50 màn hình", client: "TechFlow Inc.", rating: "5.0", img: "bg-gradient-to-br from-blue-400 to-indigo-500" },
    { title: "SaaS Dashboard Redesign", desc: "Cải tiến trải nghiệm người dùng cho nền tảng quản lý dữ liệu", client: "DataHub Corp.", rating: "4.9", img: "bg-gradient-to-br from-emerald-400 to-teal-500" },
    { title: "Banking App Concept", desc: "Thiết kế concept ứng dụng ngân hàng số thế hệ mới", client: "FinoBank", rating: "5.0", img: "bg-gradient-to-br from-amber-400 to-orange-500" },
];

export default function ProfilePage() {
    return (
        <div className="bg-gray-50 text-slate-900 font-sans min-h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="size-8 flex items-center justify-center bg-blue-500 rounded-lg text-white"><span className="material-symbols-outlined text-xl">dataset</span></div>
                    <span className="text-lg font-bold tracking-tight">BusinessOS</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <a className="text-slate-500 hover:text-blue-500 text-sm font-medium" href="/dashboard">Tổng quan</a>
                    <a className="text-slate-500 hover:text-blue-500 text-sm font-medium" href="/freelancer/jobs">Công việc</a>
                    <a className="text-blue-500 text-sm font-bold" href="/classic/profile">Hồ sơ</a>
                    <a className="text-slate-500 hover:text-blue-500 text-sm font-medium" href="/settings">Cài đặt</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="text-slate-500 hover:text-blue-500" onClick={() => { }}><span className="material-symbols-outlined">notifications</span></button>
                    <div className="size-9 rounded-full bg-slate-200 ring-2 ring-white cursor-pointer" onClick={() => { }}></div>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 overflow-y-auto">
                {/* Cover */}
                <div className="h-48 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
                    <button className="absolute bottom-4 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1" onClick={() => { }}><span className="material-symbols-outlined text-[16px]">edit</span>Đổi ảnh bìa</button>
                </div>

                <div className="max-w-5xl mx-auto px-6 lg:px-10 -mt-16 relative z-10 pb-12">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-10">
                        <div className="relative">
                            <div className="size-32 rounded-full bg-slate-200 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                                <span className="material-symbols-outlined text-5xl text-slate-400">person</span>
                            </div>
                            <button className="absolute bottom-1 right-1 size-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-600" onClick={() => { }}><span className="material-symbols-outlined text-[18px]">camera_alt</span></button>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Nguyễn Minh Hoàng</h1>
                                    <p className="text-slate-500 text-sm">Senior UX/UI Designer · Hồ Chí Minh, Việt Nam</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 md:mt-0">
                                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">Đã xác thực</span>
                                    <span className="bg-blue-50 text-blue-500 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">Được đánh giá cao</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 mt-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-amber-500">star</span><span className="font-bold text-slate-900">4.9</span><span>(127 đánh giá)</span></div>
                                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-blue-500">work</span><span className="font-medium">85 dự án hoàn thành</span></div>
                                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-emerald-500">schedule</span><span className="font-medium">Tham gia từ 2021</span></div>
                            </div>
                        </div>
                        <Button variant="primary" className="flex items-center gap-2 px-5 py-2.5 font-semibold" onClick={() => alert('editChỉnh sửa hồ sơ')}><span className="material-symbols-outlined text-[18px]">edit</span>Chỉnh sửa hồ sơ</Button>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            {/* About */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">Giới thiệu</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Với hơn 5 năm kinh nghiệm trong lĩnh vực UX/UI Design, tôi đã tham gia nhiều dự án từ mobile app đến enterprise software. Chuyên về thiết kế hệ thống, prototyping và user research.</p>
                            </div>
                            {/* Skills */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">Kỹ năng</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <span key={i} className="bg-gray-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            {/* Contact */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-4">Liên hệ</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-slate-400 text-[20px]">mail</span><span className="text-slate-600">hoang.nguyen@email.com</span></div>
                                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-slate-400 text-[20px]">language</span><a className="text-blue-500 hover:underline" href="https://portfolio.design">portfolio.design</a></div>
                                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-slate-400 text-[20px]">link</span><a className="text-blue-500 hover:underline" href="https://linkedin.com/in/hoang">linkedin.com/in/hoang</a></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Featured Projects */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-base font-bold text-slate-900">Dự án nổi bật</h3>
                                    <a className="text-blue-500 text-sm font-medium hover:underline" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('Xem tất cả'); }}>Xem tất cả</a>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projects.map((p, i) => (
                                        <div key={i} className="group cursor-pointer" onClick={() => { }}>
                                            <div className={`${p.img} h-32 rounded-lg mb-3 relative overflow-hidden`}>
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">visibility</span>
                                                </div>
                                            </div>
                                            <h4 className="text-sm font-semibold text-slate-900 mb-1">{p.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 mb-2">{p.desc}</p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-400">{p.client}</span>
                                                <span className="flex items-center gap-1 text-amber-500"><span className="material-symbols-outlined text-[14px]">star</span>{p.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Work Experience */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-6">Kinh nghiệm làm việc</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-blue-500">business</span></div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900">Senior UX Designer</h4>
                                            <p className="text-xs text-slate-500">TechFlow Inc. · 2022 - Hiện tại</p>
                                            <p className="text-sm text-slate-600 mt-2">Dẫn dắt team thiết kế 5 người, phụ trách design system và user research cho các sản phẩm B2B SaaS.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-emerald-500">business</span></div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900">UI/UX Designer</h4>
                                            <p className="text-xs text-slate-500">StartUp Labs · 2019 - 2022</p>
                                            <p className="text-sm text-slate-600 mt-2">Thiết kế giao diện cho hơn 20 ứng dụng mobile và web trong các lĩnh vực fintech, e-commerce.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
