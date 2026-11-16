(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".site-nav");
  var toggle = nav && nav.querySelector(".nav-toggle");
  var menu = nav && nav.querySelector(".nav-menu");
  var mobile = window.matchMedia("(max-width: 767px)");

  /* Mobile menu */

  function isOpen() {
    return nav.classList.contains("is-open");
  }

  function setOpen(open, returnFocus) {
    nav.classList.toggle("is-open", open);
    root.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (isOpen() && !menu.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen()) return;

      if (event.key === "Escape") {
        setOpen(false, true);
        return;
      }

      if (event.key === "Tab") {
        var links = menu.querySelectorAll("a");
        var last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.focus();
        }
      }
    });

    var onBreakpointChange = function (event) {
      if (!event.matches && isOpen()) setOpen(false);
    };
    if (mobile.addEventListener) {
      mobile.addEventListener("change", onBreakpointChange);
    } else if (mobile.addListener) {
      mobile.addListener(onBreakpointChange);
    }
  }

  /* Header shadow and back-to-top button */

  var scrollUp = document.querySelector(".scroll-up");
  var ticking = false;

  function updateOnScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (scrollUp) scrollUp.classList.toggle("is-visible", y > 600);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateOnScroll);
    }
  }, { passive: true });
  updateOnScroll();

  /* Fade-in on scroll */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".hero-intro, .hero-media, .hero-copy, .glance-section, .page-intro, .section-heading, .entries > .card, .entries > .grid > .card, .grid > .card, .timeline > li"
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px" });

    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });

    root.classList.add("reveal-ready");
  }
})();
