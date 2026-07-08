/* =========================================================
   SEFER TORÁ · BAR MITZVÁ — Interacciones ligeras
   Sin dependencias externas. Respeta prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- preloader ---- */
  var preloader = document.getElementById("preloader");
  window.addEventListener("load", function () {
    setTimeout(function () {
      if (preloader) preloader.classList.add("hide");
    }, reduceMotion ? 0 : 800);
  });

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---- brandmark: visible only over the hero ---- */
  var brandmark = document.querySelector(".brandmark");
  var hero = document.querySelector(".hero");
  if (brandmark && hero && "IntersectionObserver" in window) {
    var heroIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          brandmark.classList.toggle("hidden", !entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );
    heroIo.observe(hero);
  }

  /* ---- fade the floating WhatsApp button out once the footer is reached
     (the footer already shows contact details, avoids overlapping them) ---- */
  var waWrap = document.querySelector(".whatsapp-wrap");
  var pageFooter = document.querySelector("footer");
  if (waWrap && pageFooter && "IntersectionObserver" in window) {
    var footerIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          waWrap.classList.toggle("hidden", entry.isIntersecting);
        });
      },
      { threshold: 0.4 }
    );
    footerIo.observe(pageFooter);
  }

  /* ---- subtle glow follows the pointer over the hero (desktop only, cheap) ---- */
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var glow = document.querySelector(".hero-glow");
    if (glow && hero) {
      hero.addEventListener("mousemove", function (e) {
        var dx = (e.clientX / window.innerWidth - 0.5) * 30;
        var dy = (e.clientY / window.innerHeight - 0.5) * 30;
        glow.style.transform = "translate(calc(-50% + " + dx + "px), " + dy + "px)";
      });
    }
  }
})();
