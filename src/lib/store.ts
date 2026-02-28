import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
    MOCK_PROJECTS,
    MOCK_NOTIFICATIONS,
    MOCK_FREELANCERS,
    type Project,
    type Notification,
    type Freelancer,
} from "./mock-data";

// ============================================
// Types
// ============================================
export type UserRole = "CEO" | "Business" | "Freelancer" | "Admin";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl: string;
    company?: string;
}

export interface WalletState {
    balance: number;
    pendingBalance: number;
    currency: string;
}

// ============================================
// User Slice
// ============================================
interface UserSlice {
    user: UserProfile | null;
    isAuthenticated: boolean;
    setUser: (user: UserProfile) => void;
    setRole: (role: UserRole) => void;
    logout: () => void;
}

// ============================================
// Wallet Slice
// ============================================
interface WalletSlice {
    wallet: WalletState;
    topup: (amount: number) => void;
    deduct: (amount: number) => boolean;
    setPending: (amount: number) => void;
}

// ============================================
// Notification Slice
// ============================================
interface NotificationSlice {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Omit<Notification, "id">) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
}

// ============================================
// Project Slice
// ============================================
interface ProjectSlice {
    projects: Project[];
    activeProjectId: string | null;
    setProjects: (projects: Project[]) => void;
    updateProjectStatus: (id: string, status: Project["status"]) => void;
    updateProjectProgress: (id: string, progress: number) => void;
    setActiveProject: (id: string | null) => void;
    getActiveProjects: () => Project[];
    getPendingProjects: () => Project[];
}

// ============================================
// Freelancer Slice
// ============================================
interface FreelancerSlice {
    freelancers: Freelancer[];
    setFreelancers: (freelancers: Freelancer[]) => void;
    updateAvailability: (id: string, available: boolean) => void;
}

// ============================================
// UI Slice (for app-wide UI state)
// ============================================
interface UISlice {
    sidebarCollapsed: boolean;
    theme: "light" | "dark" | "system";
    toggleSidebar: () => void;
    setTheme: (theme: "light" | "dark" | "system") => void;
}

// ============================================
// Combined Store Type
// ============================================
type StoreState = UserSlice &
    WalletSlice &
    NotificationSlice &
    ProjectSlice &
    FreelancerSlice &
    UISlice;

// ============================================
// Initial State Values
// ============================================
const initialUser: UserProfile = {
    id: "USR-001",
    name: "Nguyễn Văn CEO",
    email: "ceo@business.com",
    role: "CEO",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    company: "BusinessOS Corp",
};

const initialWallet: WalletState = {
    balance: 125000000, // 125,000,000 VND
    pendingBalance: 15000000, // 15,000,000 VND
    currency: "VND",
};

// ============================================
// Store Implementation
// ============================================
export const useStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => ({
                // ========== User Slice ==========
                user: initialUser,
                isAuthenticated: true,

                setUser: (user) => set({ user, isAuthenticated: true }, false, "setUser"),

                setRole: (role) =>
                    set(
                        (state) => ({
                            user: state.user ? { ...state.user, role } : null,
                        }),
                        false,
                        "setRole"
                    ),

                logout: () =>
                    set(
                        { user: null, isAuthenticated: false },
                        false,
                        "logout"
                    ),

                // ========== Wallet Slice ==========
                wallet: initialWallet,

                topup: (amount) =>
                    set(
                        (state) => ({
                            wallet: {
                                ...state.wallet,
                                balance: state.wallet.balance + amount,
                            },
                        }),
                        false,
                        "topup"
                    ),

                deduct: (amount) => {
                    const { wallet } = get();
                    if (wallet.balance >= amount) {
                        set(
                            (state) => ({
                                wallet: {
                                    ...state.wallet,
                                    balance: state.wallet.balance - amount,
                                },
                            }),
                            false,
                            "deduct"
                        );
                        return true;
                    }
                    return false;
                },

                setPending: (amount) =>
                    set(
                        (state) => ({
                            wallet: {
                                ...state.wallet,
                                pendingBalance: amount,
                            },
                        }),
                        false,
                        "setPending"
                    ),

                // ========== Notification Slice ==========
                notifications: MOCK_NOTIFICATIONS,
                unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.read).length,

                addNotification: (notification) =>
                    set(
                        (state) => {
                            const newNotification: Notification = {
                                ...notification,
                                id: `NTF-${Date.now()}`,
                            };
                            return {
                                notifications: [newNotification, ...state.notifications],
                                unreadCount: state.unreadCount + (notification.read ? 0 : 1),
                            };
                        },
                        false,
                        "addNotification"
                    ),

                markAsRead: (id) =>
                    set(
                        (state) => {
                            const notifications = state.notifications.map((n) =>
                                n.id === id ? { ...n, read: true } : n
                            );
                            const unreadCount = notifications.filter((n) => !n.read).length;
                            return { notifications, unreadCount };
                        },
                        false,
                        "markAsRead"
                    ),

                markAllAsRead: () =>
                    set(
                        (state) => ({
                            notifications: state.notifications.map((n) => ({ ...n, read: true })),
                            unreadCount: 0,
                        }),
                        false,
                        "markAllAsRead"
                    ),

                clearNotifications: () =>
                    set({ notifications: [], unreadCount: 0 }, false, "clearNotifications"),

                // ========== Project Slice ==========
                projects: MOCK_PROJECTS,
                activeProjectId: null,

                setProjects: (projects) => set({ projects }, false, "setProjects"),

                updateProjectStatus: (id, status) =>
                    set(
                        (state) => ({
                            projects: state.projects.map((p) =>
                                p.id === id ? { ...p, status } : p
                            ),
                        }),
                        false,
                        "updateProjectStatus"
                    ),

                updateProjectProgress: (id, progress) =>
                    set(
                        (state) => ({
                            projects: state.projects.map((p) =>
                                p.id === id ? { ...p, progress: Math.min(100, Math.max(0, progress)) } : p
                            ),
                        }),
                        false,
                        "updateProjectProgress"
                    ),

                setActiveProject: (id) => set({ activeProjectId: id }, false, "setActiveProject"),

                getActiveProjects: () => get().projects.filter((p) => p.status === "Active"),

                getPendingProjects: () => get().projects.filter((p) => p.status === "Pending"),

                // ========== Freelancer Slice ==========
                freelancers: MOCK_FREELANCERS,

                setFreelancers: (freelancers) => set({ freelancers }, false, "setFreelancers"),

                updateAvailability: (id, available) =>
                    set(
                        (state) => ({
                            freelancers: state.freelancers.map((f) =>
                                f.id === id ? { ...f, available } : f
                            ),
                        }),
                        false,
                        "updateAvailability"
                    ),

                // ========== UI Slice ==========
                sidebarCollapsed: false,
                theme: "light",

                toggleSidebar: () =>
                    set(
                        (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
                        false,
                        "toggleSidebar"
                    ),

                setTheme: (theme) => set({ theme }, false, "setTheme"),
            }),
            {
                name: "businessos-storage",
                partialize: (state) => ({
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                    wallet: state.wallet,
                    theme: state.theme,
                    sidebarCollapsed: state.sidebarCollapsed,
                }),
            }
        ),
        { name: "BusinessOS Store" }
    )
);

// ============================================
// Selector Hooks (for optimized re-renders)
// ============================================
export const useUser = () => useStore((state) => state.user);
export const useIsAuthenticated = () => useStore((state) => state.isAuthenticated);
export const useWallet = () => useStore((state) => state.wallet);
export const useNotifications = () => useStore((state) => state.notifications);
export const useUnreadCount = () => useStore((state) => state.unreadCount);
export const useProjects = () => useStore((state) => state.projects);
export const useFreelancers = () => useStore((state) => state.freelancers);
export const useTheme = () => useStore((state) => state.theme);

// ============================================
// Action Hooks (for dispatching actions)
// ============================================
export const useUserActions = () =>
    useStore((state) => ({
        setUser: state.setUser,
        setRole: state.setRole,
        logout: state.logout,
    }));

export const useWalletActions = () =>
    useStore((state) => ({
        topup: state.topup,
        deduct: state.deduct,
        setPending: state.setPending,
    }));

export const useNotificationActions = () =>
    useStore((state) => ({
        addNotification: state.addNotification,
        markAsRead: state.markAsRead,
        markAllAsRead: state.markAllAsRead,
        clearNotifications: state.clearNotifications,
    }));

export const useProjectActions = () =>
    useStore((state) => ({
        setProjects: state.setProjects,
        updateProjectStatus: state.updateProjectStatus,
        updateProjectProgress: state.updateProjectProgress,
        setActiveProject: state.setActiveProject,
        getActiveProjects: state.getActiveProjects,
        getPendingProjects: state.getPendingProjects,
    }));
