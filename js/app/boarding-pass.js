"use strict";
/* Pase de abordar (credencial) en la vista de inicio (app.js original: L436-L451) */
  /* ============ BOARDING PASS ============ */
  function updateBoardingPass() {
    var lvl = LEVELS[state.currentLevelIndex];
    var totalLessons = LESSONS[lvl.code].length;
    var doneInLevel = LESSONS[lvl.code].filter(function (_, i) {
      return state.completedLessons.indexOf(lessonId(lvl.code, i)) !== -1;
    }).length;
    document.getElementById("bp-level").textContent = lvl.code + " · " + lvl.name;
    document.getElementById("bp-skill").textContent = lvl.skill;
    document.getElementById("bp-gate").textContent = "Lesson " + Math.min(doneInLevel + 1, totalLessons) + " of " + totalLessons;
    document.getElementById("bp-code").textContent = "UTN-" + lvl.code + "-0" + (doneInLevel + 1);
    var pct = Math.round((state.stamps.length / LEVELS.length) * 100);
    document.getElementById("bp-progress-fill").style.width = Math.max(6, pct) + "%";
    updateProfileUI();
  }

