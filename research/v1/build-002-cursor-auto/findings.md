# Findings — Build 002 — Cursor (Auto)

| ID | SC | Level | Type | Component | Issue | Severity | Detected by | Rule file |
|----|----|-------|------|-----------|-------|----------|-------------|-----------|
| F-001 | 1.4.3 | AA | interactive | "Learn More" button | Text contrast ratio 4.3:1; expected minimum 4.5:1 (#ffffff on #2980b9) | Serious | axe: color-contrast | color-aa.md |
| F-002 | 1.4.3 | AA | text | "(optional)" form label text | Text contrast ratio 4.47:1; expected minimum 4.5:1 (#777777 on #ffffff) | Serious | axe: color-contrast | color-aa.md |
| F-003 | 1.4.3 | AA | interactive | "Submit" button | Text contrast ratio 2.87:1; expected minimum 4.5:1 (#ffffff on #27ae60) | Serious | axe: color-contrast | color-aa.md |
| F-004 | 1.4.3 | AA | interactive | Sidebar related links (4 instances) | Text contrast ratio 4.3:1; expected minimum 4.5:1 (#2980b9 on #ffffff) | Serious | axe: color-contrast | color-aa.md |
| F-005 | 4.1.2 | A | image | Logo SVG inside link | SVG uses aria-hidden="true" but role is missing or incorrect; link may lack accessible name | Critical | Guided | dismissed — implementation is correct; `aria-label` on the `<a>` provides the accessible name, `aria-hidden` on the SVG is the recommended pattern for linked SVG icons |
| F-006 | 1.4.5 | AA | image | Hero image | Image contains embedded text; real HTML text should be used instead | Serious | Guided | images-aa.md |
| F-007 | 1.1.1 | A | image | Hero image | Short text alternative is not meaningful for the image content | Serious | Guided | images-a.md |
| F-008 | — | Best Practice | form | Contact form required fields (4 fields: name, email, subject, message) | Required fields use HTML `required` attribute but are missing `aria-required="true"` | Moderate | Guided | dismissed — native `required` is sufficient; `aria-required` is redundant per first rule of ARIA |
| F-009 | 1.4.3 | AA | interactive | FAQ accordion buttons (5 instances) | Control text contrast falls below 4.5:1 on hover and/or focus state | Serious | Manual | color-aa.md |
| F-010 | 1.4.11 | AA | form | Contact form input borders | Input field borders (#bbbbbb on #ffffff) have a contrast ratio of 1.9:1; expected minimum 3:1 for non-text UI components | Serious | Manual | color-aa.md |