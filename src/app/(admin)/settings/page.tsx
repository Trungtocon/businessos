"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col h-full shrink-0">
                <div className="p-4 flex flex-col gap-4 h-full">
                    {/* Branding */}
                    <div className="flex gap-3 items-center px-2">
                        <div className="bg-center bg-no-repeat bg-cover rounded-lg h-10 w-10 bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[24px]">grid_view</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 text-base font-bold leading-normal">BusinessOS</h1>
                            <p className="text-slate-500 text-xs font-normal leading-normal">Enterprise Admin</p>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 mt-4 flex-1">
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors group" href="/dashboard">
                            <span className="material-symbols-outlined text-[24px] group-hover:text-primary">pie_chart</span>
                            <p className="text-sm font-medium leading-normal">Tổng quan</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors group" href="/classic/team">
                            <span className="material-symbols-outlined text-[24px] group-hover:text-primary">group</span>
                            <p className="text-sm font-medium leading-normal">Khách hàng</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors group" href="/classic/marketplace">
                            <span className="material-symbols-outlined text-[24px] group-hover:text-primary">inventory_2</span>
                            <p className="text-sm font-medium leading-normal">Sản phẩm</p>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors group" href="/classic/reports">
                            <span className="material-symbols-outlined text-[24px] group-hover:text-primary">description</span>
                            <p className="text-sm font-medium leading-normal">Báo cáo</p>
                        </a>
                        {/* Active Item */}
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary" href="/settings">
                            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
                            <p className="text-sm font-bold leading-normal">Cài đặt</p>
                        </a>
                    </nav>
                    {/* User Quick Profile */}
                    <div className="mt-auto border-t border-slate-200 pt-4 px-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full h-9 w-9 border border-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGiWUDfbFQd9gf9LPLi6xbQ-C22Hc7C0XxPCgezKmddJ8r1rjjYHUaxcCTroyBHsb8STl-OcX8PdPR8ZmDXT0ObhG8eM8qgJnUHt0hUEVZeUTaMcPwGXhxYN2XxxDBWFIVj6Bktlfh4yKIstmRjFCghROZgiqA4Y7EIU9I3qkefcuhumpYcvIh74jQi6n46kKy0ipRsJUW-A6kHIQ2XMVZocvgDYMYSZnl84Uoa0vNFrFSRD0KbJktDYon6m3pQa_4KJ_2zOcCpB8")' }}></div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-sm font-medium text-slate-900 truncate">Nguyễn Văn A</p>
                                <p className="text-xs text-slate-500 truncate">nguyen.a@business.os</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
                {/* Top Navbar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 shrink-0 z-10">
                    <div className="flex items-center gap-4 text-slate-900 lg:hidden">
                        <button className="text-slate-500 hover:text-primary" onClick={() => alert('Menu')}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">Cài đặt chung</h2>
                    </div>
                    {/* Breadcrumbs */}
                    <div className="hidden lg:flex flex-wrap gap-2 text-sm">
                        <a className="text-slate-500 hover:text-primary transition-colors" href="/dashboard">Trang chủ</a>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-900 font-medium">Cài đặt chung</span>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 items-center">
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="size-10 rounded-full relative" onClick={() => window.location.href = '/notifications'}>
                                <span className="material-symbols-outlined text-[22px]">notifications</span>
                                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-10 rounded-full" onClick={() => alert('Trợ giúp')}>
                                <span className="material-symbols-outlined text-[22px]">help</span>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 xl:px-40">
                    <div className="flex flex-col max-w-[1000px] mx-auto flex-1 gap-8 pb-10">
                        {/* Page Heading */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-slate-900 tracking-tight text-3xl font-bold leading-tight">Cài đặt chung</h1>
                            <p className="text-slate-500 text-sm md:text-base font-normal">Quản lý thông tin tài khoản, giao diện và bảo mật hệ thống.</p>
                        </div>

                        {/* Card 1: Account Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 md:p-8 flex flex-col gap-8">
                                {/* Header with Avatar */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="relative group cursor-pointer" onClick={() => alert('Thay đổi ảnh đại diện')}>
                                            <div className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 border-4 border-slate-50 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBw-77hwlhQdFE_nOit7KYhtVbudFbJo_Cf_GFQkt_bwD0Ly1l7f47qXQnu9chlGSWrcrOEgnktIiq_2F-JZikKGbgzFyf-n0XSb_sGZ2-bgG9jLP55aA1X9YuDOSDY60GsldrlLLV3DXae1gZOVK5gSOjP9Stv5Bo5iO6vDQAQuYHCYabvDeMlLZdJI0f2SorJu_LHEKAzzNXQ5ida68mcB2SuVs48uCusAz0_KYlPPj_5ry1rfUjDc88PVgOApoIdo2UMyK_pxBI")' }}></div>
                                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-white">camera_alt</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-slate-900 text-xl font-bold">Nguyễn Văn A</h3>
                                            <p className="text-primary font-medium text-sm mt-1">Super Admin</p>
                                            <p className="text-slate-500 text-xs mt-1">ID: #8493021</p>
                                        </div>
                                    </div>
                                    <Button variant="secondary" onClick={() => alert('Chọn ảnh mới')}>Thay đổi ảnh</Button>
                                </div>
                                <hr className="border-slate-100" />
                                {/* Form Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-700">Tên hiển thị</label>
                                        <Input className="w-full h-10" type="text" defaultValue="Nguyễn Văn A" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-700">Email</label>
                                        <Input className="w-full h-10" type="email" defaultValue="nguyen.a@business.os" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-700">Số điện thoại</label>
                                        <Input className="w-full h-10" type="tel" defaultValue="+84 901 234 567" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-slate-700">Chức vụ <span className="text-slate-400 font-normal ml-1">(Không thể sửa)</span></label>
                                        <Input className="w-full h-10 bg-slate-100 text-slate-500 cursor-not-allowed" disabled type="text" defaultValue="Quản trị viên cấp cao" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Interface Preferences */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">palette</span>
                                <h3 className="text-base font-bold text-slate-900">Tùy chỉnh giao diện</h3>
                            </div>
                            <div className="p-6 md:p-8 flex flex-col gap-8">
                                {/* Language */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-slate-900">Ngôn ngữ</p>
                                        <p className="text-xs text-slate-500">Chọn ngôn ngữ hiển thị cho hệ thống.</p>
                                    </div>
                                    <div className="w-full md:w-64">
                                        <div className="relative">
                                            <select className="w-full h-10 pl-3 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-sm cursor-pointer">
                                                <option value="vi" defaultChecked>Tiếng Việt</option>
                                                <option value="en">English</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-slate-100" />
                                {/* Theme Mode */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-slate-900">Chế độ hiển thị</p>
                                        <p className="text-xs text-slate-500">Chọn giao diện sáng hoặc tối để phù hợp với môi trường làm việc.</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <label className="cursor-pointer group">
                                            <input defaultChecked className="peer sr-only" name="theme" type="radio" />
                                            <div className="flex flex-col gap-3">
                                                <div className="aspect-video rounded-lg border-2 border-slate-200 bg-slate-100 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 transition-all overflow-hidden relative">
                                                    <div className="absolute inset-y-2 left-2 w-1/4 bg-white rounded shadow-sm"></div>
                                                    <div className="absolute inset-y-2 right-2 w-2/3 flex flex-col gap-2">
                                                        <div className="h-2 w-full bg-white rounded"></div>
                                                        <div className="h-16 w-full bg-white rounded shadow-sm"></div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors text-center">Giao diện Sáng</span>
                                            </div>
                                        </label>
                                        <label className="cursor-pointer group">
                                            <input className="peer sr-only" name="theme" type="radio" />
                                            <div className="flex flex-col gap-3">
                                                <div className="aspect-video rounded-lg border-2 border-slate-200 bg-slate-800 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 transition-all overflow-hidden relative">
                                                    <div className="absolute inset-y-2 left-2 w-1/4 bg-slate-700 rounded shadow-sm border border-slate-600"></div>
                                                    <div className="absolute inset-y-2 right-2 w-2/3 flex flex-col gap-2">
                                                        <div className="h-2 w-full bg-slate-700 rounded"></div>
                                                        <div className="h-16 w-full bg-slate-700 rounded shadow-sm border border-slate-600"></div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors text-center">Giao diện Tối</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Security */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">shield_lock</span>
                                <h3 className="text-base font-bold text-slate-900">Bảo mật</h3>
                            </div>
                            <div className="p-6 md:p-8 flex flex-col gap-6">
                                {/* 2FA */}
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-slate-900">Xác thực 2 yếu tố (2FA)</p>
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">Đang bật</span>
                                        </div>
                                        <p className="text-xs text-slate-500 max-w-lg">Bảo vệ tài khoản của bạn bằng cách yêu cầu mã xác nhận khi đăng nhập từ thiết bị lạ.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <hr className="border-slate-100" />
                                {/* Password */}
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-slate-900">Mật khẩu</p>
                                        <p className="text-xs text-slate-500">Thay đổi mật khẩu định kỳ để tăng cường bảo mật.</p>
                                    </div>
                                    <Button variant="secondary" onClick={() => alert('Mở form đổi mật khẩu')}>
                                        <span className="material-symbols-outlined text-[18px]">key</span>
                                        Đổi mật khẩu
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="flex justify-end pt-4 gap-4">
                            <Button variant="ghost" onClick={() => alert('Hủy bỏ thay đổi')}>Hủy bỏ</Button>
                            <Button variant="primary" onClick={() => alert('Đã lưu thiết lập thành công!')}>
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                Lưu thiết lập
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
