// Navigation Registry — Single Source of Truth
// All routes, nav items, and helpers for Business OS navigation.
// NEVER hardcode routes in components. Import from here.

// ─── Route Builders (for dynamic segments) ────────────────────────────

export const ROUTES = {
    home: () => "/",
    splash: () => "/splash",
    role: () => "/role",
    login: () => "/login",
    otp: () => "/otp",
    onboarding: () => "/onboarding",
    search: () => "/search",
    pricing: () => "/pricing",
    teamLanding: () => "/team",

    // Admin
    dashboard: () => "/dashboard",
    users: () => "/users",
    disputes: () => "/disputes",
    workflow: () => "/workflow",
    adminFinance: () => "/finance",
    notifications: () => "/notifications",
    chat: () => "/chat",
    chatDetail: (id: string) => `/chat/${id}`,
    settings: () => "/settings",
    errorStates: () => "/error-states",

    // Virtual CEO
    virtual: () => "/virtual",
    virtualApproval: () => "/virtual/approval",
    virtualWarRoom: () => "/virtual/war-room",
    virtualVoice: () => "/virtual/voice",
    virtualSprintLead: () => "/virtual/sprint/lead",
    virtualSprintContent: () => "/virtual/sprint/content",
    virtualSprintReport: () => "/virtual/sprint/report",

    // Classic Business
    classicMarketplace: () => "/classic/marketplace",
    classicMarketplaceDetail: (id: string) => `/classic/marketplace/${id}`,
    classicBriefing: () => "/classic/briefing",
    classicCheckout: () => "/classic/checkout",
    classicProjects: () => "/classic/projects",
    classicKanban: (projectId: string) => `/classic/projects/${projectId}/kanban`,
    classicTaskDetail: (projectId: string, taskId: string) => `/classic/projects/${projectId}/task/${taskId}`,
    classicTaskSubmit: (projectId: string, taskId: string) => `/classic/projects/${projectId}/task/${taskId}/submit`,
    classicTeam: () => "/classic/team",
    classicFinance: () => "/classic/finance",
    classicInvoices: () => "/classic/invoices",
    classicProfile: () => "/classic/profile",
    classicReports: () => "/classic/reports",
    classicFeedback: () => "/classic/feedback",

    // Freelancer
    freelancer: () => "/freelancer",
    freelancerJobs: () => "/freelancer/jobs",
    freelancerWorkspace: () => "/freelancer/workspace",
    freelancerSubmit: () => "/freelancer/submit",
    freelancerTimesheet: () => "/freelancer/timesheet",
    freelancerWallet: () => "/freelancer/wallet",
    freelancerWithdraw: () => "/freelancer/withdraw",
    freelancerProfile: () => "/freelancer/profile",
    freelancerSkills: () => "/freelancer/skills",
    freelancerTest: () => "/freelancer/test",
    freelancerTestResults: () => "/freelancer/test/results",
    freelancerLearning: () => "/freelancer/learning",
    freelancerBank: () => "/freelancer/bank",

    // API
    erpnextPing: () => "/api/integrations/erpnext/ping",
    erpnextAuthTest: () => "/api/integrations/erpnext/auth/test",
    erpnextActionsExecute: () => "/api/integrations/erpnext/actions/execute",
} as const;

// ─── Types ────────────────────────────────────────────────────────────

export type NavItemStatus = "active" | "hidden" | "coming_soon";
export type UserRole = "ceo" | "admin" | "business" | "freelancer" | "guest";
export type NavContext = "admin" | "portal_business" | "portal_freelancer" | "virtual_ceo" | "auth";

export interface NavItem {
    id: string;
    screenId: string;
    label: string;
    description: string;
    route: string;
    iconKey: string;
    requiredRole: UserRole[];
    group: string;
    order: number;
    status: NavItemStatus;
    guard?: string; // feature flag key
}

export interface FeatureFlags {
    aiCopilotEnabled?: boolean;
    erpnextEnabled?: boolean;
    navDebugEnabled?: boolean;
}

// ─── Nav Item Definitions ─────────────────────────────────────────────

export const adminNav: NavItem[] = [
    { id: "admin-dashboard", screenId: "a01", label: "Tổng quan", description: "Dashboard tổng quan sàn", route: ROUTES.dashboard(), iconKey: "dashboard", requiredRole: ["admin", "ceo"], group: "admin", order: 1, status: "active" },
    { id: "admin-users", screenId: "a02", label: "Người dùng", description: "Quản lý người dùng", route: ROUTES.users(), iconKey: "people", requiredRole: ["admin"], group: "admin", order: 2, status: "active" },
    { id: "admin-disputes", screenId: "a03", label: "Tranh chấp", description: "Xử lý tranh chấp", route: ROUTES.disputes(), iconKey: "gavel", requiredRole: ["admin"], group: "admin", order: 3, status: "active" },
    { id: "admin-workflow", screenId: "a04", label: "Quy trình", description: "Tạo quy trình mẫu", route: ROUTES.workflow(), iconKey: "account_tree", requiredRole: ["admin", "ceo"], group: "admin", order: 4, status: "active" },
    { id: "admin-finance", screenId: "a05", label: "Tài chính sàn", description: "Kiểm soát tài chính sàn", route: ROUTES.adminFinance(), iconKey: "account_balance", requiredRole: ["admin"], group: "admin", order: 5, status: "active" },
    { id: "admin-notifications", screenId: "a06", label: "Thông báo", description: "Thông báo toàn cầu", route: ROUTES.notifications(), iconKey: "notifications", requiredRole: ["admin", "ceo", "business", "freelancer"], group: "admin", order: 6, status: "active" },
    { id: "admin-chat", screenId: "a07", label: "Tin nhắn", description: "Danh sách tin nhắn", route: ROUTES.chat(), iconKey: "chat", requiredRole: ["admin", "ceo", "business", "freelancer"], group: "admin", order: 7, status: "active" },
    { id: "admin-settings", screenId: "a10", label: "Cài đặt", description: "Cài đặt chung", route: ROUTES.settings(), iconKey: "settings", requiredRole: ["admin", "ceo", "business", "freelancer"], group: "admin", order: 8, status: "active" },
];

export const virtualCeoNav: NavItem[] = [
    { id: "virtual-cockpit", screenId: "c01", label: "Cockpit", description: "Bảng điều khiển CEO", route: ROUTES.virtual(), iconKey: "rocket_launch", requiredRole: ["ceo"], group: "virtual", order: 1, status: "active" },
    { id: "virtual-approval", screenId: "c02", label: "Duyệt nhanh", description: "Duyệt nhanh kiểu Tinder", route: ROUTES.virtualApproval(), iconKey: "thumb_up", requiredRole: ["ceo"], group: "virtual", order: 2, status: "active" },
    { id: "virtual-warroom", screenId: "c03", label: "War Room", description: "Phòng họp AI", route: ROUTES.virtualWarRoom(), iconKey: "groups", requiredRole: ["ceo"], group: "virtual", order: 3, status: "active" },
    { id: "virtual-voice", screenId: "c04a", label: "Ra lệnh giọng nói", description: "Voice command overlay", route: ROUTES.virtualVoice(), iconKey: "graphic_eq", requiredRole: ["ceo"], group: "virtual", order: 4, status: "active" },
    { id: "virtual-finance", screenId: "c13", label: "Tài chính", description: "Ví tài chính doanh nghiệp", route: ROUTES.classicFinance(), iconKey: "payments", requiredRole: ["ceo", "business"], group: "bridge", order: 10, status: "active" },
    { id: "virtual-projects", screenId: "c09", label: "Vận hành", description: "Quản lý dự án", route: ROUTES.classicProjects(), iconKey: "engineering", requiredRole: ["ceo", "business"], group: "bridge", order: 11, status: "active" },
    { id: "virtual-reports", screenId: "c16", label: "Tăng trưởng", description: "Báo cáo & thống kê", route: ROUTES.classicReports(), iconKey: "trending_up", requiredRole: ["ceo", "business"], group: "bridge", order: 12, status: "active" },
    { id: "virtual-marketplace", screenId: "c05", label: "Marketplace", description: "Sàn quy trình", route: ROUTES.classicMarketplace(), iconKey: "storefront", requiredRole: ["ceo", "business"], group: "bridge", order: 13, status: "active" },
    { id: "virtual-team", screenId: "c12", label: "Đội ngũ", description: "Quản lý đội ngũ", route: ROUTES.classicTeam(), iconKey: "group", requiredRole: ["ceo", "business"], group: "bridge", order: 14, status: "active" },
    // Sprint Packs
    { id: "virtual-sprint-lead", screenId: "sp01", label: "Dịch vụ Lead Generation", description: "Lead & CRM Sprint Pack", route: ROUTES.virtualSprintLead(), iconKey: "group_add", requiredRole: ["ceo", "business"], group: "sprint", order: 20, status: "active" },
    { id: "virtual-sprint-content", screenId: "sp02", label: "Dịch vụ Content Engine", description: "Content Sprint Pack", route: ROUTES.virtualSprintContent(), iconKey: "edit_document", requiredRole: ["ceo", "business"], group: "sprint", order: 21, status: "active" },
    { id: "virtual-sprint-report", screenId: "sp03", label: "Báo cáo Tăng trưởng Tuần", description: "Weekly Growth Report Pack", route: ROUTES.virtualSprintReport(), iconKey: "trending_up", requiredRole: ["ceo", "business"], group: "sprint", order: 22, status: "active" },
];

export const portalBusinessNav: NavItem[] = [
    { id: "biz-marketplace", screenId: "c05", label: "Marketplace", description: "Sàn quy trình", route: ROUTES.classicMarketplace(), iconKey: "storefront", requiredRole: ["business", "ceo"], group: "classic", order: 1, status: "active" },
    { id: "biz-briefing", screenId: "c07", label: "Đề bài", description: "Đề bài thông minh", route: ROUTES.classicBriefing(), iconKey: "description", requiredRole: ["business", "ceo"], group: "classic", order: 2, status: "active" },
    { id: "biz-projects", screenId: "c09", label: "Dự án", description: "Danh sách dự án", route: ROUTES.classicProjects(), iconKey: "folder", requiredRole: ["business", "ceo"], group: "classic", order: 3, status: "active" },
    { id: "biz-team", screenId: "c12", label: "Nhân sự", description: "Quản lý đội ngũ", route: ROUTES.classicTeam(), iconKey: "group", requiredRole: ["business", "ceo"], group: "classic", order: 4, status: "active" },
    { id: "biz-finance", screenId: "c13", label: "Tài chính", description: "Ví tài chính doanh nghiệp", route: ROUTES.classicFinance(), iconKey: "payments", requiredRole: ["business", "ceo"], group: "classic", order: 5, status: "active" },
    { id: "biz-invoices", screenId: "c14", label: "Hóa đơn", description: "Trung tâm hóa đơn", route: ROUTES.classicInvoices(), iconKey: "receipt_long", requiredRole: ["business", "ceo"], group: "classic", order: 6, status: "active" },
    { id: "biz-reports", screenId: "c16", label: "Báo cáo", description: "Báo cáo & thống kê", route: ROUTES.classicReports(), iconKey: "bar_chart", requiredRole: ["business", "ceo"], group: "classic", order: 7, status: "active" },
    { id: "biz-profile", screenId: "c15", label: "Hồ sơ", description: "Hồ sơ doanh nghiệp", route: ROUTES.classicProfile(), iconKey: "business", requiredRole: ["business", "ceo"], group: "classic", order: 8, status: "active" },
];

export const portalFreelancerNav: NavItem[] = [
    { id: "fl-dashboard", screenId: "f01", label: "Trang chủ", description: "Dashboard freelancer", route: ROUTES.freelancer(), iconKey: "home", requiredRole: ["freelancer"], group: "freelancer", order: 1, status: "active" },
    { id: "fl-jobs", screenId: "f02", label: "Chợ việc", description: "Chợ việc làm", route: ROUTES.freelancerJobs(), iconKey: "work", requiredRole: ["freelancer"], group: "freelancer", order: 2, status: "active" },
    { id: "fl-workspace", screenId: "f03", label: "Bàn làm việc", description: "Workspace freelancer", route: ROUTES.freelancerWorkspace(), iconKey: "desktop_windows", requiredRole: ["freelancer"], group: "freelancer", order: 3, status: "active" },
    { id: "fl-timesheet", screenId: "f05", label: "Chấm công", description: "Timesheet log", route: ROUTES.freelancerTimesheet(), iconKey: "schedule", requiredRole: ["freelancer"], group: "freelancer", order: 4, status: "active" },
    { id: "fl-wallet", screenId: "f06", label: "Thu nhập", description: "Ví cá nhân", route: ROUTES.freelancerWallet(), iconKey: "account_balance_wallet", requiredRole: ["freelancer"], group: "freelancer", order: 5, status: "active" },
    { id: "fl-profile", screenId: "f08", label: "Hồ sơ", description: "Hồ sơ năng lực", route: ROUTES.freelancerProfile(), iconKey: "person", requiredRole: ["freelancer"], group: "freelancer", order: 6, status: "active" },
    { id: "fl-skills", screenId: "f09", label: "Kỹ năng", description: "Trung tâm kiểm tra kỹ năng", route: ROUTES.freelancerSkills(), iconKey: "psychology", requiredRole: ["freelancer"], group: "freelancer", order: 7, status: "active" },
    { id: "fl-learning", screenId: "f11", label: "Học tập", description: "Thư viện e-learning", route: ROUTES.freelancerLearning(), iconKey: "school", requiredRole: ["freelancer"], group: "freelancer", order: 8, status: "active" },
    { id: "fl-bank", screenId: "f12", label: "Ngân hàng", description: "Cài đặt ngân hàng", route: ROUTES.freelancerBank(), iconKey: "account_balance", requiredRole: ["freelancer"], group: "freelancer", order: 9, status: "active" },
];

export const authNav: NavItem[] = [
    { id: "auth-splash", screenId: "s01", label: "Splash", description: "Màn hình chờ", route: ROUTES.splash(), iconKey: "hourglass_empty", requiredRole: ["guest"], group: "auth", order: 1, status: "active" },
    { id: "auth-role", screenId: "s02", label: "Chọn vai trò", description: "Chọn vai trò", route: ROUTES.role(), iconKey: "badge", requiredRole: ["guest"], group: "auth", order: 2, status: "active" },
    { id: "auth-login", screenId: "s03", label: "Đăng nhập", description: "Đăng nhập", route: ROUTES.login(), iconKey: "login", requiredRole: ["guest"], group: "auth", order: 3, status: "active" },
    { id: "auth-otp", screenId: "s04", label: "OTP", description: "Xác thực OTP", route: ROUTES.otp(), iconKey: "pin", requiredRole: ["guest"], group: "auth", order: 4, status: "active" },
    { id: "auth-onboarding", screenId: "s05", label: "Thiết lập", description: "Onboarding wizard", route: ROUTES.onboarding(), iconKey: "tune", requiredRole: ["guest"], group: "auth", order: 5, status: "active" },
];

// ─── All Nav Items ────────────────────────────────────────────────────

export const ALL_NAV_ITEMS: NavItem[] = [
    ...adminNav,
    ...virtualCeoNav,
    ...portalBusinessNav,
    ...portalFreelancerNav,
    ...authNav,
];

// ─── Helpers ──────────────────────────────────────────────────────────

export function getNavForContext(opts: {
    userRole: UserRole;
    context: NavContext;
    featureFlags?: FeatureFlags;
}): NavItem[] {
    const { userRole, context, featureFlags } = opts;

    let items: NavItem[];
    switch (context) {
        case "admin": items = adminNav; break;
        case "portal_business": items = portalBusinessNav; break;
        case "portal_freelancer": items = portalFreelancerNav; break;
        case "virtual_ceo": items = virtualCeoNav; break;
        case "auth": items = authNav; break;
        default: items = [];
    }

    return items
        .filter((item) => item.status === "active")
        .filter((item) => item.requiredRole.includes(userRole))
        .filter((item) => {
            if (!item.guard) return true;
            if (!featureFlags) return true;
            return (featureFlags as Record<string, boolean | undefined>)[item.guard] !== false;
        })
        .sort((a, b) => a.order - b.order);
}

export function findNavTargetByScreenId(screenId: string): string | null {
    const item = ALL_NAV_ITEMS.find(
        (n) => n.screenId.toLowerCase() === screenId.toLowerCase()
    );
    return item?.route ?? null;
}

export function findRouteById(id: string): string | null {
    const item = ALL_NAV_ITEMS.find(
        (n) => n.id.toLowerCase() === id.toLowerCase()
    );
    return item?.route ?? null;
}

// ─── All static routes for validation ─────────────────────────────────

export const ALL_STATIC_ROUTES: string[] = [
    ROUTES.home(),
    ROUTES.splash(),
    ROUTES.role(),
    ROUTES.login(),
    ROUTES.otp(),
    ROUTES.onboarding(),
    ROUTES.search(),
    ROUTES.pricing(),
    ROUTES.teamLanding(),
    ROUTES.dashboard(),
    ROUTES.users(),
    ROUTES.disputes(),
    ROUTES.workflow(),
    ROUTES.adminFinance(),
    ROUTES.notifications(),
    ROUTES.chat(),
    ROUTES.settings(),
    ROUTES.errorStates(),
    ROUTES.virtual(),
    ROUTES.virtualApproval(),
    ROUTES.virtualWarRoom(),
    ROUTES.virtualVoice(),
    ROUTES.virtualSprintLead(),
    ROUTES.virtualSprintContent(),
    ROUTES.virtualSprintReport(),
    ROUTES.classicMarketplace(),
    ROUTES.classicBriefing(),
    ROUTES.classicCheckout(),
    ROUTES.classicProjects(),
    ROUTES.classicTeam(),
    ROUTES.classicFinance(),
    ROUTES.classicInvoices(),
    ROUTES.classicProfile(),
    ROUTES.classicReports(),
    ROUTES.classicFeedback(),
    ROUTES.freelancer(),
    ROUTES.freelancerJobs(),
    ROUTES.freelancerWorkspace(),
    ROUTES.freelancerSubmit(),
    ROUTES.freelancerTimesheet(),
    ROUTES.freelancerWallet(),
    ROUTES.freelancerWithdraw(),
    ROUTES.freelancerProfile(),
    ROUTES.freelancerSkills(),
    ROUTES.freelancerTest(),
    ROUTES.freelancerTestResults(),
    ROUTES.freelancerLearning(),
    ROUTES.freelancerBank(),
];

export function validateNavRegistry(): { broken: string[]; ok: string[] } {
    const broken: string[] = [];
    const ok: string[] = [];

    for (const item of ALL_NAV_ITEMS) {
        if (item.status !== "active") continue;
        if (ALL_STATIC_ROUTES.includes(item.route)) {
            ok.push(`${item.id} → ${item.route}`);
        } else {
            broken.push(`${item.id} → ${item.route} (NOT in static routes)`);
        }
    }

    return { broken, ok };
}
