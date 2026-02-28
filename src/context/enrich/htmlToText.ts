// Server-only: Convert HTML to clean text snippet

/**
 * Strip scripts, styles, and HTML tags from HTML content,
 * then return a main text snippet (<= maxLength chars).
 */
export function htmlToTextSnippet(html: string, maxLength: number = 1200): string {
    let text = html;

    // Remove script tags and their content
    text = text.replace(/<script[\s\S]*?<\/script>/gi, "");

    // Remove style tags and their content
    text = text.replace(/<style[\s\S]*?<\/style>/gi, "");

    // Remove HTML comments
    text = text.replace(/<!--[\s\S]*?-->/g, "");

    // Remove SVG content
    text = text.replace(/<svg[\s\S]*?<\/svg>/gi, "");

    // Remove nav, header, footer (often boilerplate)
    text = text.replace(/<nav[\s\S]*?<\/nav>/gi, "");
    text = text.replace(/<footer[\s\S]*?<\/footer>/gi, "");

    // Try to focus on <main> or <article> content if available
    const mainMatch = text.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
        ?? text.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (mainMatch) {
        text = mainMatch[1];
    }

    // Replace block-level tags with newlines
    text = text.replace(/<\/?(p|div|br|h[1-6]|li|tr|td|th|blockquote|section|article|aside)[^>]*>/gi, "\n");

    // Strip remaining tags
    text = text.replace(/<[^>]*>/g, "");

    // Decode common HTML entities
    text = text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&nbsp;/g, " ");

    // Normalize whitespace
    text = text
        .split("\n")
        .map((line) => line.replace(/\s+/g, " ").trim())
        .filter((line) => line.length > 0)
        .join("\n");

    // Truncate
    if (text.length > maxLength) {
        text = text.slice(0, maxLength - 1) + "…";
    }

    return text;
}
