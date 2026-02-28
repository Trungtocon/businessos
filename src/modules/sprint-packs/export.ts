import type { PackType } from "./types";
import type { LeadPack, ContentPack, ReportPack } from "./schemas";

type PackData = LeadPack | ContentPack | ReportPack;

// ─── JSON Export ──────────────────────────────────────────────────────

export function toJSON(data: PackData): string {
    return JSON.stringify(data, null, 2);
}

// ─── Markdown Export ──────────────────────────────────────────────────

export function toMarkdown(packType: PackType, data: PackData): string {
    switch (packType) {
        case "lead": return leadToMarkdown(data as LeadPack);
        case "content": return contentToMarkdown(data as ContentPack);
        case "report": return reportToMarkdown(data as ReportPack);
    }
}

function leadToMarkdown(d: LeadPack): string {
    return `# Lead & CRM Sprint Pack

## ICP (Ideal Customer Profile)
**Ai:** ${d.icp.who}

**Pain Points:**
${d.icp.painPoints.map(p => `- ${p}`).join("\n")}

**Triggers:**
${d.icp.triggers.map(t => `- ${t}`).join("\n")}

**Exclusions:**
${d.icp.exclusions.map(e => `- ${e}`).join("\n")}

## Persona
**${d.persona.name}**
${d.persona.context}

**Objections:**
${d.persona.objections.map(o => `- ${o}`).join("\n")}

**Desired Outcome:** ${d.persona.desiredOutcome}

## Offer Angles
${d.offerAngles.map((a, i) => `### Angle ${i + 1}: ${a.angle}
- **Promise:** ${a.promise}
- **Proof:** ${a.proof}
- **CTA:** ${a.cta}`).join("\n\n")}

## Funnel Plan
| Step | Channel | Asset | Success Metric |
|------|---------|-------|----------------|
${d.funnelPlan.map(f => `| ${f.step} | ${f.channel} | ${f.asset} | ${f.successMetric} |`).join("\n")}

## CRM Pipeline Stages
${d.crmPipelineStages.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Nurture Sequence 1
| Day | Message | Channel | CTA |
|-----|---------|---------|-----|
${d.nurtureSequences.sequence1.map(s => `| ${s.day} | ${s.message} | ${s.channel} | ${s.cta} |`).join("\n")}

## Nurture Sequence 2
| Day | Message | Channel | CTA |
|-----|---------|---------|-----|
${d.nurtureSequences.sequence2.map(s => `| ${s.day} | ${s.message} | ${s.channel} | ${s.cta} |`).join("\n")}

## Follow-up Checklist (7 ngày)
${d.followUpChecklist7d.map(c => `- [ ] ${c}`).join("\n")}

## Next Actions
${d.nextActions.map(a => `- [ ] ${a}`).join("\n")}
`;
}

function contentToMarkdown(d: ContentPack): string {
    return `# Content Engine Sprint Pack

## Lịch Content 14 Ngày
| Day | Theme | Format | Hook | CTA |
|-----|-------|--------|------|-----|
${d.calendar14d.map(c => `| ${c.day} | ${c.theme} | ${c.format} | ${c.hook} | ${c.cta} |`).join("\n")}

## 10 Hooks
${d.hooks10.map((h, i) => `${i + 1}. ${h}`).join("\n")}

## 10 CTAs
${d.ctas10.map((c, i) => `${i + 1}. ${c}`).join("\n")}

## 10 Posts
${d.posts10.map((p, i) => `### Post ${i + 1}: ${p.title}
- **Channel:** ${p.channel}
- **Caption:** ${p.caption}
- **Hashtags:** ${p.hashtags.join(" ")}
- **Visual:** ${p.visualBrief}`).join("\n\n")}

## 3 Video Scripts
${d.videos3.map((v, i) => `### Video ${i + 1}: ${v.title}
**Script:**
${v.script}

**Shots:**
${v.shots.map(s => `- ${s}`).join("\n")}`).join("\n\n")}

## Key Visual Brief
- **Concept:** ${d.keyVisualBrief.concept}
- **Colors:** ${d.keyVisualBrief.colors}
- **Typography:** ${d.keyVisualBrief.typography}
- **Do:** ${d.keyVisualBrief.do}
- **Don't:** ${d.keyVisualBrief.dont}

## Next Actions
${d.nextActions.map(a => `- [ ] ${a}`).join("\n")}
`;
}

function reportToMarkdown(d: ReportPack): string {
    return `# Weekly Growth Report

## KPI Summary
| KPI | Current | Target | Gap | Note |
|-----|---------|--------|-----|------|
${d.kpiSummary.map(k => `| ${k.kpi} | ${k.current} | ${k.target} | ${k.gap} | ${k.note} |`).join("\n")}

## Top 3 Insights
${d.insights3.map((ins, i) => `${i + 1}. ${ins}`).join("\n")}

## Key Decisions
${d.decisions3.map((dec, i) => `${i + 1}. ${dec}`).join("\n")}

## Prioritized Tasks
| Task | Impact | Effort | Owner | Due |
|------|--------|--------|-------|-----|
${d.prioritizedTasks5.map(t => `| ${t.task} | ${t.impact}/5 | ${t.effort}/5 | ${t.ownerRole} | ${t.due} |`).join("\n")}

## Risks
${d.risks.map(r => `⚠️ ${r}`).join("\n")}

## Next Actions
${d.nextActions.map(a => `- [ ] ${a}`).join("\n")}
`;
}

// ─── Download Helper ──────────────────────────────────────────────────

export function downloadFile(filename: string, content: string, mime: string): void {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
