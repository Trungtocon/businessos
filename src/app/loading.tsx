"use client";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
            </div>

            <div className="relative z-10 text-center">
                {/* Pulsing Logo */}
                <div className="relative">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 size-32 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 opacity-30 animate-ping" />

                    {/* Main Logo */}
                    <div
                        className="relative size-32 mx-auto rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 animate-pulse"
                        style={{
                            background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
                        }}
                    >
                        <span className="text-white font-bold text-5xl tracking-tight">B</span>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-2">BusinessOS</h2>
                    <div className="flex items-center justify-center gap-2 text-white/50">
                        <span className="text-sm">Đang tải</span>
                        <span className="flex gap-1">
                            <span className="size-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="size-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="size-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 w-48 mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full animate-loading-bar"
                        style={{
                            background: "linear-gradient(90deg, #3B82F6, #06B6D4, #3B82F6)",
                            backgroundSize: "200% 100%",
                            animation: "loading-bar 1.5s ease-in-out infinite",
                        }}
                    />
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes loading-bar {
                    0% {
                        width: 0%;
                        background-position: 0% 50%;
                    }
                    50% {
                        width: 70%;
                        background-position: 100% 50%;
                    }
                    100% {
                        width: 100%;
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </div>
    );
}
