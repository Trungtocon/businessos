// Pack Schemas — Zod validation
import { z } from "zod";

export const PackActionDefSchema = z.object({
    type: z.string(),
    backend: z.enum(["internal", "erpnext", "fluentcrm"]),
    riskLevel: z.enum(["low", "medium", "high"]),
    description: z.string(),
});

export const PackInputDefSchema = z.object({
    key: z.string(),
    label: z.string(),
    type: z.enum(["text", "select", "number"]),
    options: z.array(z.string()).optional(),
    required: z.boolean(),
});

export const PackDefSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    packType: z.enum(["lead", "content", "report"]),
    industry: z.array(z.string()),
    goal: z.enum(["lead_generation", "brand_awareness", "performance_tracking"]),
    duration: z.enum(["7d", "14d", "30d"]),
    priceTier: z.enum(["free", "starter", "pro"]),
    version: z.string(),
    actions: z.array(PackActionDefSchema),
    inputs: z.array(PackInputDefSchema),
    createdAt: z.string(),
});

export const PacksFileSchema = z.array(PackDefSchema);
