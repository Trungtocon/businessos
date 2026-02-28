"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    AlertTriangle,
    GitBranch,
    DollarSign,
    Bell,
    MessageSquare,
    Settings,
    Briefcase,
    Store,
    FolderKanban,
    Wallet,
    FileText,
    BarChart3,
    Zap,
    ThumbsUp,
    Bot,
    Mic,
    Search,
    UserCircle,
    GraduationCap,
    Timer,
    BookOpen,
    Building,
    ChevronDown,
    UsersRound,
    Receipt,
    LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

// ============================================
// MENU_ITEMS - Route mappings from CONF_ROUTES.json
// ============================================
const ROUTES = {
    // Admin Routes
    a01_dashboard: "/dashboard",
    a02_users: "/users",
    a03_disputes: "/disputes",
    a04_workflows: "/workflow",
    a05_finance: "/finance",
    a06_notifications: "/notifications",
    a07_chat: "/chat",
    a10_settings: "/settings",
    // Virtual Mode Routes
    c01_virtual_dashboard: "/virtual",
    c02_approval: "/virtual/approval",
    c03_war_room: "/virtual/war-room",
    c04_voice: "/virtual/voice",
    // Classic Mode Routes
    c05_marketplace: "/classic/marketplace",
    c07_briefing: "/classic/briefing",
    c09_projects: "/classic/projects",
    c12_team: "/classic/team",
    c13_wallet: "/classic/finance",
    c14_invoices: "/classic/invoices",
    c16_reports: "/classic/reports",
    // Freelancer Routes
    f01_dashboard: "/freelancer",
    f02_jobs: "/freelancer/jobs",
    f03_workspace: "/freelancer/workspace",
    f05_timesheet: "/freelancer/timesheet",
    f06_wallet: "/freelancer/wallet",
    f08_profile: "/freelancer/profile",
    f09_skills: "/freelancer/skills",
    f11_learning: "/freelancer/learning",
    // System Routes
    s06_search: "/search",
} as const;

// Admin navigation
const adminNav: NavSection[] = [
    {
        items: [
            { label: "Dashboard", href: ROUTES.a01_dashboard, icon: LayoutDashboard },
            { label: "Users", href: ROUTES.a02_users, icon: Users },
            { label: "Disputes", href: ROUTES.a03_disputes, icon: AlertTriangle },
            { label: "Workflows", href: ROUTES.a04_workflows, icon: GitBranch },
            { label: "Finance", href: ROUTES.a05_finance, icon: DollarSign },
            { label: "Notifications", href: ROUTES.a06_notifications, icon: Bell },
            { label: "Chat", href: ROUTES.a07_chat, icon: MessageSquare },
            { label: "Settings", href: ROUTES.a10_settings, icon: Settings },
        ],
    },
];

// Portal navigation (Business/Client)
const portalNav: NavSection[] = [
    {
        title: "Virtual Mode",
        items: [
            { label: "Cockpit", href: ROUTES.c01_virtual_dashboard, icon: Zap },
            { label: "Duyệt nhanh", href: ROUTES.c02_approval, icon: ThumbsUp },
            { label: "War Room", href: ROUTES.c03_war_room, icon: Bot },
            { label: "Voice Command", href: ROUTES.c04_voice, icon: Mic },
        ],
    },
    {
        title: "Classic Mode",
        items: [
            { label: "Marketplace", href: ROUTES.c05_marketplace, icon: Store },
            { label: "Dự án", href: ROUTES.c09_projects, icon: FolderKanban },
            { label: "Đội ngũ", href: ROUTES.c12_team, icon: UsersRound },
            { label: "Tài chính", href: ROUTES.c13_wallet, icon: Wallet },
            { label: "Hóa đơn", href: ROUTES.c14_invoices, icon: Receipt },
            { label: "Báo cáo", href: ROUTES.c16_reports, icon: BarChart3 },
        ],
    },
];

// Freelancer navigation
const freelancerNav: NavSection[] = [
    {
        items: [
            { label: "Dashboard", href: ROUTES.f01_dashboard, icon: LayoutDashboard },
            { label: "Chợ việc làm", href: ROUTES.f02_jobs, icon: Briefcase },
            { label: "Workspace", href: ROUTES.f03_workspace, icon: FolderKanban },
            { label: "Timesheet", href: ROUTES.f05_timesheet, icon: Timer },
            { label: "Ví tiền", href: ROUTES.f06_wallet, icon: Wallet },
            { label: "Hồ sơ", href: ROUTES.f08_profile, icon: UserCircle },
            { label: "Kỹ năng", href: ROUTES.f09_skills, icon: GraduationCap },
            { label: "Học tập", href: ROUTES.f11_learning, icon: BookOpen },
        ],
    },
];

interface SidebarProps {
    variant?: "admin" | "portal" | "freelancer";
    className?: string;
}

export function Sidebar({ variant = "admin", className }: SidebarProps) {
    const pathname = usePathname();

    const getNavSections = (): NavSection[] => {
        switch (variant) {
            case "admin":
                return adminNav;
            case "portal":
                return portalNav;
            case "freelancer":
                return freelancerNav;
            default:
                return adminNav;
        }
    };

    const sections = getNavSections();

    // Check if current path matches or starts with the nav item href
    const isActive = (href: string): boolean => {
        if (pathname === href) return true;
        // Check for nested routes (e.g., /classic/projects/123 matches /classic/projects)
        if (href !== "/" && pathname.startsWith(href + "/")) return true;
        return false;
    };

    const isDarkVariant = variant === "admin" || variant === "freelancer";

    return (
        <aside
            className={cn(
                "w-64 h-full flex flex-col shrink-0 border-r",
                isDarkVariant
                    ? "bg-[#0f172a] border-slate-800"
                    : "bg-white border-slate-200",
                className
            )}
        >
            {/* Logo */}
            <div
                className={cn(
                    "h-16 flex items-center px-6 border-b",
                    isDarkVariant ? "border-slate-800" : "border-slate-200"
                )}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                        <Building className="w-5 h-5" />
                    </div>
                    <div>
                        <h1
                            className={cn(
                                "text-base font-bold",
                                isDarkVariant ? "text-white" : "text-slate-900"
                            )}
                        >
                            BusinessOS
                        </h1>
                        <p
                            className={cn(
                                "text-xs",
                                isDarkVariant ? "text-slate-400" : "text-slate-500"
                            )}
                        >
                            {variant === "admin"
                                ? "Admin Panel"
                                : variant === "freelancer"
                                    ? "Freelancer"
                                    : "Portal"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {sections.map((section, idx) => (
                    <div key={idx}>
                        {section.title && (
                            <p
                                className={cn(
                                    "px-3 mb-2 text-xs font-semibold uppercase tracking-wider",
                                    isDarkVariant ? "text-slate-500" : "text-slate-400"
                                )}
                            >
                                {section.title}
                            </p>
                        )}
                        <div className="flex flex-col gap-1">
                            {section.items.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative",
                                            active
                                                ? isDarkVariant
                                                    ? "bg-primary text-white"
                                                    : "bg-primary/10 text-primary"
                                                : isDarkVariant
                                                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                                                    : "text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        {active && isDarkVariant && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
                                        )}
                                        <item.icon className={cn("w-5 h-5", active && "fill-current")} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Search Trigger */}
            <div
                className={cn(
                    "px-4 py-3 border-t",
                    isDarkVariant ? "border-slate-800" : "border-slate-200"
                )}
            >
                <Link
                    href={ROUTES.s06_search}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isDarkVariant
                            ? "bg-slate-800 text-slate-400 hover:text-white"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    )}
                >
                    <Search className="w-4 h-4" />
                    <span className="text-sm">Tìm kiếm...</span>
                    <kbd
                        className={cn(
                            "ml-auto px-1.5 py-0.5 rounded text-[10px] font-medium",
                            isDarkVariant
                                ? "bg-slate-700 text-slate-400"
                                : "bg-white border text-slate-400"
                        )}
                    >
                        ⌘K
                    </kbd>
                </Link>
            </div>

            {/* User Profile */}
            <div
                className={cn(
                    "p-4 border-t",
                    isDarkVariant ? "border-slate-800" : "border-slate-200"
                )}
            >
                <button
                    className={cn(
                        "w-full flex items-center gap-3 p-2 rounded-lg transition-colors",
                        isDarkVariant ? "hover:bg-slate-800" : "hover:bg-slate-100"
                    )}
                >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                        JD
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p
                            className={cn(
                                "text-sm font-medium truncate",
                                isDarkVariant ? "text-white" : "text-slate-900"
                            )}
                        >
                            Jane Doe
                        </p>
                        <p
                            className={cn(
                                "text-xs truncate",
                                isDarkVariant ? "text-slate-400" : "text-slate-500"
                            )}
                        >
                            {variant === "admin" ? "Administrator" : "Pro Member"}
                        </p>
                    </div>
                    <ChevronDown
                        className={cn(
                            "w-4 h-4",
                            isDarkVariant ? "text-slate-500" : "text-slate-400"
                        )}
                    />
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
