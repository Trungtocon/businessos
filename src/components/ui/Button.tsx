import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white hover:bg-blue-600 focus:ring-primary shadow-sm",
                secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300",
                ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
                success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-9 px-4 text-sm",
                lg: "h-10 px-5 text-sm",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
