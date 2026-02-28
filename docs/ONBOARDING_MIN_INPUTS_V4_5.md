# Onboarding Min Inputs V4.5 (Lean V1)

**Date:** 2026-02-27

To achieve a 30-minute TTV for the First Sprint, the current AI Copilot data entry process (which expects a massive free-text Project Brief) must be reduced to a guided minimal input wizard.

## Required Minimum Inputs (The "Sprint Context")
A user setting up their workspace for the first time should answer only these 5 questions:

1. **Industry/Niche:** (e.g., Real Estate, B2B SaaS, E-commerce) - *Provides semantic domain.*
2. **Core Offer:** (1 sentence) What are you selling?
3. **Target Customer (ICP):** (1 sentence) Who is buying this?
4. **Primary Channel:** (Dropdown: Facebook, Email, Zalo, SEO) - *Shapes content formatting.*
5. **Brand Tone:** (Dropdown: Professional, Friendly, Aggressive, Educational) - *Sets AI persona.*

## Auto-Generated Defaults
If the user skips fields, the system should default to:
- Channel: Omnichannel (General web copy)
- Tone: Professional & Educational

## Empty State UX
When navigating to any Sprint Pack without context defined, the user should be intercepted by a simple card: `“Tell us about your business to generate your first strategy pack.”` Avoid dropping users into an empty JSON viewer.
