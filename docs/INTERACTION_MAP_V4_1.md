# Interaction Map V4.1

## /virtual — CEO Cockpit Dashboard

| # | Element | Type | Action | Destination |
|---|---------|------|--------|-------------|
| 1 | BusinessOS logo | Click | `router.push` | `/` |
| 2 | "Truyền thống" toggle | Click | `router.push` | `/classic/projects` |
| 3 | "Chế độ Virtual" toggle | Active state | — | Current page |
| 4 | 🔔 Notifications icon | Click | `router.push` | `/notifications` |
| 5 | 💬 Chat icon | Click | `router.push` | `/chat` |
| 6 | Avatar | Click | `router.push` | `/settings` |
| 7 | **Tài chính** card (green) | Click | `router.push` | `/classic/finance` |
| 8 | **Vận hành** card (amber) | Click | `router.push` | `/classic/projects` |
| 9 | **Tăng trưởng** card (red) | Click | `router.push` | `/classic/reports` |
| 10 | "Duyệt nhanh" button | Click | `router.push` | `/virtual/approval` |
| 11 | "War Room" button | Click | `router.push` | `/virtual/war-room` |
| 12 | "Marketplace" button | Click | `router.push` | `/classic/marketplace` |
| 13 | "Đội ngũ" button | Click | `router.push` | `/classic/team` |
| 14 | "Tìm kiếm" button | Click | `router.push` | `/search` |
| 15 | Floating voice button | Click | `router.push` | `/virtual/voice` |
| 16 | ERP badge | Display-only | `fetch` ping | Shows Connected/Disconnected |

## Reachable Screens from /virtual (1 click)

| Route | Screen |
|-------|--------|
| `/` | Landing page |
| `/classic/finance` | Business finance wallet |
| `/classic/projects` | Project list |
| `/classic/reports` | Reports & analytics |
| `/virtual/approval` | Swipe approval |
| `/virtual/war-room` | AI war room |
| `/virtual/voice` | Voice commands |
| `/classic/marketplace` | Process marketplace |
| `/classic/team` | Team management |
| `/search` | Global search |
| `/notifications` | Notification center |
| `/chat` | Chat list |
| `/settings` | Settings |
