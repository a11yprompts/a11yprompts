# a11yprompts

Accessibility rules for AI coding assistants — WCAG-grounded, empirically built from observed AI failures, compatible with Claude Code, Cursor, Copilot, and more.

Rules are not a dump of the WCAG spec. They are written in response to real failures observed in controlled builds across multiple AI tools, documented in `research/`.

---

## Install

```bash
npm install nicklundy/a11yprompts
```

Once published to npm:

```bash
npm install a11yprompts
```

---

## Usage

### Claude Code

Add one line to your `CLAUDE.md` (create it if it doesn't exist):

```markdown
@import ./node_modules/a11yprompts/dist/claude/a11yprompts.md
```

### Cursor

Copy the rule files into your project's Cursor rules folder:

```bash
cp -r node_modules/a11yprompts/dist/cursor/rules/ .cursor/rules/a11yprompts/
```

Rules land alongside any existing Cursor rules — no conflicts.

---

## Updating

```bash
npm update a11yprompts
```

**Claude Code** — nothing else needed. The `@import` picks up the updated file automatically.

**Cursor** — re-copy the rules after updating:

```bash
cp -r node_modules/a11yprompts/dist/cursor/rules/ .cursor/rules/a11yprompts/
```

---

## What's included

Rules are organized by component and WCAG level. By default the build includes Level A, AA, and Best Practices. AAA rules are excluded unless explicitly requested.

| File | SC | Level |
|------|----|-------|
| `color/color-aa.md` | 1.4.3, 1.4.11 | AA |
| `images/images-a.md` | 1.1.1 | A |
| `images/images-aa.md` | 1.4.3, 1.4.5 | AA |
| `images/images-best-practices.md` | 1.1.1 | Best Practice |
| `modals/modals-a.md` | 1.3.2 | A |
| `navigation/navigation-a.md` | 2.4.1 | A |
| `svg/svgs-a.md` | 4.1.2 | A |

---

## Rule File Frontmatter Schema

```yaml
---
id: component-level             # e.g. images-a, forms-aa
title: Component — Level        # e.g. Images — Level A
component: component-name       # e.g. images, forms, modal
level: A | AA | AAA | best-practices
confidence: high | medium | low # how reliably AI applies this rule
builds:                         # builds where failures were observed
  - build-001-claude-sonnet-4_6
  - build-002-cursor-auto
observed_failures:              # tools where this failure was confirmed
  - tool: claude-code
    frequency: high | medium | low
tags: [tag1, tag2]
---
```

---

## Building from source

```bash
npm run build              # Claude Code + Cursor, levels A + AA + best-practices
npm run build:claude       # Claude Code only
npm run build:cursor       # Cursor only
npm run build:a            # Level A only
npm run build:aa           # Level A + AA
npm run build:all          # All levels including AAA and best-practices
```

Output is written to `dist/`:

```
dist/
  claude/
    a11yprompts.md         ← @import this in your CLAUDE.md
  cursor/
    rules/
      images-a.mdc
      images-aa.mdc
      ...
```

---

## Research

Rules are derived from controlled builds across AI coding tools. Each build runs a standardized prompt set and audits the output with axe-core and manual screen reader testing.

```
research/
  v1/
    methodology-v1.md      ← prompt set, testing protocol, auditing standards
    builds/
      build-001-claude-sonnet-4_6/
      build-002-cursor-auto/
```

See `research/v1/methodology-v1.md` for the full protocol.

---

## Author

Nick Lundy — [IAAP Certified Web Accessibility Specialist (WAS)](https://www.accessibilityassociation.org/s/wascertification)  
[nicklundy.com](https://nicklundy.com) · [GitHub](https://github.com/nicklundy)

---

## License

MIT