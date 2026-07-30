"use strict";
/* Vista de progreso (pasaporte de sellos) (app.js original: L762-L797) */
  /* ============ PROGRESS ============ */
  function renderProgress() {
    var lvl = LEVELS[state.currentLevelIndex];
    document.getElementById("summary-level").textContent = lvl.code;
    document.getElementById("summary-stamps").textContent = state.stamps.length;
    var pct = Math.round((state.stamps.length / LEVELS.length) * 100);
    document.getElementById("summary-percent").textContent = pct + "%";

    var passport = document.getElementById("passport-stamps");
    passport.innerHTML = "";
    LEVELS.forEach(function (l) {
      var earned = state.stamps.indexOf(l.code) !== -1;
      var s = document.createElement("div");
      s.className = "stamp" + (earned ? " earned" : "");
      s.textContent = l.code;
      passport.appendChild(s);
    });

    var list = document.getElementById("deliverables-list");
    list.innerHTML = "";
    DELIVERABLES.forEach(function (d) {
      var done = state.stamps.indexOf(d.code) !== -1;
      var li = document.createElement("li");
      li.innerHTML = '<span class="deliverable-check' + (done ? " done" : "") + '">' + (done ? "✓" : "") + "</span><span>" + d.text + "</span>";
      list.appendChild(li);
    });

    var complete = state.stamps.length === LEVELS.length;
    var certBtn = document.getElementById("certificate-btn");
    var certDesc = document.getElementById("certificate-desc");
    certBtn.disabled = !complete;
    certDesc.textContent = complete
      ? "You completed all six levels! Download your program certificate."
      : "Complete all six levels (A1 to C2) to unlock your downloadable certificate.";
  }

