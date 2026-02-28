"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NavItem } from "@/config/nav.registry";

const NAV_DEBUG = process.env.NEXT_PUBLIC_NAV_DEBUG === "true";

interface NavLinkProps {
    item: NavItem;
    children: React.ReactNode;
    className?: string;
    /** If true, render as button with router.push instead of Link */
    asButton?: boolean;
    onClick?: () => void;
}

export function NavLink({ item, children, className = "", asButton, onClick }: NavLinkProps) {
    const router = useRouter();
    const isDisabled = item.status === "coming_soon";

    const handleClick = () => {
        if (isDisabled) return;
        if (NAV_DEBUG) {
            console.log(`[NAV] ${item.id} → ${item.route}`, { screenId: item.screenId, label: item.label });
        }
        onClick?.();
        if (asButton) {
            router.push(item.route);
        }
    };

    if (asButton) {
        return (
            <button
                className={`${className} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onClick={handleClick}
                disabled={isDisabled}
                title={NAV_DEBUG ? `[${item.screenId}] ${item.route}` : item.description}
                data-nav-id={item.id}
                data-screen-id={item.screenId}
            >
                {children}
                {isDisabled && (
                    <span className="ml-1 text-[10px] text-slate-400 uppercase">Sắp ra mắt</span>
                )}
            </button>
        );
    }

    if (isDisabled) {
        return (
            <span
                className={`${className} opacity-50 cursor-not-allowed`}
                title={item.description}
                data-nav-id={item.id}
            >
                {children}
                <span className="ml-1 text-[10px] text-slate-400 uppercase">Sắp ra mắt</span>
            </span>
        );
    }

    return (
        <Link
            href={item.route}
            className={className}
            title={NAV_DEBUG ? `[${item.screenId}] ${item.route}` : item.description}
            data-nav-id={item.id}
            data-screen-id={item.screenId}
            onClick={() => {
                if (NAV_DEBUG) {
                    console.log(`[NAV] ${item.id} → ${item.route}`, { screenId: item.screenId });
                }
                onClick?.();
            }}
        >
            {children}
        </Link>
    );
}
