"use strict";
/* Recompensas: XP global, rangos, insignias y celebraciones.
   - XP: lecciones (+20), sello de nivel (+50), quizzes de gramatica (hasta +15, solo se
     paga la mejora sobre tu mejor nota, asi que repetir no regala XP), habilidades,
     bingo y meta diaria (esos ya existian y ahora tambien pasan por checkRewards).
   - Rangos: cada 100 XP subes de rango (Passenger -> Ambassador).
   - Insignias: se calculan con el estado y se guardan en state.badges para no perderlas.
   - Celebraciones: ventana emergente en cola + confeti, solo cuando el estudiante logra algo.
   Funciones publicas (las usan otros archivos): checkRewards, queueReward, rewardGrammarQuiz,
   rewardLessonDone, renderRewardsUI, renderBadgeShelf, syncBadgesSilently, hydrateIcons. */
  var XP_LESSON = 20;
  var XP_STAMP = 50;
  var XP_PER_RANK = 100;
  var RANKS = ["Passenger", "Traveler", "Explorer", "Navigator", "Pilot", "Captain", "Ambassador"];

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function rankOf(xp) {
    xp = Math.max(0, xp || 0);
    var steps = Math.floor(xp / XP_PER_RANK);
    var into = xp % XP_PER_RANK;
    return {
      number: steps + 1,
      name: RANKS[Math.min(steps, RANKS.length - 1)],
      nextName: steps + 1 < RANKS.length ? RANKS[steps + 1] : null,
      into: into,
      toNext: XP_PER_RANK - into
    };
  }

  function quizXp(pct) { return Math.round(15 * pct / 100); }

  /* ============ INSIGNIAS ============ */
  function hasAllSkillsInOneLevel() {
    return LEVELS.some(function (l) {
      return SKILL_ORDER.every(function (k) { return state.skillProgress[k].indexOf(l.code) !== -1; });
    });
  }
  function hasPerfectQuiz() {
    var q = state.quizBest || {};
    return Object.keys(q).some(function (k) { return q[k] === 100; });
  }
  var BADGES = [
    { id: "first-flight", icon: "plane", title: "First flight", desc: "Finish your first lesson.",
      test: function () { return state.completedLessons.length >= 1; } },
    { id: "gate-cleared", icon: "flag", title: "Gate cleared", desc: "Earn your first level stamp.",
      test: function () { return state.stamps.length >= 1; } },
    { id: "streak-3", icon: "flame", title: "3-day streak", desc: "Study three days in a row.",
      test: function () { return currentStreak() >= 3; } },
    { id: "streak-7", icon: "flame", title: "7-day streak", desc: "Study seven days in a row.",
      test: function () { return currentStreak() >= 7; } },
    { id: "on-target", icon: "target", title: "On target", desc: "Complete a daily goal.",
      test: function () { return (state.goalDays || 0) >= 1; } },
    { id: "grammar-habit", icon: "clipboard-check", title: "Grammar habit", desc: "Finish 5 different grammar quizzes.",
      test: function () { return Object.keys(state.quizBest || {}).length >= 5; } },
    { id: "perfect-score", icon: "star", title: "Perfect score", desc: "Get 100% on a grammar quiz.",
      test: hasPerfectQuiz },
    { id: "all-rounder", icon: "layers", title: "All-rounder", desc: "Complete Reading, Writing, Speaking and Letter in one level.",
      test: hasAllSkillsInOneLevel },
    { id: "bingo-winner", icon: "gamepad", title: "Bingo winner", desc: "Win a round of Verb Bingo.",
      test: function () { return !!(state.bingoStats && state.bingoStats.wins >= 1); } },
    { id: "rank-traveler", icon: "zap", title: "Traveler", desc: "Reach 100 XP.",
      test: function () { return state.skillsXP >= 100; } },
    { id: "rank-captain", icon: "crown", title: "Captain", desc: "Reach 500 XP.",
      test: function () { return state.skillsXP >= 500; } }
  ];

  function badgeEarned(b) {
    try { return !!b.test(); } catch (e) { return false; }
  }

  /* Al abrir la app marca como ganadas, sin celebrar, las insignias que el estudiante
     ya cumplia antes de esta version. Asi no le llueven diez ventanas de golpe. */
  function syncBadgesSilently() {
    if (!Array.isArray(state.badges)) state.badges = [];
    var changed = false;
    BADGES.forEach(function (b) {
      if (state.badges.indexOf(b.id) === -1 && badgeEarned(b)) { state.badges.push(b.id); changed = true; }
    });
    if (changed) saveProgress(state);
  }

  /* ============ CELEBRACIONES ============ */
  var rewardQueue = [];
  var rewardBusy = false;
  var rewardEl = null;

  function getRewardEl() {
    if (rewardEl) return rewardEl;
    rewardEl = document.createElement("div");
    rewardEl.className = "reward-pop";
    rewardEl.hidden = true;
    rewardEl.setAttribute("role", "status");
    rewardEl.setAttribute("aria-live", "polite");
    rewardEl.innerHTML =
      '<span class="rw-icon" aria-hidden="true"></span>' +
      '<span class="rw-body"><strong class="rw-title"></strong><span class="rw-text"></span></span>';
    rewardEl.addEventListener("click", function () { rewardEl.classList.remove("show"); });
    document.body.appendChild(rewardEl);
    return rewardEl;
  }

  function queueReward(r) {
    rewardQueue.push(r);
    if (!rewardBusy) nextReward();
  }

  function nextReward() {
    var r = rewardQueue.shift();
    if (!r) { rewardBusy = false; return; }
    rewardBusy = true;
    var el = getRewardEl();
    el.className = "reward-pop kind-" + (r.kind || "xp");
    el.querySelector(".rw-icon").innerHTML = UTNIcons.svg(r.icon || "star");
    el.querySelector(".rw-title").textContent = r.title || "";
    el.querySelector(".rw-text").textContent = r.text || "";
    el.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("show"); }); });
    if (r.confetti) burstConfetti();
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.hidden = true; nextReward(); }, 280);
    }, r.ms || 2400);
  }

  function burstConfetti() {
    if (prefersReducedMotion()) return;
    var host = document.createElement("div");
    host.className = "rw-confetti";
    host.setAttribute("aria-hidden", "true");
    var colors = ["#0C4EB8", "#E2141B", "#0C9C61", "#F2C230", "#FFFFFF"];
    for (var i = 0; i < 40; i++) {
      var p = document.createElement("span");
      p.className = "rw-piece";
      p.style.setProperty("--x", ((Math.random() - 0.5) * 520) + "px");
      p.style.setProperty("--r", ((Math.random() - 0.5) * 900) + "deg");
      p.style.setProperty("--t", (1.3 + Math.random() * 1.1) + "s");
      p.style.setProperty("--d", (Math.random() * 0.18) + "s");
      p.style.setProperty("--c", colors[i % colors.length]);
      if (i % 3 === 0) p.style.borderRadius = "50%";
      host.appendChild(p);
    }
    document.body.appendChild(host);
    setTimeout(function () { if (host.parentNode) host.parentNode.removeChild(host); }, 2800);
  }

  /* ============ NUCLEO: despues de ganar XP ============ */
  function checkRewards(prevXp) {
    var changed = false;
    if (typeof prevXp === "number") {
      var before = rankOf(prevXp), after = rankOf(state.skillsXP);
      if (after.number > before.number) {
        queueReward({
          kind: "rank", icon: "crown", confetti: true,
          title: "New rank: " + after.name,
          text: "You reached " + state.skillsXP + " XP. Keep flying!"
        });
      }
    }
    if (!Array.isArray(state.badges)) state.badges = [];
    BADGES.forEach(function (b) {
      if (state.badges.indexOf(b.id) === -1 && badgeEarned(b)) {
        state.badges.push(b.id);
        changed = true;
        queueReward({ kind: "badge", icon: b.icon, title: "Badge unlocked: " + b.title, text: b.desc });
      }
    });
    if (changed) saveProgress(state);
    renderRewardsUI();
    renderBadgeShelf();
  }

  function rewardGrammarQuiz(quizId, correct, total) {
    var prev = state.skillsXP;
    var pct = total ? Math.round(100 * correct / total) : 0;
    if (!state.quizBest) state.quizBest = {};
    var best = state.quizBest[quizId] || 0;
    var gain = 0;
    if (pct > best) {
      gain = quizXp(pct) - quizXp(best);
      state.quizBest[quizId] = pct;
      state.skillsXP += gain;
    }
    saveProgress(state);
    if (typeof recordDailyActivity === "function") recordDailyActivity("quiz:" + quizId);
    if (gain > 0) {
      var perfect = pct === 100;
      queueReward({
        kind: perfect ? "perfect" : "xp", icon: perfect ? "star" : "zap", confetti: perfect,
        title: (perfect ? "Perfect score! " : "") + "+" + gain + " XP",
        text: perfect ? "Flawless run on this quiz." : correct + " of " + total + " correct. Your best: " + pct + "%."
      });
    } else if (best > 0 && typeof showGenericToast === "function") {
      showGenericToast("Your best is " + best + "%. Beat it to earn more XP.");
    }
    checkRewards(prev);
  }

  function rewardLessonDone(isNewLesson, gotStamp, levelCode, prevXp) {
    if (isNewLesson) state.skillsXP += XP_LESSON;
    if (gotStamp) state.skillsXP += XP_STAMP;
    saveProgress(state);
    if (isNewLesson || gotStamp) {
      var total = (isNewLesson ? XP_LESSON : 0) + (gotStamp ? XP_STAMP : 0);
      queueReward({
        kind: gotStamp ? "stamp" : "xp", icon: gotStamp ? "flag" : "check-circle", confetti: gotStamp,
        title: gotStamp ? "Stamp earned: " + levelCode : "Lesson complete! +" + XP_LESSON + " XP",
        text: gotStamp ? "+" + total + " XP. Gate " + levelCode + " is cleared." : "Nice work. On to the next one."
      });
    }
    checkRewards(prevXp);
  }

  /* ============ PINTADO ============ */
  function animateNumber(el, to) {
    if (!el) return;
    var from = parseInt(el.textContent, 10);
    if (isNaN(from)) from = 0;
    if (from === to || prefersReducedMotion() || !window.requestAnimationFrame) { el.textContent = to; return; }
    var start = null, dur = 650;
    el.classList.remove("rw-bump");
    void el.offsetWidth;
    el.classList.add("rw-bump");
    function step(t) {
      if (start === null) start = t;
      var k = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function paintRank(root) {
    if (!root) return;
    var r = rankOf(state.skillsXP);
    var name = root.querySelector(".rk-name"), lv = root.querySelector(".rk-lv");
    var fill = root.querySelector(".rk-fill"), xp = root.querySelector(".rk-xp"), hint = root.querySelector(".rk-hint");
    if (name) name.textContent = r.name;
    if (lv) lv.textContent = "Lv " + r.number;
    if (fill) fill.style.width = r.into + "%";
    if (xp) animateNumber(xp, state.skillsXP);
    if (hint) hint.textContent = r.toNext + " XP to " + (r.nextName || "level " + (r.number + 1));
  }

  function renderRewardsUI() {
    paintRank(document.getElementById("xp-strip"));
    paintRank(document.getElementById("hd-rank"));
    paintRank(document.getElementById("pg-rank"));
    var s = document.getElementById("xps-streak");
    if (s && typeof currentStreak === "function") s.textContent = currentStreak();
  }

  function renderBadgeShelf() {
    var shelf = document.getElementById("badge-shelf");
    if (!shelf) return;
    var earned = 0;
    shelf.innerHTML = "";
    BADGES.forEach(function (b) {
      var on = (state.badges || []).indexOf(b.id) !== -1;
      if (on) earned++;
      var li = document.createElement("li");
      li.className = "badge" + (on ? " earned" : " locked");
      li.innerHTML =
        '<span class="badge-icon">' + UTNIcons.svg(on ? b.icon : "lock") + "</span>" +
        '<span class="badge-text"><strong>' + b.title + "</strong><span>" + b.desc + "</span></span>";
      shelf.appendChild(li);
    });
    var count = document.getElementById("badge-count");
    if (count) count.textContent = earned + " of " + BADGES.length;
  }

  /* Rellena iconos declarativos: <span data-icon="home"></span> */
  function hydrateIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      if (!el.firstChild) el.innerHTML = UTNIcons.svg(el.getAttribute("data-icon"));
    });
  }
