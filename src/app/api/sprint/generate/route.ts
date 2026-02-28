import { NextResponse } from "next/server";
import { PACK_SCHEMAS } from "@/modules/sprint-packs/schemas";
import { mockLeadPack, mockContentPack, mockReportPack } from "@/modules/sprint-packs/mock-data";
import type { PackType, SprintInput } from "@/modules/sprint-packs/types";
import { PACK_TYPES } from "@/modules/sprint-packs/types";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { packType, input } = body as { packType: PackType; input: SprintInput };

        // Validate packType
        if (!PACK_TYPES.includes(packType)) {
            return NextResponse.json(
                { ok: false, error: `Invalid packType. Must be one of: ${PACK_TYPES.join(", ")}` },
                { status: 400 }
            );
        }

        // Validate required input fields
        if (!input?.industry || !input?.offer || !input?.targetCustomer || !input?.goal7d) {
            return NextResponse.json(
                { ok: false, error: "Missing required fields: industry, offer, targetCustomer, goal7d" },
                { status: 400 }
            );
        }

        // Generate data (mock for now; swap with AI provider later)
        let rawData: unknown;
        switch (packType) {
            case "lead": rawData = mockLeadPack(input); break;
            case "content": rawData = mockContentPack(input); break;
            case "report": rawData = mockReportPack(input); break;
        }

        // Schema validation (fail-closed)
        const schema = PACK_SCHEMAS[packType];
        const result = schema.safeParse(rawData);

        if (!result.success) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Schema validation failed",
                    qa: { score: 0, blockingIssues: result.error.issues.map(i => `${i.path.join(".")}: ${i.message}`) },
                    raw: process.env.NODE_ENV === "development" ? rawData : undefined,
                },
                { status: 422 }
            );
        }

        // QA scoring
        const qa = {
            score: 100,
            blockingIssues: [] as string[],
        };

        return NextResponse.json({
            ok: true,
            packType,
            data: result.data,
            qa,
        });
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 }
        );
    }
}
