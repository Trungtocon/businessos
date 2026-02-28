"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GoogleIcon, FacebookIcon } from "@/components/ui/icons";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        setIsLoading(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Determine redirect path based on email
        let redirectPath = "/classic/projects"; // Default: Classic Mode
        let roleName = "Business";

        if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("ceo")) {
            redirectPath = "/virtual";
            roleName = "CEO / Virtual Mode";
        } else if (email.toLowerCase().includes("free") || email.toLowerCase().includes("dev")) {
            redirectPath = "/freelancer";
            roleName = "Freelancer";
        }

        toast.success(`Đăng nhập thành công! Chào mừng ${roleName}`, {
            description: `Đang chuyển hướng đến ${redirectPath}...`,
        });

        // Small delay before redirect to show toast
        await new Promise((resolve) => setTimeout(resolve, 500));

        router.push(redirectPath);
    };

    const handleSocialLogin = (provider: string) => {
        setIsLoading(true);
        toast.info(`Đang kết nối với ${provider}...`);

        setTimeout(() => {
            toast.success("Đăng nhập thành công!");
            router.push("/classic/projects");
        }, 1500);
    };

    return (
        <div className="bg-gray-50 font-sans antialiased text-slate-900 transition-colors duration-200">
            <Toaster richColors position="top-center" />

            <div className="min-h-screen w-full flex overflow-hidden">
                {/* Left Side: Illustration */}
                <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 opacity-80"></div>
                    <div className="relative z-10 p-12 text-white max-w-lg">
                        <div className="mb-6">
                            <span className="material-symbols-outlined text-5xl text-blue-400">hub</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 tracking-tight">Kết nối doanh nghiệp toàn diện</h2>
                        <p className="text-lg text-gray-200 leading-relaxed">BusinessOS giúp bạn quản lý vận hành, nhân sự và tài chính trên một nền tảng duy nhất. Tối ưu hóa quy trình làm việc ngay hôm nay.</p>

                        {/* Demo Credentials */}
                        <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <p className="text-sm font-semibold text-white/80 mb-2">🔐 Tài khoản demo:</p>
                            <div className="space-y-1 text-sm text-white/70">
                                <p><span className="text-blue-300">ceo@business.com</span> → Virtual Mode</p>
                                <p><span className="text-green-300">dev@freelancer.com</span> → Freelancer Hub</p>
                                <p><span className="text-yellow-300">user@company.com</span> → Classic Mode</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-gray-50">
                    <div className="w-full max-w-[440px] flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-2 lg:hidden">
                                <span className="material-symbols-outlined text-3xl text-blue-500">hub</span>
                                <span className="font-bold text-xl tracking-tight">BusinessOS</span>
                            </div>
                            <h1 className="text-slate-900 text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Chào mừng trở lại</h1>
                            <p className="text-slate-500 text-base font-normal">Đăng nhập để tiếp tục vào BusinessOS</p>
                        </div>

                        {/* Form */}
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 text-sm font-medium leading-normal" htmlFor="email">Email công việc</label>
                                <Input
                                    className="h-12 px-4"
                                    id="email"
                                    placeholder="name@company.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-slate-900 text-sm font-medium leading-normal" htmlFor="password">Mật khẩu</label>
                                    <a className="text-blue-500 text-sm font-semibold hover:underline" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); router.push('/role'); }}>Quên mật khẩu?</a>
                                </div>
                                <Input
                                    className="h-12 px-4"
                                    id="password"
                                    placeholder="Nhập mật khẩu của bạn"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full h-12 font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    "Đăng nhập"
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">Hoặc đăng nhập với</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {/* Social Login */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white h-12 px-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                onClick={() => handleSocialLogin("Google")}
                                disabled={isLoading}
                            >
                                <GoogleIcon />
                                <span className="text-slate-900 text-sm font-semibold">Google</span>
                            </button>
                            <button
                                className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white h-12 px-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                onClick={() => handleSocialLogin("Facebook")}
                                disabled={isLoading}
                            >
                                <FacebookIcon />
                                <span className="text-slate-900 text-sm font-semibold">Facebook</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-1 mt-4">
                            <p className="text-slate-500 text-sm">Bạn chưa có tài khoản?</p>
                            <a className="text-blue-500 text-sm font-bold hover:underline" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); router.push('/role'); }}>Đăng ký ngay</a>
                        </div>
                    </div>

                    {/* Language Switcher */}
                    <div className="absolute bottom-6 right-6 lg:left-6 lg:right-auto hidden sm:flex items-center gap-2 text-slate-500 text-xs">
                        <span className="material-symbols-outlined text-[16px]">language</span>
                        <span>Tiếng Việt</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
