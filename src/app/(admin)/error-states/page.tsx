"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ErrorStatesPage() {
    return (
        <div className="bg-gray-100 text-slate-900 font-sans">
            {/* PRESENTATION WRAPPER: Contains two screens for demonstration */}
            <div className="flex flex-col gap-12 p-8">
                {/* SCREEN 1: DASHBOARD EMPTY STATE (APP CONTEXT) */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Screen 1: Dashboard Empty State</h3>
                    <div className="relative flex h-[800px] w-full overflow-hidden rounded-xl border border-gray-200 bg-slate-50 shadow-2xl">
                        {/* SIDEBAR */}
                        <aside className="flex w-64 flex-col border-r border-gray-100 bg-white">
                            <div className="flex items-center gap-3 p-6">
                                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-[20px]">layers</span>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-bold text-slate-900">BusinessOS</h1>
                                    <p className="text-xs text-slate-500">Enterprise</p>
                                </div>
                            </div>
                            <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
                                <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 bg-slate-50 text-primary transition-colors" href="/dashboard">
                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                                    <span className="text-sm font-medium">Tổng quan</span>
                                </a>
                                <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-gray-50 transition-colors" href="/classic/marketplace">
                                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                                    <span className="text-sm font-medium">Bán hàng</span>
                                </a>
                                <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-gray-50 transition-colors" href="/classic/projects">
                                    <span className="material-symbols-outlined text-[20px]">campaign</span>
                                    <span className="text-sm font-medium">Marketing</span>
                                </a>
                                <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-gray-50 transition-colors" href="/classic/finance">
                                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                    <span className="text-sm font-medium">Tài chính</span>
                                </a>
                                <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-gray-50 transition-colors" href="/classic/team">
                                    <span className="material-symbols-outlined text-[20px]">group</span>
                                    <span className="text-sm font-medium">Nhân sự</span>
                                </a>
                                <a className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 hover:bg-gray-50 transition-colors" href="/settings">
                                    <span className="material-symbols-outlined text-[20px]">settings</span>
                                    <span className="text-sm font-medium">Cài đặt</span>
                                </a>
                            </nav>
                            <div className="p-4 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="size-9 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGJGmZdwt8EupAw0zajrqRiMrCDG1nwZMNZ8_wqtQ60i6m3YFEHVxPakXi31xFHf97MeI3jcCob0--UC2_BxUGG37Z0GeX5GHhoQslbiyz07iRsrzS3na3t64FClBg_Q3fNpVF7bBVDrviF14kvYskXvIS8JY_kuAAl_oJRaWryjhjhZpoI-61rCr05x6j_2ZJurYMp3VcOKWrsdB6XqasFnswo1OvPD1uNgL95JjnjBtKXabNp6vno_RiE6BBNqz0sM89aQYPwg0")' }}></div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-slate-900">Minh Hoàng</p>
                                        <p className="text-xs text-slate-500">hoang@businessos.vn</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        {/* MAIN CONTENT WRAPPER */}
                        <div className="flex flex-1 flex-col h-full overflow-hidden">
                            {/* TOP HEADER */}
                            <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6">
                                <div className="flex items-center gap-4 flex-1">
                                    <h2 className="text-lg font-bold text-slate-900">Dữ liệu khách hàng</h2>
                                    <div className="h-6 w-px bg-gray-200 mx-2"></div>
                                    {/* Search Bar */}
                                    <div className="relative w-full max-w-sm group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">search</span>
                                        </div>
                                        <Input className="w-full rounded-lg border-0 bg-gray-50 py-2 pl-10 pr-3 text-sm ring-1 ring-inset ring-gray-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-primary/20" placeholder="Tìm kiếm dữ liệu..." type="text" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="icon" className="relative p-2" onClick={() => alert('notifications')}>
                                        <span className="material-symbols-outlined text-[24px]">notifications</span>
                                        <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 border-2 border-white"></span>
                                    </Button>
                                    <Button variant="primary" onClick={() => alert('add')}>
                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                        <span>Tạo mới</span>
                                    </Button>
                                </div>
                            </header>
                            {/* EMPTY STATE CONTENT */}
                            <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                                <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
                                    <div className="flex max-w-md flex-col items-center gap-6">
                                        {/* Illustration */}
                                        <div className="relative size-64 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZOQq6CY4pRVKQZjkg-TOv04pMI6DQBJD08lULb31LYNDZmS8uZ_TSUT30VeIJQdOzjhdu42U4NjsDa_CczprBF30qeN1I-27tkJdE3m4X90GhzJC-p4EMRRwDgw8QRH9fsk5NRdfB8p3BLAlkv17qZVOvl6X770tbHV5UvAYKmwMKu0kOYQaMzMMHjyUKyUE5tmZOkEM4USNAtmOx8O0QHcFINSBv8P2ZzJPtZFGIFRryU2hyABEl8c2ve_Q9HXADANZRFGz5d7I')" }}></div>
                                        <div className="flex flex-col items-center gap-2">
                                            <h2 className="text-xl font-bold text-slate-900">Chưa có dữ liệu nào ở đây</h2>
                                            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                                                Hiện tại hệ thống chưa ghi nhận dữ liệu khách hàng nào. Hãy bắt đầu quy trình làm việc của bạn bằng cách tạo mới bản ghi đầu tiên.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4 pt-2">
                                            <Button variant="secondary" onClick={() => alert('Tìm hiểu thêm')}>Tìm hiểu thêm</Button>
                                            <Button variant="primary" onClick={() => alert('add')}>
                                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                                <span>Tạo mới ngay</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>

                {/* SCREEN 2: 404 ERROR STATE (FULL PAGE CONTEXT) */}
                <div className="flex flex-col gap-4 mt-12">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Screen 2: 404 Error Page</h3>
                    <div className="relative flex min-h-[700px] w-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-100">
                        {/* Minimal Header for 404 */}
                        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-10">
                            <div className="flex items-center gap-2 text-slate-900">
                                <span className="material-symbols-outlined text-primary text-[28px]">layers</span>
                                <span className="text-xl font-bold tracking-tight">BusinessOS</span>
                            </div>
                            <a className="text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="/chat">Trung tâm hỗ trợ</a>
                        </header>
                        {/* 404 Main Content */}
                        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                            {/* 3D Illustration Area */}
                            <div className="mb-8 relative size-72 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaYPFOl8KDG4mV3ZhXfL1jaVKgqns3QyxyhGH8pMuEdogVZQ4NBejjnyu0kj4km77PYbCE3ySEHnNT91slzkx9sQTA33MhF8yCFM6SCtmUx6raZvtYE__6F8HDYb150A49WfWxY153ECN7m1dAojLo-YUWEw8r2RV6yVAzSGVVya5CHTFpV8ptxp8S2DEHEc5vlMt1ZLdsedX7pWJuUdEnTEEgmiZlIjMyCh5fcGdKEXawLSzTeiGWOssCir3dSZ_AamdWS_dBGnk')" }}></div>
                            {/* Typography */}
                            <div className="flex flex-col items-center gap-3 max-w-lg">
                                <p className="text-primary font-bold tracking-wider uppercase text-sm">Lỗi 404</p>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Rất tiếc, trang không tồn tại</h1>
                                <p className="text-base text-slate-500 leading-relaxed">
                                    Liên kết bạn truy cập có thể bị hỏng hoặc trang đã bị xóa khỏi hệ thống.
                                    <br className="hidden sm:block" />
                                    Vui lòng kiểm tra lại đường dẫn.
                                </p>
                            </div>
                            {/* Actions */}
                            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                <Button variant="primary" className="w-full sm:w-auto px-6 py-3 shadow-lg shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5" onClick={() => alert('arrow_back')}>
                                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                                    Quay lại trang chủ
                                </Button>
                                <Button variant="secondary" className="w-full sm:w-auto px-6 py-3" onClick={() => alert('bug_report')}>
                                    <span className="material-symbols-outlined text-[20px]">bug_report</span>
                                    Báo cáo sự cố
                                </Button>
                            </div>
                        </main>
                        {/* Simple Footer */}
                        <footer className="w-full py-6 text-center">
                            <p className="text-xs text-slate-400">© 2024 BusinessOS. All rights reserved.</p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
