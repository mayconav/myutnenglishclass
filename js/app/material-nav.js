"use strict";
/* ============ SUPPORT MATERIAL - QUICK JUMP NAV ============
   Adds "Group 1..5" buttons above the Support Material tables so users
   can jump straight to a verb group instead of scrolling through all of
   them. Clicking a button smooth-scrolls to that group (offset so it
   doesn't hide under the sticky header + jump bar), and the active
   button updates automatically as the user scrolls past each group. */
(function () {
  var jumpnav = document.getElementById("material-jumpnav");
  if (!jumpnav) return;

  var buttons = Array.prototype.slice.call(jumpnav.querySelectorAll(".material-jump-btn"));
  var groups = buttons.map(function (btn) {
    return document.getElementById(btn.dataset.jump);
  });

  function stickyOffset() {
    var header = document.querySelector(".site-header");
    var headerH = header ? header.offsetHeight : 0;
    var navH = jumpnav.offsetHeight;
    return headerH + navH + 16;
  }

  buttons.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      var target = groups[i];
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.pageYOffset - stickyOffset();
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  function setActive(id) {
    buttons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.jump === id);
    });
  }

  var observer = null;
  function setupObserver() {
    if (observer) observer.disconnect();
    var offset = stickyOffset();
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-" + offset + "px 0px -70% 0px", threshold: 0 }
    );
    groups.forEach(function (g) { if (g) observer.observe(g); });
  }

  setupObserver();
  window.addEventListener("resize", setupObserver);
})();
