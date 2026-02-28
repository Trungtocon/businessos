"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function OtpPage() {
    return (
        <div className="bg-gray-50 font-sans text-slate-900 antialiased">
            {/* Main Container */}
            <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gray-50 transition-colors duration-300">
                {/* Background Decoration */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]"></div>
                    <div className="absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-purple-400/20 blur-[120px]"></div>
                </div>

                <div className="relative z-10 flex h-full grow flex-col items-center justify-center p-4">
                    {/* Card Container */}
                    <div className="w-full max-w-[480px] flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <Link href="/login" className="group flex items-center gap-1 text-slate-500 hover:text-blue-500 transition-colors text-sm font-medium">
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                <span>Quay lại</span>
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500">
                                    <span className="material-symbols-outlined">business_center</span>
                                </div>
                                <span className="font-bold text-lg tracking-tight text-slate-900">BusinessOS</span>
                            </div>
                        </div>

                        {/* Page Heading */}
                        <div className="flex flex-col gap-2 text-center mt-2">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Xác thực bảo mật</h1>
                            <p className="text-slate-500 text-sm font-normal leading-relaxed px-4">
                                Vui lòng nhập mã OTP 6 số được gửi tới email <span className="font-medium text-slate-700">user@company.com</span> của bạn.
                            </p>
                        </div>

                        {/* OTP Inputs */}
                        <div className="flex justify-center py-4">
                            <fieldset className="flex gap-3 sm:gap-4">
                                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                                    <input
                                        key={i}
                                        autoComplete="one-time-code"
                                        autoFocus={i === 0}
                                        className="flex h-12 w-10 sm:h-14 sm:w-12 rounded-lg text-center bg-slate-50 border border-slate-200 text-slate-900 text-xl font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        inputMode="numeric"
                                        maxLength={1}
                                        pattern="[0-9]*"
                                        type="text"
                                    />
                                ))}
                            </fieldset>
                        </div>

                        {/* Timer */}
                        <div className="flex justify-center">
                            <p className="text-slate-500 text-sm font-medium leading-normal flex items-center gap-1 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                Gửi lại mã sau <span className="text-blue-500 font-bold w-[24px] text-center">59s</span>
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-col gap-4 mt-2">
                            <Link href="/onboarding">
                                <Button variant="primary" className="w-full h-12 font-bold shadow-md shadow-blue-500/20" onClick={() => alert('Xác nhận')}>Xác nhận</Button>
                            </Link>
                            <Link href="/login" className="text-center text-sm font-medium text-slate-500 hover:text-blue-500 transition-colors underline decoration-slate-300 underline-offset-4 hover:decoration-blue-500">
                                Quay lại Đăng nhập
                            </Link>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">© 2024 BusinessOS Platform. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
