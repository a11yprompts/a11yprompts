(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var primaryLinks = document.querySelectorAll('.primary-nav a');
    var relatedLinks = document.querySelectorAll('.related-links a');
    var modal = document.getElementById('learn-more-modal');
    var trigger = document.querySelector('[data-modal-trigger]');
    var closeBtn = document.querySelector('[data-modal-close]');

    primaryLinks.forEach(function (link) {
      link.setAttribute('data-nav', 'primary');
    });

    relatedLinks.forEach(function (link) {
      link.setAttribute('data-nav', 'related');
    });

    if (trigger && modal) {
      trigger.addEventListener('click', function () {
        modal.showModal();
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', function () {
        modal.close();
      });
    }

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.close();
        }
      });
    }

    // FAQ expand/collapse
    var faqTriggers = document.querySelectorAll('[data-faq-trigger]');
    faqTriggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var answerId = btn.getAttribute('aria-controls');
        var answer = answerId ? document.getElementById(answerId) : null;
        var isOpen = item && item.classList.contains('is-open');

        if (isOpen) {
          if (item) item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          if (answer) answer.hidden = true;
        } else {
          if (item) item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          if (answer) answer.hidden = false;
        }
      });
    });

    // Contact form validation
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var nameInput = document.getElementById('contact-name');
        var emailInput = document.getElementById('contact-email');
        var phoneInput = document.getElementById('contact-phone');
        var subjectSelect = document.getElementById('contact-subject');
        var messageInput = document.getElementById('contact-message');
        var nameError = document.getElementById('contact-name-error');
        var emailError = document.getElementById('contact-email-error');
        var phoneError = document.getElementById('contact-phone-error');
        var subjectError = document.getElementById('contact-subject-error');
        var messageError = document.getElementById('contact-message-error');

        function setInvalid(input, errorEl, message) {
          if (input) input.classList.add('invalid');
          if (input) input.setAttribute('aria-invalid', 'true');
          if (errorEl) errorEl.textContent = message;
        }

        function setValid(input, errorEl) {
          if (input) input.classList.remove('invalid');
          if (input) input.removeAttribute('aria-invalid');
          if (errorEl) errorEl.textContent = '';
        }

        var valid = true;

        if (!nameInput.value.trim()) {
          setInvalid(nameInput, nameError, 'Please enter your full name.');
          valid = false;
        } else {
          setValid(nameInput, nameError);
        }

        var emailVal = emailInput.value.trim();
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
          setInvalid(emailInput, emailError, 'Please enter your email address.');
          valid = false;
        } else if (!emailRe.test(emailVal)) {
          setInvalid(emailInput, emailError, 'Please enter a valid email address.');
          valid = false;
        } else {
          setValid(emailInput, emailError);
        }

        if (phoneInput.value.trim() && !/^[\d\s\-\.\(\)\+]+$/.test(phoneInput.value)) {
          setInvalid(phoneInput, phoneError, 'Please enter a valid phone number.');
          valid = false;
        } else {
          setValid(phoneInput, phoneError);
        }

        if (!subjectSelect.value) {
          setInvalid(subjectSelect, subjectError, 'Please select a subject.');
          valid = false;
        } else {
          setValid(subjectSelect, subjectError);
        }

        if (!messageInput.value.trim()) {
          setInvalid(messageInput, messageError, 'Please enter your message.');
          valid = false;
        } else {
          setValid(messageInput, messageError);
        }

        if (valid) {
          form.reset();
          setValid(nameInput, nameError);
          setValid(emailInput, emailError);
          setValid(phoneInput, phoneError);
          setValid(subjectSelect, subjectError);
          setValid(messageInput, messageError);
          alert('Thank you. Your message has been sent.');
        }
      });
    }
  });
})();
