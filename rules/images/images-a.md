---
id: images-a
title: Images — Level A
component: images
level: A
confidence: medium
builds:
  - build-001-claude-sonnet-4_6
  - build-002-cursor-auto
observed_failures:
  - tool: claude-code
    frequency: high
  - tool: cursor-auto
    frequency: high
tags: [images, svg, alt-text, decorative, informative, non-text-content]
---

<!--
  confidence: medium
  Pattern-based rules (alt presence, avoiding "photo of" prefixes, text in images) are
  reliably applied by AI. The informative vs. decorative judgment call is context-dependent —
  AI cannot determine whether adjacent text makes an image decorative without understanding
  the full page context. Verify generated output manually.
-->

## Rule

All `<img>` elements must include an `alt` attribute. The value may be empty (`alt=""`)
for decorative images, but the attribute must always be present.
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/ -->

Whether an image is informative or decorative is a judgment call based on context. Ask:
"Does removing this image's description cause the user to lose any information?" If no,
treat it as decorative.
<!-- Source: https://www.w3.org/WAI/tutorials/images/decorative/ -->

**Adjacent text makes images decorative.** If an image is presented alongside text that
already conveys the same information — a person's name next to their headshot, a caption
beneath a photo, a link label next to an icon — the image adds nothing and must be treated
as decorative. Writing alt text that repeats visible text creates redundant announcements
for screen reader users. (build-001 F-005/006/007)
<!-- Source: https://www.w3.org/WAI/tutorials/images/decorative/ -->

**Images containing meaningful readable text must convey that text in the alt attribute.**
If an image contains words or labels that are meaningful to the image's purpose, the alt
must include that text — not a description of the visual appearance. A screen reader user
has no other way to know what the image says. Text that is incidental to the image's
purpose — background signage, ambient text, decorative lettering — does not need to be
included. (build-002 F-007)
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/ -->

**SVG images** require different syntax than `<img>`. A decorative inline SVG must use
`aria-hidden="true"` and `focusable="false"` — there is no `alt` attribute on SVG.
<!-- Source: https://www.w3.org/WAI/tutorials/images/decorative/ -->

---

## Informative Images

Convey the **meaning or purpose** of the image — not a literal visual description —
unless the visual content itself is the information being communicated.
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/ -->

Do not prefix alt text with "image of", "photo of", "picture of", "logo of", or similar.
Screen readers already announce the element as an image — the prefix is redundant.
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/ -->

### What to Generate

**Images used to label other information**
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/#example-1-images-used-to-label-other-information -->
```html
<!-- ✅ Do: alt text serves as the label -->
<p><img src="phone.png" alt="Telephone:"> 0123 456 7890</p>
<p><img src="fax.png" alt="Fax:"> 0123 456 7891</p>
```

**Images containing meaningful readable text — alt must include that text (build-002 F-007)**
When an image contains words or labels central to the image's purpose, the alt must convey
that text. Incidental text — a sign in the background, ambient branding, decorative lettering
— does not need to be included.

```html
<!-- ✅ Do: alt conveys the meaningful text content of the image -->
<img src="hero.svg" alt="Hero Image">

<!-- ✅ Do: promotional text is the entire point of the image — include it -->
<img src="sale-banner.png" alt="50% off this weekend only">

<!-- ✅ Do: incidental text in background can be omitted — the scene is what matters -->
<img src="office.jpg" alt="Team collaborating around a whiteboard">
```

**Images conveying succinct information**
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/#example-3-images-conveying-succinct-information -->
```html
<!-- ✅ Do: alt communicates the full meaning in one phrase -->
<img src="cap.png" alt="Push the cap down and turn it counter-clockwise (from right to left)">
```

**Images conveying an impression or emotion**
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/#example-4-images-conveying-an-impression-or-emotion -->
```html
<!-- ✅ Do: alt reflects intent, not visual appearance -->
<img src="family.jpg" alt="We're family-friendly.">
```

**Images conveying file format inside a link**
<!-- Source: https://www.w3.org/WAI/tutorials/images/informative/#example-5-images-conveying-file-format -->
```html
<!-- ✅ Do: alt identifies the format so link purpose is clear -->
<a href="…">
  Annual report
  <img src="pdf-icon.png" alt="PDF"> (353KB)
</a>
```

### What to Avoid

```html
<!-- ❌ Missing alt attribute -->
<img src="phone.png">

<!-- ❌ Alt describes visual appearance instead of conveying meaningful text in the image (build-002 F-007)
     The image contained the label "Hero Image" — that text is the point of the image.
     Describing the scene instead omits the only information a screen reader user needs. -->
<img src="hero.svg" alt="Wide view of our workspace and team collaboration.">

<!-- ❌ Prefixing with "photo of", "image of", "picture of", etc. (build-001 F-005/006/007)
     Screen readers announce the element as an image — the prefix is redundant noise -->
<img src="alex.jpg" alt="Photo of Alex Rivera">
<img src="logo.png" alt="Image of the company logo">

<!-- ❌ Literal visual description when meaning or purpose is what matters -->
<img src="family.jpg" alt="A man, woman, and two children smiling outdoors">

<!-- ❌ Generic or meaningless alt values -->
<img src="icon.png" alt="image">
<img src="icon.png" alt="icon">
```

---

## Decorative Images

Decorative images must be hidden from assistive technology. For `<img>`, use `alt=""`.
For inline SVG, use `aria-hidden="true"` and `focusable="false"`.
<!-- Source: https://www.w3.org/WAI/tutorials/images/decorative/ -->

An image is decorative when it is:
- Visual styling — borders, spacers, dividers
- Inside a link alongside descriptive text — the text already identifies the destination
- Described fully by adjacent or surrounding text
- Used purely for visual interest with no informational value
<!-- Source: https://www.w3.org/WAI/tutorials/images/decorative/ -->

### What to Generate

**Person's photo presented alongside their name and title (build-001 F-005/006/007)**
The name and job title in the adjacent text already identify the person. The photo adds
no additional information and should be treated as decorative.

```html
<!-- ✅ Do: adjacent text covers the image — use empty alt -->
<div class="team-member">
  <img src="alex.jpg" alt="">
  <h3>Alex Rivera</h3>
  <p>Senior Designer</p>
</div>

<!-- ✅ Do: decorative inline SVG placeholder — aria-hidden + focusable="false" -->
<div class="team-member">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 200 200">
    <!-- placeholder paths -->
  </svg>
  <h3>Alex Rivera</h3>
  <p>Senior Designer</p>
</div>
```

**Image inside a link with descriptive link text**
<!-- Source: https://www.w3.org/WAI/tutorials/images/decorative/#example-2-decorative-image-as-part-of-a-text-link -->
```html
<!-- ✅ Do: link text identifies the destination — image is decorative -->
<a href="crocuspage.html">
  <img src="crocus.jpg" alt="">
  <strong>Crocus bulbs</strong>
</a>
```

**Image fully described by a caption**
```html
<!-- ✅ Do: caption makes alt redundant -->
<figure>
  <img src="dog.jpg" alt="">
  <figcaption>Dog with a bell attached to its collar.</figcaption>
</figure>
```

**Purely decorative or atmospheric images**
<!-- Source: https://www.w3.org/WAI/tutorials/images/decorative/#example-4-image-used-for-ambiance-eye-candy -->
```html
<!-- ✅ Do: no informational value — empty alt -->
<img src="divider.png" alt="">
<img src="tropical.jpg" alt="">
```

### What to Avoid

```html
<!-- ❌ Decorative SVG placeholder not hidden from AT (build-001 F-005/006/007)
     Without aria-hidden, screen readers will attempt to describe the SVG -->
<div class="team-member">
  <svg viewBox="0 0 200 200">
    <!-- screen reader announces this -->
  </svg>
  <h3>Alex Rivera</h3>
</div>

<!-- ❌ Informative alt on an image fully covered by adjacent text -->
<div class="team-member">
  <img src="alex.jpg" alt="Photo of Alex Rivera">
  <h3>Alex Rivera</h3>
  <p>Senior Designer</p>
</div>

<!-- ❌ Missing alt attribute — screen reader may announce the filename -->
<img src="divider.png">

<!-- ❌ role="presentation" as a substitute for alt=""
     Support is inconsistent across screen readers -->
<img src="divider.png" role="presentation">
```

---

## Developer Checklist

<!-- Alt text presence is axe-detectable. Alt text quality, text-in-image coverage, and
     the informative vs. decorative judgment require manual verification. -->

- [ ] Every `<img>` has an `alt` attribute (even if empty)
- [ ] Alt text does not begin with "photo of", "image of", "picture of", "logo of", or similar
- [ ] Images containing meaningful readable text have that text included in the alt attribute (incidental background text may be omitted)
- [ ] Images presented alongside descriptive text (names, captions, adjacent copy) use `alt=""`
- [ ] Decorative inline SVGs have `aria-hidden="true"` and `focusable="false"`
- [ ] Images inside links: descriptive link text present → image uses `alt=""`
- [ ] Images inside links: image is the only link content → alt describes the destination

---

## Automated Detection

**axe-core (free)**
```bash
axe index.html --tags wcag2a
```
Rule IDs: `image-alt`, `role-img-alt`, `svg-img-alt`

Detects missing `alt` attributes. Cannot evaluate whether alt text is meaningful, whether
it conveys text visible within the image, or whether an image should be decorative based
on surrounding context.

**Axe Pro — Intelligent Guided Tests**
build-001 F-005/006/007 and build-002 F-007 were detected via Axe Pro guided testing.

**Manual**
Navigate images using screen reader image shortcuts (NVDA: `G`, VoiceOver: `VO+Cmd+G`).
For images containing text, confirm the alt includes that text. Confirm decorative images
are skipped and informative images announce meaningful content.

---

## Related SC

- WCAG 1.1.1 Non-text Content — Level A
