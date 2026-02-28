"use client";

interface StatusBannerProps {
    type: "success" | "error" | "warning" | "info";
    title: string;
    message?: string;
    onClose?: () => void;
}

const styles = {
    success: { bg: "bg-green-50 border-green-200", icon: "check_circle", iconColor: "text-green-600", titleColor: "text-green-800", textColor: "text-green-700" },
    error: { bg: "bg-red-50 border-red-200", icon: "error", iconColor: "text-red-600", titleColor: "text-red-800", textColor: "text-red-700" },
    warning: { bg: "bg-amber-50 border-amber-200", icon: "warning", iconColor: "text-amber-600", titleColor: "text-amber-800", textColor: "text-amber-700" },
    info: { bg: "bg-blue-50 border-blue-200", icon: "info", iconColor: "text-blue-600", titleColor: "text-blue-800", textColor: "text-blue-700" },
};

export function StatusBanner({ type, title, message, onClose }: StatusBannerProps) {
    const s = styles[type];
    return (
        <div className={`rounded-lg border p-4 flex items-start gap-3 ${s.bg}`}>
            <span className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${s.iconColor}`}>{s.icon}</span>
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${s.titleColor}`}>{title}</p>
                {message && <p className={`text-sm mt-1 ${s.textColor}`}>{message}</p>}
            </div>
            {onClose && (
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 shrink-0">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            )}
        </div>
    );
}
