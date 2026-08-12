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
