"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center max-w-lg"
            >
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="text-[180px] font-bold leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent select-none">
                        404
                    </span>
                </motion.div>

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.8, delay: 0.3 }}
                    className="size-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/30"
                >
                    <span className="material-symbols-outlined text-white text-5xl">explore_off</span>
                </motion.div>

                {/* Message */}
                <h1 className="text-3xl font-bold text-white mb-4">
                    Lạc lối trong BusinessOS?
                </h1>
                <p className="text-white/60 mb-8 text-lg">
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa chỉ khác.
                </p>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/virtual"
                        className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Quay về Dashboard
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">home</span>
                        Trang chủ
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-white/40 text-sm mb-4">Có thể bạn muốn tìm:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { href: "/classic/projects", label: "Classic Portal", icon: "dashboard" },
                            { href: "/virtual", label: "Virtual Mode", icon: "auto_awesome" },
                            { href: "/freelancer", label: "Freelancer Hub", icon: "work" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 text-sm"
                            >
                                <span className="material-symbols-outlined text-lg">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
