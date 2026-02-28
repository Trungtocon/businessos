"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ServiceDetailPage() {
    return (
        <div className="bg-slate-50 font-sans text-slate-900 overflow-x-hidden transition-colors duration-200">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-slate-900">
                            <div className="size-8 text-blue-500">
                                <span className="material-symbols-outlined text-[28px]">grid_view</span>
                            </div>
                            <h2 className="text-xl font-bold leading-tight tracking-tight">BusinessOS</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-lg px-3 py-2 w-64">
                            <span className="material-symbols-outlined text-slate-400">search</span>
                            <Input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400" placeholder="Tìm kiếm dịch vụ..." />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 md:gap-9">
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-slate-900 text-sm font-medium hover:text-blue-500 transition-colors" href="/dashboard">Tổng quan</a>
                            <a className="text-blue-500 text-sm font-medium" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('Dịch vụ'); }}>Dịch vụ</a>
                            <a className="text-slate-900 text-sm font-medium hover:text-blue-500 transition-colors" href="/classic/reports">Báo cáo</a>
                        </nav>
                        <div className="size-10 rounded-full bg-cover bg-center border border-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCK_6zD8l_7BjICIhma-pXflK3A2ZOB52Um_ZhBtFhtn6NQTLOIotZ-RviaxKtd16C5rnpqThCcKGQy06y75ZLVzCAM6RPef0T_D8KWxrXQkpPIaS15BtwLv6T_FyWsZkY8-1WWIgQ5D6cVHbAoggJFmOOR6CCj43uPRn0PtM5rfXk-az4iAPbJc4eAuS0JKO34XKy23Vk2I8XgGscA67F2iI_WhkqFzONuymw-WmVOg0LKFfw8ueC3vb3HeC86Ve1EJoHsDP39Tko")' }}></div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-10 py-6">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
                    <a className="text-slate-500 font-medium hover:underline" href="/dashboard">Trang chủ</a>
                    <span className="text-slate-400">/</span>
                    <a className="text-slate-500 font-medium hover:underline" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('Dịch vụ'); }}>Dịch vụ</a>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-900 font-medium">Gói SEO</span>
                </div>

                {/* Hero / Header Section */}
                <div className="flex flex-col gap-6 mb-10">
                    {/* Cover Image */}
                    <div className="w-full aspect-[21/9] md:aspect-[3/1] rounded-xl overflow-hidden shadow-sm relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkexaBNz3MGcg6uDm_OzHGcN_ekxQLlbWnwlE7rVmhG2Um336dxVdcmySD45NeAfD6puibMwfsooNPc14DxDwTOxlb6qjX430kc7qk2ht4K11aMc9lb-SRAN5YMHr3eTF28tRPZJuz2-qDCi1rgSA4tX7sB3kVXgrK506OiBNVTYltrTWQiMsMkFfW6n1-85CMf-UwOhhxBGv6gSd264esP2SfJw7ZAoy1wrbUkIE05Rie207gwcqDZucqZQZW9esBHNWBkm847vI")' }}></div>
                    </div>
                    {/* Title & Rating */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">Gói dịch vụ SEO Tổng thể</h1>
                            <p className="text-slate-500 text-lg font-normal">Tăng trưởng lưu lượng truy cập tự nhiên và cải thiện thứ hạng từ khóa bền vững.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <span className="text-2xl font-bold text-slate-900">4.8</span>
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4].map((i) => (
                                            <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        ))}
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">124 đánh giá đã xác thực</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline" onClick={() => { }}>
                                <span className="text-sm font-medium">Xem chi tiết</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Layout: 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        {/* About Section */}
                        <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500">info</span>
                                Mô tả dịch vụ
                            </h3>
                            <div className="text-slate-500 leading-relaxed">
                                <p className="mb-4">
                                    Dịch vụ SEO Tổng thể của BusinessOS cung cấp giải pháp tối ưu hóa công cụ tìm kiếm toàn diện cho doanh nghiệp B2B. Chúng tôi không chỉ tập trung vào từ khóa, mà còn tối ưu hóa trải nghiệm người dùng (UX) và tỷ lệ chuyển đổi (CRO) trên website của bạn.
                                </p>
                                <p>
                                    Với đội ngũ chuyên gia hơn 10 năm kinh nghiệm, chúng tôi cam kết mang lại sự tăng trưởng bền vững, tuân thủ các thuật toán mới nhất của Google và an toàn tuyệt đối cho thương hiệu của bạn.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4">Kết quả bàn giao (Deliverables)</h4>
                                <ul className="grid md:grid-cols-2 gap-3">
                                    {[
                                        'Báo cáo Audit Website chi tiết (100+ tiêu chí)',
                                        'Bộ từ khóa chiến lược (Short-tail & Long-tail)',
                                        'Tối ưu Technical SEO & Core Web Vitals',
                                        'Xây dựng 50+ Backlinks chất lượng cao (DR > 40)',
                                        '10 bài viết chuẩn SEO chuyên sâu/tháng',
                                        'Dashboard theo dõi thứ hạng real-time'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">check_circle</span>
                                            <span className="text-slate-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Timeline / Process Section */}
                        <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-500">timeline</span>
                                Quy trình thực hiện
                            </h3>
                            <div className="relative pl-2 space-y-8">
                                {[
                                    { step: '01', title: 'Audit & Chiến lược', time: 'Tuần 1-2', desc: 'Phân tích hiện trạng website, nghiên cứu đối thủ cạnh tranh và xây dựng bộ từ khóa mục tiêu.', active: true },
                                    { step: '02', title: 'Tối ưu On-page & Technical', time: 'Tuần 3-4', desc: 'Khắc phục các lỗi kỹ thuật, tối ưu hóa cấu trúc site, meta tags, tốc độ tải trang.' },
                                    { step: '03', title: 'Content & Off-page', time: 'Tháng 2 - Tháng 6', desc: 'Sản xuất nội dung chất lượng cao và triển khai chiến dịch xây dựng liên kết an toàn.' },
                                    { step: '04', title: 'Duy trì & Báo cáo', time: 'Hàng tháng', desc: 'Theo dõi biến động thứ hạng, cập nhật thuật toán và gửi báo cáo hiệu quả định kỳ.' }
                                ].map((item, i) => (
                                    <div key={i} className="relative pl-8 z-10">
                                        <div className={`absolute left-0 top-1 size-8 rounded-full ${item.active ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white border-2 border-slate-300'} flex items-center justify-center`}>
                                            <span className={`text-xs font-bold ${item.active ? 'text-blue-500' : 'text-slate-500'}`}>{item.step}</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                            <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                                            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">{item.time}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sticky Pricing Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-xl bg-white shadow-lg border border-slate-100 p-6 flex flex-col gap-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <h3 className="font-bold text-lg text-slate-900">Chọn gói dịch vụ</h3>
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Tiết kiệm 20% năm</span>
                            </div>
                            {/* Tier Selection Tabs */}
                            <div className="bg-slate-100 p-1 rounded-lg flex overflow-x-auto">
                                <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap" onClick={() => { }}>Cơ bản</button>
                                <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md bg-white text-blue-500 shadow-sm whitespace-nowrap" onClick={() => { }}>Nâng cao</button>
                                <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap" onClick={() => { }}>Chuyên nghiệp</button>
                            </div>
                            {/* Price Display */}
                            <div className="flex flex-col gap-1 items-center py-2">
                                <span className="text-sm text-slate-500 font-medium">Gói Nâng cao</span>
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-black text-slate-900 tracking-tight">25.000.000</span>
                                    <span className="text-lg font-bold text-slate-500 mb-1.5">đ</span>
                                </div>
                                <span className="text-sm text-slate-400">/ tháng</span>
                            </div>
                            {/* Features List */}
                            <div className="space-y-3">
                                {['20 Từ khóa chính & 100 Từ khóa phụ', '15 Bài viết chuẩn SEO / tháng', 'Tối ưu Google Maps & Business', 'Báo cáo tuần & tháng', 'Hỗ trợ 24/7 qua Zalo/Email'].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                        <span className="material-symbols-outlined text-blue-500 text-base">check</span>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Action Button */}
                            <Button variant="primary" className="w-full py-3.5 shadow-md flex items-center justify-center gap-2" onClick={() => alert('shopping_cart')}>
                                <span className="material-symbols-outlined">shopping_cart</span>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-slate-200 bg-white py-10">
                <div className="max-w-7xl mx-auto px-10 text-center text-slate-500 text-sm">
                    <p>© 2024 BusinessOS. Bảo lưu mọi quyền.</p>
                </div>
            </footer>
        </div>
    );
}
