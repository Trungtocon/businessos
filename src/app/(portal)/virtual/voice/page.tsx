"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

type VoiceState = "idle" | "listening" | "analyzing" | "redirecting";

// Waveform animation component
function VoiceWaveform({ isActive }: { isActive: boolean }) {
    const bars = [
        { delay: 0, height: "32px" },
        { delay: 0.1, height: "48px" },
        { delay: 0.2, height: "64px" },
        { delay: 0.15, height: "80px" },
        { delay: 0.25, height: "56px" },
        { delay: 0.05, height: "40px" },
        { delay: 0.2, height: "24px" },
    ];

    return (
        <div className="flex items-center justify-center gap-1.5">
            {bars.map((bar, i) => (
                <motion.div
                    key={i}
                    className="w-1.5 bg-cyan-400 rounded-full"
                    initial={{ height: "16px", opacity: 0.4 }}
                    animate={isActive ? {
                        height: [bar.height, "16px", bar.height],
                        opacity: [1, 0.4, 1],
                    } : { height: "16px", opacity: 0.4 }}
                    transition={{
                        duration: 0.6,
                        repeat: isActive ? Infinity : 0,
                        delay: bar.delay,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: isActive ? "0 0 15px rgba(13,231,242,0.6)" : "none",
                    }}
                />
            ))}
        </div>
    );
}

export default function VoiceCommandPage() {
    const router = useRouter();
    const [voiceState, setVoiceState] = useState<VoiceState>("idle");
    const [transcript, setTranscript] = useState("");

    const handleMicClick = useCallback(() => {
        if (voiceState !== "idle") return;

        // Start listening
        setVoiceState("listening");
        setTranscript("");

        // Simulate listening for 3 seconds with progressive transcript
        const transcriptSteps = [
            "Duyệt...",
            "Duyệt ngân sách...",
            "Duyệt ngân sách Marketing...",
        ];

        transcriptSteps.forEach((text, i) => {
            setTimeout(() => setTranscript(text), (i + 1) * 800);
        });

        // After 3s, switch to analyzing
        setTimeout(() => {
            setVoiceState("analyzing");
        }, 3000);

        // After 2s more, redirect
        setTimeout(() => {
            setVoiceState("redirecting");
            setTimeout(() => {
                router.push("/virtual/approval");
            }, 500);
        }, 5000);
    }, [voiceState, router]);

    const handleCancel = useCallback(() => {
        setVoiceState("idle");
        setTranscript("");
    }, []);

    // Escape key to cancel
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleCancel();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleCancel]);

    const statusText = {
        idle: "Nhấn để bắt đầu",
        listening: "Đang nghe...",
        analyzing: "Đang phân tích lệnh...",
        redirecting: "Đang chuyển hướng...",
    };

    return (
        <div className="bg-[#102122] font-sans overflow-hidden">
            {/* Background Dashboard Simulation */}
            <div aria-hidden="true" className="relative h-screen w-full flex overflow-hidden opacity-40 blur-[2px] pointer-events-none select-none">
                {/* Sidebar Placeholder */}
                <div className="w-64 flex-col border-r border-white/10 bg-[#0d1b1c] h-full p-4 gap-4 hidden md:flex">
                    <div className="h-8 w-32 bg-white/10 rounded mb-6"></div>
                    <div className="h-10 w-full bg-white/5 rounded"></div>
                    <div className="h-10 w-full bg-white/5 rounded"></div>
                    <div className="h-10 w-full bg-cyan-400/20 rounded border-l-4 border-cyan-400"></div>
                    <div className="h-10 w-full bg-white/5 rounded"></div>
                </div>
                {/* Main Content Placeholder */}
                <div className="flex-1 flex flex-col bg-[#102122] p-8 gap-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-8 w-64 bg-white/10 rounded"></div>
                        <div className="flex gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/10"></div>
                            <div className="h-10 w-10 rounded-full bg-white/10"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-4"></div>
                        <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-4"></div>
                        <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-4"></div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-6 grid grid-cols-4 gap-4">
                        <div className="col-span-4 h-8 w-48 bg-white/10 rounded mb-4"></div>
                        <div className="col-span-1 h-full bg-white/5 rounded"></div>
                        <div className="col-span-3 h-full bg-white/5 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Voice Command Overlay */}
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#081213]/90 backdrop-blur-xl transition-all duration-300">
                <div className="flex flex-col items-center justify-center w-full max-w-[1200px] px-6 text-center">
                    {/* Audio Visualizer / Mic Button */}
                    <div className="relative flex items-center justify-center mb-10 group">
                        {/* Outer glow rings */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-cyan-400/20"
                            animate={{
                                scale: voiceState === "listening" ? [1.8, 2.2, 1.8] : 1.8,
                                opacity: voiceState === "listening" ? [0.2, 0.4, 0.2] : 0.2,
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-cyan-400/10"
                            animate={{
                                scale: voiceState === "listening" ? [2.4, 2.8, 2.4] : 2.4,
                                opacity: voiceState === "listening" ? [0.1, 0.2, 0.1] : 0.1,
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                        />

                        {/* Main Button / Visualizer */}
                        <motion.button
                            onClick={handleMicClick}
                            disabled={voiceState !== "idle"}
                            className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-300 ${voiceState === "idle"
                                    ? "border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_40px_-10px_rgba(13,231,242,0.3)] hover:shadow-[0_0_80px_-10px_rgba(13,231,242,0.5)] hover:border-cyan-400 cursor-pointer"
                                    : voiceState === "listening"
                                        ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_80px_-10px_rgba(13,231,242,0.6)]"
                                        : voiceState === "analyzing"
                                            ? "border-yellow-400 bg-yellow-400/10 shadow-[0_0_80px_-10px_rgba(234,179,8,0.4)]"
                                            : "border-green-400 bg-green-400/10 shadow-[0_0_80px_-10px_rgba(34,197,94,0.4)]"
                                }`}
                            whileHover={voiceState === "idle" ? { scale: 1.05 } : {}}
                            whileTap={voiceState === "idle" ? { scale: 0.95 } : {}}
                        >
                            <AnimatePresence mode="wait">
                                {voiceState === "idle" && (
                                    <motion.div
                                        key="mic"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-cyan-400 text-5xl">mic</span>
                                        <span className="text-cyan-400/70 text-xs">Nhấn để nói</span>
                                    </motion.div>
                                )}
                                {voiceState === "listening" && (
                                    <motion.div
                                        key="waveform"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                    >
                                        <VoiceWaveform isActive={true} />
                                    </motion.div>
                                )}
                                {voiceState === "analyzing" && (
                                    <motion.div
                                        key="analyzing"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 360 }}
                                        transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" } }}
                                    >
                                        <span className="material-symbols-outlined text-yellow-400 text-5xl">sync</span>
                                    </motion.div>
                                )}
                                {voiceState === "redirecting" && (
                                    <motion.div
                                        key="redirecting"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <span className="material-symbols-outlined text-green-400 text-5xl">check_circle</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 mb-4">
                        <AnimatePresence mode="wait">
                            {voiceState !== "idle" && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="relative flex h-2.5 w-2.5"
                                >
                                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${voiceState === "listening" ? "bg-cyan-400" :
                                            voiceState === "analyzing" ? "bg-yellow-400" : "bg-green-400"
                                        }`}></span>
                                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${voiceState === "listening" ? "bg-cyan-400" :
                                            voiceState === "analyzing" ? "bg-yellow-400" : "bg-green-400"
                                        }`}></span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <motion.p
                            key={voiceState}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-sm font-semibold tracking-[0.2em] uppercase leading-normal ${voiceState === "idle" ? "text-cyan-400/60" :
                                    voiceState === "listening" ? "text-cyan-400" :
                                        voiceState === "analyzing" ? "text-yellow-400" : "text-green-400"
                                }`}
                        >
                            {statusText[voiceState]}
                        </motion.p>
                    </div>

                    {/* Transcript / Analyzing Text */}
                    <div className="mb-16 max-w-4xl relative h-24 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {voiceState === "idle" && (
                                <motion.p
                                    key="hint"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    className="text-white/40 text-lg"
                                >
                                    Thử nói: &quot;Duyệt ngân sách Marketing&quot;
                                </motion.p>
                            )}
                            {voiceState === "listening" && transcript && (
                                <motion.h1
                                    key="transcript"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white tracking-tight text-3xl md:text-5xl font-light leading-snug px-4 text-center"
                                >
                                    <span className="text-white/40">&quot;</span>
                                    {transcript}
                                    <span className="text-white/40">&quot;</span>
                                    <motion.span
                                        className="inline-block w-[3px] h-8 md:h-12 bg-cyan-400 align-middle ml-1"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    />
                                </motion.h1>
                            )}
                            {voiceState === "analyzing" && (
                                <motion.div
                                    key="analyzing-text"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center"
                                >
                                    <p className="text-yellow-400/80 text-lg mb-2">Đang phân tích lệnh:</p>
                                    <h1 className="text-white tracking-tight text-2xl md:text-4xl font-light">
                                        &quot;Duyệt ngân sách Marketing&quot;...
                                    </h1>
                                </motion.div>
                            )}
                            {voiceState === "redirecting" && (
                                <motion.div
                                    key="redirecting-text"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <p className="text-green-400 text-xl font-semibold mb-2">✓ Lệnh được nhận dạng!</p>
                                    <p className="text-white/60 text-sm">Đang mở trang Phê duyệt...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cancel Action */}
                    <AnimatePresence>
                        {voiceState !== "idle" && voiceState !== "redirecting" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="flex justify-center"
                            >
                                <Button
                                    variant="ghost"
                                    onClick={handleCancel}
                                    className="group rounded-full h-12 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all gap-3 pl-5 backdrop-blur-md"
                                >
                                    <div className="text-white/70 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">close</span>
                                    </div>
                                    <span className="truncate text-white/70 group-hover:text-white transition-colors">Nhấn Esc để hủy</span>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-white/20 pointer-events-none">
                    <div className="text-xs font-mono uppercase tracking-widest">BusinessOS v4.0</div>
                    <div className="text-xs font-mono uppercase tracking-widest">Virtual Mode Active</div>
                </div>
            </div>
        </div>
    );
}
