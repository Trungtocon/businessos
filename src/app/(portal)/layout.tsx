"use client";
// (portal) Group Layout — adds AI Copilot FAB + Drawer to all portal pages.
// Design-lock safe: no layout changes, only injects floating elements.
// userRole is set to "business" by default; individual pages (freelancer/*) override via contextPack.

import { AICopilotFAB, AICopilotDrawer } from "@/modules/ai-copilot/ui/AICopilotDrawer";

export default function PortalGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <AICopilotFAB contextPack={{ userRole: "business" }} />
            <AICopilotDrawer />
        </>
    );
}
