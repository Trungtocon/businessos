"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function BankSettingsPage() {
    return (
        <div className="flex min-h-screen bg-white font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6 sticky top-0 h-screen">
                <div className="mb-10 px-2"><div className="h-8 w-32 bg-gray-100 rounded"></div></div>
                <nav className="space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-gray-50" href="/dashboard"><span className="material-symbols-outlined text-[20px]">dashboard</span>Trang chủ</a>
                    <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-500 bg-blue-50/50 rounded-lg" href="/settings"><span className="material-symbols-outlined text-[20px]">account_balance</span>Cài đặt ngân hàng</a>
                    <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-gray-50" href="/classic/profile"><span className="material-symbols-outlined text-[20px]">person</span>Hồ sơ cá nhân</a>
                    <a className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-gray-50" href="/freelancer/bank"><span className="material-symbols-outlined text-[20px]">payments</span>Thu nhập</a>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 bg-white">
                <div className="max-w-5xl mx-auto px-6 py-10">
                    {/* Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                                <span>BusinessOS</span><span className="material-symbols-outlined text-xs">chevron_right</span>
                                <span>Freelancer</span><span className="material-symbols-outlined text-xs">chevron_right</span>
                                <span className="text-slate-600">Cài đặt ngân hàng</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Cài đặt ngân hàng</h1>
                            <p className="text-slate-500 mt-1">Quản lý và liên kết các tài khoản thụ hưởng để nhận thanh toán.</p>
                        </div>
                        <Button variant="primary" className="flex items-center gap-2 px-5 py-2.5 font-semibold shadow-lg shadow-blue-500/20" onClick={() => alert('addThêm tài khoản mới')}><span className="material-symbols-outlined text-[20px]">add</span>Thêm tài khoản mới</Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Bank Accounts */}
                        <div className="lg:col-span-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-800">Tài khoản thụ hưởng</h2>
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Đã liên kết (02)</span>
                            </div>
                            <div className="space-y-4">
                                {/* Account 1 */}
                                <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm group relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 border border-gray-50 rounded-lg flex items-center justify-center p-2 bg-gray-50/30">
                                                <span className="material-symbols-outlined text-slate-300 text-3xl">account_balance</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-slate-900">MB BANK</h3>
                                                    <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Mặc định</span>
                                                </div>
                                                <p className="text-sm text-slate-500">Ngân hàng TMCP Quân đội</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-gray-50 rounded-full text-slate-600" onClick={() => {}}><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                            <button className="p-2 hover:bg-red-50 rounded-full text-red-500" onClick={() => {}}><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                        </div>
                                    </div>
                                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                                        <div><p className="text-[10px] text-slate-400 uppercase font-semibold">Tên chủ tài khoản</p><p className="text-sm font-bold text-slate-800">NGUYEN VAN A</p></div>
                                        <div><p className="text-[10px] text-slate-400 uppercase font-semibold">Số tài khoản</p><p className="text-sm font-bold text-slate-800">0123 4567 8999</p></div>
                                        <div className="col-span-2"><p className="text-[10px] text-slate-400 uppercase font-semibold">Chi nhánh</p><p className="text-sm text-slate-600">Chi nhánh Hà Nội</p></div>
                                    </div>
                                </div>

                                {/* Account 2 */}
                                <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm group relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 border border-gray-50 rounded-lg flex items-center justify-center p-2 bg-gray-50/30">
                                                <span className="material-symbols-outlined text-slate-300 text-3xl">account_balance</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 uppercase">Vietcombank</h3>
                                                <p className="text-sm text-slate-500">Ngân hàng Ngoại thương Việt Nam</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-gray-50 rounded-full text-slate-600" onClick={() => {}}><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                            <button className="p-2 hover:bg-red-50 rounded-full text-red-500" onClick={() => {}}><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                        </div>
                                    </div>
                                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                                        <div><p className="text-[10px] text-slate-400 uppercase font-semibold">Tên chủ tài khoản</p><p className="text-sm font-bold text-slate-800">NGUYEN VAN A</p></div>
                                        <div><p className="text-[10px] text-slate-400 uppercase font-semibold">Số tài khoản</p><p className="text-sm font-bold text-slate-800">9988 7766 5544</p></div>
                                        <div className="col-span-2"><p className="text-[10px] text-slate-400 uppercase font-semibold">Chi nhánh</p><p className="text-sm text-slate-600">Phòng giao dịch Quận 1, TP. Hồ Chí Minh</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add Bank Form */}
                        <div className="lg:col-span-4">
                            <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-blue-500">add_card</span>Liên kết ngân hàng</h2>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Ngân hàng</label>
                                        <select className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                                            <option value="">Chọn ngân hàng</option>
                                            <option>Vietcombank</option>
                                            <option>Techcombank</option>
                                            <option>MB Bank</option>
                                            <option>TPBank</option>
                                            <option>ACB</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Số tài khoản</label>
                                        <Input className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm" placeholder="Nhập số tài khoản" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="block text-xs font-bold text-slate-500 uppercase">Tên chủ tài khoản</label>
                                            <span className="text-[10px] text-slate-400 italic">Viết hoa không dấu</span>
                                        </div>
                                        <Input className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm font-bold uppercase" placeholder="NGUYEN VAN A" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Chi nhánh</label>
                                        <Input className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm" placeholder="Ví dụ: Chi nhánh Ba Đình" />
                                    </div>
                                    <div className="pt-2">
                                        <Button variant="primary" className="w-full py-3 font-bold shadow-md shadow-blue-500/10" type="submit" onClick={() => alert('Thêm mới')}>Thêm mới</Button>
                                    </div>
                                    <div className="flex items-start gap-2 pt-4 border-t border-gray-200/50">
                                        <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">shield</span>
                                        <p className="text-[11px] text-slate-400 leading-relaxed">Thông tin tài khoản của bạn được mã hóa và bảo vệ theo tiêu chuẩn bảo mật tài chính.</p>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-6 p-4 rounded-lg bg-blue-50/30 border border-blue-100/50">
                                <h4 className="text-xs font-bold text-blue-700 uppercase mb-2">Lưu ý</h4>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-[11px] text-blue-600/80"><span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>Họ tên chủ tài khoản phải khớp với thông tin định danh.</li>
                                    <li className="flex gap-2 text-[11px] text-blue-600/80"><span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>Giao dịch được xử lý từ 1-2 ngày làm việc.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
