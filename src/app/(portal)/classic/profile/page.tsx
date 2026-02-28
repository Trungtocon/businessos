"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ClientProfilePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="px-6 md:px-10 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-8 flex-1">
                        <div className="flex items-center gap-3 text-slate-900">
                            <div className="size-8 text-blue-500">
                                <span className="material-symbols-outlined text-[32px]">grid_view</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">BusinessOS</h2>
                        </div>
                        <div className="hidden md:flex flex-1 max-w-sm relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><span className="material-symbols-outlined text-[20px]">search</span></span>
                            <Input className="w-full bg-slate-100 border-none rounded-lg h-10 pl-10 pr-4 text-sm placeholder:text-slate-400" placeholder="Tìm kiếm nhanh..." />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-8">
                        <nav className="hidden lg:flex items-center gap-6">
                            <a className="text-slate-500 hover:text-blue-500 text-sm font-medium" href="/dashboard">Tổng quan</a>
                            <a className="text-slate-900 text-sm font-semibold" href="/classic/profile">Hồ sơ</a>
                            <a className="text-slate-500 hover:text-blue-500 text-sm font-medium" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('Thiết lập'); }}>Thiết lập</a>
                            <a className="text-slate-500 hover:text-blue-500 text-sm font-medium" href="/classic/reports">Báo cáo</a>
                        </nav>
                        <div className="size-9 rounded-full bg-slate-200"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-6">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
                    <a className="hover:text-blue-500" href="/dashboard">Trang chủ</a>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-slate-900">Hồ sơ doanh nghiệp</span>
                </div>

                <div className="relative mb-8">
                    <div className="h-48 md:h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-indigo-600/80"></div>
                        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 rounded-lg" onClick={() => {}}><span className="material-symbols-outlined text-[20px]">photo_camera</span></button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-[-40px] mx-6 relative z-10 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                            <div className="relative mt-[-80px] md:mt-[-100px]">
                                <div className="size-32 md:size-40 bg-white p-1 rounded-[12px] shadow-lg border border-gray-200">
                                    <div className="w-full h-full bg-slate-100 rounded-[8px] flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-gray-300 text-5xl">business</span>
                                    </div>
                                </div>
                                <button className="absolute bottom-2 right-2 size-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105" onClick={() => {}}><span className="material-symbols-outlined text-[16px]">edit</span></button>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 truncate">Công ty Cổ phần Công nghệ BusinessOS</h1>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Đã xác thực</span>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm md:text-base">
                                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">badge</span><span>MST: 0101234567</span></div>
                                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">category</span><span>Lĩnh vực: Phần mềm doanh nghiệp & SaaS</span></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button variant="secondary" className="flex-1 md:flex-none h-10 px-5" onClick={() => alert('receipt_longThiết lập hóa đơn')}><span className="material-symbols-outlined text-[18px] mr-2">receipt_long</span>Thiết lập hóa đơn</Button>
                                <Button variant="primary" className="flex-1 md:flex-none h-10 px-5 shadow-md shadow-blue-500/20" onClick={() => alert('editChỉnh sửa thông tin')}><span className="material-symbols-outlined text-[18px] mr-2">edit</span>Chỉnh sửa thông tin</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-slate-900">Thông tin định danh</h2>
                                <p className="text-sm text-slate-500">Cập nhật thông tin pháp lý của doanh nghiệp để đồng bộ hóa các chứng từ.</p>
                            </div>
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-full">
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Tên chính thức (Tiếng Việt) <span className="text-red-500">*</span></label>
                                        <Input className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-gray-200" defaultValue="Công ty Cổ phần Công nghệ BusinessOS" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Mã số thuế</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><span className="material-symbols-outlined text-[20px]">badge</span></span>
                                            <Input className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-50 border border-gray-200" defaultValue="0101234567" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Lĩnh vực hoạt động</label>
                                        <select className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-gray-200 text-slate-900"><option>Công nghệ & Phần mềm</option><option>Sản xuất</option><option>Thương mại & Dịch vụ</option></select>
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Địa chỉ trụ sở</label>
                                        <textarea className="w-full p-4 rounded-lg bg-slate-50 border border-gray-200 resize-none" rows={3} defaultValue="Tầng 12, Tòa nhà Innovation, 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                                <button className="px-4 h-9 rounded-lg text-sm font-semibold text-slate-500 hover:bg-gray-100" onClick={() => {}}>Hủy</button>
                                <Button variant="primary" className="px-6 h-9 shadow-sm shadow-blue-500/10" onClick={() => alert('Lưu thay đổi')}>Lưu thay đổi</Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-base font-bold text-slate-900 mb-4">Thông tin liên hệ hóa đơn</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Email nhận hóa đơn</label>
                                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-gray-200">
                                        <span className="material-symbols-outlined text-blue-500 text-[20px]">mail</span>
                                        <span className="text-sm font-medium text-slate-900">accounting@businessos.vn</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Người phụ trách</label>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-bold">NH</div>
                                        <div><p className="text-sm font-bold text-slate-900">Nguyễn Văn Hiếu</p><p className="text-xs text-slate-500">Kế toán trưởng</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-base font-bold text-slate-900">Độ hoàn thiện</h2>
                                <span className="text-blue-500 font-bold">85%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-4"><div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div></div>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-green-600"><span className="material-symbols-outlined text-[18px]">check_circle</span>Thông tin pháp lý</li>
                                <li className="flex items-center gap-2 text-sm text-green-600"><span className="material-symbols-outlined text-[18px]">check_circle</span>Logo doanh nghiệp</li>
                                <li className="flex items-center gap-2 text-sm text-slate-500"><span className="material-symbols-outlined text-[18px]">circle</span>Cấu hình thanh toán</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto py-8 text-center border-t border-gray-200">
                <p className="text-sm text-slate-500">© 2024 BusinessOS. Nền tảng quản trị doanh nghiệp toàn diện.</p>
            </footer>
        </div>
    );
}
