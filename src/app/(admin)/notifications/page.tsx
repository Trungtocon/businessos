"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function NotificationCenterPage() {
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-3 shadow-sm">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-slate-900">
                        <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[20px]">business_center</span>
                        </div>
                        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">BusinessOS</h2>
                    </div>
                    <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64 group">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-transparent focus-within:border-primary/20 transition-all">
                            <div className="text-slate-500 flex border-none bg-slate-100 items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <Input className="flex w-full min-w-0 flex-1 rounded-r-lg rounded-l-none border-none bg-slate-100 h-full pl-2 text-sm" placeholder="Tìm kiếm (Ctrl+K)" />
                        </div>
                    </label>
                </div>
                <div className="flex flex-1 justify-end gap-8 items-center">
                    <div className="hidden lg:flex items-center gap-6">
                        <a className="text-slate-500 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/dashboard">Dashboard</a>
                        <a className="text-slate-500 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/classic/projects">Projects</a>
                        <a className="text-slate-500 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/classic/finance">Finance</a>
                        <a className="text-slate-500 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/classic/team">CRM</a>
                        <a className="text-slate-500 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/classic/team">HRM</a>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button variant="ghost" size="icon" className="size-10 bg-primary/10 text-primary relative" onClick={() => window.location.href = '/notifications'}>
                            <span className="material-symbols-outlined text-[22px]">notifications</span>
                            <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white"></span>
                        </Button>
                        <Button variant="ghost" size="icon" className="size-10" onClick={() => window.location.href = '/settings'}>
                            <span className="material-symbols-outlined text-[22px]">settings</span>
                        </Button>
                        <button className="flex items-center justify-center overflow-hidden rounded-full size-10 bg-gray-200 ml-2" onClick={() => window.location.href = '/settings'}>
                            <img alt="User avatar" className="size-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIuzXWStdOIdzmOeqkQ9eKu11N6dVqf78ckMVuQgVQexuwA1SREnTZ7ykb9AAw7cNDw_hCg2cTIaR3_zaO0bRu06nJbX-E7NrfKTa4tOjJ70wLscaQkYfeSn6C9EqXxMezPjS0UCX7YwvspNxfGfujSbnyhw1fa-t7RbZSQxyqvkMpb0pj6HCCnbD09eCTCQW1BZv93sQEI08EJuS-khGwD2mMokNrDNphpdYR3NmyII1pzb8p8jaQ5jeR8yZR7Js_P4XVWk2AIzo" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[900px] mx-auto px-4 py-8 md:px-8">
                {/* Header & Heading */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-slate-900 text-2xl font-bold leading-tight">Trung tâm thông báo</h1>
                        <p className="text-slate-500 text-sm mt-1">Bạn có <span className="font-semibold text-primary">3</span> thông báo mới chưa đọc</p>
                    </div>
                    <Button variant="secondary" onClick={() => alert('Đã đánh dấu tất cả là đã đọc')}>
                        <span className="material-symbols-outlined text-[18px]">done_all</span>
                        <span className="whitespace-nowrap">Đánh dấu tất cả đã đọc</span>
                    </Button>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
                    {/* Chip: All (Active) */}
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-900 pl-3 pr-4 shadow-sm transition-transform active:scale-95" onClick={() => { }}>
                        <span className="material-symbols-outlined text-white text-[18px]">apps</span>
                        <p className="text-white text-sm font-medium leading-normal">Tất cả</p>
                    </button>
                    {/* Chip: System */}
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-slate-200 pl-3 pr-4 hover:bg-gray-50 transition-colors" onClick={() => alert('Lọc: Hệ thống')}>
                        <span className="material-symbols-outlined text-blue-500 text-[18px]">dns</span>
                        <p className="text-slate-500 text-sm font-medium leading-normal">Hệ thống</p>
                    </button>
                    {/* Chip: Chat */}
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-slate-200 pl-3 pr-4 hover:bg-gray-50 transition-colors" onClick={() => alert('Lọc: Chat')}>
                        <span className="material-symbols-outlined text-green-500 text-[18px]">chat_bubble</span>
                        <p className="text-slate-500 text-sm font-medium leading-normal">Chat</p>
                    </button>
                    {/* Chip: Job */}
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-slate-200 pl-3 pr-4 hover:bg-gray-50 transition-colors" onClick={() => alert('Lọc: Công việc')}>
                        <span className="material-symbols-outlined text-yellow-500 text-[18px]">work</span>
                        <p className="text-slate-500 text-sm font-medium leading-normal">Công việc</p>
                    </button>
                    {/* Chip: Finance */}
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white border border-slate-200 pl-3 pr-4 hover:bg-gray-50 transition-colors" onClick={() => alert('Lọc: Tài chính')}>
                        <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
                        <p className="text-slate-500 text-sm font-medium leading-normal">Tài chính</p>
                    </button>
                    <div className="w-px h-6 bg-slate-200 mx-1 shrink-0"></div>
                    {/* Toggle: Unread Only */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <div className="relative">
                            <input className="sr-only peer" type="checkbox" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-500">Chưa đọc</span>
                    </label>
                </div>

                {/* Notification Feed List */}
                <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                    {/* Item 1: Finance (Unread) */}
                    <div className="group/item relative flex gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer bg-primary/[0.02]" onClick={() => window.location.href = '/classic/invoices'}>
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-l-xl"></div>
                        <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center justify-center rounded-xl bg-red-100 shrink-0 size-10 mt-1">
                                <span className="material-symbols-outlined text-red-500 text-[20px]">warning</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-1">
                                <div className="flex justify-between items-start w-full">
                                    <p className="text-slate-900 text-[15px] font-bold leading-snug pr-8">Hóa đơn #INV-2024 quá hạn thanh toán 3 ngày</p>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-slate-500 text-xs font-normal">10 phút trước</span>
                                        <div className="size-2 rounded-full bg-primary"></div>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm font-normal leading-relaxed line-clamp-2">Vui lòng kiểm tra và thanh toán ngay để tránh gián đoạn dịch vụ của hệ thống Enterprise Plan.</p>
                            </div>
                        </div>
                        {/* Hover Action */}
                        <div className="absolute right-2 bottom-2 md:top-4 md:bottom-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" title="Đánh dấu đã đọc" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã đánh dấu đã đọc'); }}>
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" title="Xóa" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã xóa thông báo'); }}>
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </Button>
                        </div>
                    </div>

                    {/* Item 2: Chat (Unread) */}
                    <div className="group/item relative flex gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer bg-primary/[0.02]" onClick={() => window.location.href = '/chat'}>
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-green-500 rounded-l-xl"></div>
                        <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center justify-center rounded-xl bg-green-100 shrink-0 size-10 mt-1">
                                <span className="material-symbols-outlined text-green-500 text-[20px]">forum</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-1">
                                <div className="flex justify-between items-start w-full">
                                    <p className="text-slate-900 text-[15px] font-bold leading-snug pr-8">Nguyễn Văn A đã nhắc đến bạn trong 'Dự án Alpha'</p>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-slate-500 text-xs font-normal">2 giờ trước</span>
                                        <div className="size-2 rounded-full bg-primary"></div>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm font-normal leading-relaxed">@Minh: Phần này cần cập nhật lại UI dashboard theo guideline mới nhé. Deadline là chiều nay.</p>
                            </div>
                        </div>
                        <div className="absolute right-2 bottom-2 md:top-4 md:bottom-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã đánh dấu đã đọc'); }}>
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã xóa'); }}>
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </Button>
                        </div>
                    </div>

                    {/* Item 3: Job (Unread) */}
                    <div className="group/item relative flex gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer bg-primary/[0.02]" onClick={() => window.location.href = '/classic/projects'}>
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-yellow-500 rounded-l-xl"></div>
                        <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center justify-center rounded-xl bg-yellow-100 shrink-0 size-10 mt-1">
                                <span className="material-symbols-outlined text-yellow-500 text-[20px]">assignment_add</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-1">
                                <div className="flex justify-between items-start w-full">
                                    <p className="text-slate-900 text-[15px] font-bold leading-snug pr-8">Bạn được giao task mới: 'Thiết kế giao diện A06'</p>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-slate-500 text-xs font-normal">Hôm qua</span>
                                        <div className="size-2 rounded-full bg-primary"></div>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm font-normal leading-relaxed">Người giao: Trần Thị B. Độ ưu tiên: Cao.</p>
                            </div>
                        </div>
                        <div className="absolute right-2 bottom-2 md:top-4 md:bottom-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã đánh dấu đã đọc'); }}>
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã xóa'); }}>
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </Button>
                        </div>
                    </div>

                    {/* Item 4: System (Read) */}
                    <div className="group/item relative flex gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => alert('Cập nhật hệ thống v2.4.0')}>
                        <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center justify-center rounded-xl bg-blue-100 shrink-0 size-10 mt-1 opacity-70">
                                <span className="material-symbols-outlined text-blue-500 text-[20px]">cloud_sync</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-1 opacity-80 group-hover/item:opacity-100">
                                <div className="flex justify-between items-start w-full">
                                    <p className="text-slate-900 text-[15px] font-medium leading-snug pr-8">Hệ thống đã cập nhật phiên bản v2.4.0</p>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-slate-400 text-xs font-normal">Hôm qua</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm font-normal leading-relaxed">Bản cập nhật bao gồm sửa lỗi hiển thị dashboard và tăng tốc độ tải trang.</p>
                            </div>
                        </div>
                        <div className="absolute right-2 bottom-2 md:top-4 md:bottom-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đánh dấu chưa đọc'); }}>
                                <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã xóa'); }}>
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </Button>
                        </div>
                    </div>

                    {/* Item 5: Chat (Read) */}
                    <div className="group/item relative flex gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => window.location.href = '/chat'}>
                        <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center justify-center rounded-xl bg-green-100 shrink-0 size-10 mt-1 opacity-70">
                                <span className="material-symbols-outlined text-green-500 text-[20px]">forum</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-1 opacity-80 group-hover/item:opacity-100">
                                <div className="flex justify-between items-start w-full">
                                    <p className="text-slate-900 text-[15px] font-medium leading-snug pr-8">Lê Văn C đã trả lời bình luận của bạn</p>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-slate-400 text-xs font-normal">2 ngày trước</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm font-normal leading-relaxed">"Ok, tôi sẽ kiểm tra lại phần này ngay."</p>
                            </div>
                        </div>
                        <div className="absolute right-2 bottom-2 md:top-4 md:bottom-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đánh dấu chưa đọc'); }}>
                                <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã xóa'); }}>
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </Button>
                        </div>
                    </div>

                    {/* Item 6: System (Read) */}
                    <div className="group/item relative flex gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => alert('Chi tiết bảo mật')}>
                        <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center justify-center rounded-xl bg-blue-100 shrink-0 size-10 mt-1 opacity-70">
                                <span className="material-symbols-outlined text-blue-500 text-[20px]">security</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center gap-1 opacity-80 group-hover/item:opacity-100">
                                <div className="flex justify-between items-start w-full">
                                    <p className="text-slate-900 text-[15px] font-medium leading-snug pr-8">Phát hiện đăng nhập lạ từ IP 192.168.1.1</p>
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="text-slate-400 text-xs font-normal">3 ngày trước</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm font-normal leading-relaxed">Vui lòng xác nhận nếu đây là bạn, hoặc đổi mật khẩu ngay lập tức.</p>
                            </div>
                        </div>
                        <div className="absolute right-2 bottom-2 md:top-4 md:bottom-auto opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đánh dấu chưa đọc'); }}>
                                <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); alert('Đã xóa'); }}>
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-8">
                    <Button variant="ghost" onClick={() => alert('Xem thêm thông báo')}>
                        Xem các thông báo cũ hơn
                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                    </Button>
                </div>
            </main>
        </div>
    );
}
