"use strict";
/* Panel "Today" de la portada: continuar leccion, racha, XP y meta diaria.
   - Continuar: lleva a la primera leccion sin completar del nivel actual.
   - Meta diaria: DAILY_GOAL actividades distintas por dia (leccion, habilidad o quiz
     de gramatica). Al cumplirla se otorgan DAILY_BONUS_XP una sola vez por dia.
   - recordDailyActivity(id) se llama desde lesson-player.js, skills-hub.js (awardXP)
     y grammar-render.js (al calificar un quiz). El id evita contar dos veces lo mismo. */
  var DAILY_GOAL = 3;
  var DAILY_BONUS_XP = 10;

  function dailyEnsure() {
    var key = localDayKey();
    if (!state.daily || state.daily.day !== key) state.daily = { day: key, done: [], bonus: false };
    return state.daily;
  }

  /* Racha visible: si el ultimo dia activo fue antes de ayer, la racha ya se rompio. */
  function currentStreak() {
    if (!state.lastActiveDay) return 0;
    var last = new Date(state.lastActiveDay + "T00:00:00");
    var today = new Date(localDayKey() + "T00:00:00");
    var diff = Math.round((today - last) / 86400000);
    return diff <= 1 ? (state.skillsStreak || 0) : 0;
  }

  function recordDailyActivity(id) {
    var d = dailyEnsure();
    if (d.done.indexOf(id) !== -1) return;
    d.done.push(id);
    touchStreak();
    var reached = d.done.length >= DAILY_GOAL && !d.bonus;
    if (reached) {
      d.bonus = true;
      state.skillsXP += DAILY_BONUS_XP;
      state.goalDays = (state.goalDays || 0) + 1;
    }
    saveProgress(state);
    if (typeof updateSkillsStatusbar === "function") updateSkillsStatusbar();
    if (reached) {
      if (typeof queueReward === "function") {
        queueReward({
          kind: "goal", icon: "target", confetti: true,
          title: "Daily goal complete! +" + DAILY_BONUS_XP + " XP",
          text: "Come back tomorrow to keep your streak."
        });
      } else if (typeof showGenericToast === "function") {
        showGenericToast("Daily goal complete! +" + DAILY_BONUS_XP + " XP");
      }
    }
    renderHomeDash();
  }

  function nextLessonIndex(levelCode) {
    var lessons = LESSONS[levelCode];
    for (var i = 0; i < lessons.length; i++) {
      if (state.completedLessons.indexOf(lessonId(levelCode, i)) === -1) return i;
    }
    return -1;
  }

  function renderHomeDash() {
    var root = document.getElementById("home-dash");
    if (!root) return;
    var lvl = LEVELS[state.currentLevelIndex];
    var lessons = LESSONS[lvl.code];
    var doneInLevel = lessons.filter(function (_, i) {
      return state.completedLessons.indexOf(lessonId(lvl.code, i)) !== -1;
    }).length;
    var idx = nextLessonIndex(lvl.code);
    var programDone = state.stamps.length === LEVELS.length && idx === -1;
    var isNew = state.completedLessons.length === 0 && !state.skillsXP;

    var first = ((state.profile && state.profile.name) || "").trim().split(/\s+/)[0];
    var name = first && first !== "UTN" ? first : "";
    document.getElementById("hd-greeting").textContent =
      (isNew ? "Welcome" : "Welcome back") + (name ? ", " + name : "");

    var title = document.getElementById("hd-title");
    var sub = document.getElementById("hd-sub");
    var btn = document.getElementById("hd-continue");
    if (programDone) {
      title.textContent = "You completed the whole program!";
      sub.textContent = "Review any level or keep practicing your skills.";
      btn.textContent = "Review levels";
      btn.onclick = function () { goto("niveles"); };
    } else {
      var lesson = lessons[idx === -1 ? lessons.length - 1 : idx];
      title.textContent = lesson.title;
      sub.textContent = lvl.code + " · " + lvl.name + " — Lesson " + Math.min(doneInLevel + 1, lessons.length) + " of " + lessons.length;
      btn.textContent = isNew ? "Start your first lesson" : "Continue lesson";
      btn.onclick = function () {
        activeLevelIndex = state.currentLevelIndex;
        activeLessonIndex = idx === -1 ? 0 : idx;
        goto("leccion");
      };
    }
    /* Retomar Grammar: ultimo tema abierto en este dispositivo */
    var resume = document.getElementById("hd-resume-grammar");
    if (resume) {
      var lastSlug = null;
      try { lastSlug = localStorage.getItem("myutn_last_grammar"); } catch (e) {}
      var lastTopic = lastSlug && typeof GRAMMAR_CONTENT !== "undefined" ? GRAMMAR_CONTENT[lastSlug] : null;
      resume.hidden = !lastTopic;
      if (lastTopic) {
        var topicName = lastTopic.label || lastSlug;
        resume.innerHTML = UTNIcons.svg("book-open") + "<span></span>";
        resume.lastChild.textContent = "Resume: " + topicName;
        resume.title = "Resume Grammar: " + topicName;
        resume.onclick = function () { goto("gramatica"); openGrammarTopic(lastSlug); };
      }
    }
    document.getElementById("hd-level-fill").style.width = Math.round((doneInLevel / lessons.length) * 100) + "%";
    document.getElementById("hd-level-label").textContent = doneInLevel + " of " + lessons.length + " lessons in " + lvl.code;

    var streak = currentStreak();
    document.getElementById("hd-streak").textContent = streak;
    document.getElementById("hd-streak-label").textContent = "day streak";
    document.getElementById("hd-xp").textContent = state.skillsXP;
    document.getElementById("hd-stamps").textContent = state.stamps.length + "/" + LEVELS.length;
    root.querySelector(".hd-stat-streak").classList.toggle("is-on", streak > 0);

    var d = (state.daily && state.daily.day === localDayKey()) ? state.daily : { done: [], bonus: false };
    var count = Math.min(d.done.length, DAILY_GOAL);
    var pips = document.getElementById("hd-pips");
    pips.innerHTML = "";
    for (var i = 0; i < DAILY_GOAL; i++) {
      var pip = document.createElement("span");
      pip.className = "hd-pip" + (i < count ? " on" : "");
      pips.appendChild(pip);
    }
    var goalText = document.getElementById("hd-goal-text");
    var goalHint = document.getElementById("hd-goal-hint");
    if (d.bonus) {
      goalText.textContent = "Daily goal complete!";
      goalHint.textContent = "+" + DAILY_BONUS_XP + " XP earned. Come back tomorrow to keep your streak.";
    } else {
      goalText.textContent = count + " of " + DAILY_GOAL + " activities today";
      goalHint.textContent = "Lessons, skill practice and grammar quizzes all count. Finish " + DAILY_GOAL + " for +" + DAILY_BONUS_XP + " XP.";
    }
    root.classList.toggle("goal-done", !!d.bonus);
    if (typeof renderRewardsUI === "function") renderRewardsUI();
  }

  /* body.is-student: con sesion de alumno la portada muestra su proxima leccion y la franja Today;
     sin sesion se ve la bienvenida de siempre. Sigue al atributo hidden del bloque de acciones
     del encabezado, que auth.js muestra al iniciar sesion y oculta al cerrarla. */
  function syncStudentClass() {
    var el = document.getElementById("header-authed-actions");
    document.body.classList.toggle("is-student", !!el && !el.hidden);
  }
  (function watchStudentSession() {
    var el = document.getElementById("header-authed-actions");
    if (!el) return;
    syncStudentClass();
    if (window.MutationObserver) {
      new MutationObserver(syncStudentClass).observe(el, { attributes: true, attributeFilter: ["hidden"] });
    }
  })();
