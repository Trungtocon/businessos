import { NextResponse } from "next/server";
import { hasErpConfig, getErpConfig, ping } from "@/server/erpnext/client";

/**
 * GET /api/integrations/erpnext/auth/test
 *
 * Returns the server's ERPNext config status:
 * - { ok: true, configured: true, reachable: true }  → keys present + ping success
 * - { ok: false, configured: true, reachable: false } → keys present but ping failed
 * - { ok: false, configured: false }                  → keys missing
 */
export async function GET() {
    // 1) Check if env vars are set
    const missingKeys = ["ERPNEXT_BASE_URL", "ERPNEXT_API_KEY", "ERPNEXT_API_SECRET"]
        .filter(k => !process.env[k]?.trim());

    if (missingKeys.length > 0) {
        return NextResponse.json(
            { ok: false, configured: false, missing: missingKeys },
            { status: 422 },
        );
    }

    // 2) Ping ERPNext to verify reachability
    try {
        const cfg = getErpConfig();
        const result = await ping(cfg);
        if (result.ok) {
            return NextResponse.json({ ok: true, configured: true, reachable: true });
        }
        return NextResponse.json(
            { ok: false, configured: true, reachable: false, error: result.error },
            { status: 502 },
        );
    } catch (err) {
        return NextResponse.json(
            { ok: false, configured: true, reachable: false, error: (err as Error).message },
            { status: 502 },
        );
    }
}
