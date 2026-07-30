"use strict";
/* Habilidades: XP, racha, barra de estado, cuadricula y apertura de una habilidad (antes en js/app.js) */
  var SKILL_META = {
    reading: { icon: "📖", label: "Reading", desc: "Read a short text and answer comprehension questions.", xp: 15 },
    writing: { icon: "✍️", label: "Writing", desc: "Build English sentences by dragging words.", xp: 15 },
    speaking: { icon: "🗣️", label: "Speaking", desc: "Listen and practice your pronunciation out loud.", xp: 15 },
    letter: { icon: "✉️", label: "Letter", desc: "Complete a letter or email using the word bank.", xp: 20 }
  };
  var SKILL_ORDER = ["reading", "writing", "speaking", "letter"];

  var activeSkillsLevel = LEVELS[state.currentLevelIndex].code;
  var activeSkillKey = null;

  function shuffleCopy(arr) { return shuffleArray(arr.slice()); }

  function normalizeWord(s) {
    return (s || "").toLowerCase().replace(/[.,!?¿¡"']/g, "").trim();
  }

  /* ---- Daily streak ---- */
  function touchStreak() {
    var today = new Date();
    var todayStr = today.toISOString().slice(0, 10);
    if (state.lastActiveDay === todayStr) return;
    if (state.lastActiveDay) {
      var last = new Date(state.lastActiveDay + "T00:00:00");
      var diffDays = Math.round((new Date(todayStr + "T00:00:00") - last) / 86400000);
      if (diffDays === 1) state.skillsStreak += 1;
      else if (diffDays > 1) state.skillsStreak = 1;
      else if (!state.skillsStreak) state.skillsStreak = 1;
    } else {
      state.skillsStreak = 1;
    }
    state.lastActiveDay = todayStr;
    saveProgress(state);
  }

  /* ---- XP toast ---- */
  var xpToastTimer = null;
  function showXpToast(amount) {
    var toast = document.getElementById("xp-toast");
    toast.textContent = "+" + amount + " XP ⚡ Well done!";
    toast.hidden = false;
    requestAnimationFrame(function () { toast.classList.add("show"); });
    if (xpToastTimer) clearTimeout(xpToastTimer);
    xpToastTimer = setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.hidden = true; }, 250);
    }, 1700);
  }

  function awardXP(amount, skillKey, levelCode) {
    state.skillsXP += amount;
    if (state.skillProgress[skillKey].indexOf(levelCode) === -1) {
      state.skillProgress[skillKey].push(levelCode);
    }
    saveProgress(state);
    showXpToast(amount);
    updateSkillsStatusbar();
  }

  function updateSkillsStatusbar() {
    document.getElementById("skills-streak").textContent = state.skillsStreak;
    document.getElementById("skills-xp").textContent = state.skillsXP;
    document.getElementById("skills-level-label").textContent = activeSkillsLevel;
  }

  /* ---- Main hub (4-card grid) ---- */
  function openSkillsHub() {
    touchStreak();
    if (LEVELS.indexOf(LEVELS.filter(function (l) { return l.code === activeSkillsLevel; })[0]) === -1) {
      activeSkillsLevel = LEVELS[state.currentLevelIndex].code;
    }
    closeSkillPanel();
    updateSkillsStatusbar();
    renderSkillsLevelSwitch();
    renderSkillGrid();
  }

  function renderSkillsLevelSwitch() {
    var wrap = document.getElementById("skills-level-switch");
    wrap.innerHTML = "";
    LEVELS.forEach(function (lvl, i) {
      var locked = i > state.currentLevelIndex;
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "skills-level-chip" + (lvl.code === activeSkillsLevel ? " active" : "") + (locked ? " locked" : "");
      chip.textContent = lvl.code;
      chip.disabled = locked;
      chip.addEventListener("click", function () {
        activeSkillsLevel = lvl.code;
        openSkillsHub();
      });
      wrap.appendChild(chip);
    });
  }

  function ringSvg(pct, accentVar) {
    var r = 16, c = 2 * Math.PI * r;
    var offset = c - (c * pct) / 100;
    return '<div class="skill-ring-wrap">' +
      '<svg width="40" height="40" viewBox="0 0 40 40">' +
      '<circle class="skill-ring-track" cx="20" cy="20" r="' + r + '"></circle>' +
      '<circle class="skill-ring-fill" cx="20" cy="20" r="' + r + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '"></circle>' +
      "</svg>" +
      '<span class="skill-ring-label">' + pct + "%</span>" +
      "</div>";
  }

  function renderSkillGrid() {
    document.getElementById("skill-grid").hidden = false;
    document.getElementById("skill-panel").hidden = true;
    var grid = document.getElementById("skill-grid");
    grid.innerHTML = "";
    SKILL_ORDER.forEach(function (key) {
      var meta = SKILL_META[key];
      var done = state.skillProgress[key].indexOf(activeSkillsLevel) !== -1;
      var pct = done ? 100 : 0;
      var card = document.createElement("article");
      card.className = "skill-card" + (done ? " done" : "");
      card.dataset.skill = key;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.innerHTML =
        '<div class="skill-card-top">' +
          '<span class="skill-card-icon">' + meta.icon + "</span>" +
          ringSvg(pct) +
        "</div>" +
        "<h3>" + meta.label + "</h3>" +
        "<p>" + meta.desc + "</p>" +
        '<div class="skill-card-foot">' +
          '<span class="skill-card-xp">' + (done ? "✓ Stamped" : "+" + meta.xp + " XP") + "</span>" +
          '<span class="skill-card-cta">' + (done ? "Review" : "Practice") + "</span>" +
        "</div>";
      card.addEventListener("click", function () { openSkill(key); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSkill(key); } });
      grid.appendChild(card);
    });
  }

  function closeSkillPanel() {
    activeSkillKey = null;
    document.getElementById("skill-panel").hidden = true;
    document.getElementById("skill-grid").hidden = false;
  }
  document.getElementById("skill-back").addEventListener("click", function () {
    closeSkillPanel();
    renderSkillGrid();
  });

  function openSkill(key) {
    activeSkillKey = key;
    document.getElementById("skill-grid").hidden = true;
    var panel = document.getElementById("skill-panel");
    panel.hidden = false;
    var data = SKILLS[activeSkillsLevel][key];
    var inner = document.getElementById("skill-panel-inner");
    inner.innerHTML =
      '<div class="skill-panel-head">' +
        '<p class="eyebrow">Level ' + activeSkillsLevel + " · " + SKILL_META[key].label + "</p>" +
        "<h3>" + (data.title || SKILL_META[key].label) + "</h3>" +
        "<p>" + SKILL_META[key].desc + "</p>" +
      "</div>" +
      '<div id="skill-exercise-body"></div>';
    var body = document.getElementById("skill-exercise-body");
    if (key === "reading") renderReadingExercise(data, body);
    else if (key === "writing") renderWritingExercise(data, body);
    else if (key === "speaking") renderSpeakingExercise(data, body);
    else if (key === "letter") renderLetterExercise(data, body);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---- READING ---- */
