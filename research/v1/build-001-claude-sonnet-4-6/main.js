// Highlight the active nav link based on current URL
(function () {
  const links = document.querySelectorAll('.primary-nav a');
  links.forEach(function (link) {
    if (link.href === window.location.href) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// FAQ accordion
(function () {
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      answer.hidden = expanded;
    });
  });
})();

// Contact form validation
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const rules = {
    'full-name': { required: true, label: 'Full name' },
    'email':     { required: true, label: 'Email address', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMsg: 'Enter a valid email address' },
    'phone':     { required: false, label: 'Phone number', pattern: /^[0-9\s\+\-\(\)]*$/, patternMsg: 'Enter a valid phone number' },
    'subject':   { required: true, label: 'Subject' },
    'message':   { required: true, label: 'Message' }
  };

  function validateField(id) {
    const field = form.querySelector('#' + id);
    const errorEl = form.querySelector('#' + id + '-error');
    if (!field || !errorEl) return true;

    const rule = rules[id];
    const value = field.value.trim();
    let message = '';

    if (rule.required && value === '') {
      message = rule.label + ' is required.';
    } else if (rule.pattern && value !== '' && !rule.pattern.test(value)) {
      message = rule.patternMsg;
    }

    if (message) {
      field.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
      errorEl.hidden = false;
      return false;
    } else {
      field.removeAttribute('aria-invalid');
      errorEl.hidden = true;
      return true;
    }
  }

  // Validate on blur for immediate feedback
  Object.keys(rules).forEach(function (id) {
    const field = form.querySelector('#' + id);
    if (field) field.addEventListener('blur', function () { validateField(id); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const valid = Object.keys(rules).map(validateField).every(Boolean);
    if (!valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    form.reset();
    const success = document.getElementById('form-success');
    success.hidden = false;
    setTimeout(function () { success.hidden = true; }, 5000);
  });
})();

// Modal
(function () {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('open-modal');
  const closeBtn = document.getElementById('close-modal');

  function openModal() {
    backdrop.hidden = false;
    modal.setAttribute('open', '');
    closeBtn.focus();
  }

  function closeModal() {
    backdrop.hidden = true;
    modal.removeAttribute('open');
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !backdrop.hidden) closeModal();
  });

  // Trap focus within modal
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
