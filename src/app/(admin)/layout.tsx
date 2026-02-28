"use client";
// (admin) Group Layout — adds AI Copilot FAB + Drawer to all admin pages.
// Design-lock safe: no layout changes, only injects floating elements.

import { AICopilotFAB, AICopilotDrawer } from "@/modules/ai-copilot/ui/AICopilotDrawer";

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <AICopilotFAB contextPack={{ userRole: "admin" }} />
            <AICopilotDrawer />
        </>
    );
}
