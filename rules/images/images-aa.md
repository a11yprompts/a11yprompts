---
id: images-aa
title: Images — Level AA
component: images
level: AA
confidence: medium
discovered_in: [build-001]
findings:
  - id: F-001
    sc: 1.4.3
    component: Logo SVG text
    note: Contrast ratio 1.81:1; minimum 4.5:1 required
  - id: F-002
    sc: 1.4.3
    component: Hero image placeholder text
    note: Contrast ratio 1.17:1–1.22:1; minimum 4.5:1 required
  - id: F-010
    sc: 1.4.5
    component: Hero image placeholder text
    note: Label rendered as SVG <text> element; plain HTML text should be used instead
observed_failures:
  - tool: claude-code
    version: claude-sonnet-4-6
    frequency: high
tags: [images, contrast, svg, color, text-in-images, images-of-text]
---

<!--
  confidence: medium
  SC 1.4.3 contrast failures on SVG with solid backgrounds are automatically detectable
  by axe-core. Text on photographic or complex backgrounds requires manual or Axe Pro
  checking. SC 1.4.5 has no axe-core rule — detection is manual only.
-->

## Rule

**SC 1.4.3 — Contrast (Minimum)**
Text rendered inside images — including SVG `<text>` elements and text overlaid on
photographs — must meet minimum contrast ratios:
- **4.5:1** — normal text
- **3:1** — large text (18pt / 14pt bold or larger)

**Exception — Logotypes:** Text that is part of a logo or brand name has no contrast
requirement. This applies only to actual logo lockups, not all SVG text.
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum -->

---

**SC 1.4.5 — Images of Text**
If the same visual presentation can be achieved using real HTML text, use real text instead
of an image of text. In build-001 (F-010), Claude Code rendered a hero section label as an
SVG `<text>` element — users cannot resize, recolor, or adjust SVG text presentation.

**Exceptions:** customizable by the user; essential to the information (e.g. handwriting
samples, type specimens); logotypes.

**Note:** SC 1.4.5 is the higher-order issue here. Switching from SVG text to real HTML
text eliminates both the 1.4.5 violation and the uncontrollable contrast situation from
1.4.3 in a single fix.
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/images-of-text -->

---

## What to Generate

**SVG text — use verified high-contrast fill values (F-001)**

```html
<!-- ✅ Do: contrast-checked fill values -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" aria-label="Acme Co">
  <rect width="200" height="60" fill="#1a1a1a"/>
  <text x="20" y="38" font-size="24" fill="#ffffff" font-family="sans-serif">Acme Co</text>
</svg>
<!-- #ffffff on #1a1a1a = 17.1:1 — passes AA -->
```

**Hero section — use real HTML text, not SVG text (F-002, F-010)**

```html
<!-- ✅ Do: real HTML text + scrim satisfies both 1.4.5 and 1.4.3 -->
<section class="hero">
  <img src="hero.jpg" alt="">
  <div class="hero__overlay" aria-hidden="true"></div>
  <div class="hero__content">
    <h1>Built for Everyone</h1>
    <p>Accessible by default, scalable by design.</p>
  </div>
</section>
```

```css
.hero { position: relative; }
.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); /* controlled scrim — contrast predictable */
}
.hero__content {
  position: relative;
  color: #ffffff; /* #ffffff over scrim exceeds 4.5:1 against any background */
}
```

---

## What to Avoid

```html
<!-- ❌ SVG text with insufficient contrast (build-001 F-001 — 1.81:1) -->
<svg viewBox="0 0 200 60">
  <rect width="200" height="60" fill="#cccccc"/>
  <text x="20" y="38" font-size="24" fill="#999999">Acme Co</text>
</svg>

<!-- ❌ Placeholder SVG with unverified fill colors (build-001 F-002 — 1.17:1–1.22:1) -->
<svg viewBox="0 0 300 200">
  <rect width="300" height="200" fill="#e0e0e0"/>
  <text x="50%" y="50%" fill="#bdbdbd" text-anchor="middle">Hero Image Placeholder</text>
</svg>

<!-- ❌ Hero text as SVG <text> instead of HTML (build-001 F-010)
     Violates 1.4.5 and creates uncontrollable contrast — both fixable by using real HTML -->
<svg viewBox="0 0 1200 400">
  <image href="hero.jpg" width="1200" height="400"/>
  <text x="100" y="200" font-size="48" fill="#ffffff">Built for Everyone</text>
</svg>
```

---

## Developer Checklist

<!-- 1.4.3: automated detection available for SVG with solid backgrounds.
     1.4.3: manual check required for text on photographic backgrounds.
     1.4.5: manual detection only — no axe-core rule exists. -->

- [ ] SVG text fill colors have been contrast-checked against their background fills
- [ ] Hero/banner text is real HTML text, not SVG `<text>` or raster image text
- [ ] If an image of text is used, one of the three exceptions applies: customizable, essential, or logotype
- [ ] Text over photographic backgrounds uses a controlled overlay — not raw image content

---

## Automated Detection

**axe-core (free)**
Detects contrast failures on SVG `<text>` elements with solid, computable backgrounds.
```bash
axe index.html --tags wcag2aa
```
Rule ID: `color-contrast`

Cannot compute contrast for text on photographs, gradients, or complex backgrounds.

**Axe Pro — Intelligent Guided Tests**
`advanced/text-contrast` — how F-001 and F-002 were detected in build-001. Flags
text-on-image contrast for human confirmation.

**SC 1.4.5 — manual only**
No axe-core rule exists. Ask: could this same presentation be achieved with real HTML
and CSS? If yes, it is a violation unless an exception applies.

---

## Related SC

- WCAG 1.4.3 Contrast (Minimum) — Level AA
- WCAG 1.4.5 Images of Text — Level AA
