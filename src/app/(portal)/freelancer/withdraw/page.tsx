"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function WithdrawPage() {
    return (
        <div className="bg-gray-50 text-slate-900 antialiased min-h-screen flex flex-col overflow-hidden font-sans">
            {/* Top Nav */}
            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shrink-0 z-20">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-slate-900">
                        <div className="size-8 flex items-center justify-center bg-blue-500 rounded-lg text-white"><span className="material-symbols-outlined text-xl">dataset</span></div>
                        <h2 className="text-lg font-bold tracking-tight">BusinessOS</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <a className="text-slate-500 hover:text-blue-500 text-sm font-medium" href="/freelancer">Tổng quan</a>
                        <a className="text-blue-500 text-sm font-bold" href="/freelancer/wallet">Ví tiền</a>
                    </nav>
                </div>
                <div className="flex gap-6 items-center">
                    <button className="text-slate-500 hover:text-blue-500" onClick={() => { }}><span className="material-symbols-outlined">notifications</span></button>
                    <div className="size-9 rounded-full bg-slate-200 ring-2 ring-white cursor-pointer" onClick={() => { }}></div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden lg:flex w-[280px] flex-col border-r border-gray-200 bg-white shrink-0 overflow-y-auto">
                    <div className="flex flex-col justify-between p-4 h-full">
                        <div className="flex flex-col gap-6">
                            <div className="px-2"><h1 className="text-slate-900 text-base font-semibold">Cổng Freelancer</h1><p className="text-slate-500 text-xs mt-1">Quản lý thu nhập</p></div>
                            <nav className="flex flex-col gap-1">
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-gray-100" href="/freelancer"><span className="material-symbols-outlined text-[22px]">dashboard</span><span className="text-sm font-medium">Tổng quan</span></a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-500/10 text-blue-500" href="/freelancer/wallet"><span className="material-symbols-outlined text-[22px]">account_balance_wallet</span><span className="text-sm font-medium">Ví tiền</span></a>
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-gray-100" href="/settings"><span className="material-symbols-outlined text-[22px]">settings</span><span className="text-sm font-medium">Cài đặt</span></a>
                            </nav>
                        </div>
                        <button className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-500" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">logout</span><span className="text-sm font-medium">Đăng xuất</span></button>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-8 md:py-12">
                        {/* Heading */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-sm"><a className="text-slate-500 hover:underline" href="/freelancer/wallet">Ví tiền</a><span className="text-slate-500">/</span><span className="text-blue-500 font-medium">Rút tiền</span></div>
                                <h1 className="text-3xl font-bold tracking-tight">Yêu cầu rút tiền</h1>
                                <p className="text-slate-500 text-sm mt-2 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>Số dư khả dụng: <span className="font-semibold text-slate-900">15,000,000 VND</span></p>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                {/* Left: Inputs */}
                                <div className="lg:col-span-7 flex flex-col gap-6">
                                    <div>
                                        <label className="block text-slate-900 text-sm font-semibold mb-2">Số tiền muốn rút</label>
                                        <div className="relative flex items-center">
                                            <div className="absolute left-4 text-slate-500 pointer-events-none"><span className="material-symbols-outlined text-[20px]">payments</span></div>
                                            <Input className="w-full pl-11 pr-20 py-3.5 rounded-lg border-gray-200 bg-gray-50/50" placeholder="Nhập số tiền..." defaultValue="5,000,000" />
                                            <div className="absolute right-3 flex items-center gap-2"><span className="text-sm font-medium text-slate-500">VND</span><button className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded" onClick={() => { }}>TỐI ĐA</button></div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">Hạn mức rút tối thiểu: 200,000 VND</p>
                                    </div>
                                    <div>
                                        <label className="block text-slate-900 text-sm font-semibold mb-2">Tài khoản nhận tiền</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"><span className="material-symbols-outlined text-[20px]">account_balance</span></div>
                                            <select className="w-full pl-11 pr-10 py-3.5 rounded-lg border-gray-200 bg-gray-50/50 text-slate-900 appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20">
                                                <option>Vietcombank - **** 4829 (Mặc định)</option>
                                                <option>Techcombank - **** 9921</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"><span className="material-symbols-outlined">expand_more</span></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-slate-900 text-sm font-semibold mb-2">Ghi chú <span className="text-slate-500 font-normal">(Tuỳ chọn)</span></label>
                                        <textarea className="w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50/50 text-sm resize-none" placeholder="Ví dụ: Rút tiền dự án..." rows={2}></textarea>
                                    </div>
                                </div>

                                {/* Right: Summary */}
                                <div className="lg:col-span-5">
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-full flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold mb-4">Chi tiết giao dịch</h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between text-sm"><span className="text-slate-500">Số tiền rút</span><span className="font-medium font-mono">5,000,000 VND</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-slate-500">Phí giao dịch</span><span className="font-medium font-mono">11,000 VND</span></div>
                                                <div className="w-full border-t border-dashed border-gray-300 my-4"></div>
                                                <div className="flex justify-between items-end"><span className="font-semibold text-base">Thực nhận</span><span className="text-blue-500 text-xl font-bold font-mono">4,989,000 VND</span></div>
                                                <div className="bg-blue-50 rounded-lg p-3 mt-2 flex gap-3 items-start">
                                                    <span className="material-symbols-outlined text-blue-500 text-[20px] shrink-0">verified_user</span>
                                                    <p className="text-xs text-slate-500">Giao dịch được bảo vệ. Thời gian xử lý: <span className="font-semibold text-slate-900">24h</span> làm việc.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex flex-col gap-3">
                                            <Button variant="primary" className="w-full py-3.5 font-semibold flex justify-center items-center gap-2" onClick={() => alert('Gửi yêu cầuarrow_forward')}><span>Gửi yêu cầu</span><span className="material-symbols-outlined text-[20px]">arrow_forward</span></Button>
                                            <Button variant="secondary" className="w-full py-3.5 border border-gray-200 text-slate-500 font-semibold" onClick={() => alert('Hủy bỏ')}>Hủy bỏ</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-500">Cần hỗ trợ? <a className="text-blue-500 hover:underline font-medium" href="/chat">Trung tâm trợ giúp</a> | <span className="font-medium text-slate-900">1900-1234</span></p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
