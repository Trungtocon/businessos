"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const industries = [
    { icon: "storefront", label: "Bán lẻ" },
    { icon: "computer", label: "Công nghệ", selected: true },
    { icon: "factory", label: "Sản xuất" },
    { icon: "support_agent", label: "Dịch vụ" },
    { icon: "school", label: "Giáo dục" },
    { icon: "more_horiz", label: "Khác" },
];

const sizes = [
    { icon: "person", label: "1 - 10", sub: "Nhân sự" },
    { icon: "groups", label: "11 - 50", sub: "Nhân sự", selected: true },
    { icon: "domain", label: "51 - 200", sub: "Nhân sự" },
    { icon: "apartment", label: "200+", sub: "Nhân sự" },
];

export default function OnboardingPage() {
    return (
        <div className="bg-gray-50 min-h-screen text-slate-900 font-sans">
            <div className="flex flex-col min-h-screen">
                {/* Progress */}
                <div className="flex justify-center pt-8 pb-4 px-4 sm:px-10">
                    <div className="w-full max-w-[960px]">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">Bước 1/3: Thiết lập chung</p>
                            <span className="text-xs text-slate-500">33%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "33%" }}></div>
                        </div>
                        <h1 className="text-3xl font-black mt-6">Thiết lập ban đầu</h1>
                        <p className="text-slate-500 mt-2">Hãy cho chúng tôi biết thêm về doanh nghiệp của bạn.</p>
                    </div>
                </div>

                {/* Form */}
                <div className="flex-1 px-4 sm:px-10 pb-24">
                    <div className="max-w-[960px] mx-auto space-y-8">
                        {/* Industry */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Ngành nghề kinh doanh</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {industries.map((ind, i) => (
                                    <button key={i} className={`flex flex-col items-center gap-3 p-4 bg-white rounded-lg ${ind.selected ? "ring-2 ring-blue-500" : "border hover:shadow-md"} transition-all`} onClick={() => {}}>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ind.selected ? "bg-blue-50 text-blue-500" : "bg-slate-50 text-slate-500"}`}>
                                            <span className="material-symbols-outlined text-2xl">{ind.icon}</span>
                                        </div>
                                        <span className={`text-sm ${ind.selected ? "font-semibold text-blue-500" : ""}`}>{ind.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quy mô công ty</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {sizes.map((s, i) => (
                                    <button key={i} className={`flex items-center gap-4 p-4 bg-white rounded-lg ${s.selected ? "ring-2 ring-blue-500" : "border hover:shadow-md"} transition-all`} onClick={() => {}}>
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.selected ? "bg-blue-50 text-blue-500" : "bg-slate-50 text-slate-500"}`}>
                                            <span className="material-symbols-outlined">{s.icon}</span>
                                        </div>
                                        <div>
                                            <span className={`block ${s.selected ? "font-semibold text-blue-500" : ""}`}>{s.label}</span>
                                            <span className="text-xs text-slate-500">{s.sub}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t py-4 px-4 sm:px-10">
                    <div className="max-w-[960px] mx-auto flex justify-between">
                        <Link href="/role"><button className="px-6 py-2.5 text-slate-500 hover:bg-gray-100 rounded-lg" onClick={() => {}}>Quay lại</button></Link>
                        <Link href="/admin"><Button variant="primary" className="px-8 py-2.5" onClick={() => alert('Tiếp tục')}>Tiếp tục</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
