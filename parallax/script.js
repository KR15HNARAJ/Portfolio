/**
 * script.js — Parallax Stories
 * Parallax scrolling, scroll-triggered animations, mobile optimisation,
 * and interactive UI (counter animation, navigation highlight, menu).
 */

(function () {
  "use strict";

  /* ── Feature detection ──────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ── Cached DOM references ──────────────────────────────────── */
  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector(".nav__menu-btn");
  const navLinks = document.querySelector(".nav__links");
  const navAnchors = document.querySelectorAll(".nav__link");
  const revealEls = document.querySelectorAll(".reveal");
  const statNumbers = document.querySelectorAll(".stat-card__number[data-target]");

  /* ── Parallax layer registry ────────────────────────────────── */
  // Each entry maps a CSS selector to a scroll speed (0 = stationary, 1 = full scroll).
  // Negative values make layers scroll upward relative to page direction.
  const PARALLAX_LAYERS = [
    { selector: ".parallax-layer--stars",      speed: 0.25 },
    { selector: ".parallax-layer--nebula",     speed: 0.4  },
    { selector: ".parallax-layer--planets",    speed: 0.55 },
    { selector: ".parallax-layer--cosmos-bg",  speed: 0.2  },
    { selector: ".parallax-layer--cosmos-mid", speed: 0.35 },
    { selector: ".parallax-layer--ocean-bg",   speed: 0.2  },
    { selector: ".parallax-layer--waves",      speed: 0.1  },
    { selector: ".parallax-layer--bubbles",    speed: 0.15 },
    { selector: ".parallax-layer--forest-bg",  speed: 0.2  },
    { selector: ".parallax-layer--forest-mid", speed: 0.35 },
    { selector: ".parallax-layer--forest-fg",  speed: 0.5  },
    { selector: ".parallax-layer--city-bg",    speed: 0.2  },
    { selector: ".parallax-layer--skyline",    speed: 0.1  },
    { selector: ".parallax-layer--epilogue",   speed: 0.3  },
  ];

  // Resolve selectors to elements and their parent sections once.
  const layers = PARALLAX_LAYERS.reduce((acc, cfg) => {
    const el = document.querySelector(cfg.selector);
    if (el) {
      const section = el.closest("section") || el.parentElement;
      acc.push({ el, speed: cfg.speed, section });
    }
    return acc;
  }, []);

  /* ── Utility: passive event listener option ─────────────────── */
  let passiveSupported = false;
  try {
    const opts = Object.defineProperty({}, "passive", {
      get: function () { passiveSupported = true; },
    });
    window.addEventListener("test", null, opts);
    window.removeEventListener("test", null, opts);
  } catch (_) {}
  const PASSIVE = passiveSupported ? { passive: true } : false;

  /* ── RAF-based scroll loop ──────────────────────────────────── */
  let scrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    ticking = false;
    updateNav();
    if (!prefersReducedMotion && !isMobileParallaxDisabled()) {
      updateParallax();
    }
    updateReveal();
  }

  /* ── Nav: add "scrolled" class + active link highlight ─────── */
  function updateNav() {
    nav.classList.toggle("scrolled", scrollY > 40);

    // Highlight nav link whose section is currently in view
    const viewportMid = scrollY + window.innerHeight * 0.45;
    navAnchors.forEach((anchor) => {
      const targetId = anchor.getAttribute("href").replace("#", "");
      const section = document.getElementById(targetId);
      if (!section) return;
      const { top, bottom } = section.getBoundingClientRect();
      const absTop = top + scrollY;
      const absBottom = bottom + scrollY;
      anchor.classList.toggle(
        "nav__link--active",
        viewportMid >= absTop && viewportMid <= absBottom
      );
    });
  }

  /* ── Parallax transform calculation ────────────────────────── */
  // Uses the section's position relative to the viewport so that
  // the effect is localised and works across all sections.
  function updateParallax() {
    layers.forEach(({ el, speed, section }) => {
      const sectionRect = section.getBoundingClientRect();
      // How far the section center is from the viewport center
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = (sectionCenter - viewportCenter) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });
  }

  /* ── Mobile: disable heavy parallax on small screens ────────── */
  function isMobileParallaxDisabled() {
    return window.innerWidth <= 768;
  }

  /* ── Reset parallax transforms on mobile resize ─────────────── */
  function resetParallaxOnMobile() {
    if (isMobileParallaxDisabled()) {
      layers.forEach(({ el }) => {
        el.style.transform = "";
      });
    }
  }

  /* ── Intersection Observer for reveal animations ────────────── */
  function initReveal() {
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);

            // Trigger counter animation when stat cards become visible
            const num = entry.target.querySelector(".stat-card__number[data-target]");
            if (num) animateCounter(num);

            // Also check for direct stat number targets (inside .stats-row.reveal)
            if (entry.target.classList.contains("stats-row")) {
              entry.target
                .querySelectorAll(".stat-card__number[data-target]")
                .forEach(animateCounter);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ── Fallback reveal via scroll (if IntersectionObserver unavailable) */
  function updateReveal() {
    if (!("IntersectionObserver" in window)) {
      const triggerBottom = scrollY + window.innerHeight * 0.88;
      revealEls.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          const elTop = el.getBoundingClientRect().top + scrollY;
          if (elTop < triggerBottom) el.classList.add("is-visible");
        }
      });
    }
  }

  /* ── Animated counter for stat numbers ─────────────────────── */
  const animatedCounters = new WeakSet();

  function animateCounter(el) {
    if (animatedCounters.has(el)) return;
    animatedCounters.add(el);

    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const duration = 1800; // ms
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ── Mobile navigation (hamburger menu) ────────────────────── */
  function initMobileNav() {
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuBtn.classList.toggle("open", isOpen);
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu on link click
    navAnchors.forEach((anchor) => {
      anchor.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        menuBtn.focus();
      }
    });
  }

  /* ── Smooth scroll for anchor links (cross-browser) ─────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href").slice(1);
        if (!id) return; // bare "#" — reload prevention only
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL without triggering jump
        history.pushState(null, "", `#${id}`);
      });
    });
  }

  /* ── Debounced resize handler ───────────────────────────────── */
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resetParallaxOnMobile, 150);
  }

  /* ── Touch support: subtle parallax on touch devices ────────── */
  function initTouchParallax() {
    // On touch devices we skip the scroll-based parallax (handled by CSS)
    // but we still want the reveal animations to fire correctly.
    document.addEventListener("touchstart", () => {}, PASSIVE);
  }

  /* ── "Start Over" button ─────────────────────────────────────── */
  function initStartOver() {
    const btn = document.querySelector('.epilogue__actions .btn--primary');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Initialise everything ──────────────────────────────────── */
  function init() {
    initMobileNav();
    initSmoothScroll();
    initReveal();
    initTouchParallax();
    initStartOver();

    // Kick off first render
    update();

    window.addEventListener("scroll", onScroll, PASSIVE);
    window.addEventListener("resize", onResize, PASSIVE);
  }

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
