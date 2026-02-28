# Interaction Wiring Report

Generated: 2026-02-14T21:29:17.242Z

## Summary

| Metric | Value |
|--------|-------|
| Screens audited | 51 |
| 100% coverage | 4 |
| Screens with gaps | 47 |
| Total interactive elements | 542 |
| Wired | 76 |
| Dead/missing | 466 |
| **Overall coverage** | **14%** |

## Per-Screen Coverage

| Screen | Route | Total | Wired | Dead | Coverage |
|--------|-------|-------|-------|------|----------|
| s00 | `/` | 18 | 11 | 7 | 🔴 61% |
| s01 | `/splash` | 0 | 0 | 0 | ✅ 100% |
| s02 | `/role` | 4 | 2 | 2 | 🔴 50% |
| s03 | `/login` | 6 | 4 | 2 | 🔴 67% |
| s04 | `/otp` | 4 | 3 | 1 | 🔴 75% |
| s05 | `/onboarding` | 6 | 2 | 4 | 🔴 33% |
| s06 | `/search` | 2 | 0 | 2 | 🔴 0% |
| a01 | `/dashboard` | 11 | 3 | 8 | 🔴 27% |
| a02 | `/users` | 1 | 0 | 1 | 🔴 0% |
| a03 | `/disputes` | 1 | 0 | 1 | 🔴 0% |
| a04 | `/workflow` | 5 | 5 | 0 | ✅ 100% |
| a05 | `/finance` | 0 | 0 | 0 | ✅ 100% |
| a06 | `/notifications` | 34 | 0 | 34 | 🔴 0% |
| a07 | `/chat` | 18 | 0 | 18 | 🔴 0% |
| a08 | `/chat/[id]` | 22 | 0 | 22 | 🔴 0% |
| a10 | `/settings` | 18 | 0 | 18 | 🔴 0% |
| a11 | `/error-states` | 13 | 0 | 13 | 🔴 0% |
| c01 | `/virtual` | 6 | 0 | 6 | 🔴 0% |
| c02 | `/virtual/approval` | 5 | 0 | 5 | 🔴 0% |
| c03 | `/virtual/war-room` | 6 | 3 | 3 | 🔴 50% |
| c04a | `/virtual/voice` | 2 | 1 | 1 | 🔴 50% |
| c04b | `/virtual/voice` | 2 | 1 | 1 | 🔴 50% |
| c05 | `/classic/marketplace` | 21 | 0 | 21 | 🔴 0% |
| c06 | `/classic/marketplace/[id]` | 10 | 0 | 10 | 🔴 0% |
| c07 | `/classic/briefing` | 17 | 0 | 17 | 🔴 0% |
| c08 | `/classic/checkout` | 13 | 0 | 13 | 🔴 0% |
| c09 | `/classic/projects` | 11 | 0 | 11 | 🔴 0% |
| c10 | `/classic/projects/[id]/kanban` | 7 | 0 | 7 | 🔴 0% |
| c11 | `/classic/projects/[id]/task/[taskId]` | 11 | 0 | 11 | 🔴 0% |
| c12 | `/classic/team` | 14 | 0 | 14 | 🔴 0% |
| c13 | `/classic/finance` | 13 | 2 | 11 | 🔴 15% |
| c14 | `/classic/invoices` | 21 | 2 | 19 | 🔴 10% |
| c15 | `/classic/profile` | 11 | 0 | 11 | 🔴 0% |
| c16 | `/classic/reports` | 13 | 0 | 13 | 🔴 0% |
| c17 | `/classic/feedback` | 5 | 0 | 5 | 🔴 0% |
| f01 | `/freelancer` | 15 | 0 | 15 | 🔴 0% |
| f02 | `/freelancer/jobs` | 18 | 0 | 18 | 🔴 0% |
| f03 | `/freelancer/workspace` | 25 | 2 | 23 | 🔴 8% |
| f04 | `/classic/projects/[id]/task/[taskId]/submit` | 7 | 2 | 5 | 🔴 29% |
| f04_freelancer | `/freelancer/submit` | 6 | 0 | 6 | 🔴 0% |
| f05 | `/freelancer/timesheet` | 11 | 5 | 6 | 🔴 45% |
| f06 | `/freelancer/wallet` | 12 | 7 | 5 | 🔴 58% |
| f07 | `/freelancer/withdraw` | 14 | 7 | 7 | 🔴 50% |
| f08 | `/freelancer/profile` | 13 | 0 | 13 | 🔴 0% |
| f09 | `/freelancer/skills` | 12 | 0 | 12 | 🔴 0% |
| f10 | `/freelancer/test` | 7 | 0 | 7 | 🔴 0% |
| f11 | `/freelancer/learning` | 19 | 0 | 19 | 🔴 0% |
| f12 | `/freelancer/bank` | 11 | 1 | 10 | 🔴 9% |
| test_results | `/freelancer/test/results` | 0 | 0 | 0 | ✅ 100% |
| pricing | `/pricing` | 9 | 6 | 3 | 🔴 67% |
| team_recruit | `/team` | 12 | 7 | 5 | 🔴 58% |

## Dead Items Detail

### s00 — `/` (7 issues)

- 🟠 **L165** [dead-button] (button)
- 🟠 **L386** [dead-button] (button)
- 🟡 **L415** [dead-link] (no label)
- 🟡 **L418** [dead-link] (no label)
- 🟡 **L444** [dead-link] Điều khoản sử dụng
- 🟡 **L445** [dead-link] Chính sách bảo mật
- 🟡 **L446** [dead-link] Cookie Policy

### s02 — `/role` (2 issues)

- 🟡 **L64** [dead-link] Hỗ trợ
- 🟡 **L66** [dead-link] Điều khoản sử dụng

### s03 — `/login` (2 issues)

- 🟡 **L120** [dead-link] Quên mật khẩu?
- 🟡 **L183** [dead-link] Đăng ký ngay

### s04 — `/otp` (1 issues)

- 🟠 **L71** [dead-button] Xác nhận

### s05 — `/onboarding` (4 issues)

- 🟠 **L49** [dead-button] (button)
- 🟠 **L64** [dead-button] (button)
- 🟠 **L82** [dead-button] Quay lại
- 🟠 **L83** [dead-button] Tiếp tục

### s06 — `/search` (2 issues)

- 🟠 **L51** [dead-button] {tab}
- ⚪ **L60** [dead-cursor] (cursor-pointer without handler)

### a01 — `/dashboard` (8 issues)

- 🟠 **L218** [dead-button] (button)
- 🟡 **L283** [dead-link] (no label)
- 🟡 **L287** [dead-link] (no label)
- 🟠 **L321** [dead-button] (button)
- 🟠 **L386** [dead-button] (button)
- 🟠 **L390** [dead-button] (button)
- 🟠 **L394** [dead-button] (button)
- 🟠 **L398** [dead-button] (button)

### a02 — `/users` (1 issues)

- 🟠 **L13** [dead-button] (button)

### a03 — `/disputes` (1 issues)

- 🟠 **L12** [dead-button] (button)

### a06 — `/notifications` (34 issues)

- 🟡 **L29** [dead-link] Dashboard
- 🟡 **L30** [dead-link] Projects
- 🟡 **L31** [dead-link] Finance
- 🟡 **L32** [dead-link] CRM
- 🟡 **L33** [dead-link] HRM
- 🟠 **L36** [dead-button] (button)
- 🟠 **L40** [dead-button] (button)
- 🟠 **L43** [dead-button] (button)
- 🟠 **L58** [dead-button] (button)
- 🟠 **L67** [dead-button] (button)
- 🟠 **L72** [dead-button] (button)
- 🟠 **L77** [dead-button] (button)
- 🟠 **L82** [dead-button] (button)
- 🟠 **L87** [dead-button] (button)
- ⚪ **L93** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L105** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L124** [dead-button] (button)
- 🟠 **L127** [dead-button] (button)
- ⚪ **L134** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L152** [dead-button] (button)
- 🟠 **L155** [dead-button] (button)
- ⚪ **L162** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L180** [dead-button] (button)
- 🟠 **L183** [dead-button] (button)
- ⚪ **L190** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L206** [dead-button] (button)
- 🟠 **L209** [dead-button] (button)
- ⚪ **L216** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L232** [dead-button] (button)
- 🟠 **L235** [dead-button] (button)
- ⚪ **L242** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L258** [dead-button] (button)
- 🟠 **L261** [dead-button] (button)
- 🟠 **L270** [dead-button] (button)

### a07 — `/chat` (18 issues)

- ⚪ **L11** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L15** [dead-button] (button)
- 🟠 **L19** [dead-button] (button)
- 🟠 **L23** [dead-button] (button)
- 🟠 **L27** [dead-button] (button)
- 🟠 **L32** [dead-button] (button)
- ⚪ **L38** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L46** [dead-button] (button)
- 🟠 **L57** [dead-button] Tất cả
- 🟠 **L58** [dead-button] Chưa đọc
- 🟠 **L59** [dead-button] Nhóm
- ⚪ **L65** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L83** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L98** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L112** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L127** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L141** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L155** [dead-cursor] (cursor-pointer without handler)

### a08 — `/chat/[id]` (22 issues)

- 🟠 **L32** [dead-button] (button)
- 🟠 **L35** [dead-button] (button)
- ⚪ **L39** [dead-cursor] (cursor-pointer without handler)
- 🟡 **L47** [dead-link] (no label)
- 🟡 **L51** [dead-link] (no label)
- 🟡 **L55** [dead-link] (no label)
- 🟡 **L59** [dead-link] (no label)
- 🟡 **L63** [dead-link] (no label)
- ⚪ **L89** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L103** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L118** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L138** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L151** [dead-button] (button)
- 🟠 **L154** [dead-button] (button)
- 🟠 **L157** [dead-button] (button)
- 🟠 **L161** [dead-button] (button)
- ⚪ **L192** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L211** [dead-button] (button)
- 🟠 **L250** [dead-button] (button)
- 🟠 **L253** [dead-button] (button)
- 🟠 **L256** [dead-button] (button)
- 🟠 **L261** [dead-button] (button)

### a10 — `/settings` (18 issues)

- 🟡 **L24** [dead-link] (no label)
- 🟡 **L28** [dead-link] (no label)
- 🟡 **L32** [dead-link] (no label)
- 🟡 **L36** [dead-link] (no label)
- 🟡 **L41** [dead-link] (no label)
- 🟠 **L64** [dead-button] (button)
- 🟡 **L71** [dead-link] Trang chủ
- 🟠 **L77** [dead-button] (button)
- 🟠 **L81** [dead-button] (button)
- ⚪ **L103** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L115** [dead-button] Thay đổi ảnh
- ⚪ **L155** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L173** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L186** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L220** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L232** [dead-button] (button)
- 🟠 **L242** [dead-button] Hủy bỏ
- 🟠 **L243** [dead-button] (button)

### a11 — `/error-states` (13 issues)

- 🟡 **L27** [dead-link] (no label)
- 🟡 **L31** [dead-link] (no label)
- 🟡 **L35** [dead-link] (no label)
- 🟡 **L39** [dead-link] (no label)
- 🟡 **L43** [dead-link] (no label)
- 🟡 **L47** [dead-link] (no label)
- 🟠 **L78** [dead-button] (button)
- 🟠 **L82** [dead-button] (button)
- 🟠 **L101** [dead-button] Tìm hiểu thêm
- 🟠 **L102** [dead-button] (button)
- 🟡 **L124** [dead-link] Trung tâm hỗ trợ
- 🟠 **L142** [dead-button] (button)
- 🟠 **L146** [dead-button] (button)

### c01 — `/virtual` (6 issues)

- ⚪ **L31** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L35** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L69** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L88** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L107** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L131** [dead-button] (button)

### c02 — `/virtual/approval` (5 issues)

- 🟠 **L206** [dead-button] Thoát chế độ
- 🟠 **L207** [dead-button] (button)
- 🟠 **L309** [dead-button] (button)
- 🟠 **L436** [dead-button] (button)
- ⚪ **L448** [dead-cursor] (cursor-pointer without handler)

### c03 — `/virtual/war-room` (3 issues)

- 🟠 **L247** [dead-button] (button)
- 🟠 **L447** [dead-button] (button)
- 🟠 **L460** [dead-button] (button)

### c04a — `/virtual/voice` (1 issues)

- ⚪ **L170** [dead-cursor] (cursor-pointer without handler)

### c04b — `/virtual/voice` (1 issues)

- ⚪ **L170** [dead-cursor] (cursor-pointer without handler)

### c05 — `/classic/marketplace` (21 issues)

- 🟡 **L25** [dead-link] (no label)
- 🟡 **L29** [dead-link] (no label)
- 🟡 **L33** [dead-link] (no label)
- 🟡 **L37** [dead-link] (no label)
- 🟡 **L41** [dead-link] (no label)
- 🟠 **L64** [dead-button] (button)
- 🟠 **L75** [dead-button] (button)
- 🟠 **L79** [dead-button] (button)
- 🟠 **L83** [dead-button] (button)
- 🟠 **L101** [dead-button] (button)
- 🟡 **L112** [dead-link] (no label)
- 🟠 **L118** [dead-button] (button)
- 🟠 **L122** [dead-button] (button)
- 🟠 **L126** [dead-button] (button)
- 🟠 **L130** [dead-button] (button)
- 🟠 **L134** [dead-button] (button)
- 🟠 **L163** [dead-button] (button)
- 🟠 **L190** [dead-button] (button)
- 🟠 **L217** [dead-button] (button)
- 🟠 **L244** [dead-button] (button)
- 🟠 **L254** [dead-button] (button)

### c06 — `/classic/marketplace/[id]` (10 issues)

- 🟡 **L26** [dead-link] Dashboard
- 🟡 **L27** [dead-link] Services
- 🟡 **L28** [dead-link] Reports
- 🟡 **L38** [dead-link] Home
- 🟡 **L40** [dead-link] Services
- ⚪ **L72** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L155** [dead-button] Cơ bản
- 🟠 **L156** [dead-button] Nâng cao
- 🟠 **L157** [dead-button] Chuyên nghiệp
- 🟠 **L178** [dead-button] (button)

### c07 — `/classic/briefing` (17 issues)

- 🟡 **L19** [dead-link] Dashboard
- 🟡 **L20** [dead-link] Dự án
- 🟡 **L21** [dead-link] Báo cáo
- 🟡 **L22** [dead-link] Cài đặt
- 🟠 **L35** [dead-button] (button)
- ⚪ **L38** [dead-cursor] (cursor-pointer without handler)
- 🟡 **L47** [dead-link] BusinessOS
- 🟡 **L49** [dead-link] Dự án
- 🟠 **L61** [dead-button] (button)
- 🟠 **L78** [dead-button] (button)
- ⚪ **L78** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L156** [dead-button] (button)
- ⚪ **L172** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L196** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L216** [dead-button] (button)
- 🟠 **L227** [dead-button] (button)
- 🟠 **L230** [dead-button] (button)

### c08 — `/classic/checkout` (13 issues)

- 🟡 **L20** [dead-link] Tổng quan
- 🟡 **L21** [dead-link] Báo cáo
- 🟡 **L22** [dead-link] Quản lý gói
- 🟡 **L41** [dead-link] (no label)
- 🟡 **L49** [dead-link] Nâng cấp gói
- 🔴 **L142** [dead-form] (form without onSubmit)
- ⚪ **L144** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L163** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L179** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L192** [dead-button] (button)
- 🟡 **L219** [dead-link] Điều khoản dịch vụ
- 🟡 **L220** [dead-link] Chính sách bảo mật
- 🟡 **L221** [dead-link] Hỗ trợ

### c09 — `/classic/projects` (11 issues)

- 🟡 **L52** [dead-link] (no label)
- 🟡 **L60** [dead-link] (no label)
- 🟠 **L75** [dead-button] notifications
- 🟡 **L83** [dead-link] Dashboard
- 🟠 **L124** [dead-button] add
- 🟡 **L143** [dead-link] {p.name}
- 🟠 **L165** [dead-button] more_vert
- 🟠 **L171** [dead-button] Previous
- 🟠 **L173** [dead-button] 1
- 🟠 **L174** [dead-button] 2
- 🟠 **L176** [dead-button] Next

### c10 — `/classic/projects/[id]/kanban` (7 issues)

- 🟠 **L89** [dead-button] more_horiz
- 🟠 **L94** [dead-button] (button)
- 🟡 **L114** [dead-link] (no label)
- 🟡 **L120** [dead-link] settings
- 🟡 **L131** [dead-link] Projects
- 🟠 **L141** [dead-button] +4
- 🟠 **L143** [dead-button] (button)

### c11 — `/classic/projects/[id]/task/[taskId]` (11 issues)

- 🟠 **L73** [dead-button] (button)
- 🟠 **L77** [dead-button] (button)
- 🟠 **L82** [dead-button] (button)
- ⚪ **L123** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L144** [dead-button] (button)
- 🟠 **L153** [dead-button] (button)
- ⚪ **L218** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L241** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L249** [dead-button] (button)
- 🟠 **L264** [dead-button] Yêu cầu sửa
- 🟠 **L265** [dead-button] Duyệt

### c12 — `/classic/team` (14 issues)

- 🟠 **L27** [dead-button] more_vert
- ⚪ **L43** [dead-cursor] (cursor-pointer without handler)
- 🟡 **L57** [dead-link] Trang chủ
- 🟡 **L59** [dead-link] Đội ngũ
- 🟠 **L69** [dead-button] (button)
- 🟠 **L80** [dead-button] filter_list
- 🟠 **L81** [dead-button] sort
- 🟠 **L85** [dead-button] (button)
- 🟠 **L95** [dead-button] (button)
- 🟠 **L105** [dead-button] chevron_left
- 🟠 **L106** [dead-button] 1
- 🟠 **L107** [dead-button] 2
- 🟠 **L108** [dead-button] 3
- 🟠 **L110** [dead-button] chevron_right

### c13 — `/classic/finance` (11 issues)

- 🟡 **L28** [dead-link] dashboard
- 🟡 **L29** [dead-link] account_balance_wallet
- 🟡 **L30** [dead-link] group
- 🟡 **L31** [dead-link] folder_open
- 🟡 **L32** [dead-link] bar_chart
- 🟡 **L48** [dead-link] Trang chủ
- 🟡 **L50** [dead-link] Tài chính
- 🟠 **L81** [dead-button] add
- 🟠 **L82** [dead-button] history
- 🟠 **L114** [dead-button] filter_list
- 🟠 **L137** [dead-button] more_vert

### c14 — `/classic/invoices` (19 issues)

- 🟡 **L29** [dead-link] home
- 🟡 **L30** [dead-link] receipt_long
- 🟡 **L31** [dead-link] work
- 🟡 **L32** [dead-link] group
- ⚪ **L37** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L57** [dead-button] notifications
- 🟠 **L59** [dead-button] Hỗ trợ
- 🟡 **L66** [dead-link] Trang chủ
- 🟡 **L68** [dead-link] Tài chính
- 🟠 **L77** [dead-button] add
- 🟠 **L119** [dead-button] file_download
- 🟠 **L120** [dead-button] mail
- 🟠 **L133** [dead-button] 2
- 🟠 **L134** [dead-button] 3
- 🟠 **L136** [dead-button] 12
- 🟠 **L137** [dead-button] chevron_right
- 🟡 **L144** [dead-link] Điều khoản
- 🟡 **L144** [dead-link] Điều khoản
- 🟡 **L144** [dead-link] Điều khoản

### c15 — `/classic/profile` (11 issues)

- 🟡 **L25** [dead-link] Tổng quan
- 🟡 **L26** [dead-link] Hồ sơ
- 🟡 **L27** [dead-link] Thiết lập
- 🟡 **L28** [dead-link] Báo cáo
- 🟡 **L37** [dead-link] Trang chủ
- 🟠 **L45** [dead-button] photo_camera
- 🟠 **L55** [dead-button] edit
- 🟠 **L68** [dead-button] receipt_long
- 🟠 **L69** [dead-button] edit
- 🟠 **L106** [dead-button] Hủy
- 🟠 **L107** [dead-button] Lưu thay đổi

### c16 — `/classic/reports` (13 issues)

- 🟡 **L31** [dead-link] dashboard
- 🟡 **L32** [dead-link] attach_money
- 🟡 **L34** [dead-link] analytics
- 🟡 **L35** [dead-link] pie_chart
- ⚪ **L38** [dead-cursor] (cursor-pointer without handler)
- 🟡 **L48** [dead-link] Home
- 🟡 **L48** [dead-link] Home
- 🟠 **L53** [dead-button] print
- 🟠 **L54** [dead-button] download
- ⚪ **L62** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L89** [dead-button] more_horiz
- 🟠 **L105** [dead-button] filter_list
- 🟡 **L127** [dead-link] Xem tất cả

### c17 — `/classic/feedback` (5 issues)

- 🟠 **L50** [dead-button] (button)
- 🟠 **L74** [dead-button] (button)
- 🟠 **L78** [dead-button] (button)
- 🟠 **L95** [dead-button] (button)
- 🟠 **L98** [dead-button] (button)

### f01 — `/freelancer` (15 issues)

- 🟡 **L26** [dead-link] dashboard
- 🟡 **L27** [dead-link] work
- 🟡 **L28** [dead-link] payments
- 🟡 **L29** [dead-link] bar_chart
- 🟡 **L30** [dead-link] settings
- 🟠 **L48** [dead-button] add
- 🟠 **L49** [dead-button] notifications
- ⚪ **L50** [dead-cursor] (cursor-pointer without handler)
- 🟡 **L77** [dead-link] Việc cần làm hôm nay
- 🟠 **L96** [dead-button] (button)
- 🟠 **L111** [dead-button] chevron_left
- ⚪ **L116** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L118** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L119** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L120** [dead-cursor] (cursor-pointer without handler)

### f02 — `/freelancer/jobs` (18 issues)

- 🟡 **L43** [dead-link] dashboard
- 🟡 **L44** [dead-link] work
- 🟡 **L45** [dead-link] folder_open
- 🟡 **L46** [dead-link] attach_money
- 🟡 **L47** [dead-link] chat_bubble
- ⚪ **L50** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L67** [dead-button] notifications
- 🟠 **L68** [dead-button] settings
- 🟠 **L76** [dead-button] tune
- ⚪ **L79** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L82** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L87** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L94** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L97** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L108** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L124** [dead-button] bookmark_border
- 🟠 **L135** [dead-button] (button)
- 🟠 **L142** [dead-button] Xem thêm dự án

### f03 — `/freelancer/workspace` (23 issues)

- 🟠 **L31** [dead-button] stop_circle
- 🟠 **L35** [dead-button] notifications
- 🟠 **L37** [dead-button] (button)
- 🟡 **L81** [dead-link] folder_zip
- 🟡 **L82** [dead-link] image
- 🟠 **L92** [dead-button] edit_document
- 🟠 **L93** [dead-button] folder_open
- 🟠 **L94** [dead-button] visibility
- 🟠 **L96** [dead-button] Last saved 2m ago
- 🟠 **L100** [dead-button] format_bold
- 🟠 **L101** [dead-button] format_italic
- 🟠 **L103** [dead-button] link
- 🟠 **L104** [dead-button] add_photo_alternate
- 🟠 **L106** [dead-button] Figma Integration
- ⚪ **L108** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L118** [dead-button] close
- 🟠 **L125** [dead-button] Save Draft
- 🟠 **L126** [dead-button] send
- 🟠 **L135** [dead-button] more_horiz
- 🟠 **L138** [dead-button] (button)
- 🟠 **L160** [dead-button] Generate Structure
- 🟠 **L161** [dead-button] Summarize Brief
- 🟠 **L165** [dead-button] send

### f04 — `/classic/projects/[id]/task/[taskId]/submit` (5 issues)

- 🟠 **L101** [dead-button] (button)
- ⚪ **L115** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L134** [dead-button] (button)
- ⚪ **L139** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L286** [dead-button] (button)

### f04_freelancer — `/freelancer/submit` (6 issues)

- 🟠 **L29** [dead-button] close
- ⚪ **L37** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L45** [dead-button] (button)
- ⚪ **L48** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L84** [dead-button] Hủy bỏ
- 🟠 **L85** [dead-button] Xác nhận nộp bài

### f05 — `/freelancer/timesheet` (6 issues)

- ⚪ **L255** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L265** [dead-button] (button)
- 🟠 **L268** [dead-button] (button)
- ⚪ **L335** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L359** [dead-button] (button)
- 🟠 **L374** [dead-button] (button)

### f06 — `/freelancer/wallet` (5 issues)

- 🟠 **L35** [dead-button] logout
- 🟠 **L45** [dead-button] payments
- ⚪ **L72** [dead-cursor] (cursor-pointer without handler)
- ⚪ **L77** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L120** [dead-button] Xem thêm lịch sử giao dịch

### f07 — `/freelancer/withdraw` (7 issues)

- 🟠 **L22** [dead-button] notifications
- ⚪ **L23** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L39** [dead-button] logout
- 🟠 **L65** [dead-button] VND
- ⚪ **L73** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L103** [dead-button] Gửi yêu cầu
- 🟠 **L104** [dead-button] Hủy bỏ

### f08 — `/freelancer/profile` (13 issues)

- 🟡 **L22** [dead-link] Tổng quan
- 🟡 **L23** [dead-link] Công việc
- 🟡 **L24** [dead-link] Hồ sơ
- 🟡 **L25** [dead-link] Cài đặt
- 🟠 **L28** [dead-button] notifications
- ⚪ **L29** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L37** [dead-button] edit
- 🟠 **L47** [dead-button] camera_alt
- 🟠 **L66** [dead-button] edit
- 🟡 **L92** [dead-link] language
- 🟡 **L93** [dead-link] link
- 🟡 **L104** [dead-link] Xem tất cả
- ⚪ **L108** [dead-cursor] (cursor-pointer without handler)

### f09 — `/freelancer/skills` (12 issues)

- 🟡 **L22** [dead-link] dashboard
- 🟡 **L23** [dead-link] workspace_premium
- 🟡 **L24** [dead-link] person
- 🟡 **L25** [dead-link] settings
- 🟠 **L51** [dead-button] Tất cả bài thi
- 🟠 **L52** [dead-button] Chứng chỉ của tôi
- 🟠 **L62** [dead-button] Tất cả
- 🟠 **L63** [dead-button] Marketing
- 🟠 **L64** [dead-button] Thiết kế
- 🟠 **L65** [dead-button] Lập trình
- 🟠 **L84** [dead-button] Bắt đầu làm bài
- 🟠 **L92** [dead-button] (button)

### f10 — `/freelancer/test` (7 issues)

- 🟠 **L24** [dead-button] logout
- 🟠 **L36** [dead-button] flag
- ⚪ **L46** [dead-cursor] (cursor-pointer without handler)
- 🟠 **L58** [dead-button] arrow_back
- 🟠 **L59** [dead-button] Câu tiếp theo
- 🟠 **L83** [dead-button] {n}
- 🟠 **L91** [dead-button] check_circle

### f11 — `/freelancer/learning` (19 issues)

- 🟡 **L27** [dead-link] home
- 🟡 **L28** [dead-link] work
- 🟡 **L29** [dead-link] payments
- 🟡 **L30** [dead-link] school
- 🟡 **L31** [dead-link] settings
- 🟡 **L46** [dead-link] Trang chủ
- 🟡 **L46** [dead-link] Trang chủ
- 🟠 **L53** [dead-button] notifications
- 🟠 **L66** [dead-button] history
- 🟠 **L88** [dead-button] Tất cả
- 🟠 **L89** [dead-button] Onboarding
- 🟠 **L90** [dead-button] Chuyên môn
- 🟠 **L91** [dead-button] Kỹ năng mềm
- 🟠 **L125** [dead-button] notifications_active
- 🟠 **L135** [dead-button] chevron_left
- 🟠 **L136** [dead-button] 1
- 🟠 **L137** [dead-button] 2
- 🟠 **L138** [dead-button] 3
- 🟠 **L140** [dead-button] chevron_right

### f12 — `/freelancer/bank` (10 issues)

- 🟡 **L13** [dead-link] dashboard
- 🟡 **L14** [dead-link] account_balance
- 🟡 **L15** [dead-link] person
- 🟡 **L16** [dead-link] payments
- 🟠 **L34** [dead-button] add
- 🟠 **L61** [dead-button] edit
- 🟠 **L62** [dead-button] delete
- 🟠 **L85** [dead-button] edit
- 🟠 **L86** [dead-button] delete
- 🔴 **L102** [dead-form] (form without onSubmit)

### pricing — `/pricing` (3 issues)

- 🟠 **L88** [dead-button] Dùng thử miễn phí
- 🟠 **L89** [dead-button] Đăng nhập
- 🟠 **L116** [dead-button] (button)

### team_recruit — `/team` (5 issues)

- 🟠 **L56** [dead-button] Dùng thử miễn phí
- 🟠 **L108** [dead-button] Tất cả (8)
- 🟠 **L109** [dead-button] Công nghệ
- 🟠 **L110** [dead-button] Thiết kế
- 🟠 **L133** [dead-button] Ứng tuyển

