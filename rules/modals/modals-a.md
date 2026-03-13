---
id: modal-a
title: Modal Dialogs — Level A
component: modal
level: A
confidence: low
discovered_in: [build-001]
findings:
  - id: F-003
    sc: 1.3.2
    component: Modal dialog
    note: Screen reader can browse outside open modal; background content not hidden from AT
observed_failures:
  - tool: claude-code
    version: claude-sonnet-4-6
    frequency: high
tags: [modal, dialog, aria-hidden, inert, screen-reader]
---

<!--
  confidence: low
  This pattern cannot be verified by automated tools. Manual screen reader testing
  is required to confirm background content is correctly hidden from AT.
-->

## Rule

When a modal dialog is open, background content MUST be hidden from assistive technology.
Trapping keyboard focus alone is not sufficient — screen reader users in browse/virtual
cursor mode bypass focus traps entirely and can read content behind the modal.
<!-- Source: https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence -->

**DOM placement:** Place the modal as a direct child of `<body>`. If the modal is nested
inside other elements, hiding background content from AT becomes significantly more complex
— you must traverse and hide siblings at every ancestor level.

**Preferred fix — `inert` on siblings:**
Apply the `inert` attribute to all `<body>` siblings when the modal opens. Remove it when
the modal closes. `inert` removes elements from the accessibility tree, blocks focus, and
disables pointer events in a single attribute. Supported in all modern browsers.

**Fallback — `aria-hidden` on siblings:**
If `inert` is unavailable, apply `aria-hidden="true"` to all `<body>` siblings except the
modal. You do not need to add it to `<script>` or `<style>` elements. Remove it when the
modal closes — this step is critical and frequently missed.

**`aria-modal="true"` is not a substitute.**
`aria-modal` is a hint that some AT honor inconsistently. It does not reliably prevent
screen readers from browsing outside the modal and must not be used as a replacement for
`inert` or `aria-hidden` on siblings.

---

## What to Generate

```html
<body>
  <!-- ✅ Single wrapper makes sibling targeting simple -->
  <div id="page-wrapper">
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>

  <!-- ✅ Modal as direct child of <body> -->
  <div id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
    <h2 id="modal-title">Dialog Title</h2>
    <p>Dialog body content.</p>
    <button id="modal-close">Close</button>
  </div>
</body>
```

```javascript
const modal = document.getElementById('modal');
const pageWrapper = document.getElementById('page-wrapper');

function openModal() {
  modal.removeAttribute('hidden');
  pageWrapper.inert = true;        // ✅ hides from AT, blocks focus, disables pointer events
}

function closeModal() {
  modal.setAttribute('hidden', '');
  pageWrapper.inert = false;       // ✅ restores background content to AT
}
```

---

## What to Avoid

```javascript
// ❌ Trapping keyboard focus but not hiding background from AT (build-001 F-003)
// Screen reader browse mode bypasses focus traps — AT can still reach everything behind the modal
function openModal() {
  modal.classList.add('is-visible');
  modal.querySelector('button').focus();
  // nothing done to hide background content from AT
}

// ❌ Relying on aria-modal alone without hiding siblings
// aria-modal support is inconsistent — not a reliable AT isolation mechanism
<div role="dialog" aria-modal="true">...</div>

// ❌ Forgetting to remove inert or aria-hidden on close
// Background content remains permanently inaccessible to AT
function closeModal() {
  modal.setAttribute('hidden', '');
  // pageWrapper.inert never reset — AT blocked indefinitely
}
```

---

## Developer Checklist

<!-- Manual screen reader verification required — automated tools cannot confirm AT isolation -->

- [ ] Modal is a direct child of `<body>`
- [ ] On open: `inert` (or `aria-hidden="true"`) applied to all `<body>` siblings except the modal
- [ ] On close: `inert` / `aria-hidden` removed from all siblings
- [ ] Verified in NVDA + Firefox: browse mode cannot reach content behind the open modal
- [ ] Verified in VoiceOver + Safari: virtual cursor cannot reach content behind the open modal

---

## Automated Detection

Axe-core cannot detect missing AT isolation at runtime. This failure is only detectable
via Axe Pro guided testing (as in build-001 F-003) or manual screen reader testing.

Manual test: open the modal, then use NVDA browse mode (`↑`/`↓` arrow keys) or VoiceOver
quick nav to attempt navigation outside the modal. If any background content is reachable,
the implementation is incomplete.

---

## Related SC

- WCAG 1.3.2 Meaningful Sequence — Level A *(this finding)*
