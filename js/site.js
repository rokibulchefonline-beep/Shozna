/* ==========================================================================
   Shozna — page behaviour
   Sticky header state, mobile nav, scroll reveal, footer year.
   ========================================================================== */

(function () {
  'use strict';

  /* --- Sticky header ---------------------------------------------------- */

  var header = document.getElementById('header');

  if (header) {
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* --- Mobile navigation ------------------------------------------------- */

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (toggle && nav) {
    var setNav = function (open) {
      nav.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    setNav(false);

    toggle.addEventListener('click', function () {
      setNav(nav.dataset.open !== 'true');
    });

    // Close after following an in-page link.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.dataset.open === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* --- Scroll reveal ------------------------------------------------------ */

  var revealables = document.querySelectorAll('[data-reveal]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!revealables.length) {
    // nothing to do
  } else if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealables.forEach(function (el, i) {
      // Stagger siblings slightly so grids cascade rather than pop.
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      observer.observe(el);
    });
  }

  /* --- Hero video ---------------------------------------------------------- */

  // Autoplaying video is motion; honour the user's reduced-motion setting by
  // pausing it and falling back to the poster frame.
  var video = document.getElementById('heroVideo');

  if (video && reduced) {
    video.autoplay = false;
    video.removeAttribute('autoplay');
    video.pause();
  }

  /* --- Footer year --------------------------------------------------------- */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());
