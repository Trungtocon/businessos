"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { ROUTES, getNavForContext, type NavItem } from "@/config/nav.registry";

const NAV_DEBUG = process.env.NEXT_PUBLIC_NAV_DEBUG === "true";

function NavDebug({ target }: { target: string }) {
    if (!NAV_DEBUG) return null;
    return (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
            → {target}
        </span>
    );
}

export default function CockpitDashboardPage() {
    const router = useRouter();
    const [erpStatus, setErpStatus] = useState<"checking" | "connected" | "disconnected">("checking");

    useEffect(() => {
        fetch(ROUTES.erpnextPing())
            .then((r) => r.json())
            .then((d) => setErpStatus(d.ok ? "connected" : "disconnected"))
            .catch(() => setErpStatus("disconnected"));
    }, []);

    const ceoNav = getNavForContext({ userRole: "ceo", context: "virtual_ceo" });
    const quickActions = ceoNav.filter((n: NavItem) => ["virtual", "bridge"].includes(n.group) && n.id !== "virtual-cockpit");

    const nav = (path: string) => {
        if (NAV_DEBUG) console.log(`[NAV] ${path}`);
        router.push(path);
    };

    return (
        <div className="font-sans text-slate-800 bg-slate-50 h-screen w-screen overflow-hidden selection:bg-blue-200">
            {/* Mesh Gradient Background */}
            <div className="fixed inset-0 z-0 bg-slate-50" style={{
                backgroundImage: `
          radial-gradient(at 40% 20%, hsla(210, 100%, 96%, 1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(189, 100%, 90%, 0.5) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(340, 100%, 92%, 0.5) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(240, 100%, 94%, 0.5) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(22, 100%, 93%, 0.5) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(242, 100%, 93%, 0.5) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343, 100%, 93%, 0.5) 0px, transparent 50%)
        `
            }}></div>

            <div className="relative z-10 flex flex-col h-full w-full">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-6">
                    <div className="flex items-center gap-3 text-slate-800 backdrop-blur-md bg-white/30 px-4 py-2 rounded-2xl border border-white/60 shadow-sm cursor-pointer" onClick={() => nav(ROUTES.home())}>
                        <div className="size-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight pr-1">BusinessOS</h2>
                    </div>
                    <div className="hidden md:flex bg-white/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        <label className="cursor-pointer px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-700 transition-colors" onClick={() => nav(ROUTES.classicProjects())}>
                            <span className="text-sm font-semibold">Truyền thống</span>
                            <input className="hidden" name="view-mode" type="radio" value="traditional" />
                        </label>
                        <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-white text-blue-600 shadow-md shadow-slate-200/50 transition-all border border-white/50">
                            <span className="text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                Chế độ Virtual
                            </span>
                            <input defaultChecked className="hidden" name="view-mode" type="radio" value="virtual" />
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl hover:bg-white/40 transition-colors" onClick={() => nav(ROUTES.notifications())} title="Thông báo">
                            <span className="material-symbols-outlined text-slate-600">notifications</span>
                        </button>
                        <button className="relative p-2 rounded-xl hover:bg-white/40 transition-colors" onClick={() => nav(ROUTES.chat())} title="Tin nhắn">
                            <span className="material-symbols-outlined text-slate-600">chat</span>
                        </button>
                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-white/60 shadow-lg cursor-pointer" onClick={() => nav(ROUTES.settings())} style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOX_vZmeo9sXMQ3SKMBmMrrJScnaPWYoOhJr74HVTwgOsPL5kqbaWlvxgMir2JNdO1xE8up9WWduVl6C5cPAcRoIsIXPcf35dM1SsOHT37NwGgc3xTEuPREMSiP5ggGSvjRobTHd1AzzqVPhEfOLw-BZqpepyKIU11_Ys4xRZdKs1chf8hL9guTROfT2fGpV6Obw3LY6VdoAqYrX0nrZr_aRx1tDYzv608gzedTP7aArxgayLrdLvzCsts8z4YEZzFhgeLaMGI1nM")' }}></div>
                    </div>
                </header>

                {/* Main */}
                <main className="flex-1 flex flex-col items-center justify-center p-6 pb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 blur-3xl rounded-full pointer-events-none"></div>
                    <div className="w-full max-w-6xl bg-white/70 backdrop-blur-[60px] rounded-[48px] border border-white/80 shadow-[0_40px_80px_-20px_rgba(50,50,93,0.15)] p-12 md:p-20 flex flex-col items-center gap-12 md:gap-20 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
                        <div className="text-center space-y-3 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm mb-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Hệ thống: Trực tuyến
                                <span className="mx-1 text-slate-300">|</span>
                                <span className={`text-[10px] ${erpStatus === "connected" ? "text-emerald-600" : erpStatus === "disconnected" ? "text-red-500" : "text-slate-400"}`}>
                                    ERP: {erpStatus === "connected" ? "Kết nối" : erpStatus === "disconnected" ? "Ngắt" : "..."}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight drop-shadow-sm">
                                Chào buổi sáng, CEO
                            </h1>
                        </div>

                        {/* Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full place-items-center relative z-10">
                            {/* Finance - Stable */}
                            <div data-testid="card-finance" className="relative flex flex-col items-center gap-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-500" onClick={() => nav(ROUTES.classicFinance())}>
                                <NavDebug target={ROUTES.classicFinance()} />
                                <div className="relative size-[150px] flex items-center justify-center">
                                    <svg className="size-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
                                        <path className="text-slate-200/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2"></path>
                                        <path className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out group-hover:stroke-[3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="size-[70px] rounded-full bg-emerald-50 flex items-center justify-center shadow-inner text-emerald-600">
                                            <span className="material-symbols-outlined text-[32px]">payments</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-slate-700">Tài chính</h3>
                                    <p className="text-emerald-600 font-semibold mt-2 bg-emerald-100/60 px-4 py-1.5 rounded-full text-sm inline-block shadow-sm backdrop-blur-sm">Ổn định</p>
                                </div>
                            </div>

                            {/* Operations - Warning */}
                            <div data-testid="card-operations" className="relative flex flex-col items-center gap-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-500" onClick={() => nav(ROUTES.classicProjects())}>
                                <NavDebug target={ROUTES.classicProjects()} />
                                <div className="relative size-[150px] flex items-center justify-center">
                                    <svg className="size-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
                                        <path className="text-slate-200/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2"></path>
                                        <path className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-1000 ease-out group-hover:stroke-[3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="60, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="size-[70px] rounded-full bg-amber-50 flex items-center justify-center shadow-inner text-amber-500">
                                            <span className="material-symbols-outlined text-[32px]">engineering</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-slate-700">Vận hành</h3>
                                    <p className="text-amber-600 font-semibold mt-2 bg-amber-100/60 px-4 py-1.5 rounded-full text-sm inline-block shadow-sm backdrop-blur-sm">Cần chú ý</p>
                                </div>
                            </div>

                            {/* Growth - Critical */}
                            <div data-testid="card-growth" className="relative flex flex-col items-center gap-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-500" onClick={() => nav(ROUTES.classicReports())}>
                                <NavDebug target={ROUTES.classicReports()} />
                                <div className="relative size-[150px] flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-rose-500/10 blur-xl animate-pulse"></div>
                                    <svg className="size-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
                                        <path className="text-slate-200/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2"></path>
                                        <path className="text-rose-500 transition-all duration-1000 ease-out group-hover:stroke-[3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="40, 100" strokeLinecap="round" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.5))' }}></path>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="size-[70px] rounded-full bg-rose-50 flex items-center justify-center shadow-inner text-rose-500 border border-rose-100">
                                            <span className="material-symbols-outlined text-[32px] animate-pulse">trending_up</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-slate-700">Tăng trưởng</h3>
                                    <p className="text-rose-600 font-semibold mt-2 bg-rose-100/60 px-4 py-1.5 rounded-full text-sm inline-block shadow-sm backdrop-blur-sm animate-pulse">Nguy hiểm</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap justify-center gap-3 relative z-10">
                            <button className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-sm font-bold text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all shadow-sm flex items-center" onClick={() => nav(ROUTES.virtualSprintLead())}>
                                <span className="material-symbols-outlined text-[16px] mr-1.5 align-text-bottom">group_add</span>
                                Dịch vụ Lead Generation
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-sm font-bold text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition-all shadow-sm flex items-center" onClick={() => nav(ROUTES.virtualSprintContent())}>
                                <span className="material-symbols-outlined text-[16px] mr-1.5 align-text-bottom">edit_document</span>
                                Dịch vụ Content Engine
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-sm font-bold text-green-700 hover:bg-green-100 hover:text-green-800 transition-all shadow-sm flex items-center" onClick={() => nav(ROUTES.virtualSprintReport())}>
                                <span className="material-symbols-outlined text-[16px] mr-1.5 align-text-bottom">trending_up</span>
                                Báo cáo Tăng trưởng Tuần
                            </button>
                            <div className="w-full flex justify-center py-2">
                                <div className="h-px w-32 bg-slate-200/80"></div>
                            </div>
                            <button className="px-4 py-2 rounded-xl bg-white/60 border border-white/80 text-sm font-medium text-slate-600 hover:bg-white/80 hover:text-blue-600 transition-all shadow-sm" onClick={() => nav(ROUTES.virtualApproval())}>
                                <span className="material-symbols-outlined text-[16px] mr-1 align-text-bottom">thumb_up</span>
                                Duyệt nhanh
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-white/60 border border-white/80 text-sm font-medium text-slate-600 hover:bg-white/80 hover:text-blue-600 transition-all shadow-sm" onClick={() => nav(ROUTES.virtualWarRoom())}>
                                <span className="material-symbols-outlined text-[16px] mr-1 align-text-bottom">groups</span>
                                War Room
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-white/60 border border-white/80 text-sm font-medium text-slate-600 hover:bg-white/80 hover:text-blue-600 transition-all shadow-sm" onClick={() => nav(ROUTES.classicMarketplace())}>
                                <span className="material-symbols-outlined text-[16px] mr-1 align-text-bottom">storefront</span>
                                Marketplace
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-white/60 border border-white/80 text-sm font-medium text-slate-600 hover:bg-white/80 hover:text-blue-600 transition-all shadow-sm" onClick={() => nav(ROUTES.classicTeam())}>
                                <span className="material-symbols-outlined text-[16px] mr-1 align-text-bottom">group</span>
                                Đội ngũ
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-white/60 border border-white/80 text-sm font-medium text-slate-600 hover:bg-white/80 hover:text-blue-600 transition-all shadow-sm" onClick={() => nav(ROUTES.search())}>
                                <span className="material-symbols-outlined text-[16px] mr-1 align-text-bottom">search</span>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </main>

                {/* Floating Voice Button */}
                <div className="fixed bottom-10 right-10 z-50">
                    <Button data-testid="btn-voice" aria-label="Voice Command" variant="primary" size="icon" className="group relative size-16 rounded-full shadow-[0_12px_36px_-6px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 border border-blue-400/50" onClick={() => nav(ROUTES.virtualVoice())}>
                        <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping"></div>
                        <span className="material-symbols-outlined text-[30px]">graphic_eq</span>
                        <span className="absolute right-full mr-4 bg-slate-900/90 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl transform translate-x-2 group-hover:translate-x-0">
                            Hỏi trợ lý doanh nghiệp
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

