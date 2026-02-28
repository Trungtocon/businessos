# UAT Evidence Index V4.1

## Screenshots

| # | Screenshot | Description |
|---|-----------|-------------|
| 1 | `virtual_loaded_1772150843377.png` | Virtual dashboard with ERP badge "Kết nối" |
| 2 | `finance_navigated_1772150866242.png` | Finance page after clicking "Tài chính" |
| 3 | `growth_navigated_1772150903304.png` | Reports page after clicking "Tăng trưởng" |
| 4 | `approval_navigated_1772150926046.png` | Approval page after clicking "Duyệt nhanh" |
| 5 | `war_room_navigated_1772150965939.png` | War Room page |
| 6 | `erpnext_login_page_1772130252213.png` | ERPNext login page (8081) |
| 7 | `business_os_home_1772130287796.png` | Business OS landing page |
| 8 | `erpnext_ping_api_1772130303450.png` | Ping API returning ok:true |

## Browser Recordings

| Recording | Description |
|-----------|-------------|
| `uat_nav_retest_1772150793712.webp` | Full navigation UAT — all cards and buttons tested |
| `erpnext_login_verify_1772130210570.webp` | ERPNext + Business OS + ping verification |

## Build Evidence

- `npm run build` → Exit code 0 (50 pages compiled)
- `npm run erpnext:health` → 200 pong
- `/api/integrations/erpnext/ping` → `{ok:true, message:"pong"}`
