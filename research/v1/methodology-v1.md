# a11yprompts Research Methodology — v1

**Status:** Active  
**Applies to:** `research/v1/builds/`  
**Author:** Nick Lundy
**Created:** 2026-03-10  
**Rules version at time of writing:** pre-release (no published version yet)

---

## Purpose

This document defines the controlled research protocol for evaluating accessibility failures
produced by AI coding assistants. All builds filed under `research/v1/builds/` were generated
and audited according to this methodology. Findings from these builds directly inform the
a11yprompts rule library.

This is not a comprehensive WCAG audit protocol. The goal is to identify *which accessibility
failures AI tools produce consistently and repeatedly* — so that rules can be written to
address the highest-impact, most reproducible problems first.

---

## Versioning

When any of the following change, a new methodology version is created:

- Prompt set is modified or expanded
- Auditing tools or versions change
- Testing protocol changes (e.g. new screen reader added)
- Scope of components tested changes

Builds are always interpreted against the methodology version under which they were run.
A build from `v1/` is never compared directly to a build from `v2/` without explicit notes
on what changed between methodology versions.

---

## Tools Under Test

Each tool is tested independently under the same prompt set. Tool and model versions are
recorded per build.

| Tool | Notes |
|------|-------|
| Claude Code | CLI, tested via Anthropic API |
| Cursor | IDE-integrated AI, tested in agent mode |

Additional tools (Copilot, Windsurf, Gemini CLI) will be added in future methodology versions.

---

## Build Naming Convention

```
build-[###]-[tool-name]-[model-version]/
```

Examples:
```
build-001-claude-sonnet-4_6/
build-002-cursor-0_47/
```

- Build numbers are sequential across all tools within a methodology version
- Dots in version numbers are replaced with underscores for filesystem compatibility
- Tool names are lowercase, hyphenated

---

## Prompt Set — v1

All prompts are run in sequence within a single session. Each prompt builds on the prior
output — do not start a new session between prompts.

Prompts are run **verbatim** with no additional instructions, no accessibility guidance,
and no system prompt modifications. The goal is to capture the tool's uninfluenced defaults.

---

### Prompt A — Page Structure

```
Create a full webpage with the following:
- A site header with a logo placeholder and primary navigation containing 5 links
- A main content area with a page title and two paragraphs of placeholder text
- A sidebar with a short list of related links
- A footer with copyright text and a secondary nav with 3 links
Output separate HTML, CSS, and JS files.
```

---

### Prompt B — Modal Dialog

```
Add a modal dialog to the page. The modal should:
- Be triggered by a button in the main content area labeled "Learn More"
- Contain a title, two paragraphs of body text, and a close button
- Appear and disappear without a page reload
```

---

### Prompt C — Form

```
Add a contact form to the page with the following fields:
- Full name (text input)
- Email address (email input)
- Phone number (tel input, optional)
- Subject (select dropdown with 4 options)
- Message (textarea)
- Submit button
Include basic client-side validation.
```

---

### Prompt D — Accordion / FAQ

```
Add a Frequently Asked Questions section to the page.
Include 5 questions, each with a hidden answer that expands and collapses
when the question is clicked.
```

---

### Prompt E — Images

```
Add the following images to the page:
- An SVG logo within the site header
- A hero image at the top of the main content area with a caption
- A team section with 3 team member photos, each with a name and job title beneath it
- A decorative divider image between the main content and the footer
```

---

## Output Requirements Per Build

Each build folder must contain:

```
build-###-[tool]-[version]/
  README.md         ← required metadata (see template below)
  index.html
  style.css
  script.js
  axe-results.json  ← raw axe-core CLI output
  findings.md       ← structured audit findings
```

Additional files (e.g. images, fonts) may be included if the tool generates them.

---

## README Template

Each build's `README.md` must include:

```markdown
# Build [###] — [Tool Name]

| Field | Value |
|-------|-------|
| Tool | |
| Model / Version | |
| Date | |
| Methodology version | v1 |
| Prompt set | A, B, C, D, E |
| a11yprompts version installed | none / [version] |
| Auditor | |
| Axe-core version | |
```

---

## Auditing Protocol

### Step 1 — Automated Scan (axe-core CLI)

Run axe-core against the generated `index.html` immediately after generation, before
any manual review. Save the full JSON output to `axe-results.json`.

```bash
axe index.html --save axe-results.json
```

Tags to include: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`

Do not modify the generated files before running axe. The automated scan must reflect
the raw output of the tool.

---

### Step 2 — Manual Keyboard Audit

Test all interactive components using keyboard only (no mouse). Check:

- [ ] All interactive elements reachable by `Tab`
- [ ] Logical tab order follows visual reading order
- [ ] Modal: focus moves into modal on open
- [ ] Modal: focus is trapped inside modal while open
- [ ] Modal: `Escape` key closes modal
- [ ] Modal: focus returns to trigger element on close
- [ ] Accordion: items operable with `Enter` and `Space`
- [ ] Form: all fields reachable and operable
- [ ] Form: error messages announced on invalid submit
- [ ] Navigation: all links reachable

---

### Step 3 — Screen Reader Audit

Test with the following combinations at minimum:

| Screen Reader | Browser |
|---------------|---------|
| NVDA (latest) | Firefox (latest) |
| VoiceOver (macOS, latest) | Safari (latest) |

For each component check:

- [ ] Page has a meaningful `<title>`
- [ ] Landmark regions announced correctly (header, nav, main, footer)
- [ ] Heading hierarchy logical and navigable
- [ ] Navigation: links have descriptive names
- [ ] Images: informative images announce meaningful alt text
- [ ] Images: decorative images are skipped
- [ ] Modal: announced as a dialog with accessible name
- [ ] Modal: close button has accessible name
- [ ] Form: all inputs have associated labels
- [ ] Form: required fields indicated to screen reader
- [ ] Form: error messages associated with relevant inputs
- [ ] Accordion: expanded/collapsed state announced

---

### Step 4 — Findings Documentation

Record all failures in `findings.md` using this table format:

```markdown
| ID | SC | Level | Type | Component | Issue | Severity | Detected by |
|----|----|----|------|-----------|-------|----------|-------------|
| F-001 | 1.1.1 | A | image | Hero image | Missing alt attribute | Critical | axe: image-alt |
| F-002 | 4.1.2 | A | modal | Modal | No role="dialog", no aria-labelledby | Serious | Manual |
```

**Level** — the WCAG conformance level of the referenced success criterion:
- `A` — minimum level; failure blocks conformance entirely
- `AA` — standard target for most legal and regulatory requirements
- `AAA` — enhanced level; document if found but not a conformance target for v1 builds
- `Best Practice` — not tied to a specific SC; represents widely accepted guidance (e.g. WCAG techniques, WAI-ARIA authoring practices) that improves usability or quality but does not constitute a WCAG failure

**Type** — the broad category of UI component or content the finding belongs to. Use the most specific applicable value:
- `image` — `<img>`, `<svg>`, `<canvas>`, CSS background images, icon fonts
- `text` — body copy, headings, labels, captions (e.g. contrast failures on visible text)
- `navigation` — primary nav, secondary nav, skip links, breadcrumbs
- `modal` — dialog overlays, drawers, lightboxes
- `form` — inputs, selects, textareas, fieldsets, error messages
- `interactive` — buttons, links, custom widgets not covered by a more specific type
- `structure` — landmark regions, heading hierarchy, reading order, page title
- `media` — video, audio, animations

**Severity scale** (aligned with axe-core):
- Critical — blocks access entirely for affected users
- Serious — severely limits access
- Moderate — creates significant friction
- Minor — low impact but non-compliant

**Detected by** options:
- `axe: [rule-id]` — caught by axe-core automated scan
- `Guided` — caught by an Axe Pro guided test (IGT); requires human judgment to confirm
- `Manual` — keyboard or screen reader testing only; not detectable by automation
- `Both` — caught by both automated scan and manual testing

---

## What Is Not in Scope for v1

- Mobile / native app testing
- PDFs or downloadable documents
- Video / audio content
- Third-party embedded components (maps, social widgets, etc.)
- Performance or SEO evaluation

---

## Integrity Rules

- Prompts are run verbatim — no rewording, no added context
- Generated files are not edited before axe scan
- All builds are committed to the repo, including ones with few or no failures
- If a tool refuses a prompt or produces an error, this is documented in the README and
  the build is still filed
- Findings are documented whether or not a corresponding rule exists in a11yprompts yet —
  undocumented failures are the source of new rules

---

## How Findings Feed Into the Rule Library

After each build is audited, failures are reviewed against existing rules in `rules/`:

- If a rule already exists → add `discovered_in: [build-###]` to the rule's frontmatter
- If no rule exists → open a GitHub issue tagged `new-rule` with the finding as the brief
- After 2+ builds show the same failure across different tools → rule is prioritized for authoring

The `observed_failures` frontmatter field in each rule file is populated from build findings,
not from assumptions.
