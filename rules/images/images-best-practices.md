---
id: images-best-practices
title: Images — Best Practices
component: images
level: best-practices
confidence: high
builds:
  - build-001-claude-sonnet-4_6
observed_failures:
  - tool: claude-code
    frequency: high
tags: [images, alt-text, best-practice]
---

<!--
  confidence: high
  This is a consistent, pattern-based failure that AI tools reproduce reliably.
  No judgment call required — the fix is mechanical.
-->

## Rule

Do not prefix alt text with words that describe the element type: "image of", "photo of",
"picture of", "logo of", "icon of", or similar. Screen readers already announce the
element as an image — the prefix is redundant and adds noise. (build-001 F-009)
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/ -->

---

## What to Generate

```html
<!-- ✅ Do: alt text states the meaning directly -->
<img src="alex.jpg" alt="Alex Rivera">
<img src="logo.png" alt="Acme Co">
<img src="warning.svg" alt="Warning">

<!-- ✅ Do: functional image inside a link — alt describes the destination, not the image -->
<!-- The logo is the only link content, so alt must convey where the link goes -->
<a href="/">
  <img src="dunkin-logo.png" alt="Dunkin Donuts Home">
</a>
```

---

## What to Avoid

```html
<!-- ❌ Redundant image-type prefix (build-001 F-009) -->
<img src="alex.jpg" alt="Photo of Alex Rivera">
<img src="logo.png" alt="Image of the Acme Co logo">
<img src="warning.svg" alt="Icon of a warning sign">

<!-- ❌ Functional image in a link — alt names the image but not the destination -->
<a href="/">
  <img src="dunkin-logo.png" alt="Logo of Dunkin Donuts">  <!-- describes the image, not the function -->
  <img src="dunkin-logo.png" alt="Dunkin Donuts">          <!-- missing the destination context -->
</a>
```

---

## Automated Detection

No axe-core rule exists for this pattern. Detection is manual only.

---

## Related SC

- WCAG 1.1.1 Non-text Content — Level A