"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SmartBriefingPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 text-slate-900 font-sans">
            {/* TopNavBar */}
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-10 py-3">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-slate-900">
                        <div className="size-8 flex items-center justify-center bg-blue-500/10 rounded-lg text-blue-500">
                            <span className="material-symbols-outlined text-[24px]">grid_view</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">BusinessOS</h2>
                    </div>
                    <div className="hidden lg:flex items-center gap-9">
                        <a className="text-slate-900 text-sm font-medium leading-normal hover:text-blue-500 transition-colors" href="/dashboard">Tổng quan</a>
                        <a className="text-blue-500 text-sm font-medium leading-normal" href="/classic/projects">Dự án</a>
                        <a className="text-slate-900 text-sm font-medium leading-normal hover:text-blue-500 transition-colors" href="/classic/reports">Báo cáo</a>
                        <a className="text-slate-900 text-sm font-medium leading-normal hover:text-blue-500 transition-colors" href="/settings">Cài đặt</a>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                            <div className="text-slate-400 flex bg-slate-50 items-center justify-center pl-3">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <Input className="w-full min-w-0 flex-1 border-none bg-slate-50 h-full placeholder:text-slate-400 px-3 pl-2 text-sm" placeholder="Tìm kiếm..." />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="size-10 rounded-full hover:bg-gray-100 text-slate-400" onClick={() => alert('notifications')}>
                            <span className="material-symbols-outlined text-[24px]">notifications</span>
                        </Button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7Uc5-qsGac2ZrXDA24FlF9s792hgQf1q7ogKHHn5vSb8IE49YaxgW3CK3AGsCj3fDKEBP3swMDklzw-PGOfSRnyebbFUCYbLHye7ynnZkK9S_VxFresC-dmVIQwK4LuCEROdGPGhThg2zBDdCDueTX_7o0qHIClyp4CYY3dDpGJQt5hSD4tzYlLwGy_BbF__ISL_lO8-f1H8ijSq7jpxpSeDWScv5vEmEZedQKHx-CTRyIHylhqBvgBVi3KkRSyE3paiDmEh_psc")' }} onClick={() => { }}></div>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
                <div className="flex flex-col max-w-[960px] flex-1 gap-6">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 px-1">
                        <a className="text-slate-400 text-sm font-medium leading-normal hover:underline" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('BusinessOS'); }}>BusinessOS</a>
                        <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
                        <a className="text-slate-400 text-sm font-medium leading-normal hover:underline" href="/classic/projects">Dự án</a>
                        <span className="text-slate-400 text-sm font-medium leading-normal">/</span>
                        <span className="text-slate-900 text-sm font-medium leading-normal">Smart Briefing</span>
                    </div>

                    {/* PageHeading */}
                    <div className="flex flex-wrap justify-between items-end gap-4 px-1">
                        <div className="flex min-w-72 flex-col gap-2">
                            <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">C07. Smart Briefing</h1>
                            <p className="text-slate-400 text-base font-normal leading-normal">Thiết lập yêu cầu dự án nhanh chóng với sự hỗ trợ của AI</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex items-center justify-center rounded-lg h-10 px-4 border border-slate-200 text-slate-400 hover:bg-gray-50 text-sm font-medium shadow-sm" onClick={() => alert('help')}>
                                <span className="material-symbols-outlined text-[20px] mr-2">help</span>
                                <span className="truncate">Hướng dẫn</span>
                            </Button>
                        </div>
                    </div>

                    {/* ToolBar */}
                    <div className="sticky top-[73px] z-40 -mx-4 md:-mx-10 lg:-mx-40 px-4 md:px-10 lg:px-40 bg-slate-50/95 backdrop-blur-sm py-2 border-b border-transparent transition-all">
                        <div className="max-w-[960px] mx-auto flex justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 px-2">
                                <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
                                    <span className="material-symbols-outlined text-blue-500">pending_actions</span>
                                    <span>Trạng thái: <span className="text-orange-500">Đang soạn thảo</span></span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="primary" className="group flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-white gap-2 text-sm font-bold leading-normal px-5" onClick={() => alert('auto_awesome')}>
                                    <span className="material-symbols-outlined text-[20px] group-hover:animate-pulse">auto_awesome</span>
                                    <span className="truncate">AI Auto-fill</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* ProgressBar */}
                    <div className="flex flex-col gap-2 px-1">
                        <div className="flex gap-6 justify-between items-end">
                            <p className="text-slate-400 text-sm font-semibold leading-normal uppercase tracking-wider">Tiến độ hoàn thành</p>
                            <p className="text-blue-500 text-sm font-bold leading-normal">30%</p>
                        </div>
                        <div className="rounded-full bg-slate-200 h-2 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: '30%' }}></div>
                        </div>
                    </div>

                    {/* Main Form Content */}
                    <div className="flex flex-col gap-6">
                        {/* Card 1: Thông tin chung */}
                        <section className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow duration-200">
                            <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500/10 text-blue-500 rounded-full p-1.5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">info</span>
                                    </div>
                                    <h3 className="text-slate-900 text-lg font-bold">1. Thông tin chung</h3>
                                </div>
                                <span className="material-symbols-outlined text-green-500" title="Đã hoàn thành">check_circle</span>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-slate-900 text-sm font-medium">Tên dự án <span className="text-red-500">*</span></label>
                                    <Input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm placeholder:text-slate-400" placeholder="Nhập tên dự án (VD: Website E-commerce 2024)" defaultValue="Rebrand thương hiệu DAFC" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-900 text-sm font-medium">Loại hình dự án</label>
                                    <div className="relative">
                                        <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none">
                                            <option>Thiết kế Website</option>
                                            <option>Phát triển Ứng dụng</option>
                                            <option selected>Thương hiệu &amp; Nhận diện</option>
                                            <option>Chiến dịch Marketing</option>
                                            <option>Khác</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-900 text-sm font-medium">Ngân sách dự kiến</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                            <span className="text-sm font-bold">VND</span>
                                        </div>
                                        <Input className="w-full rounded-lg border border-slate-300 bg-white pl-12 pr-3 py-2.5 text-sm placeholder:text-slate-400" placeholder="0" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Card 2: Mục tiêu & Phạm vi */}
                        <section className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow duration-200">
                            <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500/10 text-blue-500 rounded-full p-1.5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">target</span>
                                    </div>
                                    <h3 className="text-slate-900 text-lg font-bold">2. Mục tiêu &amp; Phạm vi</h3>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <label className="text-slate-900 text-sm font-medium">Mô tả chi tiết yêu cầu</label>
                                        <button className="text-blue-500 text-xs font-medium hover:underline flex items-center gap-1" onClick={() => { }}>
                                            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                                            Gợi ý nội dung
                                        </button>
                                    </div>
                                    <textarea className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y" placeholder="Mô tả mục tiêu chính, vấn đề cần giải quyết, và các yêu cầu cụ thể..." rows={4}></textarea>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-slate-900 text-sm font-medium">Nền tảng triển khai</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[
                                            { icon: 'desktop_windows', label: 'Máy tính', checked: true },
                                            { icon: 'smartphone', label: 'Ứng dụng di động' },
                                            { icon: 'tablet_mac', label: 'Tablet' },
                                            { icon: 'watch', label: 'Thiết bị đeo' }
                                        ].map((platform, i) => (
                                            <label key={i} className="cursor-pointer relative">
                                                <input type="checkbox" className="peer sr-only" defaultChecked={platform.checked} />
                                                <div className="rounded-lg border border-slate-300 bg-white p-3 hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-500/5 peer-checked:text-blue-500 transition-all flex flex-col items-center gap-2 text-center">
                                                    <span className="material-symbols-outlined">{platform.icon}</span>
                                                    <span className="text-sm font-medium">{platform.label}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Card 3: Tài liệu đính kèm */}
                        <section className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow duration-200">
                            <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500/10 text-blue-500 rounded-full p-1.5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">attachment</span>
                                    </div>
                                    <h3 className="text-slate-900 text-lg font-bold">3. Tài liệu đính kèm</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-500/5 hover:border-blue-500 transition-all" htmlFor="file-upload">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                                            <span className="material-symbols-outlined text-blue-500 text-[32px]">cloud_upload</span>
                                        </div>
                                        <p className="mb-2 text-sm text-slate-900 font-medium">Kéo thả file vào đây hoặc <span className="text-blue-500 font-bold">chọn file</span></p>
                                        <p className="text-xs text-slate-400">Hỗ trợ: PDF, DOCX, JPG, PNG (Max 25MB)</p>
                                    </div>
                                    <input className="hidden" id="file-upload" type="file" />
                                </label>
                                {/* Uploaded List */}
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-900">brand_guidelines_2024.pdf</span>
                                                <span className="text-xs text-slate-400">2.4 MB</span>
                                            </div>
                                        </div>
                                        <button className="text-slate-400 hover:text-red-500 transition-colors" onClick={() => { }}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end items-center gap-4 py-6 mt-4 border-t border-slate-200">
                        <Button variant="secondary" className="px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-bold hover:bg-gray-50" onClick={() => alert('Lưu nháp')}>
                            Lưu nháp
                        </Button>
                        <Button variant="primary" className="px-8 py-2.5 rounded-lg shadow-lg shadow-blue-500/30 text-sm font-bold flex items-center gap-2" onClick={() => alert('Gửi yêu cầu')}>
                            <span>Gửi yêu cầu</span>
                            <span className="material-symbols-outlined text-[18px]">send</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
