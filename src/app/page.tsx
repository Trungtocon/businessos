"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Feature comparison data
const modeFeatures = {
    classic: {
        title: "Classic Mode",
        subtitle: "Dành cho CEO & Manager",
        description: "Giao diện data-dense với bảng số, biểu đồ và báo cáo chi tiết. Kiểm soát toàn diện doanh nghiệp.",
        color: "blue",
        features: [
            "Dashboard đa chiều",
            "Báo cáo tài chính real-time",
            "Quản lý dự án Kanban",
            "Phân tích AI tự động",
        ],
        icon: "analytics",
        image: "/classic-preview.png",
    },
    virtual: {
        title: "Virtual Mode",
        subtitle: "Dành cho CEO bận rộn",
        description: "Giao diện tối giản, điều khiển bằng giọng nói và cử chỉ. Quyết định trong tích tắc.",
        color: "cyan",
        features: [
            "Swipe-to-Pay phê duyệt",
            "Voice Command AI",
            "War Room hội chẩn",
            "Zero-click operations",
        ],
        icon: "auto_awesome",
        image: "/virtual-preview.png",
    },
};

// Pricing plans
const pricingPlans = [
    {
        name: "Starter",
        price: "Miễn phí",
        priceNote: "Mãi mãi",
        description: "Dành cho cá nhân và startup mới bắt đầu",
        features: [
            "1 người dùng",
            "3 dự án đồng thời",
            "Classic Mode cơ bản",
            "5GB lưu trữ",
            "Hỗ trợ email",
        ],
        cta: "Bắt đầu ngay",
        popular: false,
    },
    {
        name: "Business",
        price: "$49",
        priceNote: "/tháng",
        description: "Dành cho SME và team đang phát triển",
        features: [
            "Tối đa 20 người dùng",
            "Dự án không giới hạn",
            "Classic + Virtual Mode",
            "100GB lưu trữ",
            "AI Assistant nâng cao",
            "API integration",
            "Hỗ trợ 24/7",
        ],
        cta: "Dùng thử 14 ngày",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Liên hệ",
        priceNote: "Tùy chỉnh",
        description: "Dành cho tập đoàn và doanh nghiệp lớn",
        features: [
            "Người dùng không giới hạn",
            "On-premise deployment",
            "White-label branding",
            "Lưu trữ không giới hạn",
            "AI training riêng",
            "SLA 99.99%",
            "Account Manager riêng",
        ],
        cta: "Liên hệ tư vấn",
        popular: false,
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="relative z-50 sticky top-0 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight">BusinessOS</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Tính năng</a>
                        <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Bảng giá</a>
                        <a href="#demo" className="text-sm text-white/60 hover:text-white transition-colors">Demo</a>
                        <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">Liên hệ</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/signin" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                            Đăng nhập
                        </Link>
                        <Link href="/signin" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all">
                            Dùng thử miễn phí
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto mb-16"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-white/70">Nền tảng Dual-View đầu tiên tại Việt Nam</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                                Kết nối trí tuệ
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                Vận hành thông minh
                            </span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Nền tảng <strong className="text-white">Dual-View</strong> đầu tiên cho CEO và Freelancer.
                            Chuyển đổi linh hoạt giữa Classic Mode và Virtual Mode để tối ưu hiệu suất làm việc.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Link href="/signin" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all flex items-center gap-2">
                                Dùng thử miễn phí
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2" onClick={() => {}}>
                                <span className="material-symbols-outlined text-cyan-400">play_circle</span>
                                Xem Demo
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center justify-center gap-4 text-sm text-white/50">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="size-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-900"
                                        style={{ backgroundImage: `url(https://i.pravatar.cc/80?img=${i + 10})`, backgroundSize: "cover" }}
                                    />
                                ))}
                            </div>
                            <span>
                                Hơn <strong className="text-white">5,000+</strong> doanh nghiệp đã tin dùng
                            </span>
                        </div>
                    </motion.div>

                    {/* 3D Mockup Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative max-w-5xl mx-auto"
                    >
                        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
                            {/* Mockup Frame */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 p-3">
                                {/* Browser Chrome */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex gap-1.5">
                                        <div className="size-3 rounded-full bg-red-500/60" />
                                        <div className="size-3 rounded-full bg-yellow-500/60" />
                                        <div className="size-3 rounded-full bg-green-500/60" />
                                    </div>
                                    <div className="flex-1 h-7 bg-slate-700/50 rounded-lg mx-12" />
                                </div>
                                {/* Dashboard Preview */}
                                <div className="h-full bg-slate-900 rounded-xl p-4 grid grid-cols-4 gap-4">
                                    {/* Sidebar */}
                                    <div className="col-span-1 bg-slate-800/50 rounded-lg p-3 space-y-3">
                                        <div className="h-8 w-24 bg-blue-500/30 rounded" />
                                        <div className="h-6 w-full bg-white/5 rounded" />
                                        <div className="h-6 w-full bg-cyan-500/20 rounded border-l-2 border-cyan-400" />
                                        <div className="h-6 w-full bg-white/5 rounded" />
                                        <div className="h-6 w-full bg-white/5 rounded" />
                                    </div>
                                    {/* Main Content */}
                                    <div className="col-span-3 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1 h-24 bg-gradient-to-br from-blue-600/30 to-blue-600/10 rounded-xl" />
                                            <div className="flex-1 h-24 bg-gradient-to-br from-cyan-600/30 to-cyan-600/10 rounded-xl" />
                                            <div className="flex-1 h-24 bg-gradient-to-br from-emerald-600/30 to-emerald-600/10 rounded-xl" />
                                        </div>
                                        <div className="h-40 bg-slate-800/50 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                            {/* Floating badges */}
                            <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">verified</span>
                                AI-Powered
                            </div>
                            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">speed</span>
                                Real-time
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dual-View Features Section */}
            <section id="features" className="relative z-10 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
                            Dual-View Technology
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Hai chế độ. <span className="text-cyan-400">Một nền tảng.</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Chuyển đổi linh hoạt giữa giao diện chi tiết và giao diện tối giản tùy theo ngữ cảnh công việc.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Classic Mode Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group relative bg-gradient-to-br from-blue-950/50 to-slate-900/50 rounded-3xl border border-blue-500/20 p-8 hover:border-blue-500/40 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <span className="material-symbols-outlined text-3xl text-white">{modeFeatures.classic.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{modeFeatures.classic.title}</h3>
                                    <p className="text-blue-400 text-sm">{modeFeatures.classic.subtitle}</p>
                                </div>
                            </div>
                            <p className="text-white/60 mb-6">{modeFeatures.classic.description}</p>
                            <ul className="space-y-3 mb-8">
                                {modeFeatures.classic.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <span className="material-symbols-outlined text-blue-400 text-lg">check_circle</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            {/* Preview */}
                            <div className="h-48 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
                                <div className="h-full p-4 grid grid-cols-3 gap-2">
                                    <div className="col-span-1 bg-slate-800/50 rounded-lg" />
                                    <div className="col-span-2 space-y-2">
                                        <div className="h-1/2 bg-blue-600/20 rounded-lg" />
                                        <div className="h-1/2 grid grid-cols-2 gap-2">
                                            <div className="bg-slate-800/50 rounded-lg" />
                                            <div className="bg-slate-800/50 rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Virtual Mode Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group relative bg-gradient-to-br from-cyan-950/50 to-slate-900/50 rounded-3xl border border-cyan-500/20 p-8 hover:border-cyan-500/40 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="size-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                    <span className="material-symbols-outlined text-3xl text-white">{modeFeatures.virtual.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{modeFeatures.virtual.title}</h3>
                                    <p className="text-cyan-400 text-sm">{modeFeatures.virtual.subtitle}</p>
                                </div>
                            </div>
                            <p className="text-white/60 mb-6">{modeFeatures.virtual.description}</p>
                            <ul className="space-y-3 mb-8">
                                {modeFeatures.virtual.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <span className="material-symbols-outlined text-cyan-400 text-lg">check_circle</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            {/* Preview */}
                            <div className="h-48 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
                                <div className="text-center">
                                    <div className="size-20 mx-auto mb-4 rounded-full border-2 border-cyan-500/50 flex items-center justify-center bg-cyan-500/10">
                                        <span className="material-symbols-outlined text-4xl text-cyan-400">mic</span>
                                    </div>
                                    <p className="text-white/40 text-sm">Voice-first interface</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 py-24 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
                            Bảng giá linh hoạt
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Chọn gói phù hợp với <span className="text-emerald-400">doanh nghiệp bạn</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Bắt đầu miễn phí, nâng cấp khi cần. Không có chi phí ẩn.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative rounded-3xl p-8 ${plan.popular
                                    ? "bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50 shadow-xl shadow-blue-500/10"
                                    : "bg-slate-800/30 border border-white/10"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-sm font-semibold">
                                        Phổ biến nhất
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-white/50">{plan.priceNote}</span>
                                    </div>
                                    <p className="text-white/50 text-sm">{plan.description}</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-white/80 text-sm">
                                            <span className={`material-symbols-outlined text-lg ${plan.popular ? "text-cyan-400" : "text-white/40"}`}>check</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                        }`}
                                 onClick={() => {}}>
                                    {plan.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="relative z-10 pt-16 pb-8 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">B</span>
                                </div>
                                <span className="font-bold text-xl">BusinessOS</span>
                            </div>
                            <p className="text-white/50 text-sm mb-4">
                                Nền tảng vận hành doanh nghiệp thông minh, kết nối CEO và Freelancer trên cùng một hệ sinh thái.
                            </p>
                            <div className="flex gap-3">
                                <a href="javascript:void(0)" className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('public'); }}>
                                    <span className="material-symbols-outlined">public</span>
                                </a>
                                <a href="javascript:void(0)" className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors" onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('mail'); }}>
                                    <span className="material-symbols-outlined">mail</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Sản phẩm</h4>
                            <ul className="space-y-2 text-sm text-white/50">
                                <li><a href="/classic/projects" className="hover:text-white transition-colors">Classic Mode</a></li>
                                <li><a href="/virtual" className="hover:text-white transition-colors">Virtual Mode</a></li>
                                <li><a href="/search" className="hover:text-white transition-colors">AI Assistant</a></li>
                                <li><a href="/classic/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Công ty</h4>
                            <ul className="space-y-2 text-sm text-white/50">
                                <li><a href="/team" className="hover:text-white transition-colors">Về chúng tôi</a></li>
                                <li><a href="/chat" className="hover:text-white transition-colors">Liên hệ</a></li>
                                <li><a href="/team" className="hover:text-white transition-colors">Tuyển dụng</a></li>
                                <li><a href="/pricing" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Pháp lý</h4>
                            <ul className="space-y-2 text-sm text-white/50">
                                <li><a href="/pricing" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
                                <li><a href="/pricing" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
                                <li><a href="/pricing" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                        <span>© 2024 BusinessOS Corporation. Bảo lưu mọi quyền.</span>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-green-500" />
                            <span>Hệ thống hoạt động bình thường</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
