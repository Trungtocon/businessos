// V2.4 AI Copilot — Prompt Templates
// All prompts force JSON-only output with schema specification.

import type { ModuleType } from "./types";

const JSON_INSTRUCTION = `
CRITICAL: You MUST respond with ONLY a valid JSON object. No markdown, no code fences, no explanation. Just raw JSON.
If you cannot complete the task, still return the JSON schema with empty values rather than text.
`;

const BRIEF_PROMPT = `You are a senior project analyst. Analyze the following project brief and website context.
${JSON_INSTRUCTION}

Your response MUST match this exact JSON schema:
{
  "summary": "A 2-3 sentence executive summary of the brief",
  "missing_questions": ["Questions the client should answer to clarify the brief"],
  "assumptions": ["Assumptions you're making based on incomplete information"],
  "recommended_kpis": ["Measurable KPIs to track success"],
  "risks": ["Potential project risks"],
  "next_actions": ["Immediate next steps to take"]
}

PROJECT BRIEF:
{{brief}}

WEBSITE CONTEXT:
{{context}}
`;

const OUTLINE_PROMPT = `You are a senior content strategist and SEO specialist. Create a comprehensive content outline.
${JSON_INSTRUCTION}

Your response MUST match this exact JSON schema:
{
  "title": "Main page/content title",
  "meta_title": "SEO meta title (max 60 chars)",
  "meta_description": "SEO meta description (max 155 chars)",
  "h2_h3_outline": [{"h2": "Section heading", "h3": ["Sub-section heading"]}],
  "keyword_plan": [{"keyword": "target keyword", "intent": "informational|transactional|navigational", "placement": "where to use it"}],
  "cta_suggestions": ["Call-to-action text suggestions"]
}

PROJECT BRIEF:
{{brief}}

WEBSITE CONTEXT:
{{context}}
`;

const DRAFT_PROMPT = `You are a senior copywriter and content editor. Improve the following draft text.
${JSON_INSTRUCTION}

Your response MUST match this exact JSON schema:
{
  "improved_text": "The improved version of the text",
  "changes": ["List of changes made and why"],
  "tone": "The tone used (e.g., professional, friendly, persuasive)",
  "seo_notes": ["SEO improvement suggestions"]
}

ORIGINAL TEXT:
{{input_text}}

PROJECT BRIEF:
{{brief}}

WEBSITE CONTEXT:
{{context}}
`;

const QA_PROMPT = `You are a strict quality assurance reviewer. Review the submission against the brief requirements.
Score from 0-100. Set passed=true only if score >= 70 and no blocking issues exist.
${JSON_INSTRUCTION}

Your response MUST match this exact JSON schema:
{
  "score": 85,
  "passed": true,
  "checks": [{"name": "Check name", "passed": true, "details": "Details of the check"}],
  "blocking_issues": ["Issues that must be fixed before submission"],
  "fix_suggestions": ["Suggestions to improve quality"]
}

SUBMISSION CONTENT:
{{submission}}

PROJECT BRIEF:
{{brief}}

WEBSITE CONTEXT:
{{context}}
`;

export const MODULE_PROMPTS: Record<ModuleType, string> = {
    brief: BRIEF_PROMPT,
    outline: OUTLINE_PROMPT,
    draft: DRAFT_PROMPT,
    qa: QA_PROMPT,
};

/**
 * Build a prompt by replacing template variables.
 */
export function buildPrompt(
    moduleType: ModuleType,
    variables: Record<string, string>
): string {
    let prompt = MODULE_PROMPTS[moduleType];
    for (const [key, value] of Object.entries(variables)) {
        prompt = prompt.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
    }
    // Remove any unreplaced placeholders
    prompt = prompt.replace(/\{\{[^}]+\}\}/g, "(not provided)");
    return prompt;
}
