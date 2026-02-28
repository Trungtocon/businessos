# Audit: Security & Secrets V4.4

**Date:** 2026-02-27
**Status:** ✅ Clean (No Blazing Red Flags)

## Scanning Strategy & Coverage
- **`.env` files committed:** Negative. Only `.env.local.example` exists.
- **Hardcoded Secrets:** Negative. Grep for `console.log(.*process.env.*)` or hardcoded `API_KEY` yielded no production leaks.
- **SSRF (Server-Side Request Forgery):** Negative. The ERPNext client strictly uses the `ERPNEXT_BASE_URL` env var. The client cannot pass an arbitrary URL to the internal fetch.
- **XSS via innerHTML:** Negative. No instances of `dangerouslySetInnerHTML` were found in the codebase.
- **Untrusted Eval:** Negative.

## AI Prompt Injection Risk (P2: ⚠️ RISK)
The AI Copilot does not heavily sanitize user prompts before passing them to the LLM (Gemini). While this prevents code execution on *our* servers, an attacker could jailbreak the AI role to output inappropriate content or spoof standard JSON action outputs. 

**Recommendation:** Add an outgoing system prompt strictness filter, and validate all structured outputs returned by the AI before acting on them.
