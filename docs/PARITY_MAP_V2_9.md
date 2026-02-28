# Parity Map — Business OS V2.9

## Stitch → Route Mapping (62 folders → 41 routes)

| # | Stitch Folder | Route | Category |
|---|---|---|---|
| 1 | s01 Splash & Intro | `/splash` | Auth |
| 2 | s02 Role Selection | `/role` | Auth |
| 3 | s03 Sign In | `/login` | Auth |
| 4 | s04 OTP Verification | `/otp` | Auth |
| 5 | s05 Onboarding Wizard | `/onboarding` | Auth |
| 6 | s06 Global Search | `/search` | Shared |
| 7 | a01 Super Admin Dash | `/dashboard` | Admin |
| 8 | a02 User Management | `/users` | Admin |
| 9 | a03 Dispute Center | (merged into admin) | Admin |
| 10 | a04 Workflow Builder | `/workflow` | Admin |
| 11 | a05 Finance Control | (merged into admin) | Admin |
| 12 | a06 Notification Center | `/notifications` | Admin |
| 13 | a07/a08 Chat | `/chat` | Admin |
| 14 | a10 Settings | `/settings` | Admin |
| 15 | a11 Error States | `/error-states` | Admin |
| 16 | c01 Cockpit Dashboard | `/virtual` | Virtual |
| 17 | c02 Swipe Approval | `/virtual/approval` | Virtual |
| 18 | c03 War Room | `/virtual/war-room` | Virtual |
| 19 | c04 Voice Command | `/virtual/voice` | Virtual |
| 20 | c05 Marketplace Home | `/classic/marketplace` | Classic |
| 21 | c07 Smart Briefing | `/classic/briefing` | Classic |
| 22 | c08 Checkout & Payment | `/classic/checkout` | Classic |
| 23 | c09 Project List | `/classic/projects` | Classic |
| 24 | c12 My Team | `/classic/team` | Classic |
| 25 | c13 Finance Wallet | `/classic/finance` | Classic |
| 26 | c14 Invoice Center | `/classic/invoices` | Classic |
| 27 | c15 Client Profile | `/classic/profile` | Classic |
| 28 | c16 Report View | `/classic/reports` | Classic |
| 29 | c17 Feedback Popup | `/classic/feedback` | Classic |
| 30 | f01 Job Dashboard | `/freelancer` | Freelancer |
| 31 | f02 Job Market | `/freelancer/jobs` | Freelancer |
| 32 | f03 Workspace | `/freelancer/workspace` | Freelancer |
| 33 | f04 Submit Work | `/freelancer/submit` | Freelancer |
| 34 | f05 Timesheet Log | `/freelancer/timesheet` | Freelancer |
| 35 | f06 Income & Wallet | `/freelancer/wallet` | Freelancer |
| 36 | f07 Withdraw Request | `/freelancer/withdraw` | Freelancer |
| 37 | f08 My Profile | `/freelancer/profile` | Freelancer |
| 38 | f09 Skill Test Center | `/freelancer/skills` | Freelancer |
| 39 | f10 Taking Test UI | `/freelancer/test` | Freelancer |
| 40 | f11 E-Learning Lib | `/freelancer/learning` | Freelancer |
| 41 | f12 Bank Settings | `/freelancer/bank` | Freelancer |

### Notes
- Stitch folders with multiple variants (c12_1/c12_2, c15_1/c15_2, etc.) map to a single route with tab/state variations.
- UI Kit reference folders (button states, dropdowns, modals, etc.) are design system references, not individual routes.
- Pricing page and Team page are standalone shared routes.
