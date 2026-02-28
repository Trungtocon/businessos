# Audit Interactions V4.4

## Screen-to-Element Interaction Map (Sample of Key Screens)

### `/virtual` (CEO Cockpit)
- All 13 primary interactions are **Wired** (via `nav.registry.ts`)
- Features tooltips in Dev Mode.

### `/classic/team`
- Filter Button: **Broken** (`onClick={() => {}}`)
- Sort Button: **Broken** (`onClick={() => {}}`)
- Pagination (1, 2, 3, Next): **Broken** (`onClick={() => {}}`)
- Add Member Card: **Broken** (`onClick={() => {}}`)
- Card menu (more_vert): **Broken** (`onClick={() => {}}`)

### `/(auth)/login`
- Login Button: **Functional** (Local state)
- Google Login: **Functional** (Local state mock)
- Forgot Password: **Broken** (`href="#"` with alert)
- Register: **Broken** (`href="#"` with alert)

### `/freelancer/wallet`
- Logout Button: **Broken** (`onClick={() => {}}`)
- Quick Actions (Deposit/Withdraw): **Broken** (`onClick={() => {}}`)
- Transaction History: **Broken** (`onClick={() => {}}`)

### `/classic/projects`
- Project Title Link: **Broken** (`href="#"` with alert)
- This blocks the user from reaching the Kanban board `/classic/projects/[id]/kanban` from the project list.

## Conclusion
While the main navigation spine works, the "connective tissue" within individual screens is largely mock state with dead hooks. Safe routing fixes will be applied to the most critical "blocked paths" (e.g. Project List -> Kanban).
