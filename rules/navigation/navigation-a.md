---
id: navigation-a
title: Navigation — Level A
component: navigation
level: A
confidence: high
discovered_in: [build-001]
findings:
  - id: F-008
    sc: 2.4.1
    component: Page header
    note: No skip navigation link provided; keyboard users must tab through all nav links to reach main content
observed_failures:
  - tool: claude-code
    version: claude-sonnet-4-6
    frequency: high
tags: [navigation, skip-link, bypass-block, keyboard]
---

<!--
  confidence: high
  Skip link presence is a consistent, pattern-based rule. AI tools omit it by default
  because it has no visual impact on the design. The fix is mechanical — add it once
  to the page template and it applies everywhere.
-->

## Rule

Pages with repeated navigation blocks must provide a mechanism to skip directly to the
main content. Without it, keyboard-only users must tab through every navigation link on
every page load before reaching the content. (build-001 F-008)
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks -->

The skip link must be the **first focusable element** in the DOM. It may be visually
hidden until focused — but it must be reachable by keyboard and must function as a
working anchor link.
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks -->

---

## What to Generate

```html
<!-- ✅ Do: skip link as first element in <body>, visually hidden until focused -->
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header>
    <nav>...</nav>
  </header>
  <main id="main-content">
    ...
  </main>
</body>
```

```css
/* ✅ Visually hidden until focused — still reachable by keyboard */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
}
.skip-link:focus {
  top: 0;
}
```

---

## What to Avoid

```html
<!-- ❌ No skip link — keyboard users tab through every nav item on every page (build-001 F-008) -->
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/services">Services</a>
      <a href="/work">Work</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  <main>...</main>
</body>

<!-- ❌ Skip link present but permanently hidden — never reachable by keyboard -->
<a href="#main-content" style="display: none;">Skip to main content</a>

<!-- ❌ Skip link not first in DOM — other focusable elements appear before it -->
<header>
  <a href="/"><img src="logo.svg" alt="Acme Co"></a>
  <a class="skip-link" href="#main-content">Skip to main content</a>
</header>
```

---

## Developer Checklist

- [ ] A skip link is the first focusable element in the DOM
- [ ] The skip link target (`id="main-content"` or equivalent) exists on the page
- [ ] The skip link is visible when focused (not permanently hidden via `display:none` or `visibility:hidden`)
- [ ] Activating the skip link moves focus to the main content area

---

## Automated Detection

**axe-core (free)**
```bash
axe index.html --tags wcag2a
```
Rule ID: `bypass` — detects pages with no skip link or landmark regions.

Note: axe passes this rule if landmark regions (`<main>`, `<nav>`) are present, even
without a skip link. A skip link is the more robust solution and should be included
regardless of landmark structure.

---

## Related SC

- WCAG 2.4.1 Bypass Blocks — Level A
