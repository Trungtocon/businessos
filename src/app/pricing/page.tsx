"use client";

import { Check, Minus } from "lucide-react";

interface PlanFeature {
    name: string;
    starter: string | boolean;
    business: string | boolean;
    enterprise: string | boolean;
}

export default function PricingPage() {
    const plans = [
        {
            name: "STARTER",
            price: "0đ",
            period: "/tháng",
            cta: "Bắt đầu ngay",
            features: [
                "Quản lý công việc cơ bản",
                "Tối đa 5 người dùng",
                "1GB dung lượng lưu trữ",
                "Báo cáo hiệu suất đơn giản"
            ],
            popular: false
        },
        {
            name: "BUSINESS",
            price: "990k",
            period: "/tháng",
            cta: "Bắt đầu ngay",
            features: [
                "Tất cả tính năng Starter",
                "Không giới hạn người dùng",
                "50GB dung lượng lưu trữ",
                "Tự động hóa quy trình (Flows)",
                "Hỗ trợ ưu tiên 24/7"
            ],
            popular: true
        },
        {
            name: "ENTERPRISE",
            price: "Liên hệ",
            period: "",
            cta: "Liên hệ tư vấn",
            features: [
                "Toàn bộ tính năng Business",
                "Hệ thống API tùy chỉnh (REST/GraphQL)",
                "Bảo mật doanh nghiệp nâng cao (SSO)",
                "Quản lý tài khoản (Account Manager)",
                "Đào tạo tận nơi cho đội ngũ"
            ],
            popular: false
        }
    ];

    const comparisonFeatures: PlanFeature[] = [
        { name: "Quản lý dự án đa kênh", starter: true, business: true, enterprise: true },
        { name: "Tự động hóa (Automations)", starter: false, business: true, enterprise: true },
        { name: "Dung lượng lưu trữ", starter: "1 GB", business: "50 GB", enterprise: "Không giới hạn" },
        { name: "Hỗ trợ khách hàng", starter: "Email (48h)", business: "Ưu tiên (2h)", enterprise: "24/7 Riêng biệt" },
        { name: "Single Sign-On (SSO)", starter: false, business: false, enterprise: true },
    ];

    const faqs = [
        { q: "Tôi có thể thay đổi gói dịch vụ sau này không?", a: "Có, bạn có thể nâng cấp hoặc hạ cấp gói dịch vụ bất kỳ lúc nào ngay trong phần cài đặt tài khoản. Khoản chênh lệch sẽ được tính toán tự động." },
        { q: "Dữ liệu của tôi có được bảo mật không?", a: "Chắc chắn. Chúng tôi sử dụng mã hóa AES-256 tiêu chuẩn ngân hàng và tuân thủ các quy định bảo mật quốc tế khắt khe nhất." },
        { q: "Có chiết khấu nếu thanh toán theo năm không?", a: "Có, khi thanh toán theo năm, bạn sẽ được giảm trực tiếp 20% so với tổng chi phí thanh toán hàng tháng." }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">B</div>
                        <span className="font-bold">BusinessOS</span>
                    </div>
                    <nav className="flex gap-6 text-sm">
                        <a href="/" className="text-slate-500 hover:text-slate-700">Tính năng</a>
                        <a href="/" className="text-slate-500 hover:text-slate-700">Giải pháp</a>
                        <a href="/pricing" className="text-primary font-medium border-b-2 border-primary pb-1">Bảng giá</a>
                        <a href="/team" className="text-slate-500 hover:text-slate-700">Tài liệu</a>
                    </nav>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium" onClick={() => {}}>Dùng thử miễn phí</button>
                    <button className="px-4 py-2 border rounded-lg text-sm" onClick={() => {}}>Đăng nhập</button>
                </div>
            </header>

            {/* Hero */}
            <section className="py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Lựa chọn gói giải pháp phù hợp</h1>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Các gói cước linh hoạt được thiết kế để tối ưu hóa quy trình làm việc và thúc đẩy tăng trưởng cho doanh nghiệp bạn.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="max-w-5xl mx-auto px-8 mb-20">
                <div className="grid grid-cols-3 gap-6">
                    {plans.map((plan, i) => (
                        <div key={i} className={`rounded-2xl border p-6 relative ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : ""}`}>
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                    PHỔ BIẾN NHẤT
                                </span>
                            )}
                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{plan.name}</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-slate-400">{plan.period}</span>
                            </div>
                            <button className={`w-full py-3 rounded-lg font-medium mb-6 ${plan.popular ? "bg-primary text-white" : "border hover:bg-slate-50"}`} onClick={() => {}}>
                                {plan.cta}
                            </button>
                            <ul className="space-y-3">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                                        <Check className="w-4 h-4 text-primary" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="max-w-4xl mx-auto px-8 mb-20">
                <h2 className="text-2xl font-bold text-center mb-2">So sánh tính năng chi tiết</h2>
                <p className="text-slate-500 text-center mb-8">Khám phá mọi ngóc ngách của hệ điều hành BusinessOS</p>

                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs text-slate-400 uppercase border-b">
                            <th className="py-4">Tính năng</th>
                            <th className="py-4 text-center">Starter</th>
                            <th className="py-4 text-center text-primary">Business</th>
                            <th className="py-4 text-center">Enterprise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFeatures.map((f, i) => (
                            <tr key={i} className="border-b">
                                <td className="py-4">{f.name}</td>
                                <td className="py-4 text-center">
                                    {typeof f.starter === "boolean" ? (f.starter ? <Check className="w-4 h-4 text-primary mx-auto" /> : <Minus className="w-4 h-4 text-slate-300 mx-auto" />) : f.starter}
                                </td>
                                <td className="py-4 text-center text-primary font-medium">
                                    {typeof f.business === "boolean" ? (f.business ? <Check className="w-4 h-4 text-primary mx-auto" /> : <Minus className="w-4 h-4 text-slate-300 mx-auto" />) : f.business}
                                </td>
                                <td className="py-4 text-center">
                                    {typeof f.enterprise === "boolean" ? (f.enterprise ? <Check className="w-4 h-4 text-primary mx-auto" /> : <Minus className="w-4 h-4 text-slate-300 mx-auto" />) : f.enterprise}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto px-8 mb-20">
                <h2 className="text-2xl font-bold text-center mb-8">Câu hỏi thường gặp</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-6">
                            <h3 className="font-bold mb-2">{faq.q}</h3>
                            <p className="text-sm text-slate-600">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 border-t flex items-center justify-between px-8 text-sm text-slate-400">
                <span><strong className="text-slate-600">BusinessOS</strong> © 2024</span>
                <div className="flex gap-6">
                    <a href="/pricing">Điều khoản</a>
                    <a href="/pricing">Bảo mật</a>
                    <a href="/chat">Hỗ trợ</a>
                    <a href="/chat">Liên hệ</a>
                </div>
            </footer>
        </div>
    );
}
