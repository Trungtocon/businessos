"use client";

import { Button } from "@/components/ui/Button";
// AI Copilot FAB + Drawer provided by (portal)/layout.tsx

export default function WorkspacePage() {
    return (
        <div className="bg-gray-50 text-slate-900 font-sans h-screen flex flex-col overflow-hidden">
            {/* Top Navigation */}
            <header className="bg-white border-b border-slate-200 shrink-0 z-20">
                <div className="px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 min-w-0">
                        <div className="flex items-center gap-3 text-slate-900 shrink-0">
                            <div className="size-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"><span className="material-symbols-outlined text-[20px]">grid_view</span></div>
                            <h2 className="text-lg font-bold tracking-tight hidden sm:block">BusinessOS</h2>
                        </div>
                        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                        <nav className="hidden md:flex items-center gap-2 text-sm text-slate-500 whitespace-nowrap">
                            <a className="hover:text-blue-500" href="/classic/projects">Dự án</a>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <a className="hover:text-blue-500 truncate max-w-[150px]" href="/classic/projects">Thiết kế lại Landing Page</a>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-slate-900 font-medium">Không gian làm việc</span>
                        </nav>
                    </div>
                    {/* Timer Widget */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex">
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full pl-1 pr-4 py-1 shadow-sm">
                            <div className="size-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-pulse"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span></div>
                            <div className="flex flex-col items-start leading-none"><span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Đang theo dõi</span><span className="text-sm font-mono font-bold text-slate-900">02:14:05</span></div>
                            <button className="ml-2 size-6 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 hover:text-red-500" onClick={() => { }}><span className="material-symbols-outlined text-[18px]">stop_circle</span></button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-slate-500 hover:text-slate-700" onClick={() => { }}><span className="material-symbols-outlined">notifications</span><span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span></button>
                        <div className="h-8 w-px bg-slate-200 mx-1"></div>
                        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200" onClick={() => { }}>
                            <div className="size-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">JD</div>
                            <span className="text-sm font-medium hidden sm:block">Jane Doe</span>
                            <span className="material-symbols-outlined text-[18px] text-slate-400">expand_more</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 flex overflow-hidden w-full max-w-[1920px] mx-auto p-4 gap-4 items-stretch">
                {/* Left Panel: Brief */}
                <aside className="hidden xl:flex flex-col w-[320px] shrink-0 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2"><span className="material-symbols-outlined text-blue-500 text-[20px]">assignment</span>Brief &amp; Yêu cầu</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">Đang thực hiện</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thông tin khách hàng</h4>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">TF</div>
                                <div><p className="font-medium text-sm">TechFlow Inc.</p><p className="text-xs text-slate-500">San Francisco, CA</p></div>
                            </div>
                            <div className="flex gap-2 text-xs"><div className="px-2 py-1 bg-slate-100 rounded text-slate-600">SaaS</div><div className="px-2 py-1 bg-slate-100 rounded text-slate-600">B2B</div></div>
                        </div>
                        <hr className="border-slate-100" />
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mô tả</h4>
                            <p className="text-sm leading-relaxed text-slate-700">Chúng tôi cần thiết kế lại hoàn toàn trang landing page chính. Mục tiêu là tăng tỷ lệ chuyển đổi lên 15%. Hãy tập trung vào phần "Tính năng" và bảng giá.</p>
                            <ul className="text-sm list-disc list-inside text-slate-700 space-y-1"><li>Thẩm mỹ hiện đại, gọn gàng</li><li>Ưu tiên thiết bị di động</li><li>Hỗ trợ chế độ tối</li></ul>
                        </div>
                        <hr className="border-slate-100" />
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cột mốc</h4>
                            <div className="relative pl-4 border-l-2 border-slate-200 space-y-4">
                                <div className="relative"><span className="absolute -left-[21px] top-1 size-3 bg-green-500 rounded-full border-2 border-white"></span><p className="text-xs text-slate-500">Oct 20, 2023</p><p className="text-sm font-medium line-through text-slate-400">Wireframes</p></div>
                                <div className="relative"><span className="absolute -left-[21px] top-1 size-3 bg-blue-500 rounded-full border-2 border-white ring-2 ring-blue-100"></span><p className="text-xs text-slate-500">Oct 24, 2023</p><p className="text-sm font-medium text-blue-500">Thiết kế UI (3 phương án)</p></div>
                                <div className="relative"><span className="absolute -left-[21px] top-1 size-3 bg-slate-300 rounded-full border-2 border-white"></span><p className="text-xs text-slate-500">Oct 30, 2023</p><p className="text-sm font-medium">Bàn giao cuối cùng</p></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tài liệu đính kèm</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <a className="flex flex-col items-center justify-center p-3 rounded border border-slate-200 hover:border-blue-500 hover:bg-blue-50 group" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('folder_zipBrand_Kit.zip'); }}><span className="material-symbols-outlined text-slate-400 group-hover:text-blue-500 mb-1">folder_zip</span><span className="text-xs font-medium truncate w-full text-center">Brand_Kit.zip</span></a>
                                <a className="flex flex-col items-center justify-center p-3 rounded border border-slate-200 hover:border-blue-500 hover:bg-blue-50 group" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('imagePhotos.png'); }}><span className="material-symbols-outlined text-slate-400 group-hover:text-blue-500 mb-1">image</span><span className="text-xs font-medium truncate w-full text-center">Photos.png</span></a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Center: Editor */}
                <section className="flex-1 flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-w-0">
                    <div className="flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50/50">
                        <div className="flex gap-6">
                            <button className="relative py-4 text-sm font-medium text-blue-500 border-b-2 border-blue-500" onClick={() => { }}><span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">edit_document</span>Trình soạn thảo</span></button>
                            <button className="relative py-4 text-sm font-medium text-slate-500 hover:text-slate-700" onClick={() => { }}><span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">folder_open</span>Tệp</span></button>
                            <button className="relative py-4 text-sm font-medium text-slate-500 hover:text-slate-700" onClick={() => { }}><span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">visibility</span>Xem trước</span></button>
                        </div>
                        <div className="flex items-center gap-2"><span className="text-xs text-slate-400">Đã lưu 2 phút trước</span><button className="p-1.5 hover:bg-slate-200 rounded text-slate-500" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">cloud_done</span></button></div>
                    </div>
                    <div className="flex-1 bg-slate-50 relative p-6 flex flex-col">
                        <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex items-center gap-2 z-10 overflow-x-auto">
                            <button className="p-2 rounded hover:bg-slate-100 text-slate-600" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
                            <button className="p-2 rounded hover:bg-slate-100 text-slate-600" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
                            <div className="w-px h-6 bg-slate-200 mx-1"></div>
                            <button className="p-2 rounded hover:bg-slate-100 text-slate-600" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">link</span></button>
                            <button className="p-2 rounded hover:bg-slate-100 text-slate-600" onClick={() => { }}><span className="material-symbols-outlined text-[20px]">add_photo_alternate</span></button>
                            <div className="flex-1"></div>
                            <button className="px-3 py-1.5 rounded bg-slate-100 text-xs font-medium text-slate-600 flex items-center gap-1" onClick={() => { }}>Tích hợp Figma <span className="material-symbols-outlined text-[14px]">open_in_new</span></button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center mt-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-100/50 hover:bg-blue-50/50 hover:border-blue-500 transition-all cursor-pointer group" onClick={() => { }}>
                            <div className="size-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-blue-500">cloud_upload</span></div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">Tải lên sản phẩm bàn giao</h3>
                            <p className="text-sm text-slate-500 mb-6">Kéo thả tệp vào đây, hoặc nhấn để chọn</p>
                            <div className="flex gap-3 text-xs text-slate-400"><span>Hỗ trợ: .fig, .zip, .png, .pdf</span><span>•</span><span>Tối đa 500MB</span></div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
                                <div className="size-10 rounded bg-purple-100 flex items-center justify-center text-purple-600"><span className="material-symbols-outlined">design_services</span></div>
                                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">Landing_Page_v2.fig</p><p className="text-xs text-slate-500">12.4 MB • Vừa xong</p></div>
                                <button className="p-1 hover:text-red-500 text-slate-400" onClick={() => { }}><span className="material-symbols-outlined">close</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center gap-4">
                        <div className="text-xs text-slate-500 hidden sm:block"><p>Trạng thái: <span className="font-medium text-slate-700">Bản nháp đã lưu</span></p></div>
                        <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
                            <Button variant="secondary" className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold" onClick={() => alert('Lưu nháp')}>Lưu nháp</Button>
                            <Button variant="primary" className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold shadow-md shadow-blue-500/20" onClick={() => alert('sendNộp sản phẩm')}><span className="material-symbols-outlined text-[20px] mr-2">send</span>Nộp sản phẩm</Button>
                        </div>
                    </div>
                </section>

                {/* Right: AI Copilot */}
                <aside className="hidden lg:flex flex-col w-[350px] shrink-0 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-2"><div className="size-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><span className="material-symbols-outlined text-white text-[14px]">auto_awesome</span></div><h3 className="font-semibold text-slate-900">Trợ lý AI</h3></div>
                        <button className="text-slate-400 hover:text-slate-600" onClick={() => { }}><span className="material-symbols-outlined">more_horiz</span></button>
                    </div>
                    <div className="px-4 py-3 border-b border-slate-100">
                        <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200" onClick={() => { }}>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-indigo-500">psychology</span>Đối tác sáng tạo</span>
                            <span className="material-symbols-outlined text-[18px] text-slate-400">arrow_drop_down</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                        <div className="flex justify-center"><span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Hôm nay, 10:23</span></div>
                        <div className="flex gap-3">
                            <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center mt-1"><span className="material-symbols-outlined text-white text-[14px]">smart_toy</span></div>
                            <div className="flex flex-col gap-1 max-w-[85%]"><span className="text-xs font-medium text-slate-500 ml-1">AI Copilot</span><div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm"><p>Chào Jane! Tôi đã phân tích brief từ <strong>TechFlow Inc</strong>. Đây là 3 ý tưởng bố cục tôi có thể giúp bạn phác thảo:</p><ol className="list-decimal list-inside mt-2 space-y-1 text-xs"><li>Lưới SaaS tối giản</li><li>Chế độ tối nổi bật</li><li>Hero 3D tương tác</li></ol></div></div>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="size-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center mt-1 text-xs font-bold text-slate-600">JD</div>
                            <div className="flex flex-col gap-1 items-end max-w-[85%]"><div className="p-3 bg-blue-500 text-white rounded-2xl rounded-tr-none text-sm shadow-sm"><p>Hãy bắt đầu với "Lưới SaaS tối giản" nhé. Bạn có thể đề xuất bảng màu không?</p></div><span className="text-[10px] text-slate-400 mr-1">Đã đọc 10:25</span></div>
                        </div>
                        <div className="flex gap-3">
                            <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center mt-1"><span className="material-symbols-outlined text-white text-[14px]">smart_toy</span></div>
                            <div className="flex flex-col gap-1 max-w-[85%]"><div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 w-16"><div className="size-1.5 bg-slate-400 rounded-full animate-bounce"></div><div className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div><div className="size-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div></div></div>
                        </div>
                    </div>
                    <div className="p-4 bg-white border-t border-slate-200">
                        <div className="flex gap-2 overflow-x-auto pb-3 mb-1">
                            <button className="whitespace-nowrap px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium border border-indigo-100 hover:bg-indigo-100" onClick={() => { }}>Tạo cấu trúc</button>
                            <button className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 hover:bg-slate-200" onClick={() => { }}>Tóm tắt Brief</button>
                        </div>
                        <div className="relative">
                            <textarea className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none" placeholder="Hỏi AI trợ giúp..." rows={1}></textarea>
                            <button className="absolute right-2 top-1.5 p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm" onClick={() => { }}><span className="material-symbols-outlined text-[18px] block transform rotate-[-45deg] translate-x-0.5 -translate-y-0.5">send</span></button>
                        </div>
                    </div>
                </aside>
            </main>
            {/* AI Copilot FAB + Drawer provided by (portal)/layout.tsx */}
        </div>
    );
}
