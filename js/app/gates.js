"use strict";
/* Puertas de niveles (A1-C2) (app.js original: L452-L493) */
  /* ============ GATES / NIVELES ============ */
  function renderGates() {
    var grid = document.getElementById("gates-grid");
    grid.innerHTML = "";
    LEVELS.forEach(function (lvl, i) {
      var earned = state.stamps.indexOf(lvl.code) !== -1;
      var locked = i > state.currentLevelIndex;
      var statusClass = earned ? "done" : (locked ? "locked" : "active");
      var statusText = earned ? "completed" : (locked ? "locked" : "in progress");
      var lessons = LESSONS[lvl.code];

      var card = document.createElement("article");
      card.className = "gate-card" + (locked ? " locked" : "");

      var pillsHtml = lessons.map(function (les, li) {
        var done = state.completedLessons.indexOf(lessonId(lvl.code, li)) !== -1;
        return '<button class="lesson-pill' + (done ? " done" : "") + '" data-level="' + i + '" data-lesson="' + li + '" ' + (locked ? "disabled" : "") + '>' +
          (done ? "✓ " : "") + (li + 1) + "</button>";
      }).join("");

      card.innerHTML =
        '<div class="gate-top">' +
          '<span class="gate-code">' + lvl.code + '</span>' +
          '<span class="gate-status ' + statusClass + '">' + statusText + '</span>' +
        '</div>' +
        '<p class="gate-name">' + lvl.name + '</p>' +
        '<p class="gate-desc">' + lvl.desc + '</p>' +
        '<div class="lesson-pills">' + pillsHtml + '</div>';

      if (!locked) {
        card.querySelectorAll(".lesson-pill").forEach(function (btn) {
          btn.addEventListener("click", function () {
            activeLevelIndex = parseInt(btn.dataset.level, 10);
            activeLessonIndex = parseInt(btn.dataset.lesson, 10);
            goto("leccion");
          });
        });
      }
      grid.appendChild(card);
    });
  }

