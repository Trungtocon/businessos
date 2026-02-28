// Server-only: Parse headings and detect USP pattern hints

/**
 * Extract the first H1 from HTML.
 */
export function parseH1(html: string): string {
    const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    return truncate(stripTags(match?.[1] ?? "").trim(), 200);
}

/**
 * Extract all H2 headings (max 8, each <= 150 chars).
 */
export function parseH2List(html: string): string[] {
    const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
    const results: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(html)) !== null && results.length < 8) {
        const text = truncate(stripTags(match[1]).trim(), 150);
        if (text) results.push(text);
    }

    return results;
}

/**
 * Detect USP (Unique Selling Proposition) pattern hints from text.
 * Categories:
 *   - Percentage offers ("50% off", "giảm 30%")
 *   - Free/complimentary ("miễn phí", "tặng kèm", "free")
 *   - Guarantee/commitment ("cam kết", "đảm bảo", "hoàn tiền", "guarantee")
 *   - Urgency/scarcity ("limited", "chỉ còn", "cuối cùng")
 *   - Social proof ("100+ khách", "10,000+ reviews", "#1")
 * Returns max 5 unique hints.
 */
export function detectUspHints(text: string): string[] {
    const lower = text.toLowerCase();
    const hints: string[] = [];

    // Percentage offers
    const pctPatterns = [
        /(?:giảm|off|sale|discount)\s*\d+\s*%/gi,
        /\d+\s*%\s*(?:off|giảm|chiết khấu|discount)/gi,
    ];
    for (const p of pctPatterns) {
        const matches = text.match(p);
        if (matches) {
            for (const m of matches) {
                if (hints.length < 5) hints.push(m.trim());
            }
        }
    }

    // Free / complimentary
    const freeKeywords = ["miễn phí", "tặng kèm", "free trial", "free", "complimentary", "no cost"];
    for (const kw of freeKeywords) {
        if (lower.includes(kw) && hints.length < 5) {
            hints.push(`Free: "${kw}"`);
            break;
        }
    }

    // Guarantee / commitment
    const guaranteeKeywords = ["cam kết", "đảm bảo", "hoàn tiền", "guarantee", "money back", "warranty"];
    for (const kw of guaranteeKeywords) {
        if (lower.includes(kw) && hints.length < 5) {
            hints.push(`Guarantee: "${kw}"`);
            break;
        }
    }

    // Urgency / scarcity
    const urgencyKeywords = ["limited", "chỉ còn", "cuối cùng", "last chance", "hết hạn", "urgent", "now only"];
    for (const kw of urgencyKeywords) {
        if (lower.includes(kw) && hints.length < 5) {
            hints.push(`Urgency: "${kw}"`);
            break;
        }
    }

    // Social proof patterns
    const socialProofPatterns = [
        /[\d,]+\+?\s*(?:khách|reviews?|users?|clients?|customers?|đánh giá)/gi,
        /#1\s+\w+/gi,
    ];
    for (const p of socialProofPatterns) {
        const matches = text.match(p);
        if (matches && hints.length < 5) {
            hints.push(`Social proof: "${matches[0].trim()}"`);
            break;
        }
    }

    return hints.slice(0, 5);
}

// --- Helpers ---

function stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ");
}

function truncate(str: string, maxLen: number): string {
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen - 1) + "…";
}
