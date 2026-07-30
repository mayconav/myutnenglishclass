"use strict";
/* Navegacion entre vistas y secciones (app.js original: L295-L387) */
  /* ============ NAVIGATION ============ */
  var views = document.querySelectorAll(".view");
  var navLinks = document.querySelectorAll(".main-nav a");
  var groupTabbars = document.querySelectorAll(".group-tabbar");

  /* Navigation groups: the main navbar only shows Home, Learn,
     Progress, and Resources; each group reveals its real views as internal
     tabs so no existing section is lost. */
  var GROUPS = {
    aprender: ["niveles", "leccion", "habilidades"],
    recursos: ["material", "gramatica"]
  };
  var lastGroupView = { aprender: "niveles", recursos: "material" };

  function groupOf(view) {
    for (var g in GROUPS) {
      if (GROUPS[g].indexOf(view) !== -1) return g;
    }
    return null;
  }

  function goto(name) {
    /* If navigating to a group (click on "Learn"/"Resources" in the navbar),
       resolve to the last visited tab within that group. */
    var target = GROUPS[name] ? (lastGroupView[name] || GROUPS[name][0]) : name;
    var activeGroup = groupOf(target);
    if (activeGroup) lastGroupView[activeGroup] = target;

    views.forEach(function (v) { v.hidden = v.dataset.view !== target; });

    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.dataset.nav === (activeGroup || target));
    });

    groupTabbars.forEach(function (tb) {
      var isActiveGroup = tb.dataset.group === activeGroup;
      tb.hidden = !isActiveGroup;
      if (isActiveGroup) {
        tb.querySelectorAll(".group-tab").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.nav === target);
        });
      }
    });

    if (target === "leccion") renderLesson(activeLevelIndex, activeLessonIndex);
    if (target === "niveles") renderGates();
    if (target === "progreso") renderProgress();
    if (target === "habilidades") openSkillsHub();
    if (target === "gramatica") closeGrammarPanel();
    window.scrollTo({ top: 0, behavior: "smooth" });
    var nav = document.getElementById("main-nav");
    nav.classList.remove("open");
    document.getElementById("nav-toggle").setAttribute("aria-expanded", "false");
  }

  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.goto === "leccion") {
        activeLevelIndex = state.currentLevelIndex;
        activeLessonIndex = 0;
      }
      goto(btn.dataset.goto);
    });
  });
  navLinks.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      goto(a.dataset.nav);
    });
  });
  document.querySelectorAll(".logo[data-nav]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      goto(a.dataset.nav);
    });
  });
  document.querySelectorAll(".group-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.nav === "leccion") {
        activeLevelIndex = state.currentLevelIndex;
        activeLessonIndex = 0;
      }
      goto(btn.dataset.nav);
    });
  });

  var navToggle = document.getElementById("nav-toggle");
  navToggle.addEventListener("click", function () {
    var nav = document.getElementById("main-nav");
    var open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

