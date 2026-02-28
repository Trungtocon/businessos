// V2.4 AI Copilot — Score computation
// Centralizes QA pass/fail logic.

import type { QAResult } from "./types";

/**
 * QA pass threshold. Score must be >= this AND no blocking issues.
 */
export const QA_PASS_THRESHOLD = 70;

/**
 * Compute whether QA result should pass.
 * Pass = score >= 70 AND zero blocking issues.
 */
export function computeQAPass(result: QAResult): boolean {
    return result.score >= QA_PASS_THRESHOLD && result.blocking_issues.length === 0;
}

/**
 * Normalize a QA result: ensure `passed` matches computed logic.
 * This is a safety measure — even if the AI says passed=true,
 * we override based on our own logic.
 */
export function normalizeQAResult(result: QAResult): QAResult {
    return {
        ...result,
        passed: computeQAPass(result),
    };
}
