"use client";

import { Lightbulb, Calendar, Globe, ChevronRight } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface Job {
    title: string;
    level: string;
    department: string;
    location: string;
}

export default function TeamPage() {
    const team: TeamMember[] = [
        { name: "Nguyễn Văn A", role: "CEO & FOUNDER", image: "" },
        { name: "Trần Thị B", role: "CTO", image: "" },
        { name: "Lê Văn C", role: "HEAD OF DESIGN", image: "" },
        { name: "Phạm Thị D", role: "AI RESEARCH LEAD", image: "" },
    ];

    const values = [
        { icon: Lightbulb, title: "Sáng tạo không giới hạn", desc: "Môi trường khuyến khích những ý tưởng đột phá và khác biệt. Chúng tôi tin rằng mỗi lỗi sai là một bài học để hoàn thiện hơn." },
        { icon: Calendar, title: "Linh hoạt tối đa", desc: "Làm việc từ xa hoặc tại văn phòng, tập trung vào hiệu suất. Thời gian làm việc do bạn chủ động để đảm bảo cân bằng cuộc sống." },
        { icon: Globe, title: "Định hướng AI", desc: "Tiên phong ứng dụng AI vào mọi quy trình vận hành. Bạn sẽ được tiếp cận với những công nghệ mới nhất thế giới." },
    ];

    const jobs: Job[] = [
        { title: "Senior Product Designer", level: "Full-time, Senior Level", department: "Design & UX", location: "TP. Hồ Chí Minh" },
        { title: "AI Machine Learning Engineer", level: "Full-time, Mid-Senior", department: "Engineering", location: "Remote (Vietnam)" },
        { title: "Content Marketing Manager", level: "Full-time", department: "Growth", location: "Hà Nội" },
        { title: "Backend Developer (Go/Node)", level: "Full-time", department: "Engineering", location: "TP. Hồ Chí Minh" },
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
                        <a href="/" className="text-slate-500 hover:text-slate-700">Sản phẩm</a>
                        <a href="/" className="text-slate-500 hover:text-slate-700">Giải pháp</a>
                        <a href="/team" className="text-primary font-medium border-b-2 border-primary pb-1">Đội ngũ</a>
                        <a href="/team" className="text-slate-500 hover:text-slate-700">Tuyển dụng</a>
                        <a href="/chat" className="text-slate-500 hover:text-slate-700">Liên hệ</a>
                    </nav>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium" onClick={() => {}}>Dùng thử miễn phí</button>
            </header>

            {/* Hero */}
            <section className="py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Gặp gỡ những người kiến tạo</h1>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Chúng tôi là tập hợp những chuyên gia đam mê công nghệ, cùng nhau xây dựng tương lai cho quản trị doanh nghiệp.
                </p>
            </section>

            {/* Team Grid */}
            <section className="max-w-4xl mx-auto px-8 mb-20">
                <div className="grid grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <div key={i} className="text-center">
                            <div className="w-full aspect-square bg-slate-200 rounded-xl mb-4 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" />
                            </div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Culture */}
            <section className="max-w-4xl mx-auto px-8 mb-20">
                <h2 className="text-2xl font-bold mb-2">Văn hóa làm việc tại BusinessOS</h2>
                <p className="text-slate-500 mb-8">Nơi tài năng được tỏa sáng và những ý tưởng không bị giới hạn.</p>

                <div className="grid grid-cols-3 gap-6">
                    {values.map((value, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <value.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">{value.title}</h3>
                            <p className="text-sm text-slate-600">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Jobs */}
            <section className="max-w-4xl mx-auto px-8 mb-20">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Gia nhập đội ngũ</h2>
                        <p className="text-slate-500">Hãy cùng chúng tôi xây dựng nền tảng quản trị tương lai.</p>
                    </div>
                    <div className="flex gap-2 text-sm">
                        <button className="px-4 py-2 bg-slate-100 rounded-lg font-medium" onClick={() => {}}>Tất cả (8)</button>
                        <button className="px-4 py-2 hover:bg-slate-100 rounded-lg" onClick={() => {}}>Công nghệ</button>
                        <button className="px-4 py-2 hover:bg-slate-100 rounded-lg" onClick={() => {}}>Thiết kế</button>
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs text-slate-400 uppercase border-b">
                            <th className="py-4">Vị trí</th>
                            <th className="py-4">Phòng ban</th>
                            <th className="py-4">Địa điểm</th>
                            <th className="py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, i) => (
                            <tr key={i} className="border-b hover:bg-slate-50">
                                <td className="py-4">
                                    <p className="font-medium">{job.title}</p>
                                    <p className="text-xs text-slate-400">{job.level}</p>
                                </td>
                                <td className="py-4 text-slate-600">{job.department}</td>
                                <td className="py-4 text-slate-600">{job.location}</td>
                                <td className="py-4">
                                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm" onClick={() => {}}>Ứng tuyển</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Không tìm thấy vị trí phù hợp? <a href="/chat" className="text-primary font-medium">Gửi hồ sơ tự do cho chúng tôi</a>
                </p>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t">
                <div className="max-w-5xl mx-auto px-8 grid grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">B</div>
                            <span className="font-bold">BusinessOS</span>
                        </div>
                        <p className="text-sm text-slate-500">Hệ điều hành thế hệ mới dành cho doanh nghiệp B2B SaaS hiện đại.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Sản phẩm</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li>Tính năng chính</li>
                            <li>Bảng giá</li>
                            <li>Tích hợp</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Công ty</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li>Về chúng tôi</li>
                            <li className="text-primary">Tuyển dụng</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Kết nối</h4>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-full" />
                            <div className="w-8 h-8 bg-slate-100 rounded-full" />
                            <div className="w-8 h-8 bg-slate-100 rounded-full" />
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-8 mt-8 pt-6 border-t flex items-center justify-between text-sm text-slate-400">
                    <span>© 2024 BusinessOS. Đã đăng ký bản quyền.</span>
                    <div className="flex gap-6">
                        <a href="/pricing">Điều khoản</a>
                        <a href="/pricing">Bảo mật</a>
                        <a href="/pricing">Cookie</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
