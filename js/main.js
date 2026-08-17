/* ============================================================
   NERE — Núcleo de Estudos em Real Estate | UFMG
   main.js — Language toggle, navigation, UI components
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     LANGUAGE TOGGLE
     ---------------------------------------------------------- */
  const html = document.documentElement;
  const langBtns = document.querySelectorAll(".lang-btn");

  function setLang(lang) {
    html.classList.remove("lang-pt", "lang-en");
    html.classList.add("lang-" + lang);
    html.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    localStorage.setItem("nere-lang", lang);
    langBtns.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.lang);
    });
  });

  /* Restore saved language or default to PT */
  var savedLang = localStorage.getItem("nere-lang") || "pt";
  setLang(savedLang);

  /* ----------------------------------------------------------
     MOBILE HAMBURGER NAV
     ---------------------------------------------------------- */
  var hamburger = document.querySelector(".hamburger");
  var mainNav = document.querySelector(".main-nav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      mainNav.classList.toggle("open");
    });

    /* Mobile: tap on dropdown parent to toggle dropdown */
    document.querySelectorAll(".has-dropdown > a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          var parent = link.parentElement;
          parent.classList.toggle("open");
        }
      });
    });

    /* Close nav when a leaf link is clicked on mobile */
    mainNav.querySelectorAll(".dropdown a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          hamburger.classList.remove("open");
          mainNav.classList.remove("open");
        }
      });
    });
  }

  /* ----------------------------------------------------------
     ACCORDION
     ---------------------------------------------------------- */
  document.querySelectorAll(".accordion-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var body = btn.nextElementSibling;
      var isOpen = btn.classList.contains("open");

      /* Close all in same accordion */
      var accordion = btn.closest(".accordion");
      accordion.querySelectorAll(".accordion-btn").forEach(function (b) {
        b.classList.remove("open");
        b.nextElementSibling.style.maxHeight = null;
      });

      /* Open clicked if it was closed */
      if (!isOpen) {
        btn.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  /* ----------------------------------------------------------
     TABS
     ---------------------------------------------------------- */
  document.querySelectorAll(".tab-group").forEach(function (group) {
    group.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.dataset.tab;
        group.querySelectorAll(".tab-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        group.querySelectorAll(".tab-panel").forEach(function (p) {
          p.classList.remove("active");
        });
        btn.classList.add("active");
        var panel = group.querySelector('[data-panel="' + target + '"]');
        if (panel) panel.classList.add("active");
      });
    });
  });

  /* ----------------------------------------------------------
     ACTIVE NAV ITEM (highlight current page)
     ---------------------------------------------------------- */
  var currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".main-nav > ul > li > a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href) return;
    var linkPath = href.replace(/\/$/, "") || "/";
    /* Match exact or if current path starts with link path (for sub-pages) */
    if (
      currentPath === linkPath ||
      (linkPath !== "/" && currentPath.startsWith(linkPath))
    ) {
      a.closest("li").classList.add("current");
    }
  });

  /* ----------------------------------------------------------
     GALLERY CAROUSEL
     ---------------------------------------------------------- */
  document.querySelectorAll(".gallery-carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".gallery-carousel-track");
    var slides = Array.prototype.slice.call(track.children);
    var prevBtn = carousel.querySelector(".gallery-carousel-prev");
    var nextBtn = carousel.querySelector(".gallery-carousel-next");
    var dotsWrap = carousel.querySelector(".gallery-carousel-dots");
    var counter = carousel.querySelector(".gallery-carousel-counter");
    var current = 0;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Foto " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function update() {
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
      });
      if (counter) {
        counter.textContent = current + 1 + " / " + slides.length;
      }
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      update();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1); });

    /* Touch swipe */
    var touchStartX = null;
    track.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        goTo(current + (delta < 0 ? 1 : -1));
      }
      touchStartX = null;
    });

    /* Keyboard navigation when carousel is focused */
    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    });

    update();
  });

  /* ----------------------------------------------------------
     SMOOTH SCROLL for anchor links
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
