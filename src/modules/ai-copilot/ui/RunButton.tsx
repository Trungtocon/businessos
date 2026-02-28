"use client";

import type { RunStatus } from "../types";

interface RunButtonProps {
    status: RunStatus;
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export function RunButton({ status, label, onClick, disabled }: RunButtonProps) {
    const isRunning = status === "running";
    const isDisabled = disabled || isRunning;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`flex items-center justify-center gap-2 w-full h-10 rounded-lg text-sm font-semibold transition-all ${isDisabled
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow"
                }`}
        >
            {isRunning ? (
                <>
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                </>
            ) : (
                <>
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    {label}
                </>
            )}
        </button>
    );
}
