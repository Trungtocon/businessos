import type { SprintInput, PackType } from "./types";

export function buildPrompt(packType: PackType, input: SprintInput): string {
    const base = `You are a Vietnamese marketing strategy AI. You MUST respond ONLY with a valid JSON object. No markdown, no explanations, no wrapping.

Context:
- Industry: ${input.industry}
- Offer: ${input.offer}
- Target Customer: ${input.targetCustomer}
- Primary Channel: ${input.primaryChannel}
- Budget: ${input.budgetRange}
- Tone: ${input.tone}
- 7-day Goal: ${input.goal7d}
${input.constraints ? `- Constraints: ${input.constraints}` : ""}

All text content must be in Vietnamese.`;

    switch (packType) {
        case "lead":
            return `${base}

Generate a Lead & CRM Sprint Pack as a JSON object with this exact structure:
{
  "icp": { "who": string, "painPoints": string[], "triggers": string[], "exclusions": string[] },
  "persona": { "name": string, "context": string, "objections": string[], "desiredOutcome": string },
  "offerAngles": [{ "angle": string, "promise": string, "proof": string, "cta": string }] (3 items),
  "funnelPlan": [{ "step": string, "channel": string, "asset": string, "successMetric": string }] (4 items),
  "crmPipelineStages": string[] (5 items),
  "nurtureSequences": {
    "sequence1": [{ "day": number, "message": string, "channel": string, "cta": string }] (5 items),
    "sequence2": [{ "day": number, "message": string, "channel": string, "cta": string }] (3 items)
  },
  "followUpChecklist7d": string[] (7 items),
  "nextActions": string[] (5 items)
}`;

        case "content":
            return `${base}

Generate a Content Engine Sprint Pack as a JSON object with this exact structure:
{
  "calendar14d": [{ "day": number, "theme": string, "format": string, "hook": string, "cta": string }] (14 items),
  "hooks10": string[] (10 items),
  "ctas10": string[] (10 items),
  "posts10": [{ "title": string, "caption": string, "channel": string, "hashtags": string[], "visualBrief": string }] (10 items),
  "videos3": [{ "title": string, "script": string, "shots": string[] }] (3 items),
  "keyVisualBrief": { "concept": string, "colors": string, "typography": string, "do": string, "dont": string },
  "nextActions": string[] (5 items)
}`;

        case "report":
            return `${base}

Generate a Weekly Growth Report as a JSON object with this exact structure:
{
  "kpiSummary": [{ "kpi": string, "current": string, "target": string, "gap": string, "note": string }] (5 items),
  "insights3": string[] (3 items),
  "decisions3": string[] (3 items),
  "prioritizedTasks5": [{ "task": string, "impact": number(1-5), "effort": number(1-5), "ownerRole": string, "due": string }] (5 items),
  "risks": string[] (3 items),
  "nextActions": string[] (5 items)
}`;
    }
}
