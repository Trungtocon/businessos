# BusinessOS

> **Hệ điều hành doanh nghiệp thế hệ mới** - Kết nối trí tuệ, Vận hành thông minh

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## 📋 Overview

BusinessOS là nền tảng **Dual-View** đầu tiên tại Việt Nam, kết nối SME và Freelancer trên cùng một hệ sinh thái. Với công nghệ AI, nền tảng giúp CEO quản trị bằng đầu ngón tay và Freelancer tối ưu hiệu suất làm việc.

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS 3.4 |
| **State Management** | Zustand |
| **UI Components** | Shadcn UI, Radix Primitives |
| **Animation** | Framer Motion |
| **Icons** | Material Symbols, Lucide Icons |
| **Notifications** | Sonner Toast |

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/businessos.git
cd businessos

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## 📦 Features / Modules

BusinessOS được chia thành **5 modules chính**:

### 1. 🌐 System (S00)
- Landing Page công khai
- Pricing tiers (Starter, Business, Enterprise)
- SEO & OpenGraph optimization

### 2. 📊 Classic Portal (C00-C02)
- Dashboard với stat cards và biểu đồ
- Project management (Kanban board)
- Finance Hub (Invoices, Transactions)
- Team Management

### 3. ✨ Virtual Mode (C03-C05)
- War Room - AI Chat với 4 chuyên gia ảo
- Voice Command - Điều khiển bằng giọng nói
- Swipe-to-Pay Approval - Phê duyệt nhanh
- Minimalist dark UI với glassmorphism

### 4. 💼 Freelancer Hub (F00-F02)
- Work-to-Earn Timer với tính tiền real-time
- Timesheet tracking
- Project portfolio
- Wallet integration

### 5. 🛡 Admin Panel (A00-A04)
- Super Admin Dashboard
- User management & KYC approval
- Workflow Builder (Drag & Drop)
- System settings

## 📁 Project Structure

```
src/
├── app/
│   ├── (admin)/          # Admin routes (A00-A04)
│   ├── (auth)/           # Authentication (signin, register)
│   ├── (portal)/
│   │   ├── classic/      # Classic Mode (data-dense)
│   │   ├── virtual/      # Virtual Mode (minimalist)
│   │   ├── freelancer/   # Freelancer Hub
│   │   └── portal/       # Shared portal pages
│   ├── page.tsx          # Public Landing Page
│   ├── layout.tsx        # Root Layout with SEO
│   ├── loading.tsx       # Global Loading State
│   └── not-found.tsx     # 404 Page
├── components/
│   └── ui/               # Reusable UI components
├── lib/
│   ├── mock-data.ts      # Mock data for development
│   └── store.ts          # Zustand global state
└── styles/
    └── globals.css       # Global styles & Tailwind config
```

## 🎨 Design System

### Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | `#3B82F6` | CTAs, Links, Highlights |
| Dark Background | `#0F172A` | Virtual Mode, Admin |
| Cyan Accent | `#06B6D4` | Secondary actions |
| Success Green | `#10B981` | Positive states |
| Warning Orange | `#F59E0B` | Pending states |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Icons**: Material Symbols Outlined

## 📖 Documentation

- [HANDOVER.md](./HANDOVER.md) - Technical handover for developers
- [ho_so_ban_giao_du_an.txt](./ho_so_ban_giao_du_an.txt) - Original project specs

## 🔗 Routes

| Route | Description |
|-------|-------------|
| `/` | Public Landing Page |
| `/signin` | Authentication |
| `/portal` | Classic Portal Dashboard |
| `/virtual` | Virtual Mode Hub |
| `/freelancer` | Freelancer Dashboard |
| `/dashboard` | Admin Dashboard |
| `/workflow` | Workflow Builder |

## 📄 License

Copyright © 2024 BusinessOS Corporation. All rights reserved.

---

**Built with ❤️ by BusinessOS Team**
