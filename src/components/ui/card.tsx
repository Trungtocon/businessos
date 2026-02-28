import { forwardRef, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "ghost";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = "", variant = "default", children, ...props }, ref) => {
        const baseClasses = "rounded-xl border transition-all";
        const variantClasses = {
            default: "bg-white border-slate-200 shadow-sm",
            ghost: "bg-transparent border-transparent",
        };

        return (
            <div
                ref={ref}
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export { Card };
