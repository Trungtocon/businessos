# Export & Share Spec V4.5

**Date:** 2026-02-27
**Status:** 🚨 NO-GO (Trapped Data)

## Current Status
Audit confirms there is **no** functionality to export AI-generated content out of the Business OS `JsonResultViewer`. If a user generates a 30-day content calendar, they must manually highlight and copy the text from the UI. This breaks the TTV promise of easily sharing standard deliverables with a team.

## Minimal Viable Export (Fix Suggestion)

To pass the Product Gate, we must add two buttons to the `JsonResultViewer` or a new `SprintPackViewer`:

1. **`Copy to Clipboard`**
   - Action: stringify the JSON payload and format it into readable Markdown, then `navigator.clipboard.writeText()`.
   - UX: Toast generic success "Copied to clipboard".

2. **`Download .md`**
   - Action: Generate a Blob of type `text/markdown`, create an object URL, and trigger a hidden `<a>` download tag.
   - Example Filename: `BusinessOS_ContentPack_20260227.md`

**Risk:** Low. Can be implemented purely client-side within the React component.
