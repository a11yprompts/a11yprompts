---
id: color-aa
title: Color & Contrast — Level AA
component: color
level: AA
confidence: high
builds:
  - build-002-cursor-auto
observed_failures:
  - tool: cursor-auto
    frequency: high
tags: [color, contrast, buttons, links, forms, focus, non-text-contrast]
---

<!--
  confidence: high
  Text contrast failures on solid backgrounds are reliably detected by axe-core.
  Focus/hover state contrast (F-009) requires manual or Axe Pro testing — axe-core
  only evaluates default state. Non-text contrast on borders (F-010) is manual only;
  axe-core does not evaluate form field border contrast.
-->

## Rule

**SC 1.4.3 — Text contrast (minimum 4.5:1)**
All text must meet a minimum contrast ratio against its background:
- **4.5:1** — normal text
- **3:1** — large text (18pt / 14pt bold or larger)

This applies to all text-bearing elements — body text, buttons, links, labels, helper
text — in all states including default, hover, and focus. AI tools routinely generate
arbitrary color values (blue links, green buttons, grey helper text) that have not been
contrast-checked. (build-002 F-001, F-002, F-003, F-004)
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum -->

**SC 1.4.3 — Focus and hover state contrast**
Contrast must be maintained in hover and focus states, not just the default state. If
a focus style changes the text or background color, the new combination must also meet
4.5:1. (build-002 F-009)
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum -->

**SC 1.4.11 — Non-text contrast (minimum 3:1)**
UI component boundaries — including form field borders, button outlines, and focus
indicators — must meet a minimum 3:1 contrast ratio against adjacent colors. Form input
borders are the most common failure. (build-002 F-010)
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast -->

---

## What to Generate

**Buttons — use verified contrast values**

```css
/* ✅ Do: contrast-checked button colors */
.btn-primary {
  background-color: #1a6faf; /* #ffffff on #1a6faf = 4.61:1 — passes AA */
  color: #ffffff;
}

.btn-success {
  background-color: #1e7e34; /* #ffffff on #1e7e34 = 5.08:1 — passes AA */
  color: #ffffff;
}
```

**Links — use verified contrast values**

```css
/* ✅ Do: link color that passes 4.5:1 on white */
a {
  color: #0057a8; /* #0057a8 on #ffffff = 5.26:1 — passes AA */
}
```

**Helper or secondary text — use sufficient contrast**

```css
/* ✅ Do: secondary text dark enough to pass */
.label-optional {
  color: #5f5f5f; /* #5f5f5f on #ffffff = 5.74:1 — passes AA */
}
```

**Form field borders — use sufficient non-text contrast**

```css
/* ✅ Do: border color meets 3:1 against white background */
input, select, textarea {
  border: 1px solid #767676; /* #767676 on #ffffff = 4.54:1 — passes AA */
}
```

**Focus states — maintain contrast when styles change**

```css
/* ✅ Do: focus style uses high-contrast outline, not a color change that may fail */
:focus-visible {
  outline: 3px solid #0057a8;
  outline-offset: 2px;
}
```

---

## What to Avoid

```css
/* ❌ Button contrast too low (build-002 F-001 — 4.3:1, F-003 — 2.87:1) */
.btn-learn-more { background: #2980b9; color: #ffffff; } /* 4.3:1 — fails */
.btn-submit     { background: #27ae60; color: #ffffff; } /* 2.87:1 — fails */

/* ❌ Link color too low (build-002 F-004 — 4.3:1) */
a { color: #2980b9; } /* #2980b9 on #ffffff = 4.3:1 — fails */

/* ❌ Helper text too low (build-002 F-002 — 4.47:1) */
.optional { color: #777777; } /* #777777 on #ffffff = 4.47:1 — fails */

/* ❌ Form border too low (build-002 F-010 — 1.9:1) */
input { border-color: #bbbbbb; } /* #bbbbbb on #ffffff = 1.9:1 — fails 3:1 */

/* ❌ Focus state changes text/background to a combination that fails contrast */
button:focus {
  background: #a8d0f0; /* light blue bg + dark text may pass, but verify */
  color: #333333;       /* always check the specific new combination */
}
```

---

## Developer Checklist

<!-- Text contrast on solid backgrounds is axe-detectable.
     Focus/hover state contrast and non-text contrast require manual verification. -->

- [ ] Button text contrast verified at 4.5:1 minimum in default state
- [ ] Link text contrast verified at 4.5:1 minimum
- [ ] Helper, label, and secondary text contrast verified at 4.5:1 minimum
- [ ] Form field borders meet 3:1 contrast against adjacent background
- [ ] Focus and hover states verified — color changes must maintain 4.5:1 text contrast
- [ ] No color value has been chosen for aesthetic reasons without a contrast check

---

## Automated Detection

**axe-core (free)**
```bash
axe index.html --tags wcag2aa
```
Rule ID: `color-contrast` — detects text contrast failures on solid, computable backgrounds.

Cannot detect: contrast on photographic backgrounds, focus/hover state contrast, or
non-text contrast (form borders, icons, UI components).

**Axe Pro — Intelligent Guided Tests**
`contrast-link-infocus-4.5-1` — how F-009 was detected. Tests contrast on hover and
focus states; requires a human to trigger and confirm.

**Manual — non-text contrast (SC 1.4.11)**
No axe-core rule exists for form border contrast. Use a color picker to sample the
border color and compute the ratio against the background using WebAIM Contrast Checker
or Colour Contrast Analyser. Check all form inputs, select elements, and textareas.

---

## Related SC

- WCAG 1.4.3 Contrast (Minimum) — Level AA
- WCAG 1.4.11 Non-text Contrast — Level AA
