"use client";

import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
    return (
        <div className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col font-sans">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
                <div className="px-4 md:px-8 h-16 flex items-center justify-between max-w-[1440px] mx-auto w-full">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-blue-500 flex items-center justify-center rounded-lg bg-blue-500/10">
                            <span className="material-symbols-outlined text-[24px]">grid_view</span>
                        </div>
                        <h1 className="text-slate-900 text-lg font-bold tracking-tight">BusinessOS</h1>
                        <span className="hidden md:inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">Doanh nghiệp</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-slate-600 hover:text-blue-500 text-sm font-medium transition-colors" href="/dashboard">Tổng quan</a>
                            <a className="text-slate-600 hover:text-blue-500 text-sm font-medium transition-colors" href="/classic/reports">Báo cáo</a>
                            <a className="text-slate-600 hover:text-blue-500 text-sm font-medium transition-colors" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('Quản lý gói'); }}>Quản lý gói</a>
                        </nav>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-slate-900 leading-none">Minh Hoàng</p>
                                <p className="text-xs text-slate-500 mt-1">Admin</p>
                            </div>
                            <div className="size-9 rounded-full bg-slate-200 bg-center bg-cover border-2 border-white shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSglbb5hC8Zkvp-qLvrLhg3vDyhf1vado9Hg7oSfncsdKUZ1m1zy6N6x4j5ROnKYa4iwTG8aShwZ--DGUPdgpijM5I6qEbzBF3uQnSeWq5zwFFQxDahqz_qvnKNARltGk1oxo3XABrw1F_YX7CqfZ3rspqnQOt18NIGQo3rBcQkD15LAd9Kh7W34yxefO1FtG3A7XdjMc7aKR_tWX1eNUfgBGE9KmHD0o5vG2IYFbgAwwXCcahlPx7mRwfTirfQPJcg59xC-cCB74')" }}></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex mb-6 text-sm">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <a className="inline-flex items-center text-slate-500 hover:text-blue-500" href="/dashboard">
                                <span className="material-symbols-outlined text-[18px] mr-2">home</span>
                                Trang chủ
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                                <a className="ml-1 text-slate-500 hover:text-blue-500 md:ml-2" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('Nâng cấp gói'); }}>Nâng cấp gói</a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                                <span className="ml-1 font-medium text-slate-900 md:ml-2">Thanh toán</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Page Heading */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Thanh toán</h2>
                    <p className="text-slate-500 mt-2 text-base">Vui lòng kiểm tra lại đơn hàng và chọn phương thức thanh toán phù hợp.</p>
                </div>

                {/* Checkout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: Order Summary */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Items Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">shopping_cart</span>
                                    Tóm tắt đơn hàng
                                </h3>
                                <span className="text-sm text-slate-500">Mã đơn: #ORD-2024-8392</span>
                            </div>
                            <div className="p-6">
                                {/* List Item */}
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pb-6 border-b border-dashed border-slate-200">
                                    <div className="size-16 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                        <span className="material-symbols-outlined text-blue-500 text-[32px]">inventory_2</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-semibold text-slate-900">Gói BusinessOS Enterprise (1 năm)</h4>
                                        <p className="text-sm text-slate-500 mt-1">Thời hạn: 12 tháng • Không giới hạn người dùng</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Đang áp dụng ưu đãi</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-lg font-bold text-slate-900">24.000.000 ₫</p>
                                        <p className="text-sm text-slate-400 line-through">30.000.000 ₫</p>
                                    </div>
                                </div>
                                {/* Calculations */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Tạm tính</span>
                                        <span className="font-medium text-slate-900">24.000.000 ₫</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Giảm giá (Khách hàng thân thiết)</span>
                                        <span className="font-medium text-green-600">- 0 ₫</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>VAT (10%)</span>
                                        <span className="font-medium text-slate-900">2.400.000 ₫</span>
                                    </div>
                                </div>
                                {/* Total */}
                                <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-end">
                                    <div>
                                        <p className="text-sm text-slate-500">Tổng thanh toán</p>
                                        <p className="text-xs text-slate-400 mt-1">Đã bao gồm tất cả các loại thuế phí</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl sm:text-3xl font-bold text-blue-500 tracking-tight">26.400.000 ₫</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Support Info */}
                        <div className="rounded-lg bg-blue-50 p-4 border border-blue-100 flex items-start gap-3">
                            <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Bạn cần xuất hóa đơn GTGT?</p>
                                <p className="text-sm text-slate-600 mt-1">Hóa đơn điện tử sẽ được gửi tự động vào email quản trị viên sau khi thanh toán thành công trong vòng 24h.</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Payment Methods */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 sticky top-24">
                            <h3 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">credit_card</span>
                                Phương thức thanh toán
                            </h3>
                            <form className="space-y-3">
                                {/* Option 1: Wallet */}
                                <label className="relative block group cursor-pointer">
                                    <input type="radio" name="payment_method" className="peer sr-only" defaultChecked />
                                    <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-500/50 peer-checked:border-blue-500 peer-checked:bg-blue-500/5 transition-all flex items-start gap-4">
                                        <div className="mt-1 size-5 rounded-full border border-slate-300 bg-white flex items-center justify-center shrink-0 peer-checked:border-blue-500 peer-checked:border-[5px] transition-all"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-slate-900">Ví BusinessOS</span>
                                                <span className="inline-flex items-center rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 uppercase tracking-wide">Khuyên dùng</span>
                                            </div>
                                            <p className="text-sm text-slate-500">Thanh toán nhanh chóng, hoàn tiền 2%.</p>
                                            <div className="mt-2 flex items-center gap-2 text-sm">
                                                <span className="material-symbols-outlined text-slate-400 text-[18px]">account_balance_wallet</span>
                                                <span className="text-slate-600">Số dư khả dụng:</span>
                                                <span className="font-bold text-slate-900">50.000.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                {/* Option 2: VNPAY */}
                                <label className="relative block group cursor-pointer">
                                    <input type="radio" name="payment_method" className="peer sr-only" />
                                    <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-500/50 peer-checked:border-blue-500 peer-checked:bg-blue-500/5 transition-all flex items-start gap-4">
                                        <div className="mt-1 size-5 rounded-full border border-slate-300 bg-white flex items-center justify-center shrink-0 transition-all"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-slate-900">Cổng thanh toán VNPAY</span>
                                                <div className="flex gap-1">
                                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">qr_code_scanner</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500">Quét mã QR từ ứng dụng ngân hàng hoặc ví điện tử.</p>
                                        </div>
                                    </div>
                                </label>
                                {/* Option 3: Bank Transfer */}
                                <label className="relative block group cursor-pointer">
                                    <input type="radio" name="payment_method" className="peer sr-only" />
                                    <div className="p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-500/50 peer-checked:border-blue-500 peer-checked:bg-blue-500/5 transition-all flex items-start gap-4">
                                        <div className="mt-1 size-5 rounded-full border border-slate-300 bg-white flex items-center justify-center shrink-0 transition-all"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-slate-900">Chuyển khoản ngân hàng</span>
                                            </div>
                                            <p className="text-sm text-slate-500">Chuyển khoản thủ công tới tài khoản Vietcombank của chúng tôi.</p>
                                        </div>
                                    </div>
                                </label>
                                <div className="pt-6 mt-6 border-t border-slate-100">
                                    <Button variant="primary" className="w-full py-3.5 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group" onClick={() => alert('Xác nhận thanh toán')}>
                                        <span>Xác nhận thanh toán</span>
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </Button>
                                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">lock</span>
                                        <span>Thanh toán được bảo mật bởi chuẩn SSL 256-bit</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Trust Badges */}
                        <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-slate-500">verified_user</span>
                                <span className="text-xs font-semibold text-slate-500">Thanh toán bảo mật</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="mt-auto py-8 bg-white border-t border-slate-200">
                <div className="max-w-[1200px] mx-auto px-8 text-center">
                    <p className="text-sm text-slate-500">© 2024 BusinessOS Technology JSC. Bảo lưu mọi quyền.</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <a className="text-xs text-slate-400 hover:text-blue-500" href="/pricing">Điều khoản dịch vụ</a>
                        <a className="text-xs text-slate-400 hover:text-blue-500" href="/pricing">Chính sách bảo mật</a>
                        <a className="text-xs text-slate-400 hover:text-blue-500" href="/chat">Hỗ trợ</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
