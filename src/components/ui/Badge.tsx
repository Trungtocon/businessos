import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    icon?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-700 ring-slate-200",
    success: "bg-green-50 text-green-700 ring-green-200",
    warning: "bg-amber-50 text-amber-700 ring-amber-200",
    danger: "bg-red-50 text-red-700 ring-red-200",
    info: "bg-blue-50 text-blue-700 ring-blue-200",
    outline: "bg-transparent text-slate-600 ring-slate-300",
};

export function Badge({ variant = "default", icon, children, className = "", ...props }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
            {children}
        </span>
    );
}
