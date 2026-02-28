// V2.4 AI Copilot — Strict JSON Schemas (LOCKED)
// Used for server-side validation of AI provider output.
// FAIL CLOSED: if output doesn't match schema, reject entirely.

import type { ModuleType } from "./types";

interface SchemaField {
    type: "string" | "number" | "boolean" | "array" | "object";
    items?: SchemaField;
    properties?: Record<string, SchemaField>;
    required?: boolean;
}

type ModuleSchema = Record<string, SchemaField>;

const BRIEF_SCHEMA: ModuleSchema = {
    summary: { type: "string", required: true },
    missing_questions: { type: "array", items: { type: "string" }, required: true },
    assumptions: { type: "array", items: { type: "string" }, required: true },
    recommended_kpis: { type: "array", items: { type: "string" }, required: true },
    risks: { type: "array", items: { type: "string" }, required: true },
    next_actions: { type: "array", items: { type: "string" }, required: true },
};

const OUTLINE_SCHEMA: ModuleSchema = {
    title: { type: "string", required: true },
    meta_title: { type: "string", required: true },
    meta_description: { type: "string", required: true },
    h2_h3_outline: {
        type: "array",
        items: {
            type: "object",
            properties: {
                h2: { type: "string", required: true },
                h3: { type: "array", items: { type: "string" }, required: true },
            },
        },
        required: true,
    },
    keyword_plan: {
        type: "array",
        items: {
            type: "object",
            properties: {
                keyword: { type: "string", required: true },
                intent: { type: "string", required: true },
                placement: { type: "string", required: true },
            },
        },
        required: true,
    },
    cta_suggestions: { type: "array", items: { type: "string" }, required: true },
};

const DRAFT_SCHEMA: ModuleSchema = {
    improved_text: { type: "string", required: true },
    changes: { type: "array", items: { type: "string" }, required: true },
    tone: { type: "string", required: true },
    seo_notes: { type: "array", items: { type: "string" }, required: true },
};

const QA_SCHEMA: ModuleSchema = {
    score: { type: "number", required: true },
    passed: { type: "boolean", required: true },
    checks: {
        type: "array",
        items: {
            type: "object",
            properties: {
                name: { type: "string", required: true },
                passed: { type: "boolean", required: true },
                details: { type: "string", required: true },
            },
        },
        required: true,
    },
    blocking_issues: { type: "array", items: { type: "string" }, required: true },
    fix_suggestions: { type: "array", items: { type: "string" }, required: true },
};

export const MODULE_SCHEMAS: Record<ModuleType, ModuleSchema> = {
    brief: BRIEF_SCHEMA,
    outline: OUTLINE_SCHEMA,
    draft: DRAFT_SCHEMA,
    qa: QA_SCHEMA,
};

/**
 * Validate a result object against its module schema.
 * Returns { valid: true } or { valid: false, errors: string[] }.
 */
export function validateAgainstSchema(
    moduleType: ModuleType,
    data: unknown
): { valid: true } | { valid: false; errors: string[] } {
    const schema = MODULE_SCHEMAS[moduleType];
    if (!schema) {
        return { valid: false, errors: [`Unknown module type: ${moduleType}`] };
    }

    if (typeof data !== "object" || data === null) {
        return { valid: false, errors: ["Result must be a non-null object"] };
    }

    const errors: string[] = [];
    const obj = data as Record<string, unknown>;

    for (const [key, field] of Object.entries(schema)) {
        validateField(obj, key, field, errors, key);
    }

    return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

function validateField(
    obj: Record<string, unknown>,
    key: string,
    field: SchemaField,
    errors: string[],
    path: string
): void {
    const value = obj[key];

    if (value === undefined || value === null) {
        if (field.required) errors.push(`Missing required field: ${path}`);
        return;
    }

    switch (field.type) {
        case "string":
            if (typeof value !== "string") errors.push(`${path} must be a string`);
            break;
        case "number":
            if (typeof value !== "number") errors.push(`${path} must be a number`);
            break;
        case "boolean":
            if (typeof value !== "boolean") errors.push(`${path} must be a boolean`);
            break;
        case "array":
            if (!Array.isArray(value)) {
                errors.push(`${path} must be an array`);
            } else if (field.items) {
                value.forEach((item, i) => {
                    if (field.items!.type === "object" && field.items!.properties) {
                        if (typeof item !== "object" || item === null) {
                            errors.push(`${path}[${i}] must be an object`);
                        } else {
                            for (const [pk, pf] of Object.entries(field.items!.properties!)) {
                                validateField(item as Record<string, unknown>, pk, pf, errors, `${path}[${i}].${pk}`);
                            }
                        }
                    } else if (field.items!.type === "string" && typeof item !== "string") {
                        errors.push(`${path}[${i}] must be a string`);
                    }
                });
            }
            break;
        case "object":
            if (typeof value !== "object") errors.push(`${path} must be an object`);
            break;
    }
}
