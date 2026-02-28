/**
 * Mock Data Layer for BusinessOS
 * Provides realistic Vietnamese business data for dashboards and UI components
 */

// ============================================
// Types
// ============================================
export interface Project {
    id: string;
    name: string;
    client: string;
    status: "Active" | "Pending" | "Completed" | "On Hold";
    budget: number;
    spent: number;
    progress: number;
    deadline: string;
    team: string[];
}

export interface Freelancer {
    id: string;
    name: string;
    role: "Designer" | "Developer" | "Copywriter" | "SEO Specialist" | "Video Editor";
    avatarUrl: string;
    hourlyRate: number;
    rating: number;
    projectsCompleted: number;
    available: boolean;
}

export interface Invoice {
    id: string;
    projectName: string;
    client: string;
    amount: number;
    date: string;
    dueDate: string;
    status: "Paid" | "Pending" | "Overdue";
}

export interface Notification {
    id: string;
    type: "approval" | "message" | "payment" | "task" | "system";
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
    avatarUrl?: string;
}

export interface Transaction {
    id: string;
    type: "income" | "expense";
    description: string;
    amount: number;
    date: string;
    category: string;
}

// ============================================
// Mock Projects
// ============================================
export const MOCK_PROJECTS: Project[] = [
    {
        id: "PRJ-001",
        name: "Website E-commerce Thời Trang",
        client: "Công ty TNHH ABC Fashion",
        status: "Active",
        budget: 150000000,
        spent: 87500000,
        progress: 65,
        deadline: "2024-06-30",
        team: ["Minh Hoàng", "Thu Hà", "Văn Nam"],
    },
    {
        id: "PRJ-002",
        name: "Chiến dịch SEO Tổng Thể Q3",
        client: "TechViet Solutions",
        status: "Active",
        budget: 80000000,
        spent: 32000000,
        progress: 40,
        deadline: "2024-09-15",
        team: ["Anh Tuấn", "Phương Linh"],
    },
    {
        id: "PRJ-003",
        name: "App Mobile Quản Lý Kho",
        client: "Logistics Pro Vietnam",
        status: "Pending",
        budget: 250000000,
        spent: 0,
        progress: 0,
        deadline: "2024-12-01",
        team: [],
    },
    {
        id: "PRJ-004",
        name: "Thiết kế UI/UX Dashboard",
        client: "FinanceHub JSC",
        status: "Active",
        budget: 45000000,
        spent: 38000000,
        progress: 85,
        deadline: "2024-05-20",
        team: ["Thu Hà", "Minh Anh"],
    },
    {
        id: "PRJ-005",
        name: "Landing Page Ra Mắt Sản Phẩm",
        client: "GreenTech Startup",
        status: "Completed",
        budget: 25000000,
        spent: 24500000,
        progress: 100,
        deadline: "2024-04-15",
        team: ["Văn Nam"],
    },
    {
        id: "PRJ-006",
        name: "Hệ Thống CRM Tùy Chỉnh",
        client: "Bất động sản Hoàng Gia",
        status: "Active",
        budget: 350000000,
        spent: 175000000,
        progress: 50,
        deadline: "2024-08-30",
        team: ["Minh Hoàng", "Anh Tuấn", "Văn Nam", "Thu Hà"],
    },
    {
        id: "PRJ-007",
        name: "Video Marketing Series",
        client: "FoodDelivery Vietnam",
        status: "On Hold",
        budget: 60000000,
        spent: 15000000,
        progress: 25,
        deadline: "2024-07-01",
        team: ["Phương Linh"],
    },
    {
        id: "PRJ-008",
        name: "Tối Ưu Hóa Performance Web",
        client: "NewsPortal 24h",
        status: "Active",
        budget: 35000000,
        spent: 28000000,
        progress: 80,
        deadline: "2024-05-25",
        team: ["Anh Tuấn"],
    },
    {
        id: "PRJ-009",
        name: "Chatbot AI Hỗ Trợ Khách Hàng",
        client: "Ngân hàng Số ABC",
        status: "Pending",
        budget: 180000000,
        spent: 0,
        progress: 0,
        deadline: "2024-10-01",
        team: [],
    },
    {
        id: "PRJ-010",
        name: "Rebrand Identity Doanh Nghiệp",
        client: "Công ty CP Kiến Trúc VINA",
        status: "Active",
        budget: 95000000,
        spent: 47500000,
        progress: 55,
        deadline: "2024-06-15",
        team: ["Thu Hà", "Minh Anh"],
    },
];

// ============================================
// Mock Freelancers
// ============================================
export const MOCK_FREELANCERS: Freelancer[] = [
    {
        id: "FRL-001",
        name: "Nguyễn Minh Hoàng",
        role: "Developer",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        hourlyRate: 450000,
        rating: 4.9,
        projectsCompleted: 28,
        available: true,
    },
    {
        id: "FRL-002",
        name: "Trần Thu Hà",
        role: "Designer",
        avatarUrl: "https://i.pravatar.cc/150?img=5",
        hourlyRate: 380000,
        rating: 4.8,
        projectsCompleted: 35,
        available: true,
    },
    {
        id: "FRL-003",
        name: "Lê Văn Nam",
        role: "Developer",
        avatarUrl: "https://i.pravatar.cc/150?img=8",
        hourlyRate: 400000,
        rating: 4.7,
        projectsCompleted: 22,
        available: false,
    },
    {
        id: "FRL-004",
        name: "Phạm Anh Tuấn",
        role: "SEO Specialist",
        avatarUrl: "https://i.pravatar.cc/150?img=12",
        hourlyRate: 320000,
        rating: 4.9,
        projectsCompleted: 41,
        available: true,
    },
    {
        id: "FRL-005",
        name: "Ngô Phương Linh",
        role: "Copywriter",
        avatarUrl: "https://i.pravatar.cc/150?img=9",
        hourlyRate: 280000,
        rating: 4.6,
        projectsCompleted: 56,
        available: true,
    },
    {
        id: "FRL-006",
        name: "Đặng Minh Anh",
        role: "Designer",
        avatarUrl: "https://i.pravatar.cc/150?img=16",
        hourlyRate: 350000,
        rating: 4.8,
        projectsCompleted: 19,
        available: true,
    },
    {
        id: "FRL-007",
        name: "Hoàng Đức Thịnh",
        role: "Video Editor",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        hourlyRate: 420000,
        rating: 4.7,
        projectsCompleted: 15,
        available: false,
    },
    {
        id: "FRL-008",
        name: "Vũ Thị Hồng Nhung",
        role: "Developer",
        avatarUrl: "https://i.pravatar.cc/150?img=20",
        hourlyRate: 480000,
        rating: 5.0,
        projectsCompleted: 33,
        available: true,
    },
];

// ============================================
// Mock Invoices
// ============================================
export const MOCK_INVOICES: Invoice[] = [
    {
        id: "INV-2024-001",
        projectName: "Website E-commerce Thời Trang",
        client: "Công ty TNHH ABC Fashion",
        amount: 50000000,
        date: "2024-04-01",
        dueDate: "2024-04-15",
        status: "Paid",
    },
    {
        id: "INV-2024-002",
        projectName: "Chiến dịch SEO Tổng Thể Q3",
        client: "TechViet Solutions",
        amount: 25000000,
        date: "2024-04-10",
        dueDate: "2024-04-25",
        status: "Pending",
    },
    {
        id: "INV-2024-003",
        projectName: "Thiết kế UI/UX Dashboard",
        client: "FinanceHub JSC",
        amount: 38000000,
        date: "2024-03-20",
        dueDate: "2024-04-05",
        status: "Overdue",
    },
    {
        id: "INV-2024-004",
        projectName: "Landing Page Ra Mắt Sản Phẩm",
        client: "GreenTech Startup",
        amount: 24500000,
        date: "2024-04-15",
        dueDate: "2024-04-30",
        status: "Paid",
    },
    {
        id: "INV-2024-005",
        projectName: "Hệ Thống CRM Tùy Chỉnh",
        client: "Bất động sản Hoàng Gia",
        amount: 100000000,
        date: "2024-04-20",
        dueDate: "2024-05-05",
        status: "Pending",
    },
];

// ============================================
// Mock Notifications
// ============================================
export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "NTF-001",
        type: "approval",
        title: "Yêu cầu phê duyệt thanh toán",
        description: "Nguyễn Văn A yêu cầu phê duyệt thanh toán 50.000.000đ cho dự án SEO Q3",
        timestamp: "2024-05-24T10:30:00",
        read: false,
        avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: "NTF-002",
        type: "message",
        title: "Tin nhắn mới từ Thu Hà",
        description: "Anh ơi, em đã hoàn thành mockup cho Dashboard, anh review giúp em nhé!",
        timestamp: "2024-05-24T09:15:00",
        read: false,
        avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "NTF-003",
        type: "payment",
        title: "Thanh toán đã nhận",
        description: "ABC Fashion đã thanh toán 50.000.000đ cho hóa đơn INV-2024-001",
        timestamp: "2024-05-23T16:45:00",
        read: true,
    },
    {
        id: "NTF-004",
        type: "task",
        title: "Task mới được giao",
        description: "Bạn được giao task 'Tối ưu tốc độ tải trang' trong dự án NewsPortal",
        timestamp: "2024-05-23T14:20:00",
        read: true,
    },
    {
        id: "NTF-005",
        type: "system",
        title: "Cập nhật hệ thống",
        description: "BusinessOS v2.1 đã được cập nhật với nhiều tính năng mới",
        timestamp: "2024-05-22T08:00:00",
        read: true,
    },
];

// ============================================
// Mock Transactions
// ============================================
export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: "TXN-001",
        type: "income",
        description: "Thanh toán từ ABC Fashion",
        amount: 50000000,
        date: "2024-05-24",
        category: "Dự án",
    },
    {
        id: "TXN-002",
        type: "expense",
        description: "Thanh toán freelancer Minh Hoàng",
        amount: 15000000,
        date: "2024-05-23",
        category: "Nhân sự",
    },
    {
        id: "TXN-003",
        type: "income",
        description: "Thanh toán từ GreenTech Startup",
        amount: 24500000,
        date: "2024-05-22",
        category: "Dự án",
    },
    {
        id: "TXN-004",
        type: "expense",
        description: "Phí dịch vụ Cloud hosting",
        amount: 2500000,
        date: "2024-05-21",
        category: "Vận hành",
    },
    {
        id: "TXN-005",
        type: "expense",
        description: "Thanh toán freelancer Thu Hà",
        amount: 12000000,
        date: "2024-05-20",
        category: "Nhân sự",
    },
];

// ============================================
// Admin Dashboard Types
// ============================================
export interface AdminStats {
    totalRevenue: string;
    totalRevenueValue: number;
    activeUsers: number;
    disputeRate: string;
    disputeCount: number;
    pendingKYC: number;
    platformFee: number;
}

export interface RecentUser {
    id: string;
    name: string;
    email: string;
    role: "Business" | "Freelancer";
    registeredAt: string;
    avatarUrl: string;
    kycStatus: "Pending" | "Approved" | "Rejected";
    phone: string;
}

export interface DailyGrowth {
    day: string;
    newUsers: number;
    label: string;
}

// ============================================
// Mock Admin Stats
// ============================================
export const MOCK_ADMIN_STATS: AdminStats = {
    totalRevenue: "12.5B VND",
    totalRevenueValue: 12500000000,
    activeUsers: 1240,
    disputeRate: "2.1%",
    disputeCount: 26,
    pendingKYC: 18,
    platformFee: 375000000,
};

// ============================================
// Mock Recent Users
// ============================================
export const MOCK_RECENT_USERS: RecentUser[] = [
    {
        id: "USR-001",
        name: "Trần Văn Minh",
        email: "minh.tran@company.vn",
        role: "Business",
        registeredAt: "2024-05-24T14:30:00",
        avatarUrl: "https://i.pravatar.cc/150?img=33",
        kycStatus: "Pending",
        phone: "0901234567",
    },
    {
        id: "USR-002",
        name: "Lê Thị Hương",
        email: "huong.le@freelancer.vn",
        role: "Freelancer",
        registeredAt: "2024-05-24T12:15:00",
        avatarUrl: "https://i.pravatar.cc/150?img=25",
        kycStatus: "Pending",
        phone: "0912345678",
    },
    {
        id: "USR-003",
        name: "Nguyễn Đức Anh",
        email: "anh.nguyen@startup.vn",
        role: "Business",
        registeredAt: "2024-05-24T10:45:00",
        avatarUrl: "https://i.pravatar.cc/150?img=52",
        kycStatus: "Pending",
        phone: "0923456789",
    },
    {
        id: "USR-004",
        name: "Phạm Thùy Linh",
        email: "linh.pham@design.vn",
        role: "Freelancer",
        registeredAt: "2024-05-23T16:20:00",
        avatarUrl: "https://i.pravatar.cc/150?img=44",
        kycStatus: "Approved",
        phone: "0934567890",
    },
    {
        id: "USR-005",
        name: "Hoàng Quốc Việt",
        email: "viet.hoang@tech.vn",
        role: "Business",
        registeredAt: "2024-05-23T09:00:00",
        avatarUrl: "https://i.pravatar.cc/150?img=60",
        kycStatus: "Pending",
        phone: "0945678901",
    },
];

// ============================================
// Mock User Growth (7 days)
// ============================================
export const MOCK_USER_GROWTH: DailyGrowth[] = [
    { day: "Mon", newUsers: 45, label: "T2" },
    { day: "Tue", newUsers: 62, label: "T3" },
    { day: "Wed", newUsers: 38, label: "T4" },
    { day: "Thu", newUsers: 85, label: "T5" },
    { day: "Fri", newUsers: 73, label: "T6" },
    { day: "Sat", newUsers: 28, label: "T7" },
    { day: "Sun", newUsers: 19, label: "CN" },
];

// ============================================
// Utility Functions
// ============================================

/**
 * Format Vietnamese currency
 */
export function formatVND(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
}

/**
 * Format compact number (e.g., 1.5M)
 */
export function formatCompact(amount: number): string {
    if (amount >= 1000000000) {
        return `${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        Active: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Completed: "bg-blue-100 text-blue-700",
        "On Hold": "bg-gray-100 text-gray-700",
        Paid: "bg-green-100 text-green-700",
        Overdue: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
}
