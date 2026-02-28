"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const transactions = [
    { date: "01 Th10 2023", project: "Thiết kế Logo Thương hiệu", client: "TechFlow Inc.", method: "Chuyển khoản liên ngân hàng", amount: "+$500.00", amountColor: "text-slate-900", status: "Đã về ví", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { date: "28 Th09 2023", project: "Tư vấn Chiến lược UX", client: "OmniGroup Ltd.", method: "Ví điện tử PayPal", amount: "+$1,200.00", amountColor: "text-slate-900", status: "Đang treo", statusColor: "bg-amber-50 text-amber-600 border-amber-100" },
    { date: "15 Th09 2023", project: "Yêu cầu rút tiền mặt", client: "Rút về Techcombank", method: "Thẻ ghi nợ •••• 4289", amount: "-$2,000.00", amountColor: "text-red-500", status: "Đã hoàn tất", statusColor: "bg-slate-100 text-slate-500" },
    { date: "10 Th09 2023", project: "Gói thiết kế UI Ứng dụng", client: "StartUp Labs", method: "Thanh toán Stripe", amount: "+$3,500.00", amountColor: "text-slate-900", status: "Đã về ví", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
];

const chartData = [35, 45, 30, 65, 55, 48, 80, 70, 50, 60, 85, 20];
const chartLabels = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "Dự kiến"];

export default function WalletPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen w-full bg-white text-slate-900 antialiased overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="flex w-72 flex-col bg-white border-r border-gray-200 shrink-0 h-full overflow-y-auto">
                <div className="flex h-full flex-col justify-between p-6">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 px-2">
                            <div className="size-12 rounded-full bg-slate-200 ring-2 ring-slate-100"></div>
                            <div className="flex flex-col"><h1 className="text-slate-900 text-base font-bold leading-tight">Alex Sterling</h1><p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Freelancer Cấp 2</p></div>
                        </div>
                        <nav className="flex flex-col gap-1.5">
                            <a className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50" href="/freelancer"><span className="material-symbols-outlined text-[22px]">dashboard</span><span className="text-sm font-semibold">Tổng quan</span></a>
                            <a className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50" href="/freelancer/workspace"><span className="material-symbols-outlined text-[22px]">folder_open</span><span className="text-sm font-semibold">Dự án</span></a>
                            <a className="group flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-500" href="/freelancer/wallet"><span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span><span className="text-sm font-bold">Ví thu nhập</span></a>
                            <a className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50" href="/chat"><span className="material-symbols-outlined text-[22px]">chat_bubble_outline</span><span className="text-sm font-semibold">Tin nhắn</span><span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">3</span></a>
                            <a className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50" href="/settings"><span className="material-symbols-outlined text-[22px]">settings</span><span className="text-sm font-semibold">Cài đặt</span></a>
                            <a className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50" href="/chat"><span className="material-symbols-outlined text-[22px]">help_outline</span><span className="text-sm font-semibold">Hỗ trợ</span></a>
                        </nav>
                    </div>
                    <button className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => router.push('/splash')}><span className="material-symbols-outlined text-[20px]">logout</span><span className="text-sm font-semibold">Đăng xuất</span></button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-full p-8 lg:p-12 bg-white">
                <div className="mx-auto max-w-5xl flex flex-col gap-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-1.5"><h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ví thu nhập</h1><p className="text-slate-500 text-sm">Quản lý dòng tiền và yêu cầu thanh toán của bạn</p></div>
                        <Button variant="primary" className="flex items-center gap-2 px-6 py-3 font-bold text-sm shadow-lg shadow-blue-500/20" onClick={() => alert('paymentsYêu cầu rút tiền')}><span className="material-symbols-outlined text-[20px]">payments</span>Yêu cầu rút tiền</Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Số dư khả dụng</span><span className="material-symbols-outlined text-blue-500 text-xl">account_balance_wallet</span></div>
                            <div className="flex items-baseline gap-2"><span className="text-3xl font-extrabold text-slate-900">$1,250.00</span><span className="text-slate-400 text-xs font-semibold uppercase">USD</span></div>
                            <div className="flex items-center gap-1.5 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span className="text-xs font-medium text-slate-500">Sẵn sàng để rút</span></div>
                        </div>
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Đang treo</span><span className="material-symbols-outlined text-amber-500 text-xl">hourglass_empty</span></div>
                            <div className="flex items-baseline gap-2"><span className="text-3xl font-extrabold text-slate-900">$840.00</span><span className="text-slate-400 text-xs font-semibold uppercase">USD</span></div>
                            <div className="flex items-center gap-1.5 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span><span className="text-xs font-medium text-slate-500">Dự kiến về trong 7 ngày</span></div>
                        </div>
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tổng thu nhập</span><span className="material-symbols-outlined text-emerald-500 text-xl">trending_up</span></div>
                            <div className="flex items-baseline gap-2"><span className="text-3xl font-extrabold text-slate-900">$15,400.00</span><span className="text-slate-400 text-xs font-semibold uppercase">USD</span></div>
                            <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full self-start">+12% so với tháng trước</div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
                            <div><h3 className="text-lg font-bold text-slate-900">Biểu đồ tăng trưởng</h3><p className="text-slate-500 text-sm">Thống kê thu nhập 12 tháng gần nhất</p></div>
                            <div className="flex gap-2">
                                <select className="bg-white border border-gray-200 text-slate-700 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 py-1.5 pl-3 pr-8 cursor-pointer shadow-sm"><option>Năm 2023</option><option>Năm 2022</option></select>
                            </div>
                        </div>
                        <div className="w-full h-72 flex items-end justify-between gap-3 px-2">
                            {chartData.map((h, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 flex-1 group cursor-pointer h-full justify-end" onClick={() => { }}>
                                    <div className="w-full bg-slate-50 rounded-t-md relative h-full flex items-end overflow-hidden">
                                        <div className="w-full bg-blue-500/20 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className={`w-full ${i === chartData.length - 1 ? "bg-blue-500/30" : "bg-blue-500"} rounded-t-sm transition-all duration-500`} style={{ height: `${h}%` }}></div>
                                    </div>
                                    <span className={`text-slate-400 text-[10px] font-bold ${i === 6 ? "text-blue-500" : ""} ${i === chartData.length - 1 ? "italic" : ""}`}>{chartLabels[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 px-1">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">Lịch sử nhận tiền</h3>
                            <button className="text-blue-500 text-xs font-bold hover:underline" onClick={() => alert('Sao kê sẽ được tải xuống khi kết nối API.')}>Tải bảng sao kê (.csv)</button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-gray-50 text-[11px] uppercase font-bold tracking-wider text-slate-500 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4">Ngày</th>
                                            <th className="px-6 py-4">Dự án / Nguồn</th>
                                            <th className="px-6 py-4">Phương thức</th>
                                            <th className="px-6 py-4 text-right">Số tiền</th>
                                            <th className="px-6 py-4 text-center">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {transactions.map((tx, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-5 font-medium text-slate-900 whitespace-nowrap">{tx.date}</td>
                                                <td className="px-6 py-5"><div className="flex flex-col"><span className="text-slate-900 font-semibold">{tx.project}</span><span className="text-xs text-slate-400">{tx.client}</span></div></td>
                                                <td className="px-6 py-5 text-xs">{tx.method}</td>
                                                <td className={`px-6 py-5 text-right font-bold ${tx.amountColor}`}>{tx.amount}</td>
                                                <td className="px-6 py-5 text-center"><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${tx.statusColor}`}>{tx.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 bg-white flex justify-center border-t border-gray-200">
                                <button className="text-slate-500 hover:text-blue-500 text-xs font-bold flex items-center gap-1" onClick={() => { }}>Xem thêm lịch sử giao dịch<span className="material-symbols-outlined text-sm">expand_more</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
