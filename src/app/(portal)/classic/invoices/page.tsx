"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const invoices = [
    { id: "INV-2023-089", project: "Triển khai CRM Phase 2", client: "Công ty TNHH ABC Tech", date: "20/10/2023", amount: "50.000.000", status: "issued" },
    { id: "INV-2023-090", project: "Bảo trì hệ thống Q4", client: "Tập đoàn Logistics XYZ", date: "22/10/2023", amount: "15.000.000", status: "pending" },
    { id: "INV-2023-088", project: "Tư vấn giải pháp Cloud", client: "Ngân hàng Global Finance", date: "18/10/2023", amount: "120.000.000", status: "issued" },
    { id: "INV-2023-087", project: "Thiết kế UI/UX Mobile App", client: "Startup EduTech", date: "15/10/2023", amount: "35.000.000", status: "issued" },
    { id: "INV-2023-091", project: "Hosting Server 1 Năm", client: "Chuỗi bán lẻ Minh Long", date: "--", amount: "22.500.000", status: "pending" },
];

export default function InvoicePage() {
    return (
        <div className="h-screen overflow-hidden flex bg-white text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 hidden md:flex z-20">
                <div className="h-16 flex items-center px-6 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span></div>
                        <h2 className="text-lg font-bold tracking-tight text-slate-900">BusinessOS</h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                    <div>
                        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Chế độ doanh nghiệp</p>
                        <nav className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50" href="/dashboard"><span className="material-symbols-outlined">home</span><span className="text-sm font-medium">Tổng quan</span></a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50/50 text-blue-600" href="/classic/invoices"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span><span className="text-sm font-semibold">Tài chính</span></a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50" href="/classic/projects"><span className="material-symbols-outlined">work</span><span className="text-sm font-medium">Dự án</span></a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50" href="/classic/team"><span className="material-symbols-outlined">group</span><span className="text-sm font-medium">Nhân sự</span></a>
                        </nav>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-50">
                    <div className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:border-slate-100 border border-transparent" onClick={() => {}}>
                        <div className="size-9 rounded-full bg-slate-100"></div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold text-slate-900 truncate">Quản trị viên</span>
                            <span className="text-xs text-slate-400">Doanh nghiệp</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
                <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 shrink-0">
                    <div className="hidden md:flex max-w-md w-full">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
                            <Input className="w-full h-10 pl-10 pr-4 bg-slate-50 border-none rounded-lg text-sm placeholder:text-slate-400" placeholder="Tìm kiếm hóa đơn..." />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative" onClick={() => window.location.href = '/notifications'}><span className="material-symbols-outlined">notifications</span><span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white"></span></button>
                        <div className="h-6 w-px bg-slate-100 mx-2"></div>
                        <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 px-2 py-1" onClick={() => window.location.href = '/chat'}><span>Hỗ trợ</span><span className="material-symbols-outlined text-[18px]">contact_support</span></button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <a className="hover:text-blue-600" href="/dashboard">Trang chủ</a>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <a className="hover:text-blue-600" href="/classic/finance">Tài chính</a>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-slate-900">Trung tâm hóa đơn</span>
                            </nav>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Trung tâm hóa đơn</h1>
                                    <p className="text-slate-500 mt-1.5 text-sm">Hệ thống quản lý và truy xuất hóa đơn VAT điện tử tập trung.</p>
                                </div>
                                <Button variant="primary" className="flex items-center justify-center gap-2 px-6 py-2.5 shadow-lg shadow-blue-100" onClick={() => alert('Tạo hóa đơn mới')}><span className="material-symbols-outlined text-[20px]">add</span><span>Tạo hóa đơn mới</span></Button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between">
                                <div><p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Tổng giá trị đã xuất</p><p className="text-3xl font-bold text-slate-900 tracking-tight">1.250.000.000 <span className="text-lg font-normal text-slate-300 ml-1">đ</span></p><div className="mt-3 flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full w-fit"><span className="material-symbols-outlined text-[14px]">trending_up</span><span>+12.5% tháng này</span></div></div>
                                <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span></div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between">
                                <div><p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Giá trị chờ xử lý</p><p className="text-3xl font-bold text-slate-900 tracking-tight">85.000.000 <span className="text-lg font-normal text-slate-300 ml-1">đ</span></p><div className="mt-3 flex items-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full w-fit"><span className="material-symbols-outlined text-[14px]">pending</span><span>3 hóa đơn đang chờ</span></div></div>
                                <div className="size-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500"><span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>update</span></div>
                            </div>
                        </div>

                        {/* Invoice Table */}
                        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-50">
                                            <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">Mã hóa đơn</th>
                                            <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">Dự án</th>
                                            <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">Ngày xuất</th>
                                            <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Tổng tiền</th>
                                            <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center">Trạng thái</th>
                                            <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {invoices.map((inv) => (
                                            <tr key={inv.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6 font-mono text-sm font-semibold text-slate-900">{inv.id}</td>
                                                <td className="py-4 px-6"><div className="flex flex-col"><span className="text-sm font-semibold text-slate-900">{inv.project}</span><span className="text-xs text-slate-400">{inv.client}</span></div></td>
                                                <td className="py-4 px-6 text-sm text-slate-600">{inv.date}</td>
                                                <td className="py-4 px-6 text-right font-mono text-sm font-bold text-slate-900">{inv.amount}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-[8px] text-[11px] font-bold uppercase tracking-tighter border ${inv.status === "issued" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}>{inv.status === "issued" ? "Đã xuất" : "Chờ xử lý"}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button className={`p-2 ${inv.status === "issued" ? "text-blue-600 hover:bg-blue-50" : "text-slate-300 cursor-not-allowed"} rounded-lg transition-all`} title="Tải PDF" onClick={() => inv.status === 'issued' && alert(`Tải PDF ${inv.id}`)}><span className="material-symbols-outlined text-[20px]">file_download</span></button>
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Gửi Email" onClick={() => alert(`Gửi email hóa đơn ${inv.id}`)}><span className="material-symbols-outlined text-[20px]">mail</span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-xs font-medium text-slate-400"><span>Hiển thị</span><select className="py-1 pl-2 pr-8 bg-slate-50 border-none rounded-md text-xs font-bold text-slate-900"><option>10</option><option>20</option><option>50</option></select><span>hóa đơn mỗi trang</span></div>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 text-slate-300" disabled><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold" onClick={() => { }}>1</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 text-xs font-bold" onClick={() => alert('Trang 2')}>2</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 text-xs font-bold" onClick={() => alert('Trang 3')}>3</button>
                                    <span className="text-slate-300 px-1 text-xs font-bold">...</span>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 text-xs font-bold" onClick={() => alert('Trang 12')}>12</button>
                                    <button className="p-2 text-slate-500 hover:text-slate-900" onClick={() => alert('Trang tiếp')}><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                                </div>
                            </div>
                        </div>

                        <footer className="mt-4 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-300 uppercase tracking-widest border-t border-slate-50 pt-8">
                            <p>© 2024 BusinessOS • Trung tâm quản trị tài chính</p>
                            <div className="flex gap-6"><a className="hover:text-blue-600" href="/pricing">Điều khoản</a><a className="hover:text-blue-600" href="/pricing">Bảo mật</a><a className="hover:text-blue-600" href="/chat">Trợ giúp</a></div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
