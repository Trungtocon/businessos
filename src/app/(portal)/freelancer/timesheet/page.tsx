"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStore } from "@/lib/store";
import { formatVND } from "@/lib/mock-data";

// ============================================
// Constants
// ============================================
const DEFAULT_HOURLY_RATE = 200000; // 200,000 VND/hour

// ============================================
// useTimer Hook with Earnings Calculation
// ============================================
function useTimer(initialSeconds = 0, hourlyRate = DEFAULT_HOURLY_RATE) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
        }
    }, [isRunning]);

    const stop = useCallback(() => {
        setIsRunning(false);
    }, []);

    const reset = useCallback(() => {
        setIsRunning(false);
        setSeconds(0);
    }, []);

    const toggle = useCallback(() => {
        if (isRunning) {
            stop();
        } else {
            start();
        }
    }, [isRunning, start, stop]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    // Format seconds to HH:MM:SS
    const formatTime = useCallback((totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }, []);

    // Calculate current session earnings in real-time
    const currentEarnings = useMemo(() => {
        return (seconds / 3600) * hourlyRate;
    }, [seconds, hourlyRate]);

    return {
        seconds,
        isRunning,
        formatted: formatTime(seconds),
        currentEarnings,
        hourlyRate,
        start,
        stop,
        reset,
        toggle,
    };
}

// ============================================
// Timesheet Entries Data with earnings
// ============================================
interface TimesheetEntry {
    id: string;
    project: string;
    color: string;
    task: string;
    start: string;
    end: string;
    total: string;
    earnings: number;
}

const initialTimesheetEntries: TimesheetEntry[] = [
    { id: "1", project: "BusinessOS", color: "bg-blue-500", task: "Thiết kế UI màn hình F05", start: "08:00", end: "11:30", total: "03:30:00", earnings: 700000 },
    { id: "2", project: "E-commerce App", color: "bg-indigo-500", task: "Fix bug giỏ hàng", start: "13:30", end: "15:30", total: "02:00:00", earnings: 400000 },
    { id: "3", project: "Họp Team", color: "bg-gray-400", task: "Daily Scrum Meeting", start: "16:00", end: "17:00", total: "01:00:00", earnings: 200000 },
];

// ============================================
// Timesheet Page Component
// ============================================
export default function TimesheetPage() {
    const [hourlyRate] = useState(DEFAULT_HOURLY_RATE);
    const [selectedProject, setSelectedProject] = useState("1");
    const [taskDescription, setTaskDescription] = useState("Thiết kế màn hình Dashboard mới");
    const [entries, setEntries] = useState<TimesheetEntry[]>(initialTimesheetEntries);

    const timer = useTimer(0, hourlyRate);

    // Get wallet actions from store
    const pendingBalance = useStore((state) => state.wallet.pendingBalance);

    // Calculate totals
    const totalDailyHours = useMemo(() => {
        const totalSeconds = entries.reduce((acc, entry) => {
            const [h, m, s] = entry.total.split(":").map(Number);
            return acc + h * 3600 + m * 60 + s;
        }, 0);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }, [entries]);

    const totalDailyEarnings = useMemo(() => {
        return entries.reduce((acc, entry) => acc + entry.earnings, 0);
    }, [entries]);

    // Handle stop and save session
    const handleStopSession = useCallback(() => {
        if (timer.seconds > 0) {
            const sessionEarnings = timer.currentEarnings;
            const store = useStore.getState();

            // Add to pending balance
            store.setPending(store.wallet.pendingBalance + sessionEarnings);

            // Add notification
            store.addNotification({
                type: "payment",
                title: "Ca làm việc kết thúc",
                description: `Bạn đã kiếm được ${formatVND(sessionEarnings)}`,
                timestamp: new Date().toISOString(),
                read: false,
            });

            // Add to entries
            const now = new Date();
            const startTime = new Date(now.getTime() - timer.seconds * 1000);
            const newEntry: TimesheetEntry = {
                id: Date.now().toString(),
                project: selectedProject === "1" ? "BusinessOS" : selectedProject === "2" ? "E-commerce App" : "Họp Team",
                color: selectedProject === "1" ? "bg-blue-500" : selectedProject === "2" ? "bg-indigo-500" : "bg-gray-400",
                task: taskDescription,
                start: startTime.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                end: now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                total: timer.formatted,
                earnings: sessionEarnings,
            };

            setEntries((prev) => [newEntry, ...prev]);

            // Show success toast
            toast.success("Ca làm việc kết thúc!", {
                description: `Bạn đã kiếm được ${formatVND(sessionEarnings)}`,
                icon: "💰",
            });

            // Reset timer
            timer.reset();
        } else {
            timer.stop();
        }
    }, [timer, selectedProject, taskDescription]);

    // Handle toggle with custom stop logic
    const handleToggle = useCallback(() => {
        if (timer.isRunning) {
            handleStopSession();
        } else {
            timer.start();
        }
    }, [timer, handleStopSession]);

    return (
        <div className="h-screen flex overflow-hidden font-sans bg-white text-slate-900">
            <Toaster richColors position="top-center" />

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-slate-200 rounded-lg size-10 shrink-0 shadow-sm"></div>
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-slate-900 text-base font-bold leading-tight truncate">BusinessOS</h1>
                        <p className="text-blue-500 text-xs font-medium leading-normal truncate">Freelancer</p>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-gray-50" href="/freelancer">
                        <span className="material-symbols-outlined text-[22px]">dashboard</span>
                        <span className="text-sm font-medium">Tổng quan</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-gray-50" href="/freelancer/projects">
                        <span className="material-symbols-outlined text-[22px]">folder</span>
                        <span className="text-sm font-medium">Dự án</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-500 font-semibold" href="/freelancer/timesheet">
                        <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
                        <span className="text-sm">Bảng chấm công</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-gray-50" href="/freelancer/invoices">
                        <span className="material-symbols-outlined text-[22px]">payments</span>
                        <span className="text-sm font-medium">Hóa đơn</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-gray-50" href="/classic/reports">
                        <span className="material-symbols-outlined text-[22px]">bar_chart</span>
                        <span className="text-sm font-medium">Báo cáo</span>
                    </a>
                </nav>

                {/* Pending Balance Card */}
                <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-green-600 text-lg">account_balance_wallet</span>
                        <span className="text-xs font-medium text-green-700">Thu nhập chờ duyệt</span>
                    </div>
                    <p className="text-xl font-bold text-green-700">{formatVND(pendingBalance)}</p>
                </div>

                <div className="p-4 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-3 p-2">
                        <div className="size-9 rounded-full bg-slate-200"></div>
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-slate-900">Minh Hoàng</p>
                            <p className="text-[11px] text-slate-500">Freelancer Pro</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-14 flex items-center justify-between px-8 bg-white border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="hover:text-blue-500 cursor-pointer">Freelancer</span>
                        <span className="text-gray-300">/</span>
                        <span className="font-medium text-slate-900">Bảng chấm công</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Hourly Rate Badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
                            <span className="material-symbols-outlined text-blue-500 text-lg">payments</span>
                            <span className="text-sm font-medium text-blue-700">{formatVND(hourlyRate)}/giờ</span>
                        </div>
                        <button className="text-gray-400 hover:text-slate-900" onClick={() => {}}>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="text-gray-400 hover:text-slate-900" onClick={() => {}}>
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="max-w-4xl mx-auto px-8 py-10 space-y-12">
                        {/* Timer Section */}
                        <section className="flex flex-col items-center">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">Ghi nhận thời gian</h2>
                                <p className="text-slate-500 text-sm">
                                    {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                </p>
                            </div>

                            {/* Timer Display */}
                            <div className="relative flex items-center justify-center mb-10">
                                <div
                                    className={`w-72 h-72 rounded-full border bg-white flex items-center justify-center shadow-sm transition-all duration-300 ${timer.isRunning
                                        ? "border-green-500/30 shadow-green-100"
                                        : "border-blue-500/20"
                                        }`}
                                >
                                    <div
                                        className={`w-[280px] h-[280px] rounded-full border-[1.5px] flex flex-col items-center justify-center transition-colors duration-300 ${timer.isRunning ? "border-green-500" : "border-blue-500"
                                            }`}
                                    >
                                        {/* Timer Value */}
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-extrabold text-slate-900 tabular-nums">
                                                {timer.formatted}
                                            </span>
                                        </div>

                                        {/* Real-time Earnings Display */}
                                        <div className={`mt-3 px-4 py-1.5 rounded-full ${timer.isRunning ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                                            <span className={`text-lg font-bold tabular-nums ${timer.isRunning ? 'text-green-600' : 'text-blue-600'}`}>
                                                💰 {formatVND(timer.currentEarnings)}
                                            </span>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className="flex items-center gap-2 mt-3">
                                            {timer.isRunning && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                </span>
                                            )}
                                            <span
                                                className={`text-[11px] font-bold uppercase tracking-widest ${timer.isRunning ? "text-green-500" : "text-blue-500"
                                                    }`}
                                            >
                                                {timer.isRunning ? "Đang kiếm tiền" : "Sẵn sàng"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="w-full max-w-md space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="relative">
                                        <select
                                            className="w-full h-11 pl-4 pr-10 bg-gray-50 border-none rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                            disabled={timer.isRunning}
                                            value={selectedProject}
                                            onChange={(e) => setSelectedProject(e.target.value)}
                                        >
                                            <option value="1">Thiết kế UI/UX - BusinessOS</option>
                                            <option value="2">Phát triển Frontend - E-commerce</option>
                                            <option value="3">Họp định kỳ dự án</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-500 pointer-events-none text-xl">
                                            expand_more
                                        </span>
                                    </div>
                                    <Input
                                        className="w-full h-11 px-4 bg-gray-50 border-none rounded-lg text-sm"
                                        placeholder="Tác vụ đang thực hiện..."
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        disabled={timer.isRunning}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        variant={timer.isRunning ? "danger" : "success"}
                                        className={`flex-1 h-12 font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all ${timer.isRunning
                                            ? "bg-red-500 hover:bg-red-600 text-white"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                            }`}
                                        onClick={handleToggle}
                                    >
                                        <span className="material-symbols-outlined">
                                            {timer.isRunning ? "stop" : "play_arrow"}
                                        </span>
                                        {timer.isRunning ? `Dừng & Nhận ${formatVND(timer.currentEarnings)}` : "Bắt đầu làm việc"}
                                    </Button>

                                    {timer.seconds > 0 && !timer.isRunning && (
                                        <Button
                                            variant="secondary"
                                            className="h-12 px-4 font-semibold rounded-lg"
                                            onClick={timer.reset}
                                        >
                                            <span className="material-symbols-outlined">refresh</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* History Section */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-slate-900">Lịch sử chấm công</h3>
                                <div className="flex items-center gap-6">
                                    <div className="text-sm text-slate-500">
                                        Tổng thời gian: <span className="text-slate-900 font-bold">{totalDailyHours}</span>
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Tổng thu nhập: <span className="text-green-600 font-bold">{formatVND(totalDailyEarnings)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-hidden border border-gray-100 rounded-lg">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="bg-gray-50/50 text-slate-500 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Dự án</th>
                                            <th className="px-6 py-4 font-semibold">Tác vụ</th>
                                            <th className="px-6 py-4 font-semibold">Bắt đầu</th>
                                            <th className="px-6 py-4 font-semibold">Kết thúc</th>
                                            <th className="px-6 py-4 font-semibold text-right">Tổng giờ</th>
                                            <th className="px-6 py-4 font-semibold text-right">Thu nhập</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {entries.map((entry) => (
                                            <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`size-2 rounded-full ${entry.color}`}></div>
                                                        <span className="font-medium text-slate-900">{entry.project}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">{entry.task}</td>
                                                <td className="px-6 py-4 text-slate-500">{entry.start}</td>
                                                <td className="px-6 py-4 text-slate-500">{entry.end}</td>
                                                <td className="px-6 py-4 text-right font-bold text-slate-900">{entry.total}</td>
                                                <td className="px-6 py-4 text-right font-bold text-green-600">{formatVND(entry.earnings)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
