---
id: svgs-a
title: SVGs — Level A
component: svgs
level: A
confidence: medium
discovered_in: [build-001]
findings:
  - id: F-004
    sc: 4.1.2
    component: Logo SVG inside link
    note: SVG uses aria-hidden="true" but link has no accessible name; control is unlabeled
observed_failures:
  - tool: claude-code
    version: claude-sonnet-4-6
    frequency: high
tags: [svg, aria-hidden, role, accessible-name, link]
---

<!--
  confidence: medium
  SVG-only links with no accessible name are detectable by axe-core via the link-name rule.
-->

## Rule

When an SVG is the only content inside a link and uses `aria-hidden="true"`, the link
has no accessible name. Screen readers will announce it as an unlabeled control or
attempt to read the file path. (build-001 F-004)

Provide an accessible name via `aria-label` on the `<a>`, or give the SVG `role="img"`
and `aria-label` instead of hiding it.
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/name-role-value -->

---

## What to Generate

```html
<!-- ✅ Preferred: aria-label on the link, SVG hidden from AT -->
<a href="/" aria-label="Acme Co — Home">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 120 40">
    <!-- logo paths -->
  </svg>
</a>

<!-- ✅ Alternative: role="img" + aria-label on the SVG -->
<a href="/">
  <svg role="img" aria-label="Acme Co — Home" focusable="false" viewBox="0 0 120 40">
    <title>Acme Co — Home</title>
    <!-- logo paths -->
  </svg>
</a>
```

---

## What to Avoid

```html
<!-- ❌ SVG hidden from AT but link has no accessible name (build-001 F-004) -->
<a href="/">
  <svg aria-hidden="true" viewBox="0 0 120 40">
    <!-- logo paths -->
  </svg>
</a>
```

---

## Developer Checklist

- [ ] SVG-only links have an accessible name via `aria-label` on the `<a>`, or `role="img"` + `aria-label` on the SVG
- [ ] SVG inside the link uses `focusable="false"` to prevent unintended tab stop

---

## Automated Detection

**axe-core (free)**
```bash
axe index.html --tags wcag2a
```
Rule ID: `link-name` — detects links with no accessible name including SVG-only links.

---

## Related SC

- WCAG 4.1.2 Name, Role, Value — Level A
