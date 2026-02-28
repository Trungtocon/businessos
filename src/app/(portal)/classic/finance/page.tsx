"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const transactions = [
    { date: "15/10/2023 10:30", content: "Thanh toán Server AWS - Tháng 10", amount: "- 5,000,000 VND", type: "expense", icon: "dns", iconBg: "bg-orange-100", iconColor: "text-orange-600", status: "done" },
    { date: "12/10/2023 09:15", content: "Nạp tiền từ Vietcombank", amount: "+ 200,000,000 VND", type: "income", icon: "account_balance", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", status: "done" },
    { date: "10/10/2023 14:20", content: "Thanh toán lương tháng 9", amount: "- 154,300,000 VND", type: "expense", icon: "payments", iconBg: "bg-purple-100", iconColor: "text-purple-600", status: "done" },
    { date: "08/10/2023 11:00", content: "Gia hạn gói Zoom Pro", amount: "- 3,500,000 VND", type: "expense", icon: "subscriptions", iconBg: "bg-blue-100", iconColor: "text-blue-600", status: "pending" },
    { date: "05/10/2023 08:45", content: "Hoàn tiền từ đối tác ABC", amount: "+ 12,000,000 VND", type: "income", icon: "account_balance", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", status: "done" },
];

export default function FinancePage() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col h-full overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="size-10 rounded-lg bg-blue-500 flex items-center justify-center text-white"><span className="material-symbols-outlined">grid_view</span></div>
                        <div>
                            <h1 className="text-base font-bold text-slate-900">BusinessOS</h1>
                            <p className="text-xs text-slate-500">Phiên bản Doanh nghiệp</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-1">
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100" href="/dashboard"><span className="material-symbols-outlined text-slate-500">dashboard</span><span className="text-sm font-medium">Tổng quan</span></a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-500/10 text-blue-600" href="/classic/finance"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span><span className="text-sm font-medium">Tài chính</span></a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100" href="/classic/team"><span className="material-symbols-outlined text-slate-500">group</span><span className="text-sm font-medium">Nhân sự</span></a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100" href="/classic/projects"><span className="material-symbols-outlined text-slate-500">folder_open</span><span className="text-sm font-medium">Dự án</span></a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100" href="/classic/reports"><span className="material-symbols-outlined text-slate-500">bar_chart</span><span className="text-sm font-medium">Báo cáo</span></a>
                    </nav>
                </div>
                <div className="mt-auto p-6 border-t border-slate-200">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center"><span className="material-symbols-outlined text-slate-500 text-[20px]">person</span></div>
                        <div className="overflow-hidden"><p className="text-sm font-medium text-slate-900 truncate">Quản trị viên</p><p className="text-xs text-slate-500 truncate">admin@company.com</p></div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    <div className="space-y-4">
                        <nav className="flex items-center gap-2 text-sm">
                            <a className="text-slate-500 hover:text-blue-600" href="/dashboard">Trang chủ</a>
                            <span className="text-slate-400">/</span>
                            <a className="text-slate-500 hover:text-blue-600" href="/classic/finance">Tài chính</a>
                            <span className="text-slate-400">/</span>
                            <span className="text-blue-600 font-medium">Ví doanh nghiệp</span>
                        </nav>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Ví tài chính</h2>
                            <p className="mt-2 text-slate-600">Quản lý dòng tiền và theo dõi số dư doanh nghiệp của bạn.</p>
                        </div>
                    </div>

                    {/* Balance Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-8 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="p-1.5 rounded-md bg-blue-50 text-blue-600"><span className="material-symbols-outlined text-[20px]">account_balance_wallet</span></span>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tổng số dư khả dụng</h3>
                                </div>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-blue-600 tracking-tight">2,450,000,000</span>
                                    <span className="text-2xl font-medium text-slate-400">VND</span>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-sm">
                                    <span className="inline-flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                                        <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>+12.5%
                                    </span>
                                    <span className="text-slate-500">so với tháng trước</span>
                                </div>
                            </div>
                            <div className="mt-8 relative z-10 flex flex-wrap gap-3">
                                <Button variant="primary" className="flex-1 sm:flex-none px-6 py-3 shadow-sm min-w-[140px]" onClick={() => alert('Chức năng nạp tiền đang được phát triển')}><span className="material-symbols-outlined mr-2 text-[20px]">add</span>Nạp tiền</Button>
                                <Button variant="secondary" className="flex-1 sm:flex-none px-6 py-3 min-w-[160px]" onClick={() => alert('Xem lịch sử giao dịch')}><span className="material-symbols-outlined mr-2 text-[20px]">history</span>Lịch sử giao dịch</Button>
                            </div>
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col justify-center h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-medium text-slate-500">Thu nhập tháng này</h4>
                                    <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 p-1.5 rounded-md text-[20px]">arrow_downward</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">320,000,000 <span className="text-sm font-normal text-slate-400">VND</span></p>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '70%' }}></div></div>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col justify-center h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-medium text-slate-500">Chi tiêu tháng này</h4>
                                    <span className="material-symbols-outlined text-rose-500 bg-rose-50 p-1.5 rounded-md text-[20px]">arrow_upward</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">145,500,000 <span className="text-sm font-normal text-slate-400">VND</span></p>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4"><div className="bg-rose-500 h-1.5 rounded-full" style={{ width: '45%' }}></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-slate-900">Giao dịch gần đây</h3>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">search</span>
                                    <Input className="pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Tìm kiếm giao dịch..." />
                                </div>
                                <Button variant="secondary" className="px-3 py-2" onClick={() => alert('Lọc giao dịch')}><span className="material-symbols-outlined text-[20px] mr-1">filter_list</span>Lọc</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ngày giao dịch</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nội dung</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Số tiền</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {transactions.map((tx, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-slate-400">calendar_today</span>{tx.date}</div></td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900"><div className="flex items-center gap-3"><div className={`size-8 rounded-full ${tx.iconBg} flex items-center justify-center`}><span className={`material-symbols-outlined ${tx.iconColor} text-[18px]`}>{tx.icon}</span></div><span>{tx.content}</span></div></td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${tx.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>{tx.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === "done" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>{tx.status === "done" ? "Hoàn thành" : "Đang xử lý"}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button className="text-slate-400 hover:text-blue-600" onClick={() => alert('Chi tiết giao dịch')}><span className="material-symbols-outlined">more_vert</span></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                            <div className="text-sm text-slate-500">Hiển thị <span className="font-medium text-slate-900">1</span> đến <span className="font-medium text-slate-900">5</span> trong số <span className="font-medium text-slate-900">48</span> kết quả</div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm disabled:opacity-50" disabled>Trước</button>
                                <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50" onClick={() => { }}>Sau</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
