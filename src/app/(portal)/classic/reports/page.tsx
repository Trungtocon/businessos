"use client";

import { Button } from "@/components/ui/Button";

const stats = [
    { label: "Tổng Doanh thu", value: "1.25B ₫", icon: "payments", iconBg: "bg-green-100", iconColor: "text-green-600", trend: "+12%", trendLabel: "so với tháng trước" },
    { label: "Tổng Chi phí", value: "450M ₫", icon: "account_balance_wallet", iconBg: "bg-orange-100", iconColor: "text-orange-600", trend: "-5%", trendLabel: "chi phí tối ưu" },
    { label: "Lợi nhuận ròng", value: "800M ₫", icon: "savings", iconBg: "bg-blue-100", iconColor: "text-blue-600", trend: "+15%", trendLabel: "so với tháng trước" },
    { label: "Tăng trưởng", value: "12.5%", icon: "monitoring", iconBg: "bg-purple-100", iconColor: "text-purple-600", trend: "+2.1%", trendLabel: "vượt chỉ tiêu" },
];

const transactions = [
    { id: "#TRX-0932", date: "24 Oct, 2023", desc: "Thanh toán AWS Server", category: "Vận hành", catColor: "bg-gray-100", value: "- $2,400.00", status: "done" },
    { id: "#TRX-0931", date: "23 Oct, 2023", desc: "Thu phí dịch vụ Enterprise", category: "Doanh thu", catColor: "bg-blue-100", value: "+ $15,000.00", valueColor: "text-green-600", status: "done" },
    { id: "#TRX-0930", date: "23 Oct, 2023", desc: "Mua thiết bị văn phòng", category: "Cơ sở vật chất", catColor: "bg-gray-100", value: "- $850.00", status: "pending" },
    { id: "#TRX-0929", date: "22 Oct, 2023", desc: "Chi phí quảng cáo Google", category: "Marketing", catColor: "bg-purple-100", value: "- $3,200.00", status: "done" },
];

export default function ReportPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white lg:flex">
                <div className="flex h-16 items-center px-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-blue-500 font-bold text-xl">
                        <span className="material-symbols-outlined text-3xl">grid_view</span>
                        <span>BusinessOS</span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                    <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 hover:bg-gray-50" href="/dashboard"><span className="material-symbols-outlined">dashboard</span><span className="font-medium">Tổng quan</span></a>
                    <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 hover:bg-gray-50" href="/classic/finance"><span className="material-symbols-outlined">attach_money</span><span className="font-medium">Bán hàng</span></a>
                    <div className="pt-4 pb-2"><p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Phân tích</p></div>
                    <a className="flex items-center gap-3 rounded-lg bg-blue-500/10 px-3 py-2.5 text-blue-500" href="/classic/reports"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span><span className="font-semibold">Báo cáo</span></a>
                    <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 hover:bg-gray-50" href="/classic/finance"><span className="material-symbols-outlined">pie_chart</span><span className="font-medium">Ngân sách</span></a>
                </nav>
                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = '/settings'}>
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div className="flex flex-col"><span className="text-sm font-semibold">Quản trị viên</span><span className="text-xs text-slate-500">Gói Doanh nghiệp</span></div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex h-full flex-1 flex-col overflow-y-auto bg-gray-50">
                <div className="flex-1 px-4 py-8 sm:px-8 lg:px-10 max-w-[1400px] mx-auto w-full">
                    <nav className="flex mb-6"><ol className="flex items-center space-x-2 text-sm"><li><a className="text-slate-500 hover:text-blue-500" href="/dashboard">Trang chủ</a></li><li className="text-slate-400"><span className="material-symbols-outlined text-sm pt-1">chevron_right</span></li><li><a className="text-slate-500 hover:text-blue-500" href="/classic/reports">Báo cáo</a></li><li className="text-slate-400"><span className="material-symbols-outlined text-sm pt-1">chevron_right</span></li><li><span className="text-slate-900 font-medium">Tài chính</span></li></ol></nav>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div><h1 className="text-3xl font-bold tracking-tight text-slate-900">Báo cáo & Thống kê</h1><p className="mt-1 text-slate-500 text-sm">Tổng quan hiệu suất tài chính và phân tích.</p></div>
                        <div className="flex items-center gap-3">
                            <Button variant="secondary" className="flex items-center gap-2 px-4 py-2 shadow-sm" onClick={() => window.print()}><span className="material-symbols-outlined text-lg">print</span><span className="hidden sm:inline">In</span></Button>
                            <Button variant="primary" className="flex items-center gap-2 px-4 py-2 shadow-sm shadow-blue-500/30" onClick={() => alert('Xuất báo cáo')}><span className="material-symbols-outlined text-lg">download</span><span>Xuất dữ liệu</span></Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-8">
                        <div className="inline-flex rounded-lg bg-gray-200 p-1">
                            {["Tháng này", "Quý này", "Năm nay"].map((label, i) => (
                                <label key={label} className="cursor-pointer"><input className="peer sr-only" name="time_filter" type="radio" defaultChecked={i === 0} /><span className="block rounded-md px-4 py-1.5 text-sm font-medium text-slate-500 transition-all peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm">{label}</span></label>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div><p className="text-sm font-medium text-slate-500">{stat.label}</p><h3 className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</h3></div>
                                    <div className={`rounded-full ${stat.iconBg} p-2 ${stat.iconColor}`}><span className="material-symbols-outlined text-xl">{stat.icon}</span></div>
                                </div>
                                <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                                    <span className="material-symbols-outlined text-base">trending_up</span>
                                    <span className="font-medium">{stat.trend}</span>
                                    <span className="text-slate-500 ml-1 font-normal">{stat.trendLabel}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900">Biểu đồ biến động doanh thu</h3>
                                <button className="text-slate-500 hover:text-blue-500" onClick={() => alert('Tùy chọn biểu đồ')}><span className="material-symbols-outlined">more_horiz</span></button>
                            </div>
                            <div className="relative h-[300px] w-full flex items-end bg-gradient-to-t from-blue-50 to-transparent rounded-lg justify-center">
                                <div className="flex items-end gap-4 h-[250px] pb-8">
                                    {[180, 150, 200, 100, 120, 50, 80, 20, 60, 10].map((h, i) => (
                                        <div key={i} className="w-8 bg-blue-500 rounded-t-lg" style={{ height: `${h}px` }}></div>
                                    ))}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 px-4">
                                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => <span key={m}>{m}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-slate-900">Cơ cấu chi phí</h3>
                                <button className="text-slate-500 hover:text-blue-500" onClick={() => alert('Lọc chi phí')}><span className="material-symbols-outlined">filter_list</span></button>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[250px]">
                                <div className="relative w-48 h-48 rounded-full" style={{ background: 'conic-gradient(#3c83f6 0% 45%, #10b981 45% 70%, #f59e0b 70% 85%, #ef4444 85% 100%)' }}>
                                    <div className="absolute inset-8 rounded-full bg-white flex items-center justify-center flex-col">
                                        <span className="text-xs text-slate-500 font-medium">Tổng chi</span>
                                        <span className="text-lg font-bold text-slate-900">450M</span>
                                    </div>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                                    {[{ color: "bg-blue-500", label: "Nhân sự (45%)" }, { color: "bg-emerald-500", label: "Vận hành (25%)" }, { color: "bg-amber-500", label: "Marketing (15%)" }, { color: "bg-red-500", label: "Khác (15%)" }].map((item) => (
                                        <div key={item.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${item.color}`}></div><span className="text-xs text-slate-500">{item.label}</span></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">Chi tiết giao dịch gần đây</h3>
                            <a className="text-sm text-blue-500 font-medium hover:underline" href="/classic/finance">Xem tất cả</a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-slate-500 font-medium uppercase text-xs">
                                    <tr><th className="px-6 py-3">Mã GD</th><th className="px-6 py-3">Ngày</th><th className="px-6 py-3">Mô tả</th><th className="px-6 py-3">Danh mục</th><th className="px-6 py-3 text-right">Giá trị</th><th className="px-6 py-3 text-center">Trạng thái</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-slate-900">
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-blue-500">{tx.id}</td>
                                            <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                                            <td className="px-6 py-4">{tx.desc}</td>
                                            <td className="px-6 py-4"><span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tx.catColor} text-gray-800`}>{tx.category}</span></td>
                                            <td className={`px-6 py-4 text-right font-medium ${tx.valueColor || ""}`}>{tx.value}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === "done" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{tx.status === "done" ? "Hoàn thành" : "Chờ duyệt"}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
