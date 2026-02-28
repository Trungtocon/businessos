"use client";

import Link from "next/link";

export default function RoleSelectionPage() {
    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col text-slate-900 antialiased">
            {/* Main Container */}
            <div className="layout-container flex h-full grow flex-col relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"></div>
                    <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-400/5 rounded-full blur-[100px]"></div>
                </div>

                {/* Content Wrapper */}
                <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5 items-center">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full justify-center">
                        {/* Header Section */}
                        <div className="flex flex-col items-center text-center gap-2 mb-10 md:mb-14">
                            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-[32px]">business_center</span>
                            </div>
                            <h1 className="text-slate-900 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">Chào mừng bạn đến với BusinessOS</h1>
                            <p className="text-slate-500 text-base md:text-lg font-normal leading-normal mt-2">Vui lòng chọn vai trò để tiếp tục trải nghiệm</p>
                        </div>

                        {/* Cards Selection Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[800px] mx-auto">
                            {/* Business Card */}
                            <Link href="/login" className="group relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 text-left transition-all duration-300 hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <div className="flex items-center justify-between w-full">
                                    <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined text-[32px]">domain</span>
                                    </div>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 material-symbols-outlined">arrow_forward</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-slate-900 text-xl font-bold leading-tight group-hover:text-blue-500 transition-colors">Tôi là Doanh nghiệp</h2>
                                    <p className="text-slate-500 text-sm font-normal leading-relaxed">Tìm kiếm chuyên gia hàng đầu và công cụ quản lý dự án thông minh tối ưu hoá quy trình.</p>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </Link>

                            {/* Freelancer Card */}
                            <Link href="/login" className="group relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 text-left transition-all duration-300 hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <div className="flex items-center justify-between w-full">
                                    <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined text-[32px]">person_search</span>
                                    </div>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 material-symbols-outlined">arrow_forward</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-slate-900 text-xl font-bold leading-tight group-hover:text-blue-500 transition-colors">Tôi là Freelancer</h2>
                                    <p className="text-slate-500 text-sm font-normal leading-relaxed">Tìm kiếm cơ hội việc làm hấp dẫn và phát triển sự nghiệp bền vững với cộng đồng uy tín.</p>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </Link>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-16 flex flex-col items-center gap-4 text-center">
                            <div className="flex items-center justify-center gap-6">
                                <a className="text-slate-500 hover:text-blue-500 text-sm font-medium transition-colors" href="/chat">Hỗ trợ</a>
                                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                <a className="text-slate-500 hover:text-blue-500 text-sm font-medium transition-colors" href="/pricing">Điều khoản sử dụng</a>
                            </div>
                            <p className="text-slate-400 text-xs">© 2024 BusinessOS. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
