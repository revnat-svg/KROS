/* ============================================================
   KROS Limited — Main JS
   Navigation, scroll effects, reveal observer, utilities
   ============================================================ */

(function () {
  'use strict';

  /* ---- Nav scroll state ---- */
  const nav = document.querySelector('.nav');
  const scrollTop = document.querySelector('.scroll-top');

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (scrollTop) scrollTop.classList.toggle('visible', y > 500);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Scroll to top ---- */
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Mobile hamburger ---- */
  const hamburger  = document.querySelector('.nav__hamburger');
  const mobileNav  = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    /* Close on link click */
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active nav link ---- */
  (function setActiveLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  })();

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const staggerGroups  = document.querySelectorAll('.reveal-group.stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  staggerGroups.forEach(g => staggerObserver.observe(g));

  /* ---- Smooth scroll for internal anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Contact form ---- */
  const contactForm = document.querySelector('.js-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const btn     = contactForm.querySelector('[type="submit"]');
      const success = contactForm.querySelector('.form-success');
      const orig    = btn.textContent;

      btn.disabled    = true;
      btn.textContent = 'Sending…';

      /* Simulate send (replace with actual endpoint) */
      setTimeout(() => {
        contactForm.querySelectorAll('input, textarea, select').forEach(el => {
          el.value = '';
        });
        btn.style.display = 'none';
        if (success) success.classList.add('visible');
      }, 900);
    });
  }

  /* ---- Testimonial / quote cycling (if present) ---- */
  const quotes = document.querySelectorAll('.testimonial-item');
  if (quotes.length > 1) {
    let current = 0;
    setInterval(() => {
      quotes[current].classList.remove('active');
      current = (current + 1) % quotes.length;
      quotes[current].classList.add('active');
    }, 5000);
  }

})();
