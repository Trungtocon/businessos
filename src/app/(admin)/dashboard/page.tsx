"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import {
    MOCK_ADMIN_STATS,
    MOCK_RECENT_USERS,
    MOCK_USER_GROWTH,
    RecentUser,
} from "@/lib/mock-data";

// Stat Card Component
function StatCard({
    icon,
    label,
    value,
    subValue,
    color,
    trend,
}: {
    icon: string;
    label: string;
    value: string;
    subValue?: string;
    color: "purple" | "green" | "orange" | "blue";
    trend?: { value: string; positive: boolean };
}) {
    const colorClasses = {
        purple: "from-purple-600 to-purple-800 shadow-purple-500/30",
        green: "from-emerald-600 to-emerald-800 shadow-emerald-500/30",
        orange: "from-orange-500 to-orange-700 shadow-orange-500/30",
        blue: "from-blue-600 to-blue-800 shadow-blue-500/30",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 shadow-lg`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">{icon}</span>
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend.positive ? "bg-green-500/30" : "bg-red-500/30"}`}>
                        <span className="material-symbols-outlined text-white text-sm">
                            {trend.positive ? "trending_up" : "trending_down"}
                        </span>
                        <span className="text-white text-xs font-medium">{trend.value}</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-white/70 text-sm font-medium mb-1">{label}</p>
                <p className="text-white text-3xl font-bold tracking-tight">{value}</p>
                {subValue && <p className="text-white/60 text-xs mt-1">{subValue}</p>}
            </div>
        </motion.div>
    );
}

// Growth Chart Component (CSS-based bar chart)
function GrowthChart() {
    const maxUsers = Math.max(...MOCK_USER_GROWTH.map((d) => d.newUsers));

    return (
        <Card className="bg-white/5 border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-semibold text-lg">Người dùng mới</h3>
                    <p className="text-white/50 text-sm">7 ngày gần nhất</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30">
                    <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
                    <span className="text-green-400 text-sm font-medium">+23%</span>
                </div>
            </div>
            <div className="flex items-end justify-between gap-3 h-48">
                {MOCK_USER_GROWTH.map((day, i) => {
                    const heightPercent = (day.newUsers / maxUsers) * 100;
                    return (
                        <motion.div
                            key={day.day}
                            className="flex-1 flex flex-col items-center gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="relative w-full flex flex-col items-center">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 + 0.3 }}
                                    className="text-white/70 text-xs font-medium mb-2"
                                >
                                    {day.newUsers}
                                </motion.span>
                                <motion.div
                                    className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-purple-600 to-purple-400"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPercent}%` }}
                                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                                    style={{ minHeight: "20px" }}
                                />
                            </div>
                            <span className="text-white/50 text-xs font-medium">{day.label}</span>
                        </motion.div>
                    );
                })}
            </div>
        </Card>
    );
}

// User Table Component
function UserTable({
    users,
    onApproveKYC,
}: {
    users: RecentUser[];
    onApproveKYC: (userId: string) => void;
}) {
    const getStatusBadge = (status: RecentUser["kycStatus"]) => {
        const styles = {
            Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            Approved: "bg-green-500/20 text-green-400 border-green-500/30",
            Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
        };
        const icons = {
            Pending: "schedule",
            Approved: "verified",
            Rejected: "cancel",
        };
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium ${styles[status]}`}>
                <span className="material-symbols-outlined text-sm">{icons[status]}</span>
                {status === "Pending" ? "Chờ duyệt" : status === "Approved" ? "Đã duyệt" : "Từ chối"}
            </span>
        );
    };

    const getRoleBadge = (role: RecentUser["role"]) => {
        return role === "Business" ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-medium">
                <span className="material-symbols-outlined text-sm">business</span>
                Doanh nghiệp
            </span>
        ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-medium">
                <span className="material-symbols-outlined text-sm">person</span>
                Freelancer
            </span>
        );
    };

    return (
        <Card className="bg-white/5 border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-semibold text-lg">Đăng ký gần đây</h3>
                        <p className="text-white/50 text-sm">Người dùng mới cần xác minh KYC</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                        <span className="material-symbols-outlined text-yellow-400 text-sm">pending</span>
                        <span className="text-yellow-400 text-sm font-medium">{MOCK_ADMIN_STATS.pendingKYC} chờ duyệt</span>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left p-4 text-white/50 text-xs font-semibold uppercase tracking-wider">Người dùng</th>
                            <th className="text-left p-4 text-white/50 text-xs font-semibold uppercase tracking-wider">Loại tài khoản</th>
                            <th className="text-left p-4 text-white/50 text-xs font-semibold uppercase tracking-wider">Trạng thái KYC</th>
                            <th className="text-left p-4 text-white/50 text-xs font-semibold uppercase tracking-wider">Đăng ký</th>
                            <th className="text-right p-4 text-white/50 text-xs font-semibold uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-10 rounded-full bg-cover bg-center ring-2 ring-white/20"
                                            style={{ backgroundImage: `url(${user.avatarUrl})` }}
                                        />
                                        <div>
                                            <p className="text-white font-medium text-sm">{user.name}</p>
                                            <p className="text-white/50 text-xs">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">{getRoleBadge(user.role)}</td>
                                <td className="p-4">{getStatusBadge(user.kycStatus)}</td>
                                <td className="p-4">
                                    <p className="text-white/70 text-sm">
                                        {new Date(user.registeredAt).toLocaleDateString("vi-VN")}
                                    </p>
                                    <p className="text-white/40 text-xs">
                                        {new Date(user.registeredAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </td>
                                <td className="p-4 text-right">
                                    {user.kycStatus === "Pending" ? (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onApproveKYC(user.id)}
                                            className="bg-green-600 hover:bg-green-500 text-white border-none"
                                        >
                                            <span className="material-symbols-outlined text-sm mr-1">verified</span>
                                            Duyệt KYC
                                        </Button>
                                    ) : (
                                        <span className="text-white/30 text-sm">—</span>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<RecentUser[]>(MOCK_RECENT_USERS);

    const handleApproveKYC = useCallback((userId: string) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, kycStatus: "Approved" as const } : u))
        );
        const user = users.find((u) => u.id === userId);
        toast.success(`Đã duyệt KYC`, {
            description: `Người dùng ${user?.name} đã được xác minh thành công.`,
            icon: <span className="material-symbols-outlined text-green-500">verified</span>,
        });
    }, [users]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#16082a] to-[#0d0415] text-white">
            <Toaster richColors position="top-right" />

            {/* Admin Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-purple-950/80 to-purple-900/60 backdrop-blur-xl border-r border-purple-500/20 z-40 hidden lg:flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-purple-500/20">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <span className="material-symbols-outlined text-white text-xl">shield_person</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-white tracking-wide">Admin Panel</h1>
                            <p className="text-purple-300/60 text-xs">BusinessOS v4.0</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-500/20 text-white border border-purple-500/30">
                        <span className="material-symbols-outlined text-xl">dashboard</span>
                        <span className="font-medium">Dashboard</span>
                    </a>
                    <a href="/admin/finance" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">account_balance</span>
                        <span className="font-medium">Tài chính</span>
                    </a>
                    <a href="/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">people</span>
                        <span className="font-medium">Người dùng</span>
                    </a>
                    <a href="/disputes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">gavel</span>
                        <span className="font-medium">Tranh chấp</span>
                    </a>
                    <a href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">settings</span>
                        <span className="font-medium">Cài đặt</span>
                    </a>
                </nav>

                {/* Admin Profile */}
                <div className="p-4 border-t border-purple-500/20">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-500/10">
                        <div className="size-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">person</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">Super Admin</p>
                            <p className="text-purple-300/60 text-xs truncate">admin@businessos.vn</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-[#1a0a2e]/80 backdrop-blur-xl border-b border-purple-500/20 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Bảng điều khiển</h1>
                            <p className="text-purple-300/60 text-sm">Tổng quan hệ thống BusinessOS</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors" onClick={() => { }}>
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                            </button>
                            <div className="size-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <span className="material-symbols-outlined text-white">person</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                    {/* Stat Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatCard
                            icon="payments"
                            label="Tổng doanh thu"
                            value={MOCK_ADMIN_STATS.totalRevenue}
                            subValue={`Phí nền tảng: ${(MOCK_ADMIN_STATS.platformFee / 1000000).toFixed(0)}M VND`}
                            color="purple"
                            trend={{ value: "+18%", positive: true }}
                        />
                        <StatCard
                            icon="group"
                            label="Người dùng hoạt động"
                            value={MOCK_ADMIN_STATS.activeUsers.toLocaleString()}
                            subValue="Tăng 156 so với tháng trước"
                            color="green"
                            trend={{ value: "+12%", positive: true }}
                        />
                        <StatCard
                            icon="gavel"
                            label="Tỷ lệ tranh chấp"
                            value={MOCK_ADMIN_STATS.disputeRate}
                            subValue={`${MOCK_ADMIN_STATS.disputeCount} vụ trong tháng`}
                            color="orange"
                            trend={{ value: "-0.3%", positive: true }}
                        />
                        <StatCard
                            icon="verified_user"
                            label="Chờ duyệt KYC"
                            value={MOCK_ADMIN_STATS.pendingKYC.toString()}
                            subValue="Cần xử lý trong 24h"
                            color="blue"
                        />
                    </div>

                    {/* Charts & Tables Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Growth Chart */}
                        <div className="xl:col-span-1">
                            <GrowthChart />
                        </div>

                        {/* User Table */}
                        <div className="xl:col-span-2">
                            <UserTable users={users} onApproveKYC={handleApproveKYC} />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <Card className="bg-white/5 border-white/10 p-6">
                        <h3 className="text-white font-semibold text-lg mb-4">Hành động nhanh</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="secondary" className="bg-purple-600 hover:bg-purple-500 text-white border-none" onClick={() => alert('person_add')}>
                                <span className="material-symbols-outlined mr-2">person_add</span>
                                Thêm người dùng
                            </Button>
                            <Button variant="secondary" className="bg-blue-600 hover:bg-blue-500 text-white border-none" onClick={() => alert('analytics')}>
                                <span className="material-symbols-outlined mr-2">analytics</span>
                                Xem báo cáo
                            </Button>
                            <Button variant="secondary" className="bg-green-600 hover:bg-green-500 text-white border-none" onClick={() => alert('download')}>
                                <span className="material-symbols-outlined mr-2">download</span>
                                Xuất dữ liệu
                            </Button>
                            <Button variant="secondary" className="bg-orange-600 hover:bg-orange-500 text-white border-none" onClick={() => alert('mail')}>
                                <span className="material-symbols-outlined mr-2">mail</span>
                                Gửi thông báo
                            </Button>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
