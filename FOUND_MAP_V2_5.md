# FOUND MAP V2.5 — Screen Inventory & Route Mapping

> Generated: 2026-02-15 | Screens: 51 mapped | Build: ✅ pass

## Summary
| Metric | Count |
|--------|-------|
| Total stitch folders | 62 |
| App screen folders | 44 (s/c/f/a prefixed) |
| Non-routable folders (UI kit, flow diagrams) | 8 |
| Duplicate-variant folders (c04b, c12b, c15b, c16b, f11b) | 5 |
| Landing/reference (pricing, team, test results) | 3 |
| **Total unique routes mapped** | **51** |
| Routes with existing pages | 47 |
| Routes with NEW pages created | 4 |
| Pages with AI Copilot entry | 46 (via group layouts) |
| Pages WITHOUT AI entry (auth screens) | 5 |
| High confidence | 46 |
| Medium confidence | 5 |

## Full Mapping

| # | Screen ID | Stitch Folder | Route | Page File | Exists? | AI? | Confidence |
|---|-----------|---------------|-------|-----------|---------|-----|------------|
| 1 | s00 | s00._trang_chủ_giới_thiệu | `/` | page.tsx | ✅ | ✅ | high |
| 2 | s01 | s01._splash_&_intro | `/splash` | (auth)/splash | ✅ | ❌ | high |
| 3 | s02 | s02._role_selection | `/role` | (auth)/role | ✅ | ❌ | high |
| 4 | s03 | s03._sign_in | `/login` | (auth)/login | ✅ | ❌ | high |
| 5 | s04 | s04._otp_verification | `/otp` | (auth)/otp | ✅ | ❌ | high |
| 6 | s05 | s05._onboarding_wizard | `/onboarding` | (auth)/onboarding | ✅ | ❌ | high |
| 7 | s06 | s06._global_search | `/search` | (portal)/search | ✅ | ✅ | high |
| 8 | a01 | a01._super_admin_dash | `/dashboard` | (admin)/dashboard | ✅ | ✅ | high |
| 9 | a02 | a02._user_management | `/users` | (admin)/users | **NEW** | ✅ | medium |
| 10 | a03 | a03._dispute_center | `/disputes` | (admin)/disputes | **NEW** | ✅ | medium |
| 11 | a04 | a04._workflow_builder | `/workflow` | (admin)/workflow | ✅ | ✅ | high |
| 12 | a05 | a05._finance_control | `/finance` | (admin)/finance | **NEW** | ✅ | medium |
| 13 | a06 | a06._notification_center | `/notifications` | (admin)/notifications | ✅ | ✅ | high |
| 14 | a07 | a07._chat_list | `/chat` | (admin)/chat | ✅ | ✅ | high |
| 15 | a08 | a08._chat_detail | `/chat/[id]` | (admin)/chat/[id] | ✅ | ✅ | high |
| 16 | a10 | a10._settings | `/settings` | (admin)/settings | ✅ | ✅ | high |
| 17 | a11 | a11._error_states | `/error-states` | (admin)/error-states | ✅ | ✅ | high |
| 18 | c01 | c01._cockpit_dashboard | `/virtual` | (portal)/virtual | ✅ | ✅ | high |
| 19 | c02 | c02._swipe_approval | `/virtual/approval` | (portal)/virtual/approval | ✅ | ✅ | high |
| 20 | c03 | c03._war_room | `/virtual/war-room` | (portal)/virtual/war-room | ✅ | ✅ | high |
| 21 | c04 | c04._voice_command | `/virtual/voice` | (portal)/virtual/voice | ✅ | ✅ | high |
| 22 | c05 | c05._marketplace_home | `/classic/marketplace` | (portal)/classic/marketplace | ✅ | ✅ | high |
| 23 | c06 | c06._service_detail | `/classic/marketplace/[id]` | (portal)/classic/marketplace/[id] | ✅ | ✅ | high |
| 24 | c07 | c07._smart_briefing | `/classic/briefing` | (portal)/classic/briefing | ✅ | ✅ | high |
| 25 | c08 | c08._checkout | `/classic/checkout` | (portal)/classic/checkout | ✅ | ✅ | high |
| 26 | c09 | c09._project_list | `/classic/projects` | (portal)/classic/projects | ✅ | ✅ | high |
| 27 | c10 | c10._kanban_board | `/classic/projects/[id]/kanban` | (portal)/classic/projects/[id]/kanban | ✅ | ✅ | high |
| 28 | c11 | c11._task_detail | `/classic/projects/[id]/task/[taskId]` | (portal)/classic/projects/[id]/task/[taskId] | ✅ | ✅ | high |
| 29 | c12 | c12._my_team | `/classic/team` | (portal)/classic/team | ✅ | ✅ | high |
| 30 | c13 | c13._finance_wallet | `/classic/finance` | (portal)/classic/finance | ✅ | ✅ | high |
| 31 | c14 | c14._invoice_center | `/classic/invoices` | (portal)/classic/invoices | ✅ | ✅ | high |
| 32 | c15 | c15._client_profile | `/classic/profile` | (portal)/classic/profile | ✅ | ✅ | high |
| 33 | c16 | c16._report_view | `/classic/reports` | (portal)/classic/reports | ✅ | ✅ | high |
| 34 | c17 | c17._feedback | `/classic/feedback` | (portal)/classic/feedback | ✅ | ✅ | high |
| 35 | f01 | f01._job_dashboard | `/freelancer` | (portal)/freelancer | ✅ | ✅ | high |
| 36 | f02 | f02._job_market | `/freelancer/jobs` | (portal)/freelancer/jobs | ✅ | ✅ | high |
| 37 | f03 | f03._workspace | `/freelancer/workspace` | (portal)/freelancer/workspace | ✅ | ✅ | high |
| 38 | f04 | f04._submit_work | `/classic/projects/[id]/task/[taskId]/submit` | (portal)/classic/projects/[id]/task/[taskId]/submit | ✅ | ✅ | high |
| 39 | f05 | f05._timesheet_log | `/freelancer/timesheet` | (portal)/freelancer/timesheet | ✅ | ✅ | high |
| 40 | f06 | f06._income_wallet | `/freelancer/wallet` | (portal)/freelancer/wallet | ✅ | ✅ | high |
| 41 | f07 | f07._withdraw | `/freelancer/withdraw` | (portal)/freelancer/withdraw | ✅ | ✅ | high |
| 42 | f08 | f08._my_profile | `/freelancer/profile` | (portal)/freelancer/profile | ✅ | ✅ | high |
| 43 | f09 | f09._skill_test | `/freelancer/skills` | (portal)/freelancer/skills | ✅ | ✅ | high |
| 44 | f10 | f10._taking_test | `/freelancer/test` | (portal)/freelancer/test | ✅ | ✅ | high |
| 45 | f11 | f11._e-learning | `/freelancer/learning` | (portal)/freelancer/learning | ✅ | ✅ | high |
| 46 | f12 | f12._bank_settings | `/freelancer/bank` | (portal)/freelancer/bank | ✅ | ✅ | high |
| 47 | pricing | trang_bảng_giá | `/pricing` | pricing | ✅ | ❌ | high |
| 48 | team | đội_ngũ_tuyển_dụng | `/team` | team | ✅ | ❌ | high |
| 49 | test_results | kết_quả_bài_thi_chứng_chỉ | `/freelancer/test/results` | (portal)/freelancer/test/results | **NEW** | ✅ | medium |
| 50 | f04_alt | f04._submit_work | `/freelancer/submit` | (portal)/freelancer/submit | ✅ | ✅ | high |
| 51 | s00_landing | s00._trang_chủ | `/` | page.tsx | ✅ | ✅ | high |

## Non-Routable Stitch Folders (UI Kit / Flow References)
| Folder | Reason |
|--------|--------|
| hệ_thống_bảng_dữ_liệu_nâng_cao | UI Kit component reference |
| hệ_thống_dropdown_&_modal | UI Kit component reference |
| hệ_thống_nhãn_&_thông_báo | UI Kit component reference |
| hệ_thống_thanh_công_cụ_&_phân_trang | UI Kit component reference |
| hệ_thống_tiến_trình_&_tải_dữ_liệu | UI Kit component reference |
| trạng_thái_nút_&_ô_nhập_liệu | UI Kit component reference |
| ui_kit_-_hệ_thống_thiết_kế | Design system reference |
| sơ_đồ_user_flow | UX flow diagram (not a screen) |
