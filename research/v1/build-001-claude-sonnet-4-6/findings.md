# Findings — Build 001 — Claude Code

| ID | SC | Level | Type | Component | Issue | Severity | Detected by |
|----|----|----|------|-----------|-------|----------|-------------|
| F-001 | 1.4.3 | AA | image | Logo SVG text | Text contrast ratio 1.81:1; expected minimum 4.5:1 | Serious | axe: advanced/text-contrast |
| F-002 | 1.4.3 | AA | image | Hero image placeholder text | Text contrast ratio between 1.17:1 and 1.22:1; expected minimum 4.5:1 | Serious | axe: advanced/text-contrast |
| F-003 | 1.3.2 | A | modal | Modal dialog | Screen reader can browse outside the open modal; background content is not hidden from assistive technology | Serious | Guided |
| F-004 | 4.1.2 | A | image | Logo SVG | SVG inside link uses `aria-hidden="true"` but has no appropriate role; role missing or incorrect | Critical | Guided |
| F-005 | 1.1.1 | A | image | Team photo — Alex Rivera | Placeholder SVG treated as decorative image not hidden from screen readers | Moderate | Guided |
| F-006 | 1.1.1 | A | image | Team photo — Jordan Lee | Placeholder SVG treated as decorative image not hidden from screen readers | Moderate | Guided |
| F-007 | 1.1.1 | A | image | Team photo — Sam Okafor | Placeholder SVG treated as decorative image not hidden from screen readers | Moderate | Guided |
| F-008 | 2.4.1 | A | navigation | Page header | No skip navigation / bypass block provided to allow users to skip repeated navigation | Serious | Manual |
| F-009 | 1.1.1 | Best Practice | image | Team member photos | Alt text includes superfluous word "Photo" (e.g., "Photo of Alex Rivera"); best practice is to omit generic image-type words from alt text | Minor | Manual |
