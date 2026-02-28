# BusinessOS - Technical Handover Document

> Tài liệu bàn giao kỹ thuật cho đội ngũ phát triển

---

## 📐 Architecture Overview

### Dual-View Folder Structure

BusinessOS sử dụng kiến trúc **Dual-View** với hai chế độ giao diện hoàn toàn khác biệt:

```
src/app/(portal)/
├── classic/          # DATA-DENSE MODE - Cho CEO & Manager
│   ├── dashboard/    # Stat cards, charts, tables
│   ├── projects/     # Kanban board, project list
│   ├── finance/      # Invoices, transactions
│   └── team/         # Team management
│
└── virtual/          # MINIMALIST MODE - Cho CEO bận rộn
    ├── command/      # AI Command Center
    ├── voice/        # Voice Command interface
    ├── war-room/     # AI Chat với 4 agents
    └── approval/     # Swipe-to-Pay approval
```

### Route Groups Explained

Next.js App Router sử dụng **route groups** với dấu ngoặc đơn `()`:

| Folder | Route Prefix | Purpose |
|--------|--------------|---------|
| `(admin)` | `/` (no prefix) | Admin panel, uses `/dashboard`, `/workflow` |
| `(auth)` | `/` (no prefix) | Auth pages: `/signin`, `/register` |
| `(portal)` | `/` (no prefix) | Main app: `/portal`, `/virtual`, `/freelancer` |

### Layout Hierarchy

```
layout.tsx (root)
├── (admin)/layout.tsx   → Dark purple theme
├── (auth)/layout.tsx    → Light minimal theme
└── (portal)/layout.tsx  → Shared sidebar + header
    ├── classic/         → White/light mode
    └── virtual/         → Dark glassmorphism
```

---

## 🗃 State Management

### Zustand Store (`src/lib/store.ts`)

Toàn bộ state được quản lý bởi **Zustand** với các slices:

```typescript
// Store structure
interface AppStore {
  // User State
  user: {
    id: string;
    name: string;
    email: string;
    role: "CEO" | "Freelancer" | "Admin";
    avatar: string;
  };
  
  // Wallet State
  wallet: {
    balance: number;           // Số dư khả dụng
    pendingBalance: number;    // Đang chờ xử lý
    transactions: Transaction[];
  };
  
  // Actions
  setUser: (user) => void;
  updateBalance: (amount) => void;
  addPendingBalance: (amount) => void;
  deductBalance: (amount) => void;
}
```

### Usage Pattern

```tsx
// ✅ CORRECT: Truy cập state trực tiếp
const balance = useStore((state) => state.wallet.balance);

// ✅ CORRECT: Gọi action trong callback
const handlePayment = () => {
  useStore.getState().wallet.deductBalance(amount);
};

// ❌ AVOID: Hook trong useEffect gây re-render loop
const { deduct } = useWalletActions(); // Tránh pattern này
```

### Important Note

Khi gọi actions trong callbacks hoặc effects, sử dụng `useStore.getState()` thay vì hooks để tránh vòng lặp re-render.

---

## 📊 Mock Data Layer

### Current State

Dữ liệu hiện tại được mock trong `src/lib/mock-data.ts`:

```typescript
// Available exports
export const MOCK_PROJECTS: Project[];      // 10 dự án mẫu
export const MOCK_FREELANCERS: Freelancer[]; // 8 freelancers
export const MOCK_INVOICES: Invoice[];       // 5 hóa đơn
export const MOCK_NOTIFICATIONS: Notification[];
export const MOCK_TRANSACTIONS: Transaction[];

// Admin-specific
export const MOCK_ADMIN_STATS: AdminStats;   // Revenue, users, disputes
export const MOCK_RECENT_USERS: RecentUser[]; // 5 users pending KYC
export const MOCK_USER_GROWTH: DailyGrowth[]; // 7-day chart data
```

### Migration to Real API

Khi tích hợp backend, thay thế mock data bằng API calls:

```typescript
// Before (Mock)
import { MOCK_PROJECTS } from "@/lib/mock-data";
const projects = MOCK_PROJECTS;

// After (API)
const { data: projects } = await fetch('/api/projects');
// Or with SWR/React Query:
const { data: projects } = useSWR('/api/projects', fetcher);
```

### Data Types

Tất cả interfaces được định nghĩa trong `mock-data.ts`:

- `Project` - Dự án với budget, progress, team
- `Freelancer` - Thông tin freelancer với hourlyRate
- `Invoice` - Hóa đơn với status (Paid/Pending/Overdue)
- `Transaction` - Giao dịch income/expense
- `AdminStats` - Thống kê admin dashboard
- `RecentUser` - User với KYC status

---

## 🎨 Design Tokens

### Tailwind Configuration (`tailwind.config.ts`)

```typescript
// Primary Colors
colors: {
  primary: '#3B82F6',     // Blue - CTAs, links
  secondary: '#06B6D4',    // Cyan - Accents
  background: {
    light: '#FFFFFF',      // Classic Mode
    dark: '#0F172A',       // Virtual Mode, Admin
  },
  surface: {
    light: '#F8FAFC',      // Cards (light)
    dark: '#1E293B',       // Cards (dark)
  },
}

// Status Colors
success: '#10B981',   // Emerald
warning: '#F59E0B',   // Amber
error: '#EF4444',     // Red
info: '#3B82F6',      // Blue
```

### CSS Variables (Optional)

Có thể extend với CSS custom properties trong `globals.css`:

```css
:root {
  --brand-primary: #3B82F6;
  --brand-secondary: #06B6D4;
  --bg-dark: #0F172A;
}
```

### Theme Conventions

| Mode | Background | Cards | Text |
|------|------------|-------|------|
| Classic | `bg-white` | `bg-slate-50` | `text-slate-900` |
| Virtual | `bg-slate-950` | `bg-white/5` | `text-white` |
| Admin | `bg-purple-950` | `bg-purple-500/20` | `text-white` |

---

## 🧩 UI Components

### Shared Components (`src/components/ui/`)

| Component | File | Usage |
|-----------|------|-------|
| Button | `Button.tsx` | Primary, Secondary, Ghost variants |
| Card | `card.tsx` | Container with border/shadow |
| Input | `Input.tsx` | Form inputs |
| Icons | `icons.tsx` | Custom SVG icons |

### Icon System

Sử dụng **Material Symbols Outlined**:

```tsx
<span className="material-symbols-outlined">dashboard</span>
<span className="material-symbols-outlined">person</span>
```

Để thay đổi style:
- Weight: `font-variation-settings: 'wght' 400`
- Fill: `font-variation-settings: 'FILL' 1`

---

## 🔌 Key Integrations

### Toast Notifications (Sonner)

```tsx
import { toast, Toaster } from "sonner";

// In component
<Toaster richColors position="top-right" />

// Usage
toast.success("Thành công!");
toast.error("Có lỗi xảy ra");
toast.info("Thông báo", { description: "Chi tiết..." });
```

### Animations (Framer Motion)

```tsx
import { motion, AnimatePresence } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
>
  Content
</motion.div>
```

---

## 📝 TODO / Next Steps

### Backend Integration

- [ ] Replace `mock-data.ts` with API endpoints
- [ ] Implement authentication (NextAuth.js recommended)
- [ ] Connect Zustand to API for persistence
- [ ] Add real-time updates (WebSocket/SSE)

### Features Pending

- [ ] Real voice recognition (Web Speech API)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] File upload/attachment system

### Testing

- [ ] Unit tests for store actions
- [ ] E2E tests with Playwright
- [ ] Component tests with React Testing Library

---

## 📞 Support

For technical questions, contact the development team or refer to:

- [README.md](./README.md) - Project overview
- [ho_so_ban_giao_du_an.txt](./ho_so_ban_giao_du_an.txt) - Original specs

---

**Last Updated:** February 2026  
**Document Version:** 1.0
