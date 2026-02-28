"use client";

import { Button } from "@/components/ui/Button";

export default function FeedbackPage() {
    return (
        <div className="font-sans bg-gray-100 overflow-hidden relative min-h-screen flex flex-col">
            {/* Blurred Background */}
            <div aria-hidden="true" className="absolute inset-0 z-0 flex flex-col opacity-100 pointer-events-none filter blur-[6px] select-none">
                <div className="h-16 w-full bg-white border-b border-gray-200 flex items-center px-6 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    </div>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-4 gap-4">
                        <div className="h-10 w-full bg-blue-500/10 rounded-lg"></div>
                        <div className="h-6 w-3/4 bg-gray-100 rounded"></div>
                        <div className="h-6 w-full bg-gray-100 rounded"></div>
                        <div className="h-6 w-5/6 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex-1 p-8 bg-gray-100">
                        <div className="w-full h-full border border-gray-200 rounded-xl bg-white p-6">
                            <div className="flex justify-between mb-8">
                                <div className="h-8 w-48 bg-gray-200 rounded"></div>
                                <div className="h-8 w-24 bg-green-100 text-green-700 rounded px-3 py-1 text-sm font-medium flex items-center justify-center">Hoàn thành</div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-gray-100 rounded"></div>
                                <div className="h-4 w-full bg-gray-100 rounded"></div>
                                <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay Backdrop */}
            <div className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm"></div>

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <div className="relative w-full max-w-[520px] transform rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col">
                    {/* Close Button */}
                    <button className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500" onClick={() => {}}>
                        <span className="sr-only">Close</span>
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    {/* Modal Content */}
                    <div className="flex flex-col items-center px-6 pt-10 pb-8 text-center sm:px-10">
                        {/* Success Icon */}
                        <div className="mx-auto flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-50 mb-6 ring-8 ring-green-50/50">
                            <span className="material-symbols-outlined text-5xl text-green-600" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>check_circle</span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 mb-2">Dự án hoàn thành!</h2>

                        {/* Body Text */}
                        <p className="text-base text-slate-500 max-w-sm mx-auto mb-8">
                            Bạn cảm thấy thế nào về chất lượng công việc của Freelancer trong dự án này?
                        </p>

                        {/* Star Rating Section */}
                        <div className="w-full mb-8">
                            <div className="flex justify-center gap-3" role="group" aria-label="Rating">
                                {[1, 2, 3, 4].map((i) => (
                                    <button key={i} className="group transition-transform hover:scale-110" onClick={() => {}}>
                                        <span className="material-symbols-outlined text-5xl text-amber-400 drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </button>
                                ))}
                                <button className="group transition-transform hover:scale-110" onClick={() => {}}>
                                    <span className="material-symbols-outlined text-5xl text-gray-300 hover:text-yellow-400 transition-colors">star</span>
                                </button>
                            </div>
                            <p className="mt-2 text-sm font-medium text-blue-600">Rất tốt!</p>
                        </div>

                        {/* Text Field */}
                        <div className="w-full mb-8 text-left">
                            <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="feedback">Nhận xét chi tiết</label>
                            <div className="relative">
                                <textarea className="block w-full rounded-xl border-gray-200 bg-gray-100 py-3 px-4 text-slate-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none" id="feedback" name="feedback" placeholder="Hãy chia sẻ thêm về trải nghiệm của bạn (tiến độ, kỹ năng, thái độ)..." rows={4}></textarea>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button variant="secondary" className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 sm:w-auto sm:min-w-[100px]" onClick={() => alert('Bỏ qua')}>
                                Bỏ qua
                            </Button>
                            <Button variant="primary" className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 sm:w-auto sm:min-w-[140px]" onClick={() => alert('Gửi đánh giá')}>
                                Gửi đánh giá
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
