"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function MarketplacePage() {
    return (
        <div className="bg-slate-50 font-sans text-slate-900 overflow-hidden">
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <aside className="w-64 shrink-0 h-full bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto hidden md:flex">
                    <div className="flex flex-col p-4 gap-6">
                        {/* Logo */}
                        <div className="flex items-center gap-3 px-2">
                            <div className="bg-blue-500 aspect-square rounded-lg size-10 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-[24px]">business_center</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-slate-900 text-base font-bold leading-none">BusinessOS</h1>
                                <p className="text-slate-500 text-xs font-normal mt-1">Phiên bản Doanh nghiệp</p>
                            </div>
                        </div>
                        {/* Navigation */}
                        <nav className="flex flex-col gap-1">
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group" href="/dashboard">
                                <span className="material-symbols-outlined text-[24px] group-hover:text-slate-900">dashboard</span>
                                <p className="text-sm font-medium">Tổng quan</p>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-500/10 text-blue-500" href="/classic/marketplace">
                                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                                <p className="text-sm font-bold">Chợ dịch vụ</p>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group" href="/freelancer/workspace">
                                <span className="material-symbols-outlined text-[24px] group-hover:text-slate-900">briefcase_meal</span>
                                <p className="text-sm font-medium">Dịch vụ của tôi</p>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group" href="/classic/checkout">
                                <span className="material-symbols-outlined text-[24px] group-hover:text-slate-900">shopping_cart</span>
                                <p className="text-sm font-medium">Đơn hàng</p>
                            </a>
                            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group" href="/settings">
                                <span className="material-symbols-outlined text-[24px] group-hover:text-slate-900">settings</span>
                                <p className="text-sm font-medium">Cài đặt</p>
                            </a>
                        </nav>
                    </div>
                    {/* User Profile Bottom */}
                    <div className="p-4 border-t border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="bg-center bg-cover rounded-full size-10 bg-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDz08Exza8rE6t5smn85VJd4AFQG2EcN5_Wcq2voRo-7oODKV8vLI2hnLddL9y4GOiNvGqrn80YrmfjM_drto_M4iqFSJIvI1C4ALAl27LgipYc8WGauNoZ69mrkb63C9IVMoYIBTjRHkGIx7EpOK-_RGPCexfbUZvNDRs594D3tj6mhn0IUpbNA-_V2sO6V_2D3SOOeb5W5cMwbaeQVed4MsQu5-AGVv_okPBVoZrqrtCwrgIPBkUaaxqJmQoCHGMt5F_wqJOiPy8")' }}></div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-slate-900 text-sm font-medium truncate">Jane Doe</p>
                                <p className="text-slate-500 text-xs truncate">Quản trị viên</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                    {/* Top Navbar */}
                    <header className="h-16 shrink-0 border-b border-slate-200 bg-white px-6 flex items-center justify-between z-10">
                        <div className="flex items-center gap-4 flex-1 max-w-xl">
                            <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => { }}>
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400">search</span>
                                </div>
                                <Input className="w-full pl-10 pr-3 py-2 border-none rounded-lg bg-slate-100 placeholder-slate-400" placeholder="Tìm kiếm dịch vụ, SOP hoặc tác giả..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                            <Button variant="ghost" size="icon" className="relative p-2 rounded-lg" onClick={() => alert('notifications')}>
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </Button>
                            <Button variant="ghost" size="icon" className="p-2 rounded-lg" onClick={() => alert('shopping_cart')}>
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </Button>
                            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
                            <Button variant="secondary" className="flex items-center gap-2 text-sm font-medium text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg hover:bg-blue-500/20" onClick={() => alert('add')}>
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                <span>Yêu cầu dịch vụ</span>
                            </Button>
                        </div>
                    </header>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
                        <div className="max-w-7xl mx-auto flex flex-col gap-8">
                            {/* Hero Banner */}
                            <div className="relative w-full rounded-xl overflow-hidden shadow-lg group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent z-10"></div>
                                <div className="bg-cover bg-center h-[280px] w-full transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDctbBU_KGCse1NNJULmPUwa4c5ZSzwF9KwXn3GpnWkl5XqUDFvo3liHMOLF2ZYNtuaHSkG_AnqwgcrshEMJnorsYMr-rdoBeUZjZRthsud2BcbrhxK0oe2oSIIcMCfXSWQBmbpZJAcniQLYhw44ZoNalLYBbgd1oaVF8RXZEBzQgUdXZAYc7ZJu-PnvhM5oMaGMZRSX6e2V9cS_TCnOVjrpYkFFBzjluVT3KjwBi86OY6E8e6rjbAxEZ_OGfazBlIMq9K5aBVQmRw")' }}></div>
                                <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-12 max-w-2xl">
                                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-200 uppercase bg-blue-900/50 rounded-full w-fit backdrop-blur-sm">Nổi bật</span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">Mở rộng hoạt động bán hàng</h2>
                                    <p className="text-blue-100 text-lg mb-6 max-w-lg">Giảm 20% gói SOP Bán hàng tiêu chuẩn. Bao gồm mẫu, kịch bản và quy trình tự động hóa.</p>
                                    <Button variant="primary" className="w-fit shadow-lg shadow-blue-900/20 flex items-center gap-2" onClick={() => alert('Nhận ưu đãi ngay')}>
                                        <span>Nhận ưu đãi ngay</span>
                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Filter Categories */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900">Duyệt danh mục</h3>
                                <a className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1" href="/classic/marketplace">
                                    Xem tất cả
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </a>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                <Button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium whitespace-nowrap shadow-md" onClick={() => alert('apps')}>
                                    <span className="material-symbols-outlined text-[18px]">apps</span>
                                    Tất cả dịch vụ
                                </Button>
                                <Button variant="secondary" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap" onClick={() => alert('search')}>
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                    SEO &amp; Marketing
                                </Button>
                                <Button variant="secondary" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap" onClick={() => alert('search')}>
                                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                    Viết nội dung
                                </Button>
                                <Button variant="secondary" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap" onClick={() => alert('search')}>
                                    <span className="material-symbols-outlined text-[18px]">palette</span>
                                    Thiết kế
                                </Button>
                                <Button variant="secondary" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap" onClick={() => alert('search')}>
                                    <span className="material-symbols-outlined text-[18px]">code</span>
                                    Phát triển Web
                                </Button>
                            </div>
                        </div>

                        {/* Service Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                            {/* Card 1 */}
                            <div className="group flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-40 overflow-hidden">
                                    <div className="bg-cover bg-center h-full w-full group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2aJ26tS6nfzgX3qvD47nms0b8Gnh7r2C38ur8SVU3ByANKeBZbHjXK3aJ9bOkFLx-_bmr9H1bMdlqQEK9jijYFi138LLYhA8PjQDHa2Fj50kC9vuIHrmYsiVM5M52vJhw60XhM1ag_x3a923WRymEHuzX5njVhzcnvugxMVi9ZMRAdxek2IjAjyvrjjaFHZWDKRoXpL6NIIt5SMGj5-eHHM658-598tBuBhkqYqhLXrCU6Rp36YishzXD7JOXiFt3ZTwVTCTp6Co")' }}></div>
                                    <div className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-yellow-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        4.8
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide">Marketing</span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-500 transition-colors">Kiểm toán SEO toàn diện</h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">Phân tích toàn diện website bao gồm SEO kỹ thuật, backlink và cơ hội từ khóa.</p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">Bắt đầu từ</span>
                                            <span className="text-lg font-bold text-slate-900">5,000,000 ₫</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-9 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => alert('add_shopping_cart')}>
                                            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-40 overflow-hidden">
                                    <div className="bg-cover bg-center h-full w-full group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1O3S1_4mN2AqCMcAM3LCyHwr0c6VszQsVwd6Pvjg6hncd9Won4IzVV-zzgnZ6RRDc7QyTv8jeslK9HnN1eBXM6zmbhOxxOasGtqqFLE9vjbZQaoFqfCs7IvybZhAWR-AbumdWelWNXnvvCIy8ZEZtd_gPiOtcW5p8ihs9fd1cAfrgta1d_tv3A-xJS7-MQXiS3gRYJugrGngJnj9FQC7Cb4nZjeoCy8edUPsa5w40UJn1kHYfoz-n4_R07WPDArl_3OVrPUAddbc")' }}></div>
                                    <div className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-yellow-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        4.5
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wide">Social Media</span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-500 transition-colors">Gói nội dung mạng xã hội</h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">30 ngày bài đăng, chú thích và nghiên cứu hashtag cho FB, IG và LinkedIn.</p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">Bắt đầu từ</span>
                                            <span className="text-lg font-bold text-slate-900">2,500,000 ₫</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-9 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => alert('add_shopping_cart')}>
                                            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-40 overflow-hidden">
                                    <div className="bg-cover bg-center h-full w-full group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCm3HS09msQ3EjF-KZIDcrDO955MXb7yLm1FRSYrDH6DjFARQ94FpsduUvr9twtIpcoyostjBJ2s0DhxGSaNcn8R4O7iWXDzFAx6PWcyMp3FLpUTOA_qzDLLLmkG_pnvosNizd7wU0Q3rwqFGZlCg49gDyKGUfF69Xff_91rM70EFZC_j7JA8kX6SryH776XrvZzY8S5rGYPea4RA5Iy8m6cy8KBhqb20FL86dNcX5Fe8MMUjcaMu4vaDgXPIld_iGTiICf9V7dOk")' }}></div>
                                    <div className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-yellow-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        4.9
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wide">HR</span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-500 transition-colors">Bộ công cụ tiếp nhận nhân viên</h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">SOP chuẩn hóa cho nhân viên mới, bao gồm hợp đồng, danh sách kiểm tra và kế hoạch đào tạo.</p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">Giá cố định</span>
                                            <span className="text-lg font-bold text-slate-900">1,200,000 ₫</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-9 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => alert('add_shopping_cart')}>
                                            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="group flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="relative h-40 overflow-hidden">
                                    <div className="bg-cover bg-center h-full w-full group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpGp1noLOt_Nw5GLN4kIkQ4YDBXSrNtZfEC5o9dtcA9PT5Px-FDBCwWYhUspE5BDA5yDX3v8kjtcDXeAxtShjcch4s4hAo_4JGN1A32UtWFshg9TK3-utAHlMas-UcAvNI0LqhtFxEyVp6t6jX_Pyd5uq587dB8kJJ19aG6qmBTTEqJO-eS5rCp7vS96CB-sO0ES9GqKSGnbivNydUkCmz6GuKljTxdH4Uunc18R6BZQutXBayA2gK47HIPKlWJzgHjE-LtFR9p1c")' }}></div>
                                    <div className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 text-xs font-bold shadow-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-yellow-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        4.7
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wide">Web Design</span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-500 transition-colors">Tối ưu Landing Page</h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">Đánh giá UX/UI và đề xuất thiết kế lại để cải thiện tỷ lệ chuyển đổi.</p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">Bắt đầu từ</span>
                                            <span className="text-lg font-bold text-slate-900">3,800,000 ₫</span>
                                        </div>
                                        <Button variant="ghost" size="icon" className="size-9 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => alert('add_shopping_cart')}>
                                            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Load More */}
                        <div className="flex justify-center pb-8">
                            <Button variant="secondary" className="px-6 py-2 border border-slate-300 rounded-lg" onClick={() => alert('Load More Services')}>
                                Xem thêm dịch vụ
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
