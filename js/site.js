/* ==========================================================================
   Shozna — page behaviour
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Logical Home button visibility -------------------------------------- */
  var path = window.location.pathname.toLowerCase();
  var isSubpage = path.includes('about-us') ||
                  path.includes('menu') ||
                  path.includes('private-dining') ||
                  path.includes('blog') ||
                  path.includes('contact');
  if (isSubpage) {
    document.body.removeAttribute('data-page');
  } else {
    document.body.setAttribute('data-page', 'home');
  }

  /* --- Sticky header ------------------------------------------------------ */

  var header = document.getElementById('header');

  if (header) {
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* --- Drawers ------------------------------------------------------------
     The nav drawer and the info drawer share one backdrop, so opening either
     closes the other and only one Escape handler is needed.
     ------------------------------------------------------------------------ */

  var backdrop = document.getElementById('backdrop');

  var drawers = [
    { panel: document.getElementById('nav'),     toggle: document.getElementById('navToggle'),
      labels: ['Open menu', 'Close menu'] },
    { panel: document.getElementById('infoBar'), toggle: document.getElementById('infoToggle'),
      labels: ['Open restaurant information', 'Close restaurant information'] }
  ].filter(function (d) { return d.panel && d.toggle; });

  function anyOpen() {
    return drawers.some(function (d) { return d.panel.dataset.open === 'true'; });
  }

  function setDrawer(drawer, open) {
    drawer.panel.dataset.open = String(open);
    drawer.toggle.setAttribute('aria-expanded', String(open));
    drawer.toggle.setAttribute('aria-label', drawer.labels[open ? 1 : 0]);

    if (drawer.panel.hasAttribute('aria-hidden')) {
      drawer.panel.setAttribute('aria-hidden', String(!open));
    }

    if (backdrop) {
      var showing = anyOpen();
      backdrop.hidden = !showing;
      // Let the element paint before transitioning opacity.
      window.requestAnimationFrame(function () {
        backdrop.dataset.open = String(showing);
      });
    }

    document.body.style.overflow = anyOpen() ? 'hidden' : '';
  }

  function closeAll() {
    drawers.forEach(function (d) { setDrawer(d, false); });
  }

  drawers.forEach(function (drawer) {
    setDrawer(drawer, false);

    drawer.toggle.addEventListener('click', function () {
      var next = drawer.panel.dataset.open !== 'true';
      closeAll();
      if (next) setDrawer(drawer, true);
    });

    // Following a link inside a drawer should close it.
    drawer.panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeAll();
    });
  });

  var infoClose = document.getElementById('infoClose');
  if (infoClose) infoClose.addEventListener('click', closeAll);
  if (backdrop) backdrop.addEventListener('click', closeAll);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !anyOpen()) return;
    var open = drawers.filter(function (d) { return d.panel.dataset.open === 'true'; })[0];
    closeAll();
    if (open) open.toggle.focus();
  });

  /* --- Menus dropdown ------------------------------------------------------ */

  var dropToggles = document.querySelectorAll('.nav-drop__toggle');

  dropToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = toggle.getAttribute('aria-expanded') === 'true';
      dropToggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      toggle.setAttribute('aria-expanded', String(!open));
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-drop')) return;
    dropToggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
  });

  /* --- Call for Booking dropdown toggle ------------------------------------- */

  var callBtn = document.querySelector('.header-call-btn');
  if (callBtn) {
    callBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = callBtn.getAttribute('aria-expanded') === 'true';
      callBtn.setAttribute('aria-expanded', String(!open));
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header-call-drop')) {
        callBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Dish carousel -------------------------------------------------------- */

  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var frame;

    if (!track || !prev || !next) return;

    function step() {
      var cards = track.children;
      if (cards.length > 1) return cards[1].offsetLeft - cards[0].offsetLeft;
      return cards.length ? cards[0].getBoundingClientRect().width : track.clientWidth;
    }

    function update() {
      var max = Math.max(0, track.scrollWidth - track.clientWidth);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = max <= 2 || track.scrollLeft >= max - 2;
    }

    function scrollBy(direction) {
      track.scrollBy({
        left: direction * step(),
        behavior: reduced ? 'auto' : 'smooth'
      });
    }

    prev.addEventListener('click', function () { scrollBy(-1); });
    next.addEventListener('click', function () { scrollBy(1); });

    track.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      scrollBy(e.key === 'ArrowLeft' ? -1 : 1);
    });

    track.addEventListener('scroll', function () {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
  });

  /* --- Scroll reveal --------------------------------------------------------- */

  var revealables = document.querySelectorAll('[data-reveal]');

  if (!revealables.length) {
    // nothing to reveal
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
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      observer.observe(el);
    });
  }

  /* --- Hero video ------------------------------------------------------------- */

  // Autoplaying video is motion; under reduced motion show the poster instead.
  var video = document.getElementById('heroVideo');

  if (video && reduced) {
    video.autoplay = false;
    video.removeAttribute('autoplay');
    video.pause();
  }

  /* --- Back to top ------------------------------------------------------------- */

  var scrollTop = document.getElementById('scrollTop');

  if (scrollTop) {
    var toggleTop = function () {
      scrollTop.dataset.visible = String(window.scrollY > 600);
    };
    toggleTop();
    window.addEventListener('scroll', toggleTop, { passive: true });

    scrollTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }
}());
